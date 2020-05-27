import { OpKind } from './opcode-kinds';
import { Opcode, createOpcode } from './opcode';
import { OptimizationKind } from './optimization-kinds';

type optimize_loop_function = (ops: Array<Opcode>, loop_start: number, loop_end: number) => Array<Opcode>;

function update_ops(ops: Array<Opcode>, optimized_loop: Array<Opcode>, loop_start: number, loop_end: number): Array<Opcode> {
  const start = ops.slice(0, loop_start);
  const end = ops.slice(loop_end + 1);

  return start.concat(optimized_loop).concat(end);
}

function optimize_range_update(ops: Array<Opcode>, dec_ptr_strt: number): Array<Opcode> {
  const new_ops = [];

  // [-]>[-]>[-]>[-]>[-]>[-]>[-]>[-]>[-]<<<<<<<<<
  let dec_ptr = dec_ptr_strt;
  while (
    dec_ptr - 2 >= 0 &&
    ops[dec_ptr - 0].kind === OpKind.LOOP_SET_TO_ZERO &&
    ops[dec_ptr - 1].kind === OpKind.INC_PTR &&
    ops[dec_ptr - 1].argument === 1)
  {
    dec_ptr -= 2;
  }

  if (dec_ptr_strt - dec_ptr > 3) {
    new_ops.push(createOpcode(OpKind.RESET_DATA_RANGE, (dec_ptr_strt - dec_ptr) / 2));
  }

  return new_ops;
}

function optimize_loop_set_to_zero(ops: Array<Opcode>, loop_start: number, loop_end: number): Array<Opcode> {
  const new_ops = [];

  if (loop_end - loop_start === 2) {
    const repeated_op = ops[loop_start + 1];

    if (repeated_op.kind === OpKind.INC_DATA || repeated_op.kind === OpKind.DEC_DATA) {
      new_ops.push(createOpcode(OpKind.LOOP_SET_TO_ZERO, 0));
    }
  }

  return new_ops;
}

function optimize_loop_move_ptr(ops: Array<Opcode>, loop_start: number, loop_end: number): Array<Opcode> {
  const new_ops = [];

  if (loop_end - loop_start === 2) {
    const repeated_op = ops[loop_start + 1];

    if (repeated_op.kind === OpKind.INC_PTR || repeated_op.kind === OpKind.DEC_PTR) {
      new_ops.push(
        createOpcode(OpKind.LOOP_MOVE_PTR, repeated_op.kind === OpKind.INC_PTR
                      ? repeated_op.argument
                      : -repeated_op.argument));
    }
  }

  return new_ops;
}

function optimize_loop_move_data(ops: Array<Opcode>, loop_start: number, loop_end: number): Array<Opcode> {
  const new_ops = [];

 if (loop_end - loop_start === 5) {
    // Detect patterns: -<+> and ->+<
    if (
        ops[loop_start + 1].kind === OpKind.DEC_DATA &&
        ops[loop_start + 3].kind === OpKind.INC_DATA &&
        ops[loop_start + 1].argument === 1 &&
        ops[loop_start + 3].argument === 1
      )
    {
      if (ops[loop_start + 2].kind === OpKind.INC_PTR &&
        ops[loop_start + 4].kind === OpKind.DEC_PTR &&
        ops[loop_start + 2].argument === ops[loop_start + 4].argument) {
        new_ops.push(createOpcode(OpKind.LOOP_MOVE_DATA, ops[loop_start + 2].argument));
      } else if (ops[loop_start + 2].kind === OpKind.DEC_PTR &&
          ops[loop_start + 4].kind === OpKind.INC_PTR &&
          ops[loop_start + 2].argument === ops[loop_start + 4].argument
      ) {
        new_ops.push(
        createOpcode(OpKind.LOOP_MOVE_DATA, -ops[loop_start + 2].argument));
      }
    }
  }

  return new_ops;
}

const c1_loop_optimizers: Array<optimize_loop_function> = [
  optimize_loop_set_to_zero,
  optimize_loop_move_ptr,
  optimize_loop_move_data,
];

function optimize_c1(ops: Array<Opcode>): Array<Opcode> {
  // c1_loop_optimizers
  {
    let pc = 0;
    const open_bracket_stack = [];

    while (pc < ops.length) {
      const instruction = ops[pc];

      if (instruction.kind === OpKind.JUMP_IF_DATA_ZERO) {
        open_bracket_stack.push(pc);
        pc++;
      } else if (instruction.kind === OpKind.JUMP_IF_DATA_NOT_ZERO) {
        if (!open_bracket_stack.length) {
          console.warn(`unmatched closing ']' at pc=${pc}`)
        }

        const open_bracket_offset = open_bracket_stack.pop();

        let optimized_loop: Array<Opcode> = [];

        let current_optimizer = 0;
        while (optimized_loop.length === 0 && current_optimizer < c1_loop_optimizers.length) {
          optimized_loop = c1_loop_optimizers[current_optimizer](ops, open_bracket_offset, pc);

          current_optimizer++;
        }

        if (optimized_loop.length !== 0) {
          ops = update_ops(ops, optimized_loop, open_bracket_offset, pc);
          pc = open_bracket_offset + optimized_loop.length;
        } else {
          pc++;
        }
      } else {
        pc++;
      }
    }
  }

  // optimize_range_update
  {
    let pc = 0;
    const open_bracket_stack = [];

    while (pc < ops.length) {
      const instruction = ops[pc];

      if (instruction.kind === OpKind.DEC_PTR) {
        open_bracket_stack.push(pc);

        // boost chrome performance from 105s 103ms to 18s 624ms
        // todo: check the reason
        const optimized_loop = optimize_range_update(ops, pc - 1);

        if (optimized_loop.length !== 0 && optimized_loop[0].argument === instruction.argument) {
          ops = update_ops(ops, optimized_loop, pc - (optimized_loop[0].argument * 2), pc);
          continue;
        }

        pc++;
      } else {
        pc++;
      }
    }
  }

  // set_data
  {
    let pc = 0;

    while (pc < ops.length) {
      const instruction = ops[pc];

      if (instruction.kind === OpKind.INC_DATA) {
        const prev_op = pc > 0 ? ops[pc - 1] : null;

        if (prev_op && prev_op.kind === OpKind.LOOP_SET_TO_ZERO) {
          prev_op.kind = OpKind.SET_DATA;
          prev_op.argument = ops[pc].argument;

          // remove Opcode INC_DATA
          ops = update_ops(ops, [], pc, pc);
        } else {
          pc++;
        }
      } else {
        pc++;
      }
    }
  }

  return ops;
}

function optimize_ptr_shift(ops: Array<Opcode>, loop_start: number, loop_end: number): Array<Opcode> {
  let offset = 0;
  let loop_depth = 0;
  let p = loop_start + 1;

  while (p < loop_end) {
    const op = ops[p];

    if (op.kind === OpKind.JUMP_IF_DATA_ZERO) {
      loop_depth += 1;
    } else if (op.kind === OpKind.JUMP_IF_DATA_NOT_ZERO) {
      loop_depth -= 1;
    }

    if (loop_depth === 0 && op.kind === OpKind.INC_PTR) {
      op.kind = OpKind.INC_OFFSET;

      offset += op.argument;
    }

    if (loop_depth === 0 && op.kind === OpKind.DEC_PTR) {
      op.kind = OpKind.DEC_OFFSET;

      offset -= op.argument;
    }

    p += 1;
  }

  if (offset !== 0) {
    // p - 1 - we want remove end of loop
    ops = update_ops(ops, [createOpcode(offset < 0 ? OpKind.DEC_PTR : OpKind.INC_PTR, Math.abs(offset))], p, p - 1);

    p++;
  }

  return ops;
}

function optimize_c2(ops: Array<Opcode>): Array<Opcode> {
  // optimize ptr shift in loops
  {
    let pc = 0;

    const open_bracket_stack: Array<number> = [];

    while (pc < ops.length) {
      const op = ops[pc];

      if (op.kind === OpKind.JUMP_IF_DATA_ZERO) {
        open_bracket_stack.push(pc);

        pc++;
      } else if (op.kind === OpKind.JUMP_IF_DATA_NOT_ZERO) {
        if (!open_bracket_stack.length) {
          console.warn(`unmatched closing ']' at pc=${pc}`)
        }

        const open_bracket_offset = open_bracket_stack.pop();

        const new_ops = optimize_ptr_shift(ops, open_bracket_offset, pc);

        pc += Math.abs(ops.length - new_ops.length) + 1;

        ops = new_ops;
      } else {
        pc++;
      }
    }

    // ops = optimize_ptr_shift(ops, 0, ops.length);

    // if (ops[ops.length - 1].kind === OpKind.INC_PTR || ops[ops.length - 1].kind === OpKind.DEC_PTR) {
    //   ops = ops.slice(0, ops.length - 1);
    // }
  }

  // optimize DATA_LOOP
  {
    let pc = 0;

    const open_bracket_stack: Array<number> = [];

    while (pc < ops.length) {
      const op = ops[pc];

      if (op.kind === OpKind.JUMP_IF_DATA_ZERO) {
        open_bracket_stack.push(pc);

        pc++;
      } else if (op.kind === OpKind.JUMP_IF_DATA_NOT_ZERO) {
        if (!open_bracket_stack.length) {
          console.warn(`unmatched closing ']' at pc=${pc}`)
        }

        const open_bracket_offset = open_bracket_stack.pop();

        let is_pure = true;
        let p = open_bracket_offset + 1;
        let update_loop_counter = null;
        let update_loop_counter_index = -1;
        let offset = 0;

        while (p < pc && is_pure) {
          const op = ops[p];

          if (
            op.kind === OpKind.JUMP_IF_DATA_ZERO || // if there any inner loop assume current loop is not pure
            (op.kind === OpKind.INC_PTR || op.kind === OpKind.DEC_PTR)
          ) {
            is_pure = false;
          }

          if (op.kind === OpKind.INC_OFFSET) {
            offset += op.argument;
          } else if(op.kind === OpKind.DEC_OFFSET) {
            offset -= op.argument;
          }


          if (
            (op.kind === OpKind.INC_DATA || op.kind === OpKind.DEC_DATA) &&
            offset === 0
          ) {
            if (update_loop_counter !== null) {
              is_pure = false;
            } {
              update_loop_counter = op;
              update_loop_counter_index = p;
            }
          }

          // TO_DO check if this can break optimization
          is_pure = is_pure && !(op.kind === OpKind.LOOP_MOVE_PTR);
          is_pure = is_pure && !(op.kind === OpKind.LOOP_MOVE_DATA);
          is_pure = is_pure && !(op.kind === OpKind.RESET_DATA_RANGE);

          p += 1;
        }

        is_pure = is_pure && (update_loop_counter_index === open_bracket_offset + 1 || update_loop_counter_index === pc - 1);

        if (is_pure && update_loop_counter !== null) {
          ops[open_bracket_offset].kind = OpKind.DATA_LOOP;
          
          let p = open_bracket_offset + 1;
          while (p < pc) {
            const op = ops[p];

            if (update_loop_counter !== op) {
              if (op.kind === OpKind.INC_DATA) {
                op.kind = OpKind.DATA_LOOP_ADD;
              } else if (op.kind === OpKind.DEC_DATA) {
                op.kind = OpKind.DATA_LOOP_SUB;
              }
            }

            p += 1;
          }

          ops[pc].kind = OpKind.DATA_LOOP_END;

          // remove update_loop_counter because it will be replaced with just set cell to zero
          ops = update_ops(ops, [], update_loop_counter_index, update_loop_counter_index);
        } else {
          pc++;
        }
      } else {
        pc++;
      }
    }
  }

  return ops;
}

export function optimize(ops: Array<Opcode>, optimization_kind: OptimizationKind): Array<Opcode> {
  if (optimization_kind === OptimizationKind.C0) {
    return ops;
  }

  if (OptimizationKind.C1 <= optimization_kind) {
    ops = optimize_c1(ops);
  }

  if (OptimizationKind.C2 <= optimization_kind) {
    ops = optimize_c2(ops);
  }

  return ops;
}

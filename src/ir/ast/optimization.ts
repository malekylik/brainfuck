import { createOpcode, Opcode } from 'ir/opcode';
import { OpKind } from 'ir/opcode-kinds';
import { OptimizationKind } from 'ir/optimization-kinds';
import { Ast, LoopBlock, ParseSymbol } from './ast';

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
    ops[dec_ptr - 1].argument === 1) {
    dec_ptr -= 2;
  }

  if (dec_ptr_strt - dec_ptr > 3) {
    new_ops.push(createOpcode(OpKind.RESET_DATA_RANGE, (dec_ptr_strt - dec_ptr) / 2, { start: 0, end: 0, line: 0 }));
  }

  return new_ops;
}

function optimize_loop_set_to_zero(ops: Array<Opcode>, loop_start: number, loop_end: number): Array<Opcode> {
  const new_ops = [];

  if (loop_end - loop_start === 2) {
    const repeated_op = ops[loop_start + 1];

    if (repeated_op.kind === OpKind.INC_DATA || repeated_op.kind === OpKind.DEC_DATA) {
      new_ops.push(createOpcode(OpKind.LOOP_SET_TO_ZERO, 0, { start: 0, end: 0, line: 0 }));
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
          : -repeated_op.argument, { start: 0, end: 0, line: 0 }));
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
    ) {
      if (ops[loop_start + 2].kind === OpKind.INC_PTR &&
        ops[loop_start + 4].kind === OpKind.DEC_PTR &&
        ops[loop_start + 2].argument === ops[loop_start + 4].argument) {
        new_ops.push(createOpcode(OpKind.LOOP_MOVE_DATA, ops[loop_start + 2].argument, { start: 0, end: 0, line: 0 }));
      } else if (ops[loop_start + 2].kind === OpKind.DEC_PTR &&
        ops[loop_start + 4].kind === OpKind.INC_PTR &&
        ops[loop_start + 2].argument === ops[loop_start + 4].argument
      ) {
        new_ops.push(
          createOpcode(OpKind.LOOP_MOVE_DATA, -ops[loop_start + 2].argument, { start: 0, end: 0, line: 0 }));
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
    ops = update_ops(ops, [createOpcode(offset < 0 ? OpKind.DEC_PTR : OpKind.INC_PTR, Math.abs(offset), { start: 0, end: 0, line: 0 })], p, p - 1);

    p++;
  }

  return ops;
}

function optimize_c2(ops: Ast): Ast {
  function optimize_ptr_shift(ast: LoopBlock) {
    if (ast.is_pure) {
      ast.body.forEach((n) => {
        if (n.opkode === OpKind.INC_PTR) {
          n.opkode = OpKind.INC_OFFSET;
        }

        if (n.opkode === OpKind.DEC_PTR) {
          n.opkode = OpKind.DEC_OFFSET;
        }
      });
    }

    ast.body.forEach((n) => {
      if (n.type === ParseSymbol.BlockStatement) {
        optimize_ptr_shift(n);
      }
    });
  }

  // optimize ptr shift in loops
  {
    optimize_ptr_shift(ops as LoopBlock);
  }

  return ops;
}

export function optimize(ops: Ast, optimization_kind: OptimizationKind): Ast {
  if (optimization_kind === OptimizationKind.C0) {
    return ops;
  }

  // if (OptimizationKind.C1 <= optimization_kind) {
  //   ops = optimize_c1(ops);
  // }

  // if (OptimizationKind.C2 <= optimization_kind) {
  //   ops = optimize_c2(ops);
  // }

  return ops;
}

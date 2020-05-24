import { OpKind } from './opcode-kinds';
import { Opcode, createOpcode } from './opcode';
import { OptimizationKind } from './optimization-kinds';

type optimize_loop_function = (ops: Array<Opcode>, loop_start: number, loop_end: number) => Array<Opcode>;

// Optimizes a loop that starts at loop_start (the opening JUMP_IF_DATA_ZERO).
// The loop runs until the end of ops (implicitly there's a back-jump after the
// last op in ops).
//
// If optimization succeeds, returns a sequence of instructions that replace the
// loop; otherwise, returns an empty vector.
function optimize_loop(ops: Array<Opcode>, loop_start: number): Array<Opcode> {
  const new_ops = [];

  if (ops.length - loop_start === 2) {
    const repeated_op = ops[loop_start + 1];

    if (repeated_op.kind === OpKind.INC_DATA || repeated_op.kind === OpKind.DEC_DATA) {
      new_ops.push(createOpcode(OpKind.LOOP_SET_TO_ZERO, 0));
    } else if (repeated_op.kind === OpKind.INC_PTR || repeated_op.kind === OpKind.DEC_PTR) {
      new_ops.push(
      createOpcode(OpKind.LOOP_MOVE_PTR, repeated_op.kind === OpKind.INC_PTR
                    ? repeated_op.argument
                    : -repeated_op.argument));
    }
  } else if (ops.length - loop_start === 5) {
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

export function _translate_program(tokens: Array<string>): Array<Opcode> {
  let pc = 0;
  let program_size = tokens.length;
  let ops: Array<Opcode> = [];

  // Throughout the translation loop, this stack contains offsets (in the ops
  // vector) of open brackets (JUMP_IF_DATA_ZERO ops) waiting for a closing
  // bracket. Since brackets nest, these naturally form a stack. The
  // JUMP_IF_DATA_ZERO ops get added to ops with their argument set to 0 until a
  // matching closing bracket is encountered, at which point the argument can be
  // back-patched.
  const open_bracket_stack = [];

  while (pc < program_size) {
    const instruction = tokens[pc];

    if (instruction == '[') {
      // Place a jump op with a placeholder 0 offset. It will be patched-up to
      // the right offset when the matching ']' is found.
      open_bracket_stack.push(ops.length);
      ops.push(createOpcode(OpKind.JUMP_IF_DATA_ZERO, 0));
      pc++;
    } else if (instruction == ']') {
      if (!open_bracket_stack.length) {
        console.warn(`unmatched closing ']' at pc=${pc}`)
      }
      const open_bracket_offset = open_bracket_stack.pop();

      // Try to optimize this loop; if optimize_loop succeeds, it returns a
      // non-empty vector which we can splice into ops in place of the loop.
      // If the returned vector is empty, we proceed as usual.
      // const optimized_loop = optimize_loop(ops, open_bracket_offset);
      const optimized_loop: Array<Opcode> = [];

      // console.log(open_bracket_offset);

      if (!optimized_loop.length) {
          // let offset = 0;
          // let loop_depth = 0;
          // let isPure = true;
          // let p = open_bracket_offset + 1;

          // const buffer_size = 60000;
          // const loop_count = new Uint8Array(buffer_size);
          // const middle = (buffer_size / 2) | 0;

          // while (p < ops.length) {
          //   const op = ops[p];

          //   if (op.kind === OpKind.JUMP_IF_DATA_ZERO) {
          //     isPure = isPure && false;
          //     loop_depth += 1;
          //   } else if (op.kind === OpKind.JUMP_IF_DATA_NOT_ZERO) {
          //     loop_depth -= 1;
          //   }

          //   if (loop_depth === 0 && op.kind === OpKind.INC_PTR) {
          //     op.kind = OpKind.INC_OFFSET;

          //     offset += op.argument;
          //   }

          //   if (loop_depth === 0 && op.kind === OpKind.DEC_PTR) {
          //     op.kind = OpKind.DEC_OFFSET;

          //     offset -= op.argument;
          //   }

          //   if (loop_depth === 0 && op.kind === OpKind.INC_DATA) {
          //     loop_count[middle + offset] += op.argument;
          //   } else if (loop_depth === 0 && op.kind === OpKind.DEC_DATA) {
          //     loop_count[middle + offset] -= op.argument;
          //   }

          //   // TO_DO check if this can break optimization
          //   isPure = isPure && !(op.kind === OpKind.LOOP_MOVE_PTR);
          //   isPure = isPure && !(op.kind === OpKind.LOOP_MOVE_DATA);
          //   isPure = isPure && !(op.kind === OpKind.RESET_DATA_RANGE);

          //   // check if counter of data_loop updated from outer loop
          //   if (loop_depth === 0 && op.kind === OpKind.DATA_LOOP && loop_count[middle + offset] !== 0) {
          //     isPure = false;
          //   }

          //   p += 1;
          // }

          // if (offset !== 0) {
          //   ops.push(createOpcode(offset < 0 ? OpKind.DEC_PTR : OpKind.INC_PTR, Math.abs(offset)));
          // }

          // if (offset === 0 && isPure) {
          //   let update_loop_counter = 0;
          //   let offset = 0;

          //   let p = open_bracket_offset + 1;

          //   while (p < ops.length) {
          //     const op = ops[p];

          //     if (op.kind === OpKind.INC_OFFSET) {
          //       offset += op.argument;
          //     } else if (op.kind === OpKind.DEC_OFFSET) {
          //       offset -= op.argument;
          //     }

          //     if (offset === 0) {
          //       if (op.kind === OpKind.INC_DATA) {
          //         update_loop_counter += op.argument;
          //       } else if (op.kind === OpKind.DEC_DATA) {
          //         update_loop_counter -= op.argument;
          //       }
          //     }

          //     p += 1;
          //   }

          //   if (Math.abs(update_loop_counter) === 1) {
          //     let p = open_bracket_offset + 1 + Number(ops[open_bracket_offset + 1].kind === OpKind.DEC_DATA);
          //     const end = ops.length - Number(ops[ops.length - 1].kind === OpKind.DEC_DATA);

          //     if (p > open_bracket_offset + 1 || end < ops.length) {
          //       const start = createOpcode(OpKind.DATA_LOOP, 0);

          //       optimized_loop.push(start);

          //       while (p < end) {
          //         const op = ops[p];

          //         if (op.kind === OpKind.INC_DATA) {
          //             optimized_loop.push(createOpcode(OpKind.DATA_LOOP_ADD, op.argument));
          //         } else if (op.kind === OpKind.DEC_DATA) {
          //           optimized_loop.push(createOpcode(OpKind.DATA_LOOP_SUB, op.argument));
          //         } else {
          //           optimized_loop.push(op);
          //         }

          //         p += 1;
          //       }

          //       optimized_loop.push(createOpcode(OpKind.DATA_LOOP_END, open_bracket_offset));
          //       ops = ops.slice(0, open_bracket_offset).concat(optimized_loop);

          //       start.argument = ops.length - 1;
          //     } else {
          //       ops[open_bracket_offset].argument = ops.length;
          //       ops.push(createOpcode(OpKind.JUMP_IF_DATA_NOT_ZERO, open_bracket_offset));
          //     }
          //   } else {
              // Loop wasn't optimized, so proceed emitting the back-jump to ops. We
              // have the offset of the matching '['. We can use it to create a new
              // jump op for the ']' we're handling, as well as patch up the offset of
              // the matching '['.
                // ops[open_bracket_offset].argument = ops.length;
                // ops.push(createOpcode(OpKind.JUMP_IF_DATA_NOT_ZERO, open_bracket_offset));
            // }

          // } else {
        // Loop wasn't optimized, so proceed emitting the back-jump to ops. We
        // have the offset of the matching '['. We can use it to create a new
        // jump op for the ']' we're handling, as well as patch up the offset of
        // the matching '['.
          ops[open_bracket_offset].argument = ops.length;
          ops.push(createOpcode(OpKind.JUMP_IF_DATA_NOT_ZERO, open_bracket_offset));
        // }
      } else {
        // Replace this whole loop with optimized_loop.
        ops = ops.slice(0, open_bracket_offset).concat(optimized_loop);
      }
      pc++;
    } else {
      // Not a jump; all the other ops can be repeated, so find where the repeat
      // ends.
      const start = pc++;
      while (pc < program_size && tokens[pc] === instruction) {
        pc++;
      }
      // Here pc points to the first new instruction encountered, or to the end
      // of the program.
      const num_repeats = pc - start;

      // Figure out which op kind the instruction represents and add it to the
      // ops.
      let kind = OpKind.INVALID_OP;
      switch (instruction) {
      case '>':
        kind = OpKind.INC_PTR;
        break;
      case '<': {
        // const optim = optimize_range_update(ops, ops.length - 1);

        // if (optim.length && optim[0].argument === num_repeats) {
        //   ops = ops.slice(0, ops.length - (optim[0].argument * 2)).concat(optim);

        //   continue;
        // }

        kind = OpKind.DEC_PTR;
        break;
      }
      case '+': {
        // const prev_op = ops.length > 0 ? ops[ops.length - 1] : null;

        // if (prev_op && prev_op.kind === OpKind.LOOP_SET_TO_ZERO) {
        //   prev_op.kind = OpKind.SET_DATA;
        //   prev_op.argument = num_repeats;

        //   continue;
        // }

        kind = OpKind.INC_DATA;
        break;
      }
      case '-':
        kind = OpKind.DEC_DATA;
        break;
      case ',':
        kind = OpKind.READ_STDIN;
        break;
      case '.':
        kind = OpKind.WRITE_STDOUT;
        break;
        default: { console.warn(`"bad char '${instruction}' at pc=${start}`); }
      }

      ops.push(createOpcode(kind, num_repeats));
    }
  }

  return ops;
}

function parse_to_opcodes(tokens: Array<string>): Array<Opcode> {
  let pc = 0;
  let program_size = tokens.length;
  let ops: Array<Opcode> = [];

  while (pc < program_size) {
    const instruction = tokens[pc];

    if (instruction == '[') {
      ops.push(createOpcode(OpKind.JUMP_IF_DATA_ZERO, 0));
      pc++;
    } else if (instruction == ']') {
      ops.push(createOpcode(OpKind.JUMP_IF_DATA_NOT_ZERO, 0));
      pc++;
    } else {
      const start = pc++;

      while (pc < program_size && tokens[pc] === instruction) {
        pc++;
      }

      const num_repeats = pc - start;

      let kind = OpKind.INVALID_OP;
      switch (instruction) {
        case '>': {
          kind = OpKind.INC_PTR;
          break;
        }
        case '<': {
          kind = OpKind.DEC_PTR;
          break;
        }
        case '+': {
          kind = OpKind.INC_DATA;
          break;
        }
        case '-': {
          kind = OpKind.DEC_DATA;
          break;
        }
        case ',': {
          kind = OpKind.READ_STDIN;
          break;
        }
        case '.': {
          kind = OpKind.WRITE_STDOUT;
          break;
        }

        default: { console.warn(`"bad char '${instruction}' at pc=${start}`); }
      }

      ops.push(createOpcode(kind, num_repeats));
    }
  }

  return ops;
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

function update_ops(ops: Array<Opcode>, optimized_loop: Array<Opcode>, loop_start: number, loop_end: number): Array<Opcode> {
  const start = ops.slice(0, loop_start);
  const end = ops.slice(loop_end + 1);

  return start.concat(optimized_loop).concat(end);
}

const c1_loop_optimizers: Array<optimize_loop_function> = [
  optimize_loop_set_to_zero,
  optimize_loop_move_ptr,
  optimize_loop_move_data,
];

function optimize(ops: Array<Opcode>, optimization_kind: OptimizationKind): Array<Opcode> {
  if (optimization_kind === OptimizationKind.C0) {
    return ops;
  }

  if (optimization_kind === OptimizationKind.C1) {
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

  if (optimization_kind === OptimizationKind.C1) {
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

  return ops;
}

function path_jumptable(ops: Array<Opcode>): void {
  let pc = 0;
  let program_size = ops.length;

  while (pc < program_size) {
    const instruction = ops[pc];

    if (instruction.kind === OpKind.JUMP_IF_DATA_ZERO) {
      let bracket_nesting = 1;
      let seek = pc;

      while (bracket_nesting && ++seek < program_size) {
        if (ops[seek].kind === OpKind.JUMP_IF_DATA_NOT_ZERO) {
          bracket_nesting--;
        } else if (ops[seek].kind == OpKind.JUMP_IF_DATA_ZERO) {
          bracket_nesting++;
        }
      }

      if (!bracket_nesting) {
        ops[seek].argument = pc;
        ops[pc].argument = seek;
      } else {
        console.warn(`unmatched '[' at pc=${pc}`);
      }

    }

    pc++;
  }
}

export function translate_program(tokens: Array<string>, optimization_kind: OptimizationKind): Array<Opcode> {
  let ops = parse_to_opcodes(tokens);

  ops = optimize(ops, optimization_kind);

  path_jumptable(ops);

  return ops;
}

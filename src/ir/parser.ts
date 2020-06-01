import { OpKind } from './opcode-kinds';
import { Opcode, createOpcode } from './opcode';
import { OptimizationKind } from './optimization-kinds';
import { optimize } from './optimization';

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

function path_jumptable(ops: Array<Opcode>): void {
  let pc = 0;
  let program_size = ops.length;

  while (pc < program_size) {
    const instruction = ops[pc];

    if (instruction.kind === OpKind.JUMP_IF_DATA_ZERO || instruction.kind === OpKind.DATA_LOOP) {
      let bracket_nesting = 1;
      let seek = pc;

      while (bracket_nesting && ++seek < program_size) {
        if (ops[seek].kind === OpKind.JUMP_IF_DATA_NOT_ZERO || ops[seek].kind === OpKind.DATA_LOOP_END) {
          bracket_nesting--;
        } else if (ops[seek].kind == OpKind.JUMP_IF_DATA_ZERO || ops[seek].kind === OpKind.DATA_LOOP) {
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

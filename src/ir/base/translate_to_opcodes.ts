import { createOpcode, Opcode } from 'ir/opcode';
import { OpKind } from 'ir/opcode-kinds';

export function parse_to_opcodes(tokens: Array<string>): Array<Opcode> {
  let pc = 0;
  let program_size = tokens.length;
  let line = 0;
  let ops: Array<Opcode> = [];

  while (pc < program_size) {
    const instruction = tokens[pc];

    if (instruction == '[') {
      ops.push(createOpcode(OpKind.JUMP_IF_DATA_ZERO, 0, { start: pc, line, end: pc + 1 }));
      pc++;
    } else if (instruction == ']') {
      ops.push(createOpcode(OpKind.JUMP_IF_DATA_NOT_ZERO, 0, { start: pc, line, end: pc + 1 }));
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
        case '\n': {
          line += 1;
          break;
        }

        default: { console.warn(`"bad char '${instruction}' at pc=${start}`); }
      }

      ops.push(createOpcode(kind, num_repeats, { start, line, end: pc }));
    }
  }

  return ops;
}

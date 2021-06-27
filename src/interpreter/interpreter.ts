import { OpKind } from 'ir/opcode-kinds';
import { Opcode } from 'ir/opcode';
import { opKindToChar } from 'ir/utils';
import { CompiledModule, InputFunction, OutputFunction } from 'types/compiler';

const MEMORY_SIZE = 30000;

export function interpret(ops: Array<Opcode>, inF: InputFunction, outF: OutputFunction): Promise<CompiledModule> {
  const memory = new Uint8Array(MEMORY_SIZE);
  const offset_stack: Array<number> = [];
  let pc = 0;
  let dataptr = 0;
  let offset = 0;
  let loop_data_offset = 0;
  let loop_data_offsets: Array<number> = [];

  function run() {
    while (pc < ops.length) {
      const op = ops[pc];

      switch (op.kind) {
        case OpKind.INC_PTR: {
          dataptr += op.argument;

          break;
        }

        case OpKind.DEC_PTR: {
          dataptr -= op.argument;

          break;
        }

        case OpKind.INC_OFFSET: {
          offset += op.argument;

          break;
        }

        case OpKind.DEC_OFFSET: {
          offset -= op.argument;

          break;
        }

        case OpKind.INC_DATA: {
          memory[dataptr + offset] += op.argument;

          break;
        }

        case OpKind.DEC_DATA: {
          memory[dataptr + offset] -= op.argument;

          break;
        }

        case OpKind.READ_STDIN: {
          for (let i = 0; i < op.argument; i++) {
            memory[dataptr + offset] = Number(inF());
          }

          break;
        }

        case OpKind.WRITE_STDOUT: {
          for (let i = 0; i < op.argument; i++) {
            outF(memory[dataptr + offset]);
          }

          break;
        }

        case OpKind.LOOP_SET_TO_ZERO: {
          memory[dataptr + offset] = 0;

          break;
        }

        case OpKind.LOOP_MOVE_PTR: {
          while (memory[dataptr + offset]) {
            dataptr += op.argument;
          }

          break;
        }

        case OpKind.LOOP_MOVE_DATA: {
          const move_to_ptr = dataptr + offset + op.argument;
          memory[move_to_ptr] += memory[dataptr + offset];
          memory[dataptr + offset] = 0;

          break;
        }

        case OpKind.JUMP_IF_DATA_ZERO: {
          if (memory[dataptr + offset] === 0) {
            pc = op.argument;
          } else {
            offset_stack.push(offset);
          }
          
          break;
        }

        case OpKind.JUMP_IF_DATA_NOT_ZERO: {
          if (memory[dataptr + offset_stack[offset_stack.length - 1]] !== 0) {
            pc = op.argument;
            offset = offset_stack[offset_stack.length - 1];
          } else {
            // Should be shown as array at compile time
            offset = offset_stack.pop() ?? 0;
          }

          break;
        }

        case OpKind.RESET_DATA_RANGE: {
          for (let i = 1; i < op.argument + 1; i++) {
            memory[dataptr + offset + i] = 0;
          }

          break;
        }

        case OpKind.SET_DATA: {
          memory[dataptr + offset] = op.argument;

          break;
        }

        case OpKind.DATA_LOOP: {
          if (memory[dataptr + offset] === 0) {
            pc = op.argument;
          } else {
            loop_data_offset = offset;
            loop_data_offsets.push(loop_data_offset);
          }

          break;
        }

        case OpKind.DATA_LOOP_ADD: {
          memory[dataptr + offset] += memory[dataptr + loop_data_offset] * op.argument;

          break;
        }
        
        case OpKind.DATA_LOOP_SUB: {
          memory[dataptr + offset] -= memory[dataptr + loop_data_offset] * op.argument;

          break;
        }

        case OpKind.DATA_LOOP_END: {
          if (memory[dataptr + loop_data_offset] !== 0) {
            memory[dataptr + loop_data_offset] = 0;
          }

          // Should be shown as array at compile time
          offset = loop_data_offsets.pop() ?? 0;
          loop_data_offset = loop_data_offsets[loop_data_offsets.length - 1];

          break;
        }

        default: { console.warn(`bad char ' ${opKindToChar(op.kind)} ' at pc=${pc}`); }
      }

      pc++;
    }

  }

  return Promise.resolve({
    module: { run },
    memory,
  });
}

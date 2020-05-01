import { TextGenerator } from '@text-generation/text-generation';
import { OpKind } from '@ir/opcode-kinds';
import { Opcode } from '@ir/opcode';
import { opKindToChar } from '@ir/utils';

export function compile(ops: Array<Opcode>): void {
  const textGenerator = new TextGenerator();
  const memoryName = 'memory';
  const dataptr = 'p';

  textGenerator
    .const()
    .name(memoryName)
    .assigne()
    .newUint8Array(30000)
    .endLine();

  textGenerator
    .newLine()
    .let()
    .name(dataptr)
    .assigne()
    .number(0)
    .endLine();

    let pc = 0;
    while (pc < ops.length) {
      const op = ops[pc];
  
      switch (op.kind) {
        case OpKind.INC_PTR: {
          textGenerator
            .newLine()
            .name(dataptr)
            .assigne()
            .name(dataptr)
            .add()
            .number(op.argument)
            .endLine();

          break;
        }
        case OpKind.DEC_PTR: {
          textGenerator
            .newLine()
            .name(dataptr)
            .assigne()
            .name(dataptr)
            .subtract()
            .number(op.argument)
            .endLine();

          break;
        }

        // case OpKind.INC_DATA:
        //   memory[dataptr] += op.argument;
        //   break;
        // case OpKind.DEC_DATA:
        //   memory[dataptr] -= op.argument;
        //   break;
        // case OpKind.READ_STDIN:
        //   for (let i = 0; i < op.argument; i++) {
        //     memory[dataptr] = Number(prompt('enter value'));
        //   }
        //   break;
        // case OpKind.WRITE_STDOUT:
        //   for (let i = 0; i < op.argument; i++) {
        //     self.postMessage({ type: 'out', value: String.fromCharCode(memory[dataptr]) });
        //   }
        //   break;
        // case OpKind.LOOP_SET_TO_ZERO:
        //   memory[dataptr] = 0;
        //   break;
        // case OpKind.LOOP_MOVE_PTR:
        //   while (memory[dataptr]) {
        //     dataptr += op.argument;
        //   }
        //   break;
        // case OpKind.LOOP_MOVE_DATA: {
        //   if (memory[dataptr]) {
        //     const move_to_ptr = dataptr + op.argument;
        //     memory[move_to_ptr] += memory[dataptr];
        //     memory[dataptr] = 0;
        //   }
        //   break;
        // }
        // case OpKind.JUMP_IF_DATA_ZERO:
        //   if (memory[dataptr] == 0) {
        //     pc = op.argument;
        //   }
        //   break;
        // case OpKind.JUMP_IF_DATA_NOT_ZERO:
        //   if (memory[dataptr] != 0) {
        //     pc = op.argument;
        //   }
        //   break;
    //     default: { console.warn(`bad char ' ${opKindToChar(op.kind)} ' at pc=${pc}`); }
      }
  
      pc++;
    }

  console.log(textGenerator.toString());
}

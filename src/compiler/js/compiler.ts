import { TextGenerator } from '@text-generation/text-generation';
import { OpKind } from '@ir/opcode-kinds';
import { Opcode } from '@ir/opcode';
import { opKindToChar } from '@ir/utils';

export function compile(ops: Array<Opcode>, inF: string, outF: string): CompiledFunc {
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

        case OpKind.INC_DATA: {
          textGenerator
            .newLine()
            .name(memoryName)
            .objectProperty(dataptr)
            .assigne()
            .name(memoryName)
            .objectProperty(dataptr)
            .add()
            .number(op.argument)
            .endLine();

          break;
        }

        case OpKind.DEC_DATA: {
          textGenerator
            .newLine()
            .name(memoryName)
            .objectProperty(dataptr)
            .assigne()
            .name(memoryName)
            .objectProperty(dataptr)
            .subtract()
            .number(op.argument)
            .endLine();

          break;
        }

        case OpKind.READ_STDIN: {
          textGenerator
            .newLine()
            .for()
            .let()
            .name('i')
            .assigne()
            .number(0)
            .endForDeclaration()
            .name('i')
            .less()
            .number(op.argument)
            .endForCondition()
            .name('i')
            .assigne()
            .name('i')
            .add()
            .number(1)
            .endForUpdate()
              .newLine()
              .name(memoryName)
              .objectProperty(dataptr)
              .assigne()
              .call(inF)
              .endLine()
              .newLine()
            .endFor()
            .endLine();

            break;
          }

        case OpKind.WRITE_STDOUT: {
          textGenerator
            .newLine()
            .for()
            .let()
            .name('i')
            .assigne()
            .number(0)
            .endForDeclaration()
            .name('i')
            .less()
            .number(op.argument)
            .endForCondition()
            .name('i')
            .assigne()
            .name('i')
            .add()
            .number(1)
            .endForUpdate()
              .newLine()
              .call(outF, [`${memoryName}[${dataptr}]`])
              .endLine()
              .newLine()
            .endFor()
            .endLine();

            break;
        }

        case OpKind.LOOP_SET_TO_ZERO: {
          textGenerator
            .newLine()
            .name(memoryName)
            .objectProperty(dataptr)
            .assigne()
            .number(0)
            .endLine()

          break;
        }

        case OpKind.LOOP_MOVE_PTR: {
          textGenerator
          .newLine()
          .for()
          .endForDeclaration()
          .name(memoryName)
          .objectProperty(dataptr)
          .endForCondition()
          .endForUpdate()
            .newLine()
            .name(dataptr)
            .assigne()
            .name(dataptr)
            .add()
            .number(op.argument)
            .endLine()
            .newLine()
          .endFor();

          break;
        }

        case OpKind.LOOP_MOVE_DATA: {
          textGenerator
            .newLine()
            .if()
            .name(memoryName)
            .objectProperty(dataptr)
            .endIfCondition()
              .newLine()
              .const()
              .name('move_to_ptr')
              .assigne()
              .name(dataptr)
              .add()
              .number(op.argument)
              .endLine()
              .newLine()
              .name(memoryName)
              .objectProperty('move_to_ptr')
              .assigne()
              .name(memoryName)
              .objectProperty('move_to_ptr')
              .add()
              .name(memoryName)
              .objectProperty(dataptr)
              .endLine()
              .newLine()
              .name(memoryName)
              .objectProperty(dataptr)
              .assigne()
              .number(0)
              .endLine()
              .newLine()
            .endIf();

          break;
        }

        case OpKind.JUMP_IF_DATA_ZERO: {
          textGenerator
            .newLine()
            .for()
            .endForDeclaration()
            .name(memoryName)
            .objectProperty(dataptr)
            .endForCondition()
            .endForUpdate()

          break;
        }

        case OpKind.JUMP_IF_DATA_NOT_ZERO: {
          textGenerator
            .newLine()
            .endFor();

          break;
        }

        default: { console.warn(`bad char ' ${opKindToChar(op.kind)} ' at pc=${pc}`); }
      }
  
      pc++;
    }

  return new Function(textGenerator.toString()) as CompiledFunc;
}

import { OpKind } from 'ir/opcode-kinds';
import { Opcode } from 'ir/opcode';
import { opKindToChar } from 'ir/utils';
import { CompiledModule, InputFunction, OutputFunction } from 'types/compiler';

const txd = new TextDecoder();
const txe = new TextEncoder();

const encode = (code: string) => Array.from(txe.encode(code));

function compile_prod(ops: Array<Opcode>, inF: InputFunction, outF: OutputFunction): Promise<CompiledModule> {
  const memoryName = '__m__';
  const dataptr = 'p';
  const inFName = inF.name;
  const outFName = outF.name;
  const code = [];
  const offset_stack = [];
  let offset = 0;
  let loop_data_offset = 0;
  let loop_data_offsets = [];

  (self as any)[memoryName] = new Uint8Array(30000);

  code.push(
    encode(`let ${dataptr} = 0;\n`)
  );

    let pc = 0;
    while (pc < ops.length) {
      const op = ops[pc];

      switch (op.kind) {
        case OpKind.INC_PTR: {
          code.push(
            encode(`${dataptr} += ${op.argument};\n`)
          );

          break;
        }

        case OpKind.DEC_PTR: {
          code.push(
            encode(`${dataptr} -= ${op.argument};\n`)
          );

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
          code.push(
            encode(`${memoryName}[${dataptr} + ${offset}] += ${op.argument};\n`)
          );

          break;
        }

        case OpKind.DEC_DATA: {
          code.push(
            encode(`${memoryName}[${dataptr} + ${offset}] -= ${op.argument};\n`)
          );

          break;
        }

        case OpKind.READ_STDIN: {
          code.push(
            encode(`for (let i = 0; i < ${op.argument}; i++) ${memoryName}[${dataptr} + ${offset}] = ${inFName}();\n`)
          );

          break;
          }

        case OpKind.WRITE_STDOUT: {
          if (op.argument < 2) {
            code.push(
              encode(`${outFName}(${memoryName}[${dataptr} + ${offset}]);\n`)
            ); 
          } else {
            code.push(
              encode(`for (let i = 0; i < ${op.argument}; i++) ${outFName}(${memoryName}[${dataptr} + ${offset}]);\n`)
            );
          }

            break;
        }

        case OpKind.LOOP_SET_TO_ZERO: {
          code.push(
            encode(`${memoryName}[${dataptr} + ${offset}] = 0;\n`)
          );

          break;
        }

        case OpKind.LOOP_MOVE_PTR: {
          code.push(
            encode(
              `while (${memoryName}[${dataptr} + ${offset}]) {\n` +
                `${dataptr} += ${op.argument};\n}\n`
              )
          );

          break;
        }
        case OpKind.LOOP_MOVE_DATA: {
          // TO_DO check why 'if' this degradate performance in chrome
          code.push(
            encode(
              // `if (${dataptr} + ${offset + op.argument} >= 0) {\n` +
              `${memoryName}[${dataptr} + ${offset + op.argument}] += ${memoryName}[${dataptr} + ${offset}];\n` +
              `${memoryName}[${dataptr} + ${offset}] = 0;\n`
              // `}\n`
            )
          );

          break;
        }

        case OpKind.JUMP_IF_DATA_ZERO: {
          offset_stack.push(offset);

          code.push(
            encode(`while (${memoryName}[${dataptr} + ${offset}]) {\n`)
          );

          break;
        }

        case OpKind.JUMP_IF_DATA_NOT_ZERO: {
          code.push(
            encode(`}\n`)
          );

          offset = offset_stack.pop();

          break;
        }

        case OpKind.RESET_DATA_RANGE: {
          for (let i = 1; i < op.argument + 1; i++) {
            code.push(
              encode(`${memoryName}[${dataptr} + ${offset + i}] = `)
            );
          }

          code.push(
            encode(`${0};\n`)
          );

          break;
        }

        case OpKind.SET_DATA: {
          code.push(
            encode(`${memoryName}[${dataptr} + ${offset}] = ${op.argument};\n`)
          );

          break;
        }

        case OpKind.DATA_LOOP: {
          loop_data_offset = offset;
          loop_data_offsets.push(loop_data_offset);
          code.push(
            encode(`if (${memoryName}[${dataptr} + ${loop_data_offset}]) {\n`)
          );

          break;
        }

        case OpKind.DATA_LOOP_END: {
          code.push(
            encode(
              `${memoryName}[${dataptr} + ${loop_data_offset}] = 0;\n` +
              `}\n`
            )
          );

          offset = loop_data_offsets.pop();
          loop_data_offset = loop_data_offsets[loop_data_offsets.length - 1];

          break;
        }

        case OpKind.DATA_LOOP_ADD: {
          if (op.argument === 1) {
            code.push(
              encode(`${memoryName}[${dataptr} + ${offset}] += ${memoryName}[${dataptr} + ${loop_data_offset}];\n`)
            );
          } else {
            code.push(
              encode(`${memoryName}[${dataptr} + ${offset}] += ${memoryName}[${dataptr} + ${loop_data_offset}] * ${op.argument};\n`)
            );
          }

          break;
        }

        case OpKind.DATA_LOOP_SUB: {
          if (op.argument === 1) {
            code.push(
              encode(`${memoryName}[${dataptr} + ${offset}] -= ${memoryName}[${dataptr} + ${loop_data_offset}];\n`)
            );
          } else {
            code.push(
              encode(`${memoryName}[${dataptr} + ${offset}] -= ${memoryName}[${dataptr} + ${loop_data_offset}] * ${op.argument};\n`)
            );
          }

          break;
        }

        default: { console.warn(`bad char ' ${opKindToChar(op.kind)} ' at pc=${pc}`); }
      }
  
      pc++;
    }

  const string = txd.decode(Uint8Array.from(code.flat()));
  const module = new Function(string);

  return Promise.resolve({
    module: { run: () => { module(); } },
    memory: (self as any)[memoryName]
  });
}

export { compile_prod as compile };

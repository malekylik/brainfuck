import { OpKind } from 'ir/opcode-kinds';
import { Opcode } from 'ir/opcode';
import { opKindToChar } from 'ir/utils';

const txd = new TextDecoder();
const txe = new TextEncoder();

const encode = (code: string) => Array.from(txe.encode(code))

function compile_debug(ops: Array<Opcode>, inF: string, outF: string): CompiledFunc {
  const memoryName = 'm';
  const dataptr = 'p';
  const datanal = 'performance';
  const code = [];
  const offset_stack = [];
  let offset = 0;
  let loop_data_offset = 0;
  let loop_data_offsets = [];
  const generateNewName = (() => {
    let i = -1;
    return (depth: number) => {
      i++;
      return `${i}_${depth}`;
    }
  })();
  const loop_depth = [];
  let current_loop_name = generateNewName(0);

  code.push(
    encode(`return function* () {\n`)
  );
  code.push(
    encode(`const ${memoryName} = new Uint8Array(${30000});\n`)
  );
  code.push(
    encode(`let ${dataptr} = 0;\n`)
  );
  code.push(
    encode(`const ${datanal} = {};\n`)
  );

    let pc = 0;
    while (pc < ops.length) {
      const op = ops[pc];

      switch (op.kind) {
        case OpKind.INC_PTR: {
          code.push(
            encode(`${dataptr} += ${op.argument}; // ${pc}\n`)
          );

          break;
        }

        case OpKind.DEC_PTR: {
          code.push(
            encode(`${dataptr} -= ${op.argument}; // ${pc}\n`)
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
            encode(`${memoryName}[${dataptr} + ${offset}] += ${op.argument}; // ${pc} \n`)
          );

          break;
        }

        case OpKind.DEC_DATA: {
          code.push(
            encode(`${memoryName}[${dataptr} + ${offset}] -= ${op.argument}; // ${pc}\n`)
          );

          break;
        }

        case OpKind.READ_STDIN: {
          code.push(
            encode(`for (let i = 0; i < ${op.argument}; i++) ${memoryName}[${dataptr} + ${offset}] = ${inF}(); // ${pc} \n`)
          );

          break;
          }

        case OpKind.WRITE_STDOUT: {
          if (op.argument < 2) {
            code.push(
              encode(`${outF}(${memoryName}[${dataptr} + ${offset}]); // ${pc} \n`)
            ); 
          } else {
            code.push(
              encode(`for (let i = 0; i < ${op.argument}; i++) { yield m; ${outF}(${memoryName}[${dataptr} + ${offset}]); } // ${pc} \n`)
            );
          }

            break;
        }

        case OpKind.LOOP_SET_TO_ZERO: {
          code.push(
            encode(`${memoryName}[${dataptr} + ${offset}] = 0; // ${pc} \n`)
          );

          break;
        }

        case OpKind.LOOP_MOVE_PTR: {
          loop_depth.push(current_loop_name);
          current_loop_name = generateNewName(loop_depth.length);
          code.push(
            encode(`// ${current_loop_name}\n`)
          );

          code.push(
            encode(
              `while (${memoryName}[${dataptr} + ${offset}]) { // ${pc} \n` +
                `yield m;` +
                `${datanal}['${current_loop_name}'] = (1 + (${datanal}['${current_loop_name}'] || 0))\n` +
                `${dataptr} += ${op.argument};\n}\n`
              )
          );

          loop_depth.pop();

          break;
        }
        case OpKind.LOOP_MOVE_DATA: {
          code.push(
            encode(
              `${memoryName}[${dataptr} + ${offset + op.argument}] += ${memoryName}[${dataptr} + ${offset}]; // ${pc} \n` +
              `${memoryName}[${dataptr} + ${offset}] = 0; // ${pc} \n`
            )
          );

          break;
        }

        case OpKind.JUMP_IF_DATA_ZERO: {
          offset_stack.push(offset);

          loop_depth.push(current_loop_name);
          current_loop_name = generateNewName(loop_depth.length);

          code.push(
            encode(`// ${current_loop_name}\n`)
          );

          code.push(
            encode(`while (${memoryName}[${dataptr} + ${offset}]) { yield m; // ${pc} \n`)
          );

          code.push(
            encode(`${datanal}['${current_loop_name}'] = (1 + (${datanal}['${current_loop_name}'] || 0))\n`)
          );

          break;
        }

        case OpKind.JUMP_IF_DATA_NOT_ZERO: {
          code.push(
            encode(`}\n`)
          );

          offset = offset_stack.pop();

          loop_depth.pop();

          break;
        }

        case OpKind.RESET_DATA_RANGE: {
          for (let i = 1; i < op.argument + 1; i++) {
            code.push(
              encode(`${memoryName}[${dataptr} + ${offset + i}] = `)
            );
          }

          code.push(
            encode(`${0}; // ${pc} \n`)
          );

          break;
        }

        case OpKind.SET_DATA: {
          code.push(
            encode(`${memoryName}[${dataptr} + ${offset}] = ${op.argument}; // ${pc} \n`)
          );

          break;
        }

        case OpKind.DATA_LOOP: {
          loop_data_offset = offset;
          loop_data_offsets.push(loop_data_offset);
          code.push(
            encode(`if (${memoryName}[${dataptr} + ${loop_data_offset}]) { // ${pc} DATA_LOOP \n`)
          );

          break;
        }

        case OpKind.DATA_LOOP_END: {
          code.push(
            encode(
              `${memoryName}[${dataptr} + ${loop_data_offset}] = 0;\n` +
              `} // ${pc} DATA_LOOP_END \n`
            )
          );

          offset = loop_data_offsets.pop();

          break;
        }

        case OpKind.DATA_LOOP_ADD: {
          if (op.argument === 1) {
            code.push(
              encode(`${memoryName}[${dataptr} + ${offset}] += ${memoryName}[${dataptr} + ${loop_data_offset}]; // ${pc} \n`)
            );
          } else {
            code.push(
              encode(`${memoryName}[${dataptr} + ${offset}] += ${memoryName}[${dataptr} + ${loop_data_offset}] * ${op.argument}; // ${pc} \n`)
            );
          }

          break;
        }

        case OpKind.DATA_LOOP_SUB: {
          if (op.argument === 1) {
            code.push(
              encode(`${memoryName}[${dataptr} + ${offset}] -= ${memoryName}[${dataptr} + ${loop_data_offset}]; // ${pc} \n`)
            );
          } else {
            code.push(
              encode(`${memoryName}[${dataptr} + ${offset}] -= ${memoryName}[${dataptr} + ${loop_data_offset}] * ${op.argument}; // ${pc} \n`)
            );
          }

          break;
        }

        default: { console.warn(`bad char ' ${opKindToChar(op.kind)} ' at pc=${pc}`); }
      }
  
      pc++;
    }
    
    code.push(
      encode(`return ${datanal};\n`)
    );

  code.push(
    encode(`}\n`)
  );

  const string = txd.decode(Uint8Array.from(code.flat()));

  return new Function(string) as () => Array<number>;
}

function compile_prod(ops: Array<Opcode>, inF: string, outF: string): CompiledFunc {
  const memoryName = 'm';
  const dataptr = 'p';
  const code = [];
  const offset_stack = [];
  let offset = 0;
  let loop_data_offset = 0;
  let loop_data_offsets = [];

  code.push(
    encode(`const ${memoryName} = new Uint8Array(${30000});\n`)
  );
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
            encode(`for (let i = 0; i < ${op.argument}; i++) ${memoryName}[${dataptr} + ${offset}] = ${inF}();\n`)
          );

          break;
          }

        case OpKind.WRITE_STDOUT: {
          if (op.argument < 2) {
            code.push(
              encode(`${outF}(${memoryName}[${dataptr} + ${offset}]);\n`)
            ); 
          } else {
            code.push(
              encode(`for (let i = 0; i < ${op.argument}; i++) ${outF}(${memoryName}[${dataptr} + ${offset}]);\n`)
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
          code.push(
            encode(
              `if (${dataptr} + ${offset + op.argument} >= 0) {\n` +
              `${memoryName}[${dataptr} + ${offset + op.argument}] += ${memoryName}[${dataptr} + ${offset}];\n` +
              `${memoryName}[${dataptr} + ${offset}] = 0;\n` +
              `}\n`
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

  return new Function(string) as CompiledFunc;
}

const compile = __DEV__ ? compile_debug : compile_prod;

export { compile };

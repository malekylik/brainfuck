import { OpKind } from '@ir/opcode-kinds';
import { Opcode } from '@ir/opcode';
import { opKindToChar } from '@ir/utils';

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
              encode(`for (let i = 0; i < ${op.argument}; i++) ${outF}(${memoryName}[${dataptr} + ${offset}]); // ${pc} \n`)
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
            encode(`while (${memoryName}[${dataptr} + ${offset}]) { // ${pc} \n`)
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

        default: { console.warn(`bad char ' ${opKindToChar(op.kind)} ' at pc=${pc}`); }
      }
  
      pc++;
    }

  code.push(
    encode(`return ${datanal};\n`)
  );

  const string = txd.decode(Uint8Array.from(code.flat()));

  console.log(string);

  return new Function(string) as () => object;
}

function compile_prod(ops: Array<Opcode>, inF: string, outF: string): CompiledFunc {
  const memoryName = 'm';
  const dataptr = 'p';
  const code = [];
  const offset_stack = [];
  let offset = 0;

  code.push(
    encode(`const ${memoryName} = new Uint8Array(${30000});\n`)
  );
  code.push(
    encode(`let ${dataptr} = 0;\n`)
  );

  // to do
  // a = 0
  // a += 1
  // to do
  // a +-= 1
  // a +-= 1
  // => a += 2

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
              `${memoryName}[${dataptr} + ${offset + op.argument}] += ${memoryName}[${dataptr} + ${offset}];\n` +
              `${memoryName}[${dataptr} + ${offset}] = 0;\n`
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

        default: { console.warn(`bad char ' ${opKindToChar(op.kind)} ' at pc=${pc}`); }
      }
  
      pc++;
    }

  const string = txd.decode(Uint8Array.from(code.flat()));

  // console.log(string);

  return new Function(string) as CompiledFunc;
}

const compile = __DEV__ ? compile_debug : compile_prod;
// const compile = compile_prod;

export { compile };

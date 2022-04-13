import { OpKind } from 'ir/opcode-kinds';
import { Opcode } from 'ir/opcode';
import { opKindToChar } from 'ir/utils';
import { StringBuilder } from 'utils/string-builder';

function compile_debug(ops: Array<Opcode>, inF: string, outF: string): CompiledFunc {
  const memoryName = 'm';
  const dataptr = 'p';
  const datanal = 'performance';
  const offset_stack = [];
  let offset = 0;
  let loop_data_offset = 0;
  let loop_data_offsets = [];
  const coder = new StringBuilder();
  const generateNewName = (() => {
    let i = -1;
    return (depth: number) => {
      i++;
      return `${i}_${depth}`;
    }
  })();
  const loop_depth = [];
  let current_loop_name = generateNewName(0);

  coder.append(
    `return function* () {\n`
  );
  coder.append(
    `const ${memoryName} = new Uint8Array(${30000});\n`
  );
  coder.append(
    `let ${dataptr} = 0;\n`
  );
  coder.append(
    `const ${datanal} = {};\n`
  );

    let pc = 0;
    while (pc < ops.length) {
      const op = ops[pc];

      switch (op.kind) {
        case OpKind.INC_PTR: {
          coder.append(
            `${dataptr} += ${op.argument}; // ${pc}\n`
          );

          break;
        }

        case OpKind.DEC_PTR: {
          coder.append(
            `${dataptr} -= ${op.argument}; // ${pc}\n`
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
          coder.append(
            `${memoryName}[${dataptr} + ${offset}] += ${op.argument}; // ${pc} \n`
          );

          break;
        }

        case OpKind.DEC_DATA: {
          coder.append(
            `${memoryName}[${dataptr} + ${offset}] -= ${op.argument}; // ${pc}\n`
          );

          break;
        }

        case OpKind.READ_STDIN: {
          coder.append(
            `for (let i = 0; i < ${op.argument}; i++) ${memoryName}[${dataptr} + ${offset}] = ${inF}(); // ${pc} \n`
          );

          break;
          }

        case OpKind.WRITE_STDOUT: {
          if (op.argument < 2) {
            coder.append(
              `${outF}(${memoryName}[${dataptr} + ${offset}]); // ${pc} \n`
            );
          } else {
            coder.append(
              `for (let i = 0; i < ${op.argument}; i++) { yield m; ${outF}(${memoryName}[${dataptr} + ${offset}]); } // ${pc} \n`
            );
          }

            break;
        }

        case OpKind.LOOP_SET_TO_ZERO: {
          coder.append(
            `${memoryName}[${dataptr} + ${offset}] = 0; // ${pc} \n`
          );

          break;
        }

        case OpKind.LOOP_MOVE_PTR: {
          loop_depth.push(current_loop_name);
          current_loop_name = generateNewName(loop_depth.length);
          coder.append(
            `// ${current_loop_name}\n`
          );

          coder.append(
            `while (${memoryName}[${dataptr} + ${offset}]) { // ${pc} \n` +
              `yield m;` +
              `${datanal}['${current_loop_name}'] = (1 + (${datanal}['${current_loop_name}'] || 0))\n` +
              `${dataptr} += ${op.argument};\n}\n`
          );

          loop_depth.pop();

          break;
        }
        case OpKind.LOOP_MOVE_DATA: {
          coder.append(
            `${memoryName}[${dataptr} + ${offset + op.argument}] += ${memoryName}[${dataptr} + ${offset}]; // ${pc} \n` +
            `${memoryName}[${dataptr} + ${offset}] = 0; // ${pc} \n`
          );

          break;
        }

        case OpKind.JUMP_IF_DATA_ZERO: {
          offset_stack.push(offset);

          loop_depth.push(current_loop_name);
          current_loop_name = generateNewName(loop_depth.length);

          coder.append(
            `// ${current_loop_name}\n`
          );

          coder.append(
            `while (${memoryName}[${dataptr} + ${offset}]) { yield m; // ${pc} \n`
          );

          coder.append(
            `${datanal}['${current_loop_name}'] = (1 + (${datanal}['${current_loop_name}'] || 0))\n`
          );

          break;
        }

        case OpKind.JUMP_IF_DATA_NOT_ZERO: {
          coder.append(
            `}\n`
          );

          offset = offset_stack.pop();

          loop_depth.pop();

          break;
        }

        case OpKind.RESET_DATA_RANGE: {
          for (let i = 1; i < op.argument + 1; i++) {
            coder.append(
              `${memoryName}[${dataptr} + ${offset + i}] = `
            );
          }

          coder.append(
            `${0}; // ${pc} \n`
          );

          break;
        }

        case OpKind.SET_DATA: {
          coder.append(
            `${memoryName}[${dataptr} + ${offset}] = ${op.argument}; // ${pc} \n`
          );

          break;
        }

        case OpKind.DATA_LOOP: {
          loop_data_offset = offset;
          loop_data_offsets.push(loop_data_offset);
          coder.append(
            `if (${memoryName}[${dataptr} + ${loop_data_offset}]) { // ${pc} DATA_LOOP \n`
          );

          break;
        }

        case OpKind.DATA_LOOP_END: {
          coder.append(
            `${memoryName}[${dataptr} + ${loop_data_offset}] = 0;\n` +
            `} // ${pc} DATA_LOOP_END \n`
          );

          offset = loop_data_offsets.pop();

          break;
        }

        case OpKind.DATA_LOOP_ADD: {
          if (op.argument === 1) {
            coder.append(
              `${memoryName}[${dataptr} + ${offset}] += ${memoryName}[${dataptr} + ${loop_data_offset}]; // ${pc} \n`
            );
          } else {
            coder.append(
              `${memoryName}[${dataptr} + ${offset}] += ${memoryName}[${dataptr} + ${loop_data_offset}] * ${op.argument}; // ${pc} \n`
            );
          }

          break;
        }

        case OpKind.DATA_LOOP_SUB: {
          if (op.argument === 1) {
            coder.append(
              `${memoryName}[${dataptr} + ${offset}] -= ${memoryName}[${dataptr} + ${loop_data_offset}]; // ${pc} \n`
            );
          } else {
            coder.append(
              `${memoryName}[${dataptr} + ${offset}] -= ${memoryName}[${dataptr} + ${loop_data_offset}] * ${op.argument}; // ${pc} \n`
            );
          }

          break;
        }

        default: { console.warn(`bad char ' ${opKindToChar(op.kind)} ' at pc=${pc}`); }
      }
  
      pc++;
    }
    
    coder.append(
      `return ${datanal};\n`
    );

  coder.append(
    `}\n`
  );

  const string = coder.build();

  return new Function(string) as () => Array<number>;
}

export { compile_debug as compile };

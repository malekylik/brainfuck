import { OpKind } from 'ir/opcode-kinds';
import { Opcode } from 'ir/opcode';
import { opKindToChar } from 'ir/utils';
import { TextCoder } from 'utils/text-coder';

function compile_debug(ops: Array<Opcode>, inF: string, outF: string): CompiledFunc {
  const memoryName = 'm';
  const dataptr = 'p';
  const datanal = 'performance';
  const offset_stack = [];
  let offset = 0;
  let loop_data_offset = 0;
  let loop_data_offsets = [];
  const coder = new TextCoder();
  const generateNewName = (() => {
    let i = -1;
    return (depth: number) => {
      i++;
      return `${i}_${depth}`;
    }
  })();
  const loop_depth = [];
  let current_loop_name = generateNewName(0);

  coder.encode(
    `return function* () {\n`
  );
  coder.encode(
    `const ${memoryName} = new Uint8Array(${30000});\n`
  );
  coder.encode(
    `let ${dataptr} = 0;\n`
  );
  coder.encode(
    `const ${datanal} = {};\n`
  );

    let pc = 0;
    while (pc < ops.length) {
      const op = ops[pc];

      switch (op.kind) {
        case OpKind.INC_PTR: {
          coder.encode(
            `${dataptr} += ${op.argument}; // ${pc}\n`
          );

          break;
        }

        case OpKind.DEC_PTR: {
          coder.encode(
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
          coder.encode(
            `${memoryName}[${dataptr} + ${offset}] += ${op.argument}; // ${pc} \n`
          );

          break;
        }

        case OpKind.DEC_DATA: {
          coder.encode(
            `${memoryName}[${dataptr} + ${offset}] -= ${op.argument}; // ${pc}\n`
          );

          break;
        }

        case OpKind.READ_STDIN: {
          coder.encode(
            `for (let i = 0; i < ${op.argument}; i++) ${memoryName}[${dataptr} + ${offset}] = ${inF}(); // ${pc} \n`
          );

          break;
          }

        case OpKind.WRITE_STDOUT: {
          if (op.argument < 2) {
            coder.encode(
              `${outF}(${memoryName}[${dataptr} + ${offset}]); // ${pc} \n`
            );
          } else {
            coder.encode(
              `for (let i = 0; i < ${op.argument}; i++) { yield m; ${outF}(${memoryName}[${dataptr} + ${offset}]); } // ${pc} \n`
            );
          }

            break;
        }

        case OpKind.LOOP_SET_TO_ZERO: {
          coder.encode(
            `${memoryName}[${dataptr} + ${offset}] = 0; // ${pc} \n`
          );

          break;
        }

        case OpKind.LOOP_MOVE_PTR: {
          loop_depth.push(current_loop_name);
          current_loop_name = generateNewName(loop_depth.length);
          coder.encode(
            `// ${current_loop_name}\n`
          );

          coder.encode(
            `while (${memoryName}[${dataptr} + ${offset}]) { // ${pc} \n` +
              `yield m;` +
              `${datanal}['${current_loop_name}'] = (1 + (${datanal}['${current_loop_name}'] || 0))\n` +
              `${dataptr} += ${op.argument};\n}\n`
          );

          loop_depth.pop();

          break;
        }
        case OpKind.LOOP_MOVE_DATA: {
          coder.encode(
            `${memoryName}[${dataptr} + ${offset + op.argument}] += ${memoryName}[${dataptr} + ${offset}]; // ${pc} \n` +
            `${memoryName}[${dataptr} + ${offset}] = 0; // ${pc} \n`
          );

          break;
        }

        case OpKind.JUMP_IF_DATA_ZERO: {
          offset_stack.push(offset);

          loop_depth.push(current_loop_name);
          current_loop_name = generateNewName(loop_depth.length);

          coder.encode(
            `// ${current_loop_name}\n`
          );

          coder.encode(
            `while (${memoryName}[${dataptr} + ${offset}]) { yield m; // ${pc} \n`
          );

          coder.encode(
            `${datanal}['${current_loop_name}'] = (1 + (${datanal}['${current_loop_name}'] || 0))\n`
          );

          break;
        }

        case OpKind.JUMP_IF_DATA_NOT_ZERO: {
          coder.encode(
            `}\n`
          );

          offset = offset_stack.pop();

          loop_depth.pop();

          break;
        }

        case OpKind.RESET_DATA_RANGE: {
          for (let i = 1; i < op.argument + 1; i++) {
            coder.encode(
              `${memoryName}[${dataptr} + ${offset + i}] = `
            );
          }

          coder.encode(
            `${0}; // ${pc} \n`
          );

          break;
        }

        case OpKind.SET_DATA: {
          coder.encode(
            `${memoryName}[${dataptr} + ${offset}] = ${op.argument}; // ${pc} \n`
          );

          break;
        }

        case OpKind.DATA_LOOP: {
          loop_data_offset = offset;
          loop_data_offsets.push(loop_data_offset);
          coder.encode(
            `if (${memoryName}[${dataptr} + ${loop_data_offset}]) { // ${pc} DATA_LOOP \n`
          );

          break;
        }

        case OpKind.DATA_LOOP_END: {
          coder.encode(
            `${memoryName}[${dataptr} + ${loop_data_offset}] = 0;\n` +
            `} // ${pc} DATA_LOOP_END \n`
          );

          offset = loop_data_offsets.pop();

          break;
        }

        case OpKind.DATA_LOOP_ADD: {
          if (op.argument === 1) {
            coder.encode(
              `${memoryName}[${dataptr} + ${offset}] += ${memoryName}[${dataptr} + ${loop_data_offset}]; // ${pc} \n`
            );
          } else {
            coder.encode(
              `${memoryName}[${dataptr} + ${offset}] += ${memoryName}[${dataptr} + ${loop_data_offset}] * ${op.argument}; // ${pc} \n`
            );
          }

          break;
        }

        case OpKind.DATA_LOOP_SUB: {
          if (op.argument === 1) {
            coder.encode(
              `${memoryName}[${dataptr} + ${offset}] -= ${memoryName}[${dataptr} + ${loop_data_offset}]; // ${pc} \n`
            );
          } else {
            coder.encode(
              `${memoryName}[${dataptr} + ${offset}] -= ${memoryName}[${dataptr} + ${loop_data_offset}] * ${op.argument}; // ${pc} \n`
            );
          }

          break;
        }

        default: { console.warn(`bad char ' ${opKindToChar(op.kind)} ' at pc=${pc}`); }
      }
  
      pc++;
    }
    
    coder.encode(
      `return ${datanal};\n`
    );

  coder.encode(
    `}\n`
  );

  const string = coder.decode();

  return new Function(string) as () => Array<number>;
}

export { compile_debug as compile };

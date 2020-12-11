import { OpKind } from 'ir/opcode-kinds';
import { Opcode } from 'ir/opcode';
import { opKindToChar } from 'ir/utils';
import { CompiledModule, InputFunction, OutputFunction } from 'types/compiler';
import { TextCoder } from 'utils/text-coder';

function offsetDataptr(dataptr: string, offset: number): string {
  return `${dataptr} + ${offset}`;

  // TODO: chech why it degradate performence
  // if (offset === 0) {
  //   return dataptr;
  // }

  // return offset < 0 ? `${dataptr} - ${Math.abs(offset)}` : `${dataptr} + ${offset}`;
}

const memoryName = '__m__';

function compileToJS(ops: Array<Opcode>, inF: InputFunction, outF: OutputFunction): string {
  const memoryName = '__m__';
  const dataptr = 'p';
  const cached_dataptr = 'cp';
  const inFName = inF.name;
  const outFName = outF.name;
  const offset_stack = [];
  const coder = new TextCoder();
  let offset = 0;
  let loop_data_offset = 0;
  let loop_data_offsets = [];

  (self as any)[memoryName] = new Uint8Array(30000);

  coder.encode(
    `let ${dataptr} = 0;\n`
  );

    let pc = 0;
    while (pc < ops.length) {
      const op = ops[pc];

      switch (op.kind) {
        case OpKind.INC_PTR: {
          coder.encode(
            `${dataptr} += ${op.argument};\n`
          );

          break;
        }

        case OpKind.DEC_PTR: {
          coder.encode(
            `${dataptr} -= ${op.argument};\n`
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
            `${memoryName}[${offsetDataptr(dataptr, offset)}] += ${op.argument};\n`
          );

          break;
        }

        case OpKind.DEC_DATA: {
          coder.encode(
            `${memoryName}[${offsetDataptr(dataptr, offset)}] -= ${op.argument};\n`
          );

          break;
        }

        case OpKind.READ_STDIN: {
            coder.encode(
              `for (let i = 0; i < ${op.argument}; i++) ${memoryName}[${offsetDataptr(dataptr, offset)}] = ${inFName}();\n`
            );

            break;
          }

        case OpKind.WRITE_STDOUT: {
          if (op.argument < 2) {
            coder.encode(
              `${outFName}(${memoryName}[${offsetDataptr(dataptr, offset)}]);\n`
            );
          } else {
            coder.encode(
              `for (let i = 0; i < ${op.argument}; i++) ${outFName}(${memoryName}[${offsetDataptr(dataptr, offset)}]);\n`
            );
          }

            break;
        }

        case OpKind.LOOP_SET_TO_ZERO: {
          coder.encode(
            `${memoryName}[${offsetDataptr(dataptr, offset)}] = 0;\n`
          );

          break;
        }

        case OpKind.LOOP_MOVE_PTR: {
          coder.encode(
            `while (${memoryName}[${offsetDataptr(dataptr, offset)}]) {\n` +
            `${dataptr} ${op.argument < 0 ? '-' : '+'}= ${Math.abs(op.argument)};\n}\n`
          );

          break;
        }
        case OpKind.LOOP_MOVE_DATA: {
          // TO_DO check why 'if' this degradate performance in chrome
          coder.encode(
            // `if (${dataptr} + ${offset + op.argument} >= 0) {\n` +
            `${memoryName}[${offsetDataptr(dataptr, offset + op.argument)}] += ${memoryName}[${offsetDataptr(dataptr, offset)}];\n` +
            `${memoryName}[${offsetDataptr(dataptr, offset)}] = 0;\n`
            // `}\n`
          );

          break;
        }

        case OpKind.JUMP_IF_DATA_ZERO: {
          offset_stack.push(offset);

          coder.encode(
            `while (${memoryName}[${offsetDataptr(dataptr, offset)}]) {\n`
          );

          break;
        }

        case OpKind.JUMP_IF_DATA_NOT_ZERO: {
          coder.encode(
            `}\n`
          );

          offset = offset_stack.pop();

          break;
        }

        case OpKind.RESET_DATA_RANGE: {
          for (let i = 1; i < op.argument + 1; i++) {
            coder.encode(
              `${memoryName}[${dataptr} + ${offset + i}] = `
            );
          }

          coder.encode(
            `${0};\n`
          );

          break;
        }

        case OpKind.SET_DATA: {
          coder.encode(
            `${memoryName}[${offsetDataptr(dataptr, offset)}] = ${op.argument};\n`
          );

          break;
        }

        case OpKind.DATA_LOOP: {
          loop_data_offset = offset;
          loop_data_offsets.push(loop_data_offset);
          coder.encode(
            `if (${memoryName}[${offsetDataptr(dataptr, loop_data_offset)}]) {\n`
          );

          break;
        }

        case OpKind.DATA_LOOP_END: {
          coder.encode(
            `${memoryName}[${offsetDataptr(dataptr, loop_data_offset)}] = 0;\n` +
            `}\n`
          );

          offset = loop_data_offsets.pop();
          loop_data_offset = loop_data_offsets[loop_data_offsets.length - 1];

          break;
        }

        case OpKind.DATA_LOOP_ADD: {
          if (op.argument === 1) {
            coder.encode(
              `${memoryName}[${offsetDataptr(dataptr, offset)}] += ${memoryName}[${offsetDataptr(dataptr, loop_data_offset)}];\n`
            );
          } else {
            coder.encode(
              `${memoryName}[${offsetDataptr(dataptr, offset)}] += ${memoryName}[${offsetDataptr(dataptr, loop_data_offset)}] * ${op.argument};\n`
            );
          }

          break;
        }

        case OpKind.DATA_LOOP_SUB: {
          if (op.argument === 1) {
            coder.encode(
              `${memoryName}[${offsetDataptr(dataptr, offset)}] -= ${memoryName}[${offsetDataptr(dataptr, loop_data_offset)}];\n`
            );
          } else {
            coder.encode(
              `${memoryName}[${offsetDataptr(dataptr, offset)}] -= ${memoryName}[${offsetDataptr(dataptr, loop_data_offset)}] * ${op.argument};\n`
            );
          }

          break;
        }

        case OpKind.STORE_DATAPTR: {
          coder.encode(
            `${cached_dataptr} = ${dataptr};\n`
          );

          break;
        }

        case OpKind.GET_DATAPTR: {
          coder.encode(
            `${dataptr} = ${cached_dataptr};\n`
          );

          break;
        }

        default: { console.warn(`bad char ' ${opKindToChar(op.kind)} ' at pc=${pc}`); }
      }
  
      pc++;
    }

  return coder.decode();
}

function compile_prod(ops: Array<Opcode>, inF: InputFunction, outF: OutputFunction): Promise<CompiledModule> {
  const code = compile_ast(ops, inF, outF);

  (self as any)[memoryName] = new Uint8Array(30000);

  const module = new Function(code);

  return Promise.resolve({
    module: { run: () => { module(); } },
    memory: (self as any)[memoryName]
  });
}

function _compileToJS(ops: Array<Opcode>, inF: InputFunction, outF: OutputFunction): string {
  const code = `const ${memoryName} = new Uint8Array(30000);\n` + compile_ast(ops, inF, outF);

  return code;
}

function compile_ast(ops: Array<Opcode>, inF: InputFunction, outF: OutputFunction) {
  const memoryName = '__m__';
  const dataptr = 'p';
  const cached_dataptr = 'cp';
  const inFName = inF.name;
  const outFName = outF.name;
  const offset_stack = [];
  const coder = new TextCoder();
  let offset = 0;
  let loop_data_offset = 0;
  let loop_data_offsets = [];

  (self as any)[memoryName] = new Uint8Array(30000);

  coder.encode(`let ${dataptr} = 0;\n`)

  function travers(ast: any) {
    ast.body.forEach((op: any) => {
      if (op.type === 1) {
        switch (op.operator) {
          case '>': {
            coder.encode(`${dataptr} += ${op.argument};\n`)

            break;
          }

          case '<': {
            coder.encode(`${dataptr} -= ${op.argument};\n`)

            break;
          }

          case '+': {
            coder.encode(`${memoryName}[${offsetDataptr(dataptr, offset)}] += ${op.argument};\n`)

            break;
          }

          case '-': {
            coder.encode(`${memoryName}[${offsetDataptr(dataptr, offset)}] -= ${op.argument};\n`)

            break;
          }

          case ',': {
            coder.encode(`for (let i = 0; i < ${op.argument}; i++) ${memoryName}[${offsetDataptr(dataptr, offset)}] = ${inFName}();\n`)

            break;
          }

          case '.': {
            if (op.argument < 2) {
              coder.encode(`${outFName}(${memoryName}[${offsetDataptr(dataptr, offset)}]);\n`)
            } else {
              coder.encode(`for (let i = 0; i < ${op.argument}; i++) ${outFName}(${memoryName}[${offsetDataptr(dataptr, offset)}]);\n`)
            }

            break;
          }
        }
      } else {
        coder.encode(`while (${memoryName}[${offsetDataptr(dataptr, offset)}]) {\n`)

        travers(op);

        coder.encode(`}\n`)
      }
    });
  }

  travers(ops);

  return coder.decode();
}

export {
  compile_prod as compile,
  _compileToJS as compileToJS,
};

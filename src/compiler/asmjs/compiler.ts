import { OpKind } from 'ir/opcode-kinds';
import { CompiledModule, InputFunction, OutputFunction } from 'types/compiler';
import { TextCoder } from 'utils/text-coder';
import { Ast, LoopBlock, MulExpression, Nodes, ParseSymbol } from 'ir/ast/ast';

function offsetDataptr(dataptr: string, offset: number): string {
  return `((${dataptr}|0) + (${offset}|0)) >> 0`;
}

const memoryName = '__m__';

function compile_prod(ops: Ast, inF: InputFunction, outF: OutputFunction): Promise<CompiledModule> {
  const code = compile_ast(ops, inF, outF);

  const heap = new ArrayBuffer(0x10000);          // 64k heap
  (self as any)[memoryName] = new Uint8Array(heap);

  const f = `
  return function (stdlib, foreign, buffer) {
    "use asm";

    var ${memoryName} = new stdlib.Uint8Array(buffer);
    var ${outF.name} = foreign.${outF.name};
  
    function run() {
      ${code}
    }

    return { run: run };\n
  }
  `;

  const stdlib = {
    Uint8Array: Uint8Array,
  };

  const foreign = {
    [outF.name]: outF,
  }

  const module = new Function(f)()(stdlib, foreign, heap);

  return Promise.resolve({
    module: { run: () => { module.run(); } },
    memory: (self as any)[memoryName]
  });
}

function _compileToAsmJS(ops: Ast, inF: InputFunction, outF: OutputFunction): string {
  const code = `
  "use asm";

  var ${memoryName} = new stdlib.Uint8Array(buffer);
  var iolog = foreign.${outF.name};

  function run() {
    ${compile_ast(ops, inF, outF)}
  }

  return { run: run };\n`;

  return code;
}

function compile_ast(ops: Ast, inF: InputFunction, outF: OutputFunction) {
  const memoryName = '__m__';
  const dataptr = 'p';
  const inFName = inF.name;
  const outFName = outF.name;
  const coder = new TextCoder();
  const offset_move_start_stack: Array<number> = [];
  let offset = 0;

  (self as any)[memoryName] = new Uint8Array(30000);

  coder.encode(`var ${dataptr} = 0;\n`);

  function travers(ast: Ast) {
    ast.body.forEach((op: Nodes) => {
      if (op.type === ParseSymbol.ExpressionStatement) {
        switch (op.opkode) {
          case OpKind.INC_PTR: {
            coder.encode(`${dataptr} = ((${dataptr}|0) + ${op.argument})|0;\n`);

            break;
          }

          case OpKind.DEC_PTR: {
            coder.encode(`${dataptr} = ((${dataptr}|0) - ${op.argument})|0;\n`);

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
            coder.encode(`${memoryName}[${offsetDataptr(dataptr, offset)}] = ((${memoryName}[${offsetDataptr(dataptr, offset)}]|0) + ${op.argument})|0;\n`);

            break;
          }

          case OpKind.DEC_DATA: {
            coder.encode(`${memoryName}[${offsetDataptr(dataptr, offset)}] = ((${memoryName}[${offsetDataptr(dataptr, offset)}]|0) - ${op.argument})|0;\n`);

            break;
          }

          case OpKind.READ_STDIN: {
            coder.encode(`for (var i = 0; (i | 0) < ${op.argument}; i = (i + 1) | 0) ${memoryName}[${offsetDataptr(dataptr, offset)}] = (${inFName}())|0;\n`);

            break;
          }

          case OpKind.WRITE_STDOUT: {
            if (op.argument < 2) {
              coder.encode(`${outFName}(${memoryName}[${offsetDataptr(dataptr, offset)}] | 0);\n`);
            } else {
              coder.encode(`for (let i = 0; (i | 0) < ${op.argument}; i = (i + 1) | 0) ${outFName}(${memoryName}[${offsetDataptr(dataptr, offset)}] | 0);\n`);
            }

            break;
          }

          case OpKind.LOOP_SET_TO_ZERO: {
            coder.encode(
              `${memoryName}[${offsetDataptr(dataptr, offset)}] = 0;\n`
            );

            break;
          }

          case OpKind.MUL_INC_DATA: {
            const loop_offset = offsetDataptr(dataptr, offset_move_start_stack[offset_move_start_stack.length - 1]);

            let arg = '';
            let power = Math.log2(op.argument);

            if (op.argument === 1) {
              arg = `${memoryName}[${loop_offset}]`;
            } else if (Number.isInteger(power)) {
              arg = `${memoryName}[${loop_offset}] << ${power}`;
            } else {
              power = power | 0;
              const mult = op.argument - (2 ** power);
              const mult_str = mult === 1 ? '' : `* ${mult}`;
              arg = `(${memoryName}[${loop_offset}] << ${power}) + ${memoryName}[${loop_offset}] ${mult_str}`;
            }

            arg = (op as MulExpression).loop_divider === -1 ? arg : `(${arg} / ${Math.abs((op as MulExpression).loop_divider)}) | 0`;
            coder.encode(`${memoryName}[${offsetDataptr(dataptr, offset)}] += ${arg};\n`);
            break;
          }

          case OpKind.MUL_DEC_DATA: {
            const loop_offset = offsetDataptr(dataptr, offset_move_start_stack[offset_move_start_stack.length - 1]);
            let arg = op.argument === 1 ? `${memoryName}[${loop_offset}]` : `${op.argument} * ${memoryName}[${loop_offset}]`;
            arg = (op as MulExpression).loop_divider === -1 ? arg : `(${arg} / ${Math.abs((op as MulExpression).loop_divider)}) | 0`;
            coder.encode(`${memoryName}[${offsetDataptr(dataptr, offset)}] -= ${arg};\n`);

            break;
          }

          case OpKind.SET_DATA: {
            coder.encode(
              `${memoryName}[${offsetDataptr(dataptr, offset)}] = ${op.argument};\n`
            );

            break;
          }

          case OpKind.SEARCH_LOOP: {
            coder.encode(
              `while (${memoryName}[${offsetDataptr(dataptr, offset)}]|0) {\n`
            );
            if (op.argument > 0) {
              coder.encode(
                `${dataptr} = ((${dataptr}|0) + ${op.argument})|0;\n`
              );
            } else {
              coder.encode(
                `${dataptr} = ((${dataptr}|0) - ${Math.abs(op.argument)})|0;\n`
              );
            }
            coder.encode(
              `}\n`
            );

            break;
          }
        }
      } else {
        if (op.opkode === OpKind.LOOP_MOVE_DATA) {
          coder.encode(`if (${memoryName}[${offsetDataptr(dataptr, offset)}]) {\n`);

          offset_move_start_stack.push(offset);

          travers(op);

          offset_move_start_stack.pop();
          coder.encode(`}\n`);
        } else {
          coder.encode(`while (${memoryName}[${offsetDataptr(dataptr, offset)}] | 0) {\n`);

          travers(op);

          coder.encode(`}\n`);
        }
      }
    });
  }

  travers(ops);

  return coder.decode();
}

export {
  compile_prod as compile,
  _compileToAsmJS as compileToAsmJS,
};

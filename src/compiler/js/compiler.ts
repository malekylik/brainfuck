import { OpKind } from 'ir/opcode-kinds';
import { CompiledModule, InputFunction, OutputFunction } from 'types/compiler';
import { TextCoder } from 'utils/text-coder';
import { Ast, LoopBlock, MulExpression, Nodes, ParseSymbol } from 'ir/ast/ast';

function offsetDataptr(dataptr: string, offset: number): string {
  return `${dataptr} + ${offset}`;

  // TODO: chech why it degradate performence
  // if (offset === 0) {
  //   return dataptr;
  // }

  // return offset < 0 ? `${dataptr} - ${Math.abs(offset)}` : `${dataptr} + ${offset}`;
}

const memoryName = '__m__';

function compile_prod(ops: Ast, inF: InputFunction, outF: OutputFunction): Promise<CompiledModule> {
  const code = compile_ast(ops, inF, outF);

  (self as any)[memoryName] = new Uint8Array(30000);

  const module = new Function(code);

  return Promise.resolve({
    module: { run: () => { module(); } },
    memory: (self as any)[memoryName]
  });
}

function _compileToJS(ops: Ast, inF: InputFunction, outF: OutputFunction): string {
  const code = `const ${memoryName} = new Uint8Array(30000);\n` + compile_ast(ops, inF, outF);

  return code;
}

function compile_ast(ops: Ast, inF: InputFunction, outF: OutputFunction) {
  const memoryName = '__m__';
  const dataptr = 'p';
  const inFName = inF.name;
  const outFName = outF.name;
  const coder = new TextCoder();
  const offset_move_start_stack: Array<number> = [];
  let tabs = '';
  let offset = 0;

  (self as any)[memoryName] = new Uint8Array(30000);

  coder.encode(`let ${dataptr} = 0;\n`);

  function travers(ast: Ast) {
    ast.body.forEach((op: Nodes) => {
      if (op.type === ParseSymbol.ExpressionStatement) {
        switch (op.opkode) {
          case OpKind.INC_PTR: {
            coder.encode(`${tabs}${dataptr} += ${op.argument};\n`);

            break;
          }

          case OpKind.DEC_PTR: {
            coder.encode(`${tabs}${dataptr} -= ${op.argument};\n`);

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
            coder.encode(`${tabs}${memoryName}[${offsetDataptr(dataptr, offset)}] += ${op.argument};\n`);

            break;
          }

          case OpKind.DEC_DATA: {
            coder.encode(`${tabs}${memoryName}[${offsetDataptr(dataptr, offset)}] -= ${op.argument};\n`);

            break;
          }

          case OpKind.READ_STDIN: {
            coder.encode(`${tabs}for (let i = 0; i < ${op.argument}; i++) ${memoryName}[${offsetDataptr(dataptr, offset)}] = ${inFName}();\n`);

            break;
          }

          case OpKind.WRITE_STDOUT: {
            if (op.argument < 2) {
              coder.encode(`${outFName}(${memoryName}[${offsetDataptr(dataptr, offset)}]);\n`);
            } else {
              coder.encode(`${tabs}for (let i = 0; i < ${op.argument}; i++) ${outFName}(${memoryName}[${offsetDataptr(dataptr, offset)}]);\n`);
            }

            break;
          }

          case OpKind.LOOP_SET_TO_ZERO: {
            coder.encode(
              `${tabs}// set to zero loop\n`
            );
            coder.encode(
              `${tabs}${memoryName}[${offsetDataptr(dataptr, offset)}] = 0;\n`
            );

            break;
          }

          case OpKind.MUL_INC_DATA: {
            const loop_offset = offsetDataptr(dataptr, offset_move_start_stack[offset_move_start_stack.length - 1]);

            // let arg = op.argument === 1 ? `${memoryName}[${loop_offset}]` : `${op.argument} * ${memoryName}[${loop_offset}]`;
            // arg = (op as MulExpression).loop_divider === -1 ? arg : `(${arg} / ${Math.abs((op as MulExpression).loop_divider)}) | 0`;
            // coder.encode(`${tabs}${memoryName}[${offsetDataptr(dataptr, offset)}] += ${arg};\n`);

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
            coder.encode(`${tabs}${memoryName}[${offsetDataptr(dataptr, offset)}] += ${arg};\n`);
            break;
          }

          case OpKind.MUL_DEC_DATA: {
            const loop_offset = offsetDataptr(dataptr, offset_move_start_stack[offset_move_start_stack.length - 1]);
            let arg = op.argument === 1 ? `${memoryName}[${loop_offset}]` : `${op.argument} * ${memoryName}[${loop_offset}]`;
            arg = (op as MulExpression).loop_divider === -1 ? arg : `(${arg} / ${Math.abs((op as MulExpression).loop_divider)}) | 0`;
            coder.encode(`${tabs}${memoryName}[${offsetDataptr(dataptr, offset)}] -= ${arg};\n`);

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
              `while (${memoryName}[${offsetDataptr(dataptr, offset)}]) {\n`
            );
            if (op.argument > 0) {
              coder.encode(
                `${dataptr} += ${op.argument};\n`
              );
            } else {
              coder.encode(
                `${dataptr} -= ${Math.abs(op.argument)};\n`
              );
            }
            coder.encode(
              `}\n`
            );

            // coder.encode(
            //   `${dataptr} = search_loop(${dataptr}, ${offset}, ${op.argument});\n`
            // );

            break;
          }
        }
      } else {
        if (op.opkode === OpKind.LOOP_MOVE_DATA) {
          // tabs += '  ';
          if (op.is_pure) {
            coder.encode(`${tabs}// pure loop\n`);
          }
          coder.encode(`${tabs}if (${memoryName}[${offsetDataptr(dataptr, offset)}]) {\n`);
          // coder.encode(`_ = ${memoryName}[${offsetDataptr(dataptr, offset)}];\n`);
          // coder.encode(`let _ = ${memoryName}[${offsetDataptr(dataptr, offset)}];\n`);
          offset_move_start_stack.push(offset);
          // tabs += '  ';

          travers(op);

          // tabs = tabs.slice(0, tabs.length - 2);
          offset_move_start_stack.pop();
          coder.encode(`${tabs}}\n`);
        } else {
          if (!op.search_by) {
            coder.encode(`${tabs}// search pure loop\n`);
          }
          if (op.is_pure) {
            coder.encode(`${tabs}// pure loop\n`);
          }
          coder.encode(`${tabs}while (${memoryName}[${offsetDataptr(dataptr, offset)}]) {\n`);
          // tabs += '  ';

          travers(op);

          // tabs = tabs.slice(0, tabs.length - 2);
          coder.encode(`${tabs}}\n`);
        }
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

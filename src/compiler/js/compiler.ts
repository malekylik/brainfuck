import { OpKind } from 'ir/opcode-kinds';
import { CompiledModule, InputFunction, OutputFunction } from 'types/compiler';
import { TextCoder } from 'utils/text-coder';
import { Ast, MulExpression, Nodes, ParseSymbol } from 'ir/ast/ast';
import { RequieredVisitor } from './visitor/required-js-visitor';
import { JSVisitor, JSVisitorProps } from './visitor/js-visitor';

// coder.encode(
//   `function filterProfiling(traceEvents, depth, id, ph) {
//     if (depth < 4) {
//       perf.traceEvents.push({
//         "cat": "MY_SUBSYSTEM",  //catagory

//         "pid": 0,  //process ID

//         "tid": 0, //thread ID

//         "ts": performance.now() * 1000, //time-stamp of this event

//         "ph": ph, // Begin sample

//         "name": "loop id " + id, //name of this event

//         "args": {}
//       });}
//   }\n`
// );

// coder.encode(
//   `perf.traceEvents.push({
//     "cat": "MY_SUBSYSTEM",  //catagory
//     "pid": 0,  //process ID

//     "tid": 0, //thread ID

//     "ts": performance.now(), //time-stamp of this event

//     "ph": "B", // Begin sample

//     "name": "main", //name of this event

//     "args": {}
//   });\n`
// );

function offsetDataptr(dataptr: string, offset: number): string {
  return `${dataptr} + ${offset}`;

  // TODO: chech why it degradate performence
  // if (offset === 0) {
  //   return dataptr;
  // }

  // return offset < 0 ? `${dataptr} - ${Math.abs(offset)}` : `${dataptr} + ${offset}`;
}

const memoryName = '__m__';

function compile_prod(visitor: JSVisitor, ops: Ast, inF: InputFunction, outF: OutputFunction): Promise<CompiledModule> {
  const code = compile_ast(visitor, ops, inF, outF);

  (self as any)[memoryName] = new Uint8Array(30000);

  const module = new Function(code);

  return Promise.resolve({
    module: { run: () => { module(); } },
    memory: (self as any)[memoryName]
  });
}

function _compileToJS(visitor: JSVisitor, ops: Ast, inF: InputFunction, outF: OutputFunction): string {
  const code = `const ${memoryName} = new Uint8Array(30000);\n` + compile_ast(visitor, ops, inF, outF);

  return code;
}

function compile_ast(visitor: JSVisitor, ops: Ast, inF: InputFunction, outF: OutputFunction) {
  const _visitor = new RequieredVisitor(visitor);
  const memoryName = '__m__';
  const dataptr = 'p';
  const inFName = inF.name;
  const outFName = outF.name;
  const coder = new TextCoder();
  const offset_move_start_stack: Array<number> = [];
  let offset = 0;

  (self as any)[memoryName] = new Uint8Array(30000);

  const props: JSVisitorProps = {
    pushLine: line => coder.encode(line),
    getOffset: () => offset,
    peakOffset: () => {
      if (offset_move_start_stack.length > 0) {
        return offset_move_start_stack[offset_move_start_stack.length - 1];
      }

      console.warn('Invalid access offset stack');

      return 0;
    },
    getMemoryName: () => memoryName,
    getPointerName: () => dataptr,
    getINFName: () => inFName,
    getOUTFName: () => outFName,
    calculatePtr: offsetDataptr,
    getDataFromMemory: () => `${memoryName}[${offsetDataptr(dataptr, offset)}]`,
  }

  _visitor.onStartCompiling(ops, props);

  function travers(ast: Ast) {
    ast.body.forEach((op: Nodes) => {
      if (op.type === ParseSymbol.ExpressionStatement) {
        switch (op.opkode) {
          case OpKind.INC_PTR: {
            _visitor.onIncPtr(op, props);

            break;
          }

          case OpKind.DEC_PTR: {
            _visitor.onDecPtr(op, props);

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
            _visitor.onIncData(op, props);

            break;
          }

          case OpKind.DEC_DATA: {
            _visitor.onDecData(op, props);

            break;
          }

          case OpKind.READ_STDIN: {
            _visitor.onReadData(op, props);

            break;
          }

          case OpKind.WRITE_STDOUT: {
            _visitor.onWriteData(op, props);

            break;
          }

          case OpKind.LOOP_SET_TO_ZERO: {
            _visitor.onSetToZero(op, props);

            break;
          }

          case OpKind.MUL_INC_DATA: {
            _visitor.onMulIncData(op as MulExpression, props);

            break;
          }

          case OpKind.MUL_DEC_DATA: {
            _visitor.onMulDecData(op as MulExpression, props);

            break;
          }

          case OpKind.SET_DATA: {
            _visitor.onSetData(op, props);

            break;
          }

          case OpKind.SEARCH_LOOP: {
            _visitor.onSearchLoop(op, props);

            break;
          }
        }
      } else {
        if (op.opkode === OpKind.LOOP_MOVE_DATA) {
          _visitor.onDataLoopEnter(op, props);
          offset_move_start_stack.push(offset);

          travers(op);

          offset_move_start_stack.pop();
          _visitor.onDataLoopLeave(op, props);
        } else {
          _visitor.onLoopEnter(op, props);

          travers(op);

          _visitor.onLoopLeave(op, props);
        }
      }
    });
  }

  travers(ops);
  _visitor.onEndCompiling(ops, props);

  return coder.decode();
}

export {
  compile_prod as compile,
  _compileToJS as compileToJS,
};

import { Ast, Expression, LoopBlock, MulExpression } from 'ir/ast/ast';
import { BaseJSVisitor } from './base-js-visitor';
import { JSVisitor, JSVisitorProps } from './js-visitor';

export class ProfilingJSVisitor implements Required<JSVisitor> {
  private id: number;
  private idStack: Array<number>;
  private maxLoopDeepPerf: number;
  private baseVisitor: BaseJSVisitor;

  constructor(visitor: BaseJSVisitor, maxLoopDeepPerf: number = 0) {
    this.baseVisitor = visitor;
    this.id = 1;
    this.maxLoopDeepPerf = maxLoopDeepPerf;
    this.idStack = [];
  }

  onStartCompiling(ast: Ast, props: JSVisitorProps): void {
    props.pushLine(
      `
      const perf = { traceEvents: [] };

      function filterProfiling(id, ph) {
          perf.traceEvents.push({
            "cat": "MY_SUBSYSTEM",  //catagory

            "pid": 0,  //process ID

            "tid": 0, //thread ID

            "ts": performance.now() * 1000, //time-stamp of this event

            "ph": ph, // Begin sample

            "name": String(id), //name of this event

            "args": {}
          });
        }\n
      `
    );

    props.pushLine(
      `filterProfiling(0, 'B');\n`
    );

    this.baseVisitor.onStartCompiling(ast, props);
  }

  onEndCompiling(ast: Ast, props: JSVisitorProps): void {
    this.baseVisitor.onEndCompiling(ast, props);

    props.pushLine(
      `
      filterProfiling(0, 'E');\n

      globalThis.__perf__ = perf;\n`
    );
  }

  onIncPtr(node: Expression, props: JSVisitorProps): void {
    this.baseVisitor.onIncPtr(node, props);
  }

  onDecPtr(node: Expression, props: JSVisitorProps): void {
    this.baseVisitor.onDecPtr(node, props);
  }

  onIncData(node: Expression, props: JSVisitorProps): void {
    this.baseVisitor.onIncData(node, props);
  }

  onDecData(node: Expression, props: JSVisitorProps): void {
    this.baseVisitor.onDecData(node, props);
  }

  onReadData(node: Expression, props: JSVisitorProps): void {
    this.baseVisitor.onReadData(node, props);
  }

  onWriteData(node: Expression, props: JSVisitorProps): void {
    this.baseVisitor.onWriteData(node, props);
  }

  onSetToZero(node: Expression, props: JSVisitorProps): void {
    this.baseVisitor.onSetToZero(node, props);
  }

  onMulIncData(node: MulExpression, props: JSVisitorProps): void {
    this.baseVisitor.onMulIncData(node, props);
  }

  onMulDecData(node: MulExpression, props: JSVisitorProps): void {
    this.baseVisitor.onMulDecData(node, props);
  }

  onSetData(node: Expression, props: JSVisitorProps): void {
    this.baseVisitor.onSetData(node, props);
  }

  onSearchLoop(node: Expression, props: JSVisitorProps): void {
    props.pushLine(`// loop search;\n`);

    this.baseVisitor.onSearchLoop(node, props);
  }

  onLoopEnter(node: LoopBlock, props: JSVisitorProps): void {
    props.pushLine(`// loop id: ${this.id}\n`);
    if (this.idStack.length < this.maxLoopDeepPerf) {
      props.pushLine(`filterProfiling(${this.id}, 'B');\n`);
    }

    this.idStack.push(this.id);
    this.id += 1;

    this.baseVisitor.onLoopEnter(node, props);
  }

  onLoopLeave(node: LoopBlock, props: JSVisitorProps): void {
    this.baseVisitor.onLoopLeave(node, props);

    const id = this.idStack.pop();
    if (this.idStack.length < this.maxLoopDeepPerf) {
      props.pushLine(`filterProfiling(${id}, 'E');\n`);
    }
  }

  onDataLoopEnter(node: LoopBlock, props: JSVisitorProps): void {
    this.baseVisitor.onDataLoopEnter(node, props);
  }

  onDataLoopLeave(node: LoopBlock, props: JSVisitorProps): void {
    this.baseVisitor.onDataLoopLeave(node, props);
  }
}

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
      // 2 byte - ph (0 - B, 1 - E)
      // 2 byte - id
      // 4 byte - time
      // total size - 8
      
      const PHASE_B = 0;
      const PHASE_E = 1;
      const PAGE_SIZE = 65536;
      const START_OFFSET = 8;
      
      let buffer = new ArrayBuffer(PAGE_SIZE);
      let HEAP16 = new Uint16Array(buffer);
      let HEAP32 = new Uint32Array(buffer);
      
      const currentTime = performance.now();
      
      let currentListSize = getCurrentMaxEntitySize();
      
      function getCurrentMaxEntitySize() {
        return (buffer.byteLength / 8) - 1;
      }
      
      function setPhase(entityId, ph) {
        HEAP16[(START_OFFSET >>> 1) + ((entityId * 8) >>> 1)] = ph;
      }
      
      function setId(entityId, id) {
        HEAP16[(START_OFFSET >>> 1) + ((entityId * 8) >>> 1) + 1] = id;
      }
      
      function setTime(entityId, time) {
        HEAP32[(START_OFFSET >>> 2) + ((entityId * 8) >>> 2) + 1] = time;
      }
      
      function insertNewEntity(ph, id) {
        const time = ((performance.now() - currentTime) * 1000) | 0;
        const listSize = HEAP32[0];
      
        if (!(listSize < currentListSize)) {
          const tempHEAP16 = HEAP16;
      
          buffer = new ArrayBuffer(buffer.byteLength + PAGE_SIZE);
          HEAP16 = new Uint16Array(buffer);
          HEAP32 = new Uint32Array(buffer);
      
          HEAP16.set(tempHEAP16);
          currentListSize = getCurrentMaxEntitySize();
        }
      
        setPhase(listSize, ph);
        setId(listSize, id);
        setTime(listSize, time);
      
        HEAP32[0]++;
      }
      `
    );

    props.pushLine(
      `insertNewEntity(PHASE_B, 0);\n`
    );

    this.baseVisitor.onStartCompiling(ast, props);
  }

  onEndCompiling(ast: Ast, props: JSVisitorProps): void {
    this.baseVisitor.onEndCompiling(ast, props);

    props.pushLine(
      `
      insertNewEntity(PHASE_E, 0);\n

      globalThis.__perf__ = buffer;\n`
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
      props.pushLine(`insertNewEntity(PHASE_B, ${this.id});\n`);
    }

    this.idStack.push(this.id);
    this.id += 1;

    this.baseVisitor.onLoopEnter(node, props);
  }

  onLoopLeave(node: LoopBlock, props: JSVisitorProps): void {
    this.baseVisitor.onLoopLeave(node, props);

    const id = this.idStack.pop();
    if (this.idStack.length < this.maxLoopDeepPerf) {
      props.pushLine(`insertNewEntity(PHASE_E, ${id});\n`);
    }
  }

  onDataLoopEnter(node: LoopBlock, props: JSVisitorProps): void {
    this.baseVisitor.onDataLoopEnter(node, props);
  }

  onDataLoopLeave(node: LoopBlock, props: JSVisitorProps): void {
    this.baseVisitor.onDataLoopLeave(node, props);
  }
}

import { Ast, Expression, LoopBlock, MulExpression } from 'ir/ast/ast';
import { JSVisitor, JSVisitorProps } from './js-visitor';

const noop = () => { };

export class RequieredVisitor implements Required<JSVisitor> {
  private visitor: JSVisitor;

  constructor(visitor: JSVisitor) {
    this.visitor = visitor;

    if (!visitor.onStartCompiling) {
      this.onStartCompiling = noop;
    }

    if (!visitor.onEndCompiling) {
      this.onEndCompiling = noop;
    }

    if (!visitor.onIncPtr) {
      this.onIncPtr = noop;
    }

    if (!visitor.onDecPtr) {
      this.onDecPtr = noop;
    }

    if (!visitor.onIncData) {
      this.onIncData = noop;
    }

    if (!visitor.onDecData) {
      this.onDecData = noop;
    }

    if (!visitor.onReadData) {
      this.onReadData = noop;
    }

    if (!visitor.onWriteData) {
      this.onWriteData = noop;
    }

    if (!visitor.onSetToZero) {
      this.onSetToZero = noop;
    }

    if (!visitor.onMulIncData) {
      this.onMulIncData = noop;
    }

    if (!visitor.onMulDecData) {
      this.onMulDecData = noop;
    }

    if (!visitor.onSetData) {
      this.onSetData = noop;
    }

    if (!visitor.onSearchLoop) {
      this.onSearchLoop = noop;
    }

    if (!visitor.onLoopEnter) {
      this.onLoopEnter = noop;
    }

    if (!visitor.onLoopLeave) {
      this.onLoopLeave = noop;
    }

    if (!visitor.onDataLoopEnter) {
      this.onDataLoopEnter = noop;
    }

    if (!visitor.onDataLoopLeave) {
      this.onDataLoopLeave = noop;
    }
  }

  onStartCompiling(ast: Ast, props: JSVisitorProps): void {
    this.visitor.onStartCompiling(ast, props);
  }

  onEndCompiling(ast: Ast, props: JSVisitorProps): void {
    this.visitor.onEndCompiling(ast, props);
  }

  onIncPtr(node: Expression, props: JSVisitorProps): void {
    this.visitor.onIncPtr(node, props);
  }

  onDecPtr(node: Expression, props: JSVisitorProps): void {
    this.visitor.onDecPtr(node, props);
  }

  onIncData(node: Expression, props: JSVisitorProps): void {
    this.visitor.onIncData(node, props);
  }

  onDecData(node: Expression, props: JSVisitorProps): void {
    this.visitor.onDecData(node, props);
  }

  onReadData(node: Expression, props: JSVisitorProps): void {
    this.visitor.onReadData(node, props);
  }

  onWriteData(node: Expression, props: JSVisitorProps): void {
    this.visitor.onWriteData(node, props);
  }

  onSetToZero(node: Expression, props: JSVisitorProps): void {
    this.visitor.onSetToZero(node, props);
  }

  onMulIncData(node: MulExpression, props: JSVisitorProps): void {
    this.visitor.onMulIncData(node, props);
  }

  onMulDecData(node: MulExpression, props: JSVisitorProps): void {
    this.visitor.onMulDecData(node, props);
  }

  onSetData(node: Expression, props: JSVisitorProps): void {
    this.visitor.onSetData(node, props);
  }

  onSearchLoop(node: Expression, props: JSVisitorProps): void {
    this.visitor.onSearchLoop(node, props);
  }

  onLoopEnter(node: LoopBlock, props: JSVisitorProps): void {
    this.visitor.onLoopEnter(node, props);
  }

  onLoopLeave(node: LoopBlock, props: JSVisitorProps): void {
    this.visitor.onLoopLeave(node, props);
  }

  onDataLoopEnter(node: LoopBlock, props: JSVisitorProps): void {
    this.visitor.onDataLoopEnter(node, props);
  }

  onDataLoopLeave(node: LoopBlock, props: JSVisitorProps): void {
    this.visitor.onDataLoopLeave(node, props);
  }
}

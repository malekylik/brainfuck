import { Ast, Expression, LoopBlock, MulExpression } from 'ir/ast/ast';

export interface JSVisitorProps {
  getOffset(): number;
  peakOffset(): number;
  getMemoryName(): string;
  getPointerName(): string;
  getINFName(): string;
  getOUTFName(): string;
  calculatePtr(ptrName: string, offset: number): string;
  getDataFromMemory(): string;
  pushLine(line: string): void;
}

export interface JSVisitor {
  onStartCompiling?(ast: Ast, props: JSVisitorProps): void;
  onEndCompiling?(ast: Ast, props: JSVisitorProps): void;

  onIncPtr?(node: Expression, props: JSVisitorProps): void;
  onDecPtr?(node: Expression, props: JSVisitorProps): void;
  onIncData?(node: Expression, props: JSVisitorProps): void;
  onDecData?(node: Expression, props: JSVisitorProps): void;
  onReadData?(node: Expression, props: JSVisitorProps): void;
  onWriteData?(node: Expression, props: JSVisitorProps): void;
  onSetToZero?(node: Expression, props: JSVisitorProps): void;
  onMulIncData?(node: MulExpression, props: JSVisitorProps): void;
  onMulDecData?(node: MulExpression, props: JSVisitorProps): void;
  onSetData?(node: Expression, props: JSVisitorProps): void;
  onSearchLoop?(node: Expression, props: JSVisitorProps): void;

  onLoopEnter?(node: LoopBlock, props: JSVisitorProps): void;
  onLoopLeave?(node: LoopBlock, props: JSVisitorProps): void;

  onDataLoopEnter?(node: LoopBlock, props: JSVisitorProps): void;
  onDataLoopLeave?(node: LoopBlock, props: JSVisitorProps): void;
}

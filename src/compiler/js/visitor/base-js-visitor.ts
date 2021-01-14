import { Ast, Expression, LoopBlock, MulExpression } from 'ir/ast/ast';
import { JSVisitor, JSVisitorProps } from './js-visitor';

export class BaseJSVisitor implements JSVisitor {
  onStartCompiling(ast: Ast, props: JSVisitorProps): void {
    props.pushLine(`let ${props.getPointerName()} = 0;\n`);
  }

  onEndCompiling(ast: Ast, props: JSVisitorProps): void {
  }

  onIncPtr(node: Expression, props: JSVisitorProps): void {
    props.pushLine(`${props.getPointerName()} += ${node.argument};\n`);
  }

  onDecPtr(node: Expression, props: JSVisitorProps): void {
    props.pushLine(`${props.getPointerName()} -= ${node.argument};\n`);
  }

  onIncData(node: Expression, props: JSVisitorProps): void {
    const readMemory = props.getDataFromMemory();

    props.pushLine(`${readMemory} += ${node.argument};\n`);
  }

  onDecData(node: Expression, props: JSVisitorProps): void {
    const readMemory = props.getDataFromMemory();

    props.pushLine(`${readMemory} -= ${node.argument};\n`);
  }

  onReadData(node: Expression, props: JSVisitorProps): void {
    const readMemory = props.getDataFromMemory();

    props.pushLine(`for (let i = 0; i < ${node.argument}; i++) ${readMemory} = ${props.getINFName()}();\n`);
  }

  onWriteData(node: Expression, props: JSVisitorProps): void {
    const readMemory = props.getDataFromMemory();

    if (node.argument < 2) {
      props.pushLine(`${props.getOUTFName()}(${readMemory});\n`);
    } else {
      props.pushLine(`for (let i = 0; i < ${node.argument}; i++) ${props.getOUTFName()}(${readMemory});\n`);
    }
  }

  onSetToZero(node: Expression, props: JSVisitorProps): void {
    const readMemory = props.getDataFromMemory();

    props.pushLine(`${readMemory} = 0;\n`);
  }

  onMulIncData(node: MulExpression, props: JSVisitorProps): void {
    const memoryName = props.getMemoryName();
    const readMemory = props.getDataFromMemory();
    const loop_offset = props.calculatePtr(props.getPointerName(), props.peakOffset());

    let arg = '';
    let power = Math.log2(node.argument);

    if (node.argument === 1) {
      arg = `${memoryName}[${loop_offset}]`;
    } else if (Number.isInteger(power)) {
      arg = `${memoryName}[${loop_offset}] << ${power}`;
    } else {
      power = power | 0;
      const mult = node.argument - (2 ** power);
      const mult_str = mult === 1 ? '' : `* ${mult}`;
      arg = `(${memoryName}[${loop_offset}] << ${power}) + ${memoryName}[${loop_offset}] ${mult_str}`;
    }

    arg = node.loop_divider === -1 ? arg : `(${arg} / ${Math.abs(node.loop_divider)}) | 0`;
    props.pushLine(`${readMemory} += ${arg};\n`);
  }

  onMulDecData(node: MulExpression, props: JSVisitorProps): void {
    const memoryName = props.getMemoryName();
    const readMemory = props.getDataFromMemory();

    const loop_offset = props.calculatePtr(props.getPointerName(), props.peakOffset());
    let arg = node.argument === 1 ? `${memoryName}[${loop_offset}]` : `${node.argument} * ${memoryName}[${loop_offset}]`;
    arg = node.loop_divider === -1 ? arg : `(${arg} / ${Math.abs(node.loop_divider)}) | 0`;
    props.pushLine(`${readMemory} -= ${arg};\n`);
  }

  onSetData(node: Expression, props: JSVisitorProps): void {
    const readMemory = props.getDataFromMemory();

    props.pushLine(`${readMemory} = ${node.argument};\n`);
  }

  onSearchLoop(node: Expression, props: JSVisitorProps): void {
    const readMemory = props.getDataFromMemory();
    const dataptr = props.getPointerName();

    props.pushLine(
      `while (${readMemory}) {\n`
    );
    if (node.argument > 0) {
      props.pushLine(
        `${dataptr} += ${node.argument};\n`
      );
    } else {
      props.pushLine(
        `${dataptr} -= ${Math.abs(node.argument)};\n`
      );
    }
    props.pushLine(
      `}\n`
    );
  }

  onLoopEnter(node: LoopBlock, props: JSVisitorProps): void {
    const readMemory = props.getDataFromMemory();

    props.pushLine(`while (${readMemory}) {\n`);
  }

  onLoopLeave(node: LoopBlock, props: JSVisitorProps): void {
    props.pushLine(`}\n`);
  }

  onDataLoopEnter(node: LoopBlock, props: JSVisitorProps): void {
    const readMemory = props.getDataFromMemory();

    props.pushLine(`if (${readMemory}) {\n`);
  }

  onDataLoopLeave(node: LoopBlock, props: JSVisitorProps): void {
    props.pushLine(`}\n`);
  }
}

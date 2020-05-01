import { Bin } from './bin';

const tx = new TextDecoder();

class ForGenerator {
  textGenerator: TextGenerator;

  constructor(textGenerator: TextGenerator) {
    this.textGenerator = textGenerator;
  }

  for(): ForDeclaration {
    this.textGenerator.pushText(
      Bin.Names.ReservedNames.getFor().concat(
        Bin.Punctuation.getSpace(),
        Bin.Punctuation.getOpenBracket()
      )
    );

    return new ForDeclaration(this.textGenerator);
  }

  endFor(): TextGenerator {
    this.textGenerator.pushText(Bin.Punctuation.getCurclyCloseBracket());

    return this.textGenerator;
  }
}

class ForDeclaration {
  textGenerator: TextGenerator;

  constructor(textGenerator: TextGenerator) {
    this.textGenerator = textGenerator;
  }

  let(): ForDeclaration {
    this.textGenerator.let();

    return this;
  }

  const(): ForDeclaration {
    this.textGenerator.const();

    return this;
  }

  name(name: string): ForDeclaration {
    this.textGenerator.name(name);

    return this;
  }

  assigne(): ForDeclaration {
    this.textGenerator.assigne();

    return this;
  }

  number(n: number): ForDeclaration {
    this.textGenerator.number(n);

    return this;
  }

  comma(): ForDeclaration {
    this.textGenerator.comma();

    return this;
  }


  endForDeclaration(): ForCondition {
    this.textGenerator.binString.push(Bin.Punctuation.getEndLine());

    return new ForCondition(this.textGenerator);
  }
}

class ForCondition {
  textGenerator: TextGenerator;

  constructor(textGenerator: TextGenerator) {
    this.textGenerator = textGenerator;
  }

  name(name: string): ForCondition {
    this.textGenerator.name(name);

    return this;
  }

  number(n: number): ForCondition {
    this.textGenerator.number(n);

    return this;
  }

  less(): ForCondition {
    this.textGenerator.less();

    return this;
  }

  strictEqual(): ForCondition {
    this.textGenerator.strictEqual();

    return this;
  }

  comma(): ForCondition {
    this.textGenerator.newLine();

    return this;
  }

  objectProperty(index: string | number): ForCondition {
    this.textGenerator.objectProperty(index);

    return this;
  }

  endForCondition(): ForUpdate  {
    this.textGenerator.binString.push(Bin.Punctuation.getEndLine());

    return new ForUpdate(this.textGenerator);
  }
}

class ForUpdate {
  textGenerator: TextGenerator;

  constructor(textGenerator: TextGenerator) {
    this.textGenerator = textGenerator;
  }

  assigne(): ForUpdate {
    this.textGenerator.assigne();

    return this;
  }

  name(name: string): ForUpdate {
    this.textGenerator.name(name);

    return this;
  }

  number(n: number): ForUpdate {
    this.textGenerator.number(n);

    return this;
  }

  add(): ForUpdate {
    this.textGenerator.add();

    return this;
  }

  endForUpdate(): TextGenerator  {
    this.textGenerator.binString.push(
      Bin.Punctuation.getCloseBracket().concat(
        Bin.Punctuation.getSpace(),
        Bin.Punctuation.getCurclyOpenBracket()
      )
    );

    return this.textGenerator;
  }
}

class IfGenerator {
  textGenerator: TextGenerator;

  constructor(textGenerator: TextGenerator) {
    this.textGenerator = textGenerator;
  }

  if(): IfCondition {
    this.textGenerator.binString.push(Bin.Conditions.getIf().concat(
      Bin.Punctuation.getSpace(),
      Bin.Punctuation.getOpenBracket()
    ));

    return new IfCondition(this.textGenerator);
  }

  endIf(): TextGenerator {
    this.textGenerator.pushText(Bin.Punctuation.getCurclyCloseBracket());

    return this.textGenerator;
  }
}

class IfCondition {
  textGenerator: TextGenerator;

  constructor(textGenerator: TextGenerator) {
    this.textGenerator = textGenerator;
  }

  name(name: string): IfCondition {
    this.textGenerator.name(name);

    return this;
  }

  number(n: number): IfCondition {
    this.textGenerator.number(n);

    return this;
  }

  less(): IfCondition {
    this.textGenerator.less();

    return this;
  }

  strictEqual(): IfCondition {
    this.textGenerator.strictEqual();

    return this;
  }

  comma(): IfCondition {
    this.textGenerator.newLine();

    return this;
  }

  objectProperty(index: string | number): IfCondition {
    this.textGenerator.objectProperty(index);

    return this;
  }

  endIfCondition(): TextGenerator {
    this.textGenerator.binString.push(Bin.Punctuation.getCloseBracket().concat(
        Bin.Punctuation.getSpace(),
        Bin.Punctuation.getCurclyOpenBracket(),
      )
    );

    return this.textGenerator;
  }
}

export class TextGenerator {
  binString: Array<Array<number>>;
  isStartLine: boolean;
  forGenerator: ForGenerator;
  ifGenerator: IfGenerator;

  constructor (start: Array<Array<number>> = []) {
    this.binString = start;
    this.isStartLine = true;
    this.forGenerator = new ForGenerator(this);
    this.ifGenerator = new IfGenerator(this);
  }

  let(): TextGenerator {
    this.pushText(Bin.Names.ReservedNames.VarDeclaration.getLet());

    return this;
  }

  const(): TextGenerator {
    this.pushText(Bin.Names.ReservedNames.VarDeclaration.getConst());

    return this;
  }

  number(n: number): TextGenerator {
    this.pushText(Bin.Numbers.getInt(n));

    return this;
  }

  add(): TextGenerator {
    this.pushText(Bin.Numbers.add());

    return this;
  }

  subtract(): TextGenerator {
    this.pushText(Bin.Numbers.subtract());

    return this;
  }

  name(name: string): TextGenerator {
    this.pushText(Bin.Names.getName(name));

    return this;
  }

  objectProperty(index: string | number): TextGenerator {
    this.binString.push(
      Bin.Names.getObjectPropertyOpenBracket().concat(
        typeof index === 'string' ? Bin.Names.getName(index) : Bin.Numbers.getInt(index),
        Bin.Names.getObjectPropertyCloseBracket(),
      )
    );

    return this;
  }

  assigne(): TextGenerator {
    this.pushText(Bin.Punctuation.getAssigne());

    return this;
  }

  comma(): TextGenerator {
    this.binString.push(Bin.Punctuation.getComma());

    return this;
  }

  less(): TextGenerator {
    this.pushText(Bin.Conditions.getLess());

    return this;
  }

  strictEqual(): TextGenerator {
    this.pushText(Bin.Conditions.getStrictEqual());

    return this;
  }

  for(): ForDeclaration {
    return this.forGenerator.for();
  }

  if (): IfCondition {
    return this.ifGenerator.if();
  }

  endIf(): TextGenerator {
    return this.ifGenerator.endIf();
  }

  endFor(): TextGenerator {
    return this.forGenerator.endFor();
  }

  call<T>(funcName: string, args: Array<T> = []): TextGenerator {
    this.pushText(Bin.FunctionBin.getFunctionCall(Bin.Names.getName(funcName), args));

    return this;
  }

  newUint8Array(size: number): TextGenerator {
    this.pushText(Bin.FunctionBin.getConstructorCall(Bin.Names.GlobalName.getUint8Array(), [size]));

    return this;
  }

  endLine(): TextGenerator {
    this.binString.push(Bin.Punctuation.getEndLine());

    return this;
  }

  newLine(): TextGenerator {
    this.binString.push(Bin.Punctuation.getNewLine());
    this.isStartLine = true;

    return this;
  }

  toString() {
    return tx.decode(Uint8Array.from(this.binString.flat()));
  }

  pushText(text: Array<number>): TextGenerator {
    if (this.isStartLine) {
      this.binString.push(text);
      this.isStartLine = false;
    } else {
      this.binString.push(Bin.Punctuation.getSpace().concat(text));
    }

    return this;
  }
}

import { Bin } from './bin';

const tx = new TextDecoder();

export class TextGenerator {
  binString: Array<Array<number>>;

  constructor (start: Array<Array<number>> = []) {
    this.binString = start;
  }

  const(): TextGenerator {
    this.pushText(Bin.Names.ReservedNames.VarDeclaration.getConst());

    return this;
  }

  name(name: string): TextGenerator {
    this.pushText(Bin.Names.getName(name));

    return this;
  }

  assigne(): TextGenerator {
    this.pushText(Bin.Punctuation.getAssigne());

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

    return this;
  }

  toString() {
    return tx.decode(Uint8Array.from(this.binString.flat()));
  }

  private pushText(text: Array<number>): TextGenerator {
    if (this.binString.length !== 0) {
      this.binString.push(Bin.Punctuation.getSpace().concat(text));
    } else {
      this.binString.push(text);
    }

    return this;
  }
}

import { Bin } from './bin';

const tx = new TextDecoder();

export class TextGenerator {
  binString: Array<Array<number>>;
  isStartLine: boolean;

  constructor (start: Array<Array<number>> = []) {
    this.binString = start;
    this.isStartLine = true;
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
    this.isStartLine = true;

    return this;
  }

  toString() {
    return tx.decode(Uint8Array.from(this.binString.flat()));
  }

  private pushText(text: Array<number>): TextGenerator {
    if (this.isStartLine) {
      this.binString.push(text);
      this.isStartLine = false;
    } else {
      this.binString.push(Bin.Punctuation.getSpace().concat(text));
    }

    return this;
  }
}

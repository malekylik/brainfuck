interface TextCoder {
  encode(s: string): void;

  decode(): string;
}

export class TextCoderLegacy implements TextCoder {
  private lines: Array<string>;
  private cached: string;

  constructor() {
    this.lines = [];
    this.cached = '';
  }

  encode(s: string): void {
    this.lines.push(s);
  }

  decode(): string {
    if (this.cached.length === 0 && this.lines.length !== 0) {
      this.cached = this.joinLines();

      return this.cached;
    }

    return this.cached;
  }

  private joinLines(): string {
    let temp = [...this.lines];

    while (temp.length > 1) {
      const temp1: Array<string> = [];

      let i = 0;

      while (i < temp.length - 1) {
        temp1.push(temp[i] + temp[i + 1]);

        i += 2;
      }

      if (i - temp.length) {
        temp1.push(temp[temp.length - 1]);
      }

      temp = temp1;
    }

    return temp.length > 0 ? temp[0] : '';
  }
}

export { TextCoderLegacy as TextCoder };

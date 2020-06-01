import { flat } from './flat';

interface TextCoder {
  encode(s: string): void;

  decode(): string;
}

let TextCoderImplementation: { new (): TextCoder } = null;

if (self['TextDecoder'] && self['TextEncoder']) {
  const txd = new TextDecoder();
  const txe = new TextEncoder();

  const encode = (code: string) => Array.from(txe.encode(code));

  TextCoderImplementation = class implements TextCoder {
    private lines: Array<Array<number>>;
    private cached: string;
  
    constructor() {
      this.lines = [];
      this.cached = '';
    }
  
    encode(s: string): void {
      this.lines.push(encode(s));
    }
  
    decode(): string {
      if (this.cached.length === 0 && this.lines.length !== 0) {
        this.cached = txd.decode(Uint8Array.from(flat(this.lines)));
  
        return this.cached;
      }
  
      return this.cached;
    }
  }
} else {
  TextCoderImplementation = class implements TextCoder {
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
}





export { TextCoderImplementation as TextCoder };

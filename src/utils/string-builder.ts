import { alignTo4 } from './align';
import { arrayCopyStr } from './array-copy';

const RESIZE_LENGTH = 16384;

const txd = new TextDecoder();

export class StringBuilder {
  private value: Uint8Array;
  private length: number;

  constructor () {
    this.length = 0;
    this.value = new Uint8Array(16);
  }

  append(str: string): StringBuilder {
    this.ensureCapacity(this.length + str.length);

    arrayCopyStr(this.value, this.length, str);

    this.length += str.length;

    return this;
  }

  build(): string {
    return txd.decode(this.value.subarray(0, this.length));
  }

  size(): number {
    return this.length;
  }

  private ensureCapacity(newLength: number) {
    if (this.value.length < newLength) {
      const newStr = new Uint8Array(alignTo4(newLength + RESIZE_LENGTH));
      newStr.set(this.value);
      this.value = newStr;
    }
  }
}

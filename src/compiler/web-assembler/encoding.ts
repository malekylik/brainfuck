export const ieee754 = (n: number) => {
  const buf = Buffer.allocUnsafe(4);
  buf.writeFloatLE(n, 0);
  return Uint8Array.from(buf);
};

export const encodeString = (str: string) => [
  str.length,
  ...str.split('').map(s => s.charCodeAt(0))
];

export const signedLEB128 = (n: number) => {
  n |= 0;
  const result = [];
  while (true) {
    const byte = n & 0x7f;
    n >>= 7;
    if (
      (n === 0 && (byte & 0x40) === 0) ||
      (n === -1 && (byte & 0x40) !== 0)
    ) {
      result.push(byte);
      return result;
    }
    result.push(byte | 0x80);
  }
};

export const unsignedLEB128 = (n: number) => {
  const buffer = [];
  do {
    let byte = n & 0x7f;
    n >>>= 7;
    if (n !== 0) {
      byte |= 0x80;
    }
    buffer.push(byte);
  } while (n !== 0);
  return buffer;
};

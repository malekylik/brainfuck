export function arrayCopyStr(src: Uint8Array, srcPosition: number, dst: string) {
  const end = src.length - srcPosition < dst.length ? src.length : srcPosition + dst.length;
  let i = 0;

  while (srcPosition < end) {
    src[srcPosition] = dst.charCodeAt(i);

    srcPosition++;
    i++;
  }
}

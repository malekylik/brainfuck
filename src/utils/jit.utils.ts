export function toPointer(offset: number): string {
  return offset === 0 ? 'dataptr' : `dataptr + ${offset}`;
}

export function getJITFuncName(opNumber: number): string {
  return `jit_${opNumber}`;
}

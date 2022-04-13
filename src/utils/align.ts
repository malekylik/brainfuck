export function align(size: number, alignment: number): number {
  return (size + alignment - 1) & ~(alignment - 1);
}

export function alignTo4(size: number): number {
  return (size + 3) & ~(3);
}

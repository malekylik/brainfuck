export function flat<T>(a: Array<Array<T>>): Array<T> {
  return a.reduce((prev, curr) => prev.concat(curr), []);
}

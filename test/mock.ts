let id = 0;

export function ioin() {
  return String(Math.random() * 10 | 0);
}

(self as any)[ioin.name] = ioin;

export function getIOOut() {
  const outName = `ioout_${id}`;
  const f = function (v: number) { f.str += String.fromCharCode(v) ?? ''; };
  Object.defineProperty(f, 'name', { value: outName, writable: false });

  f.str = '';

  (self as any)[f.name] = f;

  id += 1;

  return f;
}

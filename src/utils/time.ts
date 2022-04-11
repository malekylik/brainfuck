export function converMillisecondToString(time: number): string {
  time = time | 0;

  return `${(time / 1000) | 0}s ${String(time - ((time / 1000) | 0) * 1000).padStart(3, '0')}ms`;
}

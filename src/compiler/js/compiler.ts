import { createMemory } from './memory';

const tx = new TextDecoder();

export function compile(): void {
  const a = createMemory('ad', 30000);
  console.log(a);
  console.log(tx.decode(a));
}

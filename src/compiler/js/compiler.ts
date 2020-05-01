import { TextGenerator } from '@text-generation/text-generation';

export function compile(): void {
  const textGenerator = new TextGenerator();

  textGenerator
    .const()
    .name('memory')
    .assigne()
    .newUint8Array(123)
    .endLine();

  console.log(textGenerator.toString());
}

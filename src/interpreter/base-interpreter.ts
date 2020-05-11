import { CompiledModule, InputFunction, OutputFunction } from 'types/compiler';

export function interpret(tokens: Array<string>, inF: InputFunction, outF: OutputFunction): Promise<CompiledModule> {
  const memory = new Uint8Array(30000);
  let pc = 0;
  let dataptr = 0;

  function run() {
    while (pc < tokens.length) {
      const instruction = tokens[pc];
  
      switch (instruction) {
        case '>':
          dataptr++;
          break;
        case '<':
          dataptr--;
          break;
        case '+':
          memory[dataptr]++;
          break;
        case '-':
          memory[dataptr]--;
          break;
        case '.':
          outF(memory[dataptr]);
          break;
          case ',':
          memory[dataptr] = Number(inF());
          break;
        case '[': {
          if (memory[dataptr] == 0) {
            let bracket_nesting = 1;
            let saved_pc = pc;
  
            while (bracket_nesting && ++pc < tokens.length) {
              if (tokens[pc] == ']') {
                bracket_nesting--;
              } else if (tokens[pc] == '[') {
                bracket_nesting++;
              }
            }
  
            if (!bracket_nesting) {
              break;
            } else {
              console.warn(`unmatched '[' at pc=${saved_pc}`);
            }
          }
  
          break;
        }
        case ']':
          if (memory[dataptr] != 0) {
            let bracket_nesting = 1;
            let saved_pc = pc;
  
            while (bracket_nesting && pc > 0) {
              pc--;
              if (tokens[pc] == '[') {
                bracket_nesting--;
              } else if (tokens[pc] == ']') {
                bracket_nesting++;
              }
            }
  
            if (!bracket_nesting) {
              break;
            } else {
              console.warn(`unmatched ']' at pc=${saved_pc}`);
            }
          }
          break;
        default: { console.warn(`bad char ' ${instruction} ' at pc=${pc}`); }
      }
  
      pc++;
    }
  }

  return Promise.resolve({
    module: { run },
    memory,
  });
}

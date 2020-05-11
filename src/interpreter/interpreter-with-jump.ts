import { CompiledModule, InputFunction, OutputFunction } from 'types/compiler';

function compute_jumptable(tokens: Array<string>): Uint32Array {
  let pc = 0;
  let program_size = tokens.length;
  const jumptable = new Uint32Array(program_size);

  while (pc < program_size) {
    const instruction = tokens[pc];

    if (instruction == '[') {
      let bracket_nesting = 1;
      let seek = pc;

      while (bracket_nesting && ++seek < program_size) {
        if (tokens[seek] == ']') {
          bracket_nesting--;
        } else if (tokens[seek] == '[') {
          bracket_nesting++;
        }
      }

      if (!bracket_nesting) {
        jumptable[pc] = seek;
        jumptable[seek] = pc;
      } else {
        console.warn(`unmatched '[' at pc=${pc}`);
      }

    }
    pc++;
  }

  return jumptable;
}

export function interpret(tokens: Array<string>, inF: InputFunction, outF: OutputFunction): Promise<CompiledModule> {
  const memory = new Uint8Array(30000);
  let pc = 0;
  let dataptr = 0;

  const jumptable = compute_jumptable(tokens);

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
          if (memory[dataptr] === 0) {
            pc = jumptable[pc];
          }

          break;
        }
        case ']':
          if (memory[dataptr] !== 0) {
            pc = jumptable[pc];
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

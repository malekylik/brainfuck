const MEMORY_SIZE = 30000;
const debug = true;

function parse_from_stream(programFile) {
  const tokens = [];

  for (let i = 0; i < programFile.length; i++) {
    const c = programFile[i];

    if (c == '>' || c == '<' || c == '+' || c == '-' || c == '.' ||
        c == ',' || c == '[' || c == ']') {
        tokens.push(c);
    }
  }

  return tokens;
}

function _simpleinterp(tokens) {
  const memory = new Uint8Array(MEMORY_SIZE).fill(0);
  let pc = 0;
  let dataptr = 0;

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
        self.postMessage({ type: 'out', value: String.fromCharCode(memory[dataptr]) });
        break;
      case ',':
        memory[dataptr] = Number(prompt('enter data') || 0);
        break;
      case '[': {
        if (memory[dataptr] === 0) {
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


  return { pc, dataptr, memory };
}

function _simpleinterpDebug(tokens) {
  const { pc, dataptr, memory } = _simpleinterp(tokens);

  // Done running the program. Dump state if verbose.
  console.log(`* pc=${pc}`);
  console.log(`* dataptr=${dataptr}`);
  console.log(`* Memory nonzero locations:`);

  for (let i = 0, pcount = 0; i < memory.length; i++) {
    if (memory[i]) {
        console.log(`[${String(i).padStart(3)}] = ${String(memory[i]).padEnd(3)}       `);
        pcount++;

        if (pcount > 0 && pcount % 4 == 0) {
          console.log();
        }
      }
    }
  
  console.log();
}

const simpleinterp = debug ? _simpleinterpDebug : _simpleinterp;

self.addEventListener('message', (e) => {
    const { type, src } = e.data;

    if (type === 'start') {
        const tokens = parse_from_stream(src);

        const now = performance.now();
        console.log(`start at ${now}`);

        simpleinterp(tokens);

        const end = performance.now();
        console.log(`end at ${end}`);
        console.log(`done in: ${end - now}`);

        self.postMessage({ type: 'end' });
    }
});


// simple intr 617673.5999999946 = 10m 17s
// parse to js = 25s

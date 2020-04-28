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
  const memory = new Array(MEMORY_SIZE).fill(0);
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
        console.log(memory[dataptr]);
        // std::cout.put(memory[dataptr]);
        break;
      case ',':
        // memory[dataptr] = std::cin.get();
        break;
      case '[': {
        if (memory[dataptr] == 0) {
          let bracket_nesting = 1;
          let saved_pc = pc;

          while (bracket_nesting && ++pc < tokens.length) {
            if (tokens[pc] == ']') {
              bracket_nesting--;
            } else if (ptokens[pc] == '[') {
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
          // std::cout << "\n";
        }
      }
    }
  
  console.log();
    // std::cout << "\n";
}

const simpleinterp = debug ? _simpleinterpDebug : _simpleinterp;

button.addEventListener('click', () => {
  const tokens = parse_from_stream(textarea.value);
  simpleinterp(tokens);
})

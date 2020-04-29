const OpKind = {
  INVALID_OP: 'INVALID_OP',
  INC_PTR: 'INC_PTR',
  DEC_PTR: 'DEC_PTR',
  INC_DATA: 'INC_DATA',
  DEC_DATA: 'DEC_DATA',
  READ_STDIN: 'READ_STDIN',
  WRITE_STDOUT: 'WRITE_STDOUT',
  JUMP_IF_DATA_ZERO: 'JUMP_IF_DATA_ZERO',
  JUMP_IF_DATA_NOT_ZERO: 'JUMP_IF_DATA_NOT_ZERO',
};

function opKindToChar(opKind) {
  switch (opKind) {
    case OpKind.INC_PTR:
      return ">";
    case OpKind.DEC_PTR:
      return "<";
    case OpKind.INC_DATA:
      return "+";
    case OpKind.DEC_DATA:
      return "-";
    case OpKind.READ_STDIN:
      return ",";
    case OpKind.WRITE_STDOUT:
      return ".";
    case OpKind.JUMP_IF_DATA_ZERO:
      return "[";
    case OpKind.JUMP_IF_DATA_NOT_ZERO:
      return "]";
    case OpKind.INVALID_OP:
      return "x";
  }

  return 'unknown';
}

function serializeOpcode(opcode) {
  return `${opKindToChar(opcode.kind)} ${opcde.argument}`;
}

function createOpcode(opKind, argument) {
  return {
    kind: opKind,
    argument,
  };
}

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

function translate_program(tokens) {
  let pc = 0;
  let program_size = tokens.length;
  const ops = [];

  // Throughout the translation loop, this stack contains offsets (in the ops
  // vector) of open brackets (JUMP_IF_DATA_ZERO ops) waiting for a closing
  // bracket. Since brackets nest, these naturally form a stack. The
  // JUMP_IF_DATA_ZERO ops get added to ops with their argument set to 0 until a
  // matching closing bracket is encountered, at which point the argument can be
  // back-patched.
  const open_bracket_stack = [];

  while (pc < program_size) {
    const instruction = tokens[pc];

    if (instruction == '[') {
      // Place a jump op with a placeholder 0 offset. It will be patched-up to
      // the right offset when the matching ']' is found.
      open_bracket_stack.push(ops.length);
      ops.push(createOpcode(OpKind.JUMP_IF_DATA_ZERO, 0));
      pc++;
    } else if (instruction == ']') {
      if (!open_bracket_stack.length) {
        console.warn(`unmatched closing ']' at pc=${pc}`)
      }
      const open_bracket_offset = open_bracket_stack.pop();

      // Now we have the offset of the matching '['. We can use it to create a
      // new jump op for the ']' we're handling, as well as patch up the offset
      // of the matching '['.
      ops[open_bracket_offset].argument = ops.length;
      ops.push(createOpcode(OpKind.JUMP_IF_DATA_NOT_ZERO, open_bracket_offset));
      pc++;
    } else {
      // Not a jump; all the other ops can be repeated, so find where the repeat
      // ends.
      const start = pc++;
      while (pc < program_size && tokens[pc] === instruction) {
        pc++;
      }
      // Here pc points to the first new instruction encountered, or to the end
      // of the program.
      const num_repeats = pc - start;

      // Figure out which op kind the instruction represents and add it to the
      // ops.
      let kind = OpKind.INVALID_OP;
      switch (instruction) {
      case '>':
        kind = OpKind.INC_PTR;
        break;
      case '<':
        kind = OpKind.DEC_PTR;
        break;
      case '+':
        kind = OpKind.INC_DATA;
        break;
      case '-':
        kind = OpKind.DEC_DATA;
        break;
      case ',':
        kind = OpKind.READ_STDIN;
        break;
      case '.':
        kind = OpKind.WRITE_STDOUT;
        break;
        default: { console.warn(`"bad char '${instruction}' at pc=${start}`); }
      }

      ops.push(createOpcode(kind, num_repeats));
    }
  }

  return ops;
}

function compute_jumptable(tokens) {
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

function _simpleinterp(tokens) {
  const memory = new Uint8Array(MEMORY_SIZE).fill(0);
  const op_cost = {};
  let pc = 0;
  let dataptr = 0;

  const ops = translate_program(tokens);

  while (pc < ops.length) {
    const op = ops[pc];

    if (debug) {
      op_cost[op.kind] = 1 + (op_cost[op.kind] || 0);
    }

    switch (op.kind) {
      case OpKind.INC_PTR:
        dataptr += op.argument;
        break;
      case OpKind.DEC_PTR:
        dataptr -= op.argument;
        break;
      case OpKind.INC_DATA:
        memory[dataptr] += op.argument;
        break;
      case OpKind.DEC_DATA:
        memory[dataptr] -= op.argument;
        break;
      case OpKind.READ_STDIN:
        for (let i = 0; i < op.argument; i++) {
          memory[dataptr] = Number(prompt('enter value'));
        }
        break;
      case OpKind.WRITE_STDOUT:
        for (let i = 0; i < op.argument; i++) {
          self.postMessage({ type: 'out', value: String.fromCharCode(memory[dataptr]) });
        }
        break;
      case OpKind.JUMP_IF_DATA_ZERO:
        if (memory[dataptr] == 0) {
          pc = op.argument;
        }
        break;
      case OpKind.JUMP_IF_DATA_NOT_ZERO:
        if (memory[dataptr] != 0) {
          pc = op.argument;
        }
        break;
      default: { console.warn(`bad char ' ${instruction} ' at pc=${pc}`); }
    }

    pc++;
    // console.log(pc);
  }


  return { pc, dataptr, memory, op_cost };
}

function _simpleinterpDebug(tokens) {
  const { pc, dataptr, memory, op_cost } = _simpleinterp(tokens);

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

  let total = 0;
  Object.entries(op_cost).forEach(([op, count]) => {
    console.log(`${opKindToChar(op)}  -->  ${count}`);

    total += count;
  });

  console.log(`.. Total: ${total}`);
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


// parse to js = 25s
// simple intr 617673.5999999946 = 10m 17s
// intr with precomputete jump location 280830.3200000082 = 4m 41s
//    +  -->  179053599
//    [  -->  422534152
//    -  -->  177623022
//    >  -->  4453036023
//    <  -->  4453036013
//    ]  -->  835818921
//    .  -->  6240
//    .. Total: 10521107970
// with opcodes 194952.01000000816 = 3m 14s

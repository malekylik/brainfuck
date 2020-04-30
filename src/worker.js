const OpKind = {
  INVALID_OP: 'INVALID_OP',
  INC_PTR: 'INC_PTR',
  DEC_PTR: 'DEC_PTR',
  INC_DATA: 'INC_DATA',
  DEC_DATA: 'DEC_DATA',
  READ_STDIN: 'READ_STDIN',
  WRITE_STDOUT: 'WRITE_STDOUT',
  LOOP_SET_TO_ZERO: 'LOOP_SET_TO_ZERO',
  LOOP_MOVE_PTR: 'LOOP_MOVE_PTR',
  LOOP_MOVE_DATA: 'LOOP_MOVE_DATA',
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
    case OpKind.LOOP_SET_TO_ZERO:
      return "s";
    case OpKind.LOOP_MOVE_PTR:
      return "m";
    case OpKind.LOOP_MOVE_DATA:
      return "d";
    case OpKind.INVALID_OP:
      return "x";
  }

  return 'unknown';
}

function serializeOpcode(opcode) {
  return `${opKindToChar(opcode.kind)}${opcode.argument}`;
}

function createOpcode(opKind, argument) {
  return {
    kind: opKind,
    argument,
  };
}

const MEMORY_SIZE = 30000;
const debug = false;

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

// Optimizes a loop that starts at loop_start (the opening JUMP_IF_DATA_ZERO).
// The loop runs until the end of ops (implicitly there's a back-jump after the
// last op in ops).
//
// If optimization succeeds, returns a sequence of instructions that replace the
// loop; otherwise, returns an empty vector.
function optimize_loop(ops, loop_start) {
  const new_ops = [];

  if (ops.length - loop_start === 2) {
    const repeated_op = ops[loop_start + 1];

    if (repeated_op.kind === OpKind.INC_DATA || repeated_op.kind === OpKind.DEC_DATA) {
      new_ops.push(createOpcode(OpKind.LOOP_SET_TO_ZERO, 0));
    } else if (repeated_op.kind === OpKind.INC_PTR || repeated_op.kind === OpKind.DEC_PTR) {
      new_ops.push(
      createOpcode(OpKind.LOOP_MOVE_PTR, repeated_op.kind === OpKind.INC_PTR
                    ? repeated_op.argument
                    : -repeated_op.argument));
    }
  } else if (ops.length - loop_start === 5) {
    // Detect patterns: -<+> and ->+<
    if (
        ops[loop_start + 1].kind === OpKind.DEC_DATA &&
        ops[loop_start + 3].kind === OpKind.INC_DATA &&
        ops[loop_start + 1].argument === 1 &&
        ops[loop_start + 3].argument === 1
      )
    {
      if (ops[loop_start + 2].kind === OpKind.INC_PTR &&
        ops[loop_start + 4].kind === OpKind.DEC_PTR &&
        ops[loop_start + 2].argument === ops[loop_start + 4].argument) {
        new_ops.push(createOpcode(OpKind.LOOP_MOVE_DATA, ops[loop_start + 2].argument));
      } else if (ops[loop_start + 2].kind === OpKind.DEC_PTR &&
          ops[loop_start + 4].kind === OpKind.INC_PTR &&
          ops[loop_start + 2].argument === ops[loop_start + 4].argument
      ) {
        new_ops.push(
        createOpcode(OpKind.LOOP_MOVE_DATA, -ops[loop_start + 2].argument));
      }
    }
  }

  return new_ops;
}

function translate_program(tokens) {
  let pc = 0;
  let program_size = tokens.length;
  let ops = [];

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

      // Try to optimize this loop; if optimize_loop succeeds, it returns a
      // non-empty vector which we can splice into ops in place of the loop.
      // If the returned vector is empty, we proceed as usual.
      const optimized_loop = optimize_loop(ops, open_bracket_offset);

      if (!optimized_loop.length) {
        // Loop wasn't optimized, so proceed emitting the back-jump to ops. We
        // have the offset of the matching '['. We can use it to create a new
        // jump op for the ']' we're handling, as well as patch up the offset of
        // the matching '['.
        ops[open_bracket_offset].argument = ops.length;
        ops.push(createOpcode(OpKind.JUMP_IF_DATA_NOT_ZERO, open_bracket_offset));
      } else {
        // Replace this whole loop with optimized_loop.
        ops = ops.slice(0, open_bracket_offset).concat(optimized_loop);
      }
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

function _simpleinterp(ops) {
  const memory = new Uint8Array(MEMORY_SIZE).fill(0);
  const op_cost = {};
  const trace_count = {};
  let current_trace = '';
  let pc = 0;
  let dataptr = 0;

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
      case OpKind.LOOP_SET_TO_ZERO:
        memory[dataptr] = 0;
        break;
      case OpKind.LOOP_MOVE_PTR:
        while (memory[dataptr]) {
          dataptr += op.argument;
        }
        break;
      case OpKind.LOOP_MOVE_DATA: {
        if (memory[dataptr]) {
          const move_to_ptr = dataptr + op.argument;
          memory[move_to_ptr] += memory[dataptr];
          memory[dataptr] = 0;
        }
        break;
      }
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
      default: { console.warn(`bad char ' ${opKindToChar(op.kind)} ' at pc=${pc}`); }
    }

    if (debug) {
      if (op.kind === OpKind.JUMP_IF_DATA_ZERO) {
        current_trace = "";
      } else if (op.kind === OpKind.JUMP_IF_DATA_NOT_ZERO) {
        if (current_trace.length > 0) {
          trace_count[current_trace] = 1 + (trace_count[current_trace] || 0);
          current_trace = "";
        }
      } else {
        current_trace += ` ${serializeOpcode(op)}`;
      }
    }

    pc++;
  }


  return { pc, dataptr, memory, op_cost, trace_count };
}

function _simpleinterpDebug(ops) {
  const { pc, dataptr, memory, op_cost, trace_count } = _simpleinterp(ops);

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

  Object.entries(trace_count)
  .sort((a, b) => b[1] - a[1])
  .forEach(([s, c]) => console.log(`${s.padEnd(15)} --> ${c}`));
}

const simpleinterp = debug ? _simpleinterpDebug : _simpleinterp;

self.addEventListener('message', (e) => {
    const { type, src } = e.data;

    if (type === 'start') {
        const tokens = parse_from_stream(src);

        const ops = translate_program(tokens);

        const now = performance.now();
        console.log(`start at ${now}`);

        simpleinterp(ops);

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
//    >  -->  4.453.036.023
//    <  -->  4453036013
//    ]  -->  835818921
//    .  -->  6240
//    .. Total: 10521107970
// with opcodes 194952.01000000816 = 46.2
//    +  -->  115369640
//    [  -->  105793470
//    -  -->  107116320
//    >  -->  465.855.475
//    <  -->  338.151.728
//    ]  -->  277607115
//    m  -->  24477084
//    s  -->  46993495
//    d  -->  245270103
//    .  -->  6240
// >1 d9 <10      --> 116145344
// >2 d9 <11      --> 31339760
// +1 >9          --> 30948460
// >1 +1 >8       --> 9515168
// <1 d1 >4       --> 9017333
// >8             --> 8711811
// >1 d9 <1 +1 >8 --> 7493248
// <3 d3 <1 +1 <9 --> 5867616
// <1 d1 >3       --> 4689518
// >4 d-36 >5     --> 3845696
// with (LOOP_SET_TO_ZERO, LOOP_MOVE_PTR, LOOP_MOVE_DATA) 31564.180000015767 = 31.5s


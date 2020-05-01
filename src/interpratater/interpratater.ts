import { OpKind } from '@ir/opcode-kinds';
import { Opcode } from '@ir/opcode';
import { opKindToChar, serializeOpcode } from '@ir/utils';

const MEMORY_SIZE = 30000;

type IntrResult = { pc: number, dataptr: number, memory: Uint8Array, op_cost: { [prop: string]: number; }, trace_count: { [prop: string]: number; } };

function _simpleinterp(ops: Array<Opcode>): IntrResult {
  const memory = new Uint8Array(MEMORY_SIZE).fill(0);
  const op_cost: { [prop: string]: number; } = {};
  const trace_count: { [prop: string]: number; } = {};
  let current_trace = '';
  let pc = 0;
  let dataptr = 0;

  while (pc < ops.length) {
    const op = ops[pc];

    if (__DEV__) {
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

    if (__DEV__) {
      if (op.kind === OpKind.JUMP_IF_DATA_ZERO) {
        current_trace = '';
      } else if (op.kind === OpKind.JUMP_IF_DATA_NOT_ZERO) {
        if (current_trace.length > 0) {
          trace_count[current_trace] = 1 + (trace_count[current_trace] || 0);
          current_trace = '';
        }
      } else {
        current_trace += ` ${serializeOpcode(op)}`;
      }
    }

    pc++;
  }


  return { pc, dataptr, memory, op_cost, trace_count };
}

function _simpleinterpDebug(ops: Array<Opcode>): IntrResult {
  const res = _simpleinterp(ops);
  const { pc, dataptr, memory, op_cost, trace_count } = res;

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
    console.log(`${opKindToChar(op as OpKind)}  -->  ${count}`);

    total += count;
  });

  console.log(`.. Total: ${total}`);

  Object.entries(trace_count)
  .sort((a, b) => b[1] - a[1])
  .forEach(([s, c]) => console.log(`${s.padEnd(15)} --> ${c}`));

  return res;
}

export const simpleinterp = __DEV__ ? _simpleinterpDebug : _simpleinterp;

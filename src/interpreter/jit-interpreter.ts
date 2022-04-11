import { OpKind } from 'ir/opcode-kinds';
import { FuncOpcode, Opcode } from 'ir/opcode';
import { opKindToChar } from 'ir/utils';
import { CompiledModule, InputFunction, OutputFunction } from 'types/compiler';
import { TextCoder } from 'utils/text-coder';
import { getJITFuncName, toPointer } from 'utils/jit.utils';

const MEMORY_SIZE = 30000;

function JIT(ops: Array<Opcode>, pc: number, offset: number) {
  const jitOpPc = pc;
  const jitOp = ops[pc];
  const offset_stack: Array<number> = [];

  if (jitOp.kind === OpKind.JUMP_IF_DATA_ZERO) {
    const coder = new TextCoder();

    coder.encode(`return function jit_${jitOpPc}(args){\n`);

    coder.encode(`let dataptr = args.dataptr;\n`);

    pc += 1;
  
    while (pc < jitOp.argument) {
      const op = ops[pc];

      switch (op.kind) {
        case OpKind.INC_PTR: {
          coder.encode(`dataptr += ${op.argument};\n`);

          break;
        }

        case OpKind.DEC_PTR: {
          coder.encode(`dataptr -= ${op.argument};\n`);

          break;
        }

        case OpKind.INC_OFFSET: {
          offset += op.argument;

          break;
        }

        case OpKind.DEC_OFFSET: {
          offset -= op.argument;

          break;
        }

        case OpKind.INC_DATA: {
          coder.encode(`args.memory[${toPointer(offset)}] += ${op.argument};\n`);

          break;
        }

        case OpKind.DEC_DATA: {
          coder.encode(`args.memory[${toPointer(offset)}] -= ${op.argument};\n`);

          break;
        }

        case OpKind.READ_STDIN: {
          coder.encode(`for (let i = 0; i < ${op.argument}; i++) args.memory[${toPointer(offset)}] = Number(args.in());\n`);

          break;
        }

        case OpKind.WRITE_STDOUT: {
          coder.encode(`for (let i = 0; i < ${op.argument}; i++) args.out(args.memory[${toPointer(offset)}]);\n`);

          break;
        }

        case OpKind.JUMP_IF_DATA_ZERO: {
          coder.encode(`while (args.memory[${toPointer(offset)}]) {\n`);
          
          break;
        }

        case OpKind.JUMP_IF_DATA_NOT_ZERO: {
          coder.encode(`}\n`);

          break;
        }

        case OpKind.LOOP_SET_TO_ZERO: {
          coder.encode(`args.memory[${toPointer(offset)}] = 0;\n`);

          break;
        }

        case OpKind.SEARCH_LOOP: {
          coder.encode(`while (args.memory[${toPointer(offset)}]) {\n`);
            if (op.argument > 0) {
              coder.encode(
                `dataptr += ${op.argument};\n`
              );
            } else {
              coder.encode(
                `dataptr -= ${Math.abs(op.argument)};\n`
              );
            }
          coder.encode(`}\n`);

          break;
        }

        case OpKind.SET_DATA: {
          coder.encode(`args.memory[${toPointer(offset)}] = ${op.argument};\n`);

          break;
        }

        case OpKind.LOOP_MOVE_DATA: {
          coder.encode(`if (args.memory[${toPointer(offset)}]) {\n`);

          offset_stack.push(offset);

          break;
        }

        case OpKind.LOOP_MOVE_DATA_END: {
          coder.encode(`}\n`);

          offset = offset_stack.pop();

          break;
        }


        case OpKind.MUL_INC_DATA: {
          if (op.argument === 1) {
            coder.encode(`args.memory[${toPointer(offset)}] += args.memory[${toPointer(offset_stack[offset_stack.length - 1])}];\n`);
          } else {
            coder.encode(`args.memory[${toPointer(offset)}] += args.memory[${toPointer(offset_stack[offset_stack.length - 1])}] * ${op.argument};\n`);
          }
          
          break;
        }

        case OpKind.MUL_DEC_DATA: {
          if (op.argument === 1) {
            coder.encode(`args.memory[${toPointer(offset)}] -= args.memory[${toPointer(offset_stack[offset_stack.length - 1])}];\n`);
          } else {
            coder.encode(`args.memory[${toPointer(offset)}] -= args.memory[${toPointer(offset_stack[offset_stack.length - 1])}] * ${op.argument};\n`);
          }
          
          break;
        }

        case OpKind.RUN_FUNC: {
          coder.encode(`while (args.memory[${toPointer(offset)}]) {\n`);
          coder.encode(`args.dataptr = dataptr;\n`);
          coder.encode(`${(op as FuncOpcode).name}(args);\n`);
          coder.encode(`dataptr = args.dataptr;\n`)
          coder.encode(`}\n`);

          pc = op.argument;

          break;
        }

        default: {
          console.warn('JIT miss opcode', op.kind);

          break;
        }
      }

      pc += 1;
    }

    coder.encode(`args.dataptr = dataptr;\n`);

    coder.encode(`return ${jitOp.argument};\n`);
    coder.encode(`}\n`);

    const jitFn = (new Function(coder.decode()))();

    const name = getJITFuncName(jitOpPc);

    (self as any)[name] = jitFn;

    return {
      kind: OpKind.RUN_FUNC,
      func: jitFn,
      loc: jitOp.loc,
      argument: jitOp.argument,
      name,
    } as FuncOpcode;
  }

  return jitOp;
}

export function interpret(ops: Array<Opcode>, inF: InputFunction, outF: OutputFunction, threashold: number): Promise<CompiledModule> {
  const memory = new Uint8Array(MEMORY_SIZE);
  const profileCount = new Uint32Array(ops.length);
  const offset_stack: Array<number> = [];
  let pc = 0;
  let dataptr = 0;
  let offset = 0;
  let loop_data_offset = 0;
  let loop_data_offsets: Array<number> = [];
  const args = {
    dataptr: 0,
    memory,
    in: inF,
    out: outF,
  };

  function run() {
    while (pc < ops.length) {
      const op = ops[pc];

      switch (op.kind) {
        case OpKind.INC_PTR: {
          dataptr += op.argument;

          break;
        }

        case OpKind.DEC_PTR: {
          dataptr -= op.argument;

          break;
        }

        case OpKind.INC_OFFSET: {
          offset += op.argument;

          break;
        }

        case OpKind.DEC_OFFSET: {
          offset -= op.argument;

          break;
        }

        case OpKind.INC_DATA: {
          memory[dataptr + offset] += op.argument;

          break;
        }

        case OpKind.DEC_DATA: {
          memory[dataptr + offset] -= op.argument;

          break;
        }

        case OpKind.READ_STDIN: {
          for (let i = 0; i < op.argument; i++) {
            memory[dataptr + offset] = Number(inF());
          }

          break;
        }

        case OpKind.WRITE_STDOUT: {
          for (let i = 0; i < op.argument; i++) {
            outF(memory[dataptr + offset]);
          }

          break;
        }

        case OpKind.LOOP_SET_TO_ZERO: {
          memory[dataptr + offset] = 0;

          break;
        }

        case OpKind.SEARCH_LOOP: {
          while (memory[dataptr + offset]) {
            dataptr += op.argument;
          }

          break;
        }

        case OpKind.JUMP_IF_DATA_ZERO: {
          profileCount[pc] += 1;

          if (profileCount[pc] >= threashold) {
            ops[pc] = JIT(ops, pc, offset);
          }

          if (memory[dataptr + offset] === 0) {
            pc = op.argument;
          } else {
            offset_stack.push(offset);
          }
          
          break;
        }

        case OpKind.JUMP_IF_DATA_NOT_ZERO: {
          if (memory[dataptr + offset_stack[offset_stack.length - 1]] !== 0) {
            pc = op.argument;
            offset = offset_stack[offset_stack.length - 1];
          } else {
            offset = offset_stack.pop();
          }

          break;
        }

        case OpKind.RESET_DATA_RANGE: {
          for (let i = 1; i < op.argument + 1; i++) {
            memory[dataptr + offset + i] = 0;
          }

          break;
        }

        case OpKind.SET_DATA: {
          memory[dataptr + offset] = op.argument;

          break;
        }

        case OpKind.DATA_LOOP: {
          if (memory[dataptr + offset] === 0) {
            pc = op.argument;
          } else {
            loop_data_offset = offset;
            loop_data_offsets.push(loop_data_offset);
          }

          break;
        }

        case OpKind.DATA_LOOP_ADD: {
          memory[dataptr + offset] += memory[dataptr + loop_data_offset] * op.argument;

          break;
        }
        
        case OpKind.DATA_LOOP_SUB: {
          memory[dataptr + offset] -= memory[dataptr + loop_data_offset] * op.argument;

          break;
        }

        case OpKind.DATA_LOOP_END: {
          if (memory[dataptr + loop_data_offset] !== 0) {
            memory[dataptr + loop_data_offset] = 0;
          }

          offset = loop_data_offsets.pop();
          loop_data_offset = loop_data_offsets[loop_data_offsets.length - 1];

          break;
        }

        case OpKind.LOOP_MOVE_DATA: {

          if (memory[dataptr + offset] === 0) {
            pc = op.argument;
          } else {
            offset_stack.push(offset);
          }

          break;
        }

        case OpKind.LOOP_MOVE_DATA_END: {
          offset = offset_stack.pop();

          break;
        }


        case OpKind.MUL_INC_DATA: {
          const loop_offset = dataptr + offset_stack[offset_stack.length - 1];

          memory[dataptr + offset] += memory[loop_offset] * op.argument;
          break;
        }

        case OpKind.MUL_DEC_DATA: {
          const loop_offset = dataptr + offset_stack[offset_stack.length - 1];

          memory[dataptr + offset] -= memory[loop_offset] * op.argument;
          break;
        }

        case OpKind.RUN_FUNC: {
          while (memory[dataptr + offset]) {
            args.dataptr = dataptr;

            offset_stack.push(offset);

            (op as FuncOpcode).func(args);
            
            offset = offset_stack.pop();
  
            dataptr = args.dataptr;
          }

          pc = op.argument;

          break;
        }

        default: { console.warn(`bad char ' ${opKindToChar(op.kind)} ' at pc=${pc}`); }
      }

      pc++;
    }

    return ops;
  }

  return Promise.resolve({
    module: { run },
    memory,
  });
}

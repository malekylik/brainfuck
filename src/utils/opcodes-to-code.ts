import { FuncOpcode, Opcode } from 'ir/opcode';
import { OpKind } from 'ir/opcode-kinds';
import { toPointer } from './jit.utils';
import { TextCoder } from './text-coder';

const MEMORY_SIZE = 30000;

export function converOpcodesToCode(ops: Array<Opcode>) {
  let pc = 0;

  const coder = new TextCoder();
  const offset_stack: Array<number> = [];

  pc = 0;
  let offset = 0;

  coder.encode(`const outF = (char) => console.log(String.fromCharCode(char)); // Change to output to another destionation \n\n`);

  coder.encode(`const memory = new Uint8Array(${MEMORY_SIZE});\n`);
  coder.encode(`let dataptr = 0;\n\n`);
  coder.encode(`const args = {\n`);
  coder.encode(`dataptr,\n`);
  coder.encode(`memory,\n`);
  coder.encode(`out: outF,\n`);
  coder.encode(`};\n\n`);

  while (pc < ops.length) {
    const op = ops[pc];

    switch (op.kind) {
      case OpKind.INC_PTR: {
        coder.encode(`dataptr += ${op.argument}; // ${pc} kind: ${op.kind} argument: ${op.argument}\n`);

        break;
      }

      case OpKind.DEC_PTR: {
        coder.encode(`dataptr -= ${op.argument}; // ${pc} kind: ${op.kind} argument: ${op.argument}\n`);

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
        coder.encode(`args.memory[${toPointer(offset)}] += ${op.argument}; // ${pc} kind: ${op.kind} argument: ${op.argument} \n`);

        break;
      }

      case OpKind.DEC_DATA: {
        coder.encode(`args.memory[${toPointer(offset)}] -= ${op.argument}; // ${pc} kind: ${op.kind} argument: ${op.argument} \n`);

        break;
      }

      case OpKind.READ_STDIN: {
        coder.encode(`for (let i = 0; i < ${op.argument}; i++) args.memory[${toPointer(offset)}] = Number(args.in());\n`);

        break;
      }

      case OpKind.WRITE_STDOUT: {
        coder.encode(`for (let i = 0; i < ${op.argument}; i++) args.out(args.memory[${toPointer(offset)}]); // ${pc} kind: ${op.kind} argument: ${op.argument} \n`);

        break;
      }

      case OpKind.JUMP_IF_DATA_ZERO: {
        coder.encode(`while (args.memory[${toPointer(offset)}]) { // ${pc} kind: ${op.kind} argument: ${op.argument}\n`);

          break;
      }

      case OpKind.JUMP_IF_DATA_NOT_ZERO: {
        coder.encode(`} // ${pc} kind: ${op.kind} argument: ${op.argument}\n`);


        break;
      }

      case OpKind.LOOP_SET_TO_ZERO: {
        coder.encode(`args.memory[${toPointer(offset)}] = 0; // ${pc} kind: ${op.kind} argument: ${op.argument}\n`);

        break;
      }

      case OpKind.SEARCH_LOOP: {
        coder.encode(`while (args.memory[${toPointer(offset)}]) { // ${pc} kind: ${op.kind} argument: ${op.argument}\n`);
          if (op.argument > 0) {
            coder.encode(
              `dataptr += ${op.argument};\n`
            );
          } else {
            coder.encode(
              `dataptr -= ${Math.abs(op.argument)};\n`
            );
          }
        coder.encode(`} // ${pc} kind: ${op.kind} argument: ${op.argument}\n`);

        break;
      }

      case OpKind.SET_DATA: {
        coder.encode(`args.memory[${toPointer(offset)}] = ${op.argument}; // ${pc} kind: ${op.kind} argument: ${op.argument}\n`);

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
        coder.encode(`while (args.memory[${toPointer(offset)}]) { // ${pc} kind: ${op.kind} argument: ${op.argument}\n`);
        coder.encode(`args.dataptr = dataptr;\n`);
        coder.encode(`${(op as FuncOpcode).name}(args); // ${pc} kind: ${op.kind} argument: ${op.argument}\n`);
        coder.encode(`dataptr = args.dataptr;\n`)
        coder.encode(`} // ${pc} kind: ${op.kind} argument: ${op.argument}\n`);

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

  pc = 0;

  coder.encode(`\n// JIT funcs \n`);

  while (pc < ops.length) {
    const op = ops[pc];
  
    if (op.kind === OpKind.RUN_FUNC) {
      coder.encode(`// JIT for ${pc} \n`);
      coder.encode(`${(op as FuncOpcode).func.toString()} \n\n`);
    }

    pc += 1;
  }

  return coder.decode();
}

import { FuncOpcode, Opcode } from 'ir/opcode';
import { OpKind } from 'ir/opcode-kinds';
import { toPointer } from './jit.utils';
import { StringBuilder } from './string-builder';

const MEMORY_SIZE = 30000;

export function converOpcodesToCode(ops: Array<Opcode>) {
  let pc = 0;

  const coder = new StringBuilder();
  const offset_stack: Array<number> = [];

  pc = 0;
  let offset = 0;

  coder.append(`const outF = (char) => console.log(String.fromCharCode(char)); // Change to output to another destionation \n\n`);

  coder.append(`const memory = new Uint8Array(${MEMORY_SIZE});\n`);
  coder.append(`let dataptr = 0;\n\n`);
  coder.append(`const args = {\n`);
  coder.append(`dataptr,\n`);
  coder.append(`memory,\n`);
  coder.append(`out: outF,\n`);
  coder.append(`};\n\n`);

  while (pc < ops.length) {
    const op = ops[pc];

    switch (op.kind) {
      case OpKind.INC_PTR: {
        coder.append(`dataptr += ${op.argument}; // ${pc} kind: ${op.kind} argument: ${op.argument}\n`);

        break;
      }

      case OpKind.DEC_PTR: {
        coder.append(`dataptr -= ${op.argument}; // ${pc} kind: ${op.kind} argument: ${op.argument}\n`);

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
        coder.append(`args.memory[${toPointer(offset)}] += ${op.argument}; // ${pc} kind: ${op.kind} argument: ${op.argument} \n`);

        break;
      }

      case OpKind.DEC_DATA: {
        coder.append(`args.memory[${toPointer(offset)}] -= ${op.argument}; // ${pc} kind: ${op.kind} argument: ${op.argument} \n`);

        break;
      }

      case OpKind.READ_STDIN: {
        coder.append(`for (let i = 0; i < ${op.argument}; i++) args.memory[${toPointer(offset)}] = Number(args.in());\n`);

        break;
      }

      case OpKind.WRITE_STDOUT: {
        coder.append(`for (let i = 0; i < ${op.argument}; i++) args.out(args.memory[${toPointer(offset)}]); // ${pc} kind: ${op.kind} argument: ${op.argument} \n`);

        break;
      }

      case OpKind.JUMP_IF_DATA_ZERO: {
        coder.append(`while (args.memory[${toPointer(offset)}]) { // ${pc} kind: ${op.kind} argument: ${op.argument}\n`);

          break;
      }

      case OpKind.JUMP_IF_DATA_NOT_ZERO: {
        coder.append(`} // ${pc} kind: ${op.kind} argument: ${op.argument}\n`);


        break;
      }

      case OpKind.LOOP_SET_TO_ZERO: {
        coder.append(`args.memory[${toPointer(offset)}] = 0; // ${pc} kind: ${op.kind} argument: ${op.argument}\n`);

        break;
      }

      case OpKind.SEARCH_LOOP: {
        coder.append(`while (args.memory[${toPointer(offset)}]) { // ${pc} kind: ${op.kind} argument: ${op.argument}\n`);
          if (op.argument > 0) {
            coder.append(
              `dataptr += ${op.argument};\n`
            );
          } else {
            coder.append(
              `dataptr -= ${Math.abs(op.argument)};\n`
            );
          }
        coder.append(`} // ${pc} kind: ${op.kind} argument: ${op.argument}\n`);

        break;
      }

      case OpKind.SET_DATA: {
        coder.append(`args.memory[${toPointer(offset)}] = ${op.argument}; // ${pc} kind: ${op.kind} argument: ${op.argument}\n`);

        break;
      }

      case OpKind.LOOP_MOVE_DATA: {
        coder.append(`if (args.memory[${toPointer(offset)}]) {\n`);

        offset_stack.push(offset);

        break;
      }

      case OpKind.LOOP_MOVE_DATA_END: {
        coder.append(`}\n`);

        offset = offset_stack.pop();

        break;
      }


      case OpKind.MUL_INC_DATA: {
        if (op.argument === 1) {
          coder.append(`args.memory[${toPointer(offset)}] += args.memory[${toPointer(offset_stack[offset_stack.length - 1])}];\n`);
        } else {
          coder.append(`args.memory[${toPointer(offset)}] += args.memory[${toPointer(offset_stack[offset_stack.length - 1])}] * ${op.argument};\n`);
        }

        break;
      }

      case OpKind.MUL_DEC_DATA: {
        if (op.argument === 1) {
          coder.append(`args.memory[${toPointer(offset)}] -= args.memory[${toPointer(offset_stack[offset_stack.length - 1])}];\n`);
        } else {
          coder.append(`args.memory[${toPointer(offset)}] -= args.memory[${toPointer(offset_stack[offset_stack.length - 1])}] * ${op.argument};\n`);
        }

        break;
      }

      case OpKind.RUN_FUNC: {
        coder.append(`while (args.memory[${toPointer(offset)}]) { // ${pc} kind: ${op.kind} argument: ${op.argument}\n`);
        coder.append(`args.dataptr = dataptr;\n`);
        coder.append(`${(op as FuncOpcode).name}(args); // ${pc} kind: ${op.kind} argument: ${op.argument}\n`);
        coder.append(`dataptr = args.dataptr;\n`)
        coder.append(`} // ${pc} kind: ${op.kind} argument: ${op.argument}\n`);

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

  coder.append(`\n// JIT funcs \n`);

  while (pc < ops.length) {
    const op = ops[pc];
  
    if (op.kind === OpKind.RUN_FUNC) {
      coder.append(`// JIT for ${pc} \n`);
      coder.append(`${(op as FuncOpcode).func.toString()} \n\n`);
    }

    pc += 1;
  }

  return coder.build();
}

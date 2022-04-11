// TODO: doesn't work if asm func is invoked inside another asm func, rewrite to use WebAssembler instead

import { FuncOpcode, Opcode } from 'ir/opcode';
import { OpKind } from 'ir/opcode-kinds';
import { OutputFunction } from 'types/compiler';
import { TextCoder } from 'utils/text-coder';

function toPointerASM(offset: number): string {
  return offset === 0 ? `(dataptr|0)` : `((dataptr|0) + ${offset}|0) >> 0`;
}


export function JIT_ASM(ops: Array<Opcode>, pc: number, offset: number, heap: ArrayBuffer, out: OutputFunction) {
  const jitOpPc = pc;
  const jitOp = ops[pc];
  const offset_stack: Array<number> = [];

  if (jitOp.kind === OpKind.JUMP_IF_DATA_ZERO) {
    const coder = new TextCoder();

    const depensFunc: Array<string> = [];

    for (let i = jitOpPc + 1; i < jitOp.argument; i++) {
      const op = ops[i];

      if (op.kind === OpKind.RUN_FUNC) {
          depensFunc.push((op as FuncOpcode).name);

          i = op.argument;
      }
    }

    pc += 1;
  
    while (pc < jitOp.argument) {
      const op = ops[pc];

      switch (op.kind) {
        case OpKind.INC_PTR: {
          coder.encode(`dataptr = ((dataptr|0) + ${op.argument})|0;\n`);

          break;
        }

        case OpKind.DEC_PTR: {
          coder.encode(`dataptr = ((dataptr|0) - ${op.argument})|0;\n`);

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
          coder.encode(`memory[${toPointerASM(offset)}] = ((memory[${toPointerASM(offset)}]|0) + ${op.argument})|0;\n`);

          break;
        }

        case OpKind.DEC_DATA: {
          coder.encode(`memory[${toPointerASM(offset)}] = ((memory[${toPointerASM(offset)}]|0) - ${op.argument})|0;\n`);

          break;
        }

        case OpKind.READ_STDIN: {
          // for (let i = 0; i < op.argument; i++) {
          //   memory[dataptr + offset] = Number(inF());
          // }

          break;
        }

        case OpKind.WRITE_STDOUT: {
          coder.encode(`for (let i = 0; (i | 0) < ${op.argument}; i = (i + 1) | 0) out(memory[${toPointerASM(offset)}] | 0);\n`);

          break;
        }

        case OpKind.JUMP_IF_DATA_ZERO: {
          coder.encode(`while (memory[${toPointerASM(offset)}]|0) {\n`);
          
          break;
        }

        case OpKind.JUMP_IF_DATA_NOT_ZERO: {
          coder.encode(`}\n`);

          break;
        }

        case OpKind.LOOP_SET_TO_ZERO: {
          coder.encode(`memory[${toPointerASM(offset)}] = 0|0;\n`);

          break;
        }

        case OpKind.SEARCH_LOOP: {
          coder.encode(
            `while (memory[${toPointerASM(offset)}]|0) {\n`
          );
          if (op.argument > 0) {
            coder.encode(
              `dataptr = ((dataptr|0) + ${op.argument})|0;\n`
            );
          } else {
            coder.encode(
              `dataptr = ((dataptr|0) - ${Math.abs(op.argument)})|0;\n`
            );
          }
          coder.encode(
            `}\n`
          );

          break;
        }

        case OpKind.SET_DATA: {
          coder.encode(`memory[${toPointerASM(offset)}] = ${op.argument}|0;\n`);

          break;
        }

        case OpKind.LOOP_MOVE_DATA: {
          coder.encode(`if (memory[${toPointerASM(offset)}]|0) {\n`);

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
            coder.encode(`memory[${toPointerASM(offset)}] += memory[${toPointerASM(offset_stack[offset_stack.length - 1])}];\n`);
          } else {
            coder.encode(`memory[${toPointerASM(offset)}] += memory[${toPointerASM(offset_stack[offset_stack.length - 1])}] * ${op.argument};\n`);
          }
          
          break;
        }

        case OpKind.MUL_DEC_DATA: {
          if (op.argument === 1) {
            coder.encode(`memory[${toPointerASM(offset)}] -= memory[${toPointerASM(offset_stack[offset_stack.length - 1])}];\n`);
          } else {
            coder.encode(`memory[${toPointerASM(offset)}] -= memory[${toPointerASM(offset_stack[offset_stack.length - 1])}] * ${op.argument};\n`);
          }
          
          break;
        }

        case OpKind.RUN_FUNC: {
          coder.encode(`while (memory[${toPointerASM(offset)}]|0) {\n`);
          coder.encode(`${(op as FuncOpcode).name}(dataptr);\n`);
          coder.encode(`dataptr = (memory[32769] << 8) | memory[32768]|0;\n`);
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

    const funcDepCoder = new TextCoder();

    for (let i = 0; i < depensFunc.length; i++) {
      funcDepCoder.encode(`var ${depensFunc[i]} = foreign.${depensFunc[i]};\n`);
    }

    // console.log('funcs', funcDepCoder.decode());

    const f = `
    return function (stdlib, foreign, buffer){
      "use asm";
  
      var memory = new stdlib.Uint8Array(buffer);
      var out = foreign.out;
      ${funcDepCoder.decode()}
    
      function jit_${jitOpPc}(dataptr) {
        dataptr = dataptr|0;

        ${coder.decode()}

        memory[32768] = dataptr|0;
        memory[32769] = dataptr>>>8;
        return ${jitOp.argument}|0;
      }
  
      return { run: jit_${jitOpPc} };\n
    }
    `;

    const stdlib = {
      Uint8Array: Uint8Array,
    };

    const foreign: any = {
      out,
    };

    for (let i = 0; i < depensFunc.length; i++) {
      foreign[depensFunc[i]] = (self as any)[depensFunc[i]];
    }

    const jitFn = new Function(f)()(stdlib, foreign, heap);

    const name = `jit_${jitOpPc}`;

    (self as any)[name] = jitFn.run;
  
    return {
      kind: OpKind.RUN_FUNC,
      func: jitFn.run,
      loc: jitOp.loc,
      argument: jitOp.argument,
      name,
    } as FuncOpcode;
  }

  return jitOp;
}

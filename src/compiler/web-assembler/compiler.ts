import { OpKind } from 'ir/opcode-kinds';
import { Opcode } from 'ir/opcode';
import { opKindToChar } from 'ir/utils';
import { CompiledModule, InputFunction, OutputFunction } from 'types/compiler';
import { emitter, Valtype, Opcodes } from './emitter';
import { unsignedLEB128, signedLEB128 } from './encoding';
import { TextCoder } from 'utils/text-coder';

function compile_prod(compileWatToWasm: (s: string) => Uint8Array) {
  return function compile_prod(ops: Array<Opcode>, inF: InputFunction, outF: OutputFunction): Promise<CompiledModule> {
    let coder = new TextCoder();
    const code: Array<number> = [];
    const offset_stack = [];
    let offset = 0;
    let loop_data_offset = 0;
    let loop_data_offsets = [];
    const p = unsignedLEB128(0);
    const p_offset = unsignedLEB128(1);
    const p_cached = unsignedLEB128(2);

    coder.encode(
      `(module\n`
    );

    coder.encode(
      `(import "env" "print" (func $print (param i32)))\n`
    );
    coder.encode(
      `(import "env" "memory" (memory 1))\n`
    );
    coder.encode(
      `(func $run (local $p i32) (local $p_offset i32) (local $p_cached i32)\n`
    );

    code.push(
    );

      let pc = 0;
      while (pc < ops.length) {
        const op = ops[pc];

        switch (op.kind) {
          case OpKind.INC_PTR: {
            coder.encode(
              `local.get $p\n` +
              `i32.const ${op.argument}\n` +
              `i32.add\n` +
              `local.set $p\n`
            );

            break;
          }

          case OpKind.DEC_PTR: {
            coder.encode(
              `local.get $p\n` +
              `i32.const ${op.argument}\n` +
              `i32.sub\n` +
              `local.set $p\n`
            );

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
            coder.encode(
              `local.get $p\n` +
              `i32.const ${offset}\n` +
              `i32.add\n` +
              `local.tee $p_offset\n` +
              `local.get $p_offset\n` +
              `i32.load8_u\n` +
              `i32.const ${op.argument}\n` +
              `i32.add\n` +
              `i32.store8\n`
            );

            break;
          }

          case OpKind.DEC_DATA: {
            coder.encode(
              `local.get $p\n` +
              `i32.const ${offset}\n` +
              `i32.add\n` +
              `local.tee $p_offset\n` +
              `local.get $p_offset\n` +
              `i32.load8_u\n` +
              `i32.const ${op.argument}\n` +
              `i32.sub\n` +
              `i32.store8\n`
            );

            // code.push(
            //   Opcodes.get_local,
            //   ...p,

            //   Opcodes.i32_const,
            //   ...signedLEB128(offset),

            //   Opcodes.i32_add,

            //   Opcodes.tee_local,
            //   ...p_offset,

            //   Opcodes.get_local,
            //   ...p_offset,

            //   Opcodes.i32_load8_u,
            //   ...unsignedLEB128(0),
            //   ...unsignedLEB128(0),

            //   Opcodes.i32_const,
            //   ...signedLEB128(op.argument),

            //   Opcodes.i32_sub,

            //   Opcodes.i32_store8,
            //   ...unsignedLEB128(0),
            //   ...unsignedLEB128(0),
            // );

            break;
          }

          case OpKind.READ_STDIN: {
            // TO_DO add read char
            // code.push(
            //   encode(`for (let i = 0; i < ${op.argument}; i++) ${memoryName}[${dataptr} + ${offset}] = ${inF}();\n`)
            // );

            break;
          }

          case OpKind.WRITE_STDOUT: {
            // if (op.argument < 2) {
            //   code.push(
            //     encode(`${outF}(${memoryName}[${dataptr} + ${offset}]);\n`)
            //   ); 
            // } else {
            //   code.push(
            //     encode(`for (let i = 0; i < ${op.argument}; i++) ${outF}(${memoryName}[${dataptr} + ${offset}]);\n`)
            //   );
            // }

            // TO_DO add loop for out
            coder.encode(
              `local.get $p\n` +
              `i32.const ${offset}\n` +
              `i32.add\n` +
              `i32.load8_u\n` +
              `call $print\n`
            );

            break;
          }

          case OpKind.LOOP_SET_TO_ZERO: {
            // TODO: check store
            coder.encode(
              `local.get $p\n` +
              `i32.const ${offset}\n` +
              `i32.add\n` +
              `i32.const 0\n` +
              `i32.store8\n`
            );

            break;
          }

          case OpKind.LOOP_MOVE_PTR: {
            coder.encode(
              `local.get $p\n` +
              `i32.const ${offset}\n` +
              `i32.add\n` +
              `i32.const 0\n` +
              `i32.const 0\n` +
              `i32.store8\n`
            );
            // code.push(
            //   Opcodes.block,
            //   Valtype.void,
            //   Opcodes.loop,
            //   Valtype.void,

            //   Opcodes.get_local,
            //   ...p,

            //   Opcodes.i32_const,
            //   ...signedLEB128(offset),

            //   Opcodes.i32_add,

            //   Opcodes.tee_local,
            //   ...p_offset,

            //   Opcodes.i32_load8_u,
            //   ...unsignedLEB128(0),
            //   ...unsignedLEB128(0),

            //   Opcodes.i32_eqz,

            //   Opcodes.br_if,
            //   ...unsignedLEB128(1),

            //   Opcodes.get_local,
            //   ...p,

            //   Opcodes.i32_const,
            //   ...signedLEB128(op.argument),

            //   Opcodes.i32_add,

            //   Opcodes.set_local,
            //   ...p,

            //   Opcodes.br,
            //   ...unsignedLEB128(0),

            //   Opcodes.end,
            //   Opcodes.end,
            // );

            break;
          }

          // case OpKind.LOOP_MOVE_DATA: {
          //   // TODO can result in invalid memory access
          //   code.push(
          //     // OK
          //     Opcodes.get_local,
          //     ...p,

          //     Opcodes.i32_const,
          //     ...signedLEB128(offset),

          //     Opcodes.i32_add,

          //     Opcodes.tee_local,
          //     ...p_offset,
          //     // OK


          //     Opcodes.i32_load8_u,
          //     ...unsignedLEB128(0),
          //     ...unsignedLEB128(0),


          //     Opcodes.i32_const,
          //     ...unsignedLEB128(0),

          //     Opcodes.i32_gt_u,

          //     Opcodes.if,
          //     Valtype.void,

          //     Opcodes.get_local,
          //     ...p_offset,

          //     // stack :
          //     // 0: | data + offset |

          //     Opcodes.i32_const,
          //     ...signedLEB128(op.argument),

          //     Opcodes.i32_add,

          //     // stack :
          //     // 0: | data + offset + op.argument |

          //     Opcodes.get_local,
          //     ...p_offset,

          //     Opcodes.i32_const,
          //     ...signedLEB128(op.argument),

          //     Opcodes.i32_add,

          //     // stack :
          //     // 0: | data + offset + op.argument |
          //     // 1: | data + offset + op.argument |

          //     Opcodes.i32_load8_u,
          //     ...unsignedLEB128(0),
          //     ...unsignedLEB128(0),

          //     // stack :
          //     // 0: | data + offset + op.argument |

          //     Opcodes.get_local,
          //     ...p_offset,

          //     // stack :
          //     // 0: | data + offset |
          //     // 1: | data + offset + op.argument |

          //     Opcodes.i32_load8_u,
          //     ...unsignedLEB128(0),
          //     ...unsignedLEB128(0),

          //     // stack :
          //     // 0: | data + offset + op.argument |

          //     Opcodes.i32_add,

          //     Opcodes.i32_store8,
          //     ...unsignedLEB128(0),
          //     ...unsignedLEB128(0),


          //     // OK
          //     // stack :

          //     Opcodes.get_local,
          //     ...p_offset,

          //     // stack :
          //     // 0: | data + offset |

          //     Opcodes.i32_const,
          //     ...signedLEB128(0),

          //     Opcodes.i32_store8,
          //     ...unsignedLEB128(0),
          //     ...unsignedLEB128(0),

          //     Opcodes.end,
          //   );

          //   break;
          // }

          case OpKind.JUMP_IF_DATA_ZERO: {
            coder.encode(
              `block\n` +
              `loop\n` +
              `local.get $p\n` +
              `i32.const ${offset}\n` +
              `i32.add\n` +
              `i32.load8_u\n` +
              `i32.eqz\n` +
              `br_if 1\n`
            );

            offset_stack.push(offset);

            break;
          }

          case OpKind.JUMP_IF_DATA_NOT_ZERO: {
            coder.encode(
              `br 0\n` +
              `end\n` +
              `end\n`
            );

            offset = offset_stack.pop();

            break;
          }

          // case OpKind.RESET_DATA_RANGE: {
          //   code.push(
          //     Opcodes.get_local,
          //     ...p,

          //     Opcodes.i32_const,
          //     ...signedLEB128(offset),

          //     Opcodes.i32_add,

          //     Opcodes.set_local,
          //     ...p_offset,
          //   );


          // for (let i = 1; i < op.argument + 1; i++) {
          //     code.push(
          //       Opcodes.get_local,
          //       ...p_offset,

          //       Opcodes.i32_const,
          //       ...unsignedLEB128(i),

          //       Opcodes.i32_add,

          //       Opcodes.tee_local,
          //       ...p_offset,

          //       Opcodes.i32_const,
          //       ...unsignedLEB128(0),

          //       Opcodes.i32_store8,
          //       ...unsignedLEB128(0),
          //       ...unsignedLEB128(0),
          //     );
          //   }

          //   break;
          // }

          // case OpKind.SET_DATA: {
          //   code.push(
          //     Opcodes.get_local,
          //     ...p,

          //     Opcodes.i32_const,
          //     ...signedLEB128(offset),

          //     Opcodes.i32_add,

          //     Opcodes.i32_const,
          //     ...unsignedLEB128(op.argument),

          //     Opcodes.i32_store8,
          //     ...unsignedLEB128(0),
          //     ...unsignedLEB128(0),
          //   );

          //   break;
          // }

          // case OpKind.DATA_LOOP: {
          //   loop_data_offset = offset;
          //   loop_data_offsets.push(loop_data_offset);

          //   code.push(
          //     Opcodes.get_local,
          //     ...p,

          //     Opcodes.i32_const,
          //     ...signedLEB128(offset),

          //     Opcodes.i32_add,

          //     Opcodes.i32_load8_u,
          //     ...unsignedLEB128(0),
          //     ...unsignedLEB128(0),

          //     Opcodes.i32_const,
          //     ...unsignedLEB128(0),

          //     Opcodes.i32_gt_u,

          //     Opcodes.if,
          //     Valtype.void,
          //   );

          //   break;
          // }

          // case OpKind.DATA_LOOP_END: {
          //   code.push(
          //     Opcodes.get_local,
          //     ...p,

          //     Opcodes.i32_const,
          //     ...signedLEB128(loop_data_offset),

          //     Opcodes.i32_add,

          //     Opcodes.i32_const,
          //     ...signedLEB128(0),

          //     Opcodes.i32_store8,
          //     ...unsignedLEB128(0),
          //     ...unsignedLEB128(0),

          //     Opcodes.end,
          //   );

          //   offset = loop_data_offsets.pop();
          //   loop_data_offset = loop_data_offsets[loop_data_offsets.length - 1];

          //   break;
          // }

          // case OpKind.DATA_LOOP_ADD: {
          //   if (op.argument === 1) {
          //     code.push(
          //       Opcodes.get_local,
          //       ...p,

          //       Opcodes.i32_const,
          //       ...signedLEB128(offset),

          //       Opcodes.i32_add,

          //       Opcodes.tee_local,
          //       ...p_offset,

          //       Opcodes.get_local,
          //       ...p_offset,

          //       Opcodes.i32_load8_u,
          //       ...unsignedLEB128(0),
          //       ...unsignedLEB128(0),

          //       Opcodes.get_local,
          //       ...p,

          //       Opcodes.i32_const,
          //       ...signedLEB128(loop_data_offset),

          //       Opcodes.i32_add,

          //       Opcodes.i32_load8_u,
          //       ...unsignedLEB128(0),
          //       ...unsignedLEB128(0),

          //       Opcodes.i32_add,

          //       Opcodes.i32_store8,
          //       ...unsignedLEB128(0),
          //       ...unsignedLEB128(0),
          //     );
          //   } else {
          //     code.push(
          //       Opcodes.get_local,
          //       ...p,

          //       Opcodes.i32_const,
          //       ...signedLEB128(offset),

          //       Opcodes.i32_add,

          //       Opcodes.tee_local,
          //       ...p_offset,

          //       Opcodes.get_local,
          //       ...p_offset,

          //       Opcodes.i32_load8_u,
          //       ...unsignedLEB128(0),
          //       ...unsignedLEB128(0),

          //       Opcodes.get_local,
          //       ...p,

          //       Opcodes.i32_const,
          //       ...signedLEB128(loop_data_offset),

          //       Opcodes.i32_add,

          //       Opcodes.i32_load8_u,
          //       ...unsignedLEB128(0),
          //       ...unsignedLEB128(0),

          //       Opcodes.i32_const,
          //       ...signedLEB128(op.argument),

          //       Opcodes.i32_mul,

          //       Opcodes.i32_add,

          //       Opcodes.i32_store8,
          //       ...unsignedLEB128(0),
          //       ...unsignedLEB128(0),
          //     );
          //   }

          //   break;
          // }

          // case OpKind.DATA_LOOP_SUB: {
          //   if (op.argument === 1) {
          //     code.push(
          //       Opcodes.get_local,
          //       ...p,

          //       Opcodes.i32_const,
          //       ...signedLEB128(offset),

          //       Opcodes.i32_add,

          //       Opcodes.tee_local,
          //       ...p_offset,

          //       Opcodes.get_local,
          //       ...p_offset,

          //       Opcodes.i32_load8_u,
          //       ...unsignedLEB128(0),
          //       ...unsignedLEB128(0),

          //       Opcodes.get_local,
          //       ...p,

          //       Opcodes.i32_const,
          //       ...signedLEB128(loop_data_offset),

          //       Opcodes.i32_add,

          //       Opcodes.i32_load8_u,
          //       ...unsignedLEB128(0),
          //       ...unsignedLEB128(0),

          //       Opcodes.i32_sub,

          //       Opcodes.i32_store8,
          //       ...unsignedLEB128(0),
          //       ...unsignedLEB128(0),
          //     );
          //   } else {
          //     code.push(
          //       Opcodes.get_local,
          //       ...p,

          //       Opcodes.i32_const,
          //       ...signedLEB128(offset),

          //       Opcodes.i32_add,

          //       Opcodes.tee_local,
          //       ...p_offset,

          //       Opcodes.get_local,
          //       ...p_offset,

          //       Opcodes.i32_load8_u,
          //       ...unsignedLEB128(0),
          //       ...unsignedLEB128(0),

          //       Opcodes.get_local,
          //       ...p,

          //       Opcodes.i32_const,
          //       ...signedLEB128(loop_data_offset),

          //       Opcodes.i32_add,

          //       Opcodes.i32_load8_u,
          //       ...unsignedLEB128(0),
          //       ...unsignedLEB128(0),

          //       Opcodes.i32_const,
          //       ...signedLEB128(op.argument),

          //       Opcodes.i32_mul,

          //       Opcodes.i32_sub,

          //       Opcodes.i32_store8,
          //       ...unsignedLEB128(0),
          //       ...unsignedLEB128(0),
          //     );
          //   }

          //   break;
          // }

          // case OpKind.STORE_DATAPTR: {
          //   code.push(
          //     Opcodes.get_local,
          //     ...p,

          //     Opcodes.set_local,
          //     ...p_cached,
          //   );

          //   break;
          // }

          // case OpKind.GET_DATAPTR: {
          //   code.push(
          //     Opcodes.get_local,
          //     ...p_cached,

          //     Opcodes.set_local,
          //     ...p,
          //   );

          //   break;
          // }

          default: { console.warn(`bad char ' ${opKindToChar(op.kind)} ' at pc=${pc}`); }
        }
    
        pc++;
      }

      coder.encode(
        `)\n` // end func
      );

      coder.encode(`(export "run" (func $run))\n`);

      coder.encode(
        `)` // end module
      );

    const text = coder.decode();

    const wasm = compileWatToWasm(text);

    const memory = new WebAssembly.Memory({ initial: 1 });

    const instance = WebAssembly.instantiate(wasm, {
      env: {
        // inF,
        print: outF,
        memory
      }
    });

    return instance.then(module => ({
      module: { run: () => { (module.instance.exports as any).run(); } },
      memory,
    }));
  }
}

const compile = compile_prod;

export { compile };


import { OpKind } from '@ir/opcode-kinds';
import { Opcode } from '@ir/opcode';
import { opKindToChar } from '@ir/utils';
import { emitter, encodeVector, Valtype, Opcodes, emptyArray } from './emitter';
import { unsignedLEB128, signedLEB128 } from './encoding';

function compile_prod(ops: Array<Opcode>, inF: () => string, outF: (v: number) => void): Promise<any> {
  const code: Array<number> = [];
  const offset_stack = [];
  let offset = 0;
  let loop_data_offset = 0;
  let loop_data_offsets = [];
  const p = unsignedLEB128(0);
  const p_offset = unsignedLEB128(1);
  const loop_index = 2;
  const max_depth = 0;


  for (let i = 0, depth = 0; i < ops.length; i++) {

  }

  code.push(
    2, // 2 of sequence(5 - int32, 8 - int32, 10 - f32)
    0x05, // 5 of int32
    127,
    0x8, // 8 of int32
    127,
  );

  code.push(
  );

    let pc = 0;
    while (pc < ops.length) {
      const op = ops[pc];

      switch (op.kind) {
        case OpKind.INC_PTR: {


          // code.push(
          //   encode(`${dataptr} += ${op.argument};\n`)
          // );

          code.push(
              Opcodes.get_local,
              ...p,

              Opcodes.i32_const,
              ...unsignedLEB128(op.argument),

              Opcodes.i32_add,

              Opcodes.set_local,
              ...p,
          );

          break;
        }

        case OpKind.DEC_PTR: {
          // code.push(
          //   encode(`${dataptr} -= ${op.argument};\n`)
          // );

          code.push(
            Opcodes.get_local,
            ...p,

            Opcodes.i32_const,
            ...unsignedLEB128(op.argument),

            Opcodes.i32_sub,

            Opcodes.set_local,
            ...p,
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

        // Opcodes.i32_const,
        // ...signedLEB128(12), // address to store
  
        // Opcodes.i32_const,
        // ...signedLEB128(62), // value to stroe
  
        // Opcodes.i32_store8,
        // ...unsignedLEB128(0), // flag
        // ...signedLEB128(-5),   // offset - only unsigned

        case OpKind.INC_DATA: {
          if (offset < 0 || op.argument < 0) {
            debugger;
          }

          code.push(
            Opcodes.get_local,
            ...p,

            Opcodes.i32_const,
            ...signedLEB128(offset),

            Opcodes.i32_add,

            Opcodes.tee_local,
            ...p_offset,

            Opcodes.get_local,
            ...p_offset,

            Opcodes.i32_load8_u,
            ...unsignedLEB128(0),
            ...unsignedLEB128(0),

            Opcodes.i32_const,
            ...signedLEB128(op.argument),

            Opcodes.i32_add,

            Opcodes.i32_store8,
            ...unsignedLEB128(0),
            ...unsignedLEB128(0),
          );

          // code.push(
          //   encode(`${memoryName}[${dataptr} + ${offset}] += ${op.argument};\n`)
          // );

          break;
        }

        case OpKind.DEC_DATA: {
          // code.push(
          //   encode(`${memoryName}[${dataptr} + ${offset}] -= ${op.argument};\n`)
          // );

          if (offset < 0 || op.argument < 0) {
            debugger;
          }


          code.push(
            Opcodes.get_local,
            ...p,

            Opcodes.i32_const,
            ...signedLEB128(offset),

            Opcodes.i32_add,

            Opcodes.tee_local,
            ...p_offset,

            Opcodes.get_local,
            ...p_offset,

            Opcodes.i32_load8_u,
            ...unsignedLEB128(0),
            ...unsignedLEB128(0),

            Opcodes.i32_const,
            ...signedLEB128(op.argument),

            Opcodes.i32_sub,

            Opcodes.i32_store8,
            ...unsignedLEB128(0),
            ...unsignedLEB128(0),
          );

          break;
        }

        case OpKind.READ_STDIN: {
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

          code.push(
            Opcodes.get_local,
            ...p,

            Opcodes.i32_const,
            ...signedLEB128(offset),

            Opcodes.i32_add,

            Opcodes.i32_load8_u,
            ...unsignedLEB128(0),
            ...unsignedLEB128(0),

            Opcodes.call,
            ...unsignedLEB128(0),
          );

            break;
        }

        case OpKind.LOOP_SET_TO_ZERO: {
          // code.push(
          //   encode(`${memoryName}[${dataptr} + ${offset}] = 0;\n`)
          // );

          
          code.push(
            Opcodes.get_local,
            ...p,

            Opcodes.i32_const,
            ...signedLEB128(offset),

            Opcodes.i32_add,

            Opcodes.i32_const,
            ...unsignedLEB128(0),

            Opcodes.i32_store8,
            ...unsignedLEB128(0),
            ...unsignedLEB128(0),
          );

          break;
        }

        case OpKind.LOOP_MOVE_PTR: {
          // code.push(
          //   encode(
          //     `while (${memoryName}[${dataptr} + ${offset}]) {\n` +
          //       `${dataptr} += ${op.argument};\n}\n`
          //     )
          // );

          code.push(
            Opcodes.block,
            Valtype.void,
            Opcodes.loop,
            Valtype.void,

            Opcodes.get_local,
            ...p,

            Opcodes.i32_const,
            ...signedLEB128(offset),

            Opcodes.i32_add,

            Opcodes.tee_local,
            ...p_offset,

            Opcodes.i32_load8_u,
            ...unsignedLEB128(0),
            ...unsignedLEB128(0),

            Opcodes.i32_eqz,

            Opcodes.br_if,
            ...unsignedLEB128(1),

            Opcodes.get_local,
            ...p,

            Opcodes.i32_const,
            ...signedLEB128(op.argument),

            Opcodes.i32_add,

            Opcodes.set_local,
            ...p,

            Opcodes.br,
            ...unsignedLEB128(0),

            Opcodes.end,
            Opcodes.end,
          );

          break;
        }
        case OpKind.LOOP_MOVE_DATA: {
          // code.push(
          //   encode(
          //     `${memoryName}[${dataptr} + ${offset + op.argument}] += ${memoryName}[${dataptr} + ${offset}];\n` +
          //     `${memoryName}[${dataptr} + ${offset}] = 0;\n`
          //   )
          // );

          // if (op.argument === -36) {
          //   debugger;
          // }

          // TODO check address
          code.push(


            // OK
            Opcodes.get_local,
            ...p,

            Opcodes.i32_const,
            ...signedLEB128(offset),

            Opcodes.i32_add,

            Opcodes.tee_local,
            ...p_offset,
            // OK


            Opcodes.i32_load8_u,
            ...unsignedLEB128(0),
            ...unsignedLEB128(0),


            Opcodes.i32_const,
            ...unsignedLEB128(0),

            Opcodes.i32_gt_u,

            Opcodes.if,
            Valtype.void,

            Opcodes.get_local,
            ...p_offset,

            // stack :
            // 0: | data + offset |

            Opcodes.i32_const,
            ...signedLEB128(op.argument),

            Opcodes.i32_add,

            // stack :
            // 0: | data + offset + op.argument |

            Opcodes.get_local,
            ...p_offset,

            Opcodes.i32_const,
            ...signedLEB128(op.argument),

            Opcodes.i32_add,

            // stack :
            // 0: | data + offset + op.argument |
            // 1: | data + offset + op.argument |

            Opcodes.i32_load8_u,
            ...unsignedLEB128(0),
            ...unsignedLEB128(0),

            // stack :
            // 0: | data + offset + op.argument |

            Opcodes.get_local,
            ...p_offset,

            // stack :
            // 0: | data + offset |
            // 1: | data + offset + op.argument |

            Opcodes.i32_load8_u,
            ...unsignedLEB128(0),
            ...unsignedLEB128(0),

            // stack :
            // 0: | data + offset + op.argument |

            Opcodes.i32_add,

            Opcodes.i32_store8,
            ...unsignedLEB128(0),
            ...unsignedLEB128(0),


            // OK
            // stack :

            Opcodes.get_local,
            ...p_offset,

            // stack :
            // 0: | data + offset |

            Opcodes.i32_const,
            ...signedLEB128(0),

            Opcodes.i32_store8,
            ...unsignedLEB128(0),
            ...unsignedLEB128(0),

            Opcodes.end,
          );

          break;
        }

        case OpKind.JUMP_IF_DATA_ZERO: {

          code.push(
            Opcodes.block,
            Valtype.void,
            Opcodes.loop,
            Valtype.void,

            Opcodes.get_local,
            ...p,

            Opcodes.i32_const,
            ...signedLEB128(offset),

            Opcodes.i32_add,

            Opcodes.i32_load8_u,
            ...unsignedLEB128(0),
            ...unsignedLEB128(0),

            Opcodes.i32_eqz,

            Opcodes.br_if,
            ...unsignedLEB128(1),
          );
          
          // code.push(
            //   encode(`while (${memoryName}[${dataptr} + ${offset}]) {\n`)
            // );

          offset_stack.push(offset);

          break;
        }

        case OpKind.JUMP_IF_DATA_NOT_ZERO: {
          // code.push(
          //   encode(`}\n`)
          // );

          code.push(
            Opcodes.br,
            // ...unsignedLEB128(offset_stack.length),
            ...unsignedLEB128(0),
            Opcodes.end,
            Opcodes.end,
          );


          offset = offset_stack.pop();

          break;
        }

        case OpKind.RESET_DATA_RANGE: {
          // for (let i = 1; i < op.argument + 1; i++) {
          //   code.push(
          //     encode(`${memoryName}[${dataptr} + ${offset + i}] = `)
          //   );
          // }

          // code.push(
          //   encode(`${0};\n`)
          // );

          code.push(
            Opcodes.get_local,
            ...p,

            Opcodes.i32_const,
            ...signedLEB128(offset),

            Opcodes.i32_add,

            Opcodes.set_local,
            ...p_offset,
          );


        for (let i = 1; i < op.argument + 1; i++) {
            code.push(
              Opcodes.get_local,
              ...p_offset,

              Opcodes.i32_const,
              ...unsignedLEB128(i),

              Opcodes.i32_add,

              Opcodes.tee_local,
              ...p_offset,

              Opcodes.i32_const,
              ...unsignedLEB128(0),

              Opcodes.i32_store8,
              ...unsignedLEB128(0),
              ...unsignedLEB128(0),
            );
          }

          break;
        }

        case OpKind.SET_DATA: {
          // code.push(
          //   encode(`${memoryName}[${dataptr} + ${offset}] = ${op.argument};\n`)
          // );


          code.push(
            Opcodes.get_local,
            ...p,

            Opcodes.i32_const,
            ...signedLEB128(offset),

            Opcodes.i32_add,

            Opcodes.i32_const,
            ...unsignedLEB128(op.argument),

            Opcodes.i32_store8,
            ...unsignedLEB128(0),
            ...unsignedLEB128(0),
          );

          break;
        }

        case OpKind.DATA_LOOP: {
          loop_data_offset = offset;
          loop_data_offsets.push(loop_data_offset);

          code.push(
            Opcodes.get_local,
            ...p,

            Opcodes.i32_const,
            ...signedLEB128(offset),

            Opcodes.i32_add,

            Opcodes.i32_load8_u,
            ...unsignedLEB128(0),
            ...unsignedLEB128(0),

            Opcodes.i32_const,
            ...unsignedLEB128(0),

            Opcodes.i32_gt_u,

            Opcodes.if,
            Valtype.void,
          );

          // code.push(
          //   encode(`if (${memoryName}[${dataptr} + ${loop_data_offset}]) {\n`)
          // );

          break;
        }

        case OpKind.DATA_LOOP_END: {
          // code.push(
          //   encode(
          //     `${memoryName}[${dataptr} + ${loop_data_offset}] = 0;\n` +
          //     `}\n`
          //   )
          // );
          code.push(
            Opcodes.get_local,
            ...p,

            Opcodes.i32_const,
            ...signedLEB128(loop_data_offset),

            Opcodes.i32_add,

            Opcodes.i32_const,
            ...signedLEB128(0),

            Opcodes.i32_store8,
            ...unsignedLEB128(0),
            ...unsignedLEB128(0),

            Opcodes.end,
          );

          offset = loop_data_offsets.pop();
          loop_data_offset = loop_data_offsets[loop_data_offsets.length - 1];

          break;
        }

        case OpKind.DATA_LOOP_ADD: {
          // if (op.argument === 1) {
          //   code.push(
          //     encode(`${memoryName}[${dataptr} + ${offset}] += ${memoryName}[${dataptr} + ${loop_data_offset}];\n`)
          //   );
          // } else {
          //   code.push(
          //     encode(`${memoryName}[${dataptr} + ${offset}] += ${memoryName}[${dataptr} + ${loop_data_offset}] * ${op.argument};\n`)
          //   );
          // }
          if (op.argument === 1) {
            code.push(
              Opcodes.get_local,
              ...p,

              Opcodes.i32_const,
              ...signedLEB128(offset),

              Opcodes.i32_add,

              Opcodes.tee_local,
              ...p_offset,

              Opcodes.get_local,
              ...p_offset,

              Opcodes.i32_load8_u,
              ...unsignedLEB128(0),
              ...unsignedLEB128(0),

              Opcodes.get_local,
              ...p,

              Opcodes.i32_const,
              ...signedLEB128(loop_data_offset),

              Opcodes.i32_add,

              Opcodes.i32_load8_u,
              ...unsignedLEB128(0),
              ...unsignedLEB128(0),

              Opcodes.i32_add,

              Opcodes.i32_store8,
              ...unsignedLEB128(0),
              ...unsignedLEB128(0),
            );
          } else {
            code.push(
              Opcodes.get_local,
              ...p,

              Opcodes.i32_const,
              ...signedLEB128(offset),

              Opcodes.i32_add,

              Opcodes.tee_local,
              ...p_offset,

              Opcodes.get_local,
              ...p_offset,

              Opcodes.i32_load8_u,
              ...unsignedLEB128(0),
              ...unsignedLEB128(0),

              Opcodes.get_local,
              ...p,

              Opcodes.i32_const,
              ...signedLEB128(loop_data_offset),

              Opcodes.i32_add,

              Opcodes.i32_load8_u,
              ...unsignedLEB128(0),
              ...unsignedLEB128(0),

              Opcodes.i32_const,
              ...signedLEB128(op.argument),

              Opcodes.i32_mul,

              Opcodes.i32_add,

              Opcodes.i32_store8,
              ...unsignedLEB128(0),
              ...unsignedLEB128(0),
            );
          }

          break;
        }

        case OpKind.DATA_LOOP_SUB: {
          // if (op.argument === 1) {
          //   code.push(
          //     encode(`${memoryName}[${dataptr} + ${offset}] -= ${memoryName}[${dataptr} + ${loop_data_offset}];\n`)
          //   );
          // } else {
          //   code.push(
          //     encode(`${memoryName}[${dataptr} + ${offset}] -= ${memoryName}[${dataptr} + ${loop_data_offset}] * ${op.argument};\n`)
          //   );
          // }
          if (op.argument === 1) {
            code.push(
              Opcodes.get_local,
              ...p,

              Opcodes.i32_const,
              ...signedLEB128(offset),

              Opcodes.i32_add,

              Opcodes.tee_local,
              ...p_offset,

              Opcodes.get_local,
              ...p_offset,

              Opcodes.i32_load8_u,
              ...unsignedLEB128(0),
              ...unsignedLEB128(0),

              Opcodes.get_local,
              ...p,

              Opcodes.i32_const,
              ...signedLEB128(loop_data_offset),

              Opcodes.i32_add,

              Opcodes.i32_load8_u,
              ...unsignedLEB128(0),
              ...unsignedLEB128(0),

              Opcodes.i32_sub,

              Opcodes.i32_store8,
              ...unsignedLEB128(0),
              ...unsignedLEB128(0),
            );
          } else {
            code.push(
              Opcodes.get_local,
              ...p,

              Opcodes.i32_const,
              ...signedLEB128(offset),

              Opcodes.i32_add,

              Opcodes.tee_local,
              ...p_offset,

              Opcodes.get_local,
              ...p_offset,

              Opcodes.i32_load8_u,
              ...unsignedLEB128(0),
              ...unsignedLEB128(0),

              Opcodes.get_local,
              ...p,

              Opcodes.i32_const,
              ...signedLEB128(loop_data_offset),

              Opcodes.i32_add,

              Opcodes.i32_load8_u,
              ...unsignedLEB128(0),
              ...unsignedLEB128(0),

              Opcodes.i32_const,
              ...signedLEB128(op.argument),

              Opcodes.i32_mul,

              Opcodes.i32_sub,

              Opcodes.i32_store8,
              ...unsignedLEB128(0),
              ...unsignedLEB128(0),
            );
          }

          break;
        }

        // default: { console.warn(`bad char ' ${opKindToChar(op.kind)} ' at pc=${pc}`); }
      }
  
      pc++;
    }

  // console.log('code', code);
  // const string = txd.decode(Uint8Array.from(code.flat()));
  const wasm = emitter(code);

  // console.log('wasm', wasm);

  const memory = new WebAssembly.Memory({ initial: 1 });

  const instance = WebAssembly.instantiate(wasm, {
    env: {
      // inF,
      print: outF,
      memory
    }
  });

  return instance.then(module => ({
    module,
    memory,
  }));
}

const compile = compile_prod;

export { compile };


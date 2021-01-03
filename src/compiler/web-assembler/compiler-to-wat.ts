import { OpKind } from 'ir/opcode-kinds';
import { Opcode } from 'ir/opcode';
import { opKindToChar } from 'ir/utils';
import { CompiledModule, InputFunction, OutputFunction } from 'types/compiler';
import { emitter, Valtype, Opcodes } from './emitter';
import { unsignedLEB128, signedLEB128 } from './encoding';
import { TextCoder } from 'utils/text-coder';
import { Ast, Nodes, ParseSymbol } from 'ir/ast/ast';

export function compileToWat(ops: Ast): string {
  // coder.encode(
  //   `(module\n`
  // );

  // coder.encode(
  //   `(import "env" "print" (func $print (param i32)))\n`
  // );
  // coder.encode(
  //   `(import "env" "memory" (memory 1))\n`
  // );
  // coder.encode(
  //   `(func $run (local $p i32) (local $p_offset i32) (local $p_cached i32)\n`
  // );

  // let pc = 0;
  // while (pc < ops.length) {
  //   const op = ops[pc];

  //   switch (op.kind) {
  //     case OpKind.INC_PTR: {
  //       coder.encode(
  //         `local.get $p\n` +
  //         `i32.const ${op.argument}\n` +
  //         `i32.add\n` +
  //         `local.set $p\n`
  //       );

  //       break;
  //     }

  //     case OpKind.DEC_PTR: {
  //       coder.encode(
  //         `local.get $p\n` +
  //         `i32.const ${op.argument}\n` +
  //         `i32.sub\n` +
  //         `local.set $p\n`
  //       );

  //       break;
  //     }

  //     case OpKind.INC_OFFSET: {
  //       offset += op.argument;

  //       break;
  //     }

  //     case OpKind.DEC_OFFSET: {
  //       offset -= op.argument;

  //       break;
  //     }

  //     case OpKind.INC_DATA: {
  //       coder.encode(
  //         `local.get $p\n` +
  //         `i32.const ${offset}\n` +
  //         `i32.add\n` +
  //         `local.tee $p_offset\n` +
  //         `local.get $p_offset\n` +
  //         `i32.load8_u\n` +
  //         `i32.const ${op.argument}\n` +
  //         `i32.add\n` +
  //         `i32.store8\n`
  //       );

  //       break;
  //     }

  //     case OpKind.DEC_DATA: {
  //       coder.encode(
  //         `local.get $p\n` +
  //         `i32.const ${offset}\n` +
  //         `i32.add\n` +
  //         `local.tee $p_offset\n` +
  //         `local.get $p_offset\n` +
  //         `i32.load8_u\n` +
  //         `i32.const ${op.argument}\n` +
  //         `i32.sub\n` +
  //         `i32.store8\n`
  //       );

  //       break;
  //     }

  //     case OpKind.READ_STDIN: {
  //       // TO_DO add read char
  //       // code.push(
  //       //   encode(`for (let i = 0; i < ${op.argument}; i++) ${memoryName}[${dataptr} + ${offset}] = ${inF}();\n`)
  //       // );

  //       break;
  //     }

  //     case OpKind.WRITE_STDOUT: {
  //       // TO_DO add loop for out
  //       coder.encode(
  //         `local.get $p\n` +
  //         `i32.const ${offset}\n` +
  //         `i32.add\n` +
  //         `i32.load8_u\n` +
  //         `call $print\n`
  //       );

  //       break;
  //     }

  //     case OpKind.LOOP_SET_TO_ZERO: {
  //       // TODO: check store
  //       coder.encode(
  //         `local.get $p\n` +
  //         `i32.const ${offset}\n` +
  //         `i32.add\n` +
  //         `i32.const 0\n` +
  //         `i32.store8\n`
  //       );

  //       break;
  //     }

  //     case OpKind.LOOP_MOVE_PTR: {
  //       coder.encode(
  //         `block\n` +
  //         `loop\n` +
  //         `local.get $p\n` +
  //         `i32.const ${offset}\n` +
  //         `i32.add\n` +
  //         `local.tee $p_offset\n` +
  //         `i32.load8_u\n` +
  //         `i32.eqz\n` +
  //         `br_if 1\n` +
  //         `local.get $p\n` +
  //         `i32.const ${op.argument}\n` +
  //         `i32.add\n` +
  //         `local.set $p\n` +
  //         `br 0\n` +
  //         `end\n` +
  //         `end\n`
  //       );

  //       break;
  //     }

  //     case OpKind.LOOP_MOVE_DATA: {
  //       // TODO can result in invalid memory access
  //       coder.encode(
  //         `local.get $p\n` +
  //         `i32.const ${offset}\n` +
  //         `i32.add\n` +
  //         `local.tee $p_offset\n` +
  //         `i32.load8_u\n` +
  //         `i32.const 0\n` +
  //         `i32.gt_u\n` +
  //         `if\n` +
  //         `local.get $p_offset\n` +

  //         // stack :
  //         // 0: | data + offset |

  //         `i32.const ${op.argument}\n` +
  //         `i32.add\n` +

  //         // stack :
  //         // 0: | data + offset + op.argument |

  //         `local.get $p_offset\n` +
  //         `i32.const ${op.argument}\n` +
  //         `i32.add\n` +

  //         // stack :
  //         // 0: | data + offset + op.argument |
  //         // 1: | data + offset + op.argument |

  //         `i32.load8_u\n` +

  //         // stack :
  //         // 0: | data + offset + op.argument |

  //         `local.get $p_offset\n` +

  //         // stack :
  //         // 0: | data + offset |
  //         // 1: | data + offset + op.argument |

  //         `i32.load8_u\n` +

  //         // stack :
  //         // 0: | data + offset + op.argument |

  //         `i32.add\n` +
  //         `i32.store8\n` +

  //         // stack :

  //         `local.get $p_offset\n` +

  //         // stack :
  //         // 0: | data + offset |

  //         `i32.const 0\n` +
  //         `i32.store8\n` +
  //         `end\n`
  //       );

  //       break;
  //     }

  //     case OpKind.JUMP_IF_DATA_ZERO: {
  //       coder.encode(
  //         `block\n` +
  //         `loop\n` +
  //         `local.get $p\n` +
  //         `i32.const ${offset}\n` +
  //         `i32.add\n` +
  //         `i32.load8_u\n` +
  //         `i32.eqz\n` +
  //         `br_if 1\n`
  //       );

  //       offset_stack.push(offset);

  //       break;
  //     }

  //     case OpKind.JUMP_IF_DATA_NOT_ZERO: {
  //       coder.encode(
  //         `br 0\n` +
  //         `end\n` +
  //         `end\n`
  //       );

  //       offset = offset_stack.pop();

  //       break;
  //     }

  //     case OpKind.RESET_DATA_RANGE: {
  //       coder.encode(
  //         `local.get $p\n` +
  //         `i32.const ${offset}\n` +
  //         `i32.add\n` +
  //         `local.set $p_offset\n`
  //       );

  //       for (let i = 1; i < op.argument + 1; i++) {
  //         coder.encode(
  //           `local.get $p_offset\n` +
  //           `i32.const ${i}\n` +
  //           `i32.add\n` +
  //           `local.tee $p_offset\n` +
  //           `i32.const 0\n` +
  //           `i32.store8\n`
  //         );
  //       }

  //       break;
  //     }

  //     case OpKind.SET_DATA: {
  //       coder.encode(
  //         `local.get $p\n` +
  //         `i32.const ${offset}\n` +
  //         `i32.add\n` +
  //         `i32.const ${op.argument}\n` +
  //         `i32.store8\n`
  //       );

  //       break;
  //     }

  //     case OpKind.DATA_LOOP: {
  //       loop_data_offset = offset;
  //       loop_data_offsets.push(loop_data_offset);

  //       coder.encode(
  //         `local.get $p\n` +
  //         `i32.const ${offset}\n` +
  //         `i32.add\n` +
  //         `i32.load8_u\n` +
  //         `i32.const 0\n` +
  //         `i32.gt_u\n` +
  //         `if\n`
  //       );

  //       break;
  //     }

  //     case OpKind.DATA_LOOP_END: {
  //       coder.encode(
  //         `local.get $p\n` +
  //         `i32.const ${loop_data_offset}\n` +
  //         `i32.add\n` +
  //         `i32.const 0\n` +
  //         `i32.store8\n` +
  //         `end\n`
  //       );

  //       offset = loop_data_offsets.pop();
  //       loop_data_offset = loop_data_offsets[loop_data_offsets.length - 1];

  //       break;
  //     }

  //     case OpKind.DATA_LOOP_ADD: {
  //       if (op.argument === 1) {
  //         coder.encode(
  //           `local.get $p\n` +
  //           `i32.const ${offset}\n` +
  //           `i32.add\n` +
  //           `local.tee $p_offset\n` +
  //           `local.get $p_offset\n` +
  //           `i32.load8_u\n` +
  //           `local.get $p\n` +
  //           `i32.const ${loop_data_offset}\n` +
  //           `i32.add\n` +
  //           `i32.load8_u\n` +
  //           `i32.add\n` +
  //           `i32.store8\n`
  //         );
  //       } else {
  //         coder.encode(
  //           `local.get $p\n` +
  //           `i32.const ${offset}\n` +
  //           `i32.add\n` +
  //           `local.tee $p_offset\n` +
  //           `local.get $p_offset\n` +
  //           `i32.load8_u\n` +
  //           `local.get $p\n` +
  //           `i32.const ${loop_data_offset}\n` +
  //           `i32.add\n` +
  //           `i32.load8_u\n` +
  //           `i32.const ${op.argument}\n` +
  //           `i32.mul\n` +
  //           `i32.add\n` +
  //           `i32.store8\n`
  //         );
  //       }

  //       break;
  //     }

  //     case OpKind.DATA_LOOP_SUB: {
  //       if (op.argument === 1) {
  //         coder.encode(
  //           `local.get $p\n` +
  //           `i32.const ${offset}\n` +
  //           `i32.add\n` +
  //           `local.tee $p_offset\n` +
  //           `local.get $p_offset\n` +
  //           `i32.load8_u\n` +
  //           `local.get $p\n` +
  //           `i32.const ${loop_data_offset}\n` +
  //           `i32.add\n` +
  //           `i32.load8_u\n` +
  //           `i32.sub\n` +
  //           `i32.store8\n`
  //         );
  //       } else {
  //         coder.encode(
  //           `local.get $p\n` +
  //           `i32.const ${offset}\n` +
  //           `i32.add\n` +
  //           `local.tee $p_offset\n` +
  //           `local.get $p_offset\n` +
  //           `i32.load8_u\n` +
  //           `local.get $p\n` +
  //           `i32.const ${loop_data_offset}\n` +
  //           `i32.add\n` +
  //           `i32.load8_u\n` +
  //           `i32.const ${op.argument}\n` +
  //           `i32.mul\n` +
  //           `i32.sub\n` +
  //           `i32.store8\n`
  //         );
  //       }

  //       break;
  //     }

  //     case OpKind.STORE_DATAPTR: {
  //       coder.encode(
  //         `local.get $p\n` +
  //         `local.set $p_cached\n`
  //       );

  //       break;
  //     }

  //     case OpKind.GET_DATAPTR: {
  //       coder.encode(
  //         `local.get $p_cached\n` +
  //         `local.set $p\n`
  //       );

  //       break;
  //     }

  //     default: { console.warn(`bad char ' ${opKindToChar(op.kind)} ' at pc=${pc}`); }
  //   }

  //   pc++;
  // }

  // coder.encode(
  //   `)\n` // end func
  // );

  // coder.encode(`(export "run" (func $run))\n`);

  // coder.encode(
  //   `)` // end module
  // );

  let coder = new TextCoder();
  const code: Array<number> = [];
  const offset_stack = [];
  let offset = 0;
  let loop_data_offset = 0;
  let loop_data_offsets = [];
  const offset_move_start_stack: Array<number> = [];
  const p = unsignedLEB128(0);
  const p_offset = unsignedLEB128(1);
  const loop_local = unsignedLEB128(2);

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
    `(func $run (local $p i32) (local $p_offset i32) (local $loop_local i32)\n`
  );

  function travers(ast: Ast) {
    ast.body.forEach((op: Nodes) => {
      if (op.type === ParseSymbol.ExpressionStatement) {
        switch (op.opkode) {
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

            break;
          }

          case OpKind.READ_STDIN: {

            break;
          }

          case OpKind.WRITE_STDOUT: {
            // if (op.argument > 1) {
            // code.push(
            //   Opcodes.i32_const,
            //   ...unsignedLEB128(op.argument),

            //   Opcodes.set_local,
            //   ...loop_local,

            //   Opcodes.block,
            //   Valtype.void,
            //   Opcodes.loop,
            //   Valtype.void,

            //   Opcodes.get_local,
            //   ...loop_local,

            //   Opcodes.i32_eqz,

            //   Opcodes.br_if,
            //   ...unsignedLEB128(1),

            //   // loop update
            //   Opcodes.get_local,
            //   ...loop_local,

            //   Opcodes.i32_const,
            //   ...unsignedLEB128(1),

            //   Opcodes.i32_sub,

            //   Opcodes.set_local,
            //   ...loop_local,
            //   // loop end update

            //   // loop body
            //   Opcodes.get_local,
            //   ...p,

            //   Opcodes.i32_const,
            //   ...signedLEB128(offset),

            //   Opcodes.i32_add,

            //   Opcodes.i32_load8_u,
            //   ...unsignedLEB128(0),
            //   ...unsignedLEB128(0),

            //   Opcodes.call,
            //   ...unsignedLEB128(0),
            //   // loop end body

            //   Opcodes.br,
            //   ...unsignedLEB128(0),
            //   Opcodes.end,
            //   Opcodes.end,
            // );
            // } else {
            coder.encode(
              `local.get $p\n` +
              `i32.const ${offset}\n` +
              `i32.add\n` +
              `i32.load8_u\n` +
              `call $print\n`
            );
            // }

            break;
          }

          case OpKind.LOOP_SET_TO_ZERO: {
            // code.push(
            //   Opcodes.get_local,
            //   ...p,

            //   Opcodes.i32_const,
            //   ...signedLEB128(offset),

            //   Opcodes.i32_add,

            //   Opcodes.i32_const,
            //   ...unsignedLEB128(0),

            //   Opcodes.i32_store8,
            //   ...unsignedLEB128(0),
            //   ...unsignedLEB128(0),
            // );

            break;
          }

          case OpKind.MUL_INC_DATA: {
            if (op.argument === 1) {
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

              //   Opcodes.get_local,
              //   ...p,

              //   Opcodes.i32_const,
              //   ...signedLEB128(offset_move_start_stack[offset_move_start_stack.length - 1]),

              //   Opcodes.i32_add,

              //   Opcodes.i32_load8_u,
              //   ...unsignedLEB128(0),
              //   ...unsignedLEB128(0),

              //   Opcodes.i32_add,

              //   Opcodes.i32_store8,
              //   ...unsignedLEB128(0),
              //   ...unsignedLEB128(0),
              // );
            } else {
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

              //   Opcodes.get_local,
              //   ...p,

              //   Opcodes.i32_const,
              //   ...signedLEB128(offset_move_start_stack[offset_move_start_stack.length - 1]),

              //   Opcodes.i32_add,

              //   Opcodes.i32_load8_u,
              //   ...unsignedLEB128(0),
              //   ...unsignedLEB128(0),

              //   Opcodes.i32_const,
              //   ...signedLEB128(op.argument),

              //   Opcodes.i32_mul,

              //   Opcodes.i32_add,

              //   Opcodes.i32_store8,
              //   ...unsignedLEB128(0),
              //   ...unsignedLEB128(0),
              // );
            }

            break;
          }

          case OpKind.MUL_DEC_DATA: {
            if (op.argument === 1) {
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

              //   Opcodes.get_local,
              //   ...p,

              //   Opcodes.i32_const,
              //   ...signedLEB128(offset_move_start_stack[offset_move_start_stack.length - 1]),

              //   Opcodes.i32_add,

              //   Opcodes.i32_load8_u,
              //   ...unsignedLEB128(0),
              //   ...unsignedLEB128(0),

              //   Opcodes.i32_sub,

              //   Opcodes.i32_store8,
              //   ...unsignedLEB128(0),
              //   ...unsignedLEB128(0),
              // );
            } else {
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

              //   Opcodes.get_local,
              //   ...p,

              //   Opcodes.i32_const,
              //   ...signedLEB128(offset_move_start_stack[offset_move_start_stack.length - 1]),

              //   Opcodes.i32_add,

              //   Opcodes.i32_load8_u,
              //   ...unsignedLEB128(0),
              //   ...unsignedLEB128(0),

              //   Opcodes.i32_const,
              //   ...signedLEB128(op.argument),

              //   Opcodes.i32_mul,

              //   Opcodes.i32_sub,

              //   Opcodes.i32_store8,
              //   ...unsignedLEB128(0),
              //   ...unsignedLEB128(0),
              // );
            }

            break;
          }

          case OpKind.SET_DATA: {
            // code.push(
            //   Opcodes.get_local,
            //   ...p,

            //   Opcodes.i32_const,
            //   ...signedLEB128(offset),

            //   Opcodes.i32_add,

            //   Opcodes.i32_const,
            //   ...unsignedLEB128(op.argument),

            //   Opcodes.i32_store8,
            //   ...unsignedLEB128(0),
            //   ...unsignedLEB128(0),
            // );

            break;
          }

          case OpKind.SEARCH_LOOP: {
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

            //   Opcodes.i32_load8_u,
            //   ...unsignedLEB128(0),
            //   ...unsignedLEB128(0),

            //   Opcodes.i32_eqz,

            //   Opcodes.br_if,
            //   ...unsignedLEB128(1),

            //   // loop body

            //   Opcodes.get_local,
            //   ...p,

            //   Opcodes.i32_const,
            //   ...unsignedLEB128(Math.abs(op.argument)),

            //   op.argument > 0 ? Opcodes.i32_add : Opcodes.i32_sub,

            //   Opcodes.set_local,
            //   ...p,

            //   // loop end
            //   Opcodes.br,
            //   ...unsignedLEB128(0),

            //   Opcodes.end,
            //   Opcodes.end,
            // );

            break;
          }
        }
      } else {
        if (op.opkode === OpKind.LOOP_MOVE_DATA) {
          // code.push(
          //   Opcodes.get_local,
          //   ...p,

          //   Opcodes.i32_const,
          //   ...signedLEB128(offset),

          //   Opcodes.i32_add,

          //   Opcodes.i32_load8_u,
          //   ...unsignedLEB128(0),
          //   ...unsignedLEB128(0),

          //   Opcodes.i32_const,
          //   ...unsignedLEB128(0),

          //   Opcodes.i32_gt_u,

          //   Opcodes.if,
          //   Valtype.void,
          // );
          offset_move_start_stack.push(offset);

          travers(op);

          // code.push(
          //   Opcodes.get_local,
          //   ...p,

          //   Opcodes.i32_const,
          //   ...signedLEB128(offset_move_start_stack[offset_move_start_stack.length - 1]),

          //   Opcodes.i32_add,

          //   Opcodes.i32_const,
          //   ...signedLEB128(0),

          //   Opcodes.i32_store8,
          //   ...unsignedLEB128(0),
          //   ...unsignedLEB128(0),

          //   Opcodes.end,
          // );

          offset_move_start_stack.pop();
        } else {
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

          travers(op);

          coder.encode(
            `br 0\n` +
            `end\n` +
            `end\n`
          );
        }
      }
    });
  }

  travers(ops);

  coder.encode(
    `)\n` // end func
  );

  coder.encode(`(export "run" (func $run))\n`);

  coder.encode(
    `)` // end module
  );

  const text = coder.decode();

  return text;
}

import { OpKind } from 'ir/opcode-kinds';
import { TextCoder } from 'utils/text-coder';
import { Ast, Nodes, ParseSymbol } from 'ir/ast/ast';

export function compileToWat(ops: Ast): string {
  let coder = new TextCoder();
  let offset = 0;
  const offset_move_start_stack: Array<number> = [];

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

          case OpKind.MUL_INC_DATA: {
            if (op.argument === 1) {
              coder.encode(
                `local.get $p\n` +
                `i32.const ${offset}\n` +
                `i32.add\n` +
                `local.tee $p_offset\n` +
                `local.get $p_offset\n` +
                `i32.load8_u\n` +
                `local.get $p\n` +
                `i32.const ${offset_move_start_stack[offset_move_start_stack.length - 1]}\n` +
                `i32.add\n` +
                `i32.load8_u\n` +
                `i32.add\n` +
                `i32.store8\n`
              );
            } else {
              coder.encode(
                `local.get $p\n` +
                `i32.const ${offset}\n` +
                `i32.add\n` +
                `local.tee $p_offset\n` +
                `local.get $p_offset\n` +
                `i32.load8_u\n` +
                `local.get $p\n` +
                `i32.const ${offset_move_start_stack[offset_move_start_stack.length - 1]}\n` +
                `i32.add\n` +
                `i32.load8_u\n` +
                `i32.const ${op.argument}\n` +
                `i32.mul\n` +
                `i32.add\n` +
                `i32.store8\n`
              );
            }

            break;
          }

          case OpKind.MUL_DEC_DATA: {
            if (op.argument === 1) {
              coder.encode(
                `local.get $p\n` +
                `i32.const ${offset}\n` +
                `i32.add\n` +
                `local.tee $p_offset\n` +
                `local.get $p_offset\n` +
                `i32.load8_u\n` +
                `local.get $p\n` +
                `i32.const ${offset_move_start_stack[offset_move_start_stack.length - 1]}\n` +
                `i32.add\n` +
                `i32.load8_u\n` +
                `i32.sub\n` +
                `i32.store8\n`
              );
            } else {
              coder.encode(
                `local.get $p\n` +
                `i32.const ${offset}\n` +
                `i32.add\n` +
                `local.tee $p_offset\n` +
                `local.get $p_offset\n` +
                `i32.load8_u\n` +
                `local.get $p\n` +
                `i32.const ${offset_move_start_stack[offset_move_start_stack.length - 1]}\n` +
                `i32.add\n` +
                `i32.load8_u\n` +
                `i32.const ${op.argument}\n` +
                `i32.mul\n` +
                `i32.sub\n` +
                `i32.store8\n`
              );
            }

            break;
          }

          case OpKind.SET_DATA: {
            coder.encode(
              `local.get $p\n` +
              `i32.const ${offset}\n` +
              `i32.add\n` +
              `i32.const ${op.argument}\n` +
              `i32.store8\n`
            );

            break;
          }

          case OpKind.SEARCH_LOOP: {
            coder.encode(
              `block\n` +
              `loop\n` +
              `local.get $p\n` +
              `i32.const ${offset}\n` +
              `i32.add\n` +
              `i32.load8_u\n` +
              `i32.eqz\n` +
              `br_if 1\n` +
              `local.get $p\n` +
              `i32.const ${Math.abs(op.argument)}\n` +
              (op.argument > 0 ? `i32.add\n` : `i32.sub\n`) +
              `local.set $p\n` +
              `br 0\n` +
              `end\n` +
              `end\n`
            );

            break;
          }
        }
      } else {
        if (op.opkode === OpKind.LOOP_MOVE_DATA) {
          coder.encode(
            `local.get $p\n` +
            `i32.const ${offset}\n` +
            `i32.add\n` +
            `i32.load8_u\n` +
            `i32.const 0\n` +
            `i32.gt_u\n` +
            `if\n`
          );

          offset_move_start_stack.push(offset);

          travers(op);

          coder.encode(
            `local.get $p\n` +
            `i32.const ${offset_move_start_stack[offset_move_start_stack.length - 1]}\n` +
            `i32.add\n` +
            `i32.const 0\n` +
            `i32.store8\n` +
            `end\n`
          );

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

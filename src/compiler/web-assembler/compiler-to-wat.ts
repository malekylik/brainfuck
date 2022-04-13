import { OpKind } from 'ir/opcode-kinds';
import { Ast, Nodes, ParseSymbol } from 'ir/ast/ast';
import { StringBuilder } from 'utils/string-builder';

export function compileToWat(ops: Ast): string {
  let coder = new StringBuilder();
  let offset = 0;
  const offset_move_start_stack: Array<number> = [];

  coder.append(
    `(module\n`
  );

  coder.append(
    `(import "env" "print" (func $print (param i32)))\n`
  );
  coder.append(
    `(import "env" "memory" (memory 1))\n`
  );
  coder.append(
    `(func $run (local $p i32) (local $p_offset i32) (local $loop_local i32)\n`
  );

  function travers(ast: Ast) {
    ast.body.forEach((op: Nodes) => {
      if (op.type === ParseSymbol.ExpressionStatement) {
        switch (op.opkode) {
          case OpKind.INC_PTR: {
            coder.append(
              `local.get $p\n` +
              `i32.const ${op.argument}\n` +
              `i32.add\n` +
              `local.set $p\n`
            );

            break;
          }

          case OpKind.DEC_PTR: {
            coder.append(
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
            coder.append(
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
            coder.append(
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
            if (op.argument > 1) {
              coder.append(
                `i32.const ${op.argument}\n` +
                `local.set $loop_local\n` +

                `block\n` +
                `loop\n` +
                `local.get $loop_local\n` +
                `i32.eqz\n` +
                `br_if 1\n` +

                `local.get $loop_local\n` +
                `i32.const 1\n` +
                `i32.sub\n` +
                `local.set $loop_local\n` +

                `local.get $p\n` +
                `i32.const ${offset}\n` +
                `i32.add\n` +
                `i32.load8_u\n` +
                `call $print\n` +

                `br 0\n` +
                `end\n` +
                `end\n`
              );
            } else {
              coder.append(
                `local.get $p\n` +
                `i32.const ${offset}\n` +
                `i32.add\n` +
                `i32.load8_u\n` +
                `call $print\n`
              );
            }

            break;
          }

          case OpKind.LOOP_SET_TO_ZERO: {
            // TODO: check store
            coder.append(
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
              coder.append(
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
              coder.append(
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
              coder.append(
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
              coder.append(
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
            coder.append(
              `local.get $p\n` +
              `i32.const ${offset}\n` +
              `i32.add\n` +
              `i32.const ${op.argument}\n` +
              `i32.store8\n`
            );

            break;
          }

          case OpKind.SEARCH_LOOP: {
            coder.append(
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
          coder.append(
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

          coder.append(
            `local.get $p\n` +
            `i32.const ${offset_move_start_stack[offset_move_start_stack.length - 1]}\n` +
            `i32.add\n` +
            `i32.const 0\n` +
            `i32.store8\n` +
            `end\n`
          );

          offset_move_start_stack.pop();
        } else {
          coder.append(
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

          coder.append(
            `br 0\n` +
            `end\n` +
            `end\n`
          );
        }
      }
    });
  }

  travers(ops);

  coder.append(
    `)\n` // end func
  );

  coder.append(`(export "run" (func $run))\n`);

  coder.append(
    `)` // end module
  );

  const text = coder.build();

  return text;
}

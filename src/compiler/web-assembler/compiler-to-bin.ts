import { OpKind } from 'ir/opcode-kinds';
import { emitter, Valtype, Opcodes } from './emitter';
import { unsignedLEB128, signedLEB128 } from './encoding';
import { Ast, Nodes, ParseSymbol } from 'ir/ast/ast';

export function compileFromOpcodeToWasm(ops: Ast) {
  const code: Array<number> = [];
  const offset_move_start_stack: Array<number> = [];
  let offset = 0;
  const p = unsignedLEB128(0);
  const p_offset = unsignedLEB128(1);
  const loop_local = unsignedLEB128(2);

  code.push(
    ...unsignedLEB128(1),
    ...unsignedLEB128(3), // 3 of int32
    Valtype.i32,
  );

  function travers(ast: Ast) {
    ast.body.forEach((op: Nodes) => {
      if (op.type === ParseSymbol.ExpressionStatement) {
        switch (op.opkode) {
          case OpKind.INC_PTR: {
            code.push(
              Opcodes.get_local,
              ...p,

              Opcodes.i32_const,
              ...signedLEB128(op.argument),

              Opcodes.i32_add,

              Opcodes.set_local,
              ...p,
            );

            break;
          }

          case OpKind.DEC_PTR: {
            code.push(
              Opcodes.get_local,
              ...p,

              Opcodes.i32_const,
              ...signedLEB128(op.argument),

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

          case OpKind.INC_DATA: {
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

            break;
          }

          case OpKind.DEC_DATA: {
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

            break;
          }

          case OpKind.WRITE_STDOUT: {
            if (op.argument > 1) {
              code.push(
                Opcodes.i32_const,
                ...unsignedLEB128(op.argument),

                Opcodes.set_local,
                ...loop_local,

                Opcodes.block,
                Valtype.void,
                Opcodes.loop,
                Valtype.void,

                Opcodes.get_local,
                ...loop_local,

                Opcodes.i32_eqz,

                Opcodes.br_if,
                ...unsignedLEB128(1),

                // loop update
                Opcodes.get_local,
                ...loop_local,

                Opcodes.i32_const,
                ...unsignedLEB128(1),

                Opcodes.i32_sub,

                Opcodes.set_local,
                ...loop_local,
                // loop end update

                // loop body
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
                // loop end body

                Opcodes.br,
                ...unsignedLEB128(0),
                Opcodes.end,
                Opcodes.end,
              );
            } else {
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
            }

            break;
          }

          case OpKind.LOOP_SET_TO_ZERO: {
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

          case OpKind.MUL_INC_DATA: {
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
                ...signedLEB128(offset_move_start_stack[offset_move_start_stack.length - 1]),

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
                ...signedLEB128(offset_move_start_stack[offset_move_start_stack.length - 1]),

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

          case OpKind.MUL_DEC_DATA: {
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
                ...signedLEB128(offset_move_start_stack[offset_move_start_stack.length - 1]),

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
                ...signedLEB128(offset_move_start_stack[offset_move_start_stack.length - 1]),

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

          case OpKind.SET_DATA: {
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

          case OpKind.SEARCH_LOOP: {
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

              // loop body

              Opcodes.get_local,
              ...p,

              Opcodes.i32_const,
              ...unsignedLEB128(Math.abs(op.argument)),

              op.argument > 0 ? Opcodes.i32_add : Opcodes.i32_sub,

              Opcodes.set_local,
              ...p,

              // loop end
              Opcodes.br,
              ...unsignedLEB128(0),

              Opcodes.end,
              Opcodes.end,
            );

            break;
          }
        }
      } else {
        if (op.opkode === OpKind.LOOP_MOVE_DATA) {
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
          offset_move_start_stack.push(offset);

          travers(op);

          code.push(
            Opcodes.get_local,
            ...p,

            Opcodes.i32_const,
            ...signedLEB128(offset_move_start_stack[offset_move_start_stack.length - 1]),

            Opcodes.i32_add,

            Opcodes.i32_const,
            ...signedLEB128(0),

            Opcodes.i32_store8,
            ...unsignedLEB128(0),
            ...unsignedLEB128(0),

            Opcodes.end,
          );

          offset_move_start_stack.pop();
        } else {
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

          travers(op);

          code.push(
            Opcodes.br,
            ...unsignedLEB128(0),
            Opcodes.end,
            Opcodes.end,
          );
        }
      }
    });
  }

  travers(ops);

  return emitter(code);
}

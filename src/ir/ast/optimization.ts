import { OpKind } from 'ir/opcode-kinds';
import { OptimizationKind } from 'ir/optimization-kinds';
import { Ast, LoopBlock, ParseSymbol, Nodes, MulExpression } from './ast';

function is_decrementing(n: Nodes): boolean {
  return (
    (n.opkode === OpKind.INC_DATA && n.argument < 0) ||
    (n.opkode === OpKind.DEC_DATA && n.argument > 0)
  );
}

function optimize_c1(ops: Ast): Ast {
  function optimize_loop_set_to_zero(ast: LoopBlock) {
    ast.body.forEach((n, i) => {
      if (n.type === ParseSymbol.BlockStatement) {
        // [-]
        if (n.body.length === 1 && is_decrementing(n.body[0])) {
          ast.body[i] = {
            type: ParseSymbol.ExpressionStatement,
            loc: ast.body[i].loc,
            operator: '^',
            argument: 0,
            opkode: OpKind.LOOP_SET_TO_ZERO,
          };
        } else {
          optimize_loop_set_to_zero(n);
        }
      }
    });
  }

  function optimize_set_data(ast: LoopBlock) {
    for (let i = 0; i < ast.body.length; i++) {
      const n = ast.body[i];

      if (n.type === ParseSymbol.BlockStatement) {
        optimize_set_data(n);
      } else {
        if (n.opkode === OpKind.LOOP_SET_TO_ZERO) {
          let update = 0;
          let end = i + 1;

          while (end < ast.body.length && (ast.body[end].opkode === OpKind.INC_DATA || ast.body[end].opkode === OpKind.INC_DATA)) {
            if (ast.body[end].opkode === OpKind.INC_DATA) {
              update += ast.body[end].argument;
            }

            if (ast.body[end].opkode === OpKind.DEC_DATA) {
              update -= ast.body[end].argument;
            }

            end += 1;
          }

          if (end - i > 1) {
            ast.body[i].opkode = OpKind.SET_DATA;
            ast.body[i].argument = update;
            ast.body[i].operator = '=';

            ast.body = ast.body.slice(0, i + 1).concat(ast.body.slice(end));
          }
        }
      }
    }
  }

  // c1_loop_optimizers
  {
    optimize_loop_set_to_zero(ops as LoopBlock);
  }

  // set_data
  {
    optimize_set_data(ops as LoopBlock);
  }

  return ops;
}

function optimize_c2(ops: Ast): Ast {
  function optimize_ptr_shift(ast: LoopBlock) {
    ast.body.forEach((n) => {
      if (n.type === ParseSymbol.BlockStatement) {
        optimize_ptr_shift(n);
      }

      if (n.opkode === OpKind.INC_PTR) {
        n.opkode = OpKind.INC_OFFSET;
      }

      if (n.opkode === OpKind.DEC_PTR) {
        n.opkode = OpKind.DEC_OFFSET;
      }
    });

    if (ast.search_by) {
      ast.body.push({
        type: ParseSymbol.ExpressionStatement,
        loc: { start: 0, end: 0, line: 0 },
        operator: '>',
        argument: -ast.search_by,
        opkode: OpKind.INC_OFFSET,
      });
      ast.body.push({
        type: ParseSymbol.ExpressionStatement,
        loc: { start: 0, end: 0, line: 0 },
        operator: '>',
        argument: ast.search_by,
        opkode: OpKind.INC_PTR,
      });
    }
  }

  function optimize_loop_copy(ast: LoopBlock) {
    ast.body.forEach((n) => {
      if (n.type === ParseSymbol.BlockStatement) {
        optimize_loop_copy(n);

        if (n.is_pure) {
          n.opkode = OpKind.LOOP_MOVE_DATA;
          let current_p = 0;
          n.body = n.body.filter(n => {
            if (n.opkode === OpKind.INC_PTR) {
              current_p += n.argument;
            }

            if (n.opkode === OpKind.DEC_PTR) {
              current_p -= n.argument;
            }

            return !(current_p === 0 && is_decrementing(n));
          });

          n.body.forEach((innerN) => {
            if (innerN.opkode === OpKind.INC_DATA) {
              innerN.opkode = OpKind.MUL_INC_DATA;
              (innerN as MulExpression).loop_divider = n.update_by;
            }

            if (innerN.opkode === OpKind.DEC_DATA) {
              innerN.opkode = OpKind.MUL_DEC_DATA;
              (innerN as MulExpression).loop_divider = n.update_by;
            }
          });

          n.body.push(
            {
              type: ParseSymbol.ExpressionStatement,
              loc: { line: 0, start: 0, end: 0 },
              operator: '^',
              argument: 0,
              opkode: OpKind.LOOP_SET_TO_ZERO,
            }
          );
        }
      }
    });
  }

  // optimize ptr shift in loops
  {
    // best performance together with optimize_ptr_shift otherwise need to be used addition variable which eats around 1s
    // current implementation without optimize_ptr_shift leads to error
    optimize_loop_copy(ops as LoopBlock);
    optimize_ptr_shift(ops as LoopBlock);
  }

  return ops;
}

export function optimize(ops: Ast, optimization_kind: OptimizationKind): Ast {
  if (optimization_kind === OptimizationKind.C0) {
    return ops;
  }

  if (OptimizationKind.C1 <= optimization_kind) {
    ops = optimize_c1(ops);
  }

  if (OptimizationKind.C2 <= optimization_kind) {
    ops = optimize_c2(ops);
  }

  return ops;
}

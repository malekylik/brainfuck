import { OptimizationKind } from './optimization-kinds';
import { parse_to_opcodes as parse_to_opcodes_base } from './base/translate_to_opcodes';
import { optimize } from './base/optimization';
import { path_jumptable } from './base/jumptable';
import { Ast, Nodes, ParseSymbol, parse_to_ast } from './ast/ast';
import { parse_to_opcodes as parse_to_opcodes_for_ast } from './ast/translate_to_opcodes';
import { optimize as optimize_ast } from './ast/optimization';
import { createOpcode, Opcode } from './opcode';
import { OpKind } from './opcode-kinds';

export function translate_program(tokens: Array<string>, optimization_kind: OptimizationKind): Array<Opcode> {
  let ops = parse_to_opcodes_base(tokens);

  ops = optimize(ops, optimization_kind);

  path_jumptable(ops);

  return ops;
}

export function translate_program_to_ast(tokens: Array<string>, optimization_kind: OptimizationKind): Ast {
  const ops = parse_to_opcodes_for_ast(tokens);
  let ast = parse_to_ast(ops);

  ast = optimize_ast(ast, optimization_kind);

  return ast;
}

export function translate_ast_to_opcodes(ast: Ast): Array<Opcode> {
  const ops: Array<Opcode> = [];
  const loop_start_stack: Array<number> = [];

  function travers(ast: Ast) {
    ast.body.forEach((op: Nodes) => {
      if (op.type === ParseSymbol.ExpressionStatement) {
        ops.push(createOpcode(op.opkode, op.argument, op.loc));
      } else {
        if (op.opkode === OpKind.LOOP_MOVE_DATA) {
          loop_start_stack.push(ops.length);

          ops.push(createOpcode(OpKind.LOOP_MOVE_DATA, op.argument, op.loc));

          travers(op);

          const start_loop = loop_start_stack.pop();

          ops[start_loop].argument = ops.length;

          ops.push(createOpcode(OpKind.LOOP_MOVE_DATA_END, start_loop, op.loc));

        } else {
          loop_start_stack.push(ops.length);

          ops.push(createOpcode(OpKind.JUMP_IF_DATA_ZERO, op.argument, op.loc));

          travers(op);

          const start_loop = loop_start_stack.pop();

          ops[start_loop].argument = ops.length;

          ops.push(createOpcode(OpKind.JUMP_IF_DATA_NOT_ZERO, start_loop, op.loc));
        }
      }
    });
  }

  travers(ast);

  return ops;
}

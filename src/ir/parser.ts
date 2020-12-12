import { OptimizationKind } from './optimization-kinds';
import { parse_to_opcodes as parse_to_opcodes_base } from './base/translate_to_opcodes';
import { optimize } from './base/optimization';
import { path_jumptable } from './base/jumptable';
import { Ast, parse_to_ast } from './ast/ast';
import { parse_to_opcodes as parse_to_opcodes_for_ast } from './ast/translate_to_opcodes';
import { optimize as optimize_ast } from './ast/optimization';
import { Opcode } from './opcode';

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

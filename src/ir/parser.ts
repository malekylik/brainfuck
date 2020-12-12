import { OptimizationKind } from './optimization-kinds';
import { parse_to_opcodes as parse_to_opcodes_base } from './base/translate_to_opcodes';
import { optimize } from './base/optimization';
import { path_jumptable } from './base/jumptable';
import { Ast, parse_to_ast } from './ast/ast';
import { parse_to_opcodes as parse_to_opcodes_for_ast } from './ast/translate_to_opcodes';
import { Opcode } from './opcode';

export function translate_program(tokens: Array<string>, optimization_kind: OptimizationKind): Array<Opcode> {
  let ops = parse_to_opcodes_base(tokens);

  ops = optimize(ops, optimization_kind);

  path_jumptable(ops);

  return ops;
}

export function translate_program_to_ast(tokens: Array<string>, optimization_kind: OptimizationKind): Ast {
  let ops = parse_to_opcodes_for_ast(tokens);

  return parse_to_ast(ops);
}

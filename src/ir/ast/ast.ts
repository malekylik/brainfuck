import { OpcodeLoc } from 'ir/opcode';
import { Token } from 'ir/token';
import { TokenKind } from 'ir/token-kinds';

export type Ast = Program;

type LoopBlock = {
  type: Symbol.BlockStatement,
  loc: OpcodeLoc,
  argument: number,
  operator: string,
  body: Array<LoopBlock | Expression>,
}

type Expression = {
  type: Symbol.ExpressionStatement,
  loc: OpcodeLoc,
  argument: number,
  operator: string,
}

type Nodes = LoopBlock | Expression;

type Program = {
  type: Symbol,
  loc: OpcodeLoc,
  argument: number,
  operator: string | 'Program',
  body: Array<Nodes>,
}

enum Symbol {
  ProgramStatement = 0,
  BlockStatement = 0,
  ExpressionStatement = 1,

  BlockStartTerminate = 2,
  BlockEndTerminate = 3,
  ExpresionTerminate = 4,
}

const token_to_symbol_tabel = new Uint8Array(4);
token_to_symbol_tabel[0] = 255;
token_to_symbol_tabel[TokenKind.BLOCK_START + 1] = Symbol.BlockStartTerminate;
token_to_symbol_tabel[TokenKind.BLOCK_END + 1] = Symbol.BlockEndTerminate;
token_to_symbol_tabel[TokenKind.EXPRESION + 1] = Symbol.ExpresionTerminate;

const symbols_count = Object.keys(Symbol).length;
const token_count = 4;

function to_linear_index(symbol: number, kind: number): number {
  return symbol * token_count + kind;
}

/*                   0 [ ] e
  Program/Statement: 0 2 0 1
  Expression       : 0 0 0 3
*/

/*
  Program/Statement -> 0                       (0)
  Program/Statement -> Expr Statement          (1)
  Program/Statement -> [Statement] Statement   (2)

  Expression        -> 0                       (0)
  Expression        -> ExpresionTerminate      (3)
*/
const table_rules = new Uint8Array(symbols_count * token_count);
table_rules[to_linear_index(Symbol.BlockStatement, TokenKind.BLOCK_START + 1)]    = 2;
table_rules[to_linear_index(Symbol.BlockStatement, TokenKind.EXPRESION + 1)]      = 1;

table_rules[to_linear_index(Symbol.ExpressionStatement, TokenKind.EXPRESION + 1)] = 3;

export function parse_to_ast(tokens: Array<Token>): Ast {
  const stack: Array<Symbol | number> = [Symbol.ProgramStatement];
  const stack_block_start = [];
  let root: LoopBlock = {
    type: Symbol.ProgramStatement,
    loc: { line: 0, start: 0, end: 0 },
    body: [],
    argument: 1,
    operator: 'Program'
  };
  let cur = 0;
  let token = next_token();

  function next_token() {
    if (cur < tokens.length) {
      return tokens[cur++];
    }

    return null;
  }

  function pick_symbol() {
    return stack.length !== 0 ? stack[stack.length - 1] : -1;
  }

  while (stack.length !== 0) {
    const symbol = pick_symbol();
    const kind = token ? token.kind + 1 : 0;

    if (symbol - Symbol.BlockStartTerminate >= 0) {
      if (symbol === token_to_symbol_tabel[kind]) {
        if (token.kind === TokenKind.EXPRESION) {
          const exp: Expression = {
            type: Symbol.ExpressionStatement,
            loc: token.loc,
            operator: token.operator,
            argument: token.argument,
          };
          root.body.push(exp);
        }

        if (token.kind === TokenKind.BLOCK_END) {
          const prev_root = stack_block_start.pop();
          root.loc.end = token.loc.end;

          prev_root.body.push(root);
          root = prev_root;
        }

        stack.pop();
        token = next_token();

        continue;
      } else {
        console.warn('error terminate');
        break;
      }
    }

    const rule = table_rules[to_linear_index(symbol, kind)];

    switch (rule) {
      case 0: {
        stack.pop();

        break;
      }

      case 1: {
        stack.push(Symbol.ExpressionStatement);

        break;
      }

      case 2: {
        stack_block_start.push(root);
        root = { type: Symbol.BlockStatement, loc: token.loc, operator: token.operator, argument: token.argument, body: [] };
        root.loc.start = token.loc.start;
        root.loc.line = token.loc.line;

        stack.push(Symbol.BlockEndTerminate);
        stack.push(Symbol.BlockStatement);
        stack.push(Symbol.BlockStartTerminate);

        break;
      }

      case 3: {
        stack.pop();
        stack.push(Symbol.ExpresionTerminate);

        break;
      }

      default: { console.warn('Unknown symbol: ' + symbol); break; }
    }
  }

  if (cur !== 0 && tokens[cur - 1]) {
    root.loc.end = tokens[cur - 1].loc.end;
  }

  if (stack.length !== 0) {
    console.warn('stack is not empty');
  }

  if (cur !== tokens.length) {
    console.warn('tokens are not empty: ' + cur);
  }

  return root;
}

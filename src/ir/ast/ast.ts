import { OpcodeLoc } from 'ir/opcode';
import { OpKind } from 'ir/opcode-kinds';
import { Token } from 'ir/token';
import { TokenKind } from 'ir/token-kinds';

export type Ast = Program;

export type LoopBlock = {
  type: ParseSymbol.BlockStatement,
  loc: OpcodeLoc,
  argument: number,
  operator: string,
  body: Array<LoopBlock | Expression>,
  opkode: OpKind,
  is_pure: boolean,
  search_by: number,
  update_by: number,
}

export type Expression = {
  type: ParseSymbol.ExpressionStatement,
  loc: OpcodeLoc,
  argument: number,
  operator: string,
  opkode: OpKind,
}

export type MulExpression = Expression & {
  opkode: OpKind.MUL_INC_DATA | OpKind.MUL_DEC_DATA,
  loop_divider: number;
}

export type Nodes = LoopBlock | Expression | MulExpression;

type Program = {
  type: ParseSymbol.ProgramStatement,
  loc: OpcodeLoc,
  argument: number,
  operator: string | 'Program',
  body: Array<Nodes>,
  opkode: OpKind,
  is_pure: boolean,
  search_by: number,
  update_by: number,
}

export enum ParseSymbol {
  ProgramStatement = 0,
  BlockStatement = 0,
  ExpressionStatement = 1,

  BlockStartTerminate = 2,
  BlockEndTerminate = 3,
  ExpresionTerminate = 4,
}

const token_to_symbol_tabel = new Uint8Array(4);
token_to_symbol_tabel[0] = 255;
token_to_symbol_tabel[TokenKind.BLOCK_START + 1] = ParseSymbol.BlockStartTerminate;
token_to_symbol_tabel[TokenKind.BLOCK_END + 1] = ParseSymbol.BlockEndTerminate;
token_to_symbol_tabel[TokenKind.EXPRESION + 1] = ParseSymbol.ExpresionTerminate;

const symbols_count = Object.keys(ParseSymbol).length;
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
table_rules[to_linear_index(ParseSymbol.BlockStatement, TokenKind.BLOCK_START + 1)]    = 2;
table_rules[to_linear_index(ParseSymbol.BlockStatement, TokenKind.EXPRESION + 1)]      = 1;

table_rules[to_linear_index(ParseSymbol.ExpressionStatement, TokenKind.EXPRESION + 1)] = 3;

function operator_to_opcode(operator: string): OpKind {
  switch (operator) {
    case '>': return OpKind.INC_PTR;
    case '<': return OpKind.DEC_PTR;
    case '+': return OpKind.INC_DATA;
    case '-': return OpKind.DEC_DATA;
    case '.': return OpKind.WRITE_STDOUT;
    case ',': return OpKind.READ_STDIN;
    case '[': return OpKind.LOOP_START;
    case ']': return OpKind.LOOP_START_END;
    default: { console.warn('uknown operator: ' + operator); break; }
  }

  return OpKind.INVALID_OP;
}

function check_block_for_search_loop(ast: Ast): Ast {
  function check_for_change_prt(op: LoopBlock) {
    let current_ptr = 0;
    let updater = 0;

    op.body.forEach((n) => {
      if (n.opkode === OpKind.INC_PTR) {
        current_ptr += n.argument;
      } else if (n.opkode === OpKind.DEC_PTR) {
        current_ptr -= n.argument;
      } else if (n.opkode === OpKind.INC_DATA && current_ptr === 0) {
        updater += n.argument;
      } else if (n.opkode === OpKind.DEC_DATA && current_ptr === 0) {
        updater -= n.argument;
      }

      if (n.type === ParseSymbol.BlockStatement) {
        check_for_change_prt(n);
      }
    });
  
    op.search_by = current_ptr;
    op.update_by = updater;
  }

  check_for_change_prt(ast as LoopBlock);

  return ast;
}

function check_block_for_pure(ast: Ast): Ast {
  function check(op: LoopBlock) {
    let is_pure = !op.search_by;

    op.body.forEach((n) => {
      if (n.type === ParseSymbol.BlockStatement) {
        check_block_for_pure(n);

        // is_pure = is_pure && n.is_pure; // TODO: data loop inside data loop break the code
        is_pure = false;
      } else {
        is_pure = is_pure && (n.opkode === OpKind.DEC_DATA || n.opkode === OpKind.INC_DATA || n.opkode === OpKind.DEC_PTR || n.opkode === OpKind.INC_PTR);
      }
    });

    op.is_pure = is_pure;
  }

  check(ast as LoopBlock);

  return ast;
}

export function parse_to_ast(tokens: Array<Token>): Ast {
  const stack: Array<ParseSymbol | number> = [ParseSymbol.ProgramStatement];
  const stack_block_start = [];
  let root: LoopBlock = {
    type: ParseSymbol.ProgramStatement,
    loc: { line: 0, start: 0, end: 0 },
    body: [],
    argument: 1,
    operator: 'Program',
    opkode: OpKind.LOOP_START,
    search_by: 0,
    is_pure: false,
    update_by: -1,
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

    if (symbol - ParseSymbol.BlockStartTerminate >= 0) {
      if (symbol === token_to_symbol_tabel[kind]) {
        if (token.kind === TokenKind.EXPRESION) {
          const exp: Expression = {
            type: ParseSymbol.ExpressionStatement,
            loc: token.loc,
            operator: token.operator,
            argument: token.argument,
            opkode: operator_to_opcode(token.operator),
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
        stack.push(ParseSymbol.ExpressionStatement);

        break;
      }

      case 2: {
        stack_block_start.push(root);
        root = {
          type: ParseSymbol.BlockStatement,
          loc: token.loc,
          operator: token.operator,
          argument: token.argument,
          body: [],
          opkode: OpKind.LOOP_START,
          search_by: 0,
          is_pure: false,
          update_by: -1,
        };
        root.loc.start = token.loc.start;
        root.loc.line = token.loc.line;

        stack.push(ParseSymbol.BlockEndTerminate);
        stack.push(ParseSymbol.BlockStatement);
        stack.push(ParseSymbol.BlockStartTerminate);

        break;
      }

      case 3: {
        stack.pop();
        stack.push(ParseSymbol.ExpresionTerminate);

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

  // order matter
  check_block_for_search_loop(root);
  check_block_for_pure(root);

  root.search_by = 0;
  root.is_pure = false;

  return root;
}

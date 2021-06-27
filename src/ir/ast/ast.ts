import { BrainfuckAplh } from 'ir/brainfuck-alph';
import { OpcodeLoc } from 'ir/opcode';
import { OpKind } from 'ir/opcode-kinds';
import { Token } from 'ir/token';

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

// Program -> StatementList
// StatementList -> Statement StatementList | e; follow = ] | e
// Statement -> [StatementList] | Expression
// Expression -> + | - | > | < | , | .
interface NonTerminalSymbol {
  isTerminal: false;

  derive(loakaheadSymbol: TerminalSymbol | null): Array<Symbol> | null;

  type: string;
}

interface TerminalSymbol {
  isTerminal: true;
  symbol: BrainfuckAplh;
}

type Symbol = NonTerminalSymbol | TerminalSymbol;

const programNonTerminal: NonTerminalSymbol = {
  isTerminal: false,
  type: 'programNonTerminal',

  derive(loakaheadSymbol: TerminalSymbol): Array<Symbol> {
    return [statementListNonTerminal];
  },
}

const statementListNonTerminal: NonTerminalSymbol =  {
  isTerminal: false,
  type: 'statementListNonTerminal',

  derive(loakaheadSymbol: TerminalSymbol): Array<Symbol> {
    if (loakaheadSymbol === null || loakaheadSymbol.symbol === BrainfuckAplh.EndLoop) {
      return [];
    }

    return [statementNonTerminal, statementListNonTerminal];
  },
}

const statementNonTerminal: NonTerminalSymbol = {
  isTerminal: false,
  type: 'statementNonTerminal',

  derive(loakaheadSymbol: TerminalSymbol): Array<Symbol> {
    if (loakaheadSymbol.symbol === BrainfuckAplh.StartLoop) {
      return [{ isTerminal: true, symbol: BrainfuckAplh.StartLoop }, statementListNonTerminal, { isTerminal: true, symbol: BrainfuckAplh.EndLoop }];
    }

    return [expressionNonTerminal];
  },
}

const expressionNonTerminal: NonTerminalSymbol = {
  isTerminal: false,
  type: 'expressionNonTerminal',

  derive(loakaheadSymbol: TerminalSymbol): Array<Symbol> | null {
    if (
      loakaheadSymbol.symbol === BrainfuckAplh.IncreaseCell ||
      loakaheadSymbol.symbol === BrainfuckAplh.DecreaseCell ||
      loakaheadSymbol.symbol === BrainfuckAplh.MovePtrForward ||
      loakaheadSymbol.symbol === BrainfuckAplh.MovePtrBackward ||
      loakaheadSymbol.symbol === BrainfuckAplh.GetChar ||
      loakaheadSymbol.symbol === BrainfuckAplh.PutChar
    ) {
      return [loakaheadSymbol];
    }

    return null; // TODO: should be error, consider null as error
  },
}

function operator_to_opcode(operator: string): OpKind {
  switch (operator) {
    case BrainfuckAplh.MovePtrForward: return OpKind.INC_PTR;
    case BrainfuckAplh.MovePtrBackward: return OpKind.DEC_PTR;
    case BrainfuckAplh.IncreaseCell: return OpKind.INC_DATA;
    case BrainfuckAplh.DecreaseCell: return OpKind.DEC_DATA;
    case BrainfuckAplh.PutChar: return OpKind.WRITE_STDOUT;
    case BrainfuckAplh.GetChar: return OpKind.READ_STDIN;
    case BrainfuckAplh.StartLoop: return OpKind.LOOP_START;
    case BrainfuckAplh.EndLoop: return OpKind.LOOP_START_END;
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

function isSymbolTerminal(symbol: Symbol): symbol is TerminalSymbol {
  return symbol.isTerminal;
}

export function parse_to_ast(tokens: Array<Token>): Ast {
  const symbols: Array<TerminalSymbol> = tokens.map(token => ({ isTerminal: true, symbol: token.operator }))

  const stack: Array<Symbol> = [programNonTerminal];
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
  let error = null;
  let currentSymbol = null;

  while (stack.length !== 0) {
    const lookaheadSymbol = cur < symbols.length ? symbols[cur] : null;
    // console.log('stack', JSON.stringify(stack));
    currentSymbol = stack.pop();

    if (currentSymbol && isSymbolTerminal(currentSymbol)) {
      if (lookaheadSymbol?.symbol === currentSymbol.symbol) { // TODO: enable strict null
        const token = tokens[cur];

        if (lookaheadSymbol.symbol === '[') {
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
        } else if (lookaheadSymbol.symbol === ']') {
          // Should break out of loop early than this case
          // StatementList with ] -> empty stack
          const prev_root = stack_block_start.pop() as LoopBlock;
          root.loc.end = token.loc.end;

          prev_root.body.push(root);
          root = prev_root;
        } else {
          const exp: Expression = {
            type: ParseSymbol.ExpressionStatement,
            loc: token.loc,
            operator: token.operator,
            argument: token.argument,
            opkode: operator_to_opcode(token.operator),
          };
          root.body.push(exp);
        }

        cur += 1;
      } else {
        if (currentSymbol.symbol === BrainfuckAplh.EndLoop) {
          error = {
            message: `Program ended without closing loop ("]")`,
            lastToken: tokens[cur],
            lastStackSymbol: currentSymbol,
          }
        } else {
          error = {
            message: `Invalid terminal symbol ${currentSymbol?.symbol}. Expected ${lookaheadSymbol?.symbol}`,
            lastToken: tokens[cur],
            lastStackSymbol: currentSymbol,
          }
        }
        break;
      }
    } else {
      const deriveSymbols = (currentSymbol as NonTerminalSymbol).derive(lookaheadSymbol);

      if (deriveSymbols === null) {
        error = {
          message: `Invalid terminal symbol ${lookaheadSymbol?.symbol ?? ''}`,
          lastToken: tokens[cur],
          lastStackSymbol: currentSymbol,
        };
        break;
      } else {
        stack.push(...(deriveSymbols.reverse()));
      }
    }
  }

  if (cur < tokens.length) {
    error = {
      message: 'Early end of parsing. Probably you have more loop closing commands ("]") than opening commands ("[")',
      lastToken: tokens[cur],
      lastStackSymbol: currentSymbol,
    };
  }

  if (error) {
    console.log(error);
  }

  if (cur !== 0 && tokens[cur - 1]) {
    root.loc.end = tokens[cur - 1].loc.end;
  }

  // order matter
  check_block_for_search_loop(root);
  check_block_for_pure(root);

  root.search_by = 0;
  root.is_pure = false;

  return root;
}

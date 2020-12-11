import { TokenKind } from './token-kinds';

type TokenLoc = {
  start: number;
  end: number;
  line: number;
};

export type Token = {
  kind: TokenKind,
  operator: string,
  argument: number,
  loc: TokenLoc,
}

export function createToken(opKind: TokenKind, operator: string, argument: number, loc: TokenLoc): Token {
  return {
    kind: opKind,
    operator,
    argument,
    loc,
  };
}

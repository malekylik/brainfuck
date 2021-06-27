import { BrainfuckAplh } from 'ir/brainfuck-alph';
import { createToken, Token } from 'ir/token';
import { TokenKind } from 'ir/token-kinds';

export function parse_to_opcodes(tokens: Array<string | BrainfuckAplh>): Array<Token> {
  let pc = 0;
  let line = 0;
  let program_size = tokens.length;
  let ops: Array<Token> = [];

  while (pc < program_size) {
    const instruction = tokens[pc];

    const start = pc++;

    while ((instruction !== BrainfuckAplh.StartLoop && instruction !== BrainfuckAplh.EndLoop) && pc < program_size && tokens[pc] === instruction) {
      pc++;
    }

    const num_repeats = pc - start;

    let kind = TokenKind.INVALID_TOKEN;
    switch (instruction) {
      case BrainfuckAplh.StartLoop: {
        kind = TokenKind.BLOCK_START;
        break;
      }
      case BrainfuckAplh.EndLoop: {
        kind = TokenKind.BLOCK_END;
        break;
      }
      case BrainfuckAplh.MovePtrForward:
      case BrainfuckAplh.MovePtrBackward:
      case BrainfuckAplh.IncreaseCell:
      case BrainfuckAplh.DecreaseCell:
      case BrainfuckAplh.GetChar:
      case BrainfuckAplh.PutChar: {
        kind = TokenKind.EXPRESION;
        break;
      }
      case '\n': {
        line += 1;
        break;
      }

      // TODO: show error to user
      default: { console.warn(`bad char '${instruction}' at pc=${start}`); }
    }

    ops.push(createToken(kind, instruction as BrainfuckAplh, num_repeats, { start, line, end: pc }));
  }

  return ops;
}

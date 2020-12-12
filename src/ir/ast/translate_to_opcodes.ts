import { createToken, Token } from 'ir/token';
import { TokenKind } from 'ir/token-kinds';

export function parse_to_opcodes(tokens: Array<string>): Array<Token> {
  let pc = 0;
  let line = 0;
  let program_size = tokens.length;
  let ops: Array<Token> = [];

  while (pc < program_size) {
    const instruction = tokens[pc];

    const start = pc++;

    while ((instruction !== '[' && instruction !== ']') && pc < program_size && tokens[pc] === instruction) {
      pc++;
    }

    const num_repeats = pc - start;

    let kind = TokenKind.INVALID_TOKEN;
    switch (instruction) {
      case '[': {
        kind = TokenKind.BLOCK_START;
        break;
      }
      case ']': {
        kind = TokenKind.BLOCK_END;
        break;
      }
      case '>':
      case '<':
      case '+':
      case '-':
      case ',':
      case '.': {
        kind = TokenKind.EXPRESION;
        break;
      }
      case '\n': {
        line += 1;
        break;
      }

      default: { console.warn(`"bad char '${instruction}' at pc=${start}`); }
    }

    ops.push(createToken(kind, instruction, num_repeats, { start, line, end: pc }));
  }

  return ops;
}

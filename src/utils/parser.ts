export function parse_from_stream(programFile: string): Array<string> {
  const tokens = [];

  for (let i = 0; i < programFile.length; i++) {
    const c = programFile[i];

    if (c == '>' || c == '<' || c == '+' || c == '-' || c == '.' ||
        c == ',' || c == '[' || c == ']') {
        tokens.push(c);
    }
  }

  return tokens;
}

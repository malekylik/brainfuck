import { BrainfuckMode } from 'consts/mode';

export function modeToString(mode: BrainfuckMode): string {
  switch (mode) {
    case BrainfuckMode.InterpretateBase: return 'Interpreter';
    case BrainfuckMode.InterpretWithJumptable: return 'Interpreter with Jumptable';
    case BrainfuckMode.CompileJavaScript: return 'Compile to JavaScript';
    case BrainfuckMode.CompileWebAssembly: return 'Compile to WebAssembly';
  }

  return 'unknown mode';
}

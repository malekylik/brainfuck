import { BrainfuckMode } from 'consts/mode';

export function modeToString(mode: BrainfuckMode): string {
  switch (mode) {
    case BrainfuckMode.InterpretateBase: return 'Interpreter';
    case BrainfuckMode.InterpretWithJumptable: return 'Interpreter with Jumptable';
    case BrainfuckMode.InterpretWithIR: return 'Interpreter with Opcodes';
    case BrainfuckMode.CompileJavaScript: return 'Compile to JavaScript';
    case BrainfuckMode.CompileAsmJavaScript: return 'Compile to AsmJS';
    case BrainfuckMode.CompileWebAssembly: return 'Compile to WebAssembly';
  }

  return 'unknown mode';
}

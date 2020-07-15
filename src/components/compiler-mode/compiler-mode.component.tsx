import React from 'react';

import { BrainfuckMode } from 'consts/mode';
import { isWebAssemblySupported } from 'consts/compatibility';

type CompilerModeProps = {
  currentMode: BrainfuckMode,
  setCurrentMode: (mode: BrainfuckMode) => void,
};

export function CompilerMode(props: CompilerModeProps) {
  const { currentMode, setCurrentMode } = props;

  return (
      <div>
        <span>Mode:</span>
        <p>
          <label>Base Interpreter</label>
          <input type='checkbox' checked={currentMode === BrainfuckMode.InterpretateBase} onChange={() => setCurrentMode(BrainfuckMode.InterpretateBase)} />
        </p>
        <p>
          <label>Interpreter with Jumptable</label>
          <input type='checkbox' checked={currentMode === BrainfuckMode.InterpretWithJumptable} onChange={() => setCurrentMode(BrainfuckMode.InterpretWithJumptable)} />
        </p>
        <p>
          <label>Interpreter with Opcodes + Optimizations</label>
          <input type='checkbox' checked={currentMode === BrainfuckMode.InterpretWithIR} onChange={() => setCurrentMode(BrainfuckMode.InterpretWithIR)} />
        </p>
        <p>
          <label>JavaScript</label>
          <input type='checkbox' checked={currentMode === BrainfuckMode.CompileJavaScript} onChange={() => setCurrentMode(BrainfuckMode.CompileJavaScript)} />
        </p>
        <p>
          <label>WebAssembly</label>
          <input
            disabled={!isWebAssemblySupported}
            type='checkbox'
            checked={currentMode === BrainfuckMode.CompileWebAssembly}
            onChange={() => setCurrentMode(BrainfuckMode.CompileWebAssembly)}
          />
        </p>
    </div>
  );
}

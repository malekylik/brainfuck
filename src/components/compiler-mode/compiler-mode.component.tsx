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
          <label htmlFor='compiler-mode-interpretate-base'>Base Interpreter</label>
          <input
            id='compiler-mode-interpretate-base'
            type='checkbox'
            checked={currentMode === BrainfuckMode.InterpretateBase}
            onChange={() => setCurrentMode(BrainfuckMode.InterpretateBase)}
          />
        </p>
        <p>
          <label htmlFor='compiler-mode-interpretate-with-jumptable'>Interpreter with Jumptable</label>
          <input
            id='compiler-mode-interpretate-with-jumptable'
            type='checkbox'
            checked={currentMode === BrainfuckMode.InterpretWithJumptable}
            onChange={() => setCurrentMode(BrainfuckMode.InterpretWithJumptable)}
          />
        </p>
        <p>
          <label htmlFor='compiler-mode-interpretate-with-ir'>Interpreter with Opcodes + Optimizations</label>
          <input
            id='compiler-mode-interpretate-with-ir'
            type='checkbox'
            checked={currentMode === BrainfuckMode.InterpretWithIR}
            onChange={() => setCurrentMode(BrainfuckMode.InterpretWithIR)}
          />
        </p>
        <p>
          <label htmlFor='compiler-mode-compile-java-script'>JavaScript</label>
          <input
            id='compiler-mode-compile-java-script'
            type='checkbox'
            checked={currentMode === BrainfuckMode.CompileJavaScript}
            onChange={() => setCurrentMode(BrainfuckMode.CompileJavaScript)}
          />
        </p>
        <p>
          <label htmlFor='compiler-mode-compile-web-assembly'>WebAssembly</label>
          <input
            id='compiler-mode-compile-web-assembly'
            disabled={!isWebAssemblySupported}
            type='checkbox'
            checked={currentMode === BrainfuckMode.CompileWebAssembly}
            onChange={() => setCurrentMode(BrainfuckMode.CompileWebAssembly)}
          />
        </p>
    </div>
  );
}

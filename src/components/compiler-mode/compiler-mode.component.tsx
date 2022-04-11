import React from 'react';

import { BrainfuckMode } from 'consts/mode';
import { isWebAssemblySupported } from 'consts/compatibility';
import { NumberInput } from 'components/number-input/number-input';
import { useLabelInputStyles, useOptionFieldsStyles, useOptionWrapperStyles } from './compiler-mode.style';

type CompilerModeProps = {
  currentMode: BrainfuckMode,
  jitThreashold: number,
  setCurrentMode: (mode: BrainfuckMode) => void,
  setJITThreashold: (threashold: number) => void;
};

export function CompilerMode(props: CompilerModeProps) {
  const { currentMode, jitThreashold, setCurrentMode, setJITThreashold } = props;

  const optionWrapperClasses = useOptionWrapperStyles();
  const labelInputClasses = useLabelInputStyles();
  const optionFieldsClasses = useOptionFieldsStyles();

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
        <div className={optionWrapperClasses.root}>
          <p className={optionFieldsClasses.root}>
            <label htmlFor='compiler-mode-interpretate-jit'>Interpreter JIT</label>
            <input
              id='compiler-mode-interpretate-jit'
              type='checkbox'
              checked={currentMode === BrainfuckMode.InterpretWithJIT}
              onChange={() => setCurrentMode(BrainfuckMode.InterpretWithJIT)}
            />
          </p>
          <p>
          <label htmlFor='compiler-mode-interpretate-with-ir-threashlod' className={labelInputClasses.root}>JIT threashold</label>
          <NumberInput
            id='compiler-mode-interpretate-with-ir-threashlod'
            defaultValue={jitThreashold}
            min={1}
            onChange={(value) => { setJITThreashold(value); }}
          />
          </p>
        </div>
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
          <label htmlFor='compiler-mode-compile-asm-java-script'>AsmJS</label>
          <input
            id='compiler-mode-compile-asm-java-script'
            type='checkbox'
            checked={currentMode === BrainfuckMode.CompileAsmJavaScript}
            onChange={() => setCurrentMode(BrainfuckMode.CompileAsmJavaScript)}
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

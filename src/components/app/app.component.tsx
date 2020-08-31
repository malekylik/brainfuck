import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

import { CompilerMode } from 'components/compiler-mode/compiler-mode.component';
import { CompilerTimeProfiler } from 'components/compiler-time-profiler/compiler-time-profiler.component';
import { Modal } from 'components/modal/modal.component';
import { mandelbrot } from 'consts/programs';
import { WorkerEvent } from 'consts/worker';
import { BrainfuckMode } from 'consts/mode';
import { isWebAssemblySupported } from 'consts/compatibility';
import { CompilerTimeProfile } from 'types/worker';
import { converMillisecondToString } from 'utils/time';
import { modeToString } from 'utils/mode';
import { useWrapperStyles, useButtonStyles, useTextareaStyles, useModalStyles } from './app.style';
import { useWorker, useWat2Wasm } from './app.hooks';

export default function App() {
  const [bfSource, changeBFSource] = useState(mandelbrot);
  const [output, changeOutput] = useState('');
  const [endTime, setEndTime] = useState('???');
  const [compileTime, setCompileTime] = useState('???');
  const [statMode, setStatMode] = useState('???');
  const [currentMode, setCurrentMode] = useState(isWebAssemblySupported ? BrainfuckMode.CompileWebAssembly : BrainfuckMode.CompileJavaScript);
  const [isRunning, setIsRunning] = useState(false);
  const [open, setOpen] = useState(false);
  const [compiledCode, setCompiledCode] = useState('');
  const [isCodeCompiling, setIsCodeCompiling] = useState(false);

  const outputRef = useRef(null);

  const wrapperClasses = useWrapperStyles();
  const buttonClasses = useButtonStyles();
  const textareaClasses = useTextareaStyles();
  const modalClasses = useModalStyles();

  const [workerRef, workerLoading] = useWorker(onWorkerOut, onWorkerEnd, onCodeGenerated);
  useWat2Wasm(workerRef, workerLoading);

  function changeBFSourceHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
    changeBFSource(e.target.value);
  }

  function changeOutputHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
    changeOutput(e.target.value);
  }

  function runHandler() {
    workerRef.current.postMessage({ type: WorkerEvent.start, data: { src: bfSource, mode: currentMode } });
    setIsRunning(true);
  }

  function onWorkerOut(v: string) {
    changeOutput(outputRef.current.value + v);
  }

  function onWorkerEnd(time: CompilerTimeProfile, mode: BrainfuckMode) {
    ReactDOM.unstable_batchedUpdates(() => {
      setEndTime(converMillisecondToString(time.runTime));
      setCompileTime(converMillisecondToString(time.compileTime));
      setStatMode(modeToString(mode));
      setIsRunning(false);
    });
  }

  function openViewCodeModal() {
    setOpen(true);
    if (compiledCode === '') {
      setIsCodeCompiling(true);
      workerRef.current.postMessage({ type: WorkerEvent.getGeneratedCode, data: { src: bfSource, mode: currentMode } });
    }
  }

  function onCodeGenerated(code: string) {
    setCompiledCode(code);
    setIsCodeCompiling(false);
  }

  function setRunMode(mode: BrainfuckMode) {
    setCurrentMode(mode);

    if (compiledCode !== '') {
      setCompiledCode('');
    }
  }

  return (
    <div className={wrapperClasses.root}>
      <div className={textareaClasses.root}>
        <div className={textareaClasses.textareaWrapper}>
          <textarea
            className={`${textareaClasses.textarea} ${textareaClasses.textareaProgram}`}
            onChange={changeBFSourceHandler}
            value={bfSource}
            spellCheck={false}
          />
          <textarea
            ref={outputRef}
            className={`${textareaClasses.textarea} ${textareaClasses.textareaOutput}`}
            onChange={changeOutputHandler}
            value={output}
            spellCheck={false}
          />
        </div>

        <div>
          <button className={buttonClasses.root} disabled={isRunning} onClick={runHandler}>run</button>
          <button
            disabled={
              currentMode === BrainfuckMode.InterpretateBase ||
              currentMode === BrainfuckMode.InterpretWithJumptable ||
              currentMode === BrainfuckMode.InterpretWithIR
            }
            onClick={openViewCodeModal}>
            view code
          </button>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        {
          isCodeCompiling ?
          <div className={modalClasses.loader}>
            <CircularProgress />
          </div>
          :
          <p className={modalClasses.code}>
            {
              compiledCode
            }
          </p>
        }


      </Modal>

      <div>

        <CompilerTimeProfiler statMode={statMode} compileTime={compileTime} endTime={endTime} />

        <CompilerMode currentMode={currentMode} setCurrentMode={setRunMode} />

      </div>
    </div>
  );
}

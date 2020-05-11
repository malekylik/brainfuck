import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import { mandelbrot } from 'consts/programs';
import { WorkerEvent } from 'consts/worker';
import { BrainfuckMode } from 'consts/mode';
import { WorkerMessage } from 'types/worker';
import { converMillisecondToString } from 'utils/time';
import { modeToString } from 'utils/mode';

export default function App() {
  const [bfSource, changeBFSource] = useState(mandelbrot);
  const [output, changeOutput] = useState('');
  const [endTime, setEndTime] = useState('???');
  const [compileTime, setCompileTime] = useState('???');
  const [statMode, setStatMode] = useState('???');
  const [currentMode, setCurrentMode] = useState(BrainfuckMode.CompileWebAssembly);
  const [isRunning, setIsRunning] = useState(false);
  const workerRef = useRef<Worker>(null);
  const outputRef = useRef(null);

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

  useEffect(() => {
    fetch('./worker.js')
      .then(res => res.blob())
      .then((workerBlob) => {
        const url = URL.createObjectURL(workerBlob);
        const worker = new Worker(url);
        workerRef.current = worker;

        function messageHandler(e: MessageEvent) {
          const message: WorkerMessage = e.data;

          if (message.type === WorkerEvent.out) {
            changeOutput(outputRef.current.value + message.data.value);
          }

          if (message.type === WorkerEvent.end) {
            ReactDOM.unstable_batchedUpdates(() => {
              setEndTime(converMillisecondToString(message.data.time.runTime));
              setCompileTime(converMillisecondToString(message.data.time.compileTime));
              setStatMode(modeToString(message.data.mode));
              setIsRunning(false);
            });
          }
        }

        workerRef.current?.addEventListener('message', messageHandler);
      });

      return () => {
        workerRef.current?.terminate();
      };
  }, []);

  return (
    <div>
      <textarea onChange={changeBFSourceHandler} value={bfSource} />
      <textarea ref={outputRef} onChange={changeOutputHandler} value={output} />
      <button disabled={isRunning} onClick={runHandler}>run</button>

      <div>
        <p>
          <span>mode: </span>
          <span>{statMode}</span>
        </p>

        <p>
          <span>compile time: </span>
          <span>{compileTime}</span>
        </p>

        <p>
          <span>end time: </span>
          <span>{endTime}</span>
        </p>
      </div>

      <div>
        <span>Mode:</span>
        <p>
          <label>Base Interpreter</label>
          <input type='checkbox' checked={currentMode === BrainfuckMode.InterpretateBase} onChange={() => setCurrentMode(BrainfuckMode.InterpretateBase)} />
        </p>
        <p>
          <label>JavaScript</label>
          <input type='checkbox' checked={currentMode === BrainfuckMode.CompileJavaScript} onChange={() => setCurrentMode(BrainfuckMode.CompileJavaScript)} />
        </p>
        <p>
          <label>WebAssembly</label>
          <input type='checkbox' checked={currentMode === BrainfuckMode.CompileWebAssembly} onChange={() => setCurrentMode(BrainfuckMode.CompileWebAssembly)} />
        </p>
      </div>
    </div>
  );
}

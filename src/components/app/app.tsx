import React, { useState, useEffect, useRef } from 'react';

import { mandelbrot } from 'consts/programs';
import { WorkerEvent } from 'consts/worker';
import { WorkerMessage } from 'types/worker';

export default function App() {
  const [bfSource, changeBFSource] = useState(mandelbrot);
  const [output, changeOutput] = useState('');
  const [endTime, setEndTime] = useState('???');
  const [compileTime, setCompileTime] = useState('???');
  const workerRef = useRef<Worker>(null);
  const outputRef = useRef(null);

  function changeBFSourceHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
    changeBFSource(e.target.value);
  }

  function changeOutputHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
    changeOutput(e.target.value);
  }

  function runHandler() {
    workerRef.current.postMessage({ type: WorkerEvent.start, src: bfSource });
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
            console.log('time', message.data.time);

            const runTime = message.data.time.runTime | 0;

            setEndTime(`${(runTime / 1000) | 0}s ${(runTime - ((runTime / 1000) | 0) * 1000) }ms`);

            const compileTime = message.data.time.compileTime | 0;

            setCompileTime(`${(compileTime / 1000) | 0}s ${(compileTime - ((compileTime / 1000) | 0) * 1000) }ms`);
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
      <button onClick={runHandler}>run</button>

      <div>
        <p>
          <span>compile time: </span>
          <span>{compileTime}</span>
        </p>

        <p>
          <span>end time: </span>
          <span>{endTime}</span>
        </p>
      </div>
    </div>
  );
}

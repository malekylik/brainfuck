import React, { useState, useEffect, useRef } from 'react';

import { mandelbrot } from '@consts/programs';

export default function App() {
  const [bfSource, changeBFSource] = useState(mandelbrot);
  const [output, changeOutput] = useState<string>();
  const workerRef = useRef<Worker>(null);
  const outputRef = useRef(null);

  function changeBFSourceHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
    changeBFSource(e.target.value);
  }

  function changeOutputHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
    changeOutput(e.target.value);
  }

  function runHandler() {
    workerRef.current.postMessage({ type: 'start', src: bfSource });
  }

  useEffect(() => {
    fetch('./worker.js')
      .then(res => res.blob())
      .then((workerBlob) => {
        const url = URL.createObjectURL(workerBlob);
        const worker = new Worker(url);
        workerRef.current = worker;

        function messageHandler(e: MessageEvent) {
          const { data } = e;
    
          if (data.type === 'out') {

            changeOutput(outputRef.current.value + data.value);
          }
        
          if (data.type === 'end') {}
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
    </div>
  );
}

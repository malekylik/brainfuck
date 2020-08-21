import React, { useEffect, useRef, useState } from 'react';

import { WorkerMessage, CompilerTimeProfile } from 'types/worker';
import { WorkerEvent } from 'consts/worker';
import { BrainfuckMode } from 'consts/mode';
import { isWebAssemblySupported } from 'consts/compatibility';

type onWorkerOutHandler = (s: string) => void;
type onWorkerEndHandler = (time: CompilerTimeProfile, mode: BrainfuckMode) => void;

export function useWorker(onWorkerOut: onWorkerOutHandler, onWorkerEnd: onWorkerEndHandler): [React.MutableRefObject<Worker>, boolean] {
  const workerRef = useRef<Worker>(null);
  const [loading, setLoading] = useState(true);

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
            onWorkerOut(message.data.value);
          }

          if (message.type === WorkerEvent.end) {
            onWorkerEnd(message.data.time, message.data.mode);
          }
        }

        workerRef.current?.addEventListener('message', messageHandler);
        setLoading(false);
      })
      .catch(e => setLoading(false));

      return () => {
        workerRef.current?.terminate();
      };
  }, []);

  return [workerRef, loading];
}

export function useWat2Wasm(wRef: React.MutableRefObject<Worker>, workerLoading: boolean): void {

  useEffect(() => {
    if (isWebAssemblySupported && !workerLoading) {
      fetch('./wat2wasm.wasm')
      .then((re) => re.blob())
      .then((b) => {
        const url = URL.createObjectURL(b);

        wRef.current.postMessage({ type: WorkerEvent.setWat2Wasm, data: { compileWatToWasm: url } });
      });
    }
  }, [workerLoading]);
}

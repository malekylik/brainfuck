import React, { useEffect, useRef, useState } from 'react';

import { WorkerMessage, CompilerTimeProfile } from 'types/worker';
import { WorkerEvent } from 'consts/worker';
import { BrainfuckMode } from 'consts/mode';
import { isWebAssemblySupported } from 'consts/compatibility';

type onWorkerOutHandler = (s: string) => void;
type onWorkerEndHandler = (time: CompilerTimeProfile, mode: BrainfuckMode) => void;
type onCodeGeneratedHandler = (s: string) => void;

export function useWorker(
  onWorkerOut: onWorkerOutHandler,
  onWorkerEnd: onWorkerEndHandler,
  onCodeGenerated: onCodeGeneratedHandler,
): [React.MutableRefObject<Worker | null>, boolean] {
  const workerRef: React.MutableRefObject<Worker | null> = useRef(null);
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

          if (message.type === WorkerEvent.getGeneratedCode) {
            onCodeGenerated(message.data.src);
          }
        }

        workerRef.current?.addEventListener('message', messageHandler);
        setLoading(false);
      })
      .catch(e => {
        // TODO: add showing an error for worker loading at UI
        setLoading(false)
      });

      return () => {
        workerRef.current?.terminate();
      };
  }, []);

  return [workerRef, loading];
}

export function useWat2Wasm(wRef: React.MutableRefObject<Worker | null>, workerLoading: boolean): void {

  useEffect(() => {
    if (isWebAssemblySupported && !workerLoading && wRef.current !== null) {
      fetch('./wat2wasm.wasm')
      .then(re => re.blob())
      .then(b => {
        const url = URL.createObjectURL(b);

        // Check for null in if
        wRef.current!.postMessage({ type: WorkerEvent.setWat2Wasm, data: { compileWatToWasm: url } });
      });
    }
  }, [workerLoading]);
}

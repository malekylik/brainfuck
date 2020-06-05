import React, { useEffect, useRef } from 'react';

import { WorkerMessage, CompilerTimeProfile } from 'types/worker';
import { WorkerEvent } from 'consts/worker';
import { BrainfuckMode } from 'consts/mode';
import { fetch } from 'utils/fetch';

type onWorkerOutHandler = (s: string) => void;
type onWorkerEndHandler = (time: CompilerTimeProfile, mode: BrainfuckMode) => void;

export function useWorker(onWorkerOut: onWorkerOutHandler, onWorkerEnd: onWorkerEndHandler): React.MutableRefObject<Worker> {
  const workerRef = useRef<Worker>(null);

  useEffect(() => {
    fetch('./worker.js')
      .then(res => { console.log('res', res); return res.blob() })
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
      });

      return () => {
        workerRef.current?.terminate();
      };
  }, []);

  return workerRef;
}

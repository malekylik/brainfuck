import { WorkerEvent } from 'consts/worker';

export type WorkerMessageStart = {
  type: WorkerEvent.start,
};

export type WorkerMessageOut = {
  type: WorkerEvent.out,
  data: {
    value: string;
  }
};

export type WorkerMessageEnd = {
  type: WorkerEvent.end,
  data: {
    time: {
      runTime: number;
      compileTime: number;
    }
  }
};

export type WorkerMessage =
  WorkerMessageStart |
  WorkerMessageOut |
  WorkerMessageEnd;

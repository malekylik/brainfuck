import { WorkerEvent } from 'consts/worker';
import { BrainfuckMode } from 'consts/mode';

export type CompilerTimeProfile = {
  runTime: number;
  compileTime: number;
};

export type WorkerMessageStart = {
  type: WorkerEvent.start,
  data: {
    src: string,
    mode: BrainfuckMode,
  }
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
    time: CompilerTimeProfile,
    mode: BrainfuckMode,
  }
};

export type WorkerMessage =
  WorkerMessageStart |
  WorkerMessageOut |
  WorkerMessageEnd;

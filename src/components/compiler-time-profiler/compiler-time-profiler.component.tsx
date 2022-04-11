import React from 'react';

type CompilerTimeProfilerProps = {
  statMode: string,
  compileTime: string,
  endTime: string,
  totalTime: string,
};

export function CompilerTimeProfiler(props: CompilerTimeProfilerProps) {
  const { statMode, compileTime, totalTime, endTime } = props;

  return (
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

      <p>
        <span>total time: </span>
        <span>{totalTime}</span>
      </p>
  </div>
  );
}

import React from 'react';

type CompilerTimeProfilerProps = {
  statMode: string,
  compileTime: string,
  endTime: string,
};



export function CompilerTimeProfiler(props: CompilerTimeProfilerProps) {
  const { statMode, compileTime, endTime } = props;

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
  </div>
  );
}

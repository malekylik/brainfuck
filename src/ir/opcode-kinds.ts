enum OpKind {
  INVALID_OP = 'INVALID_OP',
  INC_PTR = 'INC_PTR',
  DEC_PTR =  'DEC_PTR',
  INC_OFFSET = 'INC_OFFSET',
  DEC_OFFSET =  'DEC_OFFSET',
  INC_DATA = 'INC_DATA',
  DEC_DATA = 'DEC_DATA',
  READ_STDIN = 'READ_STDIN',
  WRITE_STDOUT = 'WRITE_STDOUT',
  LOOP_SET_TO_ZERO = 'LOOP_SET_TO_ZERO',
  LOOP_MOVE_PTR = 'LOOP_MOVE_PTR',
  UNROLL_LOOP_MOVE_PTR_UNTIL_ZERO = 'UNROLL_LOOP_MOVE_PTR_UNTIL_ZERO',
  LOOP_MOVE_DATA = 'LOOP_MOVE_DATA',
  JUMP_IF_DATA_ZERO = 'JUMP_IF_DATA_ZERO',
  JUMP_IF_DATA_NOT_ZERO = 'JUMP_IF_DATA_NOT_ZERO',
  RESET_DATA_RANGE = 'RESET_DATA_RANGE',
  SET_DATA = 'SET_DATA',
  DATA_LOOP = 'DATA_LOOP',
  DATA_LOOP_ADD = 'DATA_LOOP_ADD',
  DATA_LOOP_SUB = 'DATA_LOOP_SUB',
  DATA_LOOP_END = 'DATA_LOOP_END',
};

export { OpKind };

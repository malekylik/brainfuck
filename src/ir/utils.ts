import { OpKind } from './opcode-kinds';
import { Opcode } from './opcode';
import { BrainfuckAplh } from './brainfuck-alph';

export function opKindToChar(opKind: OpKind) : string{
  switch (opKind) {
    case OpKind.INC_PTR:
      return BrainfuckAplh.MovePtrForward;
    case OpKind.DEC_PTR:
      return BrainfuckAplh.MovePtrBackward;
    case OpKind.INC_DATA:
      return BrainfuckAplh.IncreaseCell;
    case OpKind.DEC_DATA:
      return BrainfuckAplh.DecreaseCell;
    case OpKind.READ_STDIN:
      return BrainfuckAplh.GetChar;
    case OpKind.WRITE_STDOUT:
      return BrainfuckAplh.PutChar;
    case OpKind.JUMP_IF_DATA_ZERO:
      return BrainfuckAplh.StartLoop;
    case OpKind.JUMP_IF_DATA_NOT_ZERO:
      return BrainfuckAplh.EndLoop;
    case OpKind.LOOP_SET_TO_ZERO:
      return "s";
    case OpKind.LOOP_MOVE_PTR:
      return "m";
    case OpKind.LOOP_MOVE_DATA:
      return "d";
    case OpKind.INVALID_OP:
      return "x";
  }

  return 'unknown';
}

export function serializeOpcode(opcode: Opcode): string {
  return `${opKindToChar(opcode.kind)}${opcode.argument}`;
}


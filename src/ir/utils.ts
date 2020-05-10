import { OpKind } from './opcode-kinds';
import { Opcode } from './opcode';

export function opKindToChar(opKind: OpKind) : string{
  switch (opKind) {
    case OpKind.INC_PTR:
      return ">";
    case OpKind.DEC_PTR:
      return "<";
    case OpKind.INC_DATA:
      return "+";
    case OpKind.DEC_DATA:
      return "-";
    case OpKind.READ_STDIN:
      return ",";
    case OpKind.WRITE_STDOUT:
      return ".";
    case OpKind.JUMP_IF_DATA_ZERO:
      return "[";
    case OpKind.JUMP_IF_DATA_NOT_ZERO:
      return "]";
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


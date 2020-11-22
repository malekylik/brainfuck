import { OpKind } from './opcode-kinds';

type OpcodeLoc = {
  start: number;
  end: number;
  line: number;
};

export type Opcode = {
  kind: OpKind,
  argument: number,
  loc: OpcodeLoc,
}

export function createOpcode(opKind: OpKind, argument: number, loc: OpcodeLoc): Opcode {
  return {
    kind: opKind,
    argument,
    loc,
  };
}

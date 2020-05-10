import { OpKind } from './opcode-kinds';

export type Opcode = {
  kind: OpKind,
  argument: number,
}

export function createOpcode(opKind: OpKind, argument: number): Opcode {
  return {
    kind: opKind,
    argument,
  };
}

import { OpKind } from './opcode-kinds';

export type OpcodeLoc = {
  start: number;
  end: number;
  line: number;
};

export type SimpleOpcode = {
  kind: OpKind,
  argument: number,
  loc: OpcodeLoc,
}

export type FuncOpcode = {
  kind: OpKind.RUN_FUNC,
  func: Function,
  argument: number,
  name: string,
  loc: OpcodeLoc,
}

export type Opcode = SimpleOpcode | FuncOpcode;

export function createOpcode(opKind: OpKind, argument: number, loc: OpcodeLoc): Opcode {
  return {
    kind: opKind,
    argument,
    loc,
  };
}

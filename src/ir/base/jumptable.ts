import { Opcode } from 'ir/opcode';
import { OpKind } from 'ir/opcode-kinds';

export function path_jumptable(ops: Array<Opcode>): void {
  let pc = 0;
  let program_size = ops.length;

  while (pc < program_size) {
    const instruction = ops[pc];

    if (instruction.kind === OpKind.JUMP_IF_DATA_ZERO || instruction.kind === OpKind.DATA_LOOP) {
      let bracket_nesting = 1;
      let seek = pc;

      while (bracket_nesting && ++seek < program_size) {
        if (ops[seek].kind === OpKind.JUMP_IF_DATA_NOT_ZERO || ops[seek].kind === OpKind.DATA_LOOP_END) {
          bracket_nesting--;
        } else if (ops[seek].kind == OpKind.JUMP_IF_DATA_ZERO || ops[seek].kind === OpKind.DATA_LOOP) {
          bracket_nesting++;
        }
      }

      if (!bracket_nesting) {
        ops[seek].argument = pc;
        ops[pc].argument = seek;
      } else {
        console.warn(`unmatched '[' at pc=${pc}`);
      }

    }

    pc++;
  }
}

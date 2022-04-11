import { Opcode } from 'ir/opcode';

export interface ModuleExports {
  run: () => void | Array<Opcode>,
}

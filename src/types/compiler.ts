import { ModuleExports } from 'compiler/web-assembler/types/compiler';

export interface CompiledModule {
  module: ModuleExports,
  memory: WebAssembly.Memory | Uint8Array,
}

export type InputFunction = () => string;
export type OutputFunction = (v: number) => void;

import { OpKind } from 'ir/opcode-kinds';
import { Opcode } from 'ir/opcode';
import { opKindToChar } from 'ir/utils';
import { CompiledModule, InputFunction, OutputFunction } from 'types/compiler';
import { emitter, Valtype, Opcodes } from './emitter';
import { unsignedLEB128, signedLEB128 } from './encoding';
import { TextCoder } from 'utils/text-coder';
import { Ast, Nodes, ParseSymbol } from 'ir/ast/ast';
import { compileFromOpcodeToWasm } from './compiler-to-bin';
import { compileToWat } from './compiler-to-wat';

function getWasmModule(wasm: Uint8Array, inF: InputFunction, outF: OutputFunction): Promise<CompiledModule> {
  const memory = new WebAssembly.Memory({ initial: 1 });

  const instance = WebAssembly.instantiate(wasm, {
    env: {
      inF,
      print: outF,
      memory
    }
  });

  return instance.then(module => ({
    module: { run: () => { (module.instance.exports as any).run(); } },
    memory,
  }));
}

function compileFromWatToWasm(compileWatToWasm: (s: string) => Uint8Array, ops: Ast, inF: InputFunction, outF: OutputFunction): Promise<CompiledModule> {
  const code = compileToWat(ops);
  const wasm = compileWatToWasm(code);

  return getWasmModule(wasm, inF, outF);
}

function compile_prod(ops: Ast, inF: InputFunction, outF: OutputFunction): Promise<CompiledModule> {
  const wasm = compileFromOpcodeToWasm(ops);

  return getWasmModule(wasm, inF, outF);
}

const compile = compile_prod;

export { compile, compileToWat, compileFromWatToWasm };


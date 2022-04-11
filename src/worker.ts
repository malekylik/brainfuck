import { parse_from_stream } from './utils/parser';
import { translate_ast_to_opcodes, translate_program, translate_program_to_ast } from 'ir/parser';
import { OptimizationKind } from 'ir/optimization-kinds';
import { interpret as baseInterpret } from 'interpreter/base-interpreter';
import { interpret as InterpretWithJumptable } from 'interpreter/interpreter-with-jump';
import { interpret as InterpretJIT } from 'interpreter/jit-interpreter';
import { interpret as OptimizedInterpret } from 'interpreter/interpreter';
import { compile as compileJS, compileToJS } from 'compiler/js/compiler';
import { compile as compileAsmJS, compileToAsmJS } from 'compiler/asmjs/compiler';
import { compile as compileWasm, compileToWat, compileFromWatToWasm } from 'compiler/web-assembler/compiler';
import { WorkerEvent } from 'consts/worker';
import { WorkerMessage } from 'types/worker';
import { BrainfuckMode } from 'consts/mode';
import { getCompileWatToWasm } from 'compiler/web-assembler/wat2wasm';
import { converOpcodesToCode } from 'utils/opcodes-to-code';
import { CompiledModule } from 'types/compiler';

let prevFrame = 0;
let lastFrame = 0;
let stringToSend = '';

function inF(): string {
  return prompt('enter value');
}

function outF(v: number): void {
  lastFrame = (performance.now() / 16) | 0;

  if (prevFrame !== lastFrame) {
    self.postMessage({ type: WorkerEvent.out, data: { value: stringToSend } });

    prevFrame = lastFrame;
    stringToSend = String.fromCharCode(v) ?? '';
  } else {
    stringToSend = stringToSend + String.fromCharCode(v);
  }
}

(self as any)[inF.name] = inF;
(self as any)[outF.name] = outF;

let compileFromWatToWasmBin: (wat: string) => Uint8Array;

let jitGeneratedCode = '';

self.addEventListener('message', (e) => {
  const message: WorkerMessage = e.data;

  if (message.type === WorkerEvent.start) {
    const { mode, src, threashold } = message.data;
    const tokens = parse_from_stream(src);
    const time = {
      compileTime: 0,
      runTime: 0,
    };
    let modulePromise: Promise<CompiledModule> = null;

    let now = performance.now();

    if (mode === BrainfuckMode.InterpretateBase || mode === BrainfuckMode.InterpretWithJumptable) {
      let compile = null;

      switch (mode) {
        case BrainfuckMode.InterpretateBase: compile = baseInterpret; break;
        case BrainfuckMode.InterpretWithJumptable: compile = InterpretWithJumptable; break;
      }

      modulePromise = compile(tokens, inF, outF);
    }

    if (
      mode === BrainfuckMode.InterpretWithIR ||
      mode === BrainfuckMode.CompileJavaScript ||
      mode === BrainfuckMode.CompileAsmJavaScript ||
      mode === BrainfuckMode.CompileWebAssembly ||
      mode === BrainfuckMode.InterpretWithJIT
    ) {
      switch (mode) {
        case BrainfuckMode.InterpretWithIR: {
          const ops = translate_program(tokens, OptimizationKind.C2);
          modulePromise = OptimizedInterpret(ops, inF, outF);
          break;
        }
        case BrainfuckMode.InterpretWithJIT: {
          jitGeneratedCode = '';

          const ast = translate_program_to_ast(tokens, OptimizationKind.C2);
          const ops = translate_ast_to_opcodes(ast);

          modulePromise = InterpretJIT(ops, inF, outF, threashold);
          break;
        }
        case BrainfuckMode.CompileJavaScript: {
          const ops = translate_program_to_ast(tokens, OptimizationKind.C2);
          modulePromise = compileJS(ops, inF, outF);
          break;
        }
        case BrainfuckMode.CompileAsmJavaScript: {
          const ops = translate_program_to_ast(tokens, OptimizationKind.C2);
          modulePromise = compileAsmJS(ops, inF, outF);
          break;
        }
        case BrainfuckMode.CompileWebAssembly: {
          const ops = translate_program_to_ast(tokens, OptimizationKind.C2);
          modulePromise = compileWasm(ops, inF, outF);
          // modulePromise = compileFromWatToWasm(compileFromWatToWasmBin, ops, inF, outF);
          break;
        }
      }
    }

    modulePromise.then(({ module, memory }) => {
      time.compileTime = performance.now() - now;

      now = performance.now();
      console.log(`start at ${now}`);
      const res = module.run();

      if (stringToSend !== '') {
        self.postMessage({ type: WorkerEvent.out, data: { value: stringToSend } }); // send the rest
        stringToSend = '';
      }

      console.log('memory', memory);

      const end = performance.now();

      console.log(`end at ${end}`);

      time.runTime = end - now;

      if (res) {
        jitGeneratedCode = converOpcodesToCode(res);
      }

      self.postMessage({ type: WorkerEvent.end, data: { time, mode } });
    }).catch((e) => {
      console.log('worker: error during running', e);

      stringToSend = '';

      const end = performance.now();

      console.log(`end at ${end}`);

      time.runTime = end - now;

      self.postMessage({ type: WorkerEvent.end, data: { time, mode } });
    });
  }

  if (message.type === WorkerEvent.setWat2Wasm) {
    const compileWatToWasmBlob = message.data.compileWatToWasm;

    getCompileWatToWasm(compileWatToWasmBlob).then(f => compileFromWatToWasmBin = f)
      .catch(e => {
        console.log('Error to compile getCompileWatToWasm ', e);
      });
  }

  if (message.type === WorkerEvent.getGeneratedCode) {
    const { mode, src } = message.data;
    const tokens = parse_from_stream(src);
    let compiled = '';

    switch (mode) {
      case BrainfuckMode.CompileJavaScript: {
        const ops = translate_program_to_ast(tokens, OptimizationKind.C2);
        compiled = compileToJS(ops, inF, outF);
        break;
      }
      case BrainfuckMode.CompileAsmJavaScript: {
        const ops = translate_program_to_ast(tokens, OptimizationKind.C2);
        compiled = compileToAsmJS(ops, inF, outF);
        break;
      }
      case BrainfuckMode.CompileWebAssembly: {
        const ops = translate_program_to_ast(tokens, OptimizationKind.C2);
        compiled = compileToWat(ops);
        break;
      }
      case BrainfuckMode.InterpretWithJIT: {
        if (jitGeneratedCode === '') {
          const ast = translate_program_to_ast(tokens, OptimizationKind.C2);
          const ops = translate_ast_to_opcodes(ast);

          compiled = converOpcodesToCode(ops);
        } else {
          compiled = jitGeneratedCode;
        }

        break;
      }
    }

    self.postMessage({ type: WorkerEvent.getGeneratedCode, data: { mode, src: compiled } });
  }
});

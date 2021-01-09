import fs from 'fs';
import path from 'path';

import { promisify } from 'util';

import { translate_program_to_ast } from 'ir/parser';
import { parse_from_stream } from 'utils/parser';
import { OptimizationKind } from 'ir/optimization-kinds';
import { compile, compileFromWatToWasm } from 'compiler/web-assembler/compiler';
import { getCompileWatToWasmFromBin } from 'D:/others/frontend/workspace/brainfuck/src/compiler/web-assembler/wat2wasm';
import { ioin, getIOOut } from '../mock';
import {
  mandelbrot_answer, yapi_answer,
  hellom_answer, beer_answer, char_answer,
  pi_answer, trinagle_answer,
  oobrain_answer,
} from '../data/bf_answers';
import {
  mandelbrot_src, yapi_src,
  hellom_src, beer_src, char_src,
  pi_src, trianlge_src,
  oobrain_src,
} from '../data/bf_programs';
import { Ast } from 'ir/ast/ast';
import { InputFunction, OutputFunction } from 'types/compiler';

const readFileAsync = promisify(fs.readFile);

describe('WebAssembly compiler', () => {
  describe('compileWasm', () => {
    describe('C0', () => {
      it('triangle', async () => {
        const fStr = getIOOut();
        const tokens = parse_from_stream(trianlge_src);
        const ops = translate_program_to_ast(tokens, OptimizationKind.C0);
        const modulePromise = await compile(ops, ioin, fStr);

        modulePromise.module.run();

        expect(fStr.str).toBe(trinagle_answer);
      });

      it('oobrain', async () => {
        const fStr = getIOOut();
        const tokens = parse_from_stream(oobrain_src);
        const ops = translate_program_to_ast(tokens, OptimizationKind.C0);
        const modulePromise = await compile(ops, ioin, fStr);

        modulePromise.module.run();

        expect(fStr.str).toBe(oobrain_answer);
      });

      it('pi', async () => {
        const fStr = getIOOut();
        const tokens = parse_from_stream(pi_src);
        const ops = translate_program_to_ast(tokens, OptimizationKind.C0);
        const modulePromise = await compile(ops, ioin, fStr);

        modulePromise.module.run();

        expect(fStr.str).toBe(pi_answer);
      });

      it('char', async () => {
        const fStr = getIOOut();
        const tokens = parse_from_stream(char_src);
        const ops = translate_program_to_ast(tokens, OptimizationKind.C0);
        const modulePromise = await compile(ops, ioin, fStr);

        modulePromise.module.run();

        expect(fStr.str).toBe(char_answer);
      });

      it('beer', async () => {
        const fStr = getIOOut();
        const tokens = parse_from_stream(beer_src);
        const ops = translate_program_to_ast(tokens, OptimizationKind.C0);
        const modulePromise = await compile(ops, ioin, fStr);

        modulePromise.module.run();

        expect(fStr.str).toBe(beer_answer);
      });

      it('hellom', async () => {
        const fStr = getIOOut();
        const tokens = parse_from_stream(hellom_src);
        const ops = translate_program_to_ast(tokens, OptimizationKind.C0);
        const modulePromise = await compile(ops, ioin, fStr);

        modulePromise.module.run();

        expect(fStr.str).toBe(hellom_answer);
      });

      it('yapi', async () => {
        const fStr = getIOOut();
        const tokens = parse_from_stream(yapi_src);
        const ops = translate_program_to_ast(tokens, OptimizationKind.C0);
        const modulePromise = await compile(ops, ioin, fStr);

        modulePromise.module.run();

        expect(fStr.str).toBe(yapi_answer);
      });

      it('mandelbrot', async () => {
        const fStr = getIOOut();
        const tokens = parse_from_stream(mandelbrot_src);
        const ops = translate_program_to_ast(tokens, OptimizationKind.C0);
        const modulePromise = await compile(ops, ioin, fStr);

        modulePromise.module.run();

        expect(fStr.str).toBe(mandelbrot_answer);
      });
    });

    describe('C1', () => {
      it('triangle', async () => {
        const fStr = getIOOut();
        const tokens = parse_from_stream(trianlge_src);
        const ops = translate_program_to_ast(tokens, OptimizationKind.C1);
        const modulePromise = await compile(ops, ioin, fStr);

        modulePromise.module.run();

        expect(fStr.str).toBe(trinagle_answer);
      });

      it('oobrain', async () => {
        const fStr = getIOOut();
        const tokens = parse_from_stream(oobrain_src);
        const ops = translate_program_to_ast(tokens, OptimizationKind.C1);
        const modulePromise = await compile(ops, ioin, fStr);

        modulePromise.module.run();

        expect(fStr.str).toBe(oobrain_answer);
      });

      it('pi', async () => {
        const fStr = getIOOut();
        const tokens = parse_from_stream(pi_src);
        const ops = translate_program_to_ast(tokens, OptimizationKind.C1);
        const modulePromise = await compile(ops, ioin, fStr);

        modulePromise.module.run();

        expect(fStr.str).toBe(pi_answer);
      });

      it('char', async () => {
        const fStr = getIOOut();
        const tokens = parse_from_stream(char_src);
        const ops = translate_program_to_ast(tokens, OptimizationKind.C1);
        const modulePromise = await compile(ops, ioin, fStr);

        modulePromise.module.run();

        expect(fStr.str).toBe(char_answer);
      });

      it('beer', async () => {
        const fStr = getIOOut();
        const tokens = parse_from_stream(beer_src);
        const ops = translate_program_to_ast(tokens, OptimizationKind.C1);
        const modulePromise = await compile(ops, ioin, fStr);

        modulePromise.module.run();

        expect(fStr.str).toBe(beer_answer);
      });

      it('hellom', async () => {
        const fStr = getIOOut();
        const tokens = parse_from_stream(hellom_src);
        const ops = translate_program_to_ast(tokens, OptimizationKind.C1);
        const modulePromise = await compile(ops, ioin, fStr);

        modulePromise.module.run();

        expect(fStr.str).toBe(hellom_answer);
      });

      it('yapi', async () => {
        const fStr = getIOOut();
        const tokens = parse_from_stream(yapi_src);
        const ops = translate_program_to_ast(tokens, OptimizationKind.C1);
        const modulePromise = await compile(ops, ioin, fStr);

        modulePromise.module.run();

        expect(fStr.str).toBe(yapi_answer);
      });

      it('mandelbrot', async () => {
        const fStr = getIOOut();
        const tokens = parse_from_stream(mandelbrot_src);
        const ops = translate_program_to_ast(tokens, OptimizationKind.C1);
        const modulePromise = await compile(ops, ioin, fStr);

        modulePromise.module.run();

        expect(fStr.str).toBe(mandelbrot_answer);
      });
    });

    describe('C2', () => {
      it('triangle', async () => {
        const fStr = getIOOut();
        const tokens = parse_from_stream(trianlge_src);
        const ops = translate_program_to_ast(tokens, OptimizationKind.C2);
        const modulePromise = await compile(ops, ioin, fStr);

        modulePromise.module.run();

        expect(fStr.str).toBe(trinagle_answer);
      });

      it('oobrain', async () => {
        const fStr = getIOOut();
        const tokens = parse_from_stream(oobrain_src);
        const ops = translate_program_to_ast(tokens, OptimizationKind.C2);
        const modulePromise = await compile(ops, ioin, fStr);

        modulePromise.module.run();

        expect(fStr.str).toBe(oobrain_answer);
      });

      it('pi', async () => {
        const fStr = getIOOut();
        const tokens = parse_from_stream(pi_src);
        const ops = translate_program_to_ast(tokens, OptimizationKind.C2);
        const modulePromise = await compile(ops, ioin, fStr);

        modulePromise.module.run();

        expect(fStr.str).toBe(pi_answer);
      });

      it('char', async () => {
        const fStr = getIOOut();
        const tokens = parse_from_stream(char_src);
        const ops = translate_program_to_ast(tokens, OptimizationKind.C2);
        const modulePromise = await compile(ops, ioin, fStr);

        modulePromise.module.run();

        expect(fStr.str).toBe(char_answer);
      });

      it('beer', async () => {
        const fStr = getIOOut();
        const tokens = parse_from_stream(beer_src);
        const ops = translate_program_to_ast(tokens, OptimizationKind.C2);
        const modulePromise = await compile(ops, ioin, fStr);

        modulePromise.module.run();

        expect(fStr.str).toBe(beer_answer);
      });

      it('hellom', async () => {
        const fStr = getIOOut();
        const tokens = parse_from_stream(hellom_src);
        const ops = translate_program_to_ast(tokens, OptimizationKind.C2);
        const modulePromise = await compile(ops, ioin, fStr);

        modulePromise.module.run();

        expect(fStr.str).toBe(hellom_answer);
      });

      it('yapi', async () => {
        const fStr = getIOOut();
        const tokens = parse_from_stream(yapi_src);
        const ops = translate_program_to_ast(tokens, OptimizationKind.C2);
        const modulePromise = await compile(ops, ioin, fStr);

        modulePromise.module.run();

        expect(fStr.str).toBe(yapi_answer);
      });

      it('mandelbrot', async () => {
        const fStr = getIOOut();
        const tokens = parse_from_stream(mandelbrot_src);
        const ops = translate_program_to_ast(tokens, OptimizationKind.C2);
        const modulePromise = await compile(ops, ioin, fStr);

        modulePromise.module.run();

        expect(fStr.str).toBe(mandelbrot_answer);
      });
    });
  });

  describe('compileFromWatToWasm', () => {
    const moduleBinPath = path.resolve(__dirname, '..', '..', 'src', 'wat2wasm_c', 'wat2wasm.wasm')
    let compile = null;

    beforeAll(async () => {
      const buffer = await readFileAsync(moduleBinPath);
      const compileBin = await getCompileWatToWasmFromBin(buffer);

      compile = (ops: Ast, inF: InputFunction, outF: OutputFunction) => compileFromWatToWasm(compileBin, ops, inF, outF);
    });

    describe('C0', () => {
      it('triangle', async () => {
        const fStr = getIOOut();
        const tokens = parse_from_stream(trianlge_src);
        const ops = translate_program_to_ast(tokens, OptimizationKind.C0);
        const modulePromise = await compile(ops, ioin, fStr);

        modulePromise.module.run();

        expect(fStr.str).toBe(trinagle_answer);
      });

      it('oobrain', async () => {
        const fStr = getIOOut();
        const tokens = parse_from_stream(oobrain_src);
        const ops = translate_program_to_ast(tokens, OptimizationKind.C0);
        const modulePromise = await compile(ops, ioin, fStr);

        modulePromise.module.run();

        expect(fStr.str).toBe(oobrain_answer);
      });

      it('pi', async () => {
        const fStr = getIOOut();
        const tokens = parse_from_stream(pi_src);
        const ops = translate_program_to_ast(tokens, OptimizationKind.C0);
        const modulePromise = await compile(ops, ioin, fStr);

        modulePromise.module.run();

        expect(fStr.str).toBe(pi_answer);
      });

      it('char', async () => {
        const fStr = getIOOut();
        const tokens = parse_from_stream(char_src);
        const ops = translate_program_to_ast(tokens, OptimizationKind.C0);
        const modulePromise = await compile(ops, ioin, fStr);

        modulePromise.module.run();

        expect(fStr.str).toBe(char_answer);
      });

      it('beer', async () => {
        const fStr = getIOOut();
        const tokens = parse_from_stream(beer_src);
        const ops = translate_program_to_ast(tokens, OptimizationKind.C0);
        const modulePromise = await compile(ops, ioin, fStr);

        modulePromise.module.run();

        expect(fStr.str).toBe(beer_answer);
      });

      it('hellom', async () => {
        const fStr = getIOOut();
        const tokens = parse_from_stream(hellom_src);
        const ops = translate_program_to_ast(tokens, OptimizationKind.C0);
        const modulePromise = await compile(ops, ioin, fStr);

        modulePromise.module.run();

        expect(fStr.str).toBe(hellom_answer);
      });

      it('yapi', async () => {
        const fStr = getIOOut();
        const tokens = parse_from_stream(yapi_src);
        const ops = translate_program_to_ast(tokens, OptimizationKind.C0);
        const modulePromise = await compile(ops, ioin, fStr);

        modulePromise.module.run();

        expect(fStr.str).toBe(yapi_answer);
      });

      it('mandelbrot', async () => {
        const fStr = getIOOut();
        const tokens = parse_from_stream(mandelbrot_src);
        const ops = translate_program_to_ast(tokens, OptimizationKind.C0);
        const modulePromise = await compile(ops, ioin, fStr);

        modulePromise.module.run();

        expect(fStr.str).toBe(mandelbrot_answer);
      });
    });

    describe('C1', () => {
      it('triangle', async () => {
        const fStr = getIOOut();
        const tokens = parse_from_stream(trianlge_src);
        const ops = translate_program_to_ast(tokens, OptimizationKind.C1);
        const modulePromise = await compile(ops, ioin, fStr);

        modulePromise.module.run();

        expect(fStr.str).toBe(trinagle_answer);
      });

      it('oobrain', async () => {
        const fStr = getIOOut();
        const tokens = parse_from_stream(oobrain_src);
        const ops = translate_program_to_ast(tokens, OptimizationKind.C1);
        const modulePromise = await compile(ops, ioin, fStr);

        modulePromise.module.run();

        expect(fStr.str).toBe(oobrain_answer);
      });

      it('pi', async () => {
        const fStr = getIOOut();
        const tokens = parse_from_stream(pi_src);
        const ops = translate_program_to_ast(tokens, OptimizationKind.C1);
        const modulePromise = await compile(ops, ioin, fStr);

        modulePromise.module.run();

        expect(fStr.str).toBe(pi_answer);
      });

      it('char', async () => {
        const fStr = getIOOut();
        const tokens = parse_from_stream(char_src);
        const ops = translate_program_to_ast(tokens, OptimizationKind.C1);
        const modulePromise = await compile(ops, ioin, fStr);

        modulePromise.module.run();

        expect(fStr.str).toBe(char_answer);
      });

      it('beer', async () => {
        const fStr = getIOOut();
        const tokens = parse_from_stream(beer_src);
        const ops = translate_program_to_ast(tokens, OptimizationKind.C1);
        const modulePromise = await compile(ops, ioin, fStr);

        modulePromise.module.run();

        expect(fStr.str).toBe(beer_answer);
      });

      it('hellom', async () => {
        const fStr = getIOOut();
        const tokens = parse_from_stream(hellom_src);
        const ops = translate_program_to_ast(tokens, OptimizationKind.C1);
        const modulePromise = await compile(ops, ioin, fStr);

        modulePromise.module.run();

        expect(fStr.str).toBe(hellom_answer);
      });

      it('yapi', async () => {
        const fStr = getIOOut();
        const tokens = parse_from_stream(yapi_src);
        const ops = translate_program_to_ast(tokens, OptimizationKind.C1);
        const modulePromise = await compile(ops, ioin, fStr);

        modulePromise.module.run();

        expect(fStr.str).toBe(yapi_answer);
      });

      it('mandelbrot', async () => {
        const fStr = getIOOut();
        const tokens = parse_from_stream(mandelbrot_src);
        const ops = translate_program_to_ast(tokens, OptimizationKind.C1);
        const modulePromise = await compile(ops, ioin, fStr);

        modulePromise.module.run();

        expect(fStr.str).toBe(mandelbrot_answer);
      });
    });

    describe('C2', () => {
      it('triangle', async () => {
        const fStr = getIOOut();
        const tokens = parse_from_stream(trianlge_src);
        const ops = translate_program_to_ast(tokens, OptimizationKind.C2);
        const modulePromise = await compile(ops, ioin, fStr);

        modulePromise.module.run();

        expect(fStr.str).toBe(trinagle_answer);
      });

      it('oobrain', async () => {
        const fStr = getIOOut();
        const tokens = parse_from_stream(oobrain_src);
        const ops = translate_program_to_ast(tokens, OptimizationKind.C2);
        const modulePromise = await compile(ops, ioin, fStr);

        modulePromise.module.run();

        expect(fStr.str).toBe(oobrain_answer);
      });

      it('pi', async () => {
        const fStr = getIOOut();
        const tokens = parse_from_stream(pi_src);
        const ops = translate_program_to_ast(tokens, OptimizationKind.C2);
        const modulePromise = await compile(ops, ioin, fStr);

        modulePromise.module.run();

        expect(fStr.str).toBe(pi_answer);
      });

      it('char', async () => {
        const fStr = getIOOut();
        const tokens = parse_from_stream(char_src);
        const ops = translate_program_to_ast(tokens, OptimizationKind.C2);
        const modulePromise = await compile(ops, ioin, fStr);

        modulePromise.module.run();

        expect(fStr.str).toBe(char_answer);
      });

      it('beer', async () => {
        const fStr = getIOOut();
        const tokens = parse_from_stream(beer_src);
        const ops = translate_program_to_ast(tokens, OptimizationKind.C2);
        const modulePromise = await compile(ops, ioin, fStr);

        modulePromise.module.run();

        expect(fStr.str).toBe(beer_answer);
      });

      it('hellom', async () => {
        const fStr = getIOOut();
        const tokens = parse_from_stream(hellom_src);
        const ops = translate_program_to_ast(tokens, OptimizationKind.C2);
        const modulePromise = await compile(ops, ioin, fStr);

        modulePromise.module.run();

        expect(fStr.str).toBe(hellom_answer);
      });

      it('yapi', async () => {
        const fStr = getIOOut();
        const tokens = parse_from_stream(yapi_src);
        const ops = translate_program_to_ast(tokens, OptimizationKind.C2);
        const modulePromise = await compile(ops, ioin, fStr);

        modulePromise.module.run();

        expect(fStr.str).toBe(yapi_answer);
      });

      it('mandelbrot', async () => {
        const fStr = getIOOut();
        const tokens = parse_from_stream(mandelbrot_src);
        const ops = translate_program_to_ast(tokens, OptimizationKind.C2);
        const modulePromise = await compile(ops, ioin, fStr);

        modulePromise.module.run();

        expect(fStr.str).toBe(mandelbrot_answer);
      });
    });
  });
});

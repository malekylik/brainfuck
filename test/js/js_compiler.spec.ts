import { translate_program_to_ast } from 'ir/parser';
import { parse_from_stream } from 'utils/parser';
import { OptimizationKind } from 'ir/optimization-kinds';
import { compile as compileJS } from 'compiler/js/compiler';
import { ioin, getIOOut } from '../mock';
import { mandelbrot_answer, yapi_answer, hellom_answer } from '../data/bf_answers';
import { mandelbrot_src, yapi_src, hellom_src } from '../data/bf_programs';

describe('JS compiler', () => {
  describe('C2', () => {
    it('hellom', async () => {
      const fStr = getIOOut();
      const tokens = parse_from_stream(hellom_src);
      const ops = translate_program_to_ast(tokens, OptimizationKind.C2);
      const modulePromise = await compileJS(ops, ioin, fStr);

      modulePromise.module.run();

      expect(fStr.str).toBe(hellom_answer);
    });

    it('yapi', async () => {
      const fStr = getIOOut();
      const tokens = parse_from_stream(yapi_src);
      const ops = translate_program_to_ast(tokens, OptimizationKind.C2);
      const modulePromise = await compileJS(ops, ioin, fStr);

      modulePromise.module.run();

      expect(fStr.str).toBe(yapi_answer);
    });

    it('mandelbrot', async () => {
      const fStr = getIOOut();
      const tokens = parse_from_stream(mandelbrot_src);
      const ops = translate_program_to_ast(tokens, OptimizationKind.C2);
      const modulePromise = await compileJS(ops, ioin, fStr);

      modulePromise.module.run();

      expect(fStr.str).toBe(mandelbrot_answer);
    });
  })
});

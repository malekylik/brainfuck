import { translate_program_to_ast } from 'ir/parser';
import { parse_from_stream } from 'utils/parser';
import { OptimizationKind } from 'ir/optimization-kinds';
import { compile as compileJS } from 'compiler/js/compiler';
import { mandelbrot_answer } from './bf_answers';
import { mandelbrot_src } from './bf_programs';

function getOutFunc() {
  function f(v: number) {
    f.str += String.fromCharCode(v) ?? '';
  }

  f.str = '';

  (self as any)[f.name] = f;

  return f;
}

describe('JS compiler', () => {
  it('mandelbrot C2', async () => {
    const fStr = getOutFunc();
    const tokens = parse_from_stream(mandelbrot_src);
    const ops = translate_program_to_ast(tokens, OptimizationKind.C2);
    const modulePromise = await compileJS(ops, () => '', fStr);

    modulePromise.module.run();

    expect(fStr.str).toBe(mandelbrot_answer);
  });
});

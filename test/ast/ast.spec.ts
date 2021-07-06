import { parse_to_ast } from 'ir/ast/ast';
import { parse_to_opcodes } from 'ir/ast/translate_to_opcodes';
import { parse_from_stream } from 'utils/parser';
import { mandelbrot_src } from '../data/bf_programs';
import mandelbrot_test_data from './mandelbrot_test_data.json';

// TODO: think how to make good test
describe('AST', () => {
  it('Mandelbrot AST', () => {
    const tokens = parse_from_stream(mandelbrot_src);
    const opcodes = parse_to_opcodes(tokens);
    const ast = parse_to_ast(opcodes);

    expect(JSON.stringify(ast)).toBe(mandelbrot_test_data);
  });
});

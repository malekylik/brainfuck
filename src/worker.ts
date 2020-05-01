import { parse_from_stream } from './utils/parser';
import { translate_program } from '@ir/parser';
import { simpleinterp } from '@interpratater/interpratater';
import { compile } from '@compiler/js/compiler';

self.addEventListener('message', (e) => {
    const { type, src } = e.data;

    if (type === 'start') {
       const tokens = parse_from_stream(src);

      const ops = translate_program(tokens);

      compile(ops, 'inF', 'outF');

        // const tokens = parse_from_stream(src);

        // const ops = translate_program(tokens);

        // const now = performance.now();
        // console.log(`start at ${now}`);

        // simpleinterp(ops);

        // const end = performance.now();
        // console.log(`end at ${end}`);
        // console.log(`done in: ${end - now}`);

        // self.postMessage({ type: 'end' });
    }
});

// parse to js = 25s
// simple intr 617673.5999999946 = 10m 17s
// intr with precomputete jump location 280830.3200000082 = 4m 41s
//    +  -->  179053599
//    [  -->  422534152
//    -  -->  177623022
//    >  -->  4.453.036.023
//    <  -->  4453036013
//    ]  -->  835818921
//    .  -->  6240
//    .. Total: 10521107970
// with opcodes 194952.01000000816 = 46.2
//    +  -->  115369640
//    [  -->  105793470
//    -  -->  107116320
//    >  -->  465.855.475
//    <  -->  338.151.728
//    ]  -->  277607115
//    m  -->  24477084
//    s  -->  46993495
//    d  -->  245270103
//    .  -->  6240
// >1 d9 <10      --> 116145344
// >2 d9 <11      --> 31339760
// +1 >9          --> 30948460
// >1 +1 >8       --> 9515168
// <1 d1 >4       --> 9017333
// >8             --> 8711811
// >1 d9 <1 +1 >8 --> 7493248
// <3 d3 <1 +1 <9 --> 5867616
// <1 d1 >3       --> 4689518
// >4 d-36 >5     --> 3845696
// with (LOOP_SET_TO_ZERO, LOOP_MOVE_PTR, LOOP_MOVE_DATA) 31564.180000015767 = 31.5s


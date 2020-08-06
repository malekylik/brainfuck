import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import ReactDOM from 'react-dom';

import App from 'components/app/app.component';

import { getCompileWatToWasm } from 'compiler/web-assembler/wat2wasm';

const code = `
(module
    (func (export "addTwo") (param i32 i32) (result i32)
      local.get 0
      local.get 1
      i32.add))
`;

getCompileWatToWasm('wat2wasm.wasm').then(func => {
  // console.log('func', func);

  const compiled = func(code);
  var memory = new WebAssembly.Memory({ initial: 1 });

  // console.log('wasm_m', compiled);

  var instance = WebAssembly.instantiate(compiled, {
    env: {
      // inF,
      // print: outF,
      // memory
    }
  });

  instance.then(module => {
  console.log(module);

  console.log('res', (module.instance.exports as any).addTwo(3, 24));

  return {
    module: { run: () => { (module.instance.exports as any).run(); } },
    memory,
  }});
})


ReactDOM.render(<App />, document.getElementById('main'));

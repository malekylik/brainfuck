import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import ReactDOM from 'react-dom';

import App from 'components/app/app.component';
import { TextCoderLegacy } from 'utils/text-coder';

ReactDOM.render(<App />, document.getElementById('main'));

const c = new TextCoderLegacy();

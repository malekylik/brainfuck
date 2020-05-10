import 'core-js/stable';
import 'regenerator-runtime/runtime';

let worker: Worker = null;

const textarea: HTMLTextAreaElement = document.getElementById('textarea') as HTMLTextAreaElement;
const outputTextArea: HTMLTextAreaElement = document.getElementById('output') as HTMLTextAreaElement;
const button: HTMLButtonElement = document.getElementById('button') as HTMLButtonElement;

async function init() {
  const workerBlob = await (await fetch('./worker.js')).blob();
  const url = URL.createObjectURL(workerBlob);
  worker = new Worker(url);

  worker.addEventListener('message', (e) => {
    const { data } = e;

    if (data.type === 'out') {
      outputTextArea.value += data.value;
    }
  
    if (data.type === 'end') {}
  })

  button.addEventListener('click', () => {
    worker.postMessage({ type: 'start', src: textarea.value });
  });
}

init();

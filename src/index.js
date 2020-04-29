let worker = null;

async function init() {
  const workerBlob = await (await fetch('./src/worker.js')).blob();
  const url = URL.createObjectURL(workerBlob);
  worker = new Worker(url);

  worker.addEventListener('message', (e) => {
    const { data } = e;

    if (data.type === 'out') {
      output.value += data.value;
    }
  
    if (data.type === 'end') {}
  })

  button.addEventListener('click', () => {
    worker.postMessage({ type: 'start', src: textarea.value });
  });
}

init();




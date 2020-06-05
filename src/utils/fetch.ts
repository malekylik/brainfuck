import { isFetchSupported } from 'consts/compatibility';

function customFetch (url: string): Promise<Response> {
  const xml = new XMLHttpRequest();

  xml.open('GET', url, true);

  return new Promise((resolve, reject) => {
    xml.responseType = 'arraybuffer';

    xml.onload = function () {
      const { response } = xml;

      console.log('onload response', response);

      const customResponse = {
        blob () {
          return Promise.resolve(new Blob([response]));
        }
      };

      resolve(customResponse as Response);
    };

    xml.onerror = function (er) {
      reject(er);
    };

    xml.send();
  });
}

const fetch = isFetchSupported ? self['fetch'] : customFetch;

console.log('isFetchSupported', isFetchSupported);

export { fetch };

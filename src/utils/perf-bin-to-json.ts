// 2 byte - ph (0 - B, 1 - E)
// 2 byte - id
// 4 byte - time
// total size - 8
// see profiling-js.visitor
const promisify = require('util').promisify;
const readFile = promisify(require('fs').readFile);
const writeFile = promisify(require('fs').writeFile);
const { createReadStream, createWriteStream } = require('fs');
const { pipeline } = require('stream');

const path = process.argv[2];

const START_OFFSET = 8;

enum ProfEntityLayout {
  phase = 0, // 2 bytes
  name = ProfEntityLayout.phase + Int16Array.BYTES_PER_ELEMENT, // 2 bytes
  timestamp = ProfEntityLayout.name + Int16Array.BYTES_PER_ELEMENT, // 4 bytes,
  size = ProfEntityLayout.timestamp + Uint32Array.BYTES_PER_ELEMENT, // total: 8 bytes
}

function effectiveAddress(address: number, multiplayer = 1, offset = 0): number {
  return address * multiplayer + offset;
}

function getPhaseAddress(multiplayer = 1): number {
  return effectiveAddress(ProfEntityLayout.size, multiplayer, START_OFFSET + ProfEntityLayout.phase);
}

function getTimestampAddress(multiplayer = 1): number {
  return effectiveAddress(ProfEntityLayout.size, multiplayer, START_OFFSET + ProfEntityLayout.timestamp);
}

function getNameAddress(multiplayer = 1): number {
  return effectiveAddress(ProfEntityLayout.size, multiplayer, START_OFFSET + ProfEntityLayout.name);
}

function readFirstLine (path: string, bytes: number): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const rs: NodeJS.ReadableStream = createReadStream(path, { end: bytes });
    rs.on('data', (chunk) => {
        resolve(chunk);
      })
      .on('error', (err) => {
        reject(err);
      });
  });
}

readFirstLine(path, 64 * 1024).then((data: Buffer) => {
  const length = data.readUInt32LE(0);
  const readable: NodeJS.ReadableStream = createReadStream(path, { start: START_OFFSET });
  const writable: NodeJS.WritableStream = createWriteStream(path + '.json');
  
  writable.write('{"traceEvents":');
  
  let readed = START_OFFSET;

  readable.on('data', (b: Buffer) => {
    const arr = [];

    for (let i = 0; i < b.byteLength / ProfEntityLayout.size; i++) {
      arr.push({
        "cat": "bf",  //catagory

        "pid": 0,  //process ID

        "tid": 0, //thread ID

        "ts": b.readUInt32LE(getTimestampAddress(i) - readed), //time-stamp of this event

        "ph": b.readUInt16LE(getPhaseAddress(i) - readed) ? 'E': 'B', // Begin sample

        "name": String(b.readUInt16LE(getNameAddress(i) - readed)), //name of this event

        "args": {}
      });
    }

    writable.write(JSON.stringify(arr));
  });

  readable.on('close', () => {
    writable.write('}');
    console.log('write: ' + length + ' notes');
  });
});

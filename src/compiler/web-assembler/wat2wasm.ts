// The Module object: Our interface to the outside world. We import
// and export values on it. There are various ways Module can be used:
// 1. Not defined. We create it here
// 2. A function parameter, function(Module) { ..generated code.. }
// 3. pre-run appended it, var Module = {}; ..generated code..
// 4. External script tag defines var Module.
// We need to check if Module already exists (e.g. case 3 above).
// Substitution will be replaced with actual code on later stage of the build,
// this way Closure Compiler will not mangle it (e.g. case 4. above).
// Note that if you want to run closure, and also to use Module
// after the generated code, you will need to define   var Module = {};
// before the code. Then that object will be used in the code, and you
// can continue to use Module afterwards as well.

const quit_ = function (status?: number, toThrow?: ExitStatus): never {
    throw toThrow;
};

// Set up the out() and err() hooks, which are how we can print to stdout or
// stderr, respectively.
const out = console.log.bind(console);
const err = console.warn.bind(console);

// Emit code to handle expected values on the Module object. This applies Module.x
// to the proper local x. This has two benefits: first, we only emit it if it is
// expected to arrive, and second, by using a local everywhere else that can be
// minified.

let tempRet0: number = 0;
const setTempRet0 = function (value: number): void {
    tempRet0 = value;
};

// === Preamble library stuff ===

// Documentation for the public APIs defined in this file must be updated in:
//    site/source/docs/api_reference/preamble.js.rst
// A prebuilt local version of the documentation is available at:
//    site/build/text/docs/api_reference/preamble.js.txt
// You can also build docs locally as HTML or other formats in site/
// An online HTML version (which may be of a different version of Emscripten)
//    is up at http://kripken.github.io/emscripten-site/docs/api_reference/preamble.js.html

function getValue(ptr: number, type: string): number {
    type = type || 'i8';
    if (type.charAt(type.length - 1) === '*') type = 'i32'; // pointers are 32-bit
    switch (type) {
        case 'i1': return HEAP8[((ptr) >> 0)];
        case 'i8': return HEAP8[((ptr) >> 0)];
        case 'i16': return HEAP16[((ptr) >> 1)];
        case 'i32': return HEAP32[((ptr) >> 2)];
        case 'i64': return HEAP32[((ptr) >> 2)];
        case 'float': return HEAPF32[((ptr) >> 2)];
        case 'double': return HEAPF64[((ptr) >> 3)];
        default: abort('invalid type for getValue: ' + type);
    }
    return null;
}


//========================================
// Runtime essentials
//========================================

// runtime_strings.js: Strings related runtime functions that are part of both MINIMAL_RUNTIME and regular runtime.

// Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the given array that contains uint8 values, returns
// a copy of that string as a Javascript String object.

const UTF8Decoder = typeof TextDecoder !== 'undefined' ? new TextDecoder('utf8') : undefined;

function UTF8ArrayToString(heap: Uint8Array | Int8Array, idx: number, maxBytesToRead?: number): string {
    let endIdx = idx + maxBytesToRead;
    let endPtr = idx;
    // TextDecoder needs to know the byte length in advance, it doesn't stop on null terminator by itself.
    // Also, use the length info to avoid running tiny strings through TextDecoder, since .subarray() allocates garbage.
    // (As a tiny code save trick, compare endPtr against endIdx using a negation, so that undefined means Infinity)
    while (heap[endPtr] && !(endPtr >= endIdx)) ++endPtr;

    if (endPtr - idx > 16 && heap.subarray && UTF8Decoder) {
        return UTF8Decoder.decode(heap.subarray(idx, endPtr));
    } else {
        let str = '';
        // If building with TextDecoder, we have already computed the string length above, so test loop end condition against that
        while (idx < endPtr) {
            // For UTF8 byte structure, see:
            // http://en.wikipedia.org/wiki/UTF-8#Description
            // https://www.ietf.org/rfc/rfc2279.txt
            // https://tools.ietf.org/html/rfc3629
            let u0 = heap[idx++];
            if (!(u0 & 0x80)) { str += String.fromCharCode(u0); continue; }
            const u1 = heap[idx++] & 63;
            if ((u0 & 0xE0) == 0xC0) { str += String.fromCharCode(((u0 & 31) << 6) | u1); continue; }
            const u2 = heap[idx++] & 63;
            if ((u0 & 0xF0) == 0xE0) {
                u0 = ((u0 & 15) << 12) | (u1 << 6) | u2;
            } else {
                if ((u0 & 0xF8) != 0xF0) warnOnce('Invalid UTF-8 leading byte 0x' + u0.toString(16) + ' encountered when deserializing a UTF-8 string on the asm.js/wasm heap to a JS string!');
                u0 = ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | (heap[idx++] & 63);
            }

            if (u0 < 0x10000) {
                str += String.fromCharCode(u0);
            } else {
                const ch = u0 - 0x10000;
                str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
            }
        }
        return str;
    }
}

// Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the emscripten HEAP, returns a
// copy of that string as a Javascript String object.
// maxBytesToRead: an optional length that specifies the maximum number of bytes to read. You can omit
//                 this parameter to scan the string until the first \0 byte. If maxBytesToRead is
//                 passed, and the string at [ptr, ptr+maxBytesToReadr[ contains a null byte in the
//                 middle, then the string will cut short at that byte index (i.e. maxBytesToRead will
//                 not produce a string of exact length [ptr, ptr+maxBytesToRead[)
//                 N.B. mixing frequent uses of UTF8ToString() with and without maxBytesToRead may
//                 throw JS JIT optimizations off, so it is worth to consider consistently using one
//                 style or the other.
/**
 */
function UTF8ToString(ptr: number, maxBytesToRead?: number): string {
    return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : '';
}

let HEAP;
/** @type {ArrayBuffer} */
let buffer: ArrayBuffer;
/** @type {Int8Array} */
let HEAP8: Int8Array;
/** @type {Uint8Array} */
let HEAPU8: Uint8Array;
/** @type {Int16Array} */
let HEAP16: Int16Array;
/** @type {Uint16Array} */
let HEAPU16: Uint16Array;
/** @type {Int32Array} */
let HEAP32: Int32Array;
/** @type {Uint32Array} */
let HEAPU32: Uint32Array;
/** @type {Float32Array} */
let HEAPF32: Float32Array;
/** @type {Float64Array} */
let HEAPF64: Float64Array;

// Endianness check (note: assumes compiler arch was little-endian)
(function () {
    const h16 = new Int16Array(1);
    const h8 = new Int8Array(h16.buffer);
    h16[0] = 0x6373;
    if (h8[0] !== 0x73 || h8[1] !== 0x63) throw 'Runtime error: expected the system to be little-endian!';
})();

const Math_ceil = Math.ceil;

function abort(what?: string | number): void {
    what += '';
    err(what);

    const output = 'abort(' + what + ') at ' + stackTrace();
    what = output;

    // Use a wasm runtime error, because a JS error might be seen as a foreign
    // exception, which means we'd run destructors on it. We need the error to
    // simply make the program stop.
    const e = new (WebAssembly as any).RuntimeError(what);

    // Throw the error whether or not MODULARIZE is set because abort is used
    // in code paths apart from instantiation where an exception is expected
    // to be thrown when abort is called.
    throw e;
}

// Globals used by JS i64 conversions
let tempDouble;
let tempI64;

function demangle(func: string) {
    warnOnce('warning: build with  -s DEMANGLE_SUPPORT=1  to link in libcxxabi demangling');
    return func;
}

function demangleAll(text: string): string {
    const regex =
        /\b_Z[\w\d_]+/g;
    return text.replace(regex,
        function (x) {
            const y = demangle(x);
            return x === y ? x : (y + ' [' + x + ']');
        });
}

function stackTrace() {
    let js = jsStackTrace();

    return demangleAll(js);
}

function ___handle_stack_overflow(): void {
    abort('stack overflow')
}

type SYSCALLS = {
    buffers: Array<Uint8Array | Int8Array | Array<number> | null>;

    printChar: (stream: number, curr: number) => void;
}

const SYSCALLS: SYSCALLS = {
    buffers: [null, [], []],

    printChar: function (stream: number, curr: number): void {
        const buffer = SYSCALLS.buffers[stream];

        assert(Boolean(buffer));

        if (curr === 0 || curr === 10) {
            (stream === 1 ? out : err)(UTF8ArrayToString(buffer as Uint8Array, 0));
            SYSCALLS.buffers[stream] = [];
        } else {
            (buffer as Array<number>).push(curr);
        }
    },
};

class ExitStatus {
    name: string;
    message: string;
    status: number;

    constructor(status: number) {
        this.name = 'ExitStatus';
        this.message = 'Program terminated with exit(' + status + ')';
        this.status = status;
    }
}

interface WarnOnce {
    (text: string): void;
    shown?: {
        [keys: string]: number;
    };
}
const warnOnce: WarnOnce = function (text: string) {
    if (!warnOnce.shown) warnOnce.shown = {};
    if (!warnOnce.shown[text]) {
        warnOnce.shown[text] = 1;
        err(text)
    }
}

let noExitRuntime: boolean;

function setValue(ptr: number, value: number, type: string) {
    type = type || "i8";
    if (type.charAt(type.length - 1) === "*") type = "i32";
    switch (type) {
        case "i1":
            HEAP8[ptr >> 0] = value;
            break;
        case "i8":
            HEAP8[ptr >> 0] = value;
            break;
        case "i16":
            HEAP16[ptr >> 1] = value;
            break;
        case "i32":
            HEAP32[ptr >> 2] = value;
            break;
        case "i64":
            tempI64 = [value >>> 0, (tempDouble = value, +Math_abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[ptr >> 2] = tempI64[0], HEAP32[ptr + 4 >> 2] = tempI64[1];
            break;
        case "float":
            HEAPF32[ptr >> 2] = value;
            break;
        case "double":
            HEAPF64[ptr >> 3] = value;
            break;
        default:
            abort("invalid type for setValue: " + type)
    }
}

// In fastcomp asm.js, we don't need a wasm Table at all.
// In the wasm backend, we polyfill the WebAssembly object,
// so this creates a (non-native-wasm) table for us.
const wasmTable = new WebAssembly.Table({
    "initial": 932,
    "maximum": 932 + 0,
    "element": "anyfunc"
});
let wasmMemory;
let ABORT = false;
let EXITSTATUS = 0;

function assert(condition: boolean, text?: string): void {
    if (!condition) {
        abort("Assertion failed: " + text)
    }
}

function lengthBytesUTF8(str: string): number {
    var len = 0;
    for (var i = 0; i < str.length; ++i) {
        var u = str.charCodeAt(i);
        if (u >= 55296 && u <= 57343) u = 65536 + ((u & 1023) << 10) | str.charCodeAt(++i) & 1023;
        if (u <= 127) ++len;
        else if (u <= 2047) len += 2;
        else if (u <= 65535) len += 3;
        else len += 4
    }
    return len
}

const WASM_PAGE_SIZE = 65536;

function updateGlobalBufferAndViews(buf: ArrayBuffer): void {
    buffer = buf;
    HEAP8 = new Int8Array(buf);
    HEAP16 = new Int16Array(buf);
    HEAP32 = new Int32Array(buf);
    HEAPU8 = new Uint8Array(buf);
    HEAPU16 = new Uint16Array(buf);
    HEAPU32 = new Uint32Array(buf);
    HEAPF32 = new Float32Array(buf);
    HEAPF64 = new Float64Array(buf)
}

const STACK_BASE = 5357952;
const DYNAMIC_BASE = 5357952;
const DYNAMICTOP_PTR = 114912;

assert(STACK_BASE % 16 === 0, 'stack must start aligned');
assert(DYNAMIC_BASE % 16 === 0, 'heap must start aligned');

let INITIAL_INITIAL_MEMORY = 16777216;

wasmMemory = new WebAssembly.Memory({
    "initial": INITIAL_INITIAL_MEMORY / WASM_PAGE_SIZE,
    "maximum": INITIAL_INITIAL_MEMORY / WASM_PAGE_SIZE
});

if (wasmMemory) {
    buffer = wasmMemory.buffer
}

INITIAL_INITIAL_MEMORY = buffer.byteLength;
updateGlobalBufferAndViews(buffer);
HEAP32[DYNAMICTOP_PTR >> 2] = DYNAMIC_BASE;

let runtimeExited = false;

function exitRuntime() {
    runtimeExited = true
}

const Math_abs = Math.abs;
const Math_floor = Math.floor;
const Math_min = Math.min;

function jsStackTrace() {
    var err = new Error;
    if (!err.stack) {
        try {
            throw new Error
        } catch (e) {
            err = e
        }
        if (!err.stack) {
            return "(no stack trace available)"
        }
    }
    return err.stack.toString()
}

function ___assert_fail(condition: number, filename: number, line: number, func: number) {
    abort("Assertion failed: " + UTF8ToString(condition) + ", at: " + [filename ? UTF8ToString(filename) : "unknown filename", line, func ? UTF8ToString(func) : "unknown function"])
}

function ___cxa_allocate_exception(size: number) {
    const malloc: (size: number) => void = _malloc;

    return malloc(size)
}

type ExceptionInfos = {
    ptr: number,
    adjusted: Array<number>,
    type: number,
    destructor: number,
    refcount: number,
    caught: boolean,
    rethrown: boolean,
};
let exceptionInfos: Record<number, ExceptionInfos> = {};
let exceptionLast = 0;

type __ZSt18uncaught_exceptionv = {
    (): void;
    uncaught_exceptions?: number;
}

const __ZSt18uncaught_exceptionv: __ZSt18uncaught_exceptionv = function () {
    return __ZSt18uncaught_exceptionv.uncaught_exceptions > 0
};

function ___cxa_throw(ptr: number, type: number, destructor: number) {
    exceptionInfos[ptr] = {
        ptr: ptr,
        adjusted: [ptr],
        type: type,
        destructor: destructor,
        refcount: 0,
        caught: false,
        rethrown: false
    };
    exceptionLast = ptr;
    if (__ZSt18uncaught_exceptionv.uncaught_exceptions !== undefined) {
        __ZSt18uncaught_exceptionv.uncaught_exceptions++
    } else {
        __ZSt18uncaught_exceptionv.uncaught_exceptions = 1
    }
    throw ptr
}

function _abort() {
    abort()
}

function _emscripten_get_sbrk_ptr() {
    return 114912
}

function _emscripten_memcpy_big(dest: number, src: number, num: number) {
    HEAPU8.copyWithin(dest, src, src + num)
}

function abortOnCannotGrowMemory() {
    abort("OOM")
}

function _emscripten_resize_heap(requestedSize: number) {
    requestedSize = requestedSize >>> 0;
    abortOnCannotGrowMemory()
}

function _exit(status: number) {
    exit(status)
}

function _fd_close(fd: number) {
    return 0
}

function _fd_seek(fd: number, offset_low: number, offset_high: number, whence: number, newOffset: number) { }

function _fd_write(fd: number, iov: number, iovcnt: number, pnum: number) {
    var num = 0;
    for (var i = 0; i < iovcnt; i++) {
        var ptr = HEAP32[iov + i * 8 >> 2];
        var len = HEAP32[iov + (i * 8 + 4) >> 2];
        for (var j = 0; j < len; j++) {
            SYSCALLS.printChar(fd, HEAPU8[ptr + j])
        }
        num += len
    }
    HEAP32[pnum >> 2] = num;
    return 0
}

function _setTempRet0($i: number) {
    setTempRet0($i | 0)
}

var asmLibraryArg = {
    "__assert_fail": ___assert_fail,
    "__cxa_allocate_exception": ___cxa_allocate_exception,
    "__cxa_throw": ___cxa_throw,
    "abort": _abort,
    "emscripten_get_sbrk_ptr": _emscripten_get_sbrk_ptr,
    "emscripten_memcpy_big": _emscripten_memcpy_big,
    "emscripten_resize_heap": _emscripten_resize_heap,
    "exit": _exit,
    "fd_close": _fd_close,
    "fd_seek": _fd_seek,
    "fd_write": _fd_write,
    "memory": wasmMemory,
    "setTempRet0": _setTempRet0,
    "table": wasmTable
};

var _malloc = function () {
    return (_malloc = function () { }).apply(null, arguments)
};

function exit(status: number, implicit?: boolean) {
    if (implicit && noExitRuntime && status === 0) {
        return
    }
    if (noExitRuntime) { } else {
        ABORT = true;
        EXITSTATUS = status;
        exitRuntime();
    }
    quit_(status, new ExitStatus(status))
}

type Exports = {
    __wasm_call_ctors: () => void;
    free: (p: number) => void;
    malloc: (p: number) => number;
    free_memory: (p: number) => void;
    get_size: (p: number) => number;
    get_result_p: (p: number) => number;
    compileWatToWasm: (p: number, length: number) => number;
};

async function run(moduleRes: BufferSource): Promise<Exports> {
    // prepare imports
    const info = {
        'env': asmLibraryArg,
        'wasi_snapshot_preview1': asmLibraryArg
    };

    const instantiated = await WebAssembly.instantiate(moduleRes, info);

    const exports: Exports = instantiated.instance.exports as Exports;

    // STATICTOP = STATIC_BASE + 120448;
    /* global initializers */
    if (exports['__wasm_call_ctors']) {
        exports['__wasm_call_ctors'].apply(null);
    } else {
        err('Doesnt exist init wasm function in module: __wasm_call_ctors');
    }

    return {
        ...exports,
    }
}

async function fetchRun(wasmModulePath?: string) {
    const fetchedWasm = await fetch(wasmModulePath);

    return run(await fetchedWasm.arrayBuffer());
}

async function readRun(wasmBin?: BufferSource) {
    return run(wasmBin);
}

function getCompiledFunc(exports: Exports) {
    const {
        free,
        malloc,
        free_memory,
        get_size,
        get_result_p,
        compileWatToWasm: _compileWatToWasm,
    } = exports;

    return function (wat: string): Uint8Array {
        const string_size = lengthBytesUTF8(wat);
        const string_p = malloc(string_size);

        for (let i = 0; i < string_size; i++) {
            setValue(string_p + i, wat.charCodeAt(i), 'i8');
        }

        const return_p: number = _compileWatToWasm(string_p, string_size);

        const wasm_size: number = get_size(return_p);
        const wasm_start_p: number = get_result_p(return_p);

        const wasm_m = new Uint8Array(wasm_size);

        for (let i = 0; i < wasm_size; i++) {
            wasm_m[i] = getValue(wasm_start_p + i, 'i8');
        }

        free(string_p);
        free_memory(return_p);

        return wasm_m;
    }
}

export async function getCompileWatToWasm(wasmModulePath: string) {
    return getCompiledFunc(await fetchRun(wasmModulePath));
}

export async function getCompileWatToWasmFromBin(wasmModulePath: BufferSource) {
    return getCompiledFunc(await readRun(wasmModulePath));
}

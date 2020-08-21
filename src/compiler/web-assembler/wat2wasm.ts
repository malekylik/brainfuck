

// // The Module object: Our interface to the outside world. We import
// // and export values on it. There are various ways Module can be used:
// // 1. Not defined. We create it here
// // 2. A function parameter, function(Module) { ..generated code.. }
// // 3. pre-run appended it, var Module = {}; ..generated code..
// // 4. External script tag defines var Module.
// // We need to check if Module already exists (e.g. case 3 above).
// // Substitution will be replaced with actual code on later stage of the build,
// // this way Closure Compiler will not mangle it (e.g. case 4. above).
// // Note that if you want to run closure, and also to use Module
// // after the generated code, you will need to define   var Module = {};
// // before the code. Then that object will be used in the code, and you
// // can continue to use Module afterwards as well.

// type asmFuncs =
//   'fflush' |
//   'malloc' |
//   'stackSave' |
//   'stackRestore' |
//   'stackAlloc';

// interface ModuleI {
//   asm: {
//     stackSave: () => void;
//     fflush: (v: number) => number;
//     malloc: (v: number) => number;
//     stackAlloc: (v: number) => number;
//     stackRestore: (v: number) => number;
//   };
//   HEAP8: Int8Array;
//   HEAP16: Int16Array;
//   HEAP32: Int32Array;
//   HEAPU8: Uint8Array;
//   HEAPU16: Uint16Array;
//   HEAPU32: Uint32Array;
//   HEAPF32: Float32Array;
//   HEAPF64: Float64Array;
//   extraStackTrace: () => void;
//   stackSave: () => void;
//   _fflush: (v: number) => number;
//   _malloc: (v: number) => number;
//   stackAlloc: (v: number) => number;
//   stackRestore: (v: number) => number;
//   cwrap: <K extends 'number' | 'string' | 'void' | 'boolean' | 'array' | null>(ident: string, returnType: K, argTypes: Array<K>) => () => number | string | boolean;
//   getValue: (ptr: number, type: string) => number;
//   setValue: (ptr: number, value: number, type: string) => void;
//   run: (wasmModulePath: string) => Promise<{
//     free: (v: number) => void;
//     malloc: (v: number) => number;
//     free_memory: (v: number) => void;
//     get_size: (v: number) => number;
//     get_result_p: (v: number) => number;
//     compileWatToWasm: (string_p: number, string_size: number) => number;
//   }>;
// }

// const Module: ModuleI = {
//   asm: {
//     stackSave: null,
//     fflush: null,
//     malloc: null,
//     stackAlloc: null,
//     stackRestore: null,
//   },
//   HEAP8: null,
//   HEAP16: null,
//   HEAP32: null,
//   HEAPU8: null,
//   HEAPU16: null,
//   HEAPU32: null,
//   HEAPF32: null,
//   HEAPF64: null,
//   extraStackTrace: () => {},
//   stackSave: () => {},
//   _fflush: null,
//   _malloc: null,
//   stackAlloc: null,
//   stackRestore: null,
//   cwrap: null,
//   setValue: null,
//   getValue: null,
//   run: null,
// };

// const quit_ = function(status?: number, toThrow?: ExitStatus): never {
//   throw toThrow;
// };


// // Set up the out() and err() hooks, which are how we can print to stdout or
// // stderr, respectively.
// let out = console.log.bind(console);
// let err = console.warn.bind(console);

// // Emit code to handle expected values on the Module object. This applies Module.x
// // to the proper local x. This has two benefits: first, we only emit it if it is
// // expected to arrive, and second, by using a local everywhere else that can be
// // minified.

// function warnOnce(text: string): void {
//   if (!(warnOnce as any).shown) (warnOnce as any).shown = {};
//   if (!(warnOnce as any).shown[text]) {
//     (warnOnce as any).shown[text] = 1;
//     err(text);
//   }
// }

// let tempRet0: number = 0;
// const setTempRet0 = function(value: number): void {
//   tempRet0 = value;
// };

// // === Preamble library stuff ===

// // Documentation for the public APIs defined in this file must be updated in:
// //    site/source/docs/api_reference/preamble.js.rst
// // A prebuilt local version of the documentation is available at:
// //    site/build/text/docs/api_reference/preamble.js.txt
// // You can also build docs locally as HTML or other formats in site/
// // An online HTML version (which may be of a different version of Emscripten)
// //    is up at http://kripken.github.io/emscripten-site/docs/api_reference/preamble.js.html

// // In MINIMAL_RUNTIME, setValue() and getValue() are only available when building with safe heap enabled, for heap safety checking.
// // In traditional runtime, setValue() and getValue() are always available (although their use is highly discouraged due to perf penalties)
// function setValue(ptr: number, value: number, type: string): void {
//   type = type || 'i8';
//   if (type.charAt(type.length-1) === '*') type = 'i32'; // pointers are 32-bit
//     switch(type) {
//       case 'i1': HEAP8[((ptr)>>0)]=value; break;
//       case 'i8': HEAP8[((ptr)>>0)]=value; break;
//       case 'i16': HEAP16[((ptr)>>1)]=value; break;
//       case 'i32': HEAP32[((ptr)>>2)]=value; break;
//       case 'i64': (tempI64 = [value>>>0,(tempDouble=value,(+(Math_abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? ((Math_min((+(Math_floor((tempDouble)/4294967296.0))), 4294967295.0))|0)>>>0 : (~~((+(Math_ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)],HEAP32[((ptr)>>2)]=tempI64[0],HEAP32[(((ptr)+(4))>>2)]=tempI64[1]); break;
//       case 'float': HEAPF32[((ptr)>>2)]=value; break;
//       case 'double': HEAPF64[((ptr)>>3)]=value; break;
//       default: abort('invalid type for setValue: ' + type);
//     }
// }

// function getValue(ptr: number, type: string): number {
//   type = type || 'i8';
//   if (type.charAt(type.length-1) === '*') type = 'i32'; // pointers are 32-bit
//     switch(type) {
//       case 'i1': return HEAP8[((ptr)>>0)];
//       case 'i8': return HEAP8[((ptr)>>0)];
//       case 'i16': return HEAP16[((ptr)>>1)];
//       case 'i32': return HEAP32[((ptr)>>2)];
//       case 'i64': return HEAP32[((ptr)>>2)];
//       case 'float': return HEAPF32[((ptr)>>2)];
//       case 'double': return HEAPF64[((ptr)>>3)];
//       default: abort('invalid type for getValue: ' + type);
//     }
//   return null;
// }


// //========================================
// // Runtime essentials
// //========================================

// function assert(condition: boolean, text?: string): void {
//   if (!condition) {
//     abort('Assertion failed: ' + text);
//   }
// }

// // Returns the C function with a specified identifier (for C++, you need to do manual name mangling)
// function getCFunc(ident: string) {
//   const func = (Module as any)['_' + ident]; // closure exported function
//   assert(func, 'Cannot call unknown function ' + ident + ', make sure it is exported');
//   return func;
// }

// // C calling interface.
// function ccall<K extends 'number' | 'string' | 'void' | 'boolean' | 'array' | null>(ident: string, returnType: K, argTypes: Array<K>, args: Array<number> & string): number | string | boolean {
//   // For fast lookup of conversion functions
//   const toC = {
//     string: function(str: string) {
//       let ret = 0;
//       if (str !== null && str !== undefined && (str as any as number) !== 0) { // null string
//         // at most 4 bytes per UTF-8 code point, +1 for the trailing '\0'
//         const len = (str.length << 2) + 1;
//         ret = stackAlloc(len);
//         stringToUTF8(str, ret, len);
//       }
//       return ret;
//     },

//     array: function(arr: Array<number>) {
//       const ret = stackAlloc(arr.length);
//       writeArrayToMemory(arr, ret);
//       return ret;
//     }
//   };

//   function convertReturnValue(ret: number): number | string | boolean {
//     if (returnType === 'string') return UTF8ToString(ret);
//     if (returnType === 'boolean') return Boolean(ret);

//     return ret;
//   }

//   const func = getCFunc(ident);
//   const cArgs = [];
//   let stack = 0;
//   assert(returnType !== 'array', 'Return type should not be "array".');
//   if (args) {
//     for (let i = 0; i < args.length; i++) {
//       if (argTypes[i] === 'array' || argTypes[i] === 'string') {
//         const arg: 'array' | 'string' = (argTypes[i] as any);
//         const converter = toC[arg];
//         if (stack === 0) stack = stackSave();
//         cArgs[i] = converter(args[i]);
//       } else {
//         cArgs[i] = args[i];
//       }
//     }
//   }
//   let ret = func.apply(null, cArgs);

//   ret = convertReturnValue(ret);

//   if (stack !== 0) stackRestore(stack);

//   return ret;
// }

// function cwrap<K extends 'number' | 'string' | 'void' | 'boolean' | 'array' | null>(ident: string, returnType: K, argTypes: Array<K>): () => number | string | boolean {
//   return function (): number | string | boolean {
//     return ccall(ident, returnType, argTypes, arguments as any);
//   }
// }

// // runtime_strings.js: Strings related runtime functions that are part of both MINIMAL_RUNTIME and regular runtime.

// // Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the given array that contains uint8 values, returns
// // a copy of that string as a Javascript String object.

// const UTF8Decoder = typeof TextDecoder !== 'undefined' ? new TextDecoder('utf8') : undefined;

// function UTF8ArrayToString(heap: Uint8Array | Int8Array, idx: number, maxBytesToRead?: number): string {
//   let endIdx = idx + maxBytesToRead;
//   let endPtr = idx;
//   // TextDecoder needs to know the byte length in advance, it doesn't stop on null terminator by itself.
//   // Also, use the length info to avoid running tiny strings through TextDecoder, since .subarray() allocates garbage.
//   // (As a tiny code save trick, compare endPtr against endIdx using a negation, so that undefined means Infinity)
//   while (heap[endPtr] && !(endPtr >= endIdx)) ++endPtr;

//   if (endPtr - idx > 16 && heap.subarray && UTF8Decoder) {
//     return UTF8Decoder.decode(heap.subarray(idx, endPtr));
//   } else {
//     let str = '';
//     // If building with TextDecoder, we have already computed the string length above, so test loop end condition against that
//     while (idx < endPtr) {
//       // For UTF8 byte structure, see:
//       // http://en.wikipedia.org/wiki/UTF-8#Description
//       // https://www.ietf.org/rfc/rfc2279.txt
//       // https://tools.ietf.org/html/rfc3629
//       let u0 = heap[idx++];
//       if (!(u0 & 0x80)) { str += String.fromCharCode(u0); continue; }
//       const u1 = heap[idx++] & 63;
//       if ((u0 & 0xE0) == 0xC0) { str += String.fromCharCode(((u0 & 31) << 6) | u1); continue; }
//       const u2 = heap[idx++] & 63;
//       if ((u0 & 0xF0) == 0xE0) {
//         u0 = ((u0 & 15) << 12) | (u1 << 6) | u2;
//       } else {
//         if ((u0 & 0xF8) != 0xF0) warnOnce('Invalid UTF-8 leading byte 0x' + u0.toString(16) + ' encountered when deserializing a UTF-8 string on the asm.js/wasm heap to a JS string!');
//         u0 = ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | (heap[idx++] & 63);
//       }

//       if (u0 < 0x10000) {
//         str += String.fromCharCode(u0);
//       } else {
//         const ch = u0 - 0x10000;
//         str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
//       }
//     }
//     return str;
//   }
// }

// // Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the emscripten HEAP, returns a
// // copy of that string as a Javascript String object.
// // maxBytesToRead: an optional length that specifies the maximum number of bytes to read. You can omit
// //                 this parameter to scan the string until the first \0 byte. If maxBytesToRead is
// //                 passed, and the string at [ptr, ptr+maxBytesToReadr[ contains a null byte in the
// //                 middle, then the string will cut short at that byte index (i.e. maxBytesToRead will
// //                 not produce a string of exact length [ptr, ptr+maxBytesToRead[)
// //                 N.B. mixing frequent uses of UTF8ToString() with and without maxBytesToRead may
// //                 throw JS JIT optimizations off, so it is worth to consider consistently using one
// //                 style or the other.
// /**
//  */
// function UTF8ToString(ptr: number, maxBytesToRead?: number): string {
//   return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : '';
// }

// // Copies the given Javascript String object 'str' to the given byte array at address 'outIdx',
// // encoded in UTF8 form and null-terminated. The copy will require at most str.length*4+1 bytes of space in the HEAP.
// // Use the function lengthBytesUTF8 to compute the exact number of bytes (excluding null terminator) that this function will write.
// // Parameters:
// //   str: the Javascript string to copy.
// //   heap: the array to copy to. Each index in this array is assumed to be one 8-byte element.
// //   outIdx: The starting offset in the array to begin the copying.
// //   maxBytesToWrite: The maximum number of bytes this function can write to the array.
// //                    This count should include the null terminator,
// //                    i.e. if maxBytesToWrite=1, only the null terminator will be written and nothing else.
// //                    maxBytesToWrite=0 does not write any bytes to the output, not even the null terminator.
// // Returns the number of bytes written, EXCLUDING the null terminator.

// function stringToUTF8Array(str: string, heap: Uint8Array | Int8Array, outIdx: number, maxBytesToWrite: number): number {
//   if (!(maxBytesToWrite > 0)) // Parameter maxBytesToWrite is not optional. Negative values, 0, null, undefined and false each don't write out any bytes.
//     return 0;

//   const startIdx = outIdx;
//   const endIdx = outIdx + maxBytesToWrite - 1; // -1 for string null terminator.
//   for (let i = 0; i < str.length; ++i) {
//     // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! So decode UTF16->UTF32->UTF8.
//     // See http://unicode.org/faq/utf_bom.html#utf16-3
//     // For UTF8 byte structure, see http://en.wikipedia.org/wiki/UTF-8#Description and https://www.ietf.org/rfc/rfc2279.txt and https://tools.ietf.org/html/rfc3629
//     let u = str.charCodeAt(i); // possibly a lead surrogate
//     if (u >= 0xD800 && u <= 0xDFFF) {
//       var u1 = str.charCodeAt(++i);
//       u = 0x10000 + ((u & 0x3FF) << 10) | (u1 & 0x3FF);
//     }
//     if (u <= 0x7F) {
//       if (outIdx >= endIdx) break;
//       heap[outIdx++] = u;
//     } else if (u <= 0x7FF) {
//       if (outIdx + 1 >= endIdx) break;
//       heap[outIdx++] = 0xC0 | (u >> 6);
//       heap[outIdx++] = 0x80 | (u & 63);
//     } else if (u <= 0xFFFF) {
//       if (outIdx + 2 >= endIdx) break;
//       heap[outIdx++] = 0xE0 | (u >> 12);
//       heap[outIdx++] = 0x80 | ((u >> 6) & 63);
//       heap[outIdx++] = 0x80 | (u & 63);
//     } else {
//       if (outIdx + 3 >= endIdx) break;
//       if (u >= 0x200000) warnOnce('Invalid Unicode code point 0x' + u.toString(16) + ' encountered when serializing a JS string to an UTF-8 string on the asm.js/wasm heap! (Valid unicode code points should be in range 0-0x1FFFFF).');
//       heap[outIdx++] = 0xF0 | (u >> 18);
//       heap[outIdx++] = 0x80 | ((u >> 12) & 63);
//       heap[outIdx++] = 0x80 | ((u >> 6) & 63);
//       heap[outIdx++] = 0x80 | (u & 63);
//     }
//   }
//   // Null-terminate the pointer to the buffer.
//   heap[outIdx] = 0;
//   return outIdx - startIdx;
// }

// // Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// // null-terminated and encoded in UTF8 form. The copy will require at most str.length*4+1 bytes of space in the HEAP.
// // Use the function lengthBytesUTF8 to compute the exact number of bytes (excluding null terminator) that this function will write.
// // Returns the number of bytes written, EXCLUDING the null terminator.

// function stringToUTF8(str: string, outPtr: number, maxBytesToWrite: number): number {
//   assert(typeof maxBytesToWrite == 'number', 'stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!');
//   return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
// }

// function writeArrayToMemory(array: ArrayLike<number>, buffer: number): void {
//   assert(array.length >= 0, 'writeArrayToMemory array must have a length (should be an array or typed array)')
//   HEAP8.set(array, buffer);
// }

// // Returns the number of bytes the given Javascript string takes if encoded as a UTF8 byte array, EXCLUDING the null terminator byte.
// function lengthBytesUTF8(str: string): number {
//   var len = 0;
//   for (var i = 0; i < str.length; ++i) {
//     // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! So decode UTF16->UTF32->UTF8.
//     // See http://unicode.org/faq/utf_bom.html#utf16-3
//     var u = str.charCodeAt(i); // possibly a lead surrogate
//     if (u >= 0xD800 && u <= 0xDFFF) u = 0x10000 + ((u & 0x3FF) << 10) | (str.charCodeAt(++i) & 0x3FF);
//     if (u <= 0x7F) ++len;
//     else if (u <= 0x7FF) len += 2;
//     else if (u <= 0xFFFF) len += 3;
//     else len += 4;
//   }
//   return len;
// }

// // Memory management

// const WASM_PAGE_SIZE = 65536;

// let HEAP;
// /** @type {ArrayBuffer} */
// let buffer: ArrayBuffer;
// /** @type {Int8Array} */
// let HEAP8: Int8Array;
// /** @type {Uint8Array} */
// let HEAPU8: Uint8Array;
// /** @type {Int16Array} */
// let HEAP16: Int16Array;
// /** @type {Uint16Array} */
// let HEAPU16: Uint16Array;
// /** @type {Int32Array} */
// let HEAP32: Int32Array;
// /** @type {Uint32Array} */
// let HEAPU32: Uint32Array;
// /** @type {Float32Array} */
// let HEAPF32: Float32Array;
// /** @type {Float64Array} */
// let HEAPF64: Float64Array;

// function updateGlobalBufferAndViews(buf: ArrayBuffer) {
//   buffer = buf;
//   Module['HEAP8'] = HEAP8 = new Int8Array(buf);
//   Module['HEAP16'] = HEAP16 = new Int16Array(buf);
//   Module['HEAP32'] = HEAP32 = new Int32Array(buf);
//   Module['HEAPU8'] = HEAPU8 = new Uint8Array(buf);
//   Module['HEAPU16'] = HEAPU16 = new Uint16Array(buf);
//   Module['HEAPU32'] = HEAPU32 = new Uint32Array(buf);
//   Module['HEAPF32'] = HEAPF32 = new Float32Array(buf);
//   Module['HEAPF64'] = HEAPF64 = new Float64Array(buf);
// }

// const STACK_BASE = 5364352;
// const STACK_MAX = 121472;
// const DYNAMIC_BASE = 5364352;
// const DYNAMICTOP_PTR = 121312;

// assert(STACK_BASE % 16 === 0, 'stack must start aligned');
// assert(DYNAMIC_BASE % 16 === 0, 'heap must start aligned');


// const TOTAL_STACK = 5242880;

// let INITIAL_INITIAL_MEMORY = 16777216;

// assert(INITIAL_INITIAL_MEMORY >= TOTAL_STACK, 'INITIAL_MEMORY should be larger than TOTAL_STACK, was ' + INITIAL_INITIAL_MEMORY + '! (TOTAL_STACK=' + TOTAL_STACK + ')');

// // check for full engine support (use string 'subarray' to avoid closure compiler confusion)
// assert(typeof Int32Array !== 'undefined' && typeof Float64Array !== 'undefined' && Int32Array.prototype.subarray !== undefined && Int32Array.prototype.set !== undefined,
//        'JS engine does not provide full typed array support');


// // In non-standalone/normal mode, we create the memory here.



// // Create the main memory. (Note: this isn't used in STANDALONE_WASM mode since the wasm
// // memory is created in the wasm, not in JS.)

// const wasmMemory: WebAssembly.Memory = new WebAssembly.Memory({
//   'initial': INITIAL_INITIAL_MEMORY / WASM_PAGE_SIZE,
//   'maximum': INITIAL_INITIAL_MEMORY / WASM_PAGE_SIZE
// });

// if (wasmMemory) {
//   buffer = wasmMemory.buffer;
// }

// // If the user provides an incorrect length, just use that length instead rather than providing the user to
// // specifically provide the memory length with Module['INITIAL_MEMORY'].
// INITIAL_INITIAL_MEMORY = buffer.byteLength;
// assert(INITIAL_INITIAL_MEMORY % WASM_PAGE_SIZE === 0);
// updateGlobalBufferAndViews(buffer);

// HEAP32[DYNAMICTOP_PTR>>2] = DYNAMIC_BASE;


// function checkStackCookie() {
//   const cookie1 = HEAPU32[(STACK_MAX >> 2)+1];
//   const cookie2 = HEAPU32[(STACK_MAX >> 2)+2];
//   if (cookie1 != 0x2135467 || cookie2 != 0x89BACDFE) {
//     abort('Stack overflow! Stack cookie has been overwritten, expected hex dwords 0x89BACDFE and 0x2135467, but received 0x' + cookie2.toString(16) + ' ' + cookie1.toString(16));
//   }
//   // Also test the global address 0 for integrity.
//   // We don't do this with ASan because ASan does its own checks for this.
//   if (HEAP32[0] !== 0x63736d65 /* 'emsc' */) abort('Runtime error: The application has corrupted its heap memory area (address zero)!');
// }


// // Endianness check (note: assumes compiler arch was little-endian)
// (function() {
//   const h16 = new Int16Array(1);
//   const h8 = new Int8Array(h16.buffer);
//   h16[0] = 0x6373;
//   if (h8[0] !== 0x73 || h8[1] !== 0x63) throw 'Runtime error: expected the system to be little-endian!';
// })();

// let runtimeExited = false;

// function exitRuntime() {
//   checkStackCookie();
//   runtimeExited = true;
// }

// const Math_abs = Math.abs;
// const Math_ceil = Math.ceil;
// const Math_floor = Math.floor;
// const Math_min = Math.min;

// function abort(what?: string | number): void {
//   what += '';
//   err(what);

//   const output = 'abort(' + what + ') at ' + stackTrace();
//   what = output;

//   // Use a wasm runtime error, because a JS error might be seen as a foreign
//   // exception, which means we'd run destructors on it. We need the error to
//   // simply make the program stop.
//   const e = new (WebAssembly as any).RuntimeError(what);

//   // Throw the error whether or not MODULARIZE is set because abort is used
//   // in code paths apart from instantiation where an exception is expected
//   // to be thrown when abort is called.
//   throw e;
// }


// // show errors on likely calls to FS when it was not included
// const FS = {
//   error: function() {
//     abort('Filesystem support (FS) was not included. The problem is that you are using files from JS, but files were not used from C/C++, so filesystem support was not auto-included. You can force-include filesystem support with  -s FORCE_FILESYSTEM=1');
//   },
//   init: function() { FS.error() },
//   createDataFile: function() { FS.error() },
//   createPreloadedFile: function() { FS.error() },
//   createLazyFile: function() { FS.error() },
//   open: function() { FS.error() },
//   mkdev: function() { FS.error() },
//   registerDevice: function() { FS.error() },
//   analyzePath: function() { FS.error() },
//   loadFilesFromDB: function() { FS.error() },

//   ErrnoError: function ErrnoError() { FS.error() },
// };

// function createExportWrapper(name: asmFuncs | string, fixedasm?: object) {
//   return function() {
//     const displayName = name;
//     let asm = fixedasm;
//     if (!fixedasm) {
//       asm = Module['asm'];
//     }

//     const f = (asm as any)[name];

//     if (!f) {
//       assert(f, 'exported native function `' + displayName + '` not found');
//     }
//     return f.apply(null, arguments);
//   };
// }


// // Globals used by JS i64 conversions
// let tempDouble;
// let tempI64;

// /* no memory initializer */
// // {{PRE_LIBRARY}}


// function demangle(func: string) {
//   warnOnce('warning: build with  -s DEMANGLE_SUPPORT=1  to link in libcxxabi demangling');
//   return func;
// }

// function demangleAll(text: string): string {
//   const regex =
//     /\b_Z[\w\d_]+/g;
//   return text.replace(regex,
//   function(x) {
//     const y = demangle(x);
//     return x === y ? x : (y + ' [' + x + ']');
//   });
// }

// function jsStackTrace() {
//   let err = new Error();
//   if (!err.stack) {
//     // IE10+ special cases: It does have callstack info, but it is only populated if an Error object is thrown,
//     // so try that as a special-case.
//     try {
//       throw new Error();
//     } catch(e) {
//       err = e;
//     }
//     if (!err.stack) {
//       return '(no stack trace available)';
//     }
//   }
//   return err.stack.toString();
// }

// function stackTrace() {
//   let js = jsStackTrace();
//   if (Module['extraStackTrace']) js += '\n' + Module['extraStackTrace']();
//   return demangleAll(js);
// }

// function ___assert_fail(condition: number, filename: number, line: string, func: number): void {
//   abort('Assertion failed: ' + UTF8ToString(condition) + ', at: ' + [filename ? UTF8ToString(filename) : 'unknown filename', line, func ? UTF8ToString(func) : 'unknown function']);
// }

// function ___cxa_allocate_exception(size: number): number {
//   return _malloc(size);
// }


// interface __ZSt18uncaught_exceptionvFunc {
//   (): void;
//   uncaught_exceptions?: number;
// };

// const __ZSt18uncaught_exceptionv: __ZSt18uncaught_exceptionvFunc  = (function () { // std::uncaught_exception()
//   return __ZSt18uncaught_exceptionv.uncaught_exceptions > 0;
// } as any as __ZSt18uncaught_exceptionvFunc);

// const exceptionInfos = {};
// let exceptionLast = 0;

// function ___cxa_throw(ptr: number, type: string, destructor: () => {}): never {
//   (exceptionInfos as any)[ptr] = {
//     ptr: ptr,
//     adjusted: [ptr],
//     type: type,
//     destructor: destructor,
//     refcount: 0,
//     caught: false,
//     rethrown: false
//   };

//   exceptionLast = ptr;

//   if (!("uncaught_exception" in __ZSt18uncaught_exceptionv)) {
//     __ZSt18uncaught_exceptionv.uncaught_exceptions = 1;
//   } else {
//     (__ZSt18uncaught_exceptionv as any).uncaught_exceptions++;
//   }

//   throw ptr + " - Exception catching is disabled, this exception cannot be caught. Compile with -s DISABLE_EXCEPTION_CATCHING=0 or DISABLE_EXCEPTION_CATCHING=2 to catch.";
// }

// function ___handle_stack_overflow(): void {
//   abort('stack overflow')
// }

// function _abort(): void {
//   abort();
// }

// const _abs = Math_abs;

// function _emscripten_get_sbrk_ptr(): number {
//   return 121312;
// }

// function _emscripten_memcpy_big(dest: number, src: number, num?: number): void {
//   HEAPU8.copyWithin(dest, src, src + num);
// }
  
// function abortOnCannotGrowMemory(requestedSize: number): void {
//   abort('Cannot enlarge memory arrays to size ' + requestedSize + ' bytes (OOM). Either (1) compile with  -s INITIAL_MEMORY=X  with X higher than the current value ' + HEAP8.length + ', (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which allows increasing the size at runtime, or (3) if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ');
// }

// function _emscripten_resize_heap(requestedSize: number): void {
//   requestedSize = requestedSize >>> 0;
//   abortOnCannotGrowMemory(requestedSize);
// }

// function _exit(status: number): void {
//   // void _exit(int status);
//   // http://pubs.opengroup.org/onlinepubs/000095399/functions/exit.html
//   exit(status);
// }

// interface SYSCALLSType {
//   buffers: Array<Uint8Array | Int8Array | Array<number>>;

//   printChar: (stream: number, curr: number) => void;
// }

// const SYSCALLS: SYSCALLSType = {
//   buffers: [null, [], []],

//   printChar: function (stream: number, curr: number): void {
//     const buffer: Int8Array = (SYSCALLS.buffers[stream] as any);

//     assert(Boolean(buffer));

//     if (curr === 0 || curr === 10) {
//       (stream === 1 ? out : err)(UTF8ArrayToString(buffer, 0));
//       (buffer as any as Array<number>).length = 0;
//     } else {
//       (buffer as any as Array<number>).push(curr);
//     }
//   },
// };

// function _fd_close(fd?: number): number {
//   abort('it should not be possible to operate on streams when !SYSCALLS_REQUIRE_FILESYSTEM');
//   return 0;
// }

// function _fd_seek(fd: number, offset_low: number, offset_high: number, whence: number, newOffset: number): void {
//   abort('it should not be possible to operate on streams when !SYSCALLS_REQUIRE_FILESYSTEM');
// }

// function flush_NO_FILESYSTEM() {
//   // flush anything remaining in the buffers during shutdown
//   if (typeof _fflush !== 'undefined') _fflush(0);
//   const buffers = SYSCALLS.buffers;
//   if (buffers[1].length) SYSCALLS.printChar(1, 10);
//   if (buffers[2].length) SYSCALLS.printChar(2, 10);
// }

// function _fd_write(fd: number, iov: number, iovcnt: number, pnum: number): number {
//   // hack to support printf in SYSCALLS_REQUIRE_FILESYSTEM=0
//   let num = 0;

//   for (let i = 0; i < iovcnt; i++) {
//     const ptr = HEAP32[(((iov)+(i*8))>>2)];
//     const len = HEAP32[(((iov)+(i*8 + 4))>>2)];

//     for (let j = 0; j < len; j++) {
//       SYSCALLS.printChar(fd, HEAPU8[ptr+j]);
//     }

//     num += len;
//   }

//   HEAP32[((pnum)>>2)]=num;

//   return 0;
// }

// function _setTempRet0($i: number): void {
//   setTempRet0(($i) | 0);
// }

// // In fastcomp asm.js, we don't need a wasm Table at all.
// // In the wasm backend, we polyfill the WebAssembly object,
// // so this creates a (non-native-wasm) table for us.
// const wasmTable = new WebAssembly.Table({
//   'initial': 1277,
//   'maximum': 1277 + 0,
//   'element': 'anyfunc'
// });

// const asmLibraryArg = {
//   '__assert_fail': ___assert_fail,
//   '__cxa_allocate_exception': ___cxa_allocate_exception,
//   '__cxa_throw': ___cxa_throw,
//   '__handle_stack_overflow': ___handle_stack_overflow,
//   'abort': _abort,
//   'abs': _abs,
//   'emscripten_get_sbrk_ptr': _emscripten_get_sbrk_ptr,
//   'emscripten_memcpy_big': _emscripten_memcpy_big,
//   'emscripten_resize_heap': _emscripten_resize_heap,
//   'exit': _exit,
//   'fd_close': _fd_close,
//   'fd_seek': _fd_seek, 
//   'fd_write': _fd_write,
//   'memory': wasmMemory,
//   'setTempRet0': _setTempRet0,
//   'table': wasmTable
// };

// /** @type {function(...*):?} */
// const _fflush: (v: number) => void = Module['_fflush'] = createExportWrapper('fflush');

// /** @type {function(...*):?} */
// const _malloc: (n: number) => number = Module['_malloc'] = createExportWrapper('malloc');

// /** @type {function(...*):?} */
// const stackSave = Module['stackSave'] = createExportWrapper('stackSave');

// /** @type {function(...*):?} */
// const stackRestore: (v: number) => void = Module['stackRestore'] = createExportWrapper('stackRestore');

// /** @type {function(...*):?} */
// const stackAlloc: (v: number) => number = Module['stackAlloc'] = createExportWrapper('stackAlloc');

// Module['cwrap'] = cwrap;
// Module['setValue'] = setValue;
// Module['getValue'] = getValue;

// class ExitStatus {
//   name: string;
//   message: string;
//   status: number;

//   constructor(status: number) {
//     this.name = 'ExitStatus';
//     this.message = 'Program terminated with exit(' + status + ')';
//     this.status = status;
//   }
// }

// Module['run'] = run;

// function checkUnflushedContent(): void {
//   // Compiler settings do not allow exiting the runtime, so flushing
//   // the streams is not possible. but in ASSERTIONS mode we check
//   // if there was something to flush, and if so tell the user they
//   // should request that the runtime be exitable.
//   // Normally we would not even include flush() at all, but in ASSERTIONS
//   // builds we do so just for this check, and here we see if there is any
//   // content to flush, that is, we check if there would have been
//   // something a non-ASSERTIONS build would have not seen.
//   // How we flush the streams depends on whether we are in SYSCALLS_REQUIRE_FILESYSTEM=0
//   // mode (which has its own special function for this; otherwise, all
//   // the code is inside libc)
//   const print = out;
//   const printErr = err;
//   let has = false;
//   out = err = function() {
//     has = true;
//   }
//   try { // it doesn't matter if it fails
//     const flush = flush_NO_FILESYSTEM;
//     if (flush) flush();
//   } catch(e) {}
//   out = print;
//   err = printErr;
//   if (has) {
//     warnOnce('stdio streams had content in them that was not flushed. you should set EXIT_RUNTIME to 1 (see the FAQ), or make sure to emit a newline when you printf etc.');
//     warnOnce('(this may also be due to not including full filesystem support - try building with -s FORCE_FILESYSTEM=1)');
//   }
// }

// function exit(status: number, implicit?: boolean | number): void {
//   checkUnflushedContent();

//   // if this is just main exit-ing implicitly, and the status is 0, then we
//   // don't need to do anything here and can just leave. if the status is
//   // non-zero, though, then we need to report it.
//   // (we may have warned about this earlier, if a situation justifies doing so)
//   if (implicit && status === 0) {
//     return;
//   }

//   exitRuntime();

//   quit_(status, new ExitStatus(status));
// }

var Module = typeof Module !== "undefined" ? Module : {};
var moduleOverrides = {};
var key;
for (key in Module) {
    if (Module.hasOwnProperty(key)) {
        moduleOverrides[key] = Module[key]
    }
}
var arguments_ = [];
var thisProgram = "./this.program";
var quit_ = function(status, toThrow) {
    throw toThrow
};
var ENVIRONMENT_IS_WEB = false;
var ENVIRONMENT_IS_WORKER = false;
var ENVIRONMENT_IS_NODE = false;
var ENVIRONMENT_IS_SHELL = false;
ENVIRONMENT_IS_WEB = typeof window === "object";
ENVIRONMENT_IS_WORKER = typeof importScripts === "function";
ENVIRONMENT_IS_NODE = typeof process === "object" && typeof process.versions === "object" && typeof process.versions.node === "string";
ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;
var scriptDirectory = "";

function locateFile(path) {
    if (Module["locateFile"]) {
        return Module["locateFile"](path, scriptDirectory)
    }
    return scriptDirectory + path
}
var read_, readAsync, readBinary, setWindowTitle;
var nodeFS;
var nodePath;
if (ENVIRONMENT_IS_NODE) {
    if (ENVIRONMENT_IS_WORKER) {
        scriptDirectory = require("path").dirname(scriptDirectory) + "/"
    } else {
        scriptDirectory = __dirname + "/"
    }
    read_ = function shell_read(filename, binary) {
        if (!nodeFS) nodeFS = require("fs");
        if (!nodePath) nodePath = require("path");
        filename = nodePath["normalize"](filename);
        return nodeFS["readFileSync"](filename, binary ? null : "utf8")
    };
    readBinary = function readBinary(filename) {
        var ret = read_(filename, true);
        if (!ret.buffer) {
            ret = new Uint8Array(ret)
        }
        assert(ret.buffer);
        return ret
    };
    if (process["argv"].length > 1) {
        thisProgram = process["argv"][1].replace(/\\/g, "/")
    }
    arguments_ = process["argv"].slice(2);
    if (typeof module !== "undefined") {
        module["exports"] = Module
    }
    process["on"]("uncaughtException", function(ex) {
        if (!(ex instanceof ExitStatus)) {
            throw ex
        }
    });
    process["on"]("unhandledRejection", abort);
    quit_ = function(status) {
        process["exit"](status)
    };
    Module["inspect"] = function() {
        return "[Emscripten Module object]"
    }
} else if (ENVIRONMENT_IS_SHELL) {
    if (typeof read != "undefined") {
        read_ = function shell_read(f) {
            return read(f)
        }
    }
    readBinary = function readBinary(f) {
        var data;
        if (typeof readbuffer === "function") {
            return new Uint8Array(readbuffer(f))
        }
        data = read(f, "binary");
        assert(typeof data === "object");
        return data
    };
    if (typeof scriptArgs != "undefined") {
        arguments_ = scriptArgs
    } else if (typeof arguments != "undefined") {
        arguments_ = arguments
    }
    if (typeof quit === "function") {
        quit_ = function(status) {
            quit(status)
        }
    }
    if (typeof print !== "undefined") {
        if (typeof console === "undefined") console = {};
        console.log = print;
        console.warn = console.error = typeof printErr !== "undefined" ? printErr : print
    }
} else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
    if (ENVIRONMENT_IS_WORKER) {
        scriptDirectory = self.location.href
    } else if (document.currentScript) {
        scriptDirectory = document.currentScript.src
    }
    if (scriptDirectory.indexOf("blob:") !== 0) {
        scriptDirectory = scriptDirectory.substr(0, scriptDirectory.lastIndexOf("/") + 1)
    } else {
        scriptDirectory = ""
    } {
        read_ = function shell_read(url) {
            var xhr = new XMLHttpRequest;
            xhr.open("GET", url, false);
            xhr.send(null);
            return xhr.responseText
        };
        if (ENVIRONMENT_IS_WORKER) {
            readBinary = function readBinary(url) {
                var xhr = new XMLHttpRequest;
                xhr.open("GET", url, false);
                xhr.responseType = "arraybuffer";
                xhr.send(null);
                return new Uint8Array(xhr.response)
            }
        }
        readAsync = function readAsync(url, onload, onerror) {
            var xhr = new XMLHttpRequest;
            xhr.open("GET", url, true);
            xhr.responseType = "arraybuffer";
            xhr.onload = function xhr_onload() {
                if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
                    onload(xhr.response);
                    return
                }
                onerror()
            };
            xhr.onerror = onerror;
            xhr.send(null)
        }
    }
    setWindowTitle = function(title) {
        document.title = title
    }
} else {}
var out = Module["print"] || console.log.bind(console);
var err = Module["printErr"] || console.warn.bind(console);
for (key in moduleOverrides) {
    if (moduleOverrides.hasOwnProperty(key)) {
        Module[key] = moduleOverrides[key]
    }
}
moduleOverrides = null;
if (Module["arguments"]) arguments_ = Module["arguments"];
if (Module["thisProgram"]) thisProgram = Module["thisProgram"];
if (Module["quit"]) quit_ = Module["quit"];
var STACK_ALIGN = 16;

function dynamicAlloc(size) {
    var ret = HEAP32[DYNAMICTOP_PTR >> 2];
    var end = ret + size + 15 & -16;
    HEAP32[DYNAMICTOP_PTR >> 2] = end;
    return ret
}

function getNativeTypeSize(type) {
    switch (type) {
        case "i1":
        case "i8":
            return 1;
        case "i16":
            return 2;
        case "i32":
            return 4;
        case "i64":
            return 8;
        case "float":
            return 4;
        case "double":
            return 8;
        default: {
            if (type[type.length - 1] === "*") {
                return 4
            } else if (type[0] === "i") {
                var bits = Number(type.substr(1));
                assert(bits % 8 === 0, "getNativeTypeSize invalid bits " + bits + ", type " + type);
                return bits / 8
            } else {
                return 0
            }
        }
    }
}

function warnOnce(text) {
    if (!warnOnce.shown) warnOnce.shown = {};
    if (!warnOnce.shown[text]) {
        warnOnce.shown[text] = 1;
        err(text)
    }
}

function convertJsFunctionToWasm(func, sig) {
    if (typeof WebAssembly.Function === "function") {
        var typeNames = {
            "i": "i32",
            "j": "i64",
            "f": "f32",
            "d": "f64"
        };
        var type = {
            parameters: [],
            results: sig[0] == "v" ? [] : [typeNames[sig[0]]]
        };
        for (var i = 1; i < sig.length; ++i) {
            type.parameters.push(typeNames[sig[i]])
        }
        return new WebAssembly.Function(type, func)
    }
    var typeSection = [1, 0, 1, 96];
    var sigRet = sig.slice(0, 1);
    var sigParam = sig.slice(1);
    var typeCodes = {
        "i": 127,
        "j": 126,
        "f": 125,
        "d": 124
    };
    typeSection.push(sigParam.length);
    for (var i = 0; i < sigParam.length; ++i) {
        typeSection.push(typeCodes[sigParam[i]])
    }
    if (sigRet == "v") {
        typeSection.push(0)
    } else {
        typeSection = typeSection.concat([1, typeCodes[sigRet]])
    }
    typeSection[1] = typeSection.length - 2;
    var bytes = new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0].concat(typeSection, [2, 7, 1, 1, 101, 1, 102, 0, 0, 7, 5, 1, 1, 102, 0, 0]));
    var module = new WebAssembly.Module(bytes);
    var instance = new WebAssembly.Instance(module, {
        "e": {
            "f": func
        }
    });
    var wrappedFunc = instance.exports["f"];
    return wrappedFunc
}
var freeTableIndexes = [];
var functionsInTableMap;

function addFunctionWasm(func, sig) {
    var table = wasmTable;
    if (!functionsInTableMap) {
        functionsInTableMap = new WeakMap;
        for (var i = 0; i < table.length; i++) {
            var item = table.get(i);
            if (item) {
                functionsInTableMap.set(item, i)
            }
        }
    }
    if (functionsInTableMap.has(func)) {
        return functionsInTableMap.get(func)
    }
    var ret;
    if (freeTableIndexes.length) {
        ret = freeTableIndexes.pop()
    } else {
        ret = table.length;
        try {
            table.grow(1)
        } catch (err) {
            if (!(err instanceof RangeError)) {
                throw err
            }
            throw "Unable to grow wasm table. Set ALLOW_TABLE_GROWTH."
        }
    }
    try {
        table.set(ret, func)
    } catch (err) {
        if (!(err instanceof TypeError)) {
            throw err
        }
        var wrapped = convertJsFunctionToWasm(func, sig);
        table.set(ret, wrapped)
    }
    functionsInTableMap.set(func, ret);
    return ret
}

function removeFunctionWasm(index) {
    functionsInTableMap.delete(wasmTable.get(index));
    freeTableIndexes.push(index)
}
var funcWrappers = {};

function dynCall(sig, ptr, args) {
    if (args && args.length) {
        return Module["dynCall_" + sig].apply(null, [ptr].concat(args))
    } else {
        return Module["dynCall_" + sig].call(null, ptr)
    }
}
var tempRet0 = 0;
var setTempRet0 = function(value) {
    tempRet0 = value
};
var wasmBinary;
if (Module["wasmBinary"]) wasmBinary = Module["wasmBinary"];
var noExitRuntime;
if (Module["noExitRuntime"]) noExitRuntime = Module["noExitRuntime"];
if (typeof WebAssembly !== "object") {
    abort("no native wasm support detected")
}

function setValue(ptr, value, type, noSafe) {
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

function getValue(ptr, type, noSafe) {
    type = type || "i8";
    if (type.charAt(type.length - 1) === "*") type = "i32";
    switch (type) {
        case "i1":
            return HEAP8[ptr >> 0];
        case "i8":
            return HEAP8[ptr >> 0];
        case "i16":
            return HEAP16[ptr >> 1];
        case "i32":
            return HEAP32[ptr >> 2];
        case "i64":
            return HEAP32[ptr >> 2];
        case "float":
            return HEAPF32[ptr >> 2];
        case "double":
            return HEAPF64[ptr >> 3];
        default:
            abort("invalid type for getValue: " + type)
    }
    return null
}
var wasmMemory;
var wasmTable = new WebAssembly.Table({
    "initial": 932,
    "maximum": 932 + 0,
    "element": "anyfunc"
});
var ABORT = false;
var EXITSTATUS = 0;

function assert(condition, text) {
    if (!condition) {
        abort("Assertion failed: " + text)
    }
}

function getCFunc(ident) {
    var func = Module["_" + ident];
    assert(func, "Cannot call unknown function " + ident + ", make sure it is exported");
    return func
}

function ccall(ident, returnType, argTypes, args, opts) {
    var toC = {
        "string": function(str) {
            var ret = 0;
            if (str !== null && str !== undefined && str !== 0) {
                var len = (str.length << 2) + 1;
                ret = stackAlloc(len);
                stringToUTF8(str, ret, len)
            }
            return ret
        },
        "array": function(arr) {
            var ret = stackAlloc(arr.length);
            writeArrayToMemory(arr, ret);
            return ret
        }
    };

    function convertReturnValue(ret) {
        if (returnType === "string") return UTF8ToString(ret);
        if (returnType === "boolean") return Boolean(ret);
        return ret
    }
    var func = getCFunc(ident);
    var cArgs = [];
    var stack = 0;
    if (args) {
        for (var i = 0; i < args.length; i++) {
            var converter = toC[argTypes[i]];
            if (converter) {
                if (stack === 0) stack = stackSave();
                cArgs[i] = converter(args[i])
            } else {
                cArgs[i] = args[i]
            }
        }
    }
    var ret = func.apply(null, cArgs);
    ret = convertReturnValue(ret);
    if (stack !== 0) stackRestore(stack);
    return ret
}

function cwrap(ident, returnType, argTypes, opts) {
    argTypes = argTypes || [];
    var numericArgs = argTypes.every(function(type) {
        return type === "number"
    });
    var numericRet = returnType !== "string";
    if (numericRet && numericArgs && !opts) {
        return getCFunc(ident)
    }
    return function() {
        return ccall(ident, returnType, argTypes, arguments, opts)
    }
}
var ALLOC_NONE = 3;
var UTF8Decoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf8") : undefined;

function UTF8ArrayToString(heap, idx, maxBytesToRead) {
    var endIdx = idx + maxBytesToRead;
    var endPtr = idx;
    while (heap[endPtr] && !(endPtr >= endIdx)) ++endPtr;
    if (endPtr - idx > 16 && heap.subarray && UTF8Decoder) {
        return UTF8Decoder.decode(heap.subarray(idx, endPtr))
    } else {
        var str = "";
        while (idx < endPtr) {
            var u0 = heap[idx++];
            if (!(u0 & 128)) {
                str += String.fromCharCode(u0);
                continue
            }
            var u1 = heap[idx++] & 63;
            if ((u0 & 224) == 192) {
                str += String.fromCharCode((u0 & 31) << 6 | u1);
                continue
            }
            var u2 = heap[idx++] & 63;
            if ((u0 & 240) == 224) {
                u0 = (u0 & 15) << 12 | u1 << 6 | u2
            } else {
                u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | heap[idx++] & 63
            }
            if (u0 < 65536) {
                str += String.fromCharCode(u0)
            } else {
                var ch = u0 - 65536;
                str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023)
            }
        }
    }
    return str
}

function UTF8ToString(ptr, maxBytesToRead) {
    return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : ""
}

function stringToUTF8Array(str, heap, outIdx, maxBytesToWrite) {
    if (!(maxBytesToWrite > 0)) return 0;
    var startIdx = outIdx;
    var endIdx = outIdx + maxBytesToWrite - 1;
    for (var i = 0; i < str.length; ++i) {
        var u = str.charCodeAt(i);
        if (u >= 55296 && u <= 57343) {
            var u1 = str.charCodeAt(++i);
            u = 65536 + ((u & 1023) << 10) | u1 & 1023
        }
        if (u <= 127) {
            if (outIdx >= endIdx) break;
            heap[outIdx++] = u
        } else if (u <= 2047) {
            if (outIdx + 1 >= endIdx) break;
            heap[outIdx++] = 192 | u >> 6;
            heap[outIdx++] = 128 | u & 63
        } else if (u <= 65535) {
            if (outIdx + 2 >= endIdx) break;
            heap[outIdx++] = 224 | u >> 12;
            heap[outIdx++] = 128 | u >> 6 & 63;
            heap[outIdx++] = 128 | u & 63
        } else {
            if (outIdx + 3 >= endIdx) break;
            heap[outIdx++] = 240 | u >> 18;
            heap[outIdx++] = 128 | u >> 12 & 63;
            heap[outIdx++] = 128 | u >> 6 & 63;
            heap[outIdx++] = 128 | u & 63
        }
    }
    heap[outIdx] = 0;
    return outIdx - startIdx
}

function stringToUTF8(str, outPtr, maxBytesToWrite) {
    return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite)
}

function lengthBytesUTF8(str) {
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
var UTF16Decoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf-16le") : undefined;

function writeArrayToMemory(array, buffer) {
    HEAP8.set(array, buffer)
}

function writeAsciiToMemory(str, buffer, dontAddNull) {
    for (var i = 0; i < str.length; ++i) {
        HEAP8[buffer++ >> 0] = str.charCodeAt(i)
    }
    if (!dontAddNull) HEAP8[buffer >> 0] = 0
}
var WASM_PAGE_SIZE = 65536;
var buffer, HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;

function updateGlobalBufferAndViews(buf) {
    buffer = buf;
    Module["HEAP8"] = HEAP8 = new Int8Array(buf);
    Module["HEAP16"] = HEAP16 = new Int16Array(buf);
    Module["HEAP32"] = HEAP32 = new Int32Array(buf);
    Module["HEAPU8"] = HEAPU8 = new Uint8Array(buf);
    Module["HEAPU16"] = HEAPU16 = new Uint16Array(buf);
    Module["HEAPU32"] = HEAPU32 = new Uint32Array(buf);
    Module["HEAPF32"] = HEAPF32 = new Float32Array(buf);
    Module["HEAPF64"] = HEAPF64 = new Float64Array(buf)
}
var STACK_BASE = 5357952,
    DYNAMIC_BASE = 5357952,
    DYNAMICTOP_PTR = 114912;
var INITIAL_INITIAL_MEMORY = Module["INITIAL_MEMORY"] || 16777216;
if (Module["wasmMemory"]) {
    wasmMemory = Module["wasmMemory"]
} else {
    wasmMemory = new WebAssembly.Memory({
        "initial": INITIAL_INITIAL_MEMORY / WASM_PAGE_SIZE,
        "maximum": INITIAL_INITIAL_MEMORY / WASM_PAGE_SIZE
    })
}
if (wasmMemory) {
    buffer = wasmMemory.buffer
}
INITIAL_INITIAL_MEMORY = buffer.byteLength;
updateGlobalBufferAndViews(buffer);
HEAP32[DYNAMICTOP_PTR >> 2] = DYNAMIC_BASE;

function callRuntimeCallbacks(callbacks) {
    while (callbacks.length > 0) {
        var callback = callbacks.shift();
        if (typeof callback == "function") {
            callback(Module);
            continue
        }
        var func = callback.func;
        if (typeof func === "number") {
            if (callback.arg === undefined) {
                Module["dynCall_v"](func)
            } else {
                Module["dynCall_vi"](func, callback.arg)
            }
        } else {
            func(callback.arg === undefined ? null : callback.arg)
        }
    }
}
var __ATPRERUN__ = [];
var __ATINIT__ = [];
var __ATMAIN__ = [];
var __ATPOSTRUN__ = [];
var runtimeInitialized = false;
var runtimeExited = false;

function preRun() {
    if (Module["preRun"]) {
        if (typeof Module["preRun"] == "function") Module["preRun"] = [Module["preRun"]];
        while (Module["preRun"].length) {
            addOnPreRun(Module["preRun"].shift())
        }
    }
    callRuntimeCallbacks(__ATPRERUN__)
}

function initRuntime() {
    runtimeInitialized = true;
    callRuntimeCallbacks(__ATINIT__)
}

function preMain() {
    callRuntimeCallbacks(__ATMAIN__)
}

function exitRuntime() {
    runtimeExited = true
}

function postRun() {
    if (Module["postRun"]) {
        if (typeof Module["postRun"] == "function") Module["postRun"] = [Module["postRun"]];
        while (Module["postRun"].length) {
            addOnPostRun(Module["postRun"].shift())
        }
    }
    callRuntimeCallbacks(__ATPOSTRUN__)
}

function addOnPreRun(cb) {
    __ATPRERUN__.unshift(cb)
}

function addOnPostRun(cb) {
    __ATPOSTRUN__.unshift(cb)
}
var Math_abs = Math.abs;
var Math_ceil = Math.ceil;
var Math_floor = Math.floor;
var Math_min = Math.min;
var runDependencies = 0;
var runDependencyWatcher = null;
var dependenciesFulfilled = null;

function addRunDependency(id) {
    runDependencies++;
    if (Module["monitorRunDependencies"]) {
        Module["monitorRunDependencies"](runDependencies)
    }
}

function removeRunDependency(id) {
    runDependencies--;
    if (Module["monitorRunDependencies"]) {
        Module["monitorRunDependencies"](runDependencies)
    }
    if (runDependencies == 0) {
        if (runDependencyWatcher !== null) {
            clearInterval(runDependencyWatcher);
            runDependencyWatcher = null
        }
        if (dependenciesFulfilled) {
            var callback = dependenciesFulfilled;
            dependenciesFulfilled = null;
            callback()
        }
    }
}
Module["preloadedImages"] = {};
Module["preloadedAudios"] = {};

function abort(what) {
    if (Module["onAbort"]) {
        Module["onAbort"](what)
    }
    what += "";
    err(what);
    ABORT = true;
    EXITSTATUS = 1;
    what = "abort(" + what + "). Build with -s ASSERTIONS=1 for more info.";
    var e = new WebAssembly.RuntimeError(what);
    throw e
}

function hasPrefix(str, prefix) {
    return String.prototype.startsWith ? str.startsWith(prefix) : str.indexOf(prefix) === 0
}
var dataURIPrefix = "data:application/octet-stream;base64,";

function isDataURI(filename) {
    return hasPrefix(filename, dataURIPrefix)
}
var fileURIPrefix = "file://";

function isFileURI(filename) {
    return hasPrefix(filename, fileURIPrefix)
}
var wasmBinaryFile = "a.wasm";
if (!isDataURI(wasmBinaryFile)) {
    wasmBinaryFile = locateFile(wasmBinaryFile)
}

function getBinary() {
    try {
        if (wasmBinary) {
            return new Uint8Array(wasmBinary)
        }
        if (readBinary) {
            return readBinary(wasmBinaryFile)
        } else {
            throw "both async and sync fetching of the wasm failed"
        }
    } catch (err) {
        abort(err)
    }
}

function getBinaryPromise() {
    if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) && typeof fetch === "function" && !isFileURI(wasmBinaryFile)) {
        return fetch(wasmBinaryFile, {
            credentials: "same-origin"
        }).then(function(response) {
            if (!response["ok"]) {
                throw "failed to load wasm binary file at '" + wasmBinaryFile + "'"
            }
            return response["arrayBuffer"]()
        }).catch(function() {
            return getBinary()
        })
    }
    return new Promise(function(resolve, reject) {
        resolve(getBinary())
    })
}

function createWasm() {
    var info = {
        "env": asmLibraryArg,
        "wasi_snapshot_preview1": asmLibraryArg
    };

    function receiveInstance(instance, module) {
        var exports = instance.exports;
        Module["asm"] = exports;
        removeRunDependency("wasm-instantiate")
    }
    addRunDependency("wasm-instantiate");

    function receiveInstantiatedSource(output) {
        receiveInstance(output["instance"])
    }

    function instantiateArrayBuffer(receiver) {
        return getBinaryPromise().then(function(binary) {
            return WebAssembly.instantiate(binary, info)
        }).then(receiver, function(reason) {
            err("failed to asynchronously prepare wasm: " + reason);
            abort(reason)
        })
    }

    function instantiateAsync() {
        if (!wasmBinary && typeof WebAssembly.instantiateStreaming === "function" && !isDataURI(wasmBinaryFile) && !isFileURI(wasmBinaryFile) && typeof fetch === "function") {
            fetch(wasmBinaryFile, {
                credentials: "same-origin"
            }).then(function(response) {
                var result = WebAssembly.instantiateStreaming(response, info);
                return result.then(receiveInstantiatedSource, function(reason) {
                    err("wasm streaming compile failed: " + reason);
                    err("falling back to ArrayBuffer instantiation");
                    return instantiateArrayBuffer(receiveInstantiatedSource)
                })
            })
        } else {
            return instantiateArrayBuffer(receiveInstantiatedSource)
        }
    }
    if (Module["instantiateWasm"]) {
        try {
            var exports = Module["instantiateWasm"](info, receiveInstance);
            return exports
        } catch (e) {
            err("Module.instantiateWasm callback failed with error: " + e);
            return false
        }
    }
    instantiateAsync();
    return {}
}
var tempDouble;
var tempI64;
__ATINIT__.push({
    func: function() {
        ___wasm_call_ctors()
    }
});

function demangle(func) {
    return func
}

function demangleAll(text) {
    var regex = /\b_Z[\w\d_]+/g;
    return text.replace(regex, function(x) {
        var y = demangle(x);
        return x === y ? x : y + " [" + x + "]"
    })
}

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

function ___assert_fail(condition, filename, line, func) {
    abort("Assertion failed: " + UTF8ToString(condition) + ", at: " + [filename ? UTF8ToString(filename) : "unknown filename", line, func ? UTF8ToString(func) : "unknown function"])
}

function ___cxa_allocate_exception(size) {
    return _malloc(size)
}
var exceptionInfos = {};
var exceptionLast = 0;

function __ZSt18uncaught_exceptionv() {
    return __ZSt18uncaught_exceptionv.uncaught_exceptions > 0
}

function ___cxa_throw(ptr, type, destructor) {
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
    if (!("uncaught_exception" in __ZSt18uncaught_exceptionv)) {
        __ZSt18uncaught_exceptionv.uncaught_exceptions = 1
    } else {
        __ZSt18uncaught_exceptionv.uncaught_exceptions++
    }
    throw ptr
}

function _abort() {
    abort()
}

function _emscripten_get_sbrk_ptr() {
    return 114912
}

function _emscripten_memcpy_big(dest, src, num) {
    HEAPU8.copyWithin(dest, src, src + num)
}

function abortOnCannotGrowMemory(requestedSize) {
    abort("OOM")
}

function _emscripten_resize_heap(requestedSize) {
    requestedSize = requestedSize >>> 0;
    abortOnCannotGrowMemory(requestedSize)
}

function _exit(status) {
    exit(status)
}
var PATH = {
    splitPath: function(filename) {
        var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
        return splitPathRe.exec(filename).slice(1)
    },
    normalizeArray: function(parts, allowAboveRoot) {
        var up = 0;
        for (var i = parts.length - 1; i >= 0; i--) {
            var last = parts[i];
            if (last === ".") {
                parts.splice(i, 1)
            } else if (last === "..") {
                parts.splice(i, 1);
                up++
            } else if (up) {
                parts.splice(i, 1);
                up--
            }
        }
        if (allowAboveRoot) {
            for (; up; up--) {
                parts.unshift("..")
            }
        }
        return parts
    },
    normalize: function(path) {
        var isAbsolute = path.charAt(0) === "/",
            trailingSlash = path.substr(-1) === "/";
        path = PATH.normalizeArray(path.split("/").filter(function(p) {
            return !!p
        }), !isAbsolute).join("/");
        if (!path && !isAbsolute) {
            path = "."
        }
        if (path && trailingSlash) {
            path += "/"
        }
        return (isAbsolute ? "/" : "") + path
    },
    dirname: function(path) {
        var result = PATH.splitPath(path),
            root = result[0],
            dir = result[1];
        if (!root && !dir) {
            return "."
        }
        if (dir) {
            dir = dir.substr(0, dir.length - 1)
        }
        return root + dir
    },
    basename: function(path) {
        if (path === "/") return "/";
        var lastSlash = path.lastIndexOf("/");
        if (lastSlash === -1) return path;
        return path.substr(lastSlash + 1)
    },
    extname: function(path) {
        return PATH.splitPath(path)[3]
    },
    join: function() {
        var paths = Array.prototype.slice.call(arguments, 0);
        return PATH.normalize(paths.join("/"))
    },
    join2: function(l, r) {
        return PATH.normalize(l + "/" + r)
    }
};
var SYSCALLS = {
    mappings: {},
    buffers: [null, [],
        []
    ],
    printChar: function(stream, curr) {
        var buffer = SYSCALLS.buffers[stream];
        if (curr === 0 || curr === 10) {
            (stream === 1 ? out : err)(UTF8ArrayToString(buffer, 0));
            buffer.length = 0
        } else {
            buffer.push(curr)
        }
    },
    varargs: undefined,
    get: function() {
        SYSCALLS.varargs += 4;
        var ret = HEAP32[SYSCALLS.varargs - 4 >> 2];
        return ret
    },
    getStr: function(ptr) {
        var ret = UTF8ToString(ptr);
        return ret
    },
    get64: function(low, high) {
        return low
    }
};

function _fd_close(fd) {
    return 0
}

function _fd_seek(fd, offset_low, offset_high, whence, newOffset) {}

function _fd_write(fd, iov, iovcnt, pnum) {
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

function _setTempRet0($i) {
    setTempRet0($i | 0)
}
var ASSERTIONS = false;
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
// var asm = createWasm();
var asm = {};

var ___wasm_call_ctors = Module["___wasm_call_ctors"] = function() {
    return (___wasm_call_ctors = Module["___wasm_call_ctors"] = Module["asm"]["__wasm_call_ctors"]).apply(null, arguments)
};
var _get_size = Module["_get_size"] = function() {
    return (_get_size = Module["_get_size"] = Module["asm"]["get_size"]).apply(null, arguments)
};
var _get_result_p = Module["_get_result_p"] = function() {
    return (_get_result_p = Module["_get_result_p"] = Module["asm"]["get_result_p"]).apply(null, arguments)
};
var _free_memory = Module["_free_memory"] = function() {
    return (_free_memory = Module["_free_memory"] = Module["asm"]["free_memory"]).apply(null, arguments)
};
var _compileWatToWasm = Module["_compileWatToWasm"] = function() {
    return (_compileWatToWasm = Module["_compileWatToWasm"] = Module["asm"]["compileWatToWasm"]).apply(null, arguments)
};
var ___errno_location = Module["___errno_location"] = function() {
    return (___errno_location = Module["___errno_location"] = Module["asm"]["__errno_location"]).apply(null, arguments)
};
var _free = Module["_free"] = function() {
    return (_free = Module["_free"] = Module["asm"]["free"]).apply(null, arguments)
};
var _malloc = Module["_malloc"] = function() {
    return (_malloc = Module["_malloc"] = Module["asm"]["malloc"]).apply(null, arguments)
};
var _setThrew = Module["_setThrew"] = function() {
    return (_setThrew = Module["_setThrew"] = Module["asm"]["setThrew"]).apply(null, arguments)
};
var stackSave = Module["stackSave"] = function() {
    return (stackSave = Module["stackSave"] = Module["asm"]["stackSave"]).apply(null, arguments)
};
var stackRestore = Module["stackRestore"] = function() {
    return (stackRestore = Module["stackRestore"] = Module["asm"]["stackRestore"]).apply(null, arguments)
};
var stackAlloc = Module["stackAlloc"] = function() {
    return (stackAlloc = Module["stackAlloc"] = Module["asm"]["stackAlloc"]).apply(null, arguments)
};
var __growWasmMemory = Module["__growWasmMemory"] = function() {
    return (__growWasmMemory = Module["__growWasmMemory"] = Module["asm"]["__growWasmMemory"]).apply(null, arguments)
};
var dynCall_ii = Module["dynCall_ii"] = function() {
    return (dynCall_ii = Module["dynCall_ii"] = Module["asm"]["dynCall_ii"]).apply(null, arguments)
};
var dynCall_vi = Module["dynCall_vi"] = function() {
    return (dynCall_vi = Module["dynCall_vi"] = Module["asm"]["dynCall_vi"]).apply(null, arguments)
};
var dynCall_vii = Module["dynCall_vii"] = function() {
    return (dynCall_vii = Module["dynCall_vii"] = Module["asm"]["dynCall_vii"]).apply(null, arguments)
};
var dynCall_iii = Module["dynCall_iii"] = function() {
    return (dynCall_iii = Module["dynCall_iii"] = Module["asm"]["dynCall_iii"]).apply(null, arguments)
};
var dynCall_viii = Module["dynCall_viii"] = function() {
    return (dynCall_viii = Module["dynCall_viii"] = Module["asm"]["dynCall_viii"]).apply(null, arguments)
};
var dynCall_iiiii = Module["dynCall_iiiii"] = function() {
    return (dynCall_iiiii = Module["dynCall_iiiii"] = Module["asm"]["dynCall_iiiii"]).apply(null, arguments)
};
var dynCall_iiii = Module["dynCall_iiii"] = function() {
    return (dynCall_iiii = Module["dynCall_iiii"] = Module["asm"]["dynCall_iiii"]).apply(null, arguments)
};
var dynCall_iiiiiii = Module["dynCall_iiiiiii"] = function() {
    return (dynCall_iiiiiii = Module["dynCall_iiiiiii"] = Module["asm"]["dynCall_iiiiiii"]).apply(null, arguments)
};
var dynCall_iiiiii = Module["dynCall_iiiiii"] = function() {
    return (dynCall_iiiiii = Module["dynCall_iiiiii"] = Module["asm"]["dynCall_iiiiii"]).apply(null, arguments)
};
var dynCall_iiiiiiii = Module["dynCall_iiiiiiii"] = function() {
    return (dynCall_iiiiiiii = Module["dynCall_iiiiiiii"] = Module["asm"]["dynCall_iiiiiiii"]).apply(null, arguments)
};
var dynCall_iij = Module["dynCall_iij"] = function() {
    return (dynCall_iij = Module["dynCall_iij"] = Module["asm"]["dynCall_iij"]).apply(null, arguments)
};
var dynCall_iiij = Module["dynCall_iiij"] = function() {
    return (dynCall_iiij = Module["dynCall_iiij"] = Module["asm"]["dynCall_iiij"]).apply(null, arguments)
};
var dynCall_iidiiii = Module["dynCall_iidiiii"] = function() {
    return (dynCall_iidiiii = Module["dynCall_iidiiii"] = Module["asm"]["dynCall_iidiiii"]).apply(null, arguments)
};
var dynCall_jiji = Module["dynCall_jiji"] = function() {
    return (dynCall_jiji = Module["dynCall_jiji"] = Module["asm"]["dynCall_jiji"]).apply(null, arguments)
};
var dynCall_viiiiii = Module["dynCall_viiiiii"] = function() {
    return (dynCall_viiiiii = Module["dynCall_viiiiii"] = Module["asm"]["dynCall_viiiiii"]).apply(null, arguments)
};
var dynCall_viiiii = Module["dynCall_viiiii"] = function() {
    return (dynCall_viiiii = Module["dynCall_viiiii"] = Module["asm"]["dynCall_viiiii"]).apply(null, arguments)
};
var dynCall_viiii = Module["dynCall_viiii"] = function() {
    return (dynCall_viiii = Module["dynCall_viiii"] = Module["asm"]["dynCall_viiii"]).apply(null, arguments)
};
Module["cwrap"] = cwrap;
Module["setValue"] = setValue;
Module["getValue"] = getValue;
var calledRun;

function ExitStatus(status) {
    this.name = "ExitStatus";
    this.message = "Program terminated with exit(" + status + ")";
    this.status = status
}
dependenciesFulfilled = function runCaller() {
    if (!calledRun) run();
    if (!calledRun) dependenciesFulfilled = runCaller
};

// function run(args) {
//     args = args || arguments_;
//     if (runDependencies > 0) {
//         return
//     }
//     preRun();
//     if (runDependencies > 0) return;

//     function doRun() {
//         if (calledRun) return;
//         calledRun = true;
//         Module["calledRun"] = true;
//         if (ABORT) return;
//         initRuntime();
//         preMain();
//         if (Module["onRuntimeInitialized"]) Module["onRuntimeInitialized"]();
//         postRun()
//     }
//     if (Module["setStatus"]) {
//         Module["setStatus"]("Running...");
//         setTimeout(function() {
//             setTimeout(function() {
//                 Module["setStatus"]("")
//             }, 1);
//             doRun()
//         }, 1)
//     } else {
//         doRun()
//     }
// }
Module["run"] = run;

function exit(status, implicit) {
    if (implicit && noExitRuntime && status === 0) {
        return
    }
    if (noExitRuntime) {} else {
        ABORT = true;
        EXITSTATUS = status;
        exitRuntime();
        if (Module["onExit"]) Module["onExit"](status)
    }
    quit_(status, new ExitStatus(status))
}
if (Module["preInit"]) {
    if (typeof Module["preInit"] == "function") Module["preInit"] = [Module["preInit"]];
    while (Module["preInit"].length > 0) {
        Module["preInit"].pop()()
    }
}
noExitRuntime = true;
// run();

let compileWatToWasm = null;

async function run(wasmModulePath: string) {
   // prepare imports
  const info = {
    'env': asmLibraryArg,
    'wasi_snapshot_preview1': asmLibraryArg
  };

  const fetchedWasm = await fetch(wasmModulePath);

  const instantiated = await WebAssembly.instantiateStreaming(fetchedWasm, info);

  const exports: any = instantiated.instance.exports;

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

export async function getCompileWatToWasm(wasmModulePath: string) {
  const {
    free,
    malloc,
    free_memory,
    get_size,
    get_result_p,
    compileWatToWasm: _compileWatToWasm,
  } = await run(wasmModulePath);

  const compiledFunc = function (wat: string): Uint8Array {
    const string_size = lengthBytesUTF8(wat);
    const string_p = malloc(string_size);

    // stringToUTF8(wat, string_p, string_size);

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

  compileWatToWasm = compiledFunc;

  return compileWatToWasm;
}

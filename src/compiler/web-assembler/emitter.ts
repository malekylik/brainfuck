import { signedLEB128, unsignedLEB128, encodeString, ieee754 } from "./encoding";

// local
// 3, // 2 of sequence(5 - int32, 8 - int32, 10 - f32)
// 0x05, // 5 of int32
// 127,
// 0x8, // 8 of int32
// 127,
// 0x10,
// 125,

// store
// Opcodes.i32_const,
// ...signedLEB128(12), // address to store

// Opcodes.i32_const,
// ...signedLEB128(62), // value to stroe

// Opcodes.i32_store8,
// ...unsignedLEB128(0), // flag
// ...signedLEB128(-5),   // offset - only unsigned


// loop
// Opcodes.loop,
// Valtype.void, // type of  result of block

// Opcodes.get_local,
// ...unsignedLEB128(loop_index),

// Opcodes.call,
// ...unsignedLEB128(0),

// Opcodes.get_local,
// ...unsignedLEB128(loop_index),

// Opcodes.i32_const,
// ...unsignedLEB128(1),

// Opcodes.i32_sub,

// Opcodes.tee_local,
// ...unsignedLEB128(loop_index),

// Opcodes.i32_const,
// ...unsignedLEB128(0),

// Opcodes.i32_gt_u,

// Opcodes.br_if,
// ...unsignedLEB128(0),

// Opcodes.end,

const flatten = (arr: any[]): any[] => {
  const state = [];
  let i = 0;
  let a = arr;
  const result = [];

  while (true) {
    const val = a[i];
    if (Array.isArray(val)) {
      state.push({ i: i, a: a });
      a = val;
      i = -1;
    } else if (val !== undefined) {
      result.push(val)
    }
    if (i++ >= a.length - 1) {
      if (state.length > 0) {
        const s = state.pop();
        a = s.a;
        i = s.i + 1;
      } else {
        break;
      }
    }
  }

  return result;
};

// https://webassembly.github.io/spec/core/binary/modules.html#sections
enum Section {
  custom = 0,
  type = 1,
  import = 2,
  func = 3,
  table = 4,
  memory = 5,
  global = 6,
  export = 7,
  start = 8,
  element = 9,
  code = 10,
  data = 11
}

// https://webassembly.github.io/spec/core/binary/types.html
export enum Valtype {
  void = 0x40,
  i32 = 0x7f,
  f32 = 0x7d
}

// https://webassembly.github.io/spec/core/binary/instructions.html
export enum Opcodes {
  block = 0x02,
  loop = 0x03,
  if = 0x04,
  else = 0x05,
  end = 0x0B,
  br = 0x0C,
  br_if = 0x0D,
  return = 0x0F,
  call = 0x10,
  get_local = 0x20,
  set_local = 0x21,
  tee_local = 0x22,
  i32_load8_u = 0x2D,
  i32_store8 = 0x3A,
  i32_const = 0x41,
  f32_const = 0x43,
  i32_eqz = 0x45,
  i32_lt_s = 0x48,
  i32_lt_u = 0x49,
  i32_gt_u = 0x4B,
  i32_add = 0x6A,
  i32_sub = 0x6B,
  i32_mul = 0x6C,
  f32_add = 0x92,
}

// http://webassembly.github.io/spec/core/binary/modules.html#export-section
enum ExportType {
  func = 0x00,
  table = 0x01,
  mem = 0x02,
  global = 0x03
}

// http://webassembly.github.io/spec/core/binary/types.html#function-types
const functionType = 0x60;

export const emptyArray = 0x0;

// https://webassembly.github.io/spec/core/binary/modules.html#binary-module
const magicModuleHeader = [0x00, 0x61, 0x73, 0x6d];
const moduleVersion = [0x01, 0x00, 0x00, 0x00];

// https://webassembly.github.io/spec/core/binary/conventions.html#binary-vec
// Vectors are encoded with their length followed by their element sequence
export const encodeVector = (data: any[]) => [
  ...unsignedLEB128(data.length),
  ...flatten(data)
];

// https://webassembly.github.io/spec/core/binary/modules.html#sections
// sections are encoded by their type followed by their vector contents
const createSection = (sectionType: Section, data: any[]) => [
  sectionType,
  ...encodeVector(data)
];

// export const emitter: Emitter = (ast: Array<number>) => {
export const emitter: Emitter = (code: Array<number>) => {
  // Function types are vectors of parameters and return types. Currently
  // WebAssembly only supports single return values
  const intVoidType = [functionType, ...encodeVector([Valtype.i32]), emptyArray];
  const intIntType = [functionType, emptyArray, emptyArray];

  // the type section is a vector of function types
  const typeSection = createSection(
    Section.type,
    encodeVector([
      intVoidType,
      intIntType,
    ])
  );

  // the function section is a vector of type indices that indicate the type of each function
  // in the code section
  const funcSection = createSection(
    Section.func,
    encodeVector([0x01 /* type index */])
  );

  // the import section is a vector of imported functions
  const printFunctionImport = [
    ...encodeString("env"),
    ...encodeString("print"),
    ExportType.func,
    0x00 // type index
  ];

  const memoryImport = [
    ...encodeString("env"),
    ...encodeString("memory"),
    ExportType.mem,
    0x00, // flag that no max
    ...unsignedLEB128(1),
  ]

  const importSection = createSection(
    Section.import,
    encodeVector([printFunctionImport, memoryImport]),
  );

  // console.log('encodeVector([printFunctionImport])', encodeVector([printFunctionImport]));
  // console.log('importSection', importSection);


  // // the export section is a vector of exported functions
  // const memorySection = createSection(
  //   Section.memory,
  //   [
  //     ...unsignedLEB128(1), // memory count
  //     0x00, // flag that no max
  //     // 65536
  //     // ...unsignedLEB128(65536),
  //     ...unsignedLEB128(1),
  //   ]
  // );

  // console.log('memorySection', memorySection)

  // the export section is a vector of exported functions
  const exportSection = createSection(
    Section.export,
    encodeVector([
      [...encodeString("run"), ExportType.func, 0x01 /* function index */]
    ])
  );

  // // the code section contains vectors of functions
  // code = [
  //   Opcodes.get_local,
  //   ...unsignedLEB128(0),
  //   Opcodes.i32_const,
  //   ...unsignedLEB128(2),
  //   Opcodes.lt_u,
  //   Opcodes.if,
  //   Valtype.i32,
  //   Opcodes.i32_const,
  //   ...unsignedLEB128(1),
  //   Opcodes.else,
  //   Opcodes.get_local,
  //   ...unsignedLEB128(0),
  //   Opcodes.i32_const,
  //   ...unsignedLEB128(1),
  //   Opcodes.i32_sub,
  //   Opcodes.call,
  //   ...unsignedLEB128(1),
  //   Opcodes.get_local,
  //   ...unsignedLEB128(0),
  //   Opcodes.i32_mul,
  //   Opcodes.end,
  // ];

  const functionBody = encodeVector([
    // emptyArray /** locals */,
    ...code,
    Opcodes.end
  ]);

  const codeSection = createSection(Section.code, encodeVector([functionBody]));

  // console.log('sections', Uint8Array.from([
  //   ...magicModuleHeader,
  //   ...moduleVersion,
  //   ...typeSection,
  //   ...importSection,
  //   ...funcSection,
  //   ...exportSection,
  // ]));

  // console.log('codeSection', Uint8Array.from([
  //   ...codeSection
  // ]));

  return Uint8Array.from([
    ...magicModuleHeader,
    ...moduleVersion,
    ...typeSection,
    ...importSection,
    ...funcSection,
    // ...memorySection,
    ...exportSection,
    ...codeSection
  ]);
};

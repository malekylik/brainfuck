const magicModuleHeader: Array<number> = [0x00, 0x61, 0x73, 0x6d]; '\0asm'
const moduleVersion: Array<number> = [0x01, 0x00, 0x00, 0x00]; '\0\0\0 1'

type Emitter = () => Uint8Array;

export const emitter: Emitter = () =>
  Uint8Array.from([
    ...magicModuleHeader,
    ...moduleVersion
]);

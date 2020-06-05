export const isTextCoderSupported = self['TextDecoder'] && self['TextEncoder'];

export const isWebAssemblySupported = Boolean(self['WebAssembly']);

export const isFetchSupported = Boolean(self['fetch']) && false;

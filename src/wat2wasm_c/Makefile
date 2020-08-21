CC := ~/others/frontend/workspace/emsdk/upstream/emscripten/emcc
EXPORT_FUNCTIONS := '_compileWatToWasm', '_get_size', '_get_result_p', '_free_memory'
EXTRA_EXPORT_FUNCTION := 'cwrap', 'setValue', 'getValue'
BIN_FILES := src/tools/wat2wasmweb.cc src/binary-writer.cc src/common.cc src/error-formatter.cc src/feature.cc\
 src/filenames.cc src/ir.cc src/option-parser.cc src/resolve-names.cc src/stream.cc src/validator.cc src/wast-parser.cc\
 src/literal.cc src/apply-names.cc src/type-checker.cc src/opcode.cc src/shared-validator.cc src/expr-visitor.cc src/wast-lexer.cc\
 src/binary-reader-ir.cc src/utf8.cc src/token.cc src/lexer-source.cc src/binary.cc src/binary-reader.cc src/leb128.cc src/string-view.cc\
 src/binary-reader-objdump.cc src/binary-reader-logging.cc src/binding-hash.cc


quick_example.js: $(BIN_FILES)
	$(CC) -o a.js -O2 -I ~/others/c/workspace/assembler/wabt -I ~/others/c/workspace/assembler/wabt/build\
 -s EXPORTED_FUNCTIONS="[$(EXPORT_FUNCTIONS)]" -s EXTRA_EXPORTED_RUNTIME_METHODS="[$(EXTRA_EXPORT_FUNCTION)]"\
 $(BIN_FILES)

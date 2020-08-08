#include "src/binary-writer.h"
#include "src/common.h"
#include "src/error-formatter.h"
#include "src/feature.h"
#include "src/filenames.h"
#include "src/ir.h"
#include "src/option-parser.h"
#include "src/resolve-names.h"
#include "src/stream.h"
#include "src/validator.h"
#include "src/wast-parser.h"

using namespace wabt;

struct Pair {
    MemoryStream* resust_p;
    uint64_t size;
};

extern "C" {

    uint64_t get_size(Pair* p) {
        return p->size;
    }

    uint8_t* get_result_p(Pair* p) {
        return p->resust_p->output_buffer().data.data();
    }

    void free_memory(Pair* p) {
        delete p->resust_p;
        delete p;
    }

    Pair* compileWatToWasm(uint8_t* was, uint64_t size) {
        const char s_infile[] = "web_wat";
        std::vector<uint8_t> file_data(size);

        for (uint64_t i = 0; i < size; i++) {
            file_data[i] = was[i];
        }

        std::unique_ptr<WastLexer> lexer = WastLexer::CreateBufferLexer(
            s_infile, file_data.data(), file_data.size());


        const char* s_description = "wat2wasm";
        OptionParser parser("wat2wasm", s_description);
        Features s_features;
        s_features.AddOptions(&parser);
        int argc = 0;
        char* argv[] = { (char*)"--enable-simd" };
        
        parser.Parse(argc, argv);

        Errors errors;
        std::unique_ptr<Module> module;
        WastParseOptions parse_wast_options(s_features);
        Result result = ParseWatModule(lexer.get(), &module, &errors, &parse_wast_options);

        bool s_validate = true;

        if (Succeeded(result) && s_validate) {
            ValidateOptions options(s_features);
            result = ValidateModule(module.get(), &errors, options);
        }

        if (!Succeeded(result)) {
            printf("validation wat error\n");

            for (uint32_t i = 0; i < errors.size(); i++) {
                printf("error message: %s\n", errors[i].message.c_str());
                printf("error line: %i\n", errors[i].loc.line);
            }
        }

        if (Succeeded(result)) {
            MemoryStream* stream = new MemoryStream(nullptr);
            WriteBinaryOptions s_write_binary_options;
            s_write_binary_options.features = s_features;
            result = WriteBinaryModule(stream, module.get(), s_write_binary_options);

            if (Succeeded(result)) {
                auto size = stream->output_buffer().data.size();

                Pair* v = new Pair();
                v->resust_p = stream;
                v->size = size;

                return v;
            }
        }

        Pair* v = new Pair();
        return v;
    }

}

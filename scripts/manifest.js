const path = require('path');
const Compiler = require("easescript/lib/core/Compiler");
Compiler.buildTypesManifest(
    [path.resolve('./types/think.d.es')], 
    {
        name:'es-thinkphp', 
        inherits:['es-php']
    },
    './types'
);
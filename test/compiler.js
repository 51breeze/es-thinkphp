const Compiler = require("easescript/lib/core/Compiler");
const Compilation = require("easescript/lib/core/Compilation");
const path =require("path");
let plugin = require("../dist/index");
plugin = plugin.default || plugin
class Creator {
    constructor(options){
        const compiler = new Compiler(Object.assign({
            debug:false,
            diagnose:false,
            enableComments:true,
            autoLoadDescribeFile:true,
            workspace:path.join(__dirname,"./src"),
            scanTypings:true,
            parser:{
                locations:true
            }
        },options || {}));
        
        this._compiler = compiler;
        this.plugin =  plugin({
            folderAsNamespace:true,
            publicPath:'public',
            outDir:path.join(__dirname,"./build"),
            comments:true,
            manifests:{
                comments:true,
                annotations:true,
            },
            resolve:{
                routeFileName:'app',
                usings:[
                    'PHPUnit/Framework/TestCase',
                ],
                folders:{
                    '**/app/controller/*.es':'app/http',
                    '**/app/model/*.es':'app/model',
                    '**/assets/***':'static',
                    'config/**/*.es':'config/{...}',
                    'lang/*.es':'app/lang/{...}',
                    '**/*.route':'route',
                    "*.global":"escore",
                },
                namespaces:{}
            },
            includes:[
                './config/*',
                './lang/*',
                '.env',
            ]
        });
    }

    get compiler(){
        return this._compiler;
    }

    factor(file){
        return new Promise( async(resolved,reject)=>{
            const compiler = this.compiler;
            await compiler.initialize();
            await compiler.loadTypes([
                'lib/types/think.d.es',
            ], {
                scope:'es-thinkphp'
            });

            let compilation = null;
            try{
                compilation=file ? await compiler.createCompilation(file) : new Compilation( compiler );
                await compilation.ready();
                if(compilation.stack){
                    resolved(compilation);
                }else{
                    reject({compilation,errors:compiler.errors});
                }
            }catch(error){
                console.log( error )
                reject({compilation,errors:[error]});
            }
        });
    }

    startByFile(file){
        return this.factor(file);
    }

    async build(compilation){
        return await this.plugin.run(compilation);
    }
}

exports.Creator=Creator;
const Compiler = require("easescript/lib/core/Compiler");
const Compilation = require("easescript/lib/core/Compilation");
const path =require("path");
const plugin = require("../index");
class Creator {
    constructor(options){
        const compiler = new Compiler(Object.assign({
            debug:false,
            diagnose:true,
            autoLoadDescribeFile:true,
            output:path.join(__dirname,"./build"),
            workspace:path.join(__dirname,"./src"),
            resolvePaths:[path.join(process.cwd(), 'types')],
            scanTypings:false,
            parser:{
                locations:true
            }
        },options || {}));
        
        this._compiler = compiler;

        this.plugin = compiler.applyPlugin( {
            plugin,
            options:{
                folderAsNamespace:true,
                publicPath:'public',
                output:path.join(__dirname,"./build"),
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
                        'lang/**/*.es':'lang/{...}',
                        '**/*.route':'route',
                        "*.global":"escore",
                    },
                    namespaces:{}
                    
                },
                includes:[
                    './config/*',
                    '.env',
                ]
            }
        });
    }

    get compiler(){
        return this._compiler;
    }

    factor(file,source){
        return new Promise( async(resolved,reject)=>{
            const compiler = this.compiler;
            await compiler.initialize();
            await compiler.loadTypes([
                'types/think.d.es',
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

    startBySource(source){
        return this.factor(null, source);
    }

    startByFile(file){
        return this.factor(file);
    }

    expression( stack ){
        return this.plugin.make( stack );
    }

    build( compilation , done){
        return this.plugin.start( compilation, (e)=>{
            if( e ){
                console.log(e);
            }else{
                console.log("build done!!")
            }
            if(done)done();
        });
    }
}

exports.Creator=Creator;
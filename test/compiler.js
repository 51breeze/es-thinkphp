const Compiler = require("../../easescript2/lib/core/Compiler");
const Diagnostic = require("../../easescript2/lib/core/Diagnostic");
const Compilation = require("../../easescript2/lib/core/Compilation");
const path =require("path");
const plugin = require("../index");
class Creator {
    constructor(options){
        const compiler = new Compiler(Object.assign({
            debug:true,
            diagnose:true,
            autoLoadDescribeFile:true,
            output:path.join(__dirname,"./build"),
            workspace:path.join(__dirname,"./src"),
            scanTypings:false,
            parser:{
                locations:true
            }
        },options || {}));
        compiler.initialize();
        this._compiler = compiler;
        this.plugin = compiler.applyPlugin( plugin );
    }

    get compiler(){
        return this._compiler;
    }

    factor(file,source){
        return new Promise((resolved,reject)=>{
            const compiler = this.compiler;
            const compilation=file ? compiler.createCompilation(file, null, false, true) : new Compilation( compiler );
            try{
                compilation.parser(source);
                compilation.checker();
                const errors = compiler.errors.filter( error=> error.kind === 0 )
                if( !errors.length ){
                    resolved(compilation);
                }else{
                    reject({compilation,errors:compiler.errors});
                }
            }catch(error){
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
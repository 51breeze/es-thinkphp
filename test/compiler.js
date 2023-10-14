const Compiler = require("../../easescript2/lib/core/Compiler");
const Diagnostic = require("../../easescript2/lib/core/Diagnostic");
const Compilation = require("../../easescript2/lib/core/Compilation");
const path =require("path");
const plugin = require("../dist/index");
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
        this.plugin = compiler.applyPlugin( {plugin,options:{
            resolve:{
                useFolderAsNamespace:true,
                publicPath:'public',
                excludes:[],
                routeFileName:'app',
                disuse:['server.kernel.Controller'],
                using:['PHPUnit.Framework.TestCase','server.**'],
                mapping:{
                    folder:{
                      
                        //只有一级目录
                        '*/*.es::controller':'app/controller',
                        '*/*.es::router':'app/route',
                        '*/*.es::model':'app/model',
                        '*/*.es::config':'config',
                        'lang/*.es::general':'lang',
        
                        //只有二级目录
                        '*/*/*.es::controller':'%0/controller',
                        '*/*/*.es::model':'%0/model',
                        '*/*/*.es::router':'route',
                        '*/lang/*.es::general':'lang',
                        '*/config/*.es::general':'config',
                        '*/*/*.es::config':'config',
                        '*/*/*.es::general':'%0',
        
                        //三级以上目录
                        '*/*/*/***.es::controller':'%0/%1/controller/%...',
                        '*/*/*/***.es::router':'%0/%1/route/%...',
                        '*/*/lang/***.es::general':'%0/%1/lang/%...',
                        '*/*/config/***.es::general':'%0/%1/config/%...',
                        '*/*/*/***.es::config':'%0/%1/config/%...',
                        '*/*/*/***.es::model':'%0/%1/model/%...',
                        '*/*/*/***.es::general':'%0/%1/%...',
                        
                        //通用文件
                        '****.es::general':'%...',
                        '****::asset':'public/static/%...',
                        'config.es::general':'config',
                        'config/***.es::general':'config/%...',
                        'root':'./',
                        '*.es::global':'system',
                        
                    },
                    route:{
                        '*/*.es::controller':'%filename',
                        '*/*/*.es::controller':'/%filename',
                        '*/*/*/***.es::controller':'/%1/%filename',
                    },
                    namespace:{
                        'server.database.DbManager':'think',
                        'server.database.Paginator':'think',
                        'server.database.**':'think.db.%...',
                        'server.model.Model':'think',
                        'server.model.**':'think.model.%...',
                        'server.facade.*':'think.facade',
                        'server.route.**':'think.route.%...',
                        'server.response.**':'think.response.%...',
                        'server.event.**':'think.event.%...',
                        'server.kernel.*':'think'
                    }
                }
            },
            includes:[
                './config/*',
                '.env',
            ]
        }});
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
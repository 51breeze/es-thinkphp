const path = require("path");
const Builder = require("./core/Builder");
const Core = require("./core/Core");
const PluginPHP = require('es-php');
const {exec} = require("child_process");
const modules =  require("./tokens/index.js");
const defaultConfig ={
    framework:'thinkphp',
    version:"6.0.0",
    resolve:{
        useFolderAsNamespace:true,
        publicPath:'public',
        excludes:[],
        routeFileName:'app',
        disuse:['server.kernel.Controller'],
        using:['server.**'],
        mapping:{
            folder:{},
            route:{
                '*/*.es::controller':'%filename',
                '*/*/*.es::controller':'/%filename',
                '*/*/*/***.es::controller':'/%1/%filename',
            },
            namespace:{
                'server.database.DbManager':'think',
                'server.database.Paginator':'think',
                'server.database.concern.BaseQuery':'think.db.BaseQuery',
                'server.database.**':'think.db.%...',
                'server.model.Model':'think',
                'server.model.**':'think.model.%...',
                'server.facade.*':'think.facade',
                'server.route.**':'think.route.%...',
                'server.response.**':'think.response.%...',
                'server.event.**':'think.event.%...',
                "server.console.**": "think.console.%...",
                "server.driver.**":"think.filesystem.%...",
                'server.kernel.*':'think'
            }
        }
    },
    externals:[],
    includes:[]
}

const pkg = require("./package.json");
function registerError(define, cn, en){
    
}

function createProject(projectPath, version='6.x.x'){
    return new Promise((resolve,reject)=>{
        const name = path.basename( projectPath );
        exec(`composer create-project topthink/think=${version} ${name}`,{cwd:path.dirname( projectPath ),stdio: 'inherit'}, (error, stdout, stderr)=>{
            if( error ){
                reject( error )
            }else{
                resolve( stdout );
            }
        });
    });
}

class PluginEsThink extends PluginPHP{

    static init(projectPath, version){
        return createProject(projectPath, version);
    }

    constructor(compiler,options){
        options = Core.Merge({},defaultConfig, options);
        if( !options.resolve.using.includes('server.**') ){
            options.resolve.using.push('server.**');
        }

        if( !options.resolve.disuse.includes('server.kernel.Controller') ){
            options.resolve.disuse.push('server.kernel.Controller');
        }

        super(compiler, options);
        this.name = pkg.name;
        this.version = pkg.version;
        this.platform = 'server';
        if( !compiler.options.scanTypings ){
            compiler.loadTypes([ path.join(__dirname,'types/think.d.es') ],{
                scope:'es-thinkphp',
                inherits:['es-php']
            });
        }
        //registerError(compiler.diagnostic.defineError, compiler.diagnostic.LANG_CN, compiler.diagnostic.LANG_EN );
    }

    getTokenNode(name, flag){
        if( flag ){
            return super.getTokenNode(name);
        }
        return modules.get(name) || super.getTokenNode(name);
    }

    getBuilder( compilation,builderFactory=Builder ){
       return super.getBuilder(compilation,builderFactory)
    }

    toString(){
        return pkg.name;
    }
}

PluginEsThink.toString=function toString(){
    return pkg.name;
}

module.exports = PluginEsThink;
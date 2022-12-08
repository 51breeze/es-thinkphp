const fs = require("fs");
const path = require("path");
const Builder = require("./core/Builder");
const Core = require("./core/Core");
const {exec} = require("child_process");
const PluginPHP = Core.Plugin;
const merge = require("lodash/merge");
const modules = new Map();
const dirname = path.join(__dirname,"tokens");
if( fs.existsSync(dirname) ){
    fs.readdirSync( dirname ).forEach( (filename)=>{
        const info = path.parse( filename );
        modules.set(info.name, require( path.join(dirname,filename) ) );
    });
}

const defaultConfig ={
    framework:'thinkphp',
    version:"6.0.0",
    resolve:{
        useFolderAsNamespace:true,
        publicPath:'public',
        excludes:[],
        routeFileName:'app',
        mapping:{
            folder:{
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
            },
            disconnect:{
                'server.kernel.Controller':true
            },
            externals:[ 
            ],
        }
    },
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

class Plugin extends PluginPHP{

    static init(projectPath, version){
        return createProject(projectPath, version);
    }

    constructor(compiler,options){
        options = merge({},defaultConfig, options);
        super(compiler, options);
        this.name = pkg.name;
        this.version = pkg.version;
        this.platform = 'server';
        if( !compiler.options.scanTypings ){
            compiler.loadTypes([ path.join(__dirname,'types/index.d.es') ]);
        }
        //registerError(compiler.diagnostic.defineError, compiler.diagnostic.LANG_CN, compiler.diagnostic.LANG_EN );
    }

    getTokenNode(name, flag){
        if( flag ){
            return super.getTokenNode(name);
        }
        return modules.get(name) || super.getTokenNode(name);
    }

    getBuilder( compilation ){
        const builder = new Builder( compilation );
        builder.name = this.name;
        builder.platform = this.platform;
        builder.plugin = this;
        return builder;
    }
}


module.exports = Plugin;
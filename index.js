const fs = require("fs");
const path = require("path");
const Builder = require("./core/Builder");
const Core = require("./core/Core");
const PluginPHP = Core.Plugin

const {merge} = require("lodash");
const modules = new Map();
const dirname = path.join(__dirname,"tokens");
fs.readdirSync( dirname ).forEach( (filename)=>{
    const info = path.parse( filename );
    modules.set(info.name, require( path.join(dirname,filename) ) );
});

const defaultConfig ={
    framework:'thinkphp',
    version:"6.0.0",
    resolve:{
        useFolderAsNamespace:true,
        publicPath:'public',
        excludes:['server.application.Model'],
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
                '*/*/lang/***.es::lang':'%0/%1/lang/%...',
                '*/*/config/***.es::lang':'%0/%1/config/%...',
                '*/*/*/***.es::config':'%0/%1/config/%...',
                '*/*/*/***.es::model':'%0/%1/model/%...',
                '*/*/*/***.es::general':'%0/%1/%...',

                'config.es::general':'config/%...',
                '****.es::general':'%...',
                '****::asset':'public/static/%...',
                'config/***.es::general':'config/%...',
                'root':'./',
            },
            route:{
                '*/*.es::controller':'%filename',
                '*/*/***.es::controller':'%...',
            },
            namespace:{
                'server.application.Model':'think',
                'server.database.Db':'think.facade',
                'server.database.ConnectionInterface':'think.db',
                'server.database.BaseQuery':'think.db',
                'server.components.Collection':'think',
                'server.components.Paginator':'think',
                'server.http.Session':'think',
                'server.http.Request':'think',
                'server.http.Response':'think',
                'server.http.Response':'think',
                'server.kernel.Env':'think',
                'server.kernel.App':'think',
                'server.kernel.Container':'think',
            },
            externals:['PHPUnit.Framework.TestCase'],
        }
    },
    includes:['./config/*']
}

const pkg = require("./package.json");
function registerError(define, cn, en){
    
}

class Plugin extends PluginPHP{

    constructor(compiler,options){
        options = merge({},defaultConfig, options);
        super(compiler, options);
        this.name = pkg.name;
        this.version = pkg.version;
        this.platform = 'server';
        // const dir = path.join(__dirname,'types');
        // const files = fs.readdirSync( dir ).filter( item=>!(item === '.' || item === '..') ).map( item=>path.join(dir,item) );
        // compiler.loadTypes(files,true,null,true);
        // this.globalTypes = (compiler.options.globalTypes || []).map( file=>compiler.normalizePath(file) );
        // registerError(compiler.diagnostic.defineError, compiler.diagnostic.LANG_CN, compiler.diagnostic.LANG_EN );
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
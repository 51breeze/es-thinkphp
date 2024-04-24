const Builder = require("./core/Builder");
const Core = require("./core/Core");
const PluginPHP = require('es-php');
const modules =  require("./tokens/index.js");
const defaultConfig ={
    framework:'thinkphp',
    version:"6.0.0",
    routeFileName:'app',
    resolve:{
        usings:['server/**'],
        folders:{
            "*.global":"escore",
            '**/*.route':'route',
            '*/lang/*.es::*':'app/lang',
            '*/config/*.es::*':'config',
            'console/*.es':'app/console',
            'middleware.es':'app',
        },
        routes:{
           
        },
        namespaces:{
            'server/database/DbManager':'think',
            'server/database/Paginator':'think',
            'server/database/concern/BaseQuery':'think/db/BaseQuery',
            'server/database/**':'think/db/{...}',
            'server/model/Model':'think',
            'server/model/**':'think/model/{...}',
            'server/facade/*':'think/facade',
            'server/route/**':'think/route/{...}',
            'server/response/**':'think/response/{...}',
            'server/event/**':'think/event/{...}',
            "server/console/**": "think/console/{...}",
            "server/driver/**":"think/filesystem/{...}",
            'server/kernel/*':'think'
        }
    },
    folderAsNamespace:true,
    publicPath:'public',
    excludes:[],
    externals:[],
    includes:[]
}

const pkg = require("./package.json");
class PluginEsThink extends PluginPHP{

    constructor(compiler,options){
        options = Core.Merge({},defaultConfig, options);
        super(compiler, options);
        this.name = pkg.name;
        this.version = pkg.version;
        this.platform = 'server';
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
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
    version:"6.0.0"
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
        const dir = path.join(__dirname,'types');
        const files = fs.readdirSync( dir ).filter( item=>!(item === '.' || item === '..') ).map( item=>path.join(dir,item) );
        compiler.loadTypes(files,true,null,true);
        this.globalTypes = (compiler.options.globalTypes || []).map( file=>compiler.normalizePath(file) );
        registerError(compiler.diagnostic.defineError, compiler.diagnostic.LANG_CN, compiler.diagnostic.LANG_EN );
    }

    getTokenNode(name, flag){
        if( flag ){
            return super.getTokenNode(name);
        }
        return modules.get(name) || super.getTokenNode(name);
    }

    getBuilder( compilation ){
        const builder = new Builder( compilation.stack );
        builder.name = this.name;
        builder.platform = this.platform;
        builder.plugin = this;
        return builder;
    }
}


module.exports = Plugin;
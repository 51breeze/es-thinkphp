const Core = require("./Core");
const Polyfill = require('./Polyfill');
const PATH = require('path');
const Router = require('./Router');
const resolveModuleTypeCached = new Map();
const routerInstance = new Router();
class Builder extends Core.Builder{
    constructor(compilation){
        super(compilation);
        routerInstance.builder = this;
    }

    getRouterInstance(){
        return routerInstance;
    }

    getModuleMappingRoute(module, data={}){
        if(!module || !module.isModule)return data.path;
        const id = data.path +'/'+ PATH.basename(module.file, PATH.extname(module.file)) + '.route';
        data.group = 'formats';
        return this.plugin.resolveSourceId(id.replace(/^[\/]+/,''), data) || data.path;
    }

    addRouterConfig(module, method, path, action, params){
        const router = this.getRouterInstance();
        if(router instanceof Core.Router){
            const outputFolder = this.plugin.resolveSourceId(PATH.dirname(module.file)+'/'+module.id+'.route', 'folders') || 'route';
            const className = this.getModuleNamespace(module, module.id, false);
            router.addItem( PATH.join(this.getOutputPath(), outputFolder), className, action, path, method, params);
        }else{
            throw new Error('Invalid router instance.')
        }
    }

    async buildAfter(){
        const router = this.getRouterInstance();
        router.create().forEach( item=>{
            this.emitFile(item.file, item.content);
        });
    }

    getPolyfillModule( id ){
        const module = Polyfill.modules.get( id );
        if( module )return module;
        return super.getPolyfillModule( id );
    }

    getBuildVersion(){
        return parseFloat(this.plugin.options.version) || '6.0.0';
    }

    resolveModuleType(module){
        if( resolveModuleTypeCached.has( module ) ){
            return resolveModuleTypeCached.get( module );
        }

        let resolve = null;
        this.compilation.stack.findAnnotation(module, (annotation)=>{
            if( annotation.name.toLowerCase()==='define' ){
                const args = annotation.getArguments();
                if(args[0] && String(args[0].key).toLowerCase() === 'type'){
                    return resolve = args[0].value;
                }
            }
            return false;
        });

        switch( resolve ){
            case 'http' : 
            case 'controller' : 
                resolveModuleTypeCached.set( module, Builder.MODULE_TYPE_CONTROLLER );
                break;
            case 'model' : 
                resolveModuleTypeCached.set( module, Builder.MODULE_TYPE_MODEL );
                break;
            case 'asset' : 
                resolveModuleTypeCached.set( module, Builder.MODULE_TYPE_ASSET );
                break;
            case 'config' : 
                resolveModuleTypeCached.set( module, Builder.MODULE_TYPE_CONFIG );
                break;
            case 'lang' : 
                resolveModuleTypeCached.set( module, Builder.MODULE_TYPE_LANG );
                break;
            default :
                resolveModuleTypeCached.set(module, Builder.MODULE_TYPE_UNKNOWN);
        }
        return resolveModuleTypeCached.get( module );
    }

    resolveModuleTypeName(module){
        switch( this.resolveModuleType(module) ){
            case Builder.MODULE_TYPE_CONTROLLER :
                return 'controller';
            case Builder.MODULE_TYPE_MODEL :
                return 'model';
            case Builder.MODULE_TYPE_ASSET :
                return 'asset';
            case Builder.MODULE_TYPE_CONFIG :
                return 'config';
            case Builder.MODULE_TYPE_LANG :
                return 'lang';
            default:{
                if(module && module.isModule){
                    const file = module.file || module.compilation.file;
                    if(file){
                        return this.plugin.resolveSourceId(PATH.join(PATH.dirname(file), module.id+PATH.extname(file)), 'types') || '*';
                    }
                }
            }
        }
        return '*';
    }
}
module.exports = Builder;
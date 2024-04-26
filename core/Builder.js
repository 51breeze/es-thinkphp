const Core = require("./Core");
const Polyfill = require('./Polyfill');
const PATH = require('path');
const Router = require('./Router');
const resolveModuleTypeCached = new Map();
const routerInstance = new Router();
const RouteMethods = ['router','get','post','put','delete','option'];

class Builder extends Core.Builder{
    constructor(compilation){
        super(compilation);
        routerInstance.builder = this;
    }

    getRouterInstance(){
        return routerInstance;
    }

    addRouterConfig(module, method, path, action, params, flag=false){
        const router = this.getRouterInstance();
        if(router instanceof Core.Router){
            let outputFolder = this.plugin.resolveSourceId(PATH.dirname(module.file)+'/'+module.id+'.route', 'folders');
            if(flag && !outputFolder)return;
            if(!outputFolder)outputFolder = 'route';
            let className = this.getModuleNamespace(module, module.id, false);
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
                        return this.plugin.resolveSourceId(file, 'types') || '*';
                    }
                }
            }
        }
        return '*';
    }

    createMemeberRoute(memeberStack, module=null){

        if( !memeberStack.isMethodDefinition || memeberStack.isAccessor || memeberStack.isConstructor || !memeberStack.compiler.callUtils('isModifierPublic',memeberStack)){
            return;
        }

        module = module || memeberStack.module;
        if(!module || !module.isModule || !module.isClass || module.abstract || module.isDeclaratorModule){
            return;
        }

        const annotation = memeberStack.annotations.find( annotation=>{
            return RouteMethods.includes( annotation.name.toLowerCase() );
        });

        const routeFormat = this.plugin.options.formation?.route;
        
        if( annotation ){

            const args = annotation.getArguments();
            const action = memeberStack.key.value();
            const params = memeberStack.params.map( item=>{
                const required = !(item.question || item.isAssignmentPattern);
                return {name:item.value(),required}
            });

            let method = annotation.name.toLowerCase();
            let path = action;

            if(method==="router"){
                method = args[0] && args[0].value ? args[0].value : 'get';
                if( args[1] && args[1].value ){
                    path = args[1].value.trim();
                }
            }else if(args[0] && args[0].value){
                path = args[0].value.trim();
            }

            let routePath = path;
            if( path.charCodeAt(0) === 64 ){
                // @
            }else if( path.charCodeAt(0) === 47 ){
                // /
            }else{
                routePath = module.id+'/'+path;
                if(this.plugin.options.routePathWithNamespace){
                    routePath = module.getName('/')+'/'+path;
                }
            }

            if(routeFormat){
                routePath = routeFormat(routePath, {
                    method,
                    params,
                    action,
                    className:module.getName(),
                });
            }

            if(routePath){
                this.builder.addRouterConfig(module, method, routePath, action, params);
            }

        }else{

            const type = this.builder.resolveModuleTypeName(module);
            if(type ==='http' || type ==='controller' ){

                const method = 'any';
                const action = memeberStack.key.value();
                const params = memeberStack.params.map( item=>{
                    const required = !(item.question || item.isAssignmentPattern);
                    return {name:item.value(),required}
                });

                let routePath =  module.id+'/'+action;
                if(this.plugin.options.routePathWithNamespace){
                    routePath =  module.getName('/')+'/'+action
                }

                if(routeFormat){
                    routePath = routeFormat(routePath, {
                        method,
                        params,
                        action,
                        className:module.getName(),
                    });
                }
                
                if(routePath){
                    this.builder.addRouterConfig(module, method, routePath, action, params, true);
                }
            }
        }
    }
}
module.exports = Builder;
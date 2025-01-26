import BaseClassBuilder from "@easescript/es-php/lib/core/ClassBuilder.js";
import {getMethodAnnotations,getAnnotationArguments} from "@easescript/transform/lib/core/Common.js";
import Utils from "easescript/lib/core/Utils";
import Routes from "../vms/Routes";

const RouteMethods = ['router','get','post','put','delete','option'];
const indexers = {
    router:['method','path'],
    route:['path']
}

class ClassBuilder extends BaseClassBuilder{

    parseMethodRoute(ctx, stack){
        if( !stack.isMethodDefinition || stack.isAccessor || stack.isConstructor || !Utils.isModifierPublic(stack)){
            return;
        }

        const module = stack.module;
        if(!module || !module.isModule || !module.isClass || module.abstract || module.isDeclaratorModule){
            return;
        }
        
        const annotations = getMethodAnnotations(stack, RouteMethods );
        const routeFormat = ctx.plugin.options.formation?.route;
        if( annotations && annotations.length >0 ){
            annotations.forEach(annotation=>{
                const args = annotation.getArguments();
                const action = stack.key.value();
                const params = stack.params.map( item=>{
                    const required = !(item.question || item.isAssignmentPattern);
                    return {name:item.value(),required}
                });

                let method = annotation.getLowerCaseName();
                let path = action;
                let methodArg, pathArg;
                if(method==="router"){
                    [methodArg, pathArg] = getAnnotationArguments(args, indexers.router);
                }else{
                    [pathArg] = getAnnotationArguments(args, indexers.route)
                }
                if(methodArg){
                    method = methodArg.value.trim();
                }
                if(pathArg){
                    path = pathArg.value.trim();
                }
                let routePath = path;
                if( path.charCodeAt(0) === 64 ){
                    // @
                }else if( path.charCodeAt(0) === 47 ){
                    // /
                }else{
                    if(ctx.plugin.options.routePathWithNamespace){
                        routePath = module.getName('/')+'/'+path;
                    }else{
                        routePath = module.id+'/'+path;
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
                    let className = ctx.getModuleNamespace(module, module.id);
                    let vm =ctx.getVModule(Routes.id);
                    vm.append(ctx, stack, {
                        className, 
                        method, 
                        action,
                        path:routePath,
                        params
                    })
                }
            });
        }
    }

    createMemeber(ctx, stack, staticFlag=false ){
        const node = super.createMemeber(ctx, stack, staticFlag)
        if(node && !staticFlag){
            this.parseMethodRoute(ctx, stack)
        }
        return node;
    }

}
module.exports = ClassBuilder;
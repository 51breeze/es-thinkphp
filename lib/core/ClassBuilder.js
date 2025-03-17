import BaseClassBuilder from "@easescript/es-php/lib/core/ClassBuilder.js";
import {getMethodAnnotations,getAnnotationArguments, parseRouteAnnotation} from "@easescript/transform/lib/core/Common.js";
import Utils from "easescript/lib/core/Utils";
import Routes from "../vms/Routes";
const RouteMethods = ['router','get','post','put','delete','option'];
class ClassBuilder extends BaseClassBuilder{

    parseMethodRoute(ctx, stack){
        if( !stack.isMethodDefinition || stack.isAccessor || stack.isConstructor || !Utils.isModifierPublic(stack)){
            return;
        }
        const module = stack.module;
        if(!module || !module.isModule || !module.isClass || module.abstract || module.isDeclaratorModule){
            return;
        }
        const annotations = getMethodAnnotations(stack, RouteMethods);
        if( annotations && annotations.length >0 ){
            annotations.forEach(annotation=>{
                let route = parseRouteAnnotation(annotation, ctx.options)
                if(route){
                    let className = ctx.getModuleNamespace(module, module.id);
                    let vm =ctx.getVModule(Routes.id);
                    let {method, action, path, params} = route;
                    vm.append(ctx, stack, {
                        className, 
                        method, 
                        action,
                        path,
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
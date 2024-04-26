const Core = require("./Core");
const RouteMethods = ['router','get','post','put','delete','option'];
class ClassBuilder extends Core.ClassBuilder{

    static createClassNode(stack, ctx, type) {
        const obj = new ClassBuilder(stack, ctx, type);
        return obj.create();
    }

    createClassMemeberNode( memeberStack ){
        const node = this.createToken(memeberStack);
        if( memeberStack.isMethodDefinition && !memeberStack.isAccessor && !memeberStack.isConstructor && node && memeberStack.compiler.callUtils('isModifierPublic',memeberStack)){
            const annotation = memeberStack.annotations.find( annotation=>{
                return RouteMethods.includes( annotation.name.toLowerCase() );
            });
            
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
                  
                }else if( path.charCodeAt(0) === 47 ){
                   
                }else{
                    routePath = this.module.getName('/')+'/'+path;
                }
                routePath = this.builder.getModuleMappingRoute(
                    this.module,
                    {
                        method,
                        params,
                        action,
                        path:routePath,
                        className:this.module.getName(),
                    }
                );
                this.builder.addRouterConfig(this.module, method, routePath, action, params);

            }else{
                const type = this.builder.resolveModuleTypeName(this.module);
                if(type ==='http' || type ==='controller' ){
                    const method = 'any';
                    const action = memeberStack.key.value();
                    const params = memeberStack.params.map( item=>{
                        const required = !(item.question || item.isAssignmentPattern);
                        return {name:item.value(),required}
                    });
                    const routePath = this.builder.getModuleMappingRoute(
                        this.module,
                        {
                            method,
                            params,
                            action,
                            path:this.module.getName('/')+'/'+action,
                            className:this.module.getName(),
                        }
                    );
                    this.builder.addRouterConfig(this.module, method, routePath, action, params);
                }
            }
        }
        return node;
    }

}
module.exports = ClassBuilder;
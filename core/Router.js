const Core = require("./Core");
const PATH = require('path');
class Router extends Core.Router{
    make( object ){
        const options = this.builder.plugin.options || {};
        const filename = options.routeFileName || 'app';
        const items = object.items.map( item=>{
            let {className, action, path, method, params} = item;
            const controller = className+'@'+action;
            if( params && params.length>0 ){
                const args = params.map( item=>{
                    const name = `:${item.name}`;
                    return item.required ? name : `[${name}]`
                }).join('/');
                return `Route::${method}('${path}/${args}$', '${controller}');`
            }
            if( path && path !=='/' ){
                return `Route::${method}('${path}$', '${controller}');`
            }else{
                return `Route::${method}('/', '${controller}');`
            }
        });
        const file = PATH.join(object.file, filename+'.php' );
        const content = [
            'use think\\facade\\Route;'
        ].concat(items).join('\r\n');
        return {file,content};
    }

}
module.exports = Router;
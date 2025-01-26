import {VirtualModule} from "@easescript/es-php/lib/core/VirtualModule";
import Utils from "easescript/lib/core/Utils";
import path from 'path';
const key = Symbol("routes:vm");
class Routes extends VirtualModule{

    static get id(){
        return key;
    }

    #dataset = new Map()

    get after(){
        return true;
    }

    get ext(){
        return '.route'
    }

    get file(){
        return "app.route";
    }

    getName(){
        return "vm:Routes";
    }

    append(ctx, key, route){
        if(!this.#dataset.has(key)){
            this.#dataset.set(key,route);
            this.changed = true;
            ctx.addBuildAfterDep(this);
        }
    }

    gen(){
        const items =Array.from(this.#dataset.values()).map( route=>{
            let {className, action, path, method, params} = route;
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
        return [
            'use think\\facade\\Route;'
        ].concat(items).join('\r\n');
    }

    async build(ctx, graph){
        graph = graph || ctx.getBuildGraph(this)
        if(!this.changed && graph.code)return graph;
        this.changed = false;
        let outfile =  graph.outfile;
        if(outfile == null){
            outfile = ctx.getOutputAbsolutePath(this.file);
            let filename = ctx.options.routeFileName || 'app';
            outfile = Utils.normalizePath(path.join(path.dirname(outfile), filename + (ctx.options.outExt||'.php')));
        }
        graph.code = ctx.getFormatCode(this.gen());
        graph.outfile=outfile;
        if(ctx.options.emitFile){
            await ctx.emit(graph);
        }
        return graph;
    }
}
export default Routes;
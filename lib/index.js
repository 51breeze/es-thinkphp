import pkg from "../package.json";
import {getOptions, Plugin} from "./core/Plugin";
import * as tokens from "./tokens";
const defaultConfig ={
    framework:'thinkphp',
    version:"6.0.0",
    routeFileName:'app',
    routePathWithNamespace:false,
    formation:{
         //(path:string, {isRouterModule,path,complete, action, params, defaultValue, method, module})=>path
         routePathFormat:null,
         //(name, optional=false)=>optional ? `[:${name}]` : `:${name}`
         routeParamFormat:null
    },
    transform:{
        tokens
    },
    resolve:{
        usings:['server/**'],
        folders:{
            "*.global":"escore",
            '*.route':'route',
            'lang/***':'app/lang/{...}',
            'console/***':'app/console/{...}',
            'middleware/***':'app/middleware/{...}',
            'http/***':'app/http/{...}',
            'model/***':'app/model/{...}',
            'assets/***':'static/{...}',
            'config/***':'config/{...}',
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
            'server/exception/db/*':'think/db/exception',
            'server/exception/*':'think/exception',
            'server/kernel/*':'think'
        }
    },
    folderAsNamespace:true,
    publicPath:'public'
}
function plugin(options={}){
    return new Plugin(
        pkg.esconfig.scope,
        pkg.version,
        getOptions(defaultConfig, options)
    )
}
export {getOptions, Plugin}
export default plugin;

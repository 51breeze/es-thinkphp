import {getOptions, Plugin as BasePlugin} from "@easescript/es-php/lib";
import Routes from '../vms/Routes';
import Context from './Context';
class Plugin extends BasePlugin{
    #inited = false;
    getWidget(name){
        if(name==='context')return Context;
        return super.getWidget(name);
    }
    async init(){
        if(this.#inited)return;
        this.#inited = true;
        await super.init();
        this.context.virtuals.createVModule(Routes.id, Routes)
    }
}

export {getOptions, Plugin}
export default Plugin;
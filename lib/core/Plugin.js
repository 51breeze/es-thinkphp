import {getOptions, Plugin as BasePlugin} from "@easescript/es-php/lib";
import Routes from '../vms/Routes';
class Plugin extends BasePlugin{
    async init(){
        await super.init();
        this.context.virtuals.createVModule(Routes.id, Routes)
    }
}

export {getOptions, Plugin}
export default Plugin;
const Core = require("./Core");
const Polyfill = require('./Polyfill');
const Router = require('./Router');
const routerInstance = new Router();
class Builder extends Core.Builder{
    constructor(compilation){
        super(compilation);
        routerInstance.builder = this;
    }
    getRouterInstance(){
        return routerInstance;
    }

    getPolyfillModule( id ){
        const module = Polyfill.modules.get( id );
        if( module )return module;
        return super.getPolyfillModule( id );
    }

    getBuildVersion(){
        return parseFloat(this.plugin.options.version) || '6.0.0';
    }
}
module.exports = Builder;
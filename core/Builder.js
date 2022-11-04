const Core = require("./Core");
const Polyfill = require('./Polyfill');
class Builder extends Core.Builder{
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
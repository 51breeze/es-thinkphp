import BaseContext from "@easescript/es-php/lib/core/Context";
class Context extends BaseContext{
    isPermissibleRouteProvider(moduleOrMethodStack){
        return false;
    }
}
export default Context;
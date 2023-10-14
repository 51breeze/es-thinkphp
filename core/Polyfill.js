const path = require("path");
const Core = require("./Core");
const dirname = process.env.NODE_ENV==="production" ? path.join(__dirname,"polyfills") : path.join(__dirname,"../","polyfill");
const modules = new Map();
Core.Polyfill.createEveryModule(modules, dirname);
module.exports={
    path:dirname,
    modules,
    createEveryModule:Core.Polyfill.createEveryModule
}
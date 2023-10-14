var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// core/Core.js
var require_Core = __commonJS({
  "core/Core.js"(exports2, module2) {
    var Plugin = require("es-php");
    module2.exports = Plugin.getPluginCoreModules();
  }
});

// core/Polyfill.js
var require_Polyfill = __commonJS({
  "core/Polyfill.js"(exports2, module2) {
    var path2 = require("path");
    var Core2 = require_Core();
    var dirname = true ? path2.join(__dirname, "polyfills") : path2.join(__dirname, "../", "polyfill");
    var modules2 = /* @__PURE__ */ new Map();
    Core2.Polyfill.createEveryModule(modules2, dirname);
    module2.exports = {
      path: dirname,
      modules: modules2,
      createEveryModule: Core2.Polyfill.createEveryModule
    };
  }
});

// core/Router.js
var require_Router = __commonJS({
  "core/Router.js"(exports2, module2) {
    var Core2 = require_Core();
    var PATH = require("path");
    var Router = class extends Core2.Router {
      make(object) {
        const options = this.builder.plugin.options || {};
        const resolve = options.resolve || {};
        const filename = resolve.routeFileName || "app";
        const items = object.items.map((item) => {
          let { className, action, path: path2, method, params } = item;
          const controller = className + "@" + action;
          if (params && params.length > 0) {
            const args = params.map((item2) => {
              const name = `:${item2.name}`;
              return item2.required ? name : `[${name}]`;
            }).join("/");
            return `Route::${method}('${path2}/${args}$', '${controller}');`;
          }
          if (path2 && path2 !== "/") {
            return `Route::${method}('${path2}$', '${controller}');`;
          } else {
            return `Route::${method}('/', '${controller}');`;
          }
        });
        const file = PATH.join(object.file, filename + ".php");
        const content = [
          "use think\\facade\\Route;"
        ].concat(items).join("\r\n");
        return { file, content };
      }
    };
    module2.exports = Router;
  }
});

// core/Builder.js
var require_Builder = __commonJS({
  "core/Builder.js"(exports2, module2) {
    var Core2 = require_Core();
    var Polyfill = require_Polyfill();
    var Router = require_Router();
    var routerInstance = new Router();
    var Builder2 = class extends Core2.Builder {
      constructor(compilation) {
        super(compilation);
        routerInstance.builder = this;
      }
      getRouterInstance() {
        return routerInstance;
      }
      getPolyfillModule(id) {
        const module3 = Polyfill.modules.get(id);
        if (module3)
          return module3;
        return super.getPolyfillModule(id);
      }
      getBuildVersion() {
        return parseFloat(this.plugin.options.version) || "6.0.0";
      }
    };
    module2.exports = Builder2;
  }
});

// tokens/index.js
var require_tokens = __commonJS({
  "tokens/index.js"(exports2, module2) {
    var modules2 = /* @__PURE__ */ new Map();
    module2.exports = modules2;
  }
});

// package.json
var require_package = __commonJS({
  "package.json"(exports2, module2) {
    module2.exports = {
      name: "es-thinkphp",
      version: "0.2.1",
      description: "test",
      main: "dist/index.js",
      typings: "dist/types/think.d.es",
      scripts: {
        init: "node ./test/init.js",
        dev: "jasmine ./test/index.js",
        run: "node ./test/phptest.js",
        test: "npm run dev & npm run run",
        build: "node ./scripts/build.js"
      },
      repository: {
        type: "git",
        url: "git+https://github.com/51breeze/es-php.git"
      },
      keywords: [
        "es",
        "javascript",
        "web"
      ],
      author: "Jun Ye",
      license: "MIT",
      bugs: {
        url: "https://github.com/51breeze/es-php/issues"
      },
      homepage: "https://github.com/51breeze/es-php#readme",
      dependencies: {
        "es-php": "latest"
      },
      devDependencies: {
        easescript: "latest",
        esbuild: "^0.17.11",
        "esbuild-plugin-copy": "^2.1.0",
        jasmine: "^3.10.0"
      },
      esconfig: {
        scope: "es-thinkphp",
        inherits: ["es-php"]
      }
    };
  }
});

// index.js
var path = require("path");
var Builder = require_Builder();
var Core = require_Core();
var PluginPHP = require("es-php");
var { exec } = require("child_process");
var modules = require_tokens();
var defaultConfig = {
  framework: "thinkphp",
  version: "6.0.0",
  resolve: {
    useFolderAsNamespace: true,
    publicPath: "public",
    excludes: [],
    routeFileName: "app",
    disuse: ["server.kernel.Controller"],
    using: ["server.**"],
    mapping: {
      folder: {},
      route: {
        "*/*.es::controller": "%filename",
        "*/*/*.es::controller": "/%filename",
        "*/*/*/***.es::controller": "/%1/%filename"
      },
      namespace: {
        "server.database.DbManager": "think",
        "server.database.Paginator": "think",
        "server.database.concern.BaseQuery": "think.db.BaseQuery",
        "server.database.**": "think.db.%...",
        "server.model.Model": "think",
        "server.model.**": "think.model.%...",
        "server.facade.*": "think.facade",
        "server.route.**": "think.route.%...",
        "server.response.**": "think.response.%...",
        "server.event.**": "think.event.%...",
        "server.console.**": "think.console.%...",
        "server.driver.**": "think.filesystem.%...",
        "server.kernel.*": "think"
      }
    }
  },
  externals: [],
  includes: []
};
var pkg = require_package();
function createProject(projectPath, version = "6.x.x") {
  return new Promise((resolve, reject) => {
    const name = path.basename(projectPath);
    exec(`composer create-project topthink/think=${version} ${name}`, { cwd: path.dirname(projectPath), stdio: "inherit" }, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve(stdout);
      }
    });
  });
}
var PluginEsThink = class extends PluginPHP {
  static init(projectPath, version) {
    return createProject(projectPath, version);
  }
  constructor(compiler, options) {
    options = Core.Merge({}, defaultConfig, options);
    if (!options.resolve.using.includes("server.**")) {
      options.resolve.using.push("server.**");
    }
    if (!options.resolve.disuse.includes("server.kernel.Controller")) {
      options.resolve.disuse.push("server.kernel.Controller");
    }
    super(compiler, options);
    this.name = pkg.name;
    this.version = pkg.version;
    this.platform = "server";
    if (!compiler.options.scanTypings) {
      compiler.loadTypes([path.join(__dirname, "types/think.d.es")], {
        scope: "es-thinkphp",
        inherits: ["es-php"]
      });
    }
  }
  getTokenNode(name, flag) {
    if (flag) {
      return super.getTokenNode(name);
    }
    return modules.get(name) || super.getTokenNode(name);
  }
  getBuilder(compilation, builderFactory = Builder) {
    return super.getBuilder(compilation, builderFactory);
  }
  toString() {
    return pkg.name;
  }
};
PluginEsThink.toString = function toString() {
  return pkg.name;
};
module.exports = PluginEsThink;

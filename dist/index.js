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
    var path = require("path");
    var Core2 = require_Core();
    var dirname = true ? path.join(__dirname, "polyfills") : path.join(__dirname, "../", "polyfill");
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
        const filename = options.routeFileName || "app";
        const items = object.items.map((item) => {
          let { className, action, path, method, params } = item;
          const controller = className + "@" + action;
          if (params && params.length > 0) {
            const args = params.map((item2) => {
              const name = `:${item2.name}`;
              return item2.required ? name : `[${name}]`;
            }).join("/");
            return `Route::${method}('${path}/${args}$', '${controller}');`;
          }
          if (path && path !== "/") {
            return `Route::${method}('${path}$', '${controller}');`;
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
      version: "0.4.0",
      description: "test",
      main: "dist/index.js",
      typings: "dist/types/typings.json",
      scripts: {
        init: "node ./test/init.js",
        dev: "jasmine ./test/index.js",
        run: "node ./test/phptest.js",
        test: "npm run dev & npm run run",
        build: "node ./scripts/build.js",
        manifest: "node ./scripts/manifest.js"
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
        jasmine: "^3.10.0",
        less: "^4.2.0",
        rollup: "^4.16.1",
        "rollup-plugin-commonjs": "^10.1.0",
        "rollup-plugin-node-resolve": "^5.2.0"
      },
      esconfig: {
        scope: "es-thinkphp",
        inherits: [
          "es-php"
        ]
      }
    };
  }
});

// index.js
var Builder = require_Builder();
var Core = require_Core();
var PluginPHP = require("es-php");
var modules = require_tokens();
var defaultConfig = {
  framework: "thinkphp",
  version: "6.0.0",
  routeFileName: "app",
  resolve: {
    usings: ["server/**"],
    folders: {
      "*.global": "escore",
      "*.route": "route",
      "lang/***": "app/lang/{...}",
      "console/***": "app/console/{...}",
      "middleware/***": "app/middleware/{...}",
      "http/***": "app/http/{...}",
      "model/***": "app/model/{...}",
      "assets/***": "static/{...}",
      "config/***": "config/{...}"
    },
    formats: {
      "*.route": (id, scheme, data) => {
        return String(data.path).toLowerCase();
      }
    },
    namespaces: {
      "server/database/DbManager": "think",
      "server/database/Paginator": "think",
      "server/database/concern/BaseQuery": "think/db/BaseQuery",
      "server/database/**": "think/db/{...}",
      "server/model/Model": "think",
      "server/model/**": "think/model/{...}",
      "server/facade/*": "think/facade",
      "server/route/**": "think/route/{...}",
      "server/response/**": "think/response/{...}",
      "server/event/**": "think/event/{...}",
      "server/console/**": "think/console/{...}",
      "server/driver/**": "think/filesystem/{...}",
      "server/kernel/*": "think"
    }
  },
  folderAsNamespace: true,
  publicPath: "public",
  excludes: [],
  externals: [],
  includes: []
};
var pkg = require_package();
var PluginEsThink = class extends PluginPHP {
  constructor(compiler, options) {
    options = Core.Merge({}, defaultConfig, options);
    super(compiler, options);
    this.name = pkg.name;
    this.version = pkg.version;
    this.platform = "server";
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

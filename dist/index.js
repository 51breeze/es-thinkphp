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
    var PATH = require("path");
    var Router = require_Router();
    var resolveModuleTypeCached = /* @__PURE__ */ new Map();
    var routerInstance = new Router();
    var Builder2 = class extends Core2.Builder {
      constructor(compilation) {
        super(compilation);
        routerInstance.builder = this;
      }
      getRouterInstance() {
        return routerInstance;
      }
      getModuleMappingRoute(module3, data = {}) {
        if (!module3 || !module3.isModule)
          return data.path;
        const id = data.path + "/" + PATH.basename(module3.file, PATH.extname(module3.file)) + ".route";
        data.group = "formats";
        return this.plugin.resolveSourceId(id.replace(/^[\/]+/, ""), data) || data.path;
      }
      addRouterConfig(module3, method, path, action, params) {
        const router = this.getRouterInstance();
        if (router instanceof Core2.Router) {
          const outputFolder = this.plugin.resolveSourceId(PATH.dirname(module3.file) + "/" + module3.id + ".route", "folders") || "route";
          const className = this.getModuleNamespace(module3, module3.id, false);
          router.addItem(PATH.join(this.getOutputPath(), outputFolder), className, action, path, method, params);
        } else {
          throw new Error("Invalid router instance.");
        }
      }
      async buildAfter() {
        const router = this.getRouterInstance();
        router.create().forEach((item) => {
          this.emitFile(item.file, item.content);
        });
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
      resolveModuleType(module3) {
        if (resolveModuleTypeCached.has(module3)) {
          return resolveModuleTypeCached.get(module3);
        }
        let resolve = null;
        this.compilation.stack.findAnnotation(module3, (annotation) => {
          if (annotation.name.toLowerCase() === "define") {
            const args = annotation.getArguments();
            if (args[0] && String(args[0].key).toLowerCase() === "type") {
              return resolve = args[0].value;
            }
          }
          return false;
        });
        switch (resolve) {
          case "http":
          case "controller":
            resolveModuleTypeCached.set(module3, Builder2.MODULE_TYPE_CONTROLLER);
            break;
          case "model":
            resolveModuleTypeCached.set(module3, Builder2.MODULE_TYPE_MODEL);
            break;
          case "asset":
            resolveModuleTypeCached.set(module3, Builder2.MODULE_TYPE_ASSET);
            break;
          case "config":
            resolveModuleTypeCached.set(module3, Builder2.MODULE_TYPE_CONFIG);
            break;
          case "lang":
            resolveModuleTypeCached.set(module3, Builder2.MODULE_TYPE_LANG);
            break;
          default:
            resolveModuleTypeCached.set(module3, Builder2.MODULE_TYPE_UNKNOWN);
        }
        return resolveModuleTypeCached.get(module3);
      }
      resolveModuleTypeName(module3) {
        switch (this.resolveModuleType(module3)) {
          case Builder2.MODULE_TYPE_CONTROLLER:
            return "controller";
          case Builder2.MODULE_TYPE_MODEL:
            return "model";
          case Builder2.MODULE_TYPE_ASSET:
            return "asset";
          case Builder2.MODULE_TYPE_CONFIG:
            return "config";
          case Builder2.MODULE_TYPE_LANG:
            return "lang";
          default: {
            if (module3 && module3.isModule) {
              const file = module3.file || module3.compilation.file;
              if (file) {
                return this.plugin.resolveSourceId(PATH.join(PATH.dirname(file), module3.id + PATH.extname(file)), "types") || "*";
              }
            }
          }
        }
        return "*";
      }
    };
    module2.exports = Builder2;
  }
});

// core/ClassBuilder.js
var require_ClassBuilder = __commonJS({
  "core/ClassBuilder.js"(exports2, module2) {
    var Core2 = require_Core();
    var RouteMethods = ["router", "get", "post", "put", "delete", "option"];
    var ClassBuilder2 = class extends Core2.ClassBuilder {
      static createClassNode(stack, ctx, type) {
        const obj = new ClassBuilder2(stack, ctx, type);
        return obj.create();
      }
      createClassMemeberNode(memeberStack) {
        const node = this.createToken(memeberStack);
        if (memeberStack.isMethodDefinition && !memeberStack.isAccessor && !memeberStack.isConstructor && node && memeberStack.compiler.callUtils("isModifierPublic", memeberStack)) {
          const annotation = memeberStack.annotations.find((annotation2) => {
            return RouteMethods.includes(annotation2.name.toLowerCase());
          });
          if (annotation) {
            const args = annotation.getArguments();
            const action = memeberStack.key.value();
            const params = memeberStack.params.map((item) => {
              const required = !(item.question || item.isAssignmentPattern);
              return { name: item.value(), required };
            });
            let method = annotation.name.toLowerCase();
            let path = action;
            if (method === "router") {
              method = args[0] && args[0].value ? args[0].value : "get";
              if (args[1] && args[1].value) {
                path = args[1].value.trim();
              }
            } else if (args[0] && args[0].value) {
              path = args[0].value.trim();
            }
            let routePath = path;
            if (path.charCodeAt(0) === 64) {
            } else if (path.charCodeAt(0) === 47) {
            } else {
              routePath = this.module.getName("/") + "/" + path;
            }
            routePath = this.builder.getModuleMappingRoute(
              this.module,
              {
                method,
                params,
                action,
                path: routePath,
                className: this.module.getName()
              }
            );
            this.builder.addRouterConfig(this.module, method, routePath, action, params);
          } else {
            const type = this.builder.resolveModuleTypeName(this.module);
            if (type === "http" || type === "controller") {
              const method = "any";
              const action = memeberStack.key.value();
              const params = memeberStack.params.map((item) => {
                const required = !(item.question || item.isAssignmentPattern);
                return { name: item.value(), required };
              });
              const routePath = this.builder.getModuleMappingRoute(
                this.module,
                {
                  method,
                  params,
                  action,
                  path: this.module.getName("/") + "/" + action,
                  className: this.module.getName()
                }
              );
              this.builder.addRouterConfig(this.module, method, routePath, action, params);
            }
          }
        }
        return node;
      }
    };
    module2.exports = ClassBuilder2;
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
      version: "0.4.1",
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
var ClassBuilder = require_ClassBuilder();
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
    types: {},
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
  addGlobRule() {
    super.addGlobRule();
    const resolve = this.options.resolve;
    Object.keys(resolve.formats).forEach((key) => {
      this.glob.addRuleGroup(key, resolve.formats[key], "formats");
    });
    Object.keys(resolve.types).forEach((key) => {
      this.glob.addRuleGroup(key, resolve.types[key], "types");
    });
  }
  getClassModuleBuilder() {
    return ClassBuilder;
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

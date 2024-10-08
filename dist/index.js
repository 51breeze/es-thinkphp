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
    var RouteMethods = ["router", "get", "post", "put", "delete", "option"];
    function isEmptyObject(target) {
      if (!target || typeof target !== "object")
        return true;
      for (let k in target)
        return false;
      return true;
    }
    var Builder2 = class extends Core2.Builder {
      constructor(compilation) {
        super(compilation);
        routerInstance.builder = this;
      }
      getRouterInstance() {
        return routerInstance;
      }
      addRouterConfig(module3, method, path, action, params, flag = false, node = null, meta = null) {
        const router = this.getRouterInstance();
        let className = this.getModuleNamespace(module3, module3.id, false);
        let manifests = this.plugin.options.manifests;
        if (manifests && manifests.annotations) {
          let data = { path };
          if (!isEmptyObject(params)) {
            data.params = params;
          }
          if (!isEmptyObject(meta)) {
            data.meta = meta;
          }
          Core2.Manifest.add(module3.compilation, "annotations", {
            [className]: {
              [action + ":" + method]: data
            }
          });
        }
        if (router instanceof Core2.Router) {
          let outputFolder = this.plugin.resolveSourceId(PATH.dirname(module3.file) + "/" + module3.id + ".route", "folders");
          if (flag && !outputFolder)
            return;
          if (!outputFolder)
            outputFolder = "route";
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
                return this.plugin.resolveSourceId(file, "types") || "*";
              }
            }
          }
        }
        return "*";
      }
      createMemeberRoute(memeberStack, node) {
        if (!memeberStack.isMethodDefinition || memeberStack.isAccessor || memeberStack.isConstructor || !memeberStack.compiler.callUtils("isModifierPublic", memeberStack)) {
          return;
        }
        let module3 = memeberStack.module;
        if (!module3 || !module3.isModule || !module3.isClass || module3.abstract || module3.isDeclaratorModule) {
          return;
        }
        const annotation = memeberStack.annotations.find((annotation2) => {
          return RouteMethods.includes(annotation2.getLowerCaseName());
        });
        const routeFormat = this.plugin.options.formation?.route;
        if (annotation) {
          const args = annotation.getArguments();
          const action = memeberStack.key.value();
          const params = memeberStack.params.map((item) => {
            const required = !(item.question || item.isAssignmentPattern);
            return { name: item.value(), required };
          });
          let method = annotation.getLowerCaseName();
          let path = action;
          let meta = {};
          if (method === "router") {
            let indexers = ["method", "path"];
            let methodArg = memeberStack.getAnnotationArgumentItem("method", args, indexers);
            let pathArg = memeberStack.getAnnotationArgumentItem("path", args, indexers);
            method = methodArg ? methodArg.value : "get";
            if (pathArg) {
              path = pathArg.value.trim();
            }
            args.forEach((arg) => {
              if (arg === methodArg || arg === pathArg)
                return;
              if (arg.assigned) {
                meta[arg.key] = arg.value;
              }
            });
          } else {
            let indexers = ["path"];
            let pathArg = memeberStack.getAnnotationArgumentItem("path", args, indexers);
            if (pathArg) {
              path = pathArg.value.trim();
            }
            args.forEach((arg) => {
              if (arg === pathArg)
                return;
              if (arg.assigned) {
                meta[arg.key] = arg.value;
              }
            });
          }
          let routePath = path;
          if (path.charCodeAt(0) === 64) {
          } else if (path.charCodeAt(0) === 47) {
          } else {
            routePath = module3.id + "/" + path;
            if (this.plugin.options.routePathWithNamespace) {
              routePath = module3.getName("/") + "/" + path;
            }
          }
          if (routeFormat) {
            routePath = routeFormat(routePath, {
              method,
              params,
              action,
              className: module3.getName()
            });
          }
          if (routePath) {
            this.addRouterConfig(module3, method, routePath, action, params, false, node, meta);
          }
        } else {
          const type = this.resolveModuleTypeName(module3);
          if (type === "http" || type === "controller") {
            const method = "any";
            const action = memeberStack.key.value();
            const params = memeberStack.params.map((item) => {
              const required = !(item.question || item.isAssignmentPattern);
              return { name: item.value(), required };
            });
            let routePath = module3.id + "/" + action;
            if (this.plugin.options.routePathWithNamespace) {
              routePath = module3.getName("/") + "/" + action;
            }
            if (routeFormat) {
              routePath = routeFormat(routePath, {
                method,
                params,
                action,
                className: module3.getName()
              });
            }
            if (routePath) {
              this.addRouterConfig(module3, method, routePath, action, params, true, node);
            }
          }
        }
      }
    };
    module2.exports = Builder2;
  }
});

// core/ClassBuilder.js
var require_ClassBuilder = __commonJS({
  "core/ClassBuilder.js"(exports2, module2) {
    var Core2 = require_Core();
    var ClassBuilder2 = class extends Core2.ClassBuilder {
      static createClassNode(stack, ctx, type) {
        const obj = new ClassBuilder2(stack, ctx, type);
        return obj.create();
      }
      createClassMemeberNode(memeberStack) {
        const node = this.createToken(memeberStack);
        if (node) {
          this.builder.createMemeberRoute(memeberStack, node);
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
      version: "0.5.0",
      description: "test",
      main: "dist/index.js",
      typings: "dist/types/typings.json",
      scripts: {
        init: "node ./test/init.js",
        dev: "jasmine ./test/index.js",
        run: "node ./test/phptest.js",
        test: "npm run dev & npm run run",
        build: "npm run manifest & node ./scripts/build.js",
        manifest: "esc -o types -f types/think.d.es --manifest --scope es-thinkphp --inherit es-php"
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
        "easescript-cli": "latest",
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
  routePathWithNamespace: false,
  formation: {
    route: null
  },
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
      "server/exception/db/*": "think/db/exception",
      "server/exception/*": "think/exception",
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

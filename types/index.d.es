/**
* 获取环境变量值
* @access public
* @param string $name    环境变量名（支持二级 .号分割）
* @param string $default 默认值
* @return mixed
*/
declare function env<T=Scalar | Scalar[]>(name:string,defaultValue?:any):T;

/**
* 抛出HTTP异常
* @param integer|Response $code    状态码 或者 Response对象实例
* @param string           $message 错误信息
* @param array            $header  参数
*/
declare function abort(code:server.kernel.Response | number , message?:string, header?:ArrayMapping<Scalar>):void;

/**
* 快速获取容器中的实例 支持依赖注入
* @template T
* @param string|class-string<T> $name        类名或标识 默认获取当前应用实例
* @param array                  $args        参数
* @param bool                   $newInstance 是否每次创建新的实例
* @return T|object|App
*/
declare function app(name:string, args?:any[], newInstance?:boolean):any;
declare function app(name:'app', args?:any[], newInstance?:boolean):server.kernel.App;
declare function app(name:'cache', args?:any[], newInstance?:boolean):server.kernel.Cache;
declare function app(name:'config', args?:any[], newInstance?:boolean):server.kernel.Config;
declare function app(name:'console', args?:any[], newInstance?:boolean):server.kernel.Console;
declare function app(name:'cookie', args?:any[], newInstance?:boolean):server.kernel.Cookie;
declare function app(name:'db', args?:any[], newInstance?:boolean):server.kernel.Db;
declare function app(name:'env', args?:any[], newInstance?:boolean):server.kernel.Env;
declare function app(name:'event', args?:any[], newInstance?:boolean):server.kernel.Event;
declare function app(name:'http', args?:any[], newInstance?:boolean):server.kernel.Http;
declare function app(name:'lang', args?:any[], newInstance?:boolean):server.kernel.Http;
declare function app(name:'log', args?:any[], newInstance?:boolean):server.kernel.Log;
declare function app(name:'middleware', args?:any[], newInstance?:boolean):server.kernel.Middleware;
declare function app(name:'request', args?:any[], newInstance?:boolean):server.kernel.Request;
declare function app(name:'response', args?:any[], newInstance?:boolean):server.kernel.Response;
declare function app(name:'route', args?:any[], newInstance?:boolean):server.kernel.Route;
declare function app(name:'session', args?:any[], newInstance?:boolean):server.kernel.Session;
declare function app(name:'validate', args?:any[], newInstance?:boolean):server.kernel.Validate;
declare function app(name:'view', args?:any[], newInstance?:boolean):server.kernel.View;
declare function app(name:'filesystem', args?:any[], newInstance?:boolean):server.kernel.Filesystem;
declare function app():server.kernel.App;


/**
* 绑定一个类到容器
* @param string|array $abstract 类标识、接口（支持批量绑定）
* @param mixed        $concrete 要绑定的类、闭包或者实例
* @return Container
*/
declare function bind(abstracts:class<any>|class<any>[], concrete?:class<any>|(...args)=>void):server.kernel.Container

/**
* 缓存管理
* @param string $name    缓存名称
* @param mixed  $value   缓存值
* @param mixed  $options 缓存参数
* @param string $tag     缓存标签
* @return mixed
*/
declare function cache(name?:string, value?:any, options?:Record, tag?:string):any;

/**
* 获取和设置配置参数
* @param string|array $name  参数名
* @param mixed        $value 参数值
* @return mixed
*/
declare function config(name:string|string[]|Record<any>, value?):any;

/**
* Cookie管理
* @param string $name   cookie名称
* @param mixed  $value  cookie值
* @param mixed  $option 参数
* @return mixed
*/
declare function cookie(name?:string, value?, option?:Record):any;

/**
* 获取\think\response\Download对象实例
* @param string $filename 要下载的文件
* @param string $name     显示文件名
* @param bool   $content  是否为内容
* @param int    $expire   有效期（秒）
* @return \think\response\File
*/
declare function download(filename:string, name?:string, content?:boolean, expire?:number): server.response.File

/**
* 浏览器友好的变量输出
* @param mixed $vars 要输出的变量
* @return void
*/
declare function dump(...vars):void;

/**
* 触发事件
* @param mixed $event 事件名（或者类名）
* @param mixed $args  参数
* @return mixed
*/
declare function event(event:string, args?):any;

/**
* 调试变量并且中断输出
* @param mixed $vars 调试变量或者信息
*/
declare function halt(...vars):void;

/**
* 获取输入数据 支持默认值和过滤
* @param string $key     获取的变量名
* @param mixed  $default 默认值
* @param string $filter  过滤方法
* @return mixed
*/
declare function input(key?:string, default?, filter:(...args)=>boolean):any;

/**
* 调用反射实例化对象或者执行方法 支持依赖注入
* @param mixed $call 类名或者callable
* @param array $args 参数
* @return mixed
*/
declare function invoke(call:(...args)=>any, args?:array ):any;

/**
* 获取\think\response\Json对象实例
* @param mixed $data    返回的数据
* @param int   $code    状态码
* @param array $header  头部
* @param array $options 参数
* @return \think\response\Json
*/
declare function json<T=any>(data:T, code?:number, header?:Record<string>, options?:Record): server.response.Json<T>

/**
* 获取\think\response\Jsonp对象实例
* @param mixed $data    返回的数据
* @param int   $code    状态码
* @param array $header  头部
* @param array $options 参数
* @return \think\response\Jsonp
*/
declare  function jsonp<T=any>(data:T, code?:number, header?:Record<string>, options?:Record): server.response.Jsonp<T>

/**
* 获取语言变量值
* @param string $name 语言变量名
* @param array  $vars 动态变量值
* @param string $lang 语言
* @return mixed
*/
declare function lang(name:string, vars?:(string|number)[] | Record<any>, lang?:string):any;

/**
* 字符串命名风格转换
* type 0 将Java风格转换为C的风格 1 将C风格转换为Java的风格
* @param string $name    字符串
* @param int    $type    转换类型
* @param bool   $ucfirst 首字母是否大写（驼峰规则）
* @return string
*/
declare function parse_name(name:string, type:number, ucfirst?:boolean): string

/**
* 获取\think\response\Redirect对象实例
* @param string $url  重定向地址
* @param int    $code 状态码
* @return \think\response\Redirect
*/
declare  function redirect(url:string, code?:number): server.response.Redirect<string>

/**
* 获取当前Request对象实例
* @return Request
*/
declare  function request(): server.kernel.Request

/**
* 创建普通 Response 对象实例
* @param mixed      $data   输出数据
* @param int|string $code   状态码
* @param array      $header 头信息
* @param string     $type
* @return Response
*/
declare function response<T=any>(data:T, code?:number, header?:Record<string>, type?:string): server.kernel.Response<T>

/**
* Session管理
* @param string $name  session名称
* @param mixed  $value session值
* @return mixed
*/
declare  function session(name:string, value?):any

/**
* 获取Token令牌
* @param string $name 令牌名称
* @param mixed  $type 令牌生成方法
* @return string
*/
declare function token(name?:string, type?:string): string

/**
* 生成令牌隐藏表单
* @param string $name 令牌名称
* @param mixed  $type 令牌生成方法
* @return string
*/
declare function token_field(name?:string, type?:string): string

/**
* 生成令牌meta
* @param string $name 令牌名称
* @param mixed  $type 令牌生成方法
* @return string
*/
declare function token_meta(name?:string, type?:string): string

/**
* 记录日志信息
* @param mixed  $log   log信息 支持字符串和数组
* @param string $level 日志级别
* @return array|void
*/
declare function trace(log?:string, level?:string ):array

/**
* Url生成
* @param string      $url    路由地址
* @param array       $vars   变量
* @param bool|string $suffix 生成的URL后缀
* @param bool|string $domain 域名
* @return UrlBuild
*/
declare function url(url:string, vars?:array, suffix?:boolean, domain?:boolean): server.route.Url;

/**
* 生成验证对象
* @param string|array $validate      验证器类名或者验证规则数组
* @param array        $message       错误提示信息
* @param bool         $batch         是否批量验证
* @param bool         $failException 是否抛出异常
* @return Validate
*/
declare function validate(validate:class<server.kernel.Validate>, message?:Record<Record<any>|string>, batch?:boolean, failException?:boolean): server.kernel.Validate;
declare function validate(validate:Record<Record<any>|string>, message?:Record<Record<any>|string>, batch?:boolean, failException?:boolean): server.kernel.Validate;

/**
* 渲染模板输出
* @param string   $template 模板文件
* @param array    $vars     模板变量
* @param int      $code     状态码
* @param callable $filter   内容过滤
* @return \think\response\View
*/
declare function view(template?:string, vars?:Record<any>, code?:number, filter:(...args)=>boolean): server.response.View<string>;

/**
* 渲染模板输出
* @param string   $content 渲染内容
* @param array    $vars    模板变量
* @param int      $code    状态码
* @param callable $filter  内容过滤
* @return \think\response\View
*/
declare function display(content?:string, vars?:Record<any>, code?:number, filter:(...args)=>boolean): server.response.View<string>

/**
* 获取\think\response\Xml对象实例
* @param mixed $data    返回的数据
* @param int   $code    状态码
* @param array $header  头部
* @param array $options 参数
* @return \think\response\Xml
*/
declare function xml(data:array, code?:number, header?:Record<any>, options?:Record): server.response.Xml<string>

/**
* 获取当前应用目录
*
* @param string $path
* @return string
*/
declare function app_path(path?:string):string

/**
* 获取应用基础目录
*
* @param string $path
* @return string
*/
declare function base_path(path?:string):string

/**
* 获取应用配置目录
*
* @param string $path
* @return string
*/
declare function config_path(path?:string):string

/**
* 获取web根目录
*
* @param string $path
* @return string
*/
declare function public_path(path?:string):string

/**
* 获取应用运行时目录
*
* @param string $path
* @return string
*/
declare function runtime_path(path?:string):string

/**
* 获取项目根目录
*
* @param string $path
* @return string
*/
declare function root_path(path?:string):string

declare type FieldValue = string | number;
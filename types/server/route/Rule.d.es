package server.route;
import server.kernel.Route;
import server.kernel.Request;

/**
 * 路由规则基础类
 */
@abstract
declare class Rule
{
   

    check(request:Request, url:string, completeMatch:boolean = false);

    /**
     * 设置路由参数
     * @access public
     * @param  array $option 参数
     * @return $this
     */
    option(option:array)
   

    /**
     * 设置单个路由参数
     * @access public
     * @param  string $name  参数名
     * @param  mixed  $value 值
     * @return $this
     */
    setOption(name:string, value)
  

    /**
     * 注册变量规则
     * @access public
     * @param  array $pattern 变量规则
     * @return $this
     */
    pattern(pattern:array)
   

    /**
     * 设置标识
     * @access public
     * @param  string $name 标识名
     * @return $this
     */
    name(name:string)
   

    /**
     * 获取路由对象
     * @access public
     * @return Route
     */
    getRouter(): Route
   

    /**
     * 获取Name
     * @access public
     * @return string
     */
    getName(): string
  
    /**
     * 获取当前路由规则
     * @access public
     * @return mixed
     */
    getRule()
   

    /**
     * 获取当前路由地址
     * @access public
     * @return mixed
     */
    getRoute()
   
    /**
     * 获取当前路由的变量
     * @access public
     * @return array
     */
    getVars(): array
  

    /**
     * 获取Parent对象
     * @access public
     * @return $this|null
     */
    getParent():this|null
   

    /**
     * 获取路由所在域名
     * @access public
     * @return string
     */
    getDomain():string
   
    /**
     * 获取路由参数
     * @access public
     * @param  string $name 变量名
     * @return mixed
     */
    config(name:string = ''):any;
   

    /**
     * 获取变量规则定义
     * @access public
     * @param  string $name 变量名
     * @return mixed
     */
    getPattern(name:string = ''):any;
   

    /**
     * 获取路由参数定义
     * @access public
     * @param  string $name 参数名
     * @param  mixed  $default 默认值
     * @return mixed
     */
    getOption(name:string = '', default = null)
   

    /**
     * 获取当前路由的请求类型
     * @access public
     * @return string
     */
    getMethod(): string
  

    /**
     * 设置路由请求类型
     * @access public
     * @param  string $method 请求类型
     * @return $this
     */
    method(method:string):this;
    

    /**
     * 检查后缀
     * @access public
     * @param  string $ext URL后缀
     * @return $this
     */
    ext(ext:string = ''):this;
   
    /**
     * 检查禁止后缀
     * @access public
     * @param  string $ext URL后缀
     * @return $this
     */
    denyExt(ext:string = ''):this;
    

    /**
     * 检查域名
     * @access public
     * @param  string $domain 域名
     * @return $this
     */
    domain(domain:string):this;
   

    /**
     * 设置参数过滤检查
     * @access public
     * @param  array $filter 参数过滤
     * @return $this
     */
    filter(filter:array):this;
  

    /**
     * 绑定模型
     * @access public
     * @param  array|string|var:Closure  路由变量名 多个使用 & 分割
     * @param  string|model:Closure 绑定模型类
     * @param  bool                  $exception 是否抛出异常
     * @return $this
     */
    model(vars, model = null, exception:boolean = true):this;
    

    /**
     * 附加路由隐式参数
     * @access public
     * @param  array $append 追加参数
     * @return $this
     */
    append(append:array = []):this;
   
    /**
     * 绑定验证
     * @access public
     * @param  mixed  $validate 验证器类
     * @param  string $scene 验证场景
     * @param  array  $message 验证提示
     * @param  bool   $batch 批量验证
     * @return $this
     */
    validate(validate, scene:string = null, message:array = [], batch:boolean = false):this;
   

    /**
     * 指定路由中间件
     * @access public
     * @param string|array|middleware:Closure 中间件
     * @param mixed $params 参数
     * @return $this
     */
    middleware(middleware, ...params):this;
   

    /**
     * 允许跨域
     * @access public
     * @param  array $header 自定义Header
     * @return $this
     */
    allowCrossDomain(header:array = []):this;
    

    /**
     * 表单令牌验证
     * @access public
     * @param  string $token 表单令牌token名称
     * @return $this
     */
    token(token:string = '__token__'):this;
   

    /**
     * 设置路由缓存
     * @access public
     * @param  array|cache:string 缓存
     * @return $this
     */
    cache(cache):this;
   

    /**
     * 检查URL分隔符
     * @access public
     * @param  string $depr URL分隔符
     * @return $this
     */
    depr(depr:string):this;

    /**
     * 设置需要合并的路由参数
     * @access public
     * @param  array $option 路由参数
     * @return $this
     */
    mergeOptions(option:array = [])
   

    /**
     * 检查是否为HTTPS请求
     * @access public
     * @param  bool $https 是否为HTTPS
     * @return $this
     */
    https(https:boolean = true):this;
    

    /**
     * 检查是否为JSON请求
     * @access public
     * @param  bool $json 是否为JSON
     * @return $this
     */
    json(json:boolean = true):this;
    

    /**
     * 检查是否为AJAX请求
     * @access public
     * @param  bool $ajax 是否为AJAX
     * @return $this
     */
    ajax(ajax:boolean = true):this;
   

    /**
     * 检查是否为PJAX请求
     * @access public
     * @param  bool $pjax 是否为PJAX
     * @return $this
     */
    pjax(pjax:boolean = true):this;
   

    /**
     * 路由到一个模板地址 需要额外传入的模板变量
     * @access public
     * @param  array $view 视图
     * @return $this
     */
    view(view:array = []):this;
   
    /**
     * 通过闭包检查路由是否匹配
     * @access public
     * @param  callable $match 闭包
     * @return $this
     */
    match(match:(...args)=>boolean):this;
   

    /**
     * 设置路由完整匹配
     * @access public
     * @param  bool $match 是否完整匹配
     * @return $this
     */
    completeMatch(match:boolean = true):this;
   

    /**
     * 是否去除URL最后的斜线
     * @access public
     * @param  bool $remove 是否去除最后斜线
     * @return $this
     */
    removeSlash(remove:boolean = true):this;
    

    /**
     * 设置路由规则全局有效
     * @access public
     * @return $this
     */
    crossDomainRule():this;

    /**
     * 解析匹配到的规则路由
     * @access public
     * @param  Request $request 请求对象
     * @param  string  $rule 路由规则
     * @param  mixed   $route 路由地址
     * @param  string  $url URL地址
     * @param  array   $option 路由参数
     * @param  array   $matches 匹配的变量
     * @return Dispatch
     */
    parseRule(request:Request, rule:string, route, url:string, option:array = [], matches:array = []): Dispatch

    /**
     * 解析URL的pathinfo参数
     * @access public
     * @param  string $url URL地址
     * @return array
     */
    parseUrlPath(url:string): array
}

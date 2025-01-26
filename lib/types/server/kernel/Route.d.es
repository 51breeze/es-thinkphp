package server.kernel;

import server.route.RuleName
import server.route.RuleGroup;
import server.route.Domain;
import server.route.RuleItem
import server.route.Rule
import server.route.Dispatch;
import server.kernel.Response;
import server.kernel.Request;

/**
 * 路由管理类
 * @package think
 */
declare class Route
{
  
    constructor(app:App);
   

    config(name?:string):any;

    /**
     * 设置路由域名及分组（包括资源路由）是否延迟解析
     * @access public
     * @param bool $lazy 路由是否延迟解析
     * @return $this
     */
    lazy(lazy?:boolean):this;
   
    /**
     * 设置路由为测试模式
     * @access public
     * @param bool $test 路由是否测试模式
     * @return void
     */
    setTestMode(test:boolean): void

    /**
     * 检查路由是否为测试模式
     * @access public
     * @return bool
     */
    isTest(): boolean

    /**
     * 设置路由域名及分组（包括资源路由）是否合并解析
     * @access public
     * @param bool $merge 路由是否合并解析
     * @return $this
     */
    mergeRuleRegex(merge?:boolean):this;

    /**
     * 设置当前分组
     * @access public
     * @param RuleGroup $group 域名
     * @return void
     */
    setGroup(group:RuleGroup): void
   
    /**
     * 获取指定标识的路由分组 不指定则获取当前分组
     * @access public
     * @param string $name 分组标识
     * @return RuleGroup
     */
    getGroup(name?:string):RuleGroup;
   
    /**
     * 注册变量规则
     * @access public
     * @param array $pattern 变量规则
     * @return $this
     */
    pattern(pattern:any[]):this;

    /**
     * 注册路由参数
     * @access public
     * @param array $option 参数
     * @return $this
     */
    option(option:any[]):this;

    /**
     * 注册域名路由
     * @access public
     * @param string|array $name 子域名
     * @param mixed        $rule 路由规则
     * @return Domain
     */
    domain(name:string|string[], rule = null): Domain

    /**
     * 获取域名
     * @access public
     * @return array
     */
    getDomains(): array
   
    /**
     * 获取RuleName对象
     * @access public
     * @return RuleName
     */
    getRuleName(): RuleName
   
    /**
     * 设置路由绑定
     * @access public
     * @param string $bind   绑定信息
     * @param string $domain 域名
     * @return $this
     */
    bind(bind:string, domain:string):this;

    /**
     * 读取路由绑定信息
     * @access public
     * @return array
     */
    getBind(): array

    /**
     * 读取路由绑定
     * @access public
     * @param string $domain 域名
     * @return string|null
     */
    getDomainBind(domain?:string):string|null;

    /**
     * 读取路由标识
     * @access public
     * @param string $name   路由标识
     * @param string $domain 域名
     * @param string $method 请求类型
     * @return array
     */
    getName(name?:string, domain?:string, method?:string): array

    /**
     * 批量导入路由标识
     * @access public
     * @param array $name 路由标识
     * @return void
     */
    import(name:array): void

    /**
     * 注册路由标识
     * @access public
     * @param string   $name     路由标识
     * @param RuleItem $ruleItem 路由规则
     * @param bool     $first    是否优先
     * @return void
     */
    setName(name:string, ruleItem:RuleItem, first = false): void
   
    /**
     * 保存路由规则
     * @access public
     * @param string   $rule     路由规则
     * @param RuleItem $ruleItem RuleItem对象
     * @return void
     */
    setRule(rule:string, ruleItem ?:RuleItem ): void
   
    /**
     * 读取路由
     * @access public
     * @param string $rule 路由规则
     * @return RuleItem[]
     */
    getRule(rule:string): array

    /**
     * 读取路由列表
     * @access public
     * @return array
     */
    getRuleList(): array

    /**
     * 清空路由规则
     * @access public
     * @return void
     */
    clear(): void

    /**
     * 注册路由规则
     * @access public
     * @param string $rule   路由规则
     * @param mixed  $route  路由地址
     * @param string $method 请求类型
     * @return RuleItem
     */
    rule(rule:string, route = null, method = '*'): RuleItem

    /**
     * 设置跨域有效路由规则
     * @access public
     * @param Rule   $rule   路由规则
     * @param string $method 请求类型
     * @return $this
     */
    setCrossDomainRule(rule:Rule, method = '*')

    /**
     * 注册路由分组
     * @access public
     * @param string|\Closure $name  分组名称或者参数
     * @param mixed           $route 分组路由
     * @return RuleGroup
     */
    group(name:string|(...args)=>void, route = null): RuleGroup

    /**
     * 注册路由
     * @access public
     * @param string $rule  路由规则
     * @param mixed  $route 路由地址
     * @return RuleItem
     */
    any(rule:string, route): RuleItem
   
    /**
     * 注册GET路由
     * @access public
     * @param string $rule  路由规则
     * @param mixed  $route 路由地址
     * @return RuleItem
     */
    get(rule:string, route:string|(...args)=>Response): RuleItem
  
    /**
     * 注册POST路由
     * @access public
     * @param string $rule  路由规则
     * @param mixed  $route 路由地址
     * @return RuleItem
     */
    post(rule:string, route:string|(...args)=>Response): RuleItem
   
    /**
     * 注册PUT路由
     * @access public
     * @param string $rule  路由规则
     * @param mixed  $route 路由地址
     * @return RuleItem
     */
    put(rule:string, route:string|(...args)=>Response): RuleItem

    /**
     * 注册DELETE路由
     * @access public
     * @param string $rule  路由规则
     * @param mixed  $route 路由地址
     * @return RuleItem
     */
    delete(rule:string, route:string|(...args)=>Response): RuleItem

    /**
     * 注册PATCH路由
     * @access public
     * @param string $rule  路由规则
     * @param mixed  $route 路由地址
     * @return RuleItem
     */
    patch(rule:string, route:string|(...args)=>Response): RuleItem
   
    /**
     * 注册HEAD路由
     * @access public
     * @param string $rule  路由规则
     * @param mixed  $route 路由地址
     * @return RuleItem
     */
    head(rule:string, route:string|(...args)=>Response): RuleItem

    /**
     * 注册OPTIONS路由
     * @access public
     * @param string $rule  路由规则
     * @param mixed  $route 路由地址
     * @return RuleItem
     */
    options(rule:string, route:string|(...args)=>Response): RuleItem

    /**
     * 注册资源路由
     * @access public
     * @param string $rule  路由规则
     * @param string $route 路由地址
     * @return Resource
     */
    resource(rule:string, route:string): Resource

    /**
     * 注册视图路由
     * @access public
     * @param string $rule     路由规则
     * @param string $template 路由模板地址
     * @param array  $vars     模板变量
     * @return RuleItem
     */
    view(rule:string, template?:string, vars?:ArrayMapping<any>): RuleItem

    /**
     * 注册重定向路由
     * @access public
     * @param string $rule   路由规则
     * @param string $route  路由地址
     * @param int    $status 状态码
     * @return RuleItem
     */
    redirect(rule:string, route?:string, status?:number): RuleItem

    /**
     * rest方法定义和修改
     * @access public
     * @param string|array $name     方法名称
     * @param array|bool   $resource 资源
     * @return $this
     */
    rest(name:string|string[], resource?:any[]|boolean):this;
   
    /**
     * 获取rest方法定义的参数
     * @access public
     * @param string $name 方法名称
     * @return array|null
     */
    getRest(name?:string):array|null

    /**
     * 注册未匹配路由规则后的处理
     * @access public
     * @param string|Closure $route  路由地址
     * @param string         $method 请求类型
     * @return RuleItem
     */
    miss(route:string|(...args)=>Response, method?:string): RuleItem
   
    /**
     * 路由调度
     * @param Request $request
     * @param Closure|bool $withRoute
     * @return Response
     */
    dispatch(request:Request, withRoute?:boolean):Response
   
    /**
     * 检测URL路由
     * @access public
     * @return Dispatch|false
     * @throws RouteNotFoundException
     */
    check():Dispatch|false
   
    /**
     * 默认URL解析
     * @access public
     * @param string $url URL地址
     * @return Dispatch
     */
    url(url:string): Dispatch

    /**
     * URL生成 支持路由反射
     * @access public
     * @param string $url  路由地址
     * @param array  $vars 参数 ['a'=>'val1', 'b'=>'val2']
     * @return UrlBuild
     */
    buildUrl(url:string, vars?:ArrayMapping<string>): server.route.Url
   
}

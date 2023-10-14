package server.route;
import server.kernel.Route;

/**
 * 路由分组类
 */
declare class RuleGroup extends Rule
{
   
    /**
     * 架构函数
     * @access public
     * @param  Route     $router 路由对象
     * @param  RuleGroup $parent 上级对象
     * @param  string    $name   分组名称
     * @param  mixed     $rule   分组路由
     */
    construct(router:Route, parent:RuleGroup = null, name:string = '', $rule = null)

    /**
     * 获取分组别名
     * @access public
     * @return string
     */
    getAlias(): string
 
    /**
     * 设置路由分组别名
     * @access public
     * @param  string $alias 路由分组别名
     * @return $this
     */
    alias(alias:string):this;

    /**
     * 延迟解析分组的路由规则
     * @access public
     * @param  bool $lazy 路由是否延迟解析
     * @return $this
     */
    lazy(lazy:boolean = true):this;
   

    /**
     * 解析分组和域名的路由规则及绑定
     * @access public
     * @param  mixed $rule 路由规则
     * @return void
     */
    parseGroupRule(rule): void

    /**
     * 获取分组的MISS路由
     * @access public
     * @return RuleItem|null
     */
    getMissRule():RuleItem|null

    /**
     * 注册MISS路由
     * @access public
     * @param  string|route:Closure  路由地址
     * @param  string         $method 请求类型
     * @return RuleItem
     */
    miss(route, method:string = '*') : RuleItem
   

    /**
     * 添加分组下的路由规则
     * @access public
     * @param  string $rule   路由规则
     * @param  mixed  $route  路由地址
     * @param  string $method 请求类型
     * @return RuleItem
     */
    addRule(rule:string, route = null, method:string = '*'): RuleItem
   

    /**
     * 注册分组下的路由规则
     * @access public
     * @param  Rule   $rule   路由规则
     * @param  string $method 请求类型
     * @return $this
     */
    addRuleItem(rule:Rule, method:string = '*'):this;
   

    /**
     * 设置分组的路由前缀
     * @access public
     * @param  string $prefix 路由前缀
     * @return $this
     */
    prefix(prefix:string):this;
   

    /**
     * 合并分组的路由规则正则
     * @access public
     * @param  bool $merge 是否合并
     * @return $this
     */
    mergeRuleRegex(merge:boolean = true):this;
   
    /**
     * 设置分组的Dispatch调度
     * @access public
     * @param  string $dispatch 调度类
     * @return $this
     */
    dispatcher(dispatch:string):this;
   

    /**
     * 获取完整分组Name
     * @access public
     * @return string
     */
    getFullName(): string
   

    /**
     * 获取分组的路由规则
     * @access public
     * @param  string $method 请求类型
     * @return array
     */
    getRules(method:string = ''): array
    

    /**
     * 清空分组下的路由规则
     * @access public
     * @return void
     */
    clear(): void
   
}

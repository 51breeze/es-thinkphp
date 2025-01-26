package server.route;
import server.kernel.Route;
import server.kernel.Request;

/**
 * 路由规则类
 */
declare class RuleItem extends Rule
{
    /**
     * 架构函数
     * @access public
     * @param  Route             $router 路由实例
     * @param  RuleGroup         $parent 上级对象
     * @param  string            $name 路由标识
     * @param  string            $rule 路由规则
     * @param  string|\Closure   $route 路由地址
     * @param  string            $method 请求类型
     */
    constructor(router:Route, parent:RuleGroup, name:string = null, rule:string = '', $route = null, method:string = '*')

    /**
     * 设置当前路由规则为MISS路由
     * @access public
     * @return $this
     */
    setMiss():this;


    /**
     * 判断当前路由规则是否为MISS路由
     * @access public
     * @return bool
     */
    isMiss(): boolean
   

    /**
     * 设置当前路由为自动注册OPTIONS
     * @access public
     * @return $this
     */
    setAutoOptions():this;
   

    /**
     * 判断当前路由规则是否为自动注册的OPTIONS路由
     * @access public
     * @return bool
     */
    isAutoOptions(): boolean
  

    /**
     * 获取当前路由的URL后缀
     * @access public
     * @return string|null
     */
    getSuffix():string|null
    

    /**
     * 路由规则预处理
     * @access public
     * @param  string      $rule     路由规则
     * @return void
     */
    setRule(rule:string): void

    /**
     * 检测路由
     * @access public
     * @param  Request      $request  请求对象
     * @param  string       $url      访问地址
     * @param  array        $match    匹配路由变量
     * @param  bool         $completeMatch   路由是否完全匹配
     * @return Dispatch|false
     */
    checkRule(request:Request, url:string, match = null, completeMatch:boolean = false)
   
    /**
     * 设置路由所属分组（用于注解路由）
     * @access public
     * @param  string $name 分组名称或者标识
     * @return $this
     */
    group(name:string):this;
    
}

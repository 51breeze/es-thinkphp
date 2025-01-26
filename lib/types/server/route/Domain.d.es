package server.route;

import server.kernel.Route;

/**
 * 域名路由
 */
declare class Domain extends RuleGroup
{
    /**
     * 架构函数
     * @access public
     * @param  Route       $router   路由对象
     * @param  string      $name     路由域名
     * @param  mixed       $rule     域名路由
     */
    constructor(router:Route, name?:string, rule?)
   
    /**
     * 设置路由绑定
     * @access public
     * @param  string     $bind 绑定信息
     * @return $this
     */
    bind(bind:string):this;
}

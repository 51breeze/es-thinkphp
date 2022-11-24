package server.route;

import server.kernel.Route;

/**
 * 资源路由类
 */
declare class Resource extends RuleGroup
{
    /**
     * 架构函数
     * @access public
     * @param  Route         $router     路由对象
     * @param  RuleGroup     $parent     上级对象
     * @param  string        $name       资源名称
     * @param  string        $route      路由地址
     * @param  array         $rest       资源定义
     */
    constructor(router:Route, parent?:RuleGroup, name?:string, route?:string, rest?:any[])

    /**
     * 设置资源允许
     * @access public
     * @param  array $only 资源允许
     * @return $this
     */
    only(only:any[]):this;
   
    /**
     * 设置资源排除
     * @access public
     * @param  array $except 排除资源
     * @return $this
     */
    except(except:any[]):this;

    /**
     * 设置资源路由的变量
     * @access public
     * @param  array $vars 资源变量
     * @return $this
     */
    vars(vars:ArrayMappingType<any>):this;
   

    /**
     * 绑定资源验证
     * @access public
     * @param  array|string $name 资源类型或者验证信息
     * @param  array|string $validate 验证信息
     * @return $this
     */
    withValidate(name:string|string[], validate?:string|string[]):this;
   

    /**
     * 绑定资源模型
     * @access public
     * @param  array|string $name 资源类型或者模型绑定
     * @param  array|string $model 模型绑定
     * @return $this
     */
    withModel(name:string|string[], model?:string|string[]):this;
    

    /**
     * 绑定资源中间件
     * @access public
     * @param  array|string $name 资源类型或者中间件定义
     * @param  array|string $middleware 中间件定义
     * @return $this
     */
    withMiddleware(name:string|string[], middleware?:string|string[]):this;
   

    /**
     * rest方法定义和修改
     * @access public
     * @param  array|string  $name 方法名称
     * @param  array|bool    $resource 资源
     * @return $this
     */
    rest(name:string|string[], resource?:any[]|boolean):this;

}

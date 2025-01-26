package server.route;

import server.kernel.App;
import server.kernel.Route;

/**
 * 路由地址生成
 */
declare class Url
{
    /**
     * 架构函数
     * @access public
     * @param  string $url URL地址
     * @param  array  $vars 参数
     */
    constructor(route:Route, app:App, url:string = '', vars:array = [])
  
    /**
     * 设置URL参数
     * @access public
     * @param  array $vars URL参数
     * @return $this
     */
    vars(vars:ArrayMapping<string>):this
   
    /**
     * 设置URL后缀
     * @access public
     * @param  string|suffix:bool URL后缀
     * @return $this
     */
    suffix(suffix:string|boolean):this
   
    /**
     * 设置URL域名（或者子域名）
     * @access public
     * @param  string|domain:bool URL域名
     * @return $this
     */
    domain(domain:string|boolean):this
   
    /**
     * 设置URL 根地址
     * @access public
     * @param  string $root URL root
     * @return $this
     */
    root(root:string):this
   
    /**
     * 设置是否使用HTTPS
     * @access public
     * @param  bool $https
     * @return $this
     */
    https(https:boolean = true):this
   
   
    /**
     * 生成URL地址
     * @access public
     * @return string
     */
    build():string;
}

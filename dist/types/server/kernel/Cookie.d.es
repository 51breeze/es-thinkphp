package server.kernel;

import server.kernel.Request;
import server.contract.CookieConfigInterface;

/**
 * Cookie管理类
 * @package think
 */
declare class Cookie
{
    /**
     * 配置参数
     * @var array
     */
    protected config:CookieConfigInterface;

    /**
     * Cookie写入数据
     * @var array
     */
    protected cookie:ArrayMappingType<ScalarValueType>;

    /**
     * 当前Request对象
     * @var Request
     */
    protected request:Request;

    /**
     * 构造方法
     * @access public
     */
    constructor(request:Request, config?:CookieConfigInterface)


    static __make(request:Request, config:CookieConfigInterface)


    /**
     * 获取cookie
     * @access public
     * @param  mixed  $name 数据名称
     * @param  string $default 默认值
     * @return mixed
     */
    get<T=ScalarValueType>(name?:string, default?:T):T;


    /**
     * 是否存在Cookie参数
     * @access public
     * @param  string $name 变量名
     * @return bool
     */
    has(name:string): boolean;

    /**
     * Cookie 设置
     *
     * @access public
     * @param  string $name  cookie名称
     * @param  string $value cookie值
     * @param  mixed  $option 可选参数
     * @return void
     */
    set(name:string, value:string, option?): void
   

    /**
     * Cookie 保存
     *
     * @access public
     * @param  string $name  cookie名称
     * @param  string $value cookie值
     * @param  int    $expire 有效期
     * @param  array  $option 可选参数
     * @return void
     */
    protected setCookie(name:string, value:string, expire:number, option:ArrayMappingType<ScalarValueType>): void

    /**
     * 永久保存Cookie数据
     * @access public
     * @param  string $name  cookie名称
     * @param  string $value cookie值
     * @param  mixed  $option 可选参数 可能会是 null|integer|string
     * @return void
     */
   forever(name:string, value:string,option:ArrayMappingType<ScalarValueType>): void


    /**
     * Cookie删除
     * @access public
     * @param  string $name cookie名称
     * @param  array  $options cookie参数
     * @return void
     */
   delete(name:string, option:ArrayMappingType<ScalarValueType>): void
  

    /**
     * 获取cookie保存数据
     * @access public
     * @return array
     */
   getCookie(): ArrayMappingType<ScalarValueType>


    /**
     * 保存Cookie
     * @access public
     * @return void
     */
   save(): void
   
    /**
     * 保存Cookie
     * @access public
     * @param  string $name cookie名称
     * @param  string $value cookie值
     * @param  int    $expire cookie过期时间
     * @param  string $path 有效的服务器路径
     * @param  string $domain 有效域名/子域名
     * @param  bool   $secure 是否仅仅通过HTTPS
     * @param  bool   $httponly 仅可通过HTTP访问
     * @param  string $samesite 防止CSRF攻击和用户追踪
     * @return void
     */
    protected saveCookie(name:string, value:string, expire:number, path:string, domain:string, secure:boolean, httponly:boolean, samesite:string): void
  
}

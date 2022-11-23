package server.kernel;

import server.http.Session;

/**
 * 响应输出基础类
 * @package think
 */
declare interface Response{
   
    /**
     * 设置Session对象
     * @access public
     * @param  Session $session Session对象
     * @return $this
     */
    setSession(session:Session):this;

    /**
     * 发送数据到客户端
     * @access public
     * @return void
     * @throws \InvalidArgumentException
     */
    send(): void
   
    /**
     * 输出的参数
     * @access public
     * @param  mixed $options 输出参数
     * @return $this
     */
    options(options?:ArrayMappingType<ScalarValueType>):this;

    /**
     * 输出数据设置
     * @access public
     * @param  mixed $data 输出数据
     * @return $this
     */
    data(data:any):this;

    /**
     * 是否允许请求缓存
     * @access public
     * @param  bool $cache 允许请求缓存
     * @return $this
     */
    allowCache(cache:boolean):this;

    /**
     * 是否允许请求缓存
     * @access public
     * @return bool
     */
    isAllowCache():boolean;

    /**
     * 设置Cookie
     * @access public
     * @param  string $name  cookie名称
     * @param  string $value cookie值
     * @param  mixed  $option 可选参数
     * @return $this
     */
    cookie(name:string, value:string, option?:ArrayMappingType<ScalarValueType>):this;

    /**
     * 设置响应头
     * @access public
     * @param  array $header  参数
     * @return $this
     */
    header(header:ArrayMappingType<ScalarValueType>):this;

    /**
     * 设置页面输出内容
     * @access public
     * @param  mixed $content
     * @return $this
     */
    content(content:any):this;

    /**
     * 发送HTTP状态
     * @access public
     * @param  integer $code 状态码
     * @return $this
     */
    code(code:number):this;


    /**
     * LastModified
     * @access public
     * @param  string $time
     * @return $this
     */
    lastModified(time:string):this;


    /**
     * Expires
     * @access public
     * @param  string $time
     * @return $this
     */
    expires(time:string):this;


    /**
     * ETag
     * @access public
     * @param  string $eTag
     * @return $this
     */
    eTag(eTag:string):this;

    /**
     * 页面缓存控制
     * @access public
     * @param  string $cache 状态码
     * @return $this
     */
    cacheControl(cache:string):this;

    /**
     * 页面输出类型
     * @access public
     * @param  string $contentType 输出类型
     * @param  string $charset     输出编码
     * @return $this
     */
    contentType(contentType:string, charset?:string):this;

    /**
     * 获取头部信息
     * @access public
     * @param  string $name 头部名称
     * @return mixed
     */
    getHeader(name?:string):any

    /**
     * 获取原始数据
     * @access public
     * @return mixed
     */
    getData():any

    /**
     * 获取输出数据
     * @access public
     * @return string
     */
    getContent(): string

    /**
     * 获取状态码
     * @access public
     * @return integer
     */
    getCode(): int

}

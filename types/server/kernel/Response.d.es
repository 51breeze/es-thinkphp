package server.kernel;

declare class Response<T=any>{

      /**
      * 原始数据
      * @var mixed
      */
      @Alias(data)
      protected _data:T;

      /**
      * 当前contentType
      * @var string
      */
      @Alias(contentType)
      protected _contentType:string;

      /**
      * 字符集
      * @var string
      */
      @Alias(charset)
      protected _charset:string;

      /**
      * 状态码
      * @var integer
      */
      @Alias(code)
      protected _code:number;

      /**
      * 是否允许请求缓存
      * @var bool
      */
      @Alias(allowCache)
      protected _allowCache = true;

      /**
      * 输出参数 
      * @var array
      */
      @Alias(options)
      protected _options = [];

      /**
      * header参数
      * @var array
      */
      @Alias(header)
      protected _header:{[key:string]:string};

      /**
      * 输出内容
      * @var string
      */
      @Alias(content)
      protected _content:string;

      /**
      * Cookie对象
      * @var Cookie
      */
      @Alias(cookie)
      protected _cookie:Cookie;

      /**
      * Session对象
      * @var Session
      */
      @Alias(session)
      protected _session:Session;

      /**
      * 初始化
      * @access protected
      * @param  mixed  $data 输出数据
      * @param  int    $code 状态码
      */
      protected init(data:T, code:int = 200)

      /**
      * 创建Response对象
      * @access public
      * @param  mixed  $data 输出数据
      * @param  string $type 输出类型
      * @param  int    $code 状态码
      * @return Response
      */
      public static create<R=any>(data:R, type:string = 'html', code:int = 200): Response<R>


      /**
      * 设置Session对象
      * @access public
      * @param  Session $session Session对象
      * @return $this
      */
      setSession(session):this


      /**
      * 发送数据到客户端
      * @access public
      * @return void
      * @throws \InvalidArgumentException
      */
      send(): void


      /**
      * 处理数据
      * @access protected
      * @param  mixed $data 要处理的数据
      * @return mixed
      */
      protected output(data:T):T


      /**
      * 输出数据
      * @access protected
      * @param string $data 要处理的数据
      * @return void
      */
      protected sendData(data:string): void


      /**
      * 输出的参数
      * @access public
      * @param  mixed $options 输出参数
      * @return $this
      */
      options( options:array = []):this


      /**
      * 输出数据设置
      * @access public
      * @param  mixed $data 输出数据
      * @return $this
      */
      data<R>(data:R):this


      /**
      * 是否允许请求缓存
      * @access public
      * @param  bool $cache 允许请求缓存
      * @return $this
      */
      allowCache(cache:boolean):this

      /**
      * 是否允许请求缓存
      * @access public
      * @return bool
      */
      isAllowCache():boolean


      /**
      * 设置Cookie
      * @access public
      * @param  string $name  cookie名称
      * @param  string $value cookie值
      * @param  mixed  $option 可选参数
      * @return $this
      */
      cookie(name:string, value:string, option = null):this


      /**
      * 设置响应头
      * @access public
      * @param  array $header  参数
      * @return $this
      */
      header(header:{[key:string]:string}):this

      /**
      * 设置页面输出内容
      * @access public
      * @param  mixed $content
      * @return $this
      */
      content(content:any):this


      /**
      * 发送HTTP状态
      * @access public
      * @param  integer $code 状态码
      * @return $this
      */
      code(code:int):this


      /**
      * LastModified
      * @access public
      * @param  string $time
      * @return $this
      */
      lastModified(time:string):this
      /**
      * Expires
      * @access public
      * @param  string $time
      * @return $this
      */
      expires(time:string):this

      /**
      * ETag
      * @access public
      * @param  string $eTag
      * @return $this
      */
      eTag(eTag:string):this

      /**
      * 页面缓存控制
      * @access public
      * @param  string $cache 状态码
      * @return $this
      */
      cacheControl(cache:string):this

      /**
      * 页面输出类型
      * @access public
      * @param  string $contentType 输出类型
      * @param  string $charset     输出编码
      * @return $this
      */
      contentType(contentType:string, charset:string='utf-8'):this

      /**
      * 获取头部信息
      * @access public
      * @param  string $name 头部名称
      * @return mixed
      */
      getHeader(name?:string):string|null

      /**
      * 获取原始数据
      * @access public
      * @return mixed
      */
      getData():T;


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




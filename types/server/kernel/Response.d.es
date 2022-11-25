package server.kernel;

declare class Response{

      /**
      * 原始数据
      * @var mixed
      */
      //protected var data:any;

      /**
      * 当前contentType
      * @var string
      */
      //protected var contentType = 'text/html';

      /**
      * 字符集
      * @var string
      */
      //protected var charset = 'utf-8';

      /**
      * 状态码
      * @var integer
      */
      //protected var code = 200;

      /**
      * 是否允许请求缓存
      * @var bool
      */
      //protected var allowCache = true;

      /**
      * 输出参数 
      * @var array
      */
      //protected var options = [];

      /**
      * header参数
      * @var array
      */
      //protected var header = [];

      /**
      * 输出内容
      * @var string
      */
      //protected var content = null;

      /**
      * Cookie对象
      * @var Cookie
      */
      //protected var cookie:any;

      /**
      * Session对象
      * @var Session
      */
      //protected var session:any;

      /**
      * 初始化
      * @access protected
      * @param  mixed  $data 输出数据
      * @param  int    $code 状态码
      */
      protected init(data:any, code:int = 200)

      /**
      * 创建Response对象
      * @access public
      * @param  mixed  $data 输出数据
      * @param  string $type 输出类型
      * @param  int    $code 状态码
      * @return Response
      */
      public static create(data:any, type:string = 'html', code:int = 200): Response


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
      protected output(data:any):any


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
      data(data:any):this


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
      header(header:array = []):this

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
      getHeader(name?:string)

      /**
      * 获取原始数据
      * @access public
      * @return mixed
      */
      getData()


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

declare class Xml extends Response{

}

declare class Html extends Response{

}

declare class Json extends Response{

}

declare class Jsonp extends Response{

}

/**
* Redirect Response
*/
declare class Redirect extends Response{

      /**
      * 重定向传值（通过Session）
      * @access protected
      * @param  string|array  $name 变量名或者数组
      * @param  mixed         $value 值
      * @return $this
      */
      with(name:string | array, value?):this;


      /**
      * 记住当前url后跳转
      * @access public
      * @return $this
      */
      remember(complete:boolean):this;


      /**
      * 跳转到上次记住的url
      * @access public
      * @return $this
      */
      restore():this;

}

/**
* File Response
*/
declare class File extends Response{

      constructor(data:string, code:number);

      /**
      * 设置是否为内容 必须配合mimeType方法使用
      * @access public
      * @param  bool $content
      * @return $this
      */
      isContent(content?:boolean):this;

      /**
      * 设置有效期
      * @access public
      * @param  integer $expire 有效期
      * @return $this
      */
      expire(expire:number):this;

      /**
      * 设置文件类型
      * @access public
      * @param  string $filename 文件名
      * @return $this
      */
      mimeType(mimeType:string):this;

      /**
      * 设置文件强制下载
      * @access public
      * @param  bool $force 强制浏览器下载
      * @return $this
      */
      force(force:boolean):this;

      /**
      * 获取文件类型信息
      * @access public
      * @param  string $filename 文件名
      * @return string
      */
      protected getMimeType(filename:string): string

      /**
      * 设置下载文件的显示名称
      * @access public
      * @param  string $filename 文件名
      * @param  bool   $extension 后缀自动识别
      * @return $this
      */
      name(filename:string, extension?:boolean):this;
}



/**
* View Response
*/
declare class View extends Response{

      /**
      * 获取视图变量
      * @access public
      * @param  string $name 模板变量
      * @return mixed
      */
      getVars(name?:string):any;


      /**
      * 模板变量赋值
      * @access public
      * @param  string|array $name  模板变量
      * @param  mixed        $value 变量值
      * @return $this
      */
      assign(name:string, value?):this;


      /**
      * 视图内容过滤
      * @access public
      * @param callable $filter
      * @return $this
      */
      filter(filter:(...args)=>boolean):this;


      /**
      * 检查模板是否存在
      * @access public
      * @param  string  $name 模板名
      * @return bool
      */
      exists(name:string): boolean
}
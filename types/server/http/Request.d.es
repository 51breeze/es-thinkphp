package server.http;

declare class Request{

      /**
      * 获取当前包含协议的域名
      * @access public
      * @param  bool $port 是否需要去除端口号
      * @return string
      */
      domain(port?:boolean):string;

      /**
      * 获取当前根域名
      * @access public
      * @return string
      */
      rootDomain():string;

      /**
      * 获取当前子域名
      * @access public
      * @return string
      */
      subDomain():string;

      /**
      * 获取当前泛域名的值
      * @access public
      * @return string
      */
      panDomain():string;

      /**
      * 设置当前包含协议的域名
      * @access public
      * @param  string $domain 域名
      * @return $this
      */
      setDomain(domain:string)

      /**
      * 设置当前泛域名的值
      * @access public
      * @param  string $domain 域名
      * @return $this
      */
      setSubDomain(domain:string):string;

      /**
      * 设置当前泛域名的值
      * @access public
      * @param  string $domain 域名
      * @return $this
      */
      setPanDomain(domain:string):string;

      /**
      * 获取当前完整URL 包括QUERY_STRING
      * @access public
      * @param  bool $complete 是否包含完整域名
      * @return string
      */
      url(complete:boolean):string;

      /**
      * 设置当前完整URL 包括QUERY_STRING
      * @access public
      * @param  string $url URL地址
      * @return $this
      */
      setUrl(url:string):this;

      /**
      * 设置当前URL 不含QUERY_STRING
      * @access public
      * @param  string $url URL地址
      * @return $this
      */
      setBaseUrl(url:string):this;


      /**
      * 获取当前请求的参数
      * @access public
      * @param  string|array $name 变量名
      * @param  mixed        $default 默认值
      * @param  string|array $filter 过滤方法
      * @return mixed
      */
      param<T>(name:string, defaultValue?:T, filter?:string | array):T

      /**
      * 获取包含文件在内的请求参数
      * @access public
      * @param  string|array $name 变量名
      * @param  string|array $filter 过滤方法
      * @return mixed
      */
      all<T>(name?:string, filter?:string | array):T

      /**
      * 获取POST参数
      * @access public
      * @param  string|array $name 变量名
      * @param  mixed        $default 默认值
      * @param  string|array $filter 过滤方法
      * @return mixed
      */
      post<T>(name?:string, defaultValue?:T, filter?:string | array):T


      /**
      * 获取当前URL 不含QUERY_STRING
      * @access public
      * @param  bool complete 是否包含完整域名
      * @return string
      */
      public  baseUrl(complete?:boolean): string

      /**
      * 获取当前执行的文件 SCRIPT_NAME
      * @access public
      * @param  bool complete 是否包含完整域名
      * @return string
      */
      public  baseFile(complete?:boolean): string

      /**
      * 设置URL访问根地址
      * @access public
      * @param  string url URL地址
      * @return this
      */
      public  setRoot(url:string):this

      /**
      * 获取URL访问根地址
      * @access public
      * @param  bool complete 是否包含完整域名
      * @return string
      */
      public  root(complete?:boolean): string

      /**
      * 获取URL访问根目录
      * @access public
      * @return string
      */
      public  rootUrl(): string

      /**
      * 设置当前请求的pathinfo
      * @access public
      * @param  string pathinfo
      * @return this
      */
      public  setPathinfo(pathinfo:string):this

      /**
      * 获取当前请求URL的pathinfo信息（含URL后缀）
      * @access public
      * @return string
      */
      public  pathinfo(): string

      /**
      * 当前URL的访问后缀
      * @access public
      * @return string
      */
      public  ext(): string

      /**
      * 获取当前请求的时间
      * @access public
      * @param  bool float 是否使用浮点类型
      * @return integer|float
      */
      public  time(float?:boolean)

      /**
      * 当前请求的资源类型
      * @access public
      * @return string
      */
      public  type(): string

      /**
      * 设置资源类型
      * @access public
      * @param  string|array type 资源类型名
      * @param  string       val 资源类型
      * @return void
      */
      public  mimeType(type:string|array , val?:string): void

      /**
      * 设置请求类型
      * @access public
      * @param  string method 请求类型
      * @return this
      */
      public  setMethod(method:string):this

      /**
      * 当前的请求类型
      * @access public
      * @param  bool origin 是否获取原始请求类型
      * @return string
      */
      public  method(origin?:boolean): string

      /**
      * 是否为GET请求
      * @access public
      * @return bool
      */
      public  isGet(): boolean

      /**
      * 是否为POST请求
      * @access public
      * @return bool
      */
      public  isPost(): boolean

      /**
      * 是否为PUT请求
      * @access public
      * @return bool
      */
      public  isPut(): boolean

      /**
      * 是否为DELTE请求
      * @access public
      * @return bool
      */
      public  isDelete(): boolean

      /**
      * 是否为HEAD请求
      * @access public
      * @return bool
      */
      public  isHead(): boolean

      /**
      * 是否为PATCH请求
      * @access public
      * @return bool
      */
      public  isPatch(): boolean

      /**
      * 是否为OPTIONS请求
      * @access public
      * @return bool
      */
      public  isOptions(): boolean

      /**
      * 是否为cli
      * @access public
      * @return bool
      */
      public  isCli(): boolean

      /**
      * 是否为cgi
      * @access public
      * @return bool
      */
      public  isCgi(): boolean

      /**
      * 设置路由变量
      * @access public
      * @param  Rule rule 路由对象
      * @return this
      */
      public  setRule(rule:any):this

      /**
      * 获取当前路由对象
      * @access public
      * @return Rule|null
      */
      public  rule()

      /**
      * 设置路由变量
      * @access public
      * @param  array route 路由变量
      * @return this
      */
      public  setRoute(route:array):this

      /**
      * 获取路由参数
      * @access public
      * @param  string|array name 变量名
      * @param  mixed        default 默认值
      * @param  string|array filter 过滤方法
      * @return mixed
      */
      public  route(name?:string, default?:any, filter?:string|array)

      /**
      * 获取GET参数
      * @access public
      * @param  string|array name 变量名
      * @param  mixed        default 默认值
      * @param  string|array filter 过滤方法
      * @return mixed
      */
      public  get(name?:string, default?:any, filter?:string|array)

      /**
      * 获取中间件传递的参数
      * @access public
      * @param  mixed name 变量名
      * @param  mixed default 默认值
      * @return mixed
      */
      public  middleware(name:string, default?:any)

      /**
      * 获取PUT参数
      * @access public
      * @param  string|array name 变量名
      * @param  mixed        default 默认值
      * @param  string|array filter 过滤方法
      * @return mixed
      */
      public  put(name?:string, default?:any, filter?:string|array)

      protected getInputData(content): array

      /**
      * 设置获取DELETE参数
      * @access public
      * @param  mixed        name 变量名
      * @param  mixed        default 默认值
      * @param  string|array filter 过滤方法
      * @return mixed
      */
      public  delete(name?:string, default?:any, filter?:string|array)

      /**
      * 设置获取PATCH参数
      * @access public
      * @param  mixed        name 变量名
      * @param  mixed        default 默认值
      * @param  string|array filter 过滤方法
      * @return mixed
      */
      public  patch(name?:string, default?:any, filter?:string|array)

      /**
      * 获取request变量
      * @access public
      * @param  string|array name 数据名称
      * @param  mixed        default 默认值
      * @param  string|array filter 过滤方法
      * @return mixed
      */
      public  request(name?:string, default?:any, filter?:string|array)

      /**
      * 获取环境变量
      * @access public
      * @param  string name 数据名称
      * @param  string default 默认值
      * @return mixed
      */
      public  env(name?:string, default?:any)

      /**
      * 获取session数据
      * @access public
      * @param  string name 数据名称
      * @param  string default 默认值
      * @return mixed
      */
      public  session(name?:string, default?:any)

      /**
      * 获取cookie参数
      * @access public
      * @param  mixed        name 数据名称
      * @param  string       default 默认值
      * @param  string|array filter 过滤方法
      * @return mixed
      */
      public  cookie( name?:string, default?:any, filter?:string|array)

      /**
      * 获取server参数
      * @access public
      * @param  string name 数据名称
      * @param  string default 默认值
      * @return mixed
      */
      public  server(name?:string, default?:string)

      /**
      * 获取上传的文件信息
      * @access public
      * @param  string name 名称
      * @return null|array|UploadedFile
      */
      public  file( name?:string )

      protected  dealUploadFile(files:array, name:string ): array

      protected  throwUploadFileError(error)

      /**
      * 设置或者获取当前的Header
      * @access public
      * @param  string name header名称
      * @param  string default 默认值
      * @return string|array
      */
      public  header(name?:string, default?:string)

      /**
      * 获取变量 支持过滤和默认值
      * @access public
      * @param  array        data 数据源
      * @param  string|false name 字段名
      * @param  mixed        default 默认值
      * @param  string|array filter 过滤函数
      * @return mixed
      */
      public  input(data?:array, name?:string, default?:any, filter?:string|array)

      protected filterData(data, filter, name, default?:any)

      /**
      * 强制类型转换
      * @access protected
      * @param  mixed  data
      * @param  string type
      * @return mixed
      */
      protected  typeCast(data:any, type:string)

      /**
      * 获取数据
      * @access protected
      * @param  array  data 数据源
      * @param  string name 字段名
      * @param  mixed  default 默认值
      * @return mixed
      */
      protected  getData(data:array, name:string, default?:any)

      /**
      * 设置或获取当前的过滤规则
      * @access public
      * @param  mixed filter 过滤规则
      * @return mixed
      */
      public filter(filter?:any)

      protected  getFilter(filter:any, default?:any): array

      /**
      * 递归过滤给定的值
      * @access public
      * @param  mixed value 键值
      * @param  mixed key 键名
      * @param  array filters 过滤方法+默认值
      * @return mixed
      */
      public  filterValue(value:any, key:string|number, filters:array)

      /**
      * 是否存在某个请求参数
      * @access public
      * @param  string name 变量名
      * @param  string type 变量类型
      * @param  bool   checkEmpty 是否检测空值
      * @return bool
      */
      public  has(name:string, type?:string, checkEmpty?:boolean): boolean

      /**
      * 获取指定的参数
      * @access public
      * @param  array        name 变量名
      * @param  mixed        data 数据或者变量类型
      * @param  string|array filter 过滤方法
      * @return array
      */
      public  only(name:array, data?:string, filter?:string|array): array

      /**
      * 排除指定参数获取
      * @access public
      * @param  array  name 变量名
      * @param  string type 变量类型
      * @return mixed
      */
      public  except( name:array, type?:string): array

      /**
      * 当前是否ssl
      * @access public
      * @return bool
      */
      public  isSsl(): boolean

      /**
      * 当前是否JSON请求
      * @access public
      * @return bool
      */
      public  isJson(): boolean

      /**
      * 当前是否Ajax请求
      * @access public
      * @param  bool ajax true 获取原始ajax请求
      * @return bool
      */
      public  isAjax(ajax?:boolean): boolean

      /**
      * 当前是否Pjax请求
      * @access public
      * @param  bool pjax true 获取原始pjax请求
      * @return bool
      */
      public  isPjax(pjax?:boolean): boolean

      /**
      * 获取客户端IP地址
      * @access public
      * @return string
      */
      public  ip(): string

      /**
      * 检测是否是合法的IP地址
      *
      * @param string ip   IP地址
      * @param string type IP地址类型 (ipv4, ipv6)
      *
      * @return boolean
      */
      public  isValidIP( ip:string,  type?:string): boolean

      /**
      * 将IP地址转换为二进制字符串
      *
      * @param string ip
      *
      * @return string
      */
      public  ip2bin(ip:string): string

      /**
      * 检测是否使用手机访问
      * @access public
      * @return bool
      */
      public  isMobile(): boolean

      /**
      * 当前URL地址中的scheme参数
      * @access public
      * @return string
      */
      public  scheme(): string

      /**
      * 当前请求URL地址中的query参数
      * @access public
      * @return string
      */
      public  query(): string

      /**
      * 设置当前请求的host（包含端口）
      * @access public
      * @param  string host 主机名（含端口）
      * @return this
      */
      public  setHost(host:string):this

      /**
      * 当前请求的host
      * @access public
      * @param bool strict  true 仅仅获取HOST
      * @return string
      */
      public  host(strict?:boolean): string

      /**
      * 当前请求URL地址中的port参数
      * @access public
      * @return int
      */
      public  port(): int

      /**
      * 当前请求 SERVER_PROTOCOL
      * @access public
      * @return string
      */
      public  protocol(): string

      /**
      * 当前请求 REMOTE_PORT
      * @access public
      * @return int
      */
      public  remotePort(): int

      /**
      * 当前请求 HTTP_CONTENT_TYPE
      * @access public
      * @return string
      */
      public  contentType(): string

      /**
      * 获取当前请求的安全Key
      * @access public
      * @return string
      */
      public  secureKey(): string

      /**
      * 设置当前的控制器名
      * @access public
      * @param  string controller 控制器名
      * @return this
      */
      public  setController(controller:string):this

      /**
      * 设置当前的操作名
      * @access public
      * @param  string action 操作名
      * @return this
      */
      public  setAction(action:string):this

      /**
      * 获取当前的控制器名
      * @access public
      * @param  bool convert 转换为小写
      * @return string
      */
      public  controller(convert?:boolean): string

      /**
      * 获取当前的操作名
      * @access public
      * @param  bool convert 转换为小写
      * @return string
      */
      public  action(convert?:boolean): string

      /**
      * 设置或者获取当前请求的content
      * @access public
      * @return string
      */
      public  getContent(): string

      /**
      * 获取当前请求的php://input
      * @access public
      * @return string
      */
      public  getInput(): string

      /**
      * 生成请求令牌
      * @access public
      * @param  string name 令牌名称
      * @param  mixed  type 令牌生成方法
      * @return string
      */
      public  buildToken(name?:string, type?:string): string


      /**
      * 检查请求令牌
      * @access public
      * @param  string token 令牌名称
      * @param  array  data  表单数据
      * @return bool
      */
      public  checkToken(token?:string, data?:array): boolean


      /**
      * 设置在中间件传递的数据
      * @access public
      * @param  array middleware 数据
      * @return this
      */
      public  withMiddleware(middleware:array):this

      /**
      * 设置GET数据
      * @access public
      * @param  array get 数据
      * @return this
      */
      public  withGet(get:array):this

      /**
      * 设置POST数据
      * @access public
      * @param  array post 数据
      * @return this
      */
      public  withPost(post:array):this

      /**
      * 设置COOKIE数据
      * @access public
      * @param array cookie 数据
      * @return this
      */
      public  withCookie(cookie:array):this

      /**
      * 设置SESSION数据
      * @access public
      * @param Session session 数据
      * @return this
      */
      public  withSession(session:server.http.Session):this

      /**
      * 设置SERVER数据
      * @access public
      * @param  array server 数据
      * @return this
      */
      public  withServer(server:array):this

      /**
      * 设置HEADER数据
      * @access public
      * @param  array header 数据
      * @return this
      */
      public  withHeader(header:array):this

      /**
      * 设置ENV数据
      * @access public
      * @param Env env 数据
      * @return this
      */
      public  withEnv(env:server.kernel.Env):this

      /**
      * 设置php://input数据
      * @access public
      * @param string input RAW数据
      * @return this
      */
      public  withInput(input:string):this

      /**
      * 设置文件上传数据
      * @access public
      * @param  array files 上传信息
      * @return this
      */
      public  withFiles(files:array):this

      /**
      * 设置ROUTE变量
      * @access public
      * @param  array route 数据
      * @return this
      */
      public  withRoute(route:array):this

}

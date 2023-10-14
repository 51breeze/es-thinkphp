package server.kernel;

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
    param<T=any>(name:string, defaultValue?:T, filter?:string | array):T

    /**
    * 获取包含文件在内的请求参数
    * @access public
    * @param  string|array $name 变量名
    * @param  string|array $filter 过滤方法
    * @return mixed
    */
    all<T=any>(name?:string, filter?:string | (name?)=>boolean):T

    /**
    * 获取POST参数
    * @access public
    * @param  string|array $name 变量名
    * @param  mixed        $default 默认值
    * @param  string|array $filter 过滤方法
    * @return mixed
    */
    post<T=any>(name?:string, defaultValue?:T, filter?:string | array):T


    /**
    * 获取当前URL 不含QUERY_STRING
    * @access public
    * @param  bool complete 是否包含完整域名
    * @return string
    */
    baseUrl(complete?:boolean): string

    /**
    * 获取当前执行的文件 SCRIPT_NAME
    * @access public
    * @param  bool complete 是否包含完整域名
    * @return string
    */
    baseFile(complete?:boolean): string

    /**
    * 设置URL访问根地址
    * @access public
    * @param  string url URL地址
    * @return this
    */
    setRoot(url:string):this

    /**
    * 获取URL访问根地址
    * @access public
    * @param  bool complete 是否包含完整域名
    * @return string
    */
    root(complete?:boolean): string

    /**
    * 获取URL访问根目录
    * @access public
    * @return string
    */
    rootUrl(): string

    /**
    * 设置当前请求的pathinfo
    * @access public
    * @param  string pathinfo
    * @return this
    */
    setPathinfo(pathinfo:string):this

    /**
    * 获取当前请求URL的pathinfo信息（含URL后缀）
    * @access public
    * @return string
    */
    pathinfo(): string

    /**
    * 当前URL的访问后缀
    * @access public
    * @return string
    */
    ext(): string

    /**
    * 获取当前请求的时间
    * @access public
    * @param  bool float 是否使用浮点类型
    * @return integer|float
    */
    time(float?:boolean)

    /**
    * 当前请求的资源类型
    * @access public
    * @return string
    */
    type(): string

    /**
    * 设置资源类型
    * @access public
    * @param  string|array type 资源类型名
    * @param  string       val 资源类型
    * @return void
    */
    mimeType(type:string|array , val?:string): void

    /**
    * 设置请求类型
    * @access public
    * @param  string method 请求类型
    * @return this
    */
    setMethod(method:string):this

    /**
    * 当前的请求类型
    * @access public
    * @param  bool origin 是否获取原始请求类型
    * @return string
    */
    method(origin?:boolean): string

    /**
    * 是否为GET请求
    * @access public
    * @return bool
    */
    isGet(): boolean

    /**
    * 是否为POST请求
    * @access public
    * @return bool
    */
    isPost(): boolean

    /**
    * 是否为PUT请求
    * @access public
    * @return bool
    */
    isPut(): boolean

    /**
    * 是否为DELTE请求
    * @access public
    * @return bool
    */
    isDelete(): boolean

    /**
    * 是否为HEAD请求
    * @access public
    * @return bool
    */
    isHead(): boolean

    /**
    * 是否为PATCH请求
    * @access public
    * @return bool
    */
    isPatch(): boolean

    /**
    * 是否为OPTIONS请求
    * @access public
    * @return bool
    */
    isOptions(): boolean

    /**
    * 是否为cli
    * @access public
    * @return bool
    */
    isCli(): boolean

    /**
    * 是否为cgi
    * @access public
    * @return bool
    */
    isCgi(): boolean

    /**
    * 设置路由变量
    * @access public
    * @param  Rule rule 路由对象
    * @return this
    */
    setRule(rule:any):this

    /**
    * 获取当前路由对象
    * @access public
    * @return Rule|null
    */
    rule():any

    /**
    * 设置路由变量
    * @access public
    * @param  array route 路由变量
    * @return this
    */
    setRoute(route:array):this

    /**
    * 获取路由参数
    * @access public
    * @param  string|array name 变量名
    * @param  mixed        default 默认值
    * @param  string|array filter 过滤方法
    * @return mixed
    */
    route(name?:string, default?:any, filter?:string|array):any

    /**
    * 获取GET参数
    * @access public
    * @param  string|array name 变量名
    * @param  mixed        default 默认值
    * @param  string|array filter 过滤方法
    * @return mixed
    */
    get<T=any>(name?:string, default?:any, filter?:string|array):T

    /**
    * 获取中间件传递的参数
    * @access public
    * @param  mixed name 变量名
    * @param  mixed default 默认值
    * @return mixed
    */
    middleware<T=any>(name:string, default?:any):T

    /**
    * 获取PUT参数
    * @access public
    * @param  string|array name 变量名
    * @param  mixed        default 默认值
    * @param  string|array filter 过滤方法
    * @return mixed
    */
    put<T=any>(name?:string, default?:any, filter?:string|array):T

    /**
    * 设置获取DELETE参数
    * @access public
    * @param  mixed        name 变量名
    * @param  mixed        default 默认值
    * @param  string|array filter 过滤方法
    * @return mixed
    */
    delete<T=any>(name?:string, default?:any, filter?:string|array):T

    /**
    * 设置获取PATCH参数
    * @access public
    * @param  mixed        name 变量名
    * @param  mixed        default 默认值
    * @param  string|array filter 过滤方法
    * @return mixed
    */
    patch<T=any>(name?:string, default?:any, filter?:string|array):T

    /**
    * 获取request变量
    * @access public
    * @param  string|array name 数据名称
    * @param  mixed        default 默认值
    * @param  string|array filter 过滤方法
    * @return mixed
    */
    request<T=any>(name?:string, default?:any, filter?:string|array):T

    /**
    * 获取环境变量
    * @access public
    * @param  string name 数据名称
    * @param  string default 默认值
    * @return mixed
    */
    env<T=any>(name?:string, default?:any):T

    /**
    * 获取session数据
    * @access public
    * @param  string name 数据名称
    * @param  string default 默认值
    * @return mixed
    */
    session<T=any>(name?:string, default?:any):T

    /**
    * 获取cookie参数
    * @access public
    * @param  mixed        name 数据名称
    * @param  string       default 默认值
    * @param  string|array filter 过滤方法
    * @return mixed
    */
    cookie<T=any>(name?:string, default?:any, filter?:string|array):T

    /**
    * 获取server参数
    * @access public
    * @param  string name 数据名称
    * @param  string default 默认值
    * @return mixed
    */
    server<T=any>(name?:string, default?:string):T;

    /**
    * 获取上传的文件信息
    * @access public
    * @param  string name 名称
    * @return null|File[]
    */
    file():File[]

    /**
    * 获取上传的文件信息
    * @access public
    * @param  string name 名称
    * @return File|null
    */
    file( name:string ):File|null

    /**
    * 设置或者获取当前的Header
    * @access public
    * @param  string name header名称
    * @param  string default 默认值
    * @return string|array
    */
    header<T=any>(name?:string, default?:string):T

    /**
    * 获取变量 支持过滤和默认值
    * @access public
    * @param  array        data 数据源
    * @param  string|false name 字段名
    * @param  mixed        default 默认值
    * @param  string|array filter 过滤函数
    * @return mixed
    */
    input(data?:array, name?:string, default?:any, filter?:string|array):any;

    /**
    * 设置或获取当前的过滤规则
    * @access public
    * @param  mixed filter 过滤规则
    * @return mixed
    */
    filter(filter?:any):any;

    /**
    * 递归过滤给定的值
    * @access public
    * @param  mixed value 键值
    * @param  mixed key 键名
    * @param  array filters 过滤方法+默认值
    * @return mixed
    */
    filterValue(value:any, key:string|number, filters:array):any;

    /**
    * 是否存在某个请求参数
    * @access public
    * @param  string name 变量名
    * @param  string type 变量类型
    * @param  bool   checkEmpty 是否检测空值
    * @return bool
    */
    has(name:string, type?:string, checkEmpty?:boolean): boolean

    /**
    * 获取指定的参数
    * @access public
    * @param  array        name 变量名
    * @param  mixed        data 数据或者变量类型
    * @param  string|array filter 过滤方法
    * @return array
    */
    only(name:array, data?:string, filter?:string|array): array

    /**
    * 排除指定参数获取
    * @access public
    * @param  array  name 变量名
    * @param  string type 变量类型
    * @return mixed
    */
    except( name:array, type?:string): array

    /**
    * 当前是否ssl
    * @access public
    * @return bool
    */
    isSsl(): boolean

    /**
    * 当前是否JSON请求
    * @access public
    * @return bool
    */
    isJson(): boolean

    /**
    * 当前是否Ajax请求
    * @access public
    * @param  bool ajax true 获取原始ajax请求
    * @return bool
    */
    isAjax(ajax?:boolean): boolean

    /**
    * 当前是否Pjax请求
    * @access public
    * @param  bool pjax true 获取原始pjax请求
    * @return bool
    */
    isPjax(pjax?:boolean): boolean

    /**
    * 获取客户端IP地址
    * @access public
    * @return string
    */
    ip(): string

    /**
    * 检测是否是合法的IP地址
    *
    * @param string ip   IP地址
    * @param string type IP地址类型 (ipv4, ipv6)
    *
    * @return boolean
    */
    isValidIP( ip:string,  type?:string): boolean

    /**
    * 将IP地址转换为二进制字符串
    *
    * @param string ip
    *
    * @return string
    */
    ip2bin(ip:string): string

    /**
    * 检测是否使用手机访问
    * @access public
    * @return bool
    */
    isMobile(): boolean

    /**
    * 当前URL地址中的scheme参数
    * @access public
    * @return string
    */
    scheme(): string

    /**
    * 当前请求URL地址中的query参数
    * @access public
    * @return string
    */
    query(): string

    /**
    * 设置当前请求的host（包含端口）
    * @access public
    * @param  string host 主机名（含端口）
    * @return this
    */
    setHost(host:string):this

    /**
    * 当前请求的host
    * @access public
    * @param bool strict  true 仅仅获取HOST
    * @return string
    */
    host(strict?:boolean): string

    /**
    * 当前请求URL地址中的port参数
    * @access public
    * @return int
    */
    port(): int

    /**
    * 当前请求 SERVER_PROTOCOL
    * @access public
    * @return string
    */
    protocol(): string

    /**
    * 当前请求 REMOTE_PORT
    * @access public
    * @return int
    */
    remotePort(): int

    /**
    * 当前请求 HTTP_CONTENT_TYPE
    * @access public
    * @return string
    */
    contentType(): string

    /**
    * 获取当前请求的安全Key
    * @access public
    * @return string
    */
    secureKey(): string

    /**
    * 设置当前的控制器名
    * @access public
    * @param  string controller 控制器名
    * @return this
    */
    setController(controller:string):this

    /**
    * 设置当前的操作名
    * @access public
    * @param  string action 操作名
    * @return this
    */
    setAction(action:string):this

    /**
    * 获取当前的控制器名
    * @access public
    * @param  bool convert 转换为小写
    * @return string
    */
    controller(convert?:boolean): string

    /**
    * 获取当前的操作名
    * @access public
    * @param  bool convert 转换为小写
    * @return string
    */
    action(convert?:boolean): string

    /**
    * 设置或者获取当前请求的content
    * @access public
    * @return string
    */
    getContent(): string

    /**
    * 获取当前请求的php://input
    * @access public
    * @return string
    */
    getInput(): string

    /**
    * 生成请求令牌
    * @access public
    * @param  string name 令牌名称
    * @param  mixed  type 令牌生成方法
    * @return string
    */
    buildToken(name?:string, type?:string): string


    /**
    * 检查请求令牌
    * @access public
    * @param  string token 令牌名称
    * @param  array  data  表单数据
    * @return bool
    */
    checkToken(token?:string, data?:array): boolean


    /**
    * 设置在中间件传递的数据
    * @access public
    * @param  array middleware 数据
    * @return this
    */
    withMiddleware(middleware:array):this

    /**
    * 设置GET数据
    * @access public
    * @param  array get 数据
    * @return this
    */
    withGet(get:array):this

    /**
    * 设置POST数据
    * @access public
    * @param  array post 数据
    * @return this
    */
    withPost(post:array):this

    /**
    * 设置COOKIE数据
    * @access public
    * @param array cookie 数据
    * @return this
    */
    withCookie(cookie:array):this

    /**
    * 设置SESSION数据
    * @access public
    * @param Session session 数据
    * @return this
    */
    withSession(session:server.kernel.Session):this

    /**
    * 设置SERVER数据
    * @access public
    * @param  array server 数据
    * @return this
    */
    withServer(server:array):this

    /**
    * 设置HEADER数据
    * @access public
    * @param  array header 数据
    * @return this
    */
    withHeader(header:array):this

    /**
    * 设置ENV数据
    * @access public
    * @param Env env 数据
    * @return this
    */
    withEnv(env:server.kernel.Env):this

    /**
    * 设置php://input数据
    * @access public
    * @param string input RAW数据
    * @return this
    */
    withInput(input:string):this

    /**
    * 设置文件上传数据
    * @access public
    * @param  array files 上传信息
    * @return this
    */
    withFiles(files:array):this

    /**
    * 设置ROUTE变量
    * @access public
    * @param  array route 数据
    * @return this
    */
    withRoute(route:array):this

}

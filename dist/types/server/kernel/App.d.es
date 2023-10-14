package server.kernel;

declare class App extends Container{

        constructor(rootPath?:string);

        /**
        * 是否为调试模式
        * @access public
        * @return bool
        */
        isDebug():boolean;

        /**
        * 设置应用命名空间
        * @access public
        * @param string $namespace 应用命名空间
        * @return $this
        */
        setNamespace(namespace:string)

        /**
        * 获取应用类库命名空间
        * @access public
        * @return string
        */
        getNamespace(): string

        /**
        * 设置环境变量标识
        * @access public
        * @param string $name 环境标识
        * @return $this
        */
        setEnvName(name:string)


        /**
        * 获取框架版本
        * @access public
        * @return string
        */
        version(): string


        /**
        * 获取应用根目录
        * @access public
        * @return string
        */
        getRootPath(): string


        /**
        * 获取应用基础目录
        * @access public
        * @return string
        */
        getBasePath(): string


        /**
        * 获取当前应用目录
        * @access public
        * @return string
        */
        getAppPath(): string


        /**
        * 设置应用目录
        * @param string $path 应用目录
        */
        setAppPath(path:string)


        /**
        * 获取应用运行时目录
        * @access public
        * @return string
        */
        getRuntimePath(): string


        /**
        * 设置runtime目录
        * @param string $path 定义目录
        */
        setRuntimePath(path:string): void


        /**
        * 获取核心框架目录
        * @access public
        * @return string
        */
        getThinkPath(): string


        /**
        * 获取应用配置目录
        * @access public
        * @return string
        */
        getConfigPath(): string


        /**
        * 获取配置后缀
        * @access public
        * @return string
        */
        getConfigExt(): string


        /**
        * 获取应用开启时间
        * @access public
        * @return float
        */
        getBeginTime(): float


        /**
        * 获取应用初始内存占用
        * @access public
        * @return integer
        */
        getBeginMem(): int


        /**
        * 加载环境变量定义
        * @access public
        * @param string $envName 环境标识
        * @return void
        */
        loadEnv(envName?:string): void

        /**
        * 初始化应用
        * @access public
        * @return $this
        */
        initialize():this
    }
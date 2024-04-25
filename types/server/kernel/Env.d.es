package server.kernel;

declare class Env{

        /**
        * 环境变量数据
        * @var array
        */
        protected data:array;

        /**
        * 数据转换映射
        * @var array
        */
        protected convert:array 

        /**
        * 读取环境变量定义文件
        * @access public
        * @param string $file 环境变量定义文件
        * @return void
        */
        public load(file:string): void


        /**
        * 获取环境变量值
        * @access public
        * @param string $name    环境变量名
        * @param mixed  $default 默认值
        * @return mixed
        */
        public get<T=ScalarValue>(name:string, default?:T):T

        protected getEnv( name:string, default?:any)

        /**
        * 设置环境变量值
        * @access public
        * @param string|array $env   环境变量
        * @param mixed        $value 值
        * @return void
        */
        public set(name:string, default?:any): void

        /**
        * 检测是否存在环境变量
        * @access public
        * @param string $name 参数名
        * @return bool
        */
        public has(name:string): boolean
    }
package server.kernel;

declare class Container{

        /**
        * 容器对象实例
        * @var Container|Closure
        */
        static const instance:Container;

        /**
        * 容器中的对象实例
        * @var array
        */
        protected var instances = [];

        /**
        * 容器回调
        * @var array
        */
        protected var invokeCallback = [];

        /**
        * 获取当前容器的实例（单例）
        * @access public
        * @return static
        */
        getInstance():any;

        /**
        * 设置当前容器的实例
        * @access public
        * @param object|Closure $instance
        * @return void
        */
        setInstance( instance ): void


        /**
        * 注册一个容器对象回调
        *
        * @param string|Closure $abstract
        * @param Closure|null   $callback
        * @return void
        */
        resolving(name:string, callback?:()=>any ): void

        /**
        * 获取容器中的对象实例 不存在则创建
        * @access public
        * @param string     $abstract    类名或者标识
        * @param array|true $vars        变量
        * @param bool       $newInstance 是否每次创建新的实例
        * @return object
        */
        pull(name:string, vars:array = [], newInstance:boolean = false):object


        /**
        * 获取容器中的对象实例
        * @access public
        * @param string $abstract 类名或者标识
        * @return object
        */
        get(name:string):object

        /**
        * 绑定一个类、闭包、实例、接口实现到容器
        * @access public
        * @param string|array $abstract 类标识、接口
        * @param mixed        $concrete 要绑定的类、闭包或者实例
        * @return $this
        */
        bind(name:string, concrete = null):this


        /**
        * 根据别名获取真实类名
        * @param  string $abstract
        * @return string
        */
        getAlias(name:string): string


        /**
        * 绑定一个类实例到容器
        * @access public
        * @param string $abstract 类名或者标识
        * @param object $instance 类的实例
        * @return $this
        */
        instance(name:string, instance:object):this

        /**
        * 判断容器中是否存在类及标识
        * @access public
        * @param string $abstract 类名或者标识
        * @return bool
        */
        bound(name:string): boolean


        /**
        * 判断容器中是否存在类及标识
        * @access public
        * @param string $name 类名或者标识
        * @return bool
        */
        has(name:string): boolean


        /**
        * 判断容器中是否存在对象实例
        * @access public
        * @param string $abstract 类名或者标识
        * @return bool
        */
        exists(name:string): boolean


        /**
        * 创建类的实例 已经存在则直接获取
        * @access public
        * @param string $abstract    类名或者标识
        * @param array  $vars        变量
        * @param bool   $newInstance 是否每次创建新的实例
        * @return mixed
        */
        make(name:string, vars:array = [], newInstance:boolean = false):any


        /**
        * 删除容器中的对象实例
        * @access public
        * @param string $name 类名或者标识
        * @return void
        */
        delete(name:string):void

        /**
        * 执行函数或者闭包方法 支持参数调用
        * @access public
        * @param string|Closure $function 函数或者闭包
        * @param array          $vars     参数
        * @return mixed
        */
        invokeFunction(callback:()=>any,  vars:array= []):any


        /**
        * 调用反射执行类的方法 支持参数绑定
        * @access public
        * @param mixed $method     方法
        * @param array $vars       参数
        * @param bool  $accessible 设置是否可访问
        * @return mixed
        */
        invokeMethod(method,  vars:array = [], accessible:boolean = false):any


        /**
        * 调用反射执行类的方法 支持参数绑定
        * @access public
        * @param object $instance 对象实例
        * @param mixed  $reflect  反射类
        * @param array  $vars     参数
        * @return mixed
        */
        invokeReflectMethod(instance, reflect,vars:array=[]):any


        /**
        * 调用反射执行callable 支持参数绑定
        * @access public
        * @param mixed $callable
        * @param array $vars       参数
        * @param bool  $accessible 设置是否可访问
        * @return mixed
        */
        invoke($callable,  vars:array = [], accessible:boolean = false):any


        /**
        * 调用反射执行类的实例化 支持依赖注入
        * @access public
        * @param string $class 类名
        * @param array  $vars  参数
        * @return mixed
        */
        invokeClass( className:string, vars:array):any


        /**
        * 执行invokeClass回调
        * @access protected
        * @param string $class  对象类名
        * @param object $object 容器对象实例
        * @return void
        */
        protected invokeAfter( className:string, object:object): void


        /**
        * 绑定参数
        * @access protected
        * @param ReflectionFunctionAbstract $reflect 反射类
        * @param array                      $vars    参数
        * @return array
        */
        bindParams(reflect, vars:array = []): array


        /**
        * 创建工厂对象实例
        * @param string $name      工厂类名
        * @param string $namespace 默认命名空间
        * @param array  $args
        * @return mixed
        * @deprecated
        * @access public
        */
        factory( name:string,  namespace?:string, ...args):any


        /**
        * 获取对象类型的参数值
        * @access protected
        * @param string $className 类名
        * @param array  $vars      参数
        * @return mixed
        */
        getObjectParam(className:string, vars:array ):any

        //Countable
        count(): int

        //IteratorAggregate
        getIterator(): any
   
    }
package server.kernel;

@Abstract();
declare class Manager<T>
{
    /** @var App */
    protected app:App;

    /**
     * 驱动
     * @var array
     */
    protected drivers:T[];

    /**
     * 驱动的命名空间
     * @var string
     */
    protected namespace:string;

    constructor(app:App);

    /**
     * 获取驱动实例
     * @param null|string $name
     * @return mixed
     */
    protected driver(name:string = null):T | ArrayMapping<T>

    /**
     * 获取驱动实例
     * @param string $name
     * @return mixed
     */
    protected getDriver(name:string):T

    /**
     * 获取驱动类型
     * @param string $name
     * @return mixed
     */
    protected resolveType(name:string):T

    /**
     * 获取驱动配置
     * @param string $name
     * @return mixed
     */
    protected resolveConfig(name:string):ArrayMapping<ScalarValue>

    /**
     * 获取驱动类
     * @param string $type
     * @return string
     */
    protected resolveClass<T>(type:string):class<T>

    /**
     * 获取驱动参数
     * @param $name
     * @return array
     */
    protected resolveParams(name:string): any[]

    /**
     * 创建驱动
     *
     * @param string $name
     * @return mixed
     *
     */
    protected createDriver(name:string):T

    /**
     * 移除一个驱动实例
     *
     * @param array|string|null $name
     * @return $this
     */
    forgetDriver(name?:string):this;

    /**
     * 默认驱动
     * @return string|null
     */
    getDefaultDriver():string|null;

    /**
     * 动态调用
     * @param string $method
     * @param array  $parameters
     * @return mixed
     */
    [key:string]<T>(...args):T
}

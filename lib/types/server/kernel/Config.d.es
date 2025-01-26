package server.kernel;

/**
 * 配置管理类
 * @package think
 */
declare class Config{

    /**
     * 配置参数
     * @var array
     */
    protected config:ArrayMapping<Scalar>;

    /**
     * 配置文件目录
     * @var string
     */
    protected path:string;

    /**
     * 配置文件后缀
     * @var string
     */
    protected ext:string;

    /**
     * 构造方法
     * @access public
     */
    constructor(path?:string, ext?:string)


    static __make(app:App):void;

    /**
     * 加载配置文件（多种格式）
     * @access public
     * @param  string $file 配置文件名
     * @param  string $name 一级配置名
     * @return array
     */
    load(file:string, name?:string): ArrayMapping<Scalar>;
    

    /**
     * 解析配置文件
     * @access public
     * @param  string $file 配置文件名
     * @param  string $name 一级配置名
     * @return array
     */
    protected parse(file:string, name:string): ArrayMapping<Scalar>;
   

    /**
     * 检测配置是否存在
     * @access public
     * @param  string $name 配置参数名（支持多级配置 .号分割）
     * @return bool
     */
    has(name:string): boolean

    /**
     * 获取一级配置
     * @access protected
     * @param  string $name 一级配置名
     * @return array
     */
    protected pull(name:string): ArrayMapping<Scalar>;

    /**
     * 获取配置参数 为空则获取所有配置
     * @access public
     * @param  string $name    配置参数名（支持多级配置 .号分割）
     * @param  mixed  $default 默认值
     * @return mixed
     */
    get<T=Scalar>(name:string, default?:T):T

    /**
     * 设置配置参数 name为数组则为批量设置
     * @access public
     * @param  array  $config 配置参数
     * @param  string $name 配置名
     * @return array
     */
    set(config:ArrayMapping<Scalar>, name?:string): ArrayMapping<Scalar>;
}

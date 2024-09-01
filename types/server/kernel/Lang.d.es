package server.kernel;

import server.contract.LangConfigInterface;

/**
 * 多语言管理类
 * @package think
 */
declare class Lang
{
    protected app:App;

    /**
     * 配置参数
     * @var array
     */
    protected config:LangConfigInterface

    /**
     * 构造方法
     * @access public
     * @param array $config
     */
    constructor(app:App, config?:LangConfigInterface )

    static __make(app:App, config:LangConfigInterface)
    
    /**
     * 获取当前语言配置
     * @access public
     * @return array
     */
    getConfig(): LangConfigInterface

    /**
     * 设置当前语言
     * @access public
     * @param string $lang 语言
     * @return void
     */
    setLangSet(lang:string): void

    /**
     * 获取当前语言
     * @access public
     * @return string
     */
    getLangSet(): string


    /**
     * 获取默认语言
     * @access public
     * @return string
     */
    defaultLangSet()


    /**
     * 切换语言
     * @access public
     * @param string $langset 语言
     * @return void
     */
    switchLangSet(langset:string)
  
    /**
     * 加载语言定义(不区分大小写)
     * @access public
     * @param string|array $file  语言文件
     * @param string       $range 语言作用域
     * @return array
     */
    load(file:string, range?:string): ArrayMapping<Scalar>
    

    /**
     * 解析语言文件
     * @access protected
     * @param string $file 语言文件名
     * @return array
     */
    protected parse(file:string):  ArrayMapping<Scalar>
   

    /**
     * 判断是否存在语言定义(不区分大小写)
     * @access public
     * @param string|null $name  语言变量
     * @param string      $range 语言作用域
     * @return bool
     */
    has(name:string, range?:string): boolean

    /**
     * 获取语言定义(不区分大小写)
     * @access public
     * @param string|null $name  语言变量
     * @param array       $vars  变量替换
     * @param string      $range 语言作用域
     * @return mixed
     */
    get(name:string, vars?:string[], range?:string):string | ArrayMapping<string>

}

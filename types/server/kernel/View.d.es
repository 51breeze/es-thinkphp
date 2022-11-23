package server.kernel;

/**
 * 视图类
 * @package think
 */
declare class View extends Manager<View>
{

    /**
     * 获取模板引擎
     * @access public
     * @param string $type 模板引擎类型
     * @return $this
     */
   engine(type?:string):this;

    /**
     * 模板变量赋值
     * @access public
     * @param string|array $name  模板变量
     * @param mixed        $value 变量值
     * @return $this
     */
   assign(name, value = null):this;

    /**
     * 视图过滤
     * @access public
     * @param Callable $filter 过滤方法或闭包
     * @return $this
     */
   filter(filter?:(...args)=>boolean):this;

    /**
     * 解析和获取模板内容 用于输出
     * @access public
     * @param string $template 模板文件名或者内容
     * @param array  $vars     模板变量
     * @return string
     * @throws \Exception
     */
   fetch(template?:string, vars?:ArrayMappingType<any>): string

    /**
     * 渲染内容输出
     * @access public
     * @param string $content 内容
     * @param array  $vars    模板变量
     * @return string
     */
   display(content:string, vars?:ArrayMappingType<any>): string

    /**
     * 获取模板引擎渲染内容
     * @param $callback
     * @return string
     * @throws \Exception
     */
    protected getContent(callback?:(...args)=>any): string

}

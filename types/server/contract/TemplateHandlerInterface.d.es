package server.contract;

/**
 * 视图驱动接口
 */
declare interface TemplateHandlerInterface
{
    /**
     * 检测是否存在模板文件
     * @access public
     * @param  string $template 模板文件或者模板规则
     * @return bool
     */
   exists(template:string): boolean;

    /**
     * 渲染模板文件
     * @access public
     * @param  string $template 模板文件
     * @param  array  $data 模板变量
     * @return void
     */
   fetch(template:string, data?:any[]): void;

    /**
     * 渲染模板内容
     * @access public
     * @param  string $content 模板内容
     * @param  array  $data 模板变量
     * @return void
     */
    display(content:string, data?:any[]): void;

    /**
     * 配置模板引擎
     * @access private
     * @param  array $config 参数
     * @return void
     */
    config(config:array): void;

    /**
     * 获取模板引擎配置
     * @access public
     * @param  string $name 参数名
     * @return void
     */
    getConfig(name:string);
}

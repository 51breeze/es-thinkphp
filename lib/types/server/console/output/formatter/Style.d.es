package server.console.output.formatter;

declare class Style
{

    /**
     * 初始化输出的样式
     * @param string|null $foreground 字体颜色
     * @param string|null $background 背景色
     * @param array       $options    格式
     * @api
     */
    constructor(foreground = null, background = null, options = [])
   

    /**
     * 设置字体颜色
     * @param string|null $color 颜色名
     * @throws \InvalidArgumentException
     * @api
     */
    setForeground(color = null)
   

    /**
     * 设置背景色
     * @param string|null $color 颜色名
     * @throws \InvalidArgumentException
     * @api
     */
    setBackground(color = null)
   

    /**
     * 设置字体格式
     * @param string $option 格式名
     * @throws \InvalidArgumentException When the option name isn't defined
     * @api
     */
    setOption(option:string): void
   

    /**
     * 重置字体格式
     * @param string $option 格式名
     * @throws \InvalidArgumentException
     */
    unsetOption(option:string): void
   
    /**
     * 批量设置字体格式
     * @param array $options
     */
    setOptions(options:array)
   
    /**
     * 应用样式到文字
     * @param string $text 文字
     * @return string
     */
    apply(text:string): string
   
}

package server.console.output;

import server.console.output.formatter.Stack
import server.console.output.formatter.Style;

declare class Formatter
{
    /**
     * 转义
     * @param string $text
     * @return string
     */
    static escape(text:string):string;

    /**
     * 设置外观标识
     * @param bool $decorated 是否美化文字
     */
    setDecorated(decorated:boolean);
   
    /**
     * 获取外观标识
     * @return bool
     */
    isDecorated():boolean

    /**
     * 添加一个新样式
     * @param string $name  样式名
     * @param Style  $style 样式实例
     */
    setStyle(name:string, style:Style):void;
   
    /**
     * 是否有这个样式
     * @param string $name
     * @return bool
     */
    hasStyle(name:string):boolean

    /**
     * 获取样式
     * @param string $name
     * @return Style
     * @throws \InvalidArgumentException
     */
    getStyle(name:string):Style

    /**
     * 使用所给的样式格式化文字
     * @param string $message 文字
     * @return string
     */
    format(message:string):string

    /**
     * @return Style | Stack
     */
    getStyleStack():Style | Stack;
}

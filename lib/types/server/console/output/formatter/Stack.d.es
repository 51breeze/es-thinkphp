package server.console.output.formatter;

declare class Stack
{
    /**
     * 构造方法
     * @param Style|null $emptyStyle
     */
    constructor(emptyStyle?:Style);

    /**
     * 重置堆栈
     */
    reset(): void

    /**
     * 推一个样式进入堆栈
     * @param Style $style
     */
    push(style:Style): void

    /**
     * 从堆栈中弹出一个样式
     * @param Style|null $style
     * @return Style
     * @throws \InvalidArgumentException
     */
    pop(style?:Style|null): Style

    /**
     * 计算堆栈的当前样式。
     * @return Style
     */
    getCurrent(): Style

    /**
     * @param Style $emptyStyle
     * @return Stack
     */
    setEmptyStyle(emptyStyle:Style)

    /**
     * @return Style
     */
    getEmptyStyle(): Style
}

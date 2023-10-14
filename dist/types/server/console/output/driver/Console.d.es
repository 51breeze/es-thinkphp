package server.console.output.driver;

import server.console.Output;

declare class Console
{
    constructor(output:Output)
   
    setDecorated(decorated:boolean):this;

    write(messages:string, newline?:boolean, type?:number, stream?):void;
   
    renderException(e:Throwable):void;
   
    /**
     * 获取当前终端的尺寸
     * @return array
     */
    getTerminalDimensions(): array
}

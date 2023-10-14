package server.console.output.driver;
import server.console.Output;

declare class Buffer
{
    constructor(output:Output);
    fetch():any;
    write(messages:string, newline?:boolean, options?:number)
    renderException(e:Throwable);
}

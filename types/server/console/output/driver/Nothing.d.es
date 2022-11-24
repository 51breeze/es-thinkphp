package server.console.output.driver;

import server.console.Output;

declare class Nothing
{

    constructor(output:Output)
    write(messages:string, newline?:boolean, options?:number);
    renderException(e:Throwable)
}

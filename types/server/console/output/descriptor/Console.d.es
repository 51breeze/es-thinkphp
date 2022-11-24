package server.console.output.descriptor;

import server.console.Command;
import server.kernel.Console as BaseConsole;

declare class Console
{

    static const GLOBAL_NAMESPACE = '_global';

    /**
     * 构造方法
     * @param ThinkConsole $console
     * @param string|null  $namespace
     */
    constructor(console:BaseConsole,namespace?:string)
  
    /**
     * @return array
     */
    getNamespaces(): array

    /**
     * @return Command[]
     */
    getCommands(): array

    /**
     * @param string $name
     * @return Command
     * @throws \InvalidArgumentException
     */
    getCommand(name:string): Command
   
}

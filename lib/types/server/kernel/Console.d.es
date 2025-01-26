package server.kernel;

import server.console.Output;
import server.console.Input;
import server.console.Command;
import server.console.output.driver.Buffer;
import server.console.input.Definition;

/**
 * 控制台应用管理类
 */
declare class Console
{

    constructor(app:App)
  

    /**
     * 初始化
     */
    protected initialize():void

    /**
     * 构造request
     */
    protected makeRequest():void
    

    /**
     * 添加初始化器
     * @param Closure $callback
     */
    static starting(callback:(...args)=>void): void


    /**
     * 清空启动器
     */
    static flushStartCallbacks(): void

    /**
     * 设置执行用户
     * @param $user
     */
    setUser(user:string): void

    /**
     * 启动
     */
    protected start(): void


    /**
     * 加载指令
     * @access protected
     */
    protected loadCommands(): void

    /**
     * @access public
     * @param string $command
     * @param array $parameters
     * @param string $driver
     * @return Output|Buffer
     */
    call(command:string, parameters?:any[], driver?:string):Output|Buffer
   
    /**
     * 执行当前的指令
     * @access public
     * @return int
     * @throws \Exception
     * @api
     */
    run():number

    /**
     * 执行指令
     * @access public
     * @param Input $input
     * @param Output $output
     * @return int
     */
    doRun(input:Input, output:Output):number
   
    /**
     * 设置输入参数定义
     * @access public
     * @param InputDefinition $definition
     */
    setDefinition(definition:Definition): void
  
    /**
     * 获取输入参数定义
     * @access public
     * @return InputDefinition The InputDefinition instance
     */
    getDefinition(): Definition
  
    /**
     * Gets the help message.
     * @access public
     * @return string A help message.
     */
    getHelp(): string
  
    /**
     * 是否捕获异常
     * @access public
     * @param bool $boolean
     * @api
     */
    setCatchExceptions(flag:boolean): void
   

    /**
     * 是否自动退出
     * @access public
     * @param bool $boolean
     * @api
     */
    setAutoExit(flag:boolean): void
   

    /**
     * 获取完整的版本号
     * @access public
     * @return string
     */
    getLongVersion(): string
   

    /**
     * 添加指令集
     * @access public
     * @param array $commands
     */
    addCommands(commands:string[]): void
   

    /**
     * 添加一个指令
     * @access public
     * @param string|Command $command 指令对象或者指令类名
     * @param string $name 指令名 留空则自动获取
     * @return Command|void
     */
    addCommand(command:string | Command, name?:string):Command|null
   

    /**
     * 获取指令
     * @access public
     * @param string $name 指令名称
     * @return Command
     * @throws InvalidArgumentException
     */
    getCommand(command:string): Command
   

    /**
     * 某个指令是否存在
     * @access public
     * @param string $name 指令名称
     * @return bool
     */
    hasCommand(name:string): boolean;
   

    /**
     * 获取所有的命名空间
     * @access public
     * @return array
     */
    getNamespaces(): array
    

    /**
     * 查找注册命名空间中的名称或缩写。
     * @access public
     * @param string $namespace
     * @return string
     * @throws InvalidArgumentException
     */
    findNamespace(namespace:string): string
    
    /**
     * 查找指令
     * @access public
     * @param string $name 名称或者别名
     * @return Command
     * @throws InvalidArgumentException
     */
    find(name:string): Command
  

    /**
     * 获取所有的指令
     * @access public
     * @param string $namespace 命名空间
     * @return Command[]
     * @api
     */
    all(namespace?:string): array
   

    /**
     * 配置基于用户的参数和选项的输入和输出实例。
     * @access protected
     * @param Input $input 输入实例
     * @param Output $output 输出实例
     */
    protected configureIO(input:Input, output:Output): void
   
    /**
     * 执行指令
     * @access protected
     * @param Command $command 指令实例
     * @param Input $input 输入实例
     * @param Output $output 输出实例
     * @return int
     * @throws \Exception
     */
    protected doRunCommand(command:Command, input:Input, output:Output):number
   
    /**
     * 获取指令的基础名称
     * @access protected
     * @param Input $input
     * @return string
     */
    protected getCommandName(input:Input): string
   
    /**
     * 获取默认输入定义
     * @access protected
     * @return InputDefinition
     */
    protected getDefaultInputDefinition(): Definition
   
    /**
     * 返回命名空间部分
     * @access public
     * @param string $name 指令
     * @param int $limit 部分的命名空间的最大数量
     * @return string
     */
    extractNamespace(name:string, limit?:int): string
}

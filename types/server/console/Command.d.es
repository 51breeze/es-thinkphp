package server.console;

import server.kernel.App;
import server.console.input.Definition;

@Abstract();
declare class Command
{
    /**
     * 忽略验证错误
     */
    ignoreValidationErrors(): void

    /**
     * 设置控制台
     * @param Console $console
     */
    setConsole(console?:Console): void

    /**
     * 获取控制台
     * @return Console
     * @api
     */
    getConsole(): Console

    /**
     * 设置app
     * @param App $app
     */
    setApp(app:App)


    /**
     * 获取app
     * @return App
     */
    getApp():App


    /**
     * 是否有效
     * @return bool
     */
    isEnabled(): boolean;


    /**
     * 执行
     * @param Input  $input
     * @param Output $output
     * @return int
     * @throws Exception
     * @see setCode()
     * @see execute()
     */
    run(input:Input, output:Output): int
    
    /**
     * 合并参数定义
     * @param bool $mergeArgs
     */
    mergeConsoleDefinition(mergeArgs?:boolean)
   
    /**
     * 设置参数定义
     * @param array|Definition $definition
     * @return Command
     * @api
     */
    setDefinition(definition:Definition|Definition[]):this;
   
    /**
     * 获取参数定义
     * @return Definition
     * @api
     */
    getDefinition(): Definition
   
    /**
     * 获取当前指令的参数定义
     * @return Definition
     */
    getNativeDefinition(): Definition
    
    /**
     * 添加参数
     * @param string $name        名称
     * @param int    $mode        类型
     * @param string $description 描述
     * @param mixed  $default     默认值
     * @return Command
     */
    addArgument(name:string, mode?:int, description?:string, default?:ScalarValueType):this;

    /**
     * 添加选项
     * @param string $name        选项名称
     * @param string $shortcut    别名
     * @param int    $mode        类型
     * @param string $description 描述
     * @param mixed  $default     默认值
     * @return Command
     */
    addOption(name:string, shortcut?:string, mode?:int, description?:string, default?:ScalarValueType):this;
   

    /**
     * 设置指令名称
     * @param string $name
     * @return Command
     * @throws InvalidArgumentException
     */
    setName(name:string):this;
   

    /**
     * 设置进程名称
     *
     * PHP 5.5+ or the proctitle PECL library is required
     *
     * @param string $title The process title
     *
     * @return $this
     */
    setProcessTitle(title:string):this;
   

    /**
     * 获取指令名称
     * @return string
     */
    getName(): string
   
    /**
     * 设置描述
     * @param string $description
     * @return Command
     */
    setDescription(description:string):this;

    /**
     *  获取描述
     * @return string
     */
    getDescription(): string
   
    /**
     * 设置帮助信息
     * @param string $help
     * @return Command
     */
    setHelp(help:string):this;

    /**
     * 获取帮助信息
     * @return string
     */
    getHelp(): string
   
    /**
     * 描述信息
     * @return string
     */
    getProcessedHelp(): string
   
    /**
     * 设置别名
     * @param string[] $aliases
     * @return Command
     * @throws InvalidArgumentException
     */
    setAliases(aliases:string[]):this;
   
    /**
     * 获取别名
     * @return array
     */
    getAliases(): string[];
   
    /**
     * 获取简介
     * @param bool $short 是否简单的
     * @return string
     */
    getSynopsis(short?:boolean): string

    /**
     * 添加用法介绍
     * @param string $usage
     * @return $this
     */
    addUsage(usage:string):this;
   

    /**
     * 获取用法介绍
     * @return array
     */
    getUsages(): array
}

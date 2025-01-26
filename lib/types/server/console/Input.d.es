package server.console;
import server.console.input.Definition;

declare class Input
{
    constructor(argv?)

    /**
     * 绑定实例
     * @param Definition $definition A InputDefinition instance
     */
    bind(definition:Definition): void

    /**
     * 获取第一个参数
     * @return string|null
     */
    getFirstArgument():string|null

    /**
     * 检查原始参数是否包含某个值
     * @param string|array $values 需要检查的值
     * @return bool
     */
    hasParameterOption(values):boolean
   
    /**
     * 获取原始选项的值
     * @param string|array $values  需要检查的值
     * @param mixed        $default 默认值
     * @return mixed The option value
     */
    getParameterOption(values:string|string[], default = false):string|string[]

    /**
     * 验证输入
     * @throws \RuntimeException
     */
    validate()
  
    /**
     * 检查输入是否是交互的
     * @return bool
     */
    isInteractive():boolean

    /**
     * 设置输入的交互
     * @param bool
     */
    setInteractive(interactive:boolean): void
   
    /**
     * 获取所有的参数
     * @return Argument[]
     */
    getArguments(): string[];

    /**
     * 根据名称获取参数
     * @param string $name 参数名
     * @return mixed
     * @throws \InvalidArgumentException
     */
    getArgument(name:string):any;
   
    /**
     * 设置参数的值
     * @param string $name  参数名
     * @param string $value 值
     * @throws \InvalidArgumentException
     */
    setArgument(name:string, value:string):void;
  
    /**
     * 检查是否存在某个参数
     * @param string|int $name 参数名或位置
     * @return bool
     */
    hasArgument(name:string|number):boolean
   
    /**
     * 获取所有的选项
     * @return Option[]
     */
    getOptions(): string[];
    
    /**
     * 获取选项值
     * @param string $name 选项名称
     * @return mixed
     * @throws \InvalidArgumentException
     */
    getOption(name:string):any

    /**
     * 设置选项值
     * @param string      $name  选项名
     * @param string|bool $value 值
     * @throws \InvalidArgumentException
     */
    setOption(name:string, value:string|boolean): void
   
    /**
     * 是否有某个选项
     * @param string $name 选项名
     * @return bool
     */
    hasOption(name:string):boolean
   
    /**
     * 转义指令
     * @param string $token
     * @return string
     */
    escapeToken(token:string): string
}

package server.console.input;

declare class Definition
{
    /**
     * 构造方法
     * @param array $definition
     * @api
     */
    constructor(definition?:array)

    /**
     * 设置指令的定义
     * @param array $definition 定义的数组
     */
    setDefinition(definition:array): void
   

    /**
     * 设置参数
     * @param Argument[] $arguments 参数数组
     */
    setArguments(argument?:string[]): void
   

    /**
     * 添加参数
     * @param Argument[] $arguments 参数数组
     * @api
     */
    addArguments(argument:Argument[]): void
   
    /**
     * 添加一个参数
     * @param Argument $argument 参数
     * @throws \LogicException
     */
    addArgument(argument:Argument): void
   
    /**
     * 根据名称或者位置获取参数
     * @param string|int $name 参数名或者位置
     * @return Argument 参数
     * @throws \InvalidArgumentException
     */
    getArgument(name:string|number): Argument
   

    /**
     * 根据名称或位置检查是否具有某个参数
     * @param string|int $name 参数名或者位置
     * @return bool
     * @api
     */
    hasArgument(name:string|number):boolean
   
    /**
     * 获取所有的参数
     * @return Argument[] 参数数组
     */
    getArguments(): Argument[]
  
    /**
     * 获取参数数量
     * @return int
     */
    getArgumentCount(): int
  
    /**
     * 获取必填的参数的数量
     * @return int
     */
    getArgumentRequiredCount(): int
   
    /**
     * 获取参数默认值
     * @return array
     */
    getArgumentDefaults(): Scalar[];
   
    /**
     * 设置选项
     * @param Option[] $options 选项数组
     */
    setOptions(options:Option[]): void
    
    /**
     * 添加选项
     * @param Option[] $options 选项数组
     * @api
     */
    addOptions(options:Option[]): void
    
    /**
     * 添加一个选项
     * @param Option $option 选项
     * @throws \LogicException
     * @api
     */
    addOption(option:Option): void

    /**
     * 根据名称获取选项
     * @param string $name 选项名
     * @return Option
     * @throws \InvalidArgumentException
     * @api
     */
    getOption(name:string): Option

    /**
     * 根据名称检查是否有这个选项
     * @param string $name 选项名
     * @return bool
     * @api
     */
    hasOption(name:string):boolean

    /**
     * 获取所有选项
     * @return Option[]
     * @api
     */
    getOptions(): Option[]

    /**
     * 根据名称检查某个选项是否有短名称
     * @param string $name 短名称
     * @return bool
     */
    hasShortcut(name:string):boolean

    /**
     * 根据短名称获取选项
     * @param string $shortcut 短名称
     * @return Option
     */
    getOptionForShortcut(shortcut:string): Option

    /**
     * 获取所有选项的默认值
     * @return array
     */
    getOptionDefaults(): Scalar[];

    /**
     * 获取该指令的介绍
     * @param bool $short 是否简洁介绍
     * @return string
     */
    getSynopsis(short?:boolean): string
    
}

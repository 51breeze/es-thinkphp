package server.console.input;

/**
 * 命令行选项
 * @package think\console\input
 */
declare class Option
{
    // 无需传值
    static const VALUE_NONE = 1;
    // 必须传值
    static const VALUE_REQUIRED = 2;
    // 可选传值
    static const VALUE_OPTIONAL = 4;
    // 传数组值
    static const VALUE_IS_ARRAY = 8;

    /**
     * 构造方法
     * @param string       $name        选项名
     * @param string|array $shortcut    短名称,多个用|隔开或者使用数组
     * @param int          $mode        选项类型(可选类型为 self::VALUE_*)
     * @param string       $description 描述
     * @param mixed        $default     默认值 (类型为 self::VALUE_REQUIRED 或者 self::VALUE_NONE 的时候必须为null)
     * @throws \InvalidArgumentException
     */
    constructor(name:string, shortcut?:string|string[], mode?:1|2|4|8, description?:string, default?:1|2)
   
    /**
     * 获取短名称
     * @return string
     */
    getShortcut(): string

    /**
     * 获取选项名
     * @return string
     */
    getName(): string
    /**
     * 是否可以设置值
     * @return bool 类型不是 self::VALUE_NONE 的时候返回true,其他均返回false
     */
    acceptValue():boolean

    /**
     * 是否必须
     * @return bool 类型是 self::VALUE_REQUIRED 的时候返回true,其他均返回false
     */
    isValueRequired():boolean

    /**
     * 是否可选
     * @return bool 类型是 self::VALUE_OPTIONAL 的时候返回true,其他均返回false
     */
    isValueOptional():boolean

    /**
     * 选项值是否接受数组
     * @return bool 类型是 self::VALUE_IS_ARRAY 的时候返回true,其他均返回false
     */
    isArray():boolean

    /**
     * 设置默认值
     * @param mixed $default 默认值
     * @throws \LogicException
     */
    setDefault(default?)

    /**
     * 获取默认值
     * @return mixed
     */
    getDefault():any;

    /**
     * 获取描述文字
     * @return string
     */
    getDescription(): string

    /**
     * 检查所给选项是否是当前这个
     * @param Option $option
     * @return bool
     */
    equals(option:Option):boolean
}

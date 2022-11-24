package server.console.input;

declare class Argument
{
    // 必传参数
    static const REQUIRED = 1;

    // 可选参数
    static const OPTIONAL = 2;

    // 数组参数
    static const IS_ARRAY = 4;

    /**
     * 构造方法
     * @param string $name        参数名
     * @param int    $mode        参数类型: self::REQUIRED 或者 self::OPTIONAL
     * @param string $description 描述
     * @param mixed  $default     默认值 (仅 self::OPTIONAL 类型有效)
     * @throws \InvalidArgumentException
     */
    constructor(name:string, mode?:1|2, description?:string, default?:1|2|4)
   
    /**
     * 获取参数名
     * @return string
     */
    getName(): string

    /**
     * 是否必须
     * @return bool
     */
    isRequired(): boolean

    /**
     * 该参数是否接受数组
     * @return bool
     */
    isArray(): boolean

    /**
     * 设置默认值
     * @param mixed $default 默认值
     * @throws \LogicException
     */
    setDefault($default = null): void

    /**
     * 获取默认值
     * @return mixed
     */
    getDefault()
    /**
     * 获取描述
     * @return string
     */
    getDescription(): string
}

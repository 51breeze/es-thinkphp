package server.console;

/**
 * Class Output
 * @package think\console
 *
 * @see     \think\console\output\driver\Console::setDecorated
 * @method void setDecorated($decorated)
 *
 * @see     \think\console\output\driver\Buffer::fetch
 * @method string fetch()
 *
 * @method void info($message)
 * @method void error($message)
 * @method void comment($message)
 * @method void warning($message)
 * @method void highlight($message)
 * @method void question($message)
 */
declare class Output
{
    // 不显示信息(静默)
    static const VERBOSITY_QUIET = 0;
    // 正常信息
    static const VERBOSITY_NORMAL= 1;
    // 详细信息
    static const VERBOSITY_VERBOSE= 2;
    // 非常详细的信息
    static const VERBOSITY_VERY_VERBOSE = 3;
    // 调试信息
    static const VERBOSITY_DEBUG = 4;

    static const OUTPUT_NORMAL = 0;
    static const OUTPUT_RAW    = 1;
    static const OUTPUT_PLAIN  = 2;

    constructor(driver?:string)

    ask(input:Input, question, default = null, validator = null)

    askHidden(input:Input, question, validator = null)

    confirm(input:Input, question, default = true)
   
    /**
     * {@inheritdoc}
     */
    choice(input:Input, question, choices?:array, default?)

    /**
     * 输出空行
     * @param int $count
     */
    newLine(count?:number): void

    /**
     * 输出信息并换行
     * @param string $messages
     * @param int    $type
     */
    writeln(messages:string, type?:number): void
  
    /**
     * 输出信息
     * @param string $messages
     * @param bool   $newline
     * @param int    $type
     */
    write(messages:string, newline?:boolean, type?:number): void

    renderException(e:Throwable): void
   
    /**
     * 设置输出信息级别
     * @param int $level 输出信息级别
     */
    setVerbosity(level:number)
   
    /**
     * 获取输出信息级别
     * @return int
     */
    getVerbosity(): int
  
    isQuiet():boolean

    isVerbose():boolean
   
    isVeryVerbose():boolean
   
    isDebug():boolean
   
    describe(object, options?:ArrayMappingType<any>): void
}

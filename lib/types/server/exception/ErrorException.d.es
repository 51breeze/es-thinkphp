package server.exception;

/**
 * ThinkPHP错误异常
 * 主要用于封装 set_error_handler 和 register_shutdown_function 得到的错误
 * 除开从 think\Exception 继承的功能
 * 其他和PHP系统\ErrorException功能基本一样
 */
declare class ErrorException extends server.kernel.Exception
{
    /**
     * 用于保存错误级别
     * @var integer
     */
    protected severity;

    /**
     * 错误异常构造函数
     * @access public
     * @param  integer $severity 错误级别
     * @param  string  $message  错误详细信息
     * @param  string  $file     出错文件路径
     * @param  integer $line     出错行号
     */
    constructor(severity:int, message:string, file:string, line:int)


    /**
     * 获取错误级别
     * @access public
     * @return integer 错误级别
     */
    final getSeverity():int
}

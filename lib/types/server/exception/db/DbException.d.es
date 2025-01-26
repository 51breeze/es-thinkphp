package server.exception.db;

/**
 * Database相关异常处理类
 */
declare class DbException extends server.kernel.Exception
{
    /**
     * DbException constructor.
     * @access public
     * @param  string    $message
     * @param  array     $config
     * @param  string    $sql
     * @param  int       $code
     */
    constructor(message:string, config:Record = {}, sql:string = '', code:int = 10500)
}

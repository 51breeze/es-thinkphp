package server.exception.db;

/**
 * PDO参数绑定异常
 */
declare class BindParamException extends DbException
{

    /**
     * BindParamException constructor.
     * @access public
     * @param  string $message
     * @param  array  $config
     * @param  string $sql
     * @param  array    $bind
     * @param  int    $code
     */
    constructor(message:string, config:Record, sql:string, bind:Record, code:int = 10502)
}

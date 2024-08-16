package server.exception.db;

/**
 * PDO异常处理类
 * 重新封装了系统的\PDOException类
 */
declare class PDOException extends DbException
{
    /**
     * PDOException constructor.
     * @access public
     * @param  \PDOException $exception
     * @param  array         $config
     * @param  string        $sql
     * @param  int           $code
     */
    constructor(exception:global.PDOException, config:Record = {}, sql:string = '', code:int = 10501)
}

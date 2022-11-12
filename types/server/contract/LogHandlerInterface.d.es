package server.contract;

/**
 * 日志驱动接口
 */
declare interface LogHandlerInterface
{
    /**
     * 日志写入接口
     * @access public
     * @param  array $log 日志信息
     * @return bool
     */
    save(log:array): boolean;

}

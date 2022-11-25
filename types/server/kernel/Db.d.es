package server.kernel;

import server.database.DbManager;
import server.contract.DbConfigInterface;
import server.kernel.Log;
import server.kernel.Cache;

/**
 * 数据库管理类
 * @package think
 * @property Config $config
 */
declare class Db extends DbManager
{
    /**
     * @param Event  $event
     * @param Config $config
     * @param Log    $log
     * @param Cache  $cache
     * @return Db
     * @codeCoverageIgnore
     */
    static __make(event:Event, config:DbConfigInterface, log:Log, cache:Cache);
   
    /**
     * 注入模型对象
     * @access public
     * @return void
     */
    protected modelMaker()

    /**
     * 设置Event对象
     * @param Event $event
     */
    setEvent(event:Event): void
    
}

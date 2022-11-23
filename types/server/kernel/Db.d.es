package server.kernel;

import server.database.DbManager;
import server.database.Config;

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
    static __make(event:Event, config:Config, log:Log, cache:Cache);
   
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

package server.exception.db;

declare class DataNotFoundException extends DbException
{
    protected table:string;

    /**
     * DbException constructor.
     * @access public
     * @param  string $message
     * @param  string $table
     * @param  array $config
     */
    constructor(message:string, table:string = '', config:Record={})

    /**
     * 获取数据表名
     * @access public
     * @return string
     */
    getTable():string

}

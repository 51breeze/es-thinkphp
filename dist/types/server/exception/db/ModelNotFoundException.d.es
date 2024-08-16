package server.exception.db;

declare class ModelNotFoundException extends DbException
{
    protected model:string;

    /**
     * 构造方法
     * @access public
     * @param  string $message
     * @param  string $model
     * @param  array  $config
     */
    constructor(message:string, model:string = '', config:Record = {})


    /**
     * 获取模型类名
     * @access public
     * @return string
     */
    getModel():string

}

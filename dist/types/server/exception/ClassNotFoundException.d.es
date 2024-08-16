package server.exception;

declare class ClassNotFoundException extends RuntimeException
{
    protected class:string;

    constructor(message:string, classObject:class<any>, previous:Throwable = null);
   
    /**
     * 获取类名
     * @access public
     * @return string
     */
    getClass():string
   
}

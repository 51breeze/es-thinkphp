package server.exception;

declare class FuncNotFoundException extends RuntimeException
{
    protected func:string;

    constructor(message:string,  func?:string, previous?:Throwable)
  
    /**
     * 获取方法名
     * @access public
     * @return string
     */
    getFunc():string
    
}

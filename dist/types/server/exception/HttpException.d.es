package server.exception;

/**
 * HTTP异常
 */
declare class HttpException extends RuntimeException
{
    constructor(statusCode:int, message:string='', previous:Exception = null, headers:Record = {}, code = 0)
    getStatusCode():int
    getHeaders():Record
}

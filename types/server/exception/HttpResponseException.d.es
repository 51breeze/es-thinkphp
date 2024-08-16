package server.exception;

/**
 * HTTP响应异常
 */
declare class HttpResponseException extends RuntimeException
{
    /**
     * @var Response
     */
    protected response:server.kernel.Response;

    constructor(response: server.kernel.Response)

    getResponse():server.kernel.Response
}

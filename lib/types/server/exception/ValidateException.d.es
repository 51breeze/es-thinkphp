package server.exception;

/**
 * 数据验证异常
 */
declare class ValidateException extends RuntimeException
{
    protected error:string|string[]

    constructor(error:string|string[])

    /**
     * 获取验证错误信息
     * @access public
     * @return array|string
     */
    getError():string|string[]
}

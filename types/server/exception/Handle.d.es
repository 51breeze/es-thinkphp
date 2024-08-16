package server.exception;

/**
 * 系统异常处理类
 */
declare class Handle
{
    /** @var App */
    protected app:server.kernel.App;

    protected ignoreReport:class<any>[];

    protected isJson:boolean = false;

    constructor(app:server.kernel.App)


    /**
     * Report or log an exception.
     *
     * @access public
     * @param Throwable $exception
     * @return void
     */
    report(exception:Throwable): void
   

    protected isIgnoreReport(exception:Throwable): boolean

    /**
     * Render an exception into an HTTP response.
     *
     * @access public
     * @param Request   $request
     * @param Throwable $e
     * @return Response
     */
    render(request, e:Throwable): server.kernel.Response
    /**
     * @access public
     * @param Output    $output
     * @param Throwable $e
     */
    renderForConsole(output:server.console.Output, e:Throwable): void
   

    /**
     * @access protected
     * @param HttpException $e
     * @return Response
     */
    protected renderHttpException(e:HttpException): server.kernel.Response
   
    /**
     * 收集异常数据
     * @param Throwable $exception
     * @return array
     */
    protected convertExceptionToArray(exception:Throwable): Record

    /**
     * @access protected
     * @param Throwable $exception
     * @return Response
     */
    protected convertExceptionToResponse(exception:Throwable): server.kernel.Response
 

    protected renderExceptionContent(exception:Throwable): string
    
    /**
     * 获取错误编码
     * ErrorException则使用错误级别作为错误编码
     * @access protected
     * @param Throwable $exception
     * @return integer                错误编码
     */
    protected getCode(exception:Throwable):int
   
    /**
     * 获取错误信息
     * ErrorException则使用错误级别作为错误编码
     * @access protected
     * @param Throwable $exception
     * @return string                错误信息
     */
    protected getMessage(exception:Throwable): string
    
    /**
     * 获取出错文件内容
     * 获取错误的前9行和后9行
     * @access protected
     * @param Throwable $exception
     * @return array                 错误文件内容
     */
    protected getSourceCode(exception:Throwable): Record

    /**
     * 获取异常扩展信息
     * 用于非调试模式html返回类型显示
     * @access protected
     * @param Throwable $exception
     * @return array                 异常类定义的扩展数据
     */
    protected getExtendData(exception:Throwable): Record
  

    /**
     * 获取常量列表
     * @access protected
     * @return array 常量列表
     */
    protected getConst(): string[]
}

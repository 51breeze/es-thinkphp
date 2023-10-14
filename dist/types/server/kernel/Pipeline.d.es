package server.kernel;

declare class Pipeline
{
   
    /**
     * 初始数据
     * @param $passable
     * @return $this
     */
    send($passable):this;
  

    /**
     * 调用栈
     * @param $pipes
     * @return $this
     */
    through($pipes)
   

    /**
     * 执行
     * @param Closure $destination
     * @return mixed
     */
    then(destination:(...args)=>any):any;
   

    /**
     * 设置异常处理器
     * @param callable $handler
     * @return $this
     */
    whenException(handler:(...args)=>any):this;
   
}

package server.kernel;

import server.kernel.Response;

/**
 * 中间件管理类
 * @package think
 */
declare class Middleware
{

   constructor(app:App);

    /**
     * 导入中间件
     * @access public
     * @param array  $middlewares
     * @param string $type 中间件类型
     * @return void
     */
    import(middlewares = [], type = 'global'): void
   

    /**
     * 注册中间件
     * @access public
     * @param mixed  $middleware
     * @param string $type 中间件类型
     * @return void
     */
    add(middleware, type = 'global'): void
   

    /**
     * 注册路由中间件
     * @access public
     * @param mixed $middleware
     * @return void
     */
    route(middleware): void
   

    /**
     * 注册控制器中间件
     * @access public
     * @param mixed $middleware
     * @return void
     */
    controller(middleware): void
    
    /**
     * 注册中间件到开始位置
     * @access public
     * @param mixed  $middleware
     * @param string $type 中间件类型
     */
    unshift(middleware, type = 'global')
  

    /**
     * 获取注册的中间件
     * @access public
     * @param string $type 中间件类型
     * @return array
     */
    all(type = 'global'): array
  
    /**
     * 调度管道
     * @access public
     * @param string $type 中间件类型
     * @return Pipeline
     */
    pipeline(type = 'global')
   

    /**
     * 结束调度
     * @param Response $response
     */
    end(response:Response)
   

    /**
     * 异常处理
     * @param Request   $passable
     * @param Throwable $e
     * @return Response
     */
    handleException(passable, e:Throwable)
}

package server.kernel;

import server.kernel.Response;
import server.kernel.Request;

/**
 * Web应用管理类
 * @package think
 */
declare class Http
{

    constructor(app:App)
   

    /**
     * 设置应用名称
     * @access public
     * @param string $name 应用名称
     * @return $this
     */
    name(name:string):this;
   

    /**
     * 获取应用名称
     * @access public
     * @return string
     */
    getName(): string
    

    /**
     * 设置应用目录
     * @access public
     * @param string $path 应用目录
     * @return $this
     */
    path(path:string):this;
    

    /**
     * 获取应用路径
     * @access public
     * @return string
     */
    getPath(): string
   

    /**
     * 获取路由目录
     * @access public
     * @return string
     */
    getRoutePath(): string

    /**
     * 设置路由目录
     * @access public
     * @param string $path 路由定义目录
     */
    setRoutePath(path:string): void
   

    /**
     * 设置应用绑定
     * @access public
     * @param bool $bind 是否绑定
     * @return $this
     */
    setBind(bind?:boolean):this;
   

    /**
     * 是否绑定应用
     * @access public
     * @return bool
     */
    isBind(): boolean;
  

    /**
     * 执行应用程序
     * @access public
     * @param Request|null $request
     * @return Response
     */
    run(request?:Request): Response
   
    /**
     * HttpEnd
     * @param Response $response
     * @return void
     */
    end(response:Response): void

}

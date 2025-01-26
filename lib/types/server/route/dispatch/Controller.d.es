package server.route.dispatch;
import server.route.Dispatch;

/**
 * Controller Dispatcher
 */
declare class Controller extends Dispatch
{
    /**
     * 实例化访问控制器
     * @access public
     * @param string $name 资源地址
     * @return object
     * @throws ClassNotFoundException
     */
    controller(name:string):object;
}

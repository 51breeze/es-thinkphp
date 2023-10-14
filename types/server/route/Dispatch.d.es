package server.route;

import server.kernel.Request
import server.kernel.Response;
import server.kernel.App;

/**
 * 路由调度基础类
 */
@abstract()
declare class Dispatch
{
    constructor(request:Request, rule:Rule, dispatch?:string, param?:ArrayMappingType<ScalarValueType>)
    init(app:App):void

    /**
     * 执行路由调度
     * @access public
     * @return mixed
     */
    run():Response
    getDispatch(): Response
    getParam():ArrayMappingType<ScalarValueType>
    exec():any;
}

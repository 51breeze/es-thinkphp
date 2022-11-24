package server.route;

import server.http.Request
import server.http.Response;
import server.kernel.App;

/**
 * 路由调度基础类
 */
@abstract()
declare class Dispatch
{
    constructor(request:Request, rule:Rule, dispatch, param?:ArrayMappingType<ScalarValueType>)
    init(app:App)

    /**
     * 执行路由调度
     * @access public
     * @return mixed
     */
    run():Response
    getDispatch()
    getParam(): array
    exec();
}

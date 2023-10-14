package server.route.dispatch;

import server.kernel.Request
import server.route.Rule;

/**
 * Url Dispatcher
 */
declare class Url extends Controller
{
    constructor(request:Request, rule:Rule, dispatch?:string);
}

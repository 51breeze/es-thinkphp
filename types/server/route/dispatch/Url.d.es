package server.route.dispatch;

import server.http.Request
import server.route.Rule;

/**
 * Url Dispatcher
 */
declare class Url extends Controller
{
    constructor(request:Request, rule:Rule, dispatch?:string);
}

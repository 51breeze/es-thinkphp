package server.response;
import server.kernel.Response;
declare class Jsonp<T> extends Response<T>{
    constructor(cookie:server.kernel.Cookie, request:server.kernel.Request, data?:string, code?:number)
}
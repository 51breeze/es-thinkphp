package server.response;
import server.kernel.Response;
declare class Json extends Response{
    constructor(cookie:server.kernel.Cookie, data?:string, code?:number)
}
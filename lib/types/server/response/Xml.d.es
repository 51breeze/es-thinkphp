package server.response;
import server.kernel.Response;
declare class Xml<T=string> extends Response<T>{
    constructor(cookie:server.kernel.Cookie, data?:string, code?:number)
}
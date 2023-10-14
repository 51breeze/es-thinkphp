package server.contract;

declare interface CookieConfigInterface{
      // cookie 保存时间
      expire?:number,
      // cookie 保存路径
      path?:string,
      // cookie 有效域名
      domain?:string,
      //  cookie 启用安全传输
      secure?:boolean,
      // httponly设置
      httponly?:boolean,
      // samesite 设置，支持 'strict' 'lax'
      samesite?:string,
}
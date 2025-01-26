package server.contract;

declare interface LangConfigInterface{
      // cookie 保存时间
      default_lang?:string,
      // cookie 保存路径
      allow_lang_list?:string[],
      // cookie 有效域名
      use_cookie?:boolean,
      //  cookie 启用安全传输
      extend_list?:string[],
      // httponly设置
      cookie_var?:string,
      // samesite 设置，支持 'strict' 'lax'
      header_var?:string,
      detect_var?:string,
      accept_language?:{[key:string]:string},
      allow_group?:boolean,
}
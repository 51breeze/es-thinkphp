package server.response;
import server.kernel.Response;

/**
* Redirect Response
*/
declare class Redirect<T=string> extends Response<T>{

    constructor(cookie:server.kernel.Cookie, request:server.kernel.Request, session:server.kernel.Session, data?:string, code?:number)

    /**
    * 重定向传值（通过Session）
    * @access protected
    * @param  string|array  $name 变量名或者数组
    * @param  mixed         $value 值
    * @return $this
    */
    with(name:string | array, value?):this;


    /**
    * 记住当前url后跳转
    * @access public
    * @return $this
    */
    remember(complete:boolean):this;


    /**
    * 跳转到上次记住的url
    * @access public
    * @return $this
    */
    restore():this;

}

package server.response;
import server.kernel.Response;

/**
* View Response
*/
declare class View<T=string> extends Response<T>{

     constructor(cookie:server.kernel.Cookie, baseView:server.kernel.View, data?:string, code?:number)

      /**
      * 获取视图变量
      * @access public
      * @param  string $name 模板变量
      * @return mixed
      */
      getVars(name?:string):any;


      /**
      * 模板变量赋值
      * @access public
      * @param  string|array $name  模板变量
      * @param  mixed        $value 变量值
      * @return $this
      */
      assign(name:string, value?):this;


      /**
      * 视图内容过滤
      * @access public
      * @param callable $filter
      * @return $this
      */
      filter(filter:(...args)=>boolean):this;


      /**
      * 检查模板是否存在
      * @access public
      * @param  string  $name 模板名
      * @return bool
      */
      exists(name:string): boolean
}
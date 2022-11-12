package server.database.concern;


/**
* 参数绑定支持
*/
declare interface ParamsBind{

      /**
      * 批量参数绑定
      * @access public
      * @param array $value 绑定变量值
      * @return $this
      */
      bind(value:array):this

      /**
      * 单个参数绑定
      * @access public
      * @param mixed   $value 绑定变量值
      * @param integer $type  绑定类型
      * @param string  $name  绑定标识
      * @return string
      */
      bindValue(value, type?:int, name?:string):string

      /**
      * 检测参数是否已经绑定
      * @access public
      * @param string $key 参数名
      * @return bool
      */
      isBind(key:string):boolean

      /**
      * 参数绑定
      * @access public
      * @param string $sql  绑定的sql表达式
      * @param array  $bind 参数绑定
      * @return void
      */
      bindParams(sql:string, bind:array): void

      /**
      * 获取绑定的参数 并清空
      * @access public
      * @param bool $clear 是否清空绑定数据
      * @return array
      */
      getBind(clear?:boolean): array
}
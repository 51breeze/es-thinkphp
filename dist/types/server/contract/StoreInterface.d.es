package server.contract;

declare interface StoreInterface{

      /**
      * 设置数据
      * @access public
      * @param array $data
      * @return void
      */
      setData(data:array): void


      /**
      * session初始化
      * @access public
      * @return void
      */
      init():void

      /**
      * 设置SessionName
      * @access public
      * @param string $name session_name
      * @return void
      */
      setName(name:string):void

      /**
      * 获取sessionName
      * @access public
      * @return string
      */
      getName():string


      /**
      * session_id设置
      * @access public
      * @param string $id session_id
      * @return void
      */
      setId(id:string): void


      /**
      * 获取session_id
      * @access public
      * @return string
      */
      getId(): string

      /**
      * 获取所有数据
      * @return array
      */
      all(): array

      /**
      * session设置
      * @access public
      * @param string $name  session名称
      * @param mixed  $value session值
      * @return void
      */
      set(name:string, value:any): void

      /**
      * session获取
      * @access public
      * @param string $name    session名称
      * @param mixed  $default 默认值
      * @return mixed
      */
      get<T>(name:string, default?:T):T

      /**
      * session获取并删除
      * @access public
      * @param string $name session名称
      * @return mixed
      */
      pull(name:string)

      /**
      * 添加数据到一个session数组
      * @access public
      * @param string $key
      * @param mixed  $value
      * @return void
      */
      push(key:string, value:any): void


      /**
      * 判断session数据
      * @access public
      * @param string $name session名称
      * @return bool
      */
      has(name:string): boolean

      /**
      * 删除session数据
      * @access public
      * @param string $name session名称
      * @return void
      */
      delete(name:string): void

      /**
      * 清空session数据
      * @access public
      * @return void
      */
      clear(): void

      /**
      * 销毁session
      */
      destroy(): void

      /**
      * 重新生成session id
      * @param bool $destroy
      */
      regenerate(destroy:boolean = false): void

      /**
      * 保存session数据
      * @access public
      * @return void
      */
      save(): void

      /**
      * session设置 下一次请求有效
      * @access public
      * @param string $name  session名称
      * @param mixed  $value session值
      * @return void
      */
      flash(name:string, value:any): void

      /**
      * 将本次闪存数据推迟到下次请求
      *
      * @return void
      */
      reflash(): void

      /**
      * 清空当前请求的session数据
      * @access public
      * @return void
      */
      clearFlashData(): void
}
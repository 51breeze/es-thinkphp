package server.database.concern;

/**
* 查询数据处理
*/
declare interface ResultOperation{

      /**
      * 设置数据处理（支持模型）
      * @access public
      * @param callable $filter 数据处理Callable
      * @param string   $index  索引（唯一）
      * @return $this
      */
      filter(filter:(result:any[], option?)=>boolean, index?:string):this;

      /**
      * 是否允许返回空数据（或空模型）
      * @access public
      * @param bool $allowEmpty 是否允许为空
      * @return $this
      */
      allowEmpty(allowEmpty?:boolean):this;

      /**
      * 设置查询数据不存在是否抛出异常
      * @access public
      * @param bool $fail 数据不存在是否抛出异常
      * @return $this
      */
      failException(fail?:boolean):this;


      /**
      * 查找单条记录 不存在返回空数据（或者空模型）
      * @access public
      * @param mixed $data 数据
      * @return array|Model|static|mixed
      */
      findOrEmpty(data?:any):any;

      /**
      * 查找多条记录 如果不存在则抛出异常
      * @access public
      * @param array|string|Query|Closure $data 数据
      * @return array|Collection|static[]
      * @throws ModelNotFoundException
      * @throws DataNotFoundException
      */
      selectOrFail<T,B>(data?:T):B

      /**
      * 查找单条记录 如果不存在则抛出异常
      * @access public
      * @param array|string|Query|Closure $data 数据
      * @return array|Model|static|mixed
      * @throws ModelNotFoundException
      * @throws DataNotFoundException
      */
      findOrFail<T,B>(data?:T):B;
}

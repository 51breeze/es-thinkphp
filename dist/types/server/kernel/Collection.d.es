package server.kernel;

declare class Collection<T=any>{

      constructor(items?:T[])

      isEmpty(): boolean

      toArray(): ArrayProtector<T[]>

      all(): T[]

      /**
      * 合并数组
      *
      * @access public
      * @param mixed $items 数据
      * @return static
      */
      merge(items:any):this

      /**
      * 按指定键整理数据
      *
      * @access public
      * @param mixed  $items    数据
      * @param string $indexKey 键名
      * @return array
      */
      dictionary(items?:any, indexKey?:string):T[]

      /**
      * 比较数组，返回差集
      *
      * @access public
      * @param mixed  $items    数据
      * @param string $indexKey 指定比较的键名
      * @return static
      */
      diff(items:any, indexKey?:string):this

      /**
      * 比较数组，返回交集
      *
      * @access public
      * @param mixed  $items    数据
      * @param string $indexKey 指定比较的键名
      * @return static
      */
      intersect(items:any, indexKey?:string):this;

      /**
      * 交换数组中的键和值
      *
      * @access public
      * @return static
      */
      flip():this;

      /**
      * 返回数组中所有的键名
      *
      * @access public
      * @return static
      */
      keys():this;

      /**
      * 返回数组中所有的值组成的新 Collection 实例
      * @access public
      * @return static
      */
      values():this

      /**
      * 删除数组的最后一个元素（出栈）
      *
      * @access public
      * @return mixed
      */
      pop():any;

      /**
      * 通过使用用户自定义函数，以字符串返回数组
      *
      * @access public
      * @param callable $callback 调用方法
      * @param mixed    $initial
      * @return mixed
      */
      reduce( callback:()=>any, initial?:any):T[];

      /**
      * 以相反的顺序返回数组。
      *
      * @access public
      * @return static
      */
      reverse():this

      /**
      * 删除数组中首个元素，并返回被删除元素的值
      *
      * @access public
      * @return mixed
      */
      shift():T

      /**
      * 在数组结尾插入一个元素
      * @access public
      * @param mixed  $value 元素
      * @param string $key   KEY
      * @return $this
      */
      push(value:T, key?:string):this

      /**
      * 把一个数组分割为新的数组块.
      *
      * @access public
      * @param int  $size 块大小
      * @param bool $preserveKeys
      * @return static
      */
      chunk(size:int, preserveKeys:boolean = false):this

      /**
      * 在数组开头插入一个元素
      * @access public
      * @param mixed  $value 元素
      * @param string $key   KEY
      * @return $this
      */
      unshift(value:any, key?:string):this

      /**
      * 给每个元素执行个回调
      *
      * @access public
      * @param callable $callback 回调
      * @return $this
      */
      each(callback:()=>void):this

      /**
      * 用回调函数处理数组中的元素
      * @access public
      * @param callable|null $callback 回调
      * @return static
      */
      map( callback:(item?:T,key?:number)=>T ):this


      /**
      * 用回调函数过滤数组中的元素
      * @access public
      * @param callable|null $callback 回调
      * @return static
      */
      filter( callback?:(item?:T,key?:number)=>boolean ):this

      /**
      * 根据字段条件过滤数组中的元素
      * @access public
      * @param string $field    字段名
      * @param mixed  $operator 操作符
      * @param mixed  $value    数据
      * @return static
      */
      where(field:string, operator:string='', value:any = null);

}

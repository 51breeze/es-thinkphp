package server.kernel;

declare class Paginator<T>{

      /**
      * 获取数据总条数
      * @return int
      */
      public total(): int

      /**
      * 获取每页数量
      * @return int
      */
      public listRows(): int

      /**
      * 获取当前页页码
      * @return int
      */
      public currentPage(): int

      /**
      * 获取最后一页页码
      * @return int
      */
      public lastPage(): int

      /**
      * 数据是否足够分页
      * @access public
      * @return bool
      */
      public hasPages(): boolean

      /**
      * 创建一组分页链接
      *
      * @access public
      * @param int $start
      * @param int $end
      * @return array
      */
      public getUrlRange(start:int, end:int): array

      /**
      * 设置URL锚点
      *
      * @access public
      * @param string|null $fragment
      * @return $this
      */
      public fragment( fragment:string = null):this;
      
      /**
      * 添加URL参数
      *
      * @access public
      * @param array $append
      * @return $this
      */
      public appends(append:array):this;

      /**
      * 构造锚点字符串
      *
      * @access public
      * @return string
      */
      protected buildFragment(): string

      public items():T[];

      /**
      * 获取数据集
      *
      * @return Collection|\think\model\Collection
      */
      public getCollection():server.kernel.Collection<T>

      public isEmpty(): boolean

      /**
      * 给每个元素执行个回调
      *
      * @access public
      * @param callable $callback
      * @return $this
      */
      public each(callback:()=>void)

      /**
      * 统计数据集条数
      * @return int
      */
      public count(): int

      /**
      * 转换为数组
      * @return array
      */
      public toArray(): PaginateResult<T>;

      public jsonSerialize(): PaginateResult<T>;
}

declare interface PaginateConfig{
      //url额外参数
      query?:any[]
      //url锚点
      fragment?:string
      //分页变量
      var_page?:string
      //每页数量
      list_rows?:number
      //当前页
      page?:number
}

declare type PaginateResult<T>={
      current_page:number,
      last_page:number,
      per_page:number,
      total:number,
      data:T[]
}
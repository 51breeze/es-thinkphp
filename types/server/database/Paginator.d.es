package server.database;

declare class Paginator{

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

      public items():any;

      /**
      * 获取数据集
      *
      * @return Collection|\think\model\Collection
      */
      public getCollection():server.kernel.Collection

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
      public toArray(): array

}


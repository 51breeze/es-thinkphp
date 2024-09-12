package server.database.concern;

declare interface BaseQuery<T=any> implements WhereQuery,TimeFieldQuery,AggregateQuery,ResultOperation,ModelRelationQuery{

      /**
      * 创建一个新的查询对象
      * @access public
      * @return BaseQuery
      */
      newQuery(): BaseQuery<T>

      /**
      * 获取当前的数据库Connection对象
      * @access public
      * @return ConnectionInterface
      */
      getConnection():server.database.Connection

      /**
      * 指定当前数据表名（不含前缀）
      * @access public
      * @param string $name 不含前缀的数据表名字
      * @return $this
      */
      name(name:string):this

      /**
      * 获取当前的数据表名称
      * @access public
      * @return string
      */
      getName(): string

      /**
      * 获取数据库的配置参数
      * @access public
      * @param string $name 参数名称
      * @return mixed
      */
      getConfig( name:string = ''):any;

      /**
      * 得到当前或者指定名称的数据表
      * @access public
      * @param string $name 不含前缀的数据表名字
      * @return mixed
      */
      getTable( name:string = ''):string | null

      /**
      * 设置字段类型信息
      * @access public
      * @param array $type 字段类型信息
      * @return $this
      */
      setFieldType(type:ArrayMapping<string>):this;


      /**
      * 获取最近一次查询的sql语句
      * @access public
      * @return string
      */
      getLastSql(): string


      /**
      * 获取返回或者影响的记录数
      * @access public
      * @return integer
      */
      getNumRows(): number

      /**
      * 获取最近插入的ID
      * @access public
      * @param string $sequence 自增序列名
      * @return mixed
      */
      getLastInsID( sequence:string = null):number;


      /**
      * 得到某个字段的值
      * @access public
      * @param string $field   字段名
      * @param mixed  $default 默认值
      * @return mixed
      */
      value<R=string|number|null>(field:string, defaultValue:any = null):R;

      /**
      * 得到某个列的数组
      * @access public
      * @param string|array $field 字段名 多个字段用逗号分隔
      * @param string       $key   索引
      * @return array
      */
      column<R=Record>(field:string | string[], key:string = ''):R

      /**
      * 查询SQL组装 union
      * @access public
      * @param mixed   $union UNION
      * @param boolean $all   是否适用UNION ALL
      * @return $this
      */
      union(union, all:boolean = false):this

      /**
      * 查询SQL组装 union all
      * @access public
      * @param mixed $union UNION数据
      * @return $this
      */
      unionAll(union):this;

      /**
      * 指定查询字段
      * @access public
      * @param mixed $field 字段信息
      * @return $this
      */
      field(field:true):this;
      field(field:server.database.Raw | string | string[]):this;

      /**
      * 指定要排除的查询字段
      * @access public
      * @param array|string $field 要排除的字段
      * @return $this
      */
      withoutField(field:server.database.Raw | string | string[]):this

      /**
      * 指定其它数据表的查询字段
      * @access public
      * @param mixed   $field     字段信息
      * @param string  $tableName 数据表名
      * @param string  $prefix    字段前缀
      * @param string  $alias     别名前缀
      * @return $this
      */
      tableField(field:server.database.Raw | string | string[], tableName:string, prefix:string = '', alias:string = ''):this

      /**
      * 设置数据
      * @access public
      * @param array $data 数据
      * @return $this
      */
      data(data:Record):this

      /**
      * 去除查询参数
      * @access public
      * @param string $option 参数名 留空去除所有参数
      * @return $this
      */
      removeOption( option:string = ''):this;

      /**
      * 指定查询数量
      * @access public
      * @param int $offset 起始位置
      * @param int $length 查询数量
      * @return $this
      */
      limit(offset:int, length:int = null):this;

      /**
      * 指定分页
      * @access public
      * @param int $page     页数
      * @param int $listRows 每页数量
      * @return $this
      */
      page(page:int, listRows:int = null):this;


      /**
      * 指定当前操作的数据表
      * @access public
      * @param mixed $table 表名
      * @return $this
      */
      table($table):this;


      /**
      * 指定排序 order('id','desc') 或者 order(['id'=>'desc','create_time'=>'desc'])
      * @access public
      * @param string|array|Raw $field 排序字段
      * @param string           $order 排序
      * @return $this
      */
      order(field, order:string = ''):this;


      /**
      * 分页查询
      * @access public
      * @param int|array $listRows 每页数量 数组表示配置参数
      * @param int|bool  $simple   是否简洁模式或者总记录数
      * @return Paginator
      * @throws Exception
      */
      paginate<R=T>(listRows?:number | server.kernel.PaginateConfig, simple:boolean = false): server.kernel.Paginator<R>
      

      /**
      * 根据数字类型字段进行分页查询（大数据）
      * @access public
      * @param int|array $listRows 每页数量或者分页配置
      * @param string    $key      分页索引键
      * @param string    $sort     索引键排序 asc|desc
      * @return Paginator
      * @throws Exception
      */
      paginateX<R=T>(listRows?:number | server.kernel.PaginateConfig,  key:string = null, sort:string = null): server.kernel.Paginator<R>

      /**
      * 根据最后ID查询更多N个数据
      * @access public
      * @param int        $limit  LIMIT
      * @param int|string $lastId LastId
      * @param string     $key    分页索引键 默认为主键
      * @param string     $sort   索引键排序 asc|desc
      * @return array
      * @throws Exception
      */
      more(limit:int, lastId:int = null, key:string = null, sort:string = null): T[]


      /**
      * 查询缓存 数据为空不缓存
      * @access public
      * @param mixed             $key    缓存key
      * @param integer|\DateTime $expire 缓存有效期
      * @param string|array      $tag    缓存标签
      * @param bool              $always 始终缓存
      * @return $this
      */
      cache(key:any = true, expire:int = null, tag:string|array = null, always:boolean = false):this;


      /**
      * 查询缓存 允许缓存空数据
      * @access public
      * @param mixed             $key    缓存key
      * @param integer|\DateTime $expire 缓存有效期
      * @param string|array      $tag    缓存标签
      * @return $this
      */
      cacheAlways(key = true, expire = null, tag = null):this;

      /**
      * 指定查询lock
      * @access public
      * @param bool|string $lock 是否lock
      * @return $this
      */
      lock(lock = false):this

      /**
      * 指定数据表别名
      * @access public
      * @param array|string $alias 数据表别名
      * @return $this
      */
      alias(alias):this;


      /**
      * 设置从主服务器读取数据
      * @access public
      * @param bool $readMaster 是否从主服务器读取
      * @return $this
      */
      master(readMaster:boolean = true):this;

      /**
      * 设置是否严格检查字段名
      * @access public
      * @param bool $strict 是否严格检查字段
      * @return $this
      */
      strict( strict:boolean = true):this;

      /**
      * 设置自增序列名
      * @access public
      * @param string $sequence 自增序列名
      * @return $this
      */
      sequence(sequence:string = null):this

      /**
      * 设置JSON字段信息
      * @access public
      * @param array $json  JSON字段
      * @param bool  $assoc 是否取出数组
      * @return $this
      */
      json(json:array = [], assoc:boolean = false):this

      /**
      * 指定数据表主键
      * @access public
      * @param string|array $pk 主键
      * @return $this
      */
      pk($pk):this

      /**
      * 查询参数批量赋值
      * @access protected
      * @param array $options 表达式参数
      * @return $this
      */
      protected options(options:Record|any[]):this

      /**
      * 获取当前的查询参数
      * @access public
      * @param string $name 参数名
      * @return mixed
      */
      getOptions(name:string):any

      /**
      * 设置当前的查询参数
      * @access public
      * @param string $option 参数名
      * @param mixed  $value  参数值
      * @return $this
      */
      setOption(option:string, value:any):this

      /**
      * 设置当前字段添加的表别名
      * @access public
      * @param string $via 临时表别名
      * @return $this
      */
      via( via:string ):this

      /**
      * 保存记录 自动判断insert或者update
      * @access public
      * @param array $data        数据
      * @param bool  $forceInsert 是否强制insert
      * @return integer
      */
      save():int
      save(data:Record,forceInsert:boolean = false):int

      /**
      * 插入记录
      * @access public
      * @param array   $data         数据
      * @param boolean $getLastInsID 返回自增主键
      * @return integer|string
      */
      insert(data:Record, getLastInsID:boolean=false):int | string

      /**
      * 插入记录并获取自增ID
      * @access public
      * @param array $data 数据
      * @return integer|string
      */
      insertGetId(data:Record):int | string

      /**
      * 批量插入记录
      * @access public
      * @param array   $dataSet 数据集
      * @param integer $limit   每次写入数据限制
      * @return integer
      */
      insertAll(dataSet:Record[], limit:int = 0): int

      /**
      * 通过Select方式插入记录
      * @access public
      * @param array  $fields 要插入的数据表字段名
      * @param string $table  要插入的数据表名
      * @return integer
      */
      selectInsert(fields:string[], table:string): int

      /**
      * 更新记录
      * @access public
      * @param mixed $data 数据
      * @return integer
      * @throws Exception
      */
      update(): int
      update(data:string | server.database.Raw | Record): int

      /**
      * 删除记录
      * @access public
      * @param mixed $data 表达式 true 表示强制删除
      * @return int
      * @throws Exception
      */
      delete(): int
      delete(data:true): int
      delete(data:FieldValue | FieldValue[]): int

      /**
      * 查找记录
      * @access public
      * @param mixed $data 数据
      * @return Collection|array|static[]
      * @throws Exception
      * @throws ModelNotFoundException
      * @throws DataNotFoundException
      */
      select<R=T>(): server.kernel.Collection<R>
      select<R=T>(data:FieldValue | FieldValue[]): server.kernel.Collection<R>

      /**
      * 查找单条记录
      * @access public
      * @param mixed $data 查询数据
      * @return array|Model|null|static|mixed
      * @throws Exception
      * @throws ModelNotFoundException
      * @throws DataNotFoundException
      */
      find<R=T>():R | null
      find<R=T>(data:FieldValue):R | null

      /**
      * 分析表达式（可用于查询或者写入操作）
      * @access public
      * @return array
      */
      parseOptions(): array
      
      /**
      * 分析数据是否存在更新条件
      * @access public
      * @param array $data 数据
      * @return bool
      * @throws Exception
      */
      parseUpdateData(data:Record): boolean

      /**
      * 把主键值转换为查询条件 支持复合主键
      * @access public
      * @param array|string $data 主键数据
      * @return void
      * @throws Exception
      */
      parsePkWhere(data:any): void

      /**
      * 获取模型的更新条件
      * @access protected
      * @param array $options 查询参数
      */
      protected getModelUpdateCondition(options:array):any;

}
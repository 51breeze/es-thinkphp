package server.database;

import server.database.concern.BaseQuery;
import server.psr.CacheInterface;
import server.contract.DbConfigInterface;

declare interface Connection<QC=BaseQuery< ArrayMapping< TableColumnValue > >>{

      /**
      * 指定表名开始查询
      * @param $table
      * @return BaseQuery
      */
      table(table:string):QC

      /**
      * 指定表名开始查询(不带前缀)
      * @param $name
      * @return BaseQuery
      */
      name(name:string):QC

      /**
      * 执行数据库事务
      * @access public
      * @param callable $callback 数据操作方法回调
      * @return mixed
      */
      transaction<T>(callback:(connection:Connection)=>T):T;

      /**
      * 启动事务
      * @access public
      * @return void
      */
      startTrans();

      /**
      * 用于非自动提交状态下面的查询提交
      * @access public
      * @return void
      */
      commit();

      /**
      * 事务回滚
      * @access public
      * @return void
      */
      rollback();

      /**
      * 获取最近一次查询的sql语句
      * @access public
      * @return string
      */
      getLastSql(): string;

      /**
      * 获取当前连接器类对应的Query类
      * @access public
      * @return string
      */
      getQueryClass<T=QC>(): class<T>;

      /**
      * 连接数据库方法
      * @access public
      * @param array   $config  接参数
      * @param integer $linkNum 连接序号
      * @return mixed
      */
      connect(config?:DbConfigInterface, linkNum:int = 0);

      /**
      * 设置当前的数据库Db对象
      * @access public
      * @param DbManager $db
      * @return void
      */
      setDb(db:DbManager);

      /**
      * 设置当前的缓存对象
      * @access public
      * @param CacheInterface $cache
      * @return void
      */
      setCache(cache:CacheInterface);

      /**
      * 获取数据库的配置参数
      * @access public
      * @param string $config 配置名称
      * @return mixed
      */
      getConfig(config?:string):DbConfigInterface

      /**
      * 关闭数据库（或者重新连接）
      * @access public
      * @return $this
      */
      close():this

      /**
      * 查找单条记录
      * @access public
      * @param BaseQuery $query 查询对象
      * @return array
      */
      find(query:QC): ArrayMapping< TableColumnValue >;

      /**
      * 查找记录
      * @access public
      * @param BaseQuery $query 查询对象
      * @return array
      */
      select(query:QC): ArrayMapping< TableColumnValue >[];

      /**
      * 插入记录
      * @access public
      * @param BaseQuery   $query        查询对象
      * @param boolean $getLastInsID 返回自增主键
      * @return mixed
      */
      insert(query:QC, getLastInsID?:boolean):int|null;

      /**
      * 批量插入记录
      * @access public
      * @param BaseQuery   $query   查询对象
      * @param mixed   $dataSet 数据集
      * @return integer
      */
      insertAll(query:QC, dataSet?:array): int;

      /**
      * 更新记录
      * @access public
      * @param BaseQuery $query 查询对象
      * @return integer
      */
      update(query:QC): int;

      /**
      * 删除记录
      * @access public
      * @param BaseQuery $query 查询对象
      * @return int
      */
      delete(query:QC): int;

      /**
      * 得到某个字段的值
      * @access public
      * @param BaseQuery  $query   查询对象
      * @param string $field   字段名
      * @param mixed  $default 默认值
      * @return mixed
      */
      value(query:QC, field:string, defaultValue:any = null):TableColumnValue;

      /**
      * 得到某个列的数组
      * @access public
      * @param BaseQuery  $query  查询对象
      * @param string|array $column 字段名 多个字段用逗号分隔
      * @param string $key    索引
      * @return array
      */
      column(query:QC, column:string | array, key?:string): ArrayMapping< TableColumnValue >[];
}

declare interface PDOStatement{}

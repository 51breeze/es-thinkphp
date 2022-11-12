@Reference('./DbManager.d.es');
@Reference('./Config.d.es');
@Reference('./Convenient.d.es');
@Reference('./concern/BaseQuery.d.es');
@Reference('../../psr/CacheInterface.d.es');

package server.database;

import server.database.concern.BaseQuery;
import server.psr.CacheInterface;

declare interface Connection implements Convenient{

      /**
      * 获取当前连接器类对应的Query类
      * @access public
      * @return string
      */
      public getQueryClass<T>(): class<T>;

      /**
      * 连接数据库方法
      * @access public
      * @param array   $config  接参数
      * @param integer $linkNum 连接序号
      * @return mixed
      */
      public connect(config?:Config, linkNum:int = 0);

      /**
      * 设置当前的数据库Db对象
      * @access public
      * @param DbManager $db
      * @return void
      */
      public setDb(db:DbManager);

      /**
      * 设置当前的缓存对象
      * @access public
      * @param CacheInterface $cache
      * @return void
      */
      public setCache(cache:CacheInterface);

      /**
      * 获取数据库的配置参数
      * @access public
      * @param string $config 配置名称
      * @return mixed
      */
      public getConfig(config?:string):Config

      /**
      * 关闭数据库（或者重新连接）
      * @access public
      * @return $this
      */
      public close():this

      /**
      * 查找单条记录
      * @access public
      * @param BaseQuery $query 查询对象
      * @return array
      */
      public find(query:BaseQuery): array;

      /**
      * 查找记录
      * @access public
      * @param BaseQuery $query 查询对象
      * @return array
      */
      public select(query:BaseQuery): array;

      /**
      * 插入记录
      * @access public
      * @param BaseQuery   $query        查询对象
      * @param boolean $getLastInsID 返回自增主键
      * @return mixed
      */
      public insert(query:BaseQuery, getLastInsID?:boolean);

      /**
      * 批量插入记录
      * @access public
      * @param BaseQuery   $query   查询对象
      * @param mixed   $dataSet 数据集
      * @return integer
      */
      public insertAll(query:BaseQuery, dataSet?:array): int;

      /**
      * 更新记录
      * @access public
      * @param BaseQuery $query 查询对象
      * @return integer
      */
      public update(query:BaseQuery): int;

      /**
      * 删除记录
      * @access public
      * @param BaseQuery $query 查询对象
      * @return int
      */
      public delete(query:BaseQuery): int;

      /**
      * 得到某个字段的值
      * @access public
      * @param BaseQuery  $query   查询对象
      * @param string $field   字段名
      * @param mixed  $default 默认值
      * @return mixed
      */
      public value(query:BaseQuery, field:string, defaultValue:any = null);

      /**
      * 得到某个列的数组
      * @access public
      * @param BaseQuery  $query  查询对象
      * @param string|array $column 字段名 多个字段用逗号分隔
      * @param string $key    索引
      * @return array
      */
      public column(query:BaseQuery, column:string | array, key?:string): array;
}

declare interface PDOStatement{}

package server.database;

import server.database.concern.BaseQuery;
import server.database.concern.JoinAndViewQuery;
import server.database.concern.ParamsBind;
import server.database.concern.TableFieldInfo;

/**
* PDO数据查询类
*/
declare class Query<T> extends BaseQuery<T> implements JoinAndViewQuery,ParamsBind,TableFieldInfo{


      /**
      * 表达式方式指定Field排序
      * @access public
      * @param string $field 排序字段
      * @param array  $bind  参数绑定
      * @return $this
      */
      orderRaw(field:string, bind?:any[]):this
      

      /**
      * 表达式方式指定查询字段
      * @access public
      * @param string $field 字段名
      * @return $this
      */
      fieldRaw(field:string):this
      

      /**
      * 指定Field排序 orderField('id',[1,2,3],'desc')
      * @access public
      * @param string $field  排序字段
      * @param array  $values 排序值
      * @param string $order  排序 desc/asc
      * @return $this
      */
      orderField(field:string, values:(string|number)[], order?:'desc'|'asc'):this
      
      /**
      * 随机排序
      * @access public
      * @return $this
      */
      orderRand():this

      /**
      * 使用表达式设置数据
      * @access public
      * @param string $field 字段名
      * @param string $value 字段值
      * @return $this
      */
      exp(field:string, value:string):this


      /**
      * 表达式方式指定当前操作的数据表
      * @access public
      * @param mixed $table 表名
      * @return $this
      */
      tableRaw(table:string):this


      /**
      * 获取执行的SQL语句而不进行实际的查询
      * @access public
      * @param bool $fetch 是否返回sql
      * @return $this|Fetch
      */
      fetchSql(fetch?:boolean):this


      /**
      * 批处理执行SQL语句
      * 批处理的指令都认为是execute操作
      * @access public
      * @param array $sql SQL批处理指令
      * @return bool
      */
      batchQuery(sql?:array): boolean
      

      /**
      * USING支持 用于多表删除
      * @access public
      * @param mixed $using USING
      * @return $this
      */
      using(using:any):this
      

      /**
      * 存储过程调用
      * @access public
      * @param bool $procedure 是否为存储过程查询
      * @return $this
      */
      procedure(procedure?:boolean):this


      /**
      * 指定group查询
      * @access public
      * @param string|array $group GROUP
      * @return $this
      */
      group(group:string|string[]):this


      /**
      * 指定having查询
      * @access public
      * @param string $having having
      * @return $this
      */
      having(having:string):this


      /**
      * 指定distinct查询
      * @access public
      * @param bool $distinct 是否唯一
      * @return $this
      */
      distinct(distinct?:boolean):this
      

      /**
      * 指定强制索引
      * @access public
      * @param string $force 索引名称
      * @return $this
      */
      force(force:string):this


      /**
      * 查询注释
      * @access public
      * @param string $comment 注释
      * @return $this
      */
      comment(comment:string):this


      /**
      * 设置是否REPLACE
      * @access public
      * @param bool $replace 是否使用REPLACE写入数据
      * @return $this
      */
      replace(replace?:boolean):this


      /**
      * 设置当前查询所在的分区
      * @access public
      * @param string|array $partition 分区名称
      * @return $this
      */
      partition(partition:string|string[]):this


      /**
      * 设置DUPLICATE
      * @access public
      * @param array|string|Raw $duplicate DUPLICATE信息
      * @return $this
      */
      duplicate(duplicate:string|Raw|(string|Raw)[]):this


      /**
      * 设置查询的额外参数
      * @access public
      * @param string $extra 额外信息
      * @return $this
      */
      extra(extra:string):this


      /**
      * 创建子查询SQL
      * @access public
      * @param bool $sub 是否添加括号
      * @return string
      * @throws Exception
      */
      buildSql(sub:boolean): string

      /**
      * 获取当前数据表的主键
      * @access public
      * @return string|array
      */
      getPk():string|array


      /**
      * 指定数据表自增主键
      * @access public
      * @param string $autoinc 自增键
      * @return $this
      */
      autoinc(autoinc:string):this;


      /**
      * 获取当前数据表的自增主键
      * @access public
      * @return string|null
      */
      getAutoInc():string|null


      /**
      * 字段值增长
      * @access public
      * @param string  $field    字段名
      * @param float   $step     增长值
      * @return $this
      */
      inc(field:string, step?:float):this;


      /**
      * 字段值减少
      * @access public
      * @param string  $field    字段名
      * @param float   $step     增长值
      * @return $this
      */
      dec(field:string, step?:float):this;


      /**
      * 获取当前的查询标识
      * @access public
      * @param mixed $data 要序列化的数据
      * @return string
      */
      getQueryGuid(data?): string


      /**
      * 执行查询但只返回PDOStatement对象
      * @access public
      * @return PDOStatement
      */
      getPdo(): server.database.PDOStatement

      /**
      * 使用游标查找记录
      * @access public
      * @param mixed $data 数据
      * @return \Generator
      */
      cursor(data?)
      

      /**
      * 分批数据返回处理
      * @access public
      * @param integer      $count    每次处理的数据数量
      * @param callable     $callback 处理回调方法
      * @param string|array $column   分批处理的字段名
      * @param string       $order    字段排序
      * @return bool
      * @throws Exception
      */
      chunk<T>(count:int, callable:(result:T[])=>void, column?:string|string[], order?:'asc'|'desc'): boolean
}
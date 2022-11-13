package server.database.concern;

import server.database.Raw;

/**
* 聚合查询
*/
declare interface AggregateQuery{
      /**
      * COUNT查询
      * @access public
      * @param string|Raw $field 字段名
      * @return int
      */
      count(field:string|Raw): int

      /**
      * SUM查询
      * @access public
      * @param string|Raw $field 字段名
      * @return float
      */
      sum(field:string|Raw): float

      /**
      * MIN查询
      * @access public
      * @param string|Raw $field 字段名
      * @param bool       $force 强制转为数字类型
      * @return mixed
      */
      min(field:string|Raw, force?:boolean)

      /**
      * MAX查询
      * @access public
      * @param string|Raw $field 字段名
      * @param bool       $force 强制转为数字类型
      * @return mixed
      */
      max(field:string|Raw, force?:boolean)

      /**
      * AVG查询
      * @access public
      * @param string|Raw $field 字段名
      * @return float
      */
      avg(field:string|Raw): float
}

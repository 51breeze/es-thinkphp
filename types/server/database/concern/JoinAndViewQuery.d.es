package server.database.concern;

declare type JoinTableType = string | [] | server.database.Raw;
declare type JoinTableBindType = string|number[];

/**
* JOIN和VIEW查询
*/
declare interface JoinAndViewQuery{

      /**
      * 查询SQL组装 join
      * @access public
      * @param mixed  $join      关联的表名
      * @param mixed  $condition 条件
      * @param string $type      JOIN类型
      * @param array  $bind      参数绑定
      * @return $this
      */
      join(join:JoinTableType, condition?:string, type?:string, bind?:JoinTableBindType):this;
      

      /**
      * LEFT JOIN
      * @access public
      * @param mixed $join      关联的表名
      * @param mixed $condition 条件
      * @param array $bind      参数绑定
      * @return $this
      */
      leftJoin(join:JoinTableType, condition?:string, bind?:JoinTableBindType):this;

      /**
      * RIGHT JOIN
      * @access public
      * @param mixed $join      关联的表名
      * @param mixed $condition 条件
      * @param array $bind      参数绑定
      * @return $this
      */
      rightJoin(join:JoinTableType, condition?:string, bind?:JoinTableBindType):this;

      /**
      * FULL JOIN
      * @access public
      * @param mixed $join      关联的表名
      * @param mixed $condition 条件
      * @param array $bind      参数绑定
      * @return $this
      */
      fullJoin(join:JoinTableType, condition?:string, bind?:JoinTableBindType):this;

      /**
      * 指定JOIN查询字段
      * @access public
      * @param string|array $join  数据表
      * @param string|array $field 查询字段
      * @param string       $on    JOIN条件
      * @param string       $type  JOIN类型
      * @param array        $bind  参数绑定
      * @return $this
      */
      view(join:JoinTableType, field?:string|string[], on?:string, type?:string,  bind?:JoinTableBindType):this
}
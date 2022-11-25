package server.contract;

import server.kernel.Collection;
import server.model.Model;
import server.database.Query;

/**
 * 模型关联接口
 */
declare interface ModelRelationInterface<T>
{
    /**
     * 延迟获取关联数据
     * @access public
     * @param  array   $subRelation 子关联
     * @param  Closure $closure     闭包查询条件
     * @return Collection
     */
    getRelation(subRelation:array, closure:(...args)=>void): Collection;

    /**
     * 预载入关联查询
     * @access public
     * @param  array   $resultSet   数据集
     * @param  string  $relation    当前关联名
     * @param  array   $subRelation 子关联名
     * @param  Closure $closure     闭包条件
     * @return void
     */
    eagerlyResultSet(resultSet:array, relation:string, subRelation:array, closure:(...args)=>void): void;

    /**
     * 预载入关联查询
     * @access public
     * @param  Model   $result      数据对象
     * @param  string  $relation    当前关联名
     * @param  array   $subRelation 子关联名
     * @param  Closure $closure     闭包条件
     * @return void
     */
    eagerlyResult(result:T, relation:string, subRelation?:array, closure:(...args)=>void): void;

    /**
     * 关联统计
     * @access public
     * @param  Model   $result  模型对象
     * @param  Closure $closure 闭包
     * @param  string  $aggregate 聚合查询方法
     * @param  string  $field 字段
     * @param  string  $name 统计字段别名
     * @return integer
     */
    relationCount(result:T, closure:(...args)=>void, aggregate?:string, field?:string, name?:string);

    /**
     * 创建关联统计子查询
     * @access public
     * @param  Closure $closure 闭包
     * @param  string  $aggregate 聚合查询方法
     * @param  string  $field 字段
     * @param  string  $name 统计字段别名
     * @return string
     */
    getRelationCountQuery(closure?:(...args)=>void, aggregate?:string, field?:string, name?:string ): string;

    /**
     * 根据关联条件查询当前模型
     * @access public
     * @param  string  $operator 比较操作符
     * @param  integer $count    个数
     * @param  string  $id       关联表的统计字段
     * @param  string  $joinType JOIN类型
     * @return Query
     */
    has(operator?:string, count?:int, id?:string, joinType?:string): Query<T>;

    /**
     * 根据关联条件查询当前模型
     * @access public
     * @param  mixed  $where 查询条件（数组或者闭包）
     * @param  mixed  $fields 字段
     * @param  string $joinType JOIN类型
     * @return Query
     */
    hasWhere(where?:array, fields?, joinType?:string): Query<T>;
}

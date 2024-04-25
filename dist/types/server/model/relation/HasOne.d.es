package server.model.relation;

import server.model.Model;
import server.database.Query;

/**
 * HasOne 关联类
 */
declare class HasOne<T> extends OneToOne<T>
{
    /**
     * 架构函数
     * @access public
     * @param  Model  $parent     上级模型对象
     * @param  string $model      模型名
     * @param  string $foreignKey 关联外键
     * @param  string $localKey   当前模型主键
     */
   constructor(parent:T, model:string, foreignKey:string, localKey:string )

    /**
     * 延迟获取关联数据
     * @access public
     * @param  array   $subRelation 子关联名
     * @param  Closure $closure     闭包查询条件
     * @return Model
     */
    getRelation(subRelation:string[], closure?:(...args)=>any):T

    /**
     * 创建关联统计子查询
     * @access public
     * @param  Closure $closure 闭包
     * @param  string  $aggregate 聚合查询方法
     * @param  string  $field 字段
     * @param  string  $name 统计字段别名
     * @return string
     */
    getRelationCountQuery(closure?:(...args)=>any, aggregate?:string, field?:string, name?:string): string

    /**
     * 关联统计
     * @access public
     * @param  Model   $result  数据对象
     * @param  Closure $closure 闭包
     * @param  string  $aggregate 聚合查询方法
     * @param  string  $field 字段
     * @param  string  $name 统计字段别名
     * @return integer
     */
    relationCount(result:T, closure?:(...args)=>any, aggregate?:string, field?:string, name?:string ):number;

    /**
     * 根据关联条件查询当前模型
     * @access public
     * @param  string  $operator 比较操作符
     * @param  integer $count    个数
     * @param  string  $id       关联表的统计字段
     * @param  string  $joinType JOIN类型
     * @param  Query   $query    Query对象
     * @return Query
     */
    has(operator?:string, count?:int, id?:string, joinType?:string, query?:Query<T>): Query<T>

    /**
     * 根据关联条件查询当前模型
     * @access public
     * @param  mixed  $where 查询条件（数组或者闭包）
     * @param  mixed  $fields   字段
     * @param  string $joinType JOIN类型
     * @param  Query  $query    Query对象
     * @return Query
     */
    hasWhere(where:any, fields?:any, joinType?:string, query?:Query<T>): Query<T>
    

    /**
     * 预载入关联查询（数据集）
     * @access protected
     * @param  array   $resultSet   数据集
     * @param  string  $relation    当前关联名
     * @param  array   $subRelation 子关联名
     * @param  Closure $closure     闭包
     * @param  array   $cache       关联缓存
     * @return void
     */
    protected eagerlySet(resultSet:ArrayMapping<ScalarValue>, relation:string, subRelation?:string[], closure:(...args)=>any, cache?:array): void

    /**
     * 预载入关联查询（数据）
     * @access protected
     * @param  Model   $result      数据对象
     * @param  string  $relation    当前关联名
     * @param  array   $subRelation 子关联名
     * @param  Closure $closure     闭包
     * @param  array   $cache       关联缓存
     * @return void
     */
    protected eagerlyOne(result:T, relation:string, subRelation?:string[], closure?:(...args)=>any, cache?:array): void
   
    /**
     * 执行基础查询（仅执行一次）
     * @access protected
     * @return void
     */
    protected baseQuery(): void
   
}

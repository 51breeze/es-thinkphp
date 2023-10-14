package server.model.relation;

import server.model.Model;
import server.database.Query;

/**
 * BelongsTo关联类
 */
declare class BelongsTo<T> extends OneToOne<T>{
    /**
     * 架构函数
     * @access public
     * @param  Model  $parent 上级模型对象
     * @param  string $model 模型名
     * @param  string $foreignKey 关联外键
     * @param  string $localKey 关联主键
     * @param  string $relation  关联名
     */
    constructor(parent:T, model:string, foreignKey:string, localKey:string, relation?:string)

    /**
     * 延迟获取关联数据
     * @access public
     * @param  array   $subRelation 子关联名
     * @param  Closure $closure     闭包查询条件
     * @return Model
     */
    getRelation(subRelation?:string[], closure:Function = null):T;

    /**
     * 创建关联统计子查询
     * @access public
     * @param  Closure $closure 闭包
     * @param  string  $aggregate 聚合查询方法
     * @param  string  $field 字段
     * @param  string  $name 聚合字段别名
     * @return string
     */
    getRelationCountQuery(closure:Function = null, aggregate = 'count', field = '*', name = ''): string
   

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
    relationCount(result:T, closure:Function = null, aggregate = 'count', field = '*', name = null):number
   

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
    has(operator = '>=', count = 1, id = '*', joinType = '', query:Query<T> = null): Query<T>
   

    /**
     * 根据关联条件查询当前模型
     * @access public
     * @param  mixed  $where  查询条件（数组或者闭包）
     * @param  mixed  $fields 字段
     * @param  string $joinType JOIN类型
     * @param  Query  $query    Query对象
     * @return Query
     */
    hasWhere(where:any, fields = null, joinType = '', query:Query<T> = null): Query<T>
   
    /**
     * 添加关联数据
     * @access public
     * @param  Model $model关联模型对象
     * @return Model
     */
    associate(model:T): T

    /**
     * 注销关联数据
     * @access public
     * @return Model
     */
    dissociate(): T
    
    /**
     * 执行基础查询（仅执行一次）
     * @access protected
     * @return void
     */
    protected baseQuery(): void
   
}

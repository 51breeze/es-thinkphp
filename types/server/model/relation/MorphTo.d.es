package server.model.relation;

import server.model.Model;
import server.database.Query;
import server.model.Relation;

/**
 * 多态关联类
 */
declare class MorphTo<T> extends Relation<T>
{
    /**
     * 多态关联外键
     * @var string
     */
    protected $morphKey:string;

    /**
     * 多态字段
     * @var string
     */
    protected $morphType:string;

    /**
     * 多态别名
     * @var array
     */
    protected $alias:string[];

    /**
     * 关联名
     * @var string
     */
    protected $relation:string;

    protected $queryCaller = [];

    /**
     * 架构函数
     * @access public
     * @param Model $parent 上级模型对象
     * @param string $morphType 多态字段名
     * @param string $morphKey 外键名
     * @param array $alias 多态别名定义
     * @param  ?string $relation 关联名
     */
    constructor(parent:T, morphType:string, morphKey:string, alias:string[], relation?:string )

    /**
     * 延迟获取关联数据
     * @access public
     * @param array $subRelation 子关联名
     * @param ?Closure $closure 闭包查询条件
     * @return Model
     */
    getRelation(subRelation?:string[], closure?:Function): T

    /**
     * 根据关联条件查询当前模型
     * @access public
     * @param string $operator 比较操作符
     * @param integer $count 个数
     * @param string $id 关联表的统计字段
     * @param string $joinType JOIN类型
     * @param Query $query Query对象
     * @return Query
     */
    has(operator?:string, count?:uint, id?:string, joinType?:string, query?:Query<T>): Query<T>

    /**
     * 根据关联条件查询当前模型
     * @access public
     * @param mixed $where 查询条件（数组或者闭包）
     * @param mixed $fields 字段
     * @param string $joinType JOIN类型
     * @param  ?Query $query Query对象
     * @return Query
     */
    hasWhere(where?:ArrayMappingType<string|number>, fields?:ArrayMappingType<string>, joinType?:string, query?:Query<T>): Query<T>
    

    /**
     * 解析模型的完整命名空间
     * @access protected
     * @param string $model 模型名（或者完整类名）
     * @return Model
     */
    protected parseModel(model:string): string

    /**
     * 设置多态别名
     * @access public
     * @param array $alias 别名定义
     * @return $this
     */
    setAlias(alias:string):this

    /**
     * 移除关联查询参数
     * @access public
     * @return $this
     */
    removeOption(option?:string):this

    /**
     * 预载入关联查询
     * @access public
     * @param array $resultSet 数据集
     * @param string $relation 当前关联名
     * @param array $subRelation 子关联名
     * @param  ?Closure $closure 闭包
     * @param array $cache 关联缓存
     * @return void
     * @throws Exception
     */
    eagerlyResultSet(resultSet:ArrayMappingType<ScalarValueType>, relation:string, subRelation:string[], closure?:Function, cache?:array): void

    /**
     * 预载入关联查询
     * @access public
     * @param Model $result 数据对象
     * @param string $relation 当前关联名
     * @param array $subRelation 子关联名
     * @param  ?Closure $closure 闭包
     * @param array $cache 关联缓存
     * @return void
     */
    eagerlyResult(result:T, relation:string, subRelation?:string[], closure?:Function, cache?:array): void

    /**
     * 关联统计
     * @access public
     * @param Model $result 数据对象
     * @param  ?Closure $closure 闭包
     * @param string $aggregate 聚合查询方法
     * @param string $field 字段
     * @return integer
     */
    relationCount(result:T, closure?:Function, aggregate?:string, field?:string, name?:string): number

    /**
     * 多态MorphTo 关联模型预查询
     * @access protected
     * @param string $model 关联模型对象
     * @param string $relation 关联名
     * @param Model $result
     * @param array $subRelation 子关联
     * @param array $cache 关联缓存
     * @return void
     */
    protected eagerlyMorphToOne(model:string, relation:string, result:T, subRelation?:string[], cache?:array): void


    /**
     * 添加关联数据
     * @access public
     * @param Model $model 关联模型对象
     * @param string $type 多态类型
     * @return Model
     */
    associate(model:T, type?:string): T

    /**
     * 注销关联数据
     * @access public
     * @return Model
     */
    dissociate(): T

    protected buildQuery(query:Query<T>):void

}

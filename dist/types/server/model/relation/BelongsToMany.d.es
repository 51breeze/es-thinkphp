package server.model.relation;

import server.model.Model;
import server.database.Query;
import server.model.Relation;
import server.model.Pivot;
import server.model.Collection;

/**
 * 多对多关联类
 */
declare class BelongsToMany<T extends Model=Model> extends Relation<T>
{
    /**
     * 中间表表名
     * @var string
     */
    protected middle:string;

    /**
     * 中间表模型名称
     * @var string
     */
    protected pivotName:string;

    /**
     * 中间表数据名称
     * @var string
     */
    protected pivotDataName:string = 'pivot';

    /**
     * 架构函数
     * @access public
     * @param  Model  $parent     上级模型对象
     * @param  string $model      模型名
     * @param  string $middle     中间表/模型名
     * @param  string $foreignKey 关联模型外键
     * @param  string $localKey   当前模型关联键
     */
    constructor(parent:T,model:string, middle:string, foreignKey:string, localKey:string)


    /**
     * 设置中间表模型
     * @access public
     * @param  $pivot
     * @return $this
     */
    pivot(pivot:string):this

    /**
     * 设置中间表数据名称
     * @access public
     * @param  string $name
     * @return $this
     */
    name(name:string):this

    /**
     * 实例化中间表模型
     * @access public
     * @param  $data
     * @return Pivot
     * @throws Exception
     */
    protected newPivot(data:ArrayMapping<Scalar>):Pivot

    /**
     * 延迟获取关联数据
     * @access public
     * @param  array    $subRelation 子关联名
     * @param  Closure  $closure     闭包查询条件
     * @return Collection
     */
    getRelation(subRelation?:string[], closure?:Function):Collection<T>

    /**
     * 组装Pivot模型
     * @access public
     * @param  Model    $result 模型对象
     * @return array
     */
    protected matchPivot(result:T): ArrayMapping<Scalar>

    /**
     * 根据关联条件查询当前模型
     * @access public
     * @param  string  $operator 比较操作符
     * @param  integer $count    个数
     * @param  string  $id       关联表的统计字段
     * @param  string  $joinType JOIN类型
     * @param  Query   $query    Query对象
     * @return Model
     */
    has(operator = '>=', count = 1, id = '*', joinType = 'INNER', query:Query<T> = null):T

    /**
     * 设置中间表的查询条件
     * @access public
     * @param  string $field
     * @param  string $op
     * @param  mixed  $condition
     * @return $this
     */
    wherePivot(field:string, op?:string, condition?):this

    /**
     * 预载入关联查询（数据集）
     * @access public
     * @param  array   $resultSet   数据集
     * @param  string  $relation    当前关联名
     * @param  array   $subRelation 子关联名
     * @param  Closure $closure     闭包
     * @param  array   $cache       关联缓存
     * @return void
     */
    eagerlyResultSet(resultSet:ArrayMapping<Scalar>, relation:string, subRelation:string[], closure?:Function, cache?:array): void
   

    /**
     * 预载入关联查询（单个数据）
     * @access public
     * @param  Model   $result      数据对象
     * @param  string  $relation    当前关联名
     * @param  array   $subRelation 子关联名
     * @param  Closure $closure     闭包
     * @param  array   $cache       关联缓存
     * @return void
     */
    eagerlyResult(result:T, relation:string, subRelation?:string[], closure?:Function, cache?:array): void

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
    relationCount(result:T, closure?:Function, aggregate?:string, field?:string, name?:string): float

    /**
     * 获取关联统计子查询
     * @access public
     * @param  Closure $closure 闭包
     * @param  string  $aggregate 聚合查询方法
     * @param  string  $field 字段
     * @param  string  $name 统计字段别名
     * @return string
     */
    getRelationCountQuery(closure?:Function, aggregate?:string, field?:string, name?:string): string

    /**
     * 多对多 关联模型预查询
     * @access protected
     * @param  array   $where       关联预查询条件
     * @param  array   $subRelation 子关联
     * @param  Closure $closure     闭包
     * @param  array   $cache       关联缓存
     * @return array
     */
    protected eagerlyManyToMany(where:ArrayMapping<Scalar>, subRelation?:string[], closure?:Function, cache?:array): array
    
    /**
     * BELONGS TO MANY 关联查询
     * @access protected
     * @param  string $foreignKey 关联模型关联键
     * @param  string $localKey   当前模型关联键
     * @param  array  $condition  关联查询条件
     * @return Query
     */
    protected belongsToManyQuery(foreignKey:string, localKey:string, condition?:ArrayMapping<Scalar>): Query<T>

    /**
     * 保存（新增）当前关联数据对象
     * @access public
     * @param  mixed $data  数据 可以使用数组 关联模型对象 和 关联对象的主键
     * @param  array $pivot 中间表额外数据
     * @return array|Pivot
     */
    save(data:ArrayMapping<Scalar>, pivot?:ArrayMapping<Scalar> ):ArrayMapping<Scalar>|Pivot

    /**
     * 批量保存当前关联数据对象
     * @access public
     * @param  iterable $dataSet   数据集
     * @param  array    $pivot     中间表额外数据
     * @param  bool     $samePivot 额外数据是否相同
     * @return array|false
     */
    saveAll(dataSet:ArrayMapping<Scalar>, pivot?:ArrayMapping<Scalar>, samePivot?:boolean):ArrayMapping<Scalar>|false

    /**
     * 附加关联的一个中间表数据
     * @access public
     * @param  mixed $data  数据 可以使用数组、关联模型对象 或者 关联对象的主键
     * @param  array $pivot 中间表额外数据
     * @return array|Pivot
     * @throws Exception
     */
    attach(data:ArrayMapping<Scalar>, pivot?:ArrayMapping<Scalar>):ArrayMapping<Scalar>|Pivot

    /**
     * 判断是否存在关联数据
     * @access public
     * @param  mixed $data 数据 可以使用关联模型对象 或者 关联对象的主键
     * @return Pivot|false
     */
    attached(data:T|Scalar):Pivot|false

    /**
     * 解除关联的一个中间表数据
     * @access public
     * @param  integer|array $data        数据 可以使用关联对象的主键
     * @param  bool          $relationDel 是否同时删除关联表数据
     * @return integer
     */
    detach(data?:T|Scalar|ArrayMapping<Scalar>, relationDel?:boolean): int
    
    /**
     * 数据同步
     * @access public
     * @param  array $ids
     * @param  bool  $detaching
     * @return array
     */
    sync(ids:ArrayMapping<Scalar>, detaching?:boolean): {
        attached:ArrayMapping<Scalar>,
        detached:ArrayMapping<Scalar>,
        updated:ArrayMapping<Scalar>,
    }
   
    /**
     * 执行基础查询（仅执行一次）
     * @access protected
     * @return void
     */
    protected baseQuery(): void
}
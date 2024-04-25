package server.model.relation;

import server.model.Model;
import server.database.Query;
import server.model.Relation;
import server.model.Collection;

/**
 * 多态一对多关联
 */
declare class MorphMany<T> extends Relation<T>
{

    /**
     * 多态关联外键
     * @var string
     */
    protected $morphKey:string;

    /**
     * 多态字段名
     * @var string
     */
    protected $morphType:string;

    /**
     * 多态类型
     * @var string
     */
    protected $type:string;

    /**
     * 架构函数
     * @access public
     * @param  Model  $parent    上级模型对象
     * @param  string $model     模型名
     * @param  string $morphKey  关联外键
     * @param  string $morphType 多态字段名
     * @param  string $type      多态类型
     */
    constructor(parent:T, model:string, morphKey:string, morphType:string, type:string )

    /**
     * 延迟获取关联数据
     * @access public
     * @param  array   $subRelation 子关联名
     * @param  Closure $closure     闭包查询条件
     * @return Collection
     */
    getRelation(subRelation?:string[], closure?:Function): Collection<T>

    /**
     * 预载入关联查询
     * @access public
     * @param  array   $resultSet   数据集
     * @param  string  $relation    当前关联名
     * @param  array   $subRelation 子关联名
     * @param  Closure $closure     闭包
     * @param  array   $cache       关联缓存
     * @return void
     */
    eagerlyResultSet(resultSet:ArrayMapping<ScalarValue>, relation:string, subRelation:string[], closure?:Function, cache?:array): void
    
    /**
     * 预载入关联查询
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
     * @return mixed
     */
    relationCount(result:T, closure?:Function, aggregate?:string, field?:string, name?:string): number

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
     * 多态一对多 关联模型预查询
     * @access protected
     * @param  array   $where       关联预查询条件
     * @param  array   $subRelation 子关联
     * @param  Closure $closure     闭包
     * @param  array   $cache       关联缓存
     * @return array
     */
    protected eagerlyMorphToMany(where:ArrayMapping<string|number>, subRelation?:string[], closure?:Function, cache?:array): ArrayMapping<string|number>
   

    /**
     * 保存（新增）当前关联数据对象
     * @access public
     * @param  mixed $data 数据 可以使用数组 关联模型对象
     * @param  bool  $replace 是否自动识别更新和写入
     * @return Model|false
     */
    save(data:T | ArrayMapping<ScalarValue>, replace?:boolean ):T|false
    

    /**
     * 创建关联对象实例
     * @param array|Model $data
     * @return Model
     */
    make(data?:T | ArrayMapping<ScalarValue>): T

    /**
     * 批量保存当前关联数据对象
     * @access public
     * @param  iterable $dataSet 数据集
     * @param  boolean  $replace 是否自动识别更新和写入
     * @return array|false
     */
    saveAll(dataSet:ArrayMapping<ScalarValue>, replace?:boolean):ArrayMapping<ScalarValue>|false

    /**
     * 获取多态关联外键
     * @return string
     */
    getMorphKey():string

    /**
     * 获取多态字段名
     * @return string
     */
    getMorphType():string

    /**
     * 获取多态类型
     * @return string
     */
    getType():string

    /**
     * 执行基础查询（仅执行一次）
     * @access protected
     * @return void
     */
    protected baseQuery(): void

}

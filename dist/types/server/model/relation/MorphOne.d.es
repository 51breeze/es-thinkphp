package server.model.relation;

import server.model.Model;
import server.database.Query;
import server.model.Relation;

/**
 * 多态一对一关联类
 */
declare class MorphOne<T> extends Relation<T>
{
    /**
     * 多态关联外键
     * @var string
     */
    protected morphKey:string;

    /**
     * 多态字段
     * @var string
     */
    protected morphType:string;

    /**
     * 多态类型
     * @var string
     */
    protected type:string;

    /**
     * 构造函数
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
     * @return Model
     */
    getRelation(subRelation?:string[], closure?:Function): T

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
    has(operator?:string, count?:uint, id?:string, joinType?:string, query?:Query<T>): Query<T>

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
     * 多态一对一 关联模型预查询
     * @access protected
     * @param  array   $where       关联预查询条件
     * @param  array   $subRelation 子关联
     * @param  Closure $closure     闭包
     * @param  array   $cache       关联缓存
     * @return array
     */
    protected eagerlyMorphToOne(where:ArrayMapping<string|number>, subRelation?:string[], closure?:Function, cache?:array): ArrayMapping<string|number>

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
     * 执行基础查询（进执行一次）
     * @access protected
     * @return void
     */
    protected baseQuery(): void

    /**
     * 绑定关联表的属性到父模型属性
     * @access public
     * @param  array $attr 要绑定的属性列表
     * @return $this
     */
    bind(attr:ArrayMapping<ScalarValue>):this

    /**
     * 获取绑定属性
     * @access public
     * @return array
     */
    getBindAttr(): ArrayMapping<ScalarValue>

    /**
     * 绑定关联属性到父模型
     * @access protected
     * @param  Model $result 父模型对象
     * @param  Model $model  关联模型对象
     * @return void
     * @throws Exception
     */
    protected bindAttr(result:T, model?:T): void
}

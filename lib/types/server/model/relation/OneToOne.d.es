package server.model.relation;

import server.model.Relation;
import server.database.Query;
import server.model.Model;

/**
 * 一对一关联基础类
 * @package think\model\relation
 */
declare class OneToOne<T extends Model=Model> extends Relation<T>
{
   
    /**
     * 设置join类型
     * @access public
     * @param  string $type JOIN类型
     * @return $this
     */
    joinType(type:string):this

    /**
     * 预载入关联查询（JOIN方式）
     * @access public
     * @param  Query   $query       查询对象
     * @param  string  $relation    关联名
     * @param  mixed   $field       关联字段
     * @param  string  $joinType    JOIN方式
     * @param  Closure $closure     闭包条件
     * @param  bool    $first
     * @return void
     */
    eagerly(query:Query<T>, relation:string, field = true, joinType = '', closure:Function = null, first = false): void
    

    /**
     * 预载入关联查询（数据集）
     * @access public
     * @param  array   $resultSet   数据集
     * @param  string  $relation    当前关联名
     * @param  array   $subRelation 子关联名
     * @param  Closure $closure     闭包
     * @param  array   $cache       关联缓存
     * @param  bool    $join        是否为JOIN方式
     * @return void
     */
    eagerlyResultSet(resultSet:any, relation:string, subRelation?:string[], closure:Function = null, cache = [], join = false): void


    /**
     * 预载入关联查询（数据）
     * @access public
     * @param  Model   $result      数据对象
     * @param  string  $relation    当前关联名
     * @param  array   $subRelation 子关联名
     * @param  Closure $closure     闭包
     * @param  array   $cache       关联缓存
     * @param  bool    $join        是否为JOIN方式
     * @return void
     */
    eagerlyResult(result:T, relation:string, subRelation?:string[], closure:Function = null, cache = [], join = false): void


    /**
     * 保存（新增）当前关联数据对象
     * @access public
     * @param  mixed   $data 数据 可以使用数组 关联模型对象
     * @param  boolean $replace 是否自动识别更新和写入
     * @return Model|false
     */
    save(data:ArrayMapping<Scalar>|T, replace = true):T|false

    /**
     * 创建关联对象实例
     * @param array|Model $data
     * @return Model
     */
    make(data?:ArrayMapping<Scalar>|T): T


    /**
     * 绑定关联表的属性到父模型属性
     * @access public
     * @param  array $attr 要绑定的属性列表
     * @return $this
     */
    bind(attr:ArrayMapping<Scalar>):this

    /**
     * 获取绑定属性
     * @access public
     * @return array
     */
    getBindAttr(): ArrayMapping<Scalar>

    /**
     * 一对一 关联模型预查询拼装
     * @access public
     * @param  string $model    模型名称
     * @param  string $relation 关联名
     * @param  Model  $result   模型对象实例
     * @return void
     */
    protected match(model:string, relation:string, result?:T): void
   
    /**
     * 绑定关联属性到父模型
     * @access protected
     * @param  Model $result 父模型对象
     * @param  Model $model  关联模型对象
     * @return void
     * @throws Exception
     */
    protected bindAttr(result:T, model?:T): void
    
    /**
     * 一对一 关联模型预查询（IN方式）
     * @access public
     * @param  array   $where       关联预查询条件
     * @param  string  $key         关联键名
     * @param  array   $subRelation 子关联
     * @param  Closure $closure
     * @param  array   $cache       关联缓存
     * @return array
     */
    protected eagerlyWhere(where:any, key:string, subRelation?:string[], closure:Function = null, cache = []):any;

}

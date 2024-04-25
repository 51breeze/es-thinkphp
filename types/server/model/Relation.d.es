package server.model;

import server.model.Model;
import server.database.Query;

/**
 * 模型关联基础类
 * @package think\model
 * @mixin Query
 */
declare interface Relation<T>{
   
    /**
     * 获取关联的所属模型
     * @access public
     * @return Model
     */
    getParent(): T

    /**
     * 获取当前的关联模型类的Query实例
     * @access public
     * @return Query
     */
    getQuery():Query<T>

    /**
     * 获取关联表外键
     * @access public
     * @return string
     */
    getForeignKey():string

    /**
     * 获取关联表主键
     * @access public
     * @return string
     */
    getLocalKey():string

    /**
     * 获取当前的关联模型类的实例
     * @access public
     * @return Model
     */
    getModel(): T

    /**
     * 当前关联是否为自关联
     * @access public
     * @return bool
     */
    isSelfRelation(): boolean

    /**
     * 限制关联数据的数量
     * @access public
     * @param  int $limit 关联数量限制
     * @return $this
     */
    withLimit(limit:uint):this

    /**
     * 限制关联数据的字段
     * @access public
     * @param  array|string $field 关联字段限制
     * @return $this
     */
    withField(field:string|string[]):this

    /**
     * 排除关联数据的字段
     * @access public
     * @param  array|string $field 关联字段限制
     * @return $this
     */
    withoutField(field:string|string[]):this

    /**
     * 设置关联数据不存在的时候默认值
     * @access public
     * @param  mixed $data 默认值
     * @return $this
     */
    withDefault(data:ArrayMapping<ScalarValue>):this

}

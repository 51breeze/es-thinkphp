package server.model.relation;

import server.model.relation.BelongsToMany;
import server.model.Model;

/**
 * 多态多对多关联
 */
declare class MorphToMany<T extends Model=Model> extends BelongsToMany<T>
{
    /**
     * 多态字段名
     * @var string
     */
    protected $morphType:string;

    /**
     * 多态模型名
     * @var string
     */
    protected $morphClass:string;

    /**
     * 是否反向关联
     * @var bool
     */
    protected $inverse:boolean;

    /**
     * 架构函数
     * @access public
     * @param  Model  $parent    上级模型对象
     * @param  string $model     模型名
     * @param  string $middle    中间表名/模型名
     * @param  string $morphKey  关联外键
     * @param  string $morphType 多态字段名
     * @param  string $localKey  当前模型关联键
     * @param  bool   $inverse   反向关联
     */
    constructor(parent:T, model:string, middle:string, morphType:string, morphKey:string, localKey:string, inverse?:boolean)
}

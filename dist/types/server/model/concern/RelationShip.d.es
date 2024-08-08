package server.model.concern;

import server.model.Model;
import server.database.Query;

import server.model.relation.BelongsTo;
import server.model.relation.BelongsToMany;
import server.model.relation.HasMany;
import server.model.relation.HasManyThrough;
import server.model.relation.HasOne;
import server.model.relation.HasOneThrough;
import server.model.relation.MorphMany;
import server.model.relation.MorphOne;
import server.model.relation.MorphTo;
import server.model.relation.MorphToMany;
import server.model.relation.OneToOne;

/**
 * 模型关联处理
 */
declare interface RelationShip<T extends Model=Model>
{

    /**
     * 设置父关联对象
     * @access public
     * @param  Model $model  模型对象
     * @return $this
     */
    setParent(model:T):this;

    /**
     * 获取父关联对象
     * @access public
     * @return Model
     */
    getParent(): T

    /**
     * 获取当前模型的关联模型数据
     * @access public
     * @param  string $name 关联方法名
     * @param  bool   $auto 不存在是否自动获取
     * @return mixed
     */
    getRelation(name?:string, auto?:boolean):any;

    /**
     * 设置关联数据对象值
     * @access public
     * @param  string $name  属性名
     * @param  mixed  $value 属性值
     * @param  array  $data  数据
     * @return $this
     */
    setRelation(name:string, value:ScalarValue, data?:Record ):this;

    /**
     * 查询当前模型的关联数据
     * @access public
     * @param  array $relations 关联名
     * @param  array $withRelationAttr   关联获取器
     * @return void
     */
    relationQuery(relations:(string|((...args)=>void)|string[])[], withRelationAttr?:Record ): void

    /**
     * 关联数据写入
     * @access public
     * @param  array $relation 关联
     * @return $this
     */
    together(relation:Record):this;
    

    /**
     * 预载入关联查询 JOIN方式
     * @access public
     * @param  Query   $query    Query对象
     * @param  string  $relation 关联方法名
     * @param  mixed   $field    字段
     * @param  string  $joinType JOIN类型
     * @param  Closure $closure  闭包
     * @param  bool    $first
     * @return bool
     */
    eagerly(query:Query<T>, relation:string, field:Record<string> | string, joinType?:string, closure?:Function, first?:boolean): boolean

    /**
     * 预载入关联查询 返回数据集
     * @access public
     * @param  array  $resultSet 数据集
     * @param  string $relation  关联名
     * @param  array  $withRelationAttr 关联获取器
     * @param  bool   $join      是否为JOIN方式
     * @param  mixed  $cache     关联缓存
     * @return void
     */
    eagerlyResultSet(resultSet:Record, relations:Record , withRelationAttr?:Record, join?:boolean, cache?:boolean): void
    

    /**
     * 预载入关联查询 返回模型对象
     * @access public
     * @param  array $relations 关联
     * @param  array $withRelationAttr 关联获取器
     * @param  bool  $join      是否为JOIN方式
     * @param  mixed $cache     关联缓存
     * @return void
     */
    eagerlyResult(relations:Record<string>, withRelationAttr?:Record, join?:boolean, cache?:boolean): void

    /**
     * 绑定（一对一）关联属性到当前模型
     * @access protected
     * @param  string   $relation    关联名称
     * @param  array    $attrs       绑定属性
     * @return $this
     * @throws Exception
     */
    bindAttr(relation:string, attrs?:Record)

    /**
     * 关联统计
     * @access public
     * @param  Query  $query       查询对象
     * @param  array  $relations   关联名
     * @param  string $aggregate   聚合查询方法
     * @param  string $field       字段
     * @param  bool   $useSubQuery 子查询
     * @return void
     */
    relationCount(query:Query<T>, relations:Record, aggregate?:string, field?:string, useSubQuery?:boolean): void

    /**
     * HAS ONE 关联定义
     * @access public
     * @param  string $model      模型名
     * @param  string $foreignKey 关联外键
     * @param  string $localKey   当前主键
     * @return HasOne
     */
    hasOne<R extends Model<R>>(model:R, foreignKey?:string, localKey?:string): HasOne<R>

    /**
     * BELONGS TO 关联定义
     * @access public
     * @param  string $model      模型名
     * @param  string $foreignKey 关联外键
     * @param  string $localKey   关联主键
     * @return BelongsTo
     */
    belongsTo<R extends Model<R>>(model:R, foreignKey?:string, localKey?:string): BelongsTo<R>

    /**
     * HAS MANY 关联定义
     * @access public
     * @param  string $model      模型名
     * @param  string $foreignKey 关联外键
     * @param  string $localKey   当前主键
     * @return HasMany
     */
    hasMany<R extends Model<R>>(model:R, foreignKey?:string, localKey?:string): HasMany<T>

    /**
     * HAS MANY 远程关联定义
     * @access public
     * @param  string $model      模型名
     * @param  string $through    中间模型名
     * @param  string $foreignKey 关联外键
     * @param  string $throughKey 关联外键
     * @param  string $localKey   当前主键
     * @param  string $throughPk  中间表主键
     * @return HasManyThrough
     */
    hasManyThrough<R extends Model<R>>(model:R, through:string, foreignKey:string, throughKey:string, localKey:string, throughPk:string): HasManyThrough<T>

    /**
     * HAS ONE 远程关联定义
     * @access public
     * @param  string $model      模型名
     * @param  string $through    中间模型名
     * @param  string $foreignKey 关联外键
     * @param  string $throughKey 关联外键
     * @param  string $localKey   当前主键
     * @param  string $throughPk  中间表主键
     * @return HasOneThrough
     */
    hasOneThrough<R extends Model<R>>(model:R, through:string, foreignKey:string, throughKey:string, localKey:string, throughPk:string): HasOneThrough<T>

    /**
     * BELONGS TO MANY 关联定义
     * @access public
     * @param  string $model      模型名
     * @param  string $middle     中间表/模型名
     * @param  string $foreignKey 关联外键
     * @param  string $localKey   当前模型关联键
     * @return BelongsToMany
     */
    belongsToMany<R extends Model<R>>(model:R, middle:string, foreignKey?:string, localKey?:string): BelongsToMany<T>

    /**
     * MORPH  One 关联定义
     * @access public
     * @param  string       $model 模型名
     * @param  string|array $morph 多态字段信息
     * @param  string       $type  多态类型
     * @return MorphOne
     */
    morphOne<R extends Model<R>>(model:R, morph:string|Record<string>, type?:string): MorphOne<T>

    /**
     * MORPH  MANY 关联定义
     * @access public
     * @param  string       $model 模型名
     * @param  string|array $morph 多态字段信息
     * @param  string       $type  多态类型
     * @return MorphMany
     */
    morphMany<R extends Model<R>>(model:R, morph:string|Record<string>, type?:string): MorphMany<T>

    /**
     * MORPH TO 关联定义
     * @access public
     * @param  string|array $morph 多态字段信息
     * @param  array        $alias 多态别名定义
     * @return MorphTo
     */
    morphTo<R extends Model<R>>(morph?:string|Record<string>, alias?:Record<string>): MorphTo<T>

    /**
     * MORPH TO MANY关联定义
     * @access public
     * @param  string       $model 模型名
     * @param  string       $middle 中间表名/模型名
     * @param  string|array $morph 多态字段信息
     * @param  string       $localKey   当前模型关联键
     * @return MorphToMany
     */
    morphToMany<R extends Model<R>>(model:R, middle:string, morph?:string|Record<string>, localKey?:string): MorphToMany<T>
   

    /**
     * MORPH BY MANY关联定义
     * @access public
     * @param  string       $model 模型名
     * @param  string       $middle 中间表名/模型名
     * @param  string|array $morph 多态字段信息
     * @param  string       $foreignKey 关联外键
     * @return MorphToMany
     */
    morphByMany<R extends Model<R>>(model:R, middle:string, morph?:string|Record<string>, localKey?:string): MorphToMany<T>

    /**
     * 移除当前模型的关联属性
     * @access public
     * @return $this
     */
    removeRelation():this;
    
}

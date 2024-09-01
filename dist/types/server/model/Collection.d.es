package server.model;

import server.kernel.Collection as BaseCollection;
import server.model.Model;

/**
 * 模型数据集类
 *
 * @template TKey of array-key
 * @template TModel of \think\Model
 *
 * @extends BaseCollection<TKey, TModel>
 */
declare class Collection<T> extends BaseCollection<T>
{
    /**
     * 延迟预载入关联查询
     * @access public
     * @param  array|string $relation 关联
     * @param  mixed        $cache    关联缓存
     * @return $this
     */
    load(relation:string|string[], cache = false):this


    /**
     * 删除数据集的数据
     * @access public
     * @return bool
     */
    delete(): boolean


    /**
     * 更新数据
     * @access public
     * @param array $data       数据数组
     * @param array $allowField 允许字段
     * @return bool
     */
    update(data:ArrayMapping<Scalar>, allowField?:string[]): boolean


    /**
     * 设置需要隐藏的输出属性
     * @access public
     * @param  array $hidden 属性列表
     * @param  bool  $merge  是否合并
     * @return $this
     */
    hidden(hidden:ArrayMapping<Scalar>, merge = false):this


    /**
     * 设置需要输出的属性
     * @access public
     * @param  array $visible
     * @param  bool  $merge    是否合并
     * @return $this
     */
    visible(visible:ArrayMapping<Scalar>, merge = false):this


    /**
     * 设置需要追加的输出属性
     * @access public
     * @param  array $append 属性列表
     * @param  bool  $merge  是否合并
     * @return $this
     */
    append(append:ArrayMapping<Scalar>, merge = false):this


    /**
     * 设置模型输出场景
     * @access public
     * @param  string $scene   场景名称
     * @return $this
     */
    scene(scene:string):this

    /**
     * 设置父模型
     * @access public
     * @param  Model $parent 父模型
     * @return $this
     */
    setParent(parent:T):this

    /**
     * 设置数据字段获取器
     * @access public
     * @param  string|array $name       字段名
     * @param  callable     $callback   闭包获取器
     * @return $this
     */
    withAttr(name:string|string[], callback?:(...args)=>any):this

    /**
     * 绑定（一对一）关联属性到当前模型
     * @access protected
     * @param  string $relation 关联名称
     * @param  array  $attrs    绑定属性
     * @return $this
     * @throws Exception
     */
    bindAttr(relation:string, attrs:ArrayMapping<Scalar>):this
}

package server.model.concern;

import server.model.Collection;

/**
 * 模型数据转换处理
 */
declare interface Conversion<T>{
   

    /**
     * 转换数据为驼峰命名（用于输出）
     * @access public
     * @param  bool $toCamel 是否自动驼峰命名
     * @return $this
     */
    convertNameToCamel(toCamel:boolean=true):this;

    /**
     * 设置需要附加的输出属性
     * @access public
     * @param  array $append   属性列表
     * @param  bool  $merge    是否合并
     * @return $this
     */
    append(append:ArrayMapping<ScalarValue>, merge:boolean = false):this;

    /**
     * 设置输出层场景
     * @access public
     * @param  string $scene  场景名称
     * @return $this
     */
    scene(scene:string):this;


    /**
     * 设置附加关联对象的属性
     * @access public
     * @param  string       $attr    关联属性
     * @param  string|array $append  追加属性名
     * @return $this
     * @throws Exception
     */
    appendRelationAttr(attr:string, append:ArrayMapping<ScalarValue>):this;


    /**
     * 设置需要隐藏的输出属性
     * @access public
     * @param  array $hidden   属性列表
     * @param  bool  $merge    是否合并
     * @return $this
     */
    hidden(hidden:ArrayMapping<ScalarValue>, merge = false):this;


    /**
     * 设置需要输出的属性
     * @access public
     * @param  array $visible
     * @param  bool  $merge    是否合并
     * @return $this
     */
    visible(visible:ArrayMapping<ScalarValue>, merge = false):this;

    /**
     * 设置属性的映射输出
     * @access public
     * @param  array $map
     * @return $this
     */
    mapping(map:ArrayMapping<ScalarValue>):this;


    /**
     * 转换当前模型对象为数组
     * @access public
     * @return array
     */
    @Alias(toArray)
    toValue(): ArrayMapping<ScalarValue>;
   
    /**
     * 转换当前模型对象为JSON字符串
     * @access public
     * @param  integer $options json参数
     * @return string
     */
    toJson(options?:number): string;

    /**
     * 转换数据集为数据集对象
     * @access public
     * @param  array|Collection $collection 数据集
     * @param  string           $resultSetType 数据集类
     * @return Collection
     */
    toCollection(collection:array|Collection<T>, resultSetType?:class<any> ): Collection<T>


}

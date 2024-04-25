package server.model.concern;

/**
 * 模型数据处理
 */
declare interface Attribute{

    /**
     * 获取模型对象的主键
     * @access public
     * @return string|array
     */
    getPk():string | string[];


    /**
     * 获取模型对象的主键值
     * @access public
     * @return mixed
     */
    getKey():string | null;

    /**
     * 设置允许写入的字段
     * @access public
     * @param  array $field 允许写入的字段
     * @return $this
     */
    allowField(field:string | string[]):this;

    /**
     * 设置只读字段
     * @access public
     * @param  array $field 只读字段
     * @return $this
     */
    readOnly(field:string|string[]):this;

    /**
     * 设置数据对象值
     * @access public
     * @param  array    $data  数据
     * @param  bool     $set   是否调用修改器
     * @param  array    $allow 允许的字段名
     * @return $this
     */
    data(data:ArrayMapping<ScalarValue>, set?:boolean, allow?:string[]):this;

    /**
     * 批量追加数据对象值
     * @access public
     * @param  array $data  数据
     * @param  bool  $set   是否需要进行数据处理
     * @return $this
     */
    appendData(data:ArrayMapping<ScalarValue>, set:boolean = false):this;

    /**
     * 刷新对象原始数据（为当前数据）
     * @access public
     * @return $this
     */
    refreshOrigin():this;


    /**
     * 获取对象原始数据 如果不存在指定字段返回null
     * @access public
     * @param  string $name 字段名 留空获取全部
     * @return mixed
     */
    getOrigin(name?:string):any

    /**
     * 获取当前对象数据 如果不存在指定字段返回false
     * @access public
     * @param  string $name 字段名 留空获取全部
     * @return mixed
     * @throws InvalidArgumentException
     */
    getData(name?:string):any

    /**
     * 获取变化的数据 并排除只读数据
     * @access public
     * @return array
     */
    getChangedData(): ArrayMapping<ScalarValue>

    /**
     * 直接设置数据对象值
     * @access public
     * @param  string $name  属性名
     * @param  mixed  $value 值
     * @return void
     */
    set(name:string, value:ScalarValue): void

    /**
     * 通过修改器 批量设置数据对象值
     * @access public
     * @param  array $data  数据
     * @return void
     */
    setAttrs(data:ArrayMapping<ScalarValue>): void


    /**
     * 通过修改器 设置数据对象值
     * @access public
     * @param  string $name  属性名
     * @param  mixed  $value 属性值
     * @param  array  $data  数据
     * @return void
     */
    setAttr(name:string, value:ScalarValue, data?:ArrayMapping<ScalarValue>): void
    
   
    /**
     * 获取器 获取数据对象的值
     * @access public
     * @param  string $name 名称
     * @return mixed
     * @throws InvalidArgumentException
     */
     getAttr<T>(name:string):T;
    

    /**
     * 设置数据字段获取器
     * @access public
     * @param  string|array $name       字段名
     * @param  callable     $callback   闭包获取器
     * @return $this
     */
    withAttr(name:string | string[], callable?:(...args)=>any):this
}

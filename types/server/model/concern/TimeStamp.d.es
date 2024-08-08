package server.model.concern;

/**
 * 自动时间戳
 */
declare interface  TimeStamp
{
    /**
     * 创建时间字段 false表示关闭
     * @var false|string
     */
    protected createTime:string = 'create_time';

    /**
     * 更新时间字段 false表示关闭
     * @var false|string
     */
    protected updateTime:string = 'update_time';

    /**
     * 时间字段显示格式
     * @var string
     */
    protected dateFormat:string;

    /**
     * 是否需要自动写入时间字段
     * @access public
     * @param  bool|string $auto
     * @return $this
     */
    isAutoWriteTimestamp(auto:boolean|string):this;


    /**
     * 检测时间字段的实际类型
     * @access public
     * @param  bool|string $type
     * @return mixed
     */
    protected checkTimeFieldType(type:boolean|string):string | null

    /**
     * 设置时间字段名称
     * @access public
     * @param  string $createTime
     * @param  string $updateTime
     * @return $this
     */
    setTimeField(createTime:string, updateTime:string):this;

    /**
     * 获取自动写入时间字段
     * @access public
     * @return bool|string
     */
    getAutoWriteTimestamp():boolean|string;

    /**
     * 设置时间字段格式化
     * @access public
     * @param  string|false $format
     * @return $this
     */
    setDateFormat(format:string|boolean):this;

    /**
     * 获取自动写入时间字段
     * @access public
     * @return string|false
     */
    getDateFormat():boolean|string;

    /**
     * 自动写入时间戳
     * @access protected
     * @return mixed
     */
    protected autoWriteTimestamp():string|boolean;


    /**
     * 获取指定类型的时间字段值
     * @access protected
     * @param  string $type 时间字段类型
     * @return mixed
     */
    protected getTimeTypeValue(type:string):string|number;
    
    /**
     * 时间日期字段格式化处理
     * @access protected
     * @param  mixed $format    日期格式
     * @param  mixed $time      时间日期表达式
     * @param  bool  $timestamp 时间表达式是否为时间戳
     * @return mixed
     */
    protected formatDateTime(format:string, time:string = 'now', timestamp:boolean = false):string|null
    

    /**
     * 获取时间字段值
     * @access protected
     * @param  mixed   $value
     * @return mixed
     */
    protected getTimestampValue($value):string|null;
}

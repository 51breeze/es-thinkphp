package server.model.concern;

/**
 * 虚拟模型
 */
declare interface  Virtual
{
    /**
     * 获取字段类型信息
     * @access public
     * @param string $field 字段名
     * @return string|null
     */
    public getFieldType(field:string):string|null

    /**
     * 保存当前数据对象
     * @access public
     * @param array  $data     数据
     * @param string $sequence 自增序列名
     * @return bool
     */
    public save(data:Record, sequence?:string): boolean

    /**
     * 删除当前的记录
     * @access public
     * @return bool
     */
    public delete(): boolean
}

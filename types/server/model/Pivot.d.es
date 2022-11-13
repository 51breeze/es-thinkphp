package server.model;

import server.model.Model;

/**
 * 多对多中间表模型类
 */
declare class Pivot extends Model
{

    /**
     * 父模型
     * @var Model
     */
    public parent:Model;

    /**
     * 架构函数
     * @access public
     * @param array      $data   数据
     * @param Model|null $parent 上级模型
     * @param string     $table  中间数据表名
     */
    constructor(data:MappingType<ScalarValueType>, parent?:Model, table?:string);
}

package server.database.concern; 
    
/**
* 数据字段信息
*/
declare interface TableFieldInfo{

      /**
      * 获取数据表字段信息
      * @access public
      * @param string $tableName 数据表名
      * @return array
      */
      getTableFields(tableName:string): string[];

      /**
      * 获取详细字段类型信息
      * @access public
      * @param string $tableName 数据表名称
      * @return array
      */
      getFields(tableName:string): string[];

      /**
      * 获取字段类型信息
      * @access public
      * @return array
      */
      getFieldsType(): string[];

      /**
      * 获取字段类型信息
      * @access public
      * @param string $field 字段名
      * @return string|null
      */
      getFieldType(field:string):string|null

      /**
      * 获取字段类型信息
      * @access public
      * @return array
      */
      getFieldsBindType(): string[];

      /**
      * 获取字段类型信息
      * @access public
      * @param string $field 字段名
      * @return int
      */
      getFieldBindType(field:string): number
}
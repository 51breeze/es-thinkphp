package server.model;

import server.database.concern.WhereQuery;
import server.database.concern.WhereQueryFieldType;
import server.database.concern.BaseQuery;

import server.model.concern.Attribute;
import server.model.concern.RelationShip;
import server.model.concern.ModelEvent;
import server.model.concern.TimeStamp;
import server.model.concern.Conversion;

/**
* 模型基类，所有业务模型层都应该继承 Model 类
*/
@Define(type=model);
declare class Model implements Attribute,RelationShip,ModelEvent,TimeStamp,Conversion{

      protected name:string;
      protected table:string;
      protected suffix:string;
      protected pk:string;
      protected connection:string;
      protected query:string;
      protected field:string[];
      protected schema:array;
      protected select():Collection;
      protected checkData():Collection
      protected checkResult(result:any):void

      /**
      * 检查数据是否允许写入
      * @access protected
      * @return array
      */
      protected checkAllowFields(): string[];

      /**
      * 保存写入数据
      * @access protected
      * @return bool
      */
      protected updateData(): boolean

      /**
      * 新增写入数据
      * @access protected
      * @param string $sequence 自增名
      * @return bool
      */
      protected insertData(sequence?:string): boolean

      /**
      * 调用反射执行模型方法 支持参数绑定
      * @access public
      * @param mixed $method
      * @param array $vars 参数
      * @return mixed
      */
      invoke<T>(method:()=>T, vars?:any[]):T;

      /**
      * 获取当前模型名称
      * @access public
      * @return string
      */
      getName(): string;

      /**
      * 创建新的模型实例
      * @access public
      * @param array $data       数据
      * @param mixed $where      更新条件
      * @param array $options    参数
      * @return Model
      */
      newInstance(data:array, where?:any, options?:array ): Model

      /**
      * 设置模型的更新条件
      * @access protected
      * @param mixed $where 更新条件
      * @return void
      */
      setUpdateWhere(where:string | {[key:string]:string|number}): void

      /**
      * 设置当前模型的数据库连接
      * @access public
      * @param string $connection 数据表连接标识
      * @return $this
      */
      setConnection(connection:string)


      /**
      * 获取当前模型的数据库连接标识
      * @access public
      * @return string
      */
      getConnection():string


      /**
      * 设置当前模型数据表的后缀
      * @access public
      * @param string $suffix 数据表后缀
      * @return $this
      */
      setSuffix(suffix:string)

      /**
      * 获取当前模型的数据表后缀
      * @access public
      * @return string
      */
      getSuffix(): string

      /**
      * 获取当前模型的数据库查询对象
      * @access public
      * @param array $scope 设置不使用的全局查询范围
      * @return Query
      */
      db(scope:[]):BaseQuery

      /**
      * 更新是否强制写入数据 而不做比较（亦可用于软删除的强制删除）
      * @access public
      * @param bool $force
      * @return $this
      */
      force(force?:boolean):this;

      /**
      * 判断force
      * @access public
      * @return bool
      */
      isForce(): boolean

      /**
      * 新增数据是否使用Replace
      * @access public
      * @param bool $replace
      * @return $this
      */
      replace(replace?:boolean):this;

      /**
      * 刷新模型数据
      * @access public
      * @param bool $relation 是否刷新关联数据
      * @return $this
      */
      refresh(relation?:boolean):this;

      /**
      * 设置数据是否存在
      * @access public
      * @param bool $exists
      * @return $this
      */
      exists(exists?:boolean):this;

      /**
      * 判断数据是否存在数据库
      * @access public
      * @return bool
      */
      isExists(): boolean

      /**
      * 判断模型是否为空
      * @access public
      * @return bool
      */
      isEmpty(): boolean

      /**
      * 延迟保存当前数据对象
      * @access public
      * @param array|bool $data 数据
      * @return void
      */
      lazySave(data?:array): void

      /**
      * 保存当前数据对象
      * @access public
      * @param array  $data     数据
      * @param string $sequence 自增序列名
      * @return bool
      */
      save( data?:array, sequence?:string ): boolean;

      /**
      * 获取当前的更新条件
      * @access public
      * @return mixed
      */
      getWhere():WhereQueryFieldType;

      /**
      * 保存多个数据到当前数据对象
      * @access public
      * @param iterable $dataSet 数据
      * @param boolean  $replace 是否自动识别更新和写入
      * @return Collection
      * @throws \Exception
      */
      saveAll(dataSet?:array,replace?:boolean):Collection;

      /**
      * 删除当前的记录
      * @access public
      * @return bool
      */
      delete(): boolean;

}

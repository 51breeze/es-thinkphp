package server.database.concern;

import server.model.Model;
import server.model.Relation;

/**
* 模型及关联查询
*/
declare interface ModelRelationQuery<T>{

      /**
      * 指定模型
      * @access public
      * @param Model $model 模型对象实例
      * @return $this
      */
      model(model:T):this


      /**
      * 获取当前的模型对象
      * @access public
      * @return Model|null
      */
      getModel():T|null;


      /**
      * 设置需要隐藏的输出属性
      * @access public
      * @param  array $hidden   属性列表
      * @return $this
      */
      hidden(hidden?:string[]):this


      /**
      * 设置需要输出的属性
      * @access public
      * @param  array $visible
      * @return $this
      */
      visible(visible?:string[]):this

      /**
      * 设置需要附加的输出属性
      * @access public
      * @param  array $append   属性列表
      * @return $this
      */
      append(append?:string[]):this


      /**
      * 添加查询范围
      * @access public
      * @param array|string|Closure $scope 查询范围定义
      * @param array                $args  参数
      * @return $this
      */
      scope(scope:string | string[] | ((target?:this,...args)=>void), ...args):this


      /**
      * 设置关联查询
      * @access public
      * @param array $relation 关联名称
      * @return $this
      */
      relation(relation:Record<string,string>):this

      /**
      * 使用搜索器条件搜索字段
      * @access public
      * @param string|array  $fields 搜索字段
      * @param mixed         $data   搜索数据
      * @param string        $prefix 字段前缀标识
      * @return $this
      */
      withSearch(fields:string|string[], data?:Record<string,string>, prefix?:string):this


      /**
      * 设置数据字段获取器
      * @access public
      * @param string|array  $name     字段名
      * @param callable      $callback 闭包获取器
      * @return $this
      */
      withAttr(name:string, callback:(...args)=>any):this
      withAttr(name:Record<(...args)=>any>):this

      /**
      * 关联预载入 In方式
      * @access public
      * @param array|string $with 关联方法名称
      * @return $this
      */
      with(withs:string|Record<(query?:this)=>any>):this;

      /**
      * 关联预载入 JOIN方式
      * @access protected
      * @param array|string $with     关联方法名
      * @param string       $joinType JOIN方式
      * @return $this
      */
      withJoin(withs:string|Record<(query?:this)=>any>, joinType?:string):this

      /**
      * 关联缓存
      * @access public
      * @param string|array|bool $relation 关联方法名
      * @param mixed             $key    缓存key
      * @param integer|\DateTime $expire 缓存有效期
      * @param string            $tag    缓存标签
      * @return $this
      */
      withCache(relation?:string|number|Record<string|number, string>|boolean, key?:any, expire?:string|number, tag?:string):this

      /**
      * 关联统计
      * @access public
      * @param string|array $relation 关联方法名
      * @param bool         $subQuery 是否使用子查询
      * @return $this
      */
      withCount(relation:string|Record<string>|string[], subQuery?:boolean):this

      /**
      * 关联统计Sum
      * @access public
      * @param string|array $relation 关联方法名
      * @param string       $field    字段
      * @param bool         $subQuery 是否使用子查询
      * @return $this
      */
      withSum(relation:string|Record<string>|string[], field:string, subQuery?:boolean):this

      /**
      * 关联统计Max
      * @access public
      * @param string|array $relation 关联方法名
      * @param string       $field    字段
      * @param bool         $subQuery 是否使用子查询
      * @return $this
      */
      withMax(relation:string|Record<string>|string[], field:string, subQuery?:boolean):this

      /**
      * 关联统计Min
      * @access public
      * @param string|array $relation 关联方法名
      * @param string       $field    字段
      * @param bool         $subQuery 是否使用子查询
      * @return $this
      */
      withMin(relation:string|Record<string>|string[], field:string, subQuery?:boolean):this

      /**
      * 关联统计Avg
      * @access public
      * @param string|array $relation 关联方法名
      * @param string       $field    字段
      * @param bool         $subQuery 是否使用子查询
      * @return $this
      */
      withAvg(relation:string|Record<string>|string[], field:string, subQuery?:boolean):this

      /**
      * 根据关联条件查询当前模型
      * @access public
      * @param  string  $relation 关联方法名
      * @param  mixed   $operator 比较操作符
      * @param  integer $count    个数
      * @param  string  $id       关联表的统计字段
      * @param  string  $joinType JOIN类型
      * @return $this
      */
      has(relation:string, operator='>=', count = 1, id = '*', joinType = ''):this

      /**
      * 根据关联条件查询当前模型
      * @access public
      * @param  string $relation 关联方法名
      * @param  mixed  $where    查询条件（数组或者闭包）
      * @param  mixed  $fields   字段
      * @param  string $joinType JOIN类型
      * @return $this
      */
      hasWhere(relation:string, where?:this|Record<string>|(query?:this)=>any, fields?:string, joinType?:string):this

}
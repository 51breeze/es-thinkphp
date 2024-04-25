package server.database.concern;

declare type WhereQueryExpressionType = '=' | '<>' | '<' | '<=' | '>' | '>=' | 'REGEXP' | 'NOT REGEXP' | 'regexp' | 'not regexp' | 'IN' | 'in';
declare type WhereQueryFieldValueType = string | number | null | server.database.Raw;
declare type WhereQueryFieldWrapType = [string, WhereQueryExpressionType, WhereQueryFieldValueType]
declare type WhereQueryFieldType = string | server.database.Raw | WhereQueryFieldWrapType[] | ArrayMapping<WhereQueryFieldValueType> | (query:BaseQuery)=>void;
declare type WhereQueryFieldQuickType = string;
declare type WhereQueryLogicType = 'AND' | 'OR' | 'XOR' | 'and' | 'or' | 'xor' ;
declare type WhereQueryTimeExpressionType = 'today' | 'yesterday' | 'week'  | 'last week' | 'month'  | 'last month' | 'year' | 'last year'
declare type WhereQueryTimeUnitType = 'day' | 'month' | 'year' | 'week' | 'hour' | 'minute' | 'second'

declare interface WhereQuery{

      /**
      * 指定AND查询条件
      * @access public
      * @param mixed $field     查询字段
      * @param mixed $op        查询表达式
      * @param mixed $condition 查询条件
      * @return $this
      */
      where(field:WhereQueryFieldType, op?:WhereQueryExpressionType, condition?:WhereQueryFieldValueType | WhereQueryFieldValueType[]):this;

      
      /**
      * 指定OR查询条件
      * @access public
      * @param mixed $field     查询字段
      * @param mixed $op        查询表达式
      * @param mixed $condition 查询条件
      * @return $this
      */
      whereOr(field:WhereQueryFieldType, op?:WhereQueryExpressionType, condition?:WhereQueryFieldValueType):this;
      

      /**
      * 指定XOR查询条件
      * @access public
      * @param mixed $field     查询字段
      * @param mixed $op        查询表达式
      * @param mixed $condition 查询条件
      * @return $this
      */
      whereXor(field:WhereQueryFieldType, op?:WhereQueryExpressionType, condition?:WhereQueryFieldValueType):this;
      

      /**
      * 指定Null查询条件
      * @access public
      * @param mixed  $field 查询字段
      * @param string $logic 查询逻辑 and or xor
      * @return $this
      */
      whereNull(field:WhereQueryFieldQuickType, logic?:WhereQueryLogicType):this;
      

      /**
      * 指定NotNull查询条件
      * @access public
      * @param mixed  $field 查询字段
      * @param string $logic 查询逻辑 and or xor
      * @return $this
      */
      whereNotNull(field:WhereQueryFieldQuickType, logic?:WhereQueryLogicType):this;


      /**
      * 指定Exists查询条件
      * @access public
      * @param mixed  $condition 查询条件
      * @param string $logic     查询逻辑 and or xor
      * @return $this
      */
      whereExists(condition:WhereQueryFieldQuickType, logic?:WhereQueryLogicType):this;


      /**
      * 指定NotExists查询条件
      * @access public
      * @param mixed  $condition 查询条件
      * @param string $logic     查询逻辑 and or xor
      * @return $this
      */
      whereNotExists(condition:WhereQueryFieldQuickType, logic?:WhereQueryLogicType):this;
      

      /**
      * 指定In查询条件
      * @access public
      * @param mixed  $field     查询字段
      * @param mixed  $condition 查询条件
      * @param string $logic     查询逻辑 and or xor
      * @return $this
      */
      whereIn(field:WhereQueryFieldQuickType, condition:WhereQueryFieldValueType, logic?:WhereQueryLogicType):this;
      
      /**
      * 指定NotIn查询条件
      * @access public
      * @param mixed  $field     查询字段
      * @param mixed  $condition 查询条件
      * @param string $logic     查询逻辑 and or xor
      * @return $this
      */
      whereNotIn(field:WhereQueryFieldQuickType, condition:WhereQueryFieldValueType, logic?:WhereQueryLogicType):this;
      

      /**
      * 指定Like查询条件
      * @access public
      * @param mixed  $field     查询字段
      * @param mixed  $condition 查询条件
      * @param string $logic     查询逻辑 and or xor
      * @return $this
      */
      whereLike(field:WhereQueryFieldQuickType, condition:WhereQueryFieldValueType, logic?:WhereQueryLogicType):this;
      

      /**
      * 指定NotLike查询条件
      * @access public
      * @param mixed  $field     查询字段
      * @param mixed  $condition 查询条件
      * @param string $logic     查询逻辑 and or xor
      * @return $this
      */
      whereNotLike(field:WhereQueryFieldQuickType, condition:WhereQueryFieldValueType, logic?:WhereQueryLogicType):this;

      /**
      * 指定Between查询条件
      * @access public
      * @param mixed  $field     查询字段
      * @param mixed  $condition 查询条件
      * @param string $logic     查询逻辑 and or xor
      * @return $this
      */
      whereBetween(field:WhereQueryFieldQuickType, condition:WhereQueryFieldValueType, logic?:WhereQueryLogicType):this;
      
      /**
      * 指定NotBetween查询条件
      * @access public
      * @param mixed  $field     查询字段
      * @param mixed  $condition 查询条件
      * @param string $logic     查询逻辑 and or xor
      * @return $this
      */
      whereNotBetween(field:WhereQueryFieldQuickType, condition:WhereQueryFieldValueType, logic?:WhereQueryLogicType):this;
      

      /**
      * 指定FIND_IN_SET查询条件
      * @access public
      * @param mixed  $field     查询字段
      * @param mixed  $condition 查询条件
      * @param string $logic     查询逻辑 and or xor
      * @return $this
      */
      whereFindInSet(field:WhereQueryFieldQuickType, condition:WhereQueryFieldValueType, logic?:WhereQueryLogicType):this;
      

      /**
      * 比较两个字段
      * @access public
      * @param string $field1   查询字段
      * @param string $operator 比较操作符
      * @param string $field2   比较字段
      * @param string $logic    查询逻辑 and or xor
      * @return $this
      */
      whereColumn(field:string, operator:WhereQueryExpressionType, field2:string, logic?:WhereQueryLogicType):this;


      /**
      * 设置软删除字段及条件
      * @access public
      * @param string $field     查询字段
      * @param mixed  $condition 查询条件
      * @return $this
      */
      useSoftDelete(field:string, condition?:WhereQueryFieldValueType):this;


      /**
      * 指定Exp查询条件
      * @access public
      * @param mixed  $field 查询字段
      * @param string $where 查询条件
      * @param array  $bind  参数绑定
      * @param string $logic 查询逻辑 and or xor
      * @return $this
      */
      whereExp(field:string, where:string, bind?:WhereQueryFieldValueType[], logic?:WhereQueryLogicType):this;

      /**
      * 指定字段Raw查询
      * @access public
      * @param string $field     查询字段表达式
      * @param mixed  $op        查询表达式
      * @param string $condition 查询条件
      * @param string $logic     查询逻辑 and or xor
      * @return $this
      */
      whereFieldRaw(field:string, op:WhereQueryExpressionType, condition:WhereQueryFieldValueType, logic?:WhereQueryLogicType):this;

      /**
      * 指定表达式查询条件
      * @access public
      * @param string $where 查询条件
      * @param array  $bind  参数绑定
      * @param string $logic 查询逻辑 and or xor
      * @return $this
      */
      whereRaw(where:string, bind?:WhereQueryFieldValueType[], logic?:WhereQueryLogicType):this;


      /**
      * 指定表达式查询条件 OR
      * @access public
      * @param string $where 查询条件
      * @param array  $bind  参数绑定
      * @return $this
      */
      whereOrRaw(where:string, bind?:WhereQueryFieldValueType[]):this;
      

      /**
      * 分析查询表达式
      * @access protected
      * @param string $logic     查询逻辑 and or xor
      * @param mixed  $field     查询字段
      * @param mixed  $op        查询表达式
      * @param mixed  $condition 查询条件
      * @param array  $param     查询参数
      * @param bool   $strict    严格模式
      * @return $this
      */
      parseWhereExp(logic:WhereQueryLogicType, field:WhereQueryFieldType, op:WhereQueryExpressionType, condition:WhereQueryFieldValueType, param?:[], strict?:boolean):this
      

      /**
      * 分析查询表达式
      * @access protected
      * @param string $logic     查询逻辑 and or xor
      * @param mixed  $field     查询字段
      * @param mixed  $op        查询表达式
      * @param mixed  $condition 查询条件
      * @param array  $param     查询参数
      * @return array
      */
      parseWhereItem(logic:WhereQueryLogicType, field:WhereQueryFieldType, op:WhereQueryExpressionType, condition:WhereQueryFieldValueType, param?:[]): array


      /**
      * 去除某个查询条件
      * @access public
      * @param string $field 查询字段
      * @param string $logic 查询逻辑 and or xor
      * @return $this
      */
      removeWhereField(field:string, logic:WhereQueryLogicType):this


      /**
      * 条件查询
      * @access public
      * @param mixed         $condition 满足条件（支持闭包）
      * @param Closure|array $query     满足条件后执行的查询表达式（闭包或数组）
      * @param Closure|array $otherwise 不满足条件后执行
      * @return $this
      */
      when(condition:((query:WhereQuery)=>any) | boolean, query:(()=>void) | WhereQueryFieldWrapType[], otherwise?:(()=>void) | WhereQueryFieldWrapType[]):this
}


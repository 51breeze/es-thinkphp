package server.database.concern;

declare type WhereQueryOperator =
      | '=' 
      | '<>' 
      | '<' 
      | '<=' 
      | '>' 
      | '>=' 
      | 'find in set' 
      | 'exp' 
      | 'regexp' 
      | 'null' 
      | 'in' 
      | 'like' 
      | 'exists' 
      | 'between' 
      | 'between time'
      | 'not regexp' 
      | 'not like' 
      | 'not in' 
      | 'not null' 
      | 'not exists' 
      | 'not between' 
      | 'not between' 
      | 'not between time'
      | '> time' 
      | '< time' 
      | '>= time' 
      | '<= time';
declare type WhereQueryLogic = 
      | 'and' 
      | 'or' 
      | 'xor' ;
declare type WhereQueryTime = 
      | 'today' 
      | 'yesterday' 
      | 'week'  
      | 'last week' 
      | 'month'  
      | 'last month' 
      | 'year' 
      | 'last year'
      | 'day' 
      | 'month' 
      | 'year' 
      | 'week' 
      | 'hour' 
      | 'minute' 
      | 'second';

declare type WhereQueryCallback = (query?:BaseQuery)=>void;
declare type WhereQueryField = string | server.database.Raw | WhereQueryCallback;
declare type WhereQueryValue = string | number | server.database.Raw;
declare type WhereQueryCondition = WhereQueryValue | WhereQueryCallback;
declare type WhereQueryFilter = [string, WhereQueryOperator, WhereQueryCondition | WhereQueryCondition[]];

declare interface WhereQuery{

      /**
      * 指定AND查询条件
      * @access public
      * @param mixed $field     查询字段
      * @param mixed $op        查询表达式
      * @param mixed $condition 查询条件
      * @return $this
      */
      where(field:string, op:WhereQueryOperator, condition:WhereQueryCondition | WhereQueryCondition[]):this;
      where(field:string, condition:WhereQueryCondition | WhereQueryCondition[]):this;
      where(field:Record<WhereQueryCondition, string>):this;
      where(field:WhereQueryFilter[]):this;
      where(field:WhereQueryFilter[][]):this;
      where(field:WhereQueryCallback):this;
      where(field:server.database.Raw):this;

      /**
      * 指定OR查询条件
      * @access public
      * @param mixed $field     查询字段
      * @param mixed $op        查询表达式
      * @param mixed $condition 查询条件
      * @return $this
      */
      whereOr(field:string, op:WhereQueryOperator, condition:WhereQueryCondition | WhereQueryCondition[]):this;
      whereOr(field:string, condition:WhereQueryCondition | WhereQueryCondition[]):this;
      whereOr(field:Record<WhereQueryCondition, string>):this;
      whereOr(field:WhereQueryFilter[]):this;
      whereOr(field:WhereQueryFilter[][]):this;
      whereOr(field:WhereQueryCallback):this;
      whereOr(field:server.database.Raw):this;
      
      /**
      * 指定XOR查询条件
      * @access public
      * @param mixed $field     查询字段
      * @param mixed $op        查询表达式
      * @param mixed $condition 查询条件
      * @return $this
      */
      whereXor(field:string, op:WhereQueryOperator, condition:WhereQueryCondition | WhereQueryCondition[]):this;
      whereXor(field:string, condition:WhereQueryCondition | WhereQueryCondition[]):this;
      whereXor(field:Record<WhereQueryCondition, string>):this;
      whereXor(field:WhereQueryFilter[]):this;
      whereXor(field:WhereQueryFilter[][]):this;
      whereXor(field:WhereQueryCallback):this;
      whereXor(field:server.database.Raw):this;
      
      /**
      * 指定Null查询条件
      * @access public
      * @param mixed  $field 查询字段
      * @param string $logic 查询逻辑 and or xor
      * @return $this
      */
      whereNull(field:string, logic?:WhereQueryLogic):this;

      /**
      * 指定NotNull查询条件
      * @access public
      * @param mixed  $field 查询字段
      * @param string $logic 查询逻辑 and or xor
      * @return $this
      */
      whereNotNull(field:string, logic?:WhereQueryLogic):this;


      /**
      * 指定Exists查询条件
      * @access public
      * @param mixed  $condition 查询条件
      * @param string $logic     查询逻辑 and or xor
      * @return $this
      */
      whereExists(condition:WhereQueryCondition, logic?:WhereQueryLogic):this;


      /**
      * 指定NotExists查询条件
      * @access public
      * @param mixed  $condition 查询条件
      * @param string $logic     查询逻辑 and or xor
      * @return $this
      */
      whereNotExists(condition:WhereQueryCondition, logic?:WhereQueryLogic):this;
      

      /**
      * 指定In查询条件
      * @access public
      * @param mixed  $field     查询字段
      * @param mixed  $condition 查询条件
      * @param string $logic     查询逻辑 and or xor
      * @return $this
      */
      whereIn(field:string, condition:WhereQueryCondition | WhereQueryValue[], logic?:WhereQueryLogic):this;
      
      /**
      * 指定NotIn查询条件
      * @access public
      * @param mixed  $field     查询字段
      * @param mixed  $condition 查询条件
      * @param string $logic     查询逻辑 and or xor
      * @return $this
      */
      whereNotIn(field:string, condition:WhereQueryCondition | WhereQueryValue[], logic?:WhereQueryLogic):this;
      

      /**
      * 指定Like查询条件
      * @access public
      * @param mixed  $field     查询字段
      * @param mixed  $condition 查询条件
      * @param string $logic     查询逻辑 and or xor
      * @return $this
      */
      whereLike(field:string, condition:WhereQueryCondition, logic?:WhereQueryLogic):this;
      

      /**
      * 指定NotLike查询条件
      * @access public
      * @param mixed  $field     查询字段
      * @param mixed  $condition 查询条件
      * @param string $logic     查询逻辑 and or xor
      * @return $this
      */
      whereNotLike(field:string, condition:WhereQueryCondition, logic?:WhereQueryLogic):this;

      /**
      * 指定Between查询条件
      * @access public
      * @param mixed  $field     查询字段
      * @param mixed  $condition 查询条件
      * @param string $logic     查询逻辑 and or xor
      * @return $this
      */
      whereBetween(field:string, condition:WhereQueryCondition | WhereQueryValue[], logic?:WhereQueryLogic):this;
      
      /**
      * 指定NotBetween查询条件
      * @access public
      * @param mixed  $field     查询字段
      * @param mixed  $condition 查询条件
      * @param string $logic     查询逻辑 and or xor
      * @return $this
      */
      whereNotBetween(field:string, condition:WhereQueryCondition | WhereQueryValue[], logic?:WhereQueryLogic):this;

      /**
      * 指定FIND_IN_SET查询条件
      * @access public
      * @param mixed  $field     查询字段
      * @param mixed  $condition 查询条件
      * @param string $logic     查询逻辑 and or xor
      * @return $this
      */
      whereFindInSet(field:string, condition:WhereQueryCondition, logic?:WhereQueryLogic):this;

      /**
      * 比较两个字段
      * @access public
      * @param string $field1   查询字段
      * @param string $operator 比较操作符
      * @param string $field2   比较字段
      * @param string $logic    查询逻辑 and or xor
      * @return $this
      */
      whereColumn(field:string, operator:WhereQueryOperator, field2:string, logic?:WhereQueryLogic):this;


      /**
      * 设置软删除字段及条件
      * @access public
      * @param string $field     查询字段
      * @param mixed  $condition 查询条件
      * @return $this
      */
      useSoftDelete(field:string, condition?:WhereQueryCondition):this;

      /**
      * 指定Exp查询条件
      * @access public
      * @param mixed  $field 查询字段
      * @param string $where 查询条件
      * @param array  $bind  参数绑定
      * @param string $logic 查询逻辑 and or xor
      * @return $this
      */
      whereExp(field:string, where:string, bind?:string | number[], logic?:WhereQueryLogic):this;

      /**
      * 指定字段Raw查询
      * @access public
      * @param string $field     查询字段表达式
      * @param mixed  $op        查询表达式
      * @param string $condition 查询条件
      * @param string $logic     查询逻辑 and or xor
      * @return $this
      */
      whereFieldRaw(field:string, op:WhereQueryOperator, condition:WhereQueryCondition, logic?:WhereQueryLogic):this;

      /**
      * 指定表达式查询条件
      * @access public
      * @param string $where 查询条件
      * @param array  $bind  参数绑定
      * @param string $logic 查询逻辑 and or xor
      * @return $this
      */
      whereRaw(where:string, bind?:string | number[], logic?:WhereQueryLogic):this;


      /**
      * 指定表达式查询条件 OR
      * @access public
      * @param string $where 查询条件
      * @param array  $bind  参数绑定
      * @return $this
      */
      whereOrRaw(where:string, bind?:string | number[]):this;
      

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
      parseWhereExp(logic:WhereQueryLogic, field:WhereQueryField, op:WhereQueryOperator, condition:WhereQueryCondition, param?:[], strict?:boolean):this
      

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
      parseWhereItem(logic:WhereQueryLogic, field:WhereQueryField, op:WhereQueryOperator, condition:WhereQueryCondition, param?:[]): array


      /**
      * 去除某个查询条件
      * @access public
      * @param string $field 查询字段
      * @param string $logic 查询逻辑 and or xor
      * @return $this
      */
      removeWhereField(field:string, logic:WhereQueryLogic):this


      /**
      * 条件查询
      * @access public
      * @param mixed         $condition 满足条件（支持闭包）
      * @param Closure|array $query     满足条件后执行的查询表达式（闭包或数组）
      * @param Closure|array $otherwise 不满足条件后执行
      * @return $this
      */
      when(condition:((query?:WhereQuery)=>any) | boolean, query:(()=>void) | WhereQueryFilter[], otherwise?:(()=>void) | WhereQueryFilter[]):this
}


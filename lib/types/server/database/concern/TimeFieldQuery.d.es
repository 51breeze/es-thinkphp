package server.database.concern;

/**
* 时间查询支持
*/
declare interface TimeFieldQuery{

      /**
      * 添加日期或者时间查询规则
      * @access public
      * @param array $rule 时间表达式
      * @return $this
      */
      timeRule(rule:{[key:string]:[string,string]}):this

      /**
      * 查询日期或者时间
      * @access public
      * @param string       $field 日期字段名
      * @param string       $op    比较运算符或者表达式
      * @param string|array $range 比较范围
      * @param string       $logic AND OR
      * @return $this
      */
      whereTime(field:string, op:WhereQueryOperator, range:string | [string,string], logic?:WhereQueryLogic):this

      /**
      * 查询某个时间间隔数据
      * @access public
      * @param string $field    日期字段名
      * @param string $start    开始时间
      * @param string $interval 时间间隔单位 day/month/year/week/hour/minute/second
      * @param int    $step     间隔
      * @param string $logic    AND OR
      * @return $this
      */
      whereTimeInterval(field:string, start:string, interval:WhereQueryTime, step?:int,  logic?:WhereQueryLogic ):this

      /**
      * 查询月数据 whereMonth('time_field', '2018-1')
      * @access public
      * @param string $field 日期字段名
      * @param string $month 月份信息
      * @param int    $step  间隔
      * @param string $logic AND OR
      * @return $this
      */
      whereMonth(field:string, month?:string, step?:int,  logic?:WhereQueryLogic):this

      /**
      * 查询周数据 whereWeek('time_field', '2018-1-1') 从2018-1-1开始的一周数据
      * @access public
      * @param string $field 日期字段名
      * @param string $week  周信息
      * @param int    $step  间隔
      * @param string $logic AND OR
      * @return $this
      */
      whereWeek(field:string, week?:string, step?:int, logic?:WhereQueryLogic):this

      /**
      * 查询年数据 whereYear('time_field', '2018')
      * @access public
      * @param string $field 日期字段名
      * @param string $year  年份信息
      * @param int    $step     间隔
      * @param string $logic AND OR
      * @return $this
      */
      whereYear(field:string, year?:string, step?:int, logic?:WhereQueryLogic):this

      /**
      * 查询日数据 whereDay('time_field', '2018-1-1')
      * @access public
      * @param string $field 日期字段名
      * @param string $day   日期信息
      * @param int    $step     间隔
      * @param string $logic AND OR
      * @return $this
      */
      whereDay(field:string, day?:string, step?:int, logic?:WhereQueryLogic):this

      /**
      * 查询日期或者时间范围 whereBetweenTime('time_field', '2018-1-1','2018-1-15')
      * @access public
      * @param string     $field     日期字段名
      * @param string|int $startTime 开始时间
      * @param string|int $endTime   结束时间
      * @param string     $logic     AND OR
      * @return $this
      */
      whereBetweenTime(field:string, startTime:string|number, endTime:string|number, logic?:WhereQueryLogic):this

      /**
      * 查询日期或者时间范围 whereNotBetweenTime('time_field', '2018-1-1','2018-1-15')
      * @access public
      * @param string     $field     日期字段名
      * @param string|int $startTime 开始时间
      * @param string|int $endTime   结束时间
      * @return $this
      */
      whereNotBetweenTime(field:string, startTime:string|number, endTime:string|number):this

      /**
      * 查询当前时间在两个时间字段范围 whereBetweenTimeField('start_time', 'end_time')
      * @access public
      * @param string $startField 开始时间字段
      * @param string $endField   结束时间字段
      * @return $this
      */
      whereBetweenTimeField(start:string, end:string):this

      /**
      * 查询当前时间不在两个时间字段范围 whereNotBetweenTimeField('start_time', 'end_time')
      * @access public
      * @param string $startField 开始时间字段
      * @param string $endField   结束时间字段
      * @return $this
      */
      whereNotBetweenTimeField(start:string, end:string):this

}
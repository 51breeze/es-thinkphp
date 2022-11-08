package server.database{

    import server.database.concern.BaseQuery;

    declare static class Db{
        static table( name:string ):BaseQuery;
        static name( name:string ):BaseQuery;
    }

    declare interface PDOStatement{}

    declare interface ConnectionInterface{

        /**
        * 获取当前连接器类对应的Query类
        * @access public
        * @return string
        */
        public getQueryClass(): string;

        /**
        * 指定表名开始查询
        * @param $table
        * @return BaseQuery
        */
        public table(table):BaseQuery

        /**
        * 指定表名开始查询(不带前缀)
        * @param $name
        * @return BaseQuery
        */
        public name(name):BaseQuery

        /**
        * 连接数据库方法
        * @access public
        * @param array   $config  接参数
        * @param integer $linkNum 连接序号
        * @return mixed
        */
        public connect(config:array = [], linkNum:int = 0);

        /**
        * 设置当前的数据库Db对象
        * @access public
        * @param DbManager $db
        * @return void
        */
        public setDb(db);

        /**
        * 设置当前的缓存对象
        * @access public
        * @param CacheInterface $cache
        * @return void
        */
        public setCache(cache);

        /**
        * 获取数据库的配置参数
        * @access public
        * @param string $config 配置名称
        * @return mixed
        */
        public getConfig(config:string = '');

        /**
        * 关闭数据库（或者重新连接）
        * @access public
        * @return $this
        */
        public close():this

        /**
        * 查找单条记录
        * @access public
        * @param BaseQuery $query 查询对象
        * @return array
        */
        public find(query:BaseQuery): array;

        /**
        * 查找记录
        * @access public
        * @param BaseQuery $query 查询对象
        * @return array
        */
        public select(query:BaseQuery): array;

        /**
        * 插入记录
        * @access public
        * @param BaseQuery   $query        查询对象
        * @param boolean $getLastInsID 返回自增主键
        * @return mixed
        */
        public insert(query:BaseQuery, getLastInsID:boolean = false);

        /**
        * 批量插入记录
        * @access public
        * @param BaseQuery   $query   查询对象
        * @param mixed   $dataSet 数据集
        * @return integer
        */
        public insertAll(query:BaseQuery, dataSet:array = []): int;

        /**
        * 更新记录
        * @access public
        * @param BaseQuery $query 查询对象
        * @return integer
        */
        public update(query:BaseQuery): int;

        /**
        * 删除记录
        * @access public
        * @param BaseQuery $query 查询对象
        * @return int
        */
        public delete(query:BaseQuery): int;

        /**
        * 得到某个字段的值
        * @access public
        * @param BaseQuery  $query   查询对象
        * @param string $field   字段名
        * @param mixed  $default 默认值
        * @return mixed
        */
        public value(query:BaseQuery, field:string, defaultValue:any = null);

        /**
        * 得到某个列的数组
        * @access public
        * @param BaseQuery  $query  查询对象
        * @param string|array $column 字段名 多个字段用逗号分隔
        * @param string $key    索引
        * @return array
        */
        public column(query:BaseQuery, column:string | array, key:string = ''): array;

        /**
        * 执行数据库事务
        * @access public
        * @param callable $callback 数据操作方法回调
        * @return mixed
        */
        public transaction(callback:()=>any);

        /**
        * 启动事务
        * @access public
        * @return void
        */
        public startTrans();

        /**
        * 用于非自动提交状态下面的查询提交
        * @access public
        * @return void
        */
        public commit();

        /**
        * 事务回滚
        * @access public
        * @return void
        */
        public rollback();

        /**
        * 获取最近一次查询的sql语句
        * @access public
        * @return string
        */
        public getLastSql(): string;

    }
}

package server.database.concern{

    declare type FindDataItemType = string | number;
    declare type FindDataType = FindDataItemType | FindDataItemType[];

    declare class BaseQuery{

        /**
        * 创建一个新的查询对象
        * @access public
        * @return BaseQuery
        */
        public newQuery(): BaseQuery
    
        /**
        * 获取当前的数据库Connection对象
        * @access public
        * @return ConnectionInterface
        */
        public getConnection():server.database.ConnectionInterface

        /**
        * 指定当前数据表名（不含前缀）
        * @access public
        * @param string $name 不含前缀的数据表名字
        * @return $this
        */
        public name(name:string):this

        /**
        * 获取当前的数据表名称
        * @access public
        * @return string
        */
        public getName(): string

        /**
        * 获取数据库的配置参数
        * @access public
        * @param string $name 参数名称
        * @return mixed
        */
        public getConfig( name:string = ''):any;

        /**
        * 得到当前或者指定名称的数据表
        * @access public
        * @param string $name 不含前缀的数据表名字
        * @return mixed
        */
        public getTable( name:string = ''):string | null

        /**
        * 设置字段类型信息
        * @access public
        * @param array $type 字段类型信息
        * @return $this
        */
        public setFieldType(type:array):this;


        /**
        * 获取最近一次查询的sql语句
        * @access public
        * @return string
        */
        public getLastSql(): string


        /**
        * 获取返回或者影响的记录数
        * @access public
        * @return integer
        */
        public getNumRows(): int

        /**
        * 获取最近插入的ID
        * @access public
        * @param string $sequence 自增序列名
        * @return mixed
        */
        public getLastInsID( sequence:string = null):any;


        /**
        * 得到某个字段的值
        * @access public
        * @param string $field   字段名
        * @param mixed  $default 默认值
        * @return mixed
        */
        public value(field:string, defaultValue:any = null):any;

        /**
        * 得到某个列的数组
        * @access public
        * @param string|array $field 字段名 多个字段用逗号分隔
        * @param string       $key   索引
        * @return array
        */
        public column(field, key:string = ''): array

        /**
        * 查询SQL组装 union
        * @access public
        * @param mixed   $union UNION
        * @param boolean $all   是否适用UNION ALL
        * @return $this
        */
        public union(union, all:boolean = false):this

        /**
        * 查询SQL组装 union all
        * @access public
        * @param mixed $union UNION数据
        * @return $this
        */
        public unionAll(union):this;

        /**
        * 指定查询字段
        * @access public
        * @param mixed $field 字段信息
        * @return $this
        */
        public field(field):this;

        /**
        * 指定要排除的查询字段
        * @access public
        * @param array|string $field 要排除的字段
        * @return $this
        */
        public withoutField(field):this

        /**
        * 指定其它数据表的查询字段
        * @access public
        * @param mixed   $field     字段信息
        * @param string  $tableName 数据表名
        * @param string  $prefix    字段前缀
        * @param string  $alias     别名前缀
        * @return $this
        */
        public tableField(field, tableName:string, prefix:string = '', alias:string = ''):this

        /**
        * 设置数据
        * @access public
        * @param array $data 数据
        * @return $this
        */
        public data(data:array):this

        /**
        * 去除查询参数
        * @access public
        * @param string $option 参数名 留空去除所有参数
        * @return $this
        */
        public removeOption( option:string = ''):this;

        /**
        * 指定查询数量
        * @access public
        * @param int $offset 起始位置
        * @param int $length 查询数量
        * @return $this
        */
        public limit(offset:int, length:int = null):this;

        /**
        * 指定分页
        * @access public
        * @param int $page     页数
        * @param int $listRows 每页数量
        * @return $this
        */
        public page(page:int, listRows:int = null):this;


        /**
        * 指定当前操作的数据表
        * @access public
        * @param mixed $table 表名
        * @return $this
        */
        public table($table):this;


        /**
        * 指定排序 order('id','desc') 或者 order(['id'=>'desc','create_time'=>'desc'])
        * @access public
        * @param string|array|Raw $field 排序字段
        * @param string           $order 排序
        * @return $this
        */
        public order(field, order:string = ''):this;


        /**
        * 分页查询
        * @access public
        * @param int|array $listRows 每页数量 数组表示配置参数
        * @param int|bool  $simple   是否简洁模式或者总记录数
        * @return Paginator
        * @throws Exception
        */
        public paginate(listRows:any = null, simple:boolean = false): server.components.Paginator
        

        /**
        * 根据数字类型字段进行分页查询（大数据）
        * @access public
        * @param int|array $listRows 每页数量或者分页配置
        * @param string    $key      分页索引键
        * @param string    $sort     索引键排序 asc|desc
        * @return Paginator
        * @throws Exception
        */
        public paginateX(listRows = null,  key:string = null, sort:string = null): server.components.Paginator

        /**
        * 根据最后ID查询更多N个数据
        * @access public
        * @param int        $limit  LIMIT
        * @param int|string $lastId LastId
        * @param string     $key    分页索引键 默认为主键
        * @param string     $sort   索引键排序 asc|desc
        * @return array
        * @throws Exception
        */
        public more(limit:int, lastId:int = null, key:string = null, sort:string = null): array
    

        /**
        * 查询缓存 数据为空不缓存
        * @access public
        * @param mixed             $key    缓存key
        * @param integer|\DateTime $expire 缓存有效期
        * @param string|array      $tag    缓存标签
        * @param bool              $always 始终缓存
        * @return $this
        */
        public cache(key:any = true, expire:int = null, tag:string|array = null, always:boolean = false):this;


        /**
        * 查询缓存 允许缓存空数据
        * @access public
        * @param mixed             $key    缓存key
        * @param integer|\DateTime $expire 缓存有效期
        * @param string|array      $tag    缓存标签
        * @return $this
        */
        public cacheAlways(key = true, expire = null, tag = null):this;

        /**
        * 指定查询lock
        * @access public
        * @param bool|string $lock 是否lock
        * @return $this
        */
        public lock(lock = false):this

        /**
        * 指定数据表别名
        * @access public
        * @param array|string $alias 数据表别名
        * @return $this
        */
        public alias(alias):this;


        /**
        * 设置从主服务器读取数据
        * @access public
        * @param bool $readMaster 是否从主服务器读取
        * @return $this
        */
        public master(readMaster:boolean = true):this;

        /**
        * 设置是否严格检查字段名
        * @access public
        * @param bool $strict 是否严格检查字段
        * @return $this
        */
        public strict( strict:boolean = true):this;

        /**
        * 设置自增序列名
        * @access public
        * @param string $sequence 自增序列名
        * @return $this
        */
        public sequence(sequence:string = null):this

        /**
        * 设置JSON字段信息
        * @access public
        * @param array $json  JSON字段
        * @param bool  $assoc 是否取出数组
        * @return $this
        */
        public json(json:array = [], assoc:boolean = false):this


        /**
        * 指定数据表主键
        * @access public
        * @param string|array $pk 主键
        * @return $this
        */
        public pk($pk):this
        /**
        * 查询参数批量赋值
        * @access protected
        * @param array $options 表达式参数
        * @return $this
        */
        protected options(options:array):this

        /**
        * 获取当前的查询参数
        * @access public
        * @param string $name 参数名
        * @return mixed
        */
        public getOptions(name = ''):any

        /**
        * 设置当前的查询参数
        * @access public
        * @param string $option 参数名
        * @param mixed  $value  参数值
        * @return $this
        */
        public setOption( option:string, value:any):this

        /**
        * 设置当前字段添加的表别名
        * @access public
        * @param string $via 临时表别名
        * @return $this
        */
        public via( via:string = ''):this

        /**
        * 保存记录 自动判断insert或者update
        * @access public
        * @param array $data        数据
        * @param bool  $forceInsert 是否强制insert
        * @return integer
        */
        public save( data:array = [],forceInsert:boolean = false):int


        /**
        * 插入记录
        * @access public
        * @param array   $data         数据
        * @param boolean $getLastInsID 返回自增主键
        * @return integer|string
        */
        public insert(data:array = [], getLastInsID:boolean=false):int | string


        /**
        * 插入记录并获取自增ID
        * @access public
        * @param array $data 数据
        * @return integer|string
        */
        public insertGetId(data:array):int | string

        /**
        * 批量插入记录
        * @access public
        * @param array   $dataSet 数据集
        * @param integer $limit   每次写入数据限制
        * @return integer
        */
        public insertAll( dataSet:array = [], limit:int = 0): int
    

        /**
        * 通过Select方式插入记录
        * @access public
        * @param array  $fields 要插入的数据表字段名
        * @param string $table  要插入的数据表名
        * @return integer
        */
        public selectInsert(fields:array, table:string): int

        /**
        * 更新记录
        * @access public
        * @param mixed $data 数据
        * @return integer
        * @throws Exception
        */
        public update( data:array = []): int
        

        /**
        * 删除记录
        * @access public
        * @param mixed $data 表达式 true 表示强制删除
        * @return int
        * @throws Exception
        */
        public delete(data = null): int
    

        /**
        * 查找记录
        * @access public
        * @param mixed $data 数据
        * @return Collection|array|static[]
        * @throws Exception
        * @throws ModelNotFoundException
        * @throws DataNotFoundException
        */
        public select(data = null): server.components.Collection
    

        /**
        * 查找单条记录
        * @access public
        * @param mixed $data 查询数据
        * @return array|Model|null|static|mixed
        * @throws Exception
        * @throws ModelNotFoundException
        * @throws DataNotFoundException
        */
        public find(data:FindDataType):any
    

        /**
        * 分析表达式（可用于查询或者写入操作）
        * @access public
        * @return array
        */
        public parseOptions(): array
        

        /**
        * 分析数据是否存在更新条件
        * @access public
        * @param array $data 数据
        * @return bool
        * @throws Exception
        */
        public parseUpdateData(data:array): boolean
    

        /**
        * 把主键值转换为查询条件 支持复合主键
        * @access public
        * @param array|string $data 主键数据
        * @return void
        * @throws Exception
        */
        public parsePkWhere(data:FindDataType): void
    

        /**
        * 获取模型的更新条件
        * @access protected
        * @param array $options 查询参数
        */
        protected getModelUpdateCondition(options:array):any;

    }

    /**
    * PDO数据查询类
    */
    declare class Query extends BaseQuery implements JoinAndViewQuery,JoinAndViewQuery{


        /**
        * 表达式方式指定Field排序
        * @access public
        * @param string $field 排序字段
        * @param array  $bind  参数绑定
        * @return $this
        */
        orderRaw(field:string, bind?:[]):this
        

        /**
        * 表达式方式指定查询字段
        * @access public
        * @param string $field 字段名
        * @return $this
        */
        fieldRaw(field:string):this
        

        /**
        * 指定Field排序 orderField('id',[1,2,3],'desc')
        * @access public
        * @param string $field  排序字段
        * @param array  $values 排序值
        * @param string $order  排序 desc/asc
        * @return $this
        */
        orderField(field:string, values:string|number[], order?:'desc'|'asc'):this
        
        /**
        * 随机排序
        * @access public
        * @return $this
        */
        orderRand():this
    
        /**
        * 使用表达式设置数据
        * @access public
        * @param string $field 字段名
        * @param string $value 字段值
        * @return $this
        */
        exp(field:string, value:string):this
    

        /**
        * 表达式方式指定当前操作的数据表
        * @access public
        * @param mixed $table 表名
        * @return $this
        */
        tableRaw(table:string):this
    

        /**
        * 获取执行的SQL语句而不进行实际的查询
        * @access public
        * @param bool $fetch 是否返回sql
        * @return $this|Fetch
        */
        fetchSql(fetch?:boolean):this
    

        /**
        * 批处理执行SQL语句
        * 批处理的指令都认为是execute操作
        * @access public
        * @param array $sql SQL批处理指令
        * @return bool
        */
        batchQuery(sql?:array): boolean
        

        /**
        * USING支持 用于多表删除
        * @access public
        * @param mixed $using USING
        * @return $this
        */
        using(using:any):this
        

        /**
        * 存储过程调用
        * @access public
        * @param bool $procedure 是否为存储过程查询
        * @return $this
        */
        procedure(procedure?:boolean):this
    

        /**
        * 指定group查询
        * @access public
        * @param string|array $group GROUP
        * @return $this
        */
        group(group:string|string[]):this
    

        /**
        * 指定having查询
        * @access public
        * @param string $having having
        * @return $this
        */
        having(having:string):this
    

        /**
        * 指定distinct查询
        * @access public
        * @param bool $distinct 是否唯一
        * @return $this
        */
        distinct(distinct?:boolean):this
        

        /**
        * 指定强制索引
        * @access public
        * @param string $force 索引名称
        * @return $this
        */
        force(force:string):this
    

        /**
        * 查询注释
        * @access public
        * @param string $comment 注释
        * @return $this
        */
        comment(comment:string):this
    

        /**
        * 设置是否REPLACE
        * @access public
        * @param bool $replace 是否使用REPLACE写入数据
        * @return $this
        */
        replace(replace?:boolean):this
    

        /**
        * 设置当前查询所在的分区
        * @access public
        * @param string|array $partition 分区名称
        * @return $this
        */
        partition(partition:string|string[]):this
    

        /**
        * 设置DUPLICATE
        * @access public
        * @param array|string|Raw $duplicate DUPLICATE信息
        * @return $this
        */
        duplicate(duplicate:array|string|Raw):this
    

        /**
        * 设置查询的额外参数
        * @access public
        * @param string $extra 额外信息
        * @return $this
        */
        extra(extra:string):this
    

        /**
        * 创建子查询SQL
        * @access public
        * @param bool $sub 是否添加括号
        * @return string
        * @throws Exception
        */
        buildSql(sub:boolean): string
    
        /**
        * 获取当前数据表的主键
        * @access public
        * @return string|array
        */
        getPk():string|array
    

        /**
        * 指定数据表自增主键
        * @access public
        * @param string $autoinc 自增键
        * @return $this
        */
        autoinc(autoinc:string):this;
    

        /**
        * 获取当前数据表的自增主键
        * @access public
        * @return string|null
        */
        getAutoInc():string|null
    

        /**
        * 字段值增长
        * @access public
        * @param string  $field    字段名
        * @param float   $step     增长值
        * @return $this
        */
        inc(field:string, step?:float):this;
    

        /**
        * 字段值减少
        * @access public
        * @param string  $field    字段名
        * @param float   $step     增长值
        * @return $this
        */
        dec(field:string, step?:float):this;
    

        /**
        * 获取当前的查询标识
        * @access public
        * @param mixed $data 要序列化的数据
        * @return string
        */
        getQueryGuid(data?): string
    

        /**
        * 执行查询但只返回PDOStatement对象
        * @access public
        * @return PDOStatement
        */
        getPdo(): server.database.PDOStatement
    
        /**
        * 使用游标查找记录
        * @access public
        * @param mixed $data 数据
        * @return \Generator
        */
        cursor(data?)
        

        /**
        * 分批数据返回处理
        * @access public
        * @param integer      $count    每次处理的数据数量
        * @param callable     $callback 处理回调方法
        * @param string|array $column   分批处理的字段名
        * @param string       $order    字段排序
        * @return bool
        * @throws Exception
        */
        chunk<T>(count:int, callable:(result:T[])=>void, column?:string|string[], order?:'asc'|'desc'): boolean
    }

}


package server.database.concern{
    declare type QueryWhereExpressionType = '=' | '<>' | '<' | '<=' | '>' | '>=' | 'REGEXP' | 'NOT REGEXP' | 'regexp' | 'not regexp';
    declare type QueryWhereFieldValueType = string | number | null | Raw;
    declare type QueryWhereFieldWrapType = [string, QueryWhereExpressionType, QueryWhereFieldValueType]
    declare type QueryWhereFieldType = string | Raw | QueryWhereFieldWrapType[] | (query:BaseQuery)=>void;
    declare type QueryWhereFieldQuickType = string;
    declare type QueryWhereLogicType = 'AND' | 'OR' | 'XOR' | 'and' | 'or' | 'xor' ;
    declare class Raw{
        constructor(value:string, bind?:[]);
        /**
        * 获取表达式
        *
        * @return string
        */
        getValue(): string
    
        /**
        * 获取参数绑定
        *
        * @return string
        */
        getBind(): array;
    }

    /**
    * 事务支持
    */
    declare interface Transaction{

        /**
        * 执行数据库Xa事务
        * @access public
        * @param  callable $callback 数据操作方法回调
        * @param  array    $dbs      多个查询对象或者连接对象
        * @return mixed
        * @throws PDOException
        * @throws \Exception
        * @throws \Throwable
        */
        transactionXa(callback:()=>void, dbs?:array):any;


        /**
        * 执行数据库事务
        * @access public
        * @param callable $callback 数据操作方法回调
        * @return mixed
        */
        transaction(callback:()=>void)

        /**
        * 启动事务
        * @access public
        * @return void
        */
        startTrans(): void

        /**
        * 用于非自动提交状态下面的查询提交
        * @access public
        * @return void
        * @throws PDOException
        */
        commit(): void


        /**
        * 事务回滚
        * @access public
        * @return void
        * @throws PDOException
        */
        rollback(): void

        /**
        * 启动XA事务
        * @access public
        * @param  string $xid XA事务id
        * @return void
        */
        startTransXa(xid:string): void


        /**
        * 预编译XA事务
        * @access public
        * @param  string $xid XA事务id
        * @return void
        */
        prepareXa(xid:string): void


        /**
        * 提交XA事务
        * @access public
        * @param  string $xid XA事务id
        * @return void
        */
        commitXa(xid:string): void


        /**
        * 回滚XA事务
        * @access public
        * @param  string $xid XA事务id
        * @return void
        */
        rollbackXa(xid:string): void

    }
    
    declare type QueryWhereTimeExpressionType = 'today' | 'yesterday' | 'week'  | 'last week' | 'month'  | 'last month' | 'year' | 'last year'
    declare type QueryWhereTimeUnitType = 'day' | 'month' | 'year' | 'week' | 'hour' | 'minute' | 'second'

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
        whereTime(field:string, op:QueryWhereExpressionType, range:string | [string,string], logic?:QueryWhereLogicType):this

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
        whereTimeInterval(field:string, start:string, interval:QueryWhereTimeUnitType, step?:int,  logic?:QueryWhereLogicType ):this

        /**
        * 查询月数据 whereMonth('time_field', '2018-1')
        * @access public
        * @param string $field 日期字段名
        * @param string $month 月份信息
        * @param int    $step  间隔
        * @param string $logic AND OR
        * @return $this
        */
        whereMonth(field:string, month?:string, step?:int,  logic?:QueryWhereLogicType):this

        /**
        * 查询周数据 whereWeek('time_field', '2018-1-1') 从2018-1-1开始的一周数据
        * @access public
        * @param string $field 日期字段名
        * @param string $week  周信息
        * @param int    $step  间隔
        * @param string $logic AND OR
        * @return $this
        */
        whereWeek(field:string, week?:string, step?:int, logic?:QueryWhereLogicType):this

        /**
        * 查询年数据 whereYear('time_field', '2018')
        * @access public
        * @param string $field 日期字段名
        * @param string $year  年份信息
        * @param int    $step     间隔
        * @param string $logic AND OR
        * @return $this
        */
        whereYear(field:string, year?:string, step?:int, logic?:QueryWhereLogicType):this

        /**
        * 查询日数据 whereDay('time_field', '2018-1-1')
        * @access public
        * @param string $field 日期字段名
        * @param string $day   日期信息
        * @param int    $step     间隔
        * @param string $logic AND OR
        * @return $this
        */
        whereDay(field:string, day?:string, step?:int, logic?:QueryWhereLogicType):this

        /**
        * 查询日期或者时间范围 whereBetweenTime('time_field', '2018-1-1','2018-1-15')
        * @access public
        * @param string     $field     日期字段名
        * @param string|int $startTime 开始时间
        * @param string|int $endTime   结束时间
        * @param string     $logic     AND OR
        * @return $this
        */
        whereBetweenTime(field:string, startTime:string|number, endTime:string|number, logic?:QueryWhereLogicType):this

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

    /**
    * 查询数据处理
    */
    declare interface ResultOperation{

        /**
        * 设置数据处理（支持模型）
        * @access public
        * @param callable $filter 数据处理Callable
        * @param string   $index  索引（唯一）
        * @return $this
        */
        filter(filter:(result:any[], option?)=>boolean, index?:string):this;

        /**
        * 是否允许返回空数据（或空模型）
        * @access public
        * @param bool $allowEmpty 是否允许为空
        * @return $this
        */
        allowEmpty(allowEmpty?:boolean):this;

        /**
        * 设置查询数据不存在是否抛出异常
        * @access public
        * @param bool $fail 数据不存在是否抛出异常
        * @return $this
        */
        failException(fail?:boolean):this;

        /**
        * 处理数据
        * @access protected
        * @param array $result 查询数据
        * @return void
        */
        protected result(result:any[]): void

        /**
        * 处理数据集
        * @access public
        * @param array $resultSet 数据集
        * @param bool  $toCollection 是否转为对象
        * @return void
        */
        protected resultSet(resultSet:any[], toCollection?:boolean): void

        /**
        * 使用获取器处理数据
        * @access protected
        * @param array $result   查询数据
        * @param array $withAttr 字段获取器
        * @return void
        */
        protected getResultAttr(result:any[], withAttr?:array): void

        /**
        * 处理空数据
        * @access protected
        * @return array|Model|null|static
        * @throws DbException
        * @throws ModelNotFoundException
        * @throws DataNotFoundException
        */
        protected resultToEmpty()

        /**
        * 查找单条记录 不存在返回空数据（或者空模型）
        * @access public
        * @param mixed $data 数据
        * @return array|Model|static|mixed
        */
        public findOrEmpty(data?:any)


        /**
        * JSON字段数据转换
        * @access protected
        * @param array $result 查询数据
        * @return void
        */
        protected jsonResult(result:array): void


        /**
        * 查询失败 抛出异常
        * @access protected
        * @return void
        * @throws ModelNotFoundException
        * @throws DataNotFoundException
        */
        protected throwNotFound(): void


        /**
        * 查找多条记录 如果不存在则抛出异常
        * @access public
        * @param array|string|Query|Closure $data 数据
        * @return array|Collection|static[]
        * @throws ModelNotFoundException
        * @throws DataNotFoundException
        */
        public selectOrFail(data?:any)


        /**
        * 查找单条记录 如果不存在则抛出异常
        * @access public
        * @param array|string|Query|Closure $data 数据
        * @return array|Model|static|mixed
        * @throws ModelNotFoundException
        * @throws DataNotFoundException
        */
        public findOrFail(data?:FindDataType|Query|(()=>any))

    }

    declare type JoinTableType = string | [] | Raw;
    declare type JoinTableBindType = string|number[];

        
    /**
    * JOIN和VIEW查询
    */
    declare interface JoinAndViewQuery{

        /**
        * 查询SQL组装 join
        * @access public
        * @param mixed  $join      关联的表名
        * @param mixed  $condition 条件
        * @param string $type      JOIN类型
        * @param array  $bind      参数绑定
        * @return $this
        */
        join(join:JoinTableType, condition?:string, type?:string, bind?:JoinTableBindType):this;
        

        /**
        * LEFT JOIN
        * @access public
        * @param mixed $join      关联的表名
        * @param mixed $condition 条件
        * @param array $bind      参数绑定
        * @return $this
        */
        leftJoin(join:JoinTableType, condition?:string, bind?:JoinTableBindType):this;
    
        /**
        * RIGHT JOIN
        * @access public
        * @param mixed $join      关联的表名
        * @param mixed $condition 条件
        * @param array $bind      参数绑定
        * @return $this
        */
        rightJoin(join:JoinTableType, condition?:string, bind?:JoinTableBindType):this;
    
        /**
        * FULL JOIN
        * @access public
        * @param mixed $join      关联的表名
        * @param mixed $condition 条件
        * @param array $bind      参数绑定
        * @return $this
        */
        fullJoin(join:JoinTableType, condition?:string, bind?:JoinTableBindType):this;
    
        /**
        * 指定JOIN查询字段
        * @access public
        * @param string|array $join  数据表
        * @param string|array $field 查询字段
        * @param string       $on    JOIN条件
        * @param string       $type  JOIN类型
        * @param array        $bind  参数绑定
        * @return $this
        */
        view(join:JoinTableType, field?:string|string[], on?:string, type?:string,  bind?:JoinTableBindType):this
    }
    
    /**
    * 聚合查询
    */
    declare interface AggregateQuery{
        /**
        * COUNT查询
        * @access public
        * @param string|Raw $field 字段名
        * @return int
        */
        count(field:string|Raw): int
    
        /**
        * SUM查询
        * @access public
        * @param string|Raw $field 字段名
        * @return float
        */
        sum(field:string|Raw): float

        /**
        * MIN查询
        * @access public
        * @param string|Raw $field 字段名
        * @param bool       $force 强制转为数字类型
        * @return mixed
        */
        min(field:string|Raw, force?:boolean)

        /**
        * MAX查询
        * @access public
        * @param string|Raw $field 字段名
        * @param bool       $force 强制转为数字类型
        * @return mixed
        */
        max(field:string|Raw, force?:boolean)

        /**
        * AVG查询
        * @access public
        * @param string|Raw $field 字段名
        * @return float
        */
        avg(field:string|Raw): float
    }
}



package server.database.concern{

    import server.database.concern.BaseQuery;

    declare class WhereQuery{

        /**
        * 指定AND查询条件
        * @access public
        * @param mixed $field     查询字段
        * @param mixed $op        查询表达式
        * @param mixed $condition 查询条件
        * @return $this
        */
        where(field:QueryWhereFieldType, op?:QueryWhereExpressionType, condition?:QueryWhereFieldValueType):this;
    

        /**
        * 解析Query对象查询条件
        * @access public
        * @param BaseQuery $query 查询对象
        * @return void
        */
        protected parseQueryWhere(query:BaseQuery): void
        
        /**
        * 指定OR查询条件
        * @access public
        * @param mixed $field     查询字段
        * @param mixed $op        查询表达式
        * @param mixed $condition 查询条件
        * @return $this
        */
        whereOr(field:QueryWhereFieldType, op?:QueryWhereExpressionType, condition?:QueryWhereFieldValueType):this;
        

        /**
        * 指定XOR查询条件
        * @access public
        * @param mixed $field     查询字段
        * @param mixed $op        查询表达式
        * @param mixed $condition 查询条件
        * @return $this
        */
        whereXor(field:QueryWhereFieldType, op?:QueryWhereExpressionType, condition?:QueryWhereFieldValueType):this;
        

        /**
        * 指定Null查询条件
        * @access public
        * @param mixed  $field 查询字段
        * @param string $logic 查询逻辑 and or xor
        * @return $this
        */
        whereNull(field:QueryWhereFieldQuickType, logic?:QueryWhereLogicType):this;
        

        /**
        * 指定NotNull查询条件
        * @access public
        * @param mixed  $field 查询字段
        * @param string $logic 查询逻辑 and or xor
        * @return $this
        */
        whereNotNull(field:QueryWhereFieldQuickType, logic?:QueryWhereLogicType):this;
    

        /**
        * 指定Exists查询条件
        * @access public
        * @param mixed  $condition 查询条件
        * @param string $logic     查询逻辑 and or xor
        * @return $this
        */
        whereExists(condition:QueryWhereFieldQuickType, logic?:QueryWhereLogicType):this;
    

        /**
        * 指定NotExists查询条件
        * @access public
        * @param mixed  $condition 查询条件
        * @param string $logic     查询逻辑 and or xor
        * @return $this
        */
        whereNotExists(condition:QueryWhereFieldQuickType, logic?:QueryWhereLogicType):this;
        

        /**
        * 指定In查询条件
        * @access public
        * @param mixed  $field     查询字段
        * @param mixed  $condition 查询条件
        * @param string $logic     查询逻辑 and or xor
        * @return $this
        */
        whereIn(field:QueryWhereFieldQuickType, condition:QueryWhereFieldValueType, logic?:QueryWhereLogicType):this;
        
        /**
        * 指定NotIn查询条件
        * @access public
        * @param mixed  $field     查询字段
        * @param mixed  $condition 查询条件
        * @param string $logic     查询逻辑 and or xor
        * @return $this
        */
        whereNotIn(field:QueryWhereFieldQuickType, condition:QueryWhereFieldValueType, logic?:QueryWhereLogicType):this;
        

        /**
        * 指定Like查询条件
        * @access public
        * @param mixed  $field     查询字段
        * @param mixed  $condition 查询条件
        * @param string $logic     查询逻辑 and or xor
        * @return $this
        */
        whereLike(field:QueryWhereFieldQuickType, condition:QueryWhereFieldValueType, logic?:QueryWhereLogicType):this;
        

        /**
        * 指定NotLike查询条件
        * @access public
        * @param mixed  $field     查询字段
        * @param mixed  $condition 查询条件
        * @param string $logic     查询逻辑 and or xor
        * @return $this
        */
        whereNotLike(field:QueryWhereFieldQuickType, condition:QueryWhereFieldValueType, logic?:QueryWhereLogicType):this;

        /**
        * 指定Between查询条件
        * @access public
        * @param mixed  $field     查询字段
        * @param mixed  $condition 查询条件
        * @param string $logic     查询逻辑 and or xor
        * @return $this
        */
        whereBetween(field:QueryWhereFieldQuickType, condition:QueryWhereFieldValueType, logic?:QueryWhereLogicType):this;
        
        /**
        * 指定NotBetween查询条件
        * @access public
        * @param mixed  $field     查询字段
        * @param mixed  $condition 查询条件
        * @param string $logic     查询逻辑 and or xor
        * @return $this
        */
        whereNotBetween(field:QueryWhereFieldQuickType, condition:QueryWhereFieldValueType, logic?:QueryWhereLogicType):this;
        

        /**
        * 指定FIND_IN_SET查询条件
        * @access public
        * @param mixed  $field     查询字段
        * @param mixed  $condition 查询条件
        * @param string $logic     查询逻辑 and or xor
        * @return $this
        */
        whereFindInSet(field:QueryWhereFieldQuickType, condition:QueryWhereFieldValueType, logic?:QueryWhereLogicType):this;
        

        /**
        * 比较两个字段
        * @access public
        * @param string $field1   查询字段
        * @param string $operator 比较操作符
        * @param string $field2   比较字段
        * @param string $logic    查询逻辑 and or xor
        * @return $this
        */
        whereColumn(field:string, operator:QueryWhereExpressionType, field2:string, logic?:QueryWhereLogicType):this;
    

        /**
        * 设置软删除字段及条件
        * @access public
        * @param string $field     查询字段
        * @param mixed  $condition 查询条件
        * @return $this
        */
        useSoftDelete(field:string, condition?:QueryWhereFieldValueType):this;
    

        /**
        * 指定Exp查询条件
        * @access public
        * @param mixed  $field 查询字段
        * @param string $where 查询条件
        * @param array  $bind  参数绑定
        * @param string $logic 查询逻辑 and or xor
        * @return $this
        */
        whereExp(field:string, where:string, bind?:QueryWhereFieldValueType[], logic?:QueryWhereLogicType):this;
    
        /**
        * 指定字段Raw查询
        * @access public
        * @param string $field     查询字段表达式
        * @param mixed  $op        查询表达式
        * @param string $condition 查询条件
        * @param string $logic     查询逻辑 and or xor
        * @return $this
        */
        whereFieldRaw(field:string, op:QueryWhereExpressionType, condition:QueryWhereFieldValueType, logic?:QueryWhereLogicType):this;
    
        /**
        * 指定表达式查询条件
        * @access public
        * @param string $where 查询条件
        * @param array  $bind  参数绑定
        * @param string $logic 查询逻辑 and or xor
        * @return $this
        */
        whereRaw(where:string, bind?:QueryWhereFieldValueType[], logic?:QueryWhereLogicType):this;
    

        /**
        * 指定表达式查询条件 OR
        * @access public
        * @param string $where 查询条件
        * @param array  $bind  参数绑定
        * @return $this
        */
        whereOrRaw(where:string, bind?:QueryWhereFieldValueType[]):this;
        

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
        parseWhereExp(logic:QueryWhereLogicType, field:QueryWhereFieldType, op:QueryWhereExpressionType, condition:QueryWhereFieldValueType, param?:[], strict?:boolean):this
        

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
        parseWhereItem(logic:QueryWhereLogicType, field:QueryWhereFieldType, op:QueryWhereExpressionType, condition:QueryWhereFieldValueType, param?:[]): array
    

        /**
        * 相等查询的主键处理
        * @access protected
        * @param string $field 字段名
        * @param mixed  $value 字段值
        * @return array
        */
        protected whereEq(field:string, value:QueryWhereFieldValueType): array
    
        /**
        * 数组批量查询
        * @access protected
        * @param array  $field 批量查询
        * @param string $logic 查询逻辑 and or xor
        * @return $this
        */
        protected parseArrayWhereItems(field:{[key:string]:QueryWhereFieldValueType}[], logic:QueryWhereLogicType):this
    

        /**
        * 去除某个查询条件
        * @access public
        * @param string $field 查询字段
        * @param string $logic 查询逻辑 and or xor
        * @return $this
        */
        removeWhereField(field:string, logic:QueryWhereLogicType):this
    

        /**
        * 条件查询
        * @access public
        * @param mixed         $condition 满足条件（支持闭包）
        * @param Closure|array $query     满足条件后执行的查询表达式（闭包或数组）
        * @param Closure|array $otherwise 不满足条件后执行
        * @return $this
        */
        when(condition:((query:WhereQuery)=>any) | boolean, query:(()=>void) | QueryWhereFieldWrapType[], otherwise?:(()=>void) | QueryWhereFieldWrapType[]):this
    }
   
}

package server.components{

     declare class Collection{

        constructor(items:array = []);

        public isEmpty(): boolean

        public  toArray(): array

        public all(): array

        /**
        * 合并数组
        *
        * @access public
        * @param mixed $items 数据
        * @return static
        */
        public merge(items:any):this

        /**
        * 按指定键整理数据
        *
        * @access public
        * @param mixed  $items    数据
        * @param string $indexKey 键名
        * @return array
        */
        public dictionary(items?:any, indexKey?:string):array

        /**
        * 比较数组，返回差集
        *
        * @access public
        * @param mixed  $items    数据
        * @param string $indexKey 指定比较的键名
        * @return static
        */
        public diff(items:any, indexKey?:string):this

        /**
        * 比较数组，返回交集
        *
        * @access public
        * @param mixed  $items    数据
        * @param string $indexKey 指定比较的键名
        * @return static
        */
        public intersect(items:any, indexKey?:string):this;

        /**
        * 交换数组中的键和值
        *
        * @access public
        * @return static
        */
        public flip():this;

        /**
        * 返回数组中所有的键名
        *
        * @access public
        * @return static
        */
        public keys():this;

        /**
        * 返回数组中所有的值组成的新 Collection 实例
        * @access public
        * @return static
        */
        public values():this

        /**
        * 删除数组的最后一个元素（出栈）
        *
        * @access public
        * @return mixed
        */
        public pop():any;

        /**
        * 通过使用用户自定义函数，以字符串返回数组
        *
        * @access public
        * @param callable $callback 调用方法
        * @param mixed    $initial
        * @return mixed
        */
        public reduce( callback:()=>any, initial?:any):array;

        /**
        * 以相反的顺序返回数组。
        *
        * @access public
        * @return static
        */
        public reverse():this

        /**
        * 删除数组中首个元素，并返回被删除元素的值
        *
        * @access public
        * @return mixed
        */
        public shift():any

        /**
        * 在数组结尾插入一个元素
        * @access public
        * @param mixed  $value 元素
        * @param string $key   KEY
        * @return $this
        */
        public push(value:any, key?:string):this

        /**
        * 把一个数组分割为新的数组块.
        *
        * @access public
        * @param int  $size 块大小
        * @param bool $preserveKeys
        * @return static
        */
        public chunk(size:int, preserveKeys:boolean = false):this

        /**
        * 在数组开头插入一个元素
        * @access public
        * @param mixed  $value 元素
        * @param string $key   KEY
        * @return $this
        */
        public unshift(value:any, key?:string):this

        /**
        * 给每个元素执行个回调
        *
        * @access public
        * @param callable $callback 回调
        * @return $this
        */
        public each(callback:()=>void):this

        /**
        * 用回调函数处理数组中的元素
        * @access public
        * @param callable|null $callback 回调
        * @return static
        */
        public map( callback:()=>any ):this


        /**
        * 用回调函数过滤数组中的元素
        * @access public
        * @param callable|null $callback 回调
        * @return static
        */
        public filter( callback?:()=>boolean ):this

        /**
        * 根据字段条件过滤数组中的元素
        * @access public
        * @param string $field    字段名
        * @param mixed  $operator 操作符
        * @param mixed  $value    数据
        * @return static
        */
        public where(field:string, operator:string='', value:any = null);

    }

    declare class Paginator{

        /**
        * 获取数据总条数
        * @return int
        */
        public total(): int

        /**
        * 获取每页数量
        * @return int
        */
        public listRows(): int

        /**
        * 获取当前页页码
        * @return int
        */
        public currentPage(): int

        /**
        * 获取最后一页页码
        * @return int
        */
        public lastPage(): int

        /**
        * 数据是否足够分页
        * @access public
        * @return bool
        */
        public hasPages(): boolean

        /**
        * 创建一组分页链接
        *
        * @access public
        * @param int $start
        * @param int $end
        * @return array
        */
        public getUrlRange(start:int, end:int): array

        /**
        * 设置URL锚点
        *
        * @access public
        * @param string|null $fragment
        * @return $this
        */
        public fragment( fragment:string = null):this;
        
        /**
        * 添加URL参数
        *
        * @access public
        * @param array $append
        * @return $this
        */
        public appends(append:array):this;

        /**
        * 构造锚点字符串
        *
        * @access public
        * @return string
        */
        protected buildFragment(): string

        public items():any;

        /**
        * 获取数据集
        *
        * @return Collection|\think\model\Collection
        */
        public getCollection():Collection

        public isEmpty(): boolean

        /**
        * 给每个元素执行个回调
        *
        * @access public
        * @param callable $callback
        * @return $this
        */
        public each(callback:()=>void)
    

        /**
        * 统计数据集条数
        * @return int
        */
        public count(): int

        /**
        * 转换为数组
        * @return array
        */
        public toArray(): array

    }

}

package server.http{

    declare static class Session{

        /**
        * 设置数据
        * @access public
        * @param array $data
        * @return void
        */
        setData(data:array): void


        /**
        * session初始化
        * @access public
        * @return void
        */
        init():void

        /**
        * 设置SessionName
        * @access public
        * @param string $name session_name
        * @return void
        */
        setName(name:string):void

        /**
        * 获取sessionName
        * @access public
        * @return string
        */
        getName():string


        /**
        * session_id设置
        * @access public
        * @param string $id session_id
        * @return void
        */
        setId(id:string): void


        /**
        * 获取session_id
        * @access public
        * @return string
        */
        getId(): string

        /**
        * 获取所有数据
        * @return array
        */
        all(): array

        /**
        * session设置
        * @access public
        * @param string $name  session名称
        * @param mixed  $value session值
        * @return void
        */
        set(name:string, value:any): void

        /**
        * session获取
        * @access public
        * @param string $name    session名称
        * @param mixed  $default 默认值
        * @return mixed
        */
        get<T>(name:string, default?:T):T

        /**
        * session获取并删除
        * @access public
        * @param string $name session名称
        * @return mixed
        */
        pull(name:string)

        /**
        * 添加数据到一个session数组
        * @access public
        * @param string $key
        * @param mixed  $value
        * @return void
        */
        push(key:string, value:any): void


        /**
        * 判断session数据
        * @access public
        * @param string $name session名称
        * @return bool
        */
        has(name:string): boolean

        /**
        * 删除session数据
        * @access public
        * @param string $name session名称
        * @return void
        */
        delete(name:string): void

        /**
        * 清空session数据
        * @access public
        * @return void
        */
        clear(): void

        /**
        * 销毁session
        */
        destroy(): void

        /**
        * 重新生成session id
        * @param bool $destroy
        */
        regenerate(destroy:boolean = false): void

        /**
        * 保存session数据
        * @access public
        * @return void
        */
        save(): void

        /**
        * session设置 下一次请求有效
        * @access public
        * @param string $name  session名称
        * @param mixed  $value session值
        * @return void
        */
        flash(name:string, value:any): void

        /**
        * 将本次闪存数据推迟到下次请求
        *
        * @return void
        */
        reflash(): void

        /**
        * 清空当前请求的session数据
        * @access public
        * @return void
        */
        clearFlashData(): void

    }

    declare class Request{

        /**
        * 获取当前包含协议的域名
        * @access public
        * @param  bool $port 是否需要去除端口号
        * @return string
        */
        domain(port?:boolean):string;

        /**
        * 获取当前根域名
        * @access public
        * @return string
        */
        rootDomain():string;

        /**
        * 获取当前子域名
        * @access public
        * @return string
        */
        subDomain():string;

        /**
        * 获取当前泛域名的值
        * @access public
        * @return string
        */
        panDomain():string;

        /**
        * 设置当前包含协议的域名
        * @access public
        * @param  string $domain 域名
        * @return $this
        */
        setDomain(domain:string)

         /**
        * 设置当前泛域名的值
        * @access public
        * @param  string $domain 域名
        * @return $this
        */
        setSubDomain(domain:string):string;

        /**
        * 设置当前泛域名的值
        * @access public
        * @param  string $domain 域名
        * @return $this
        */
        setPanDomain(domain:string):string;

        /**
        * 获取当前完整URL 包括QUERY_STRING
        * @access public
        * @param  bool $complete 是否包含完整域名
        * @return string
        */
        url(complete:boolean):string;

        /**
        * 设置当前完整URL 包括QUERY_STRING
        * @access public
        * @param  string $url URL地址
        * @return $this
        */
        setUrl(url:string):this;

        /**
        * 设置当前URL 不含QUERY_STRING
        * @access public
        * @param  string $url URL地址
        * @return $this
        */
        setBaseUrl(url:string):this;


         /**
        * 获取当前请求的参数
        * @access public
        * @param  string|array $name 变量名
        * @param  mixed        $default 默认值
        * @param  string|array $filter 过滤方法
        * @return mixed
        */
        param<T>(name:string, defaultValue?:T, filter?:string | array):T

        /**
        * 获取包含文件在内的请求参数
        * @access public
        * @param  string|array $name 变量名
        * @param  string|array $filter 过滤方法
        * @return mixed
        */
        all<T>(name?:string, filter?:string | array):T

         /**
        * 获取POST参数
        * @access public
        * @param  string|array $name 变量名
        * @param  mixed        $default 默认值
        * @param  string|array $filter 过滤方法
        * @return mixed
        */
        post<T>(name?:string, defaultValue?:T, filter?:string | array):T


        /**
        * 获取当前URL 不含QUERY_STRING
        * @access public
        * @param  bool complete 是否包含完整域名
        * @return string
        */
        public  baseUrl(complete?:boolean): string

        /**
        * 获取当前执行的文件 SCRIPT_NAME
        * @access public
        * @param  bool complete 是否包含完整域名
        * @return string
        */
        public  baseFile(complete?:boolean): string

        /**
        * 设置URL访问根地址
        * @access public
        * @param  string url URL地址
        * @return this
        */
        public  setRoot(url:string):this

        /**
        * 获取URL访问根地址
        * @access public
        * @param  bool complete 是否包含完整域名
        * @return string
        */
        public  root(complete?:boolean): string

        /**
        * 获取URL访问根目录
        * @access public
        * @return string
        */
        public  rootUrl(): string

        /**
        * 设置当前请求的pathinfo
        * @access public
        * @param  string pathinfo
        * @return this
        */
        public  setPathinfo(pathinfo:string):this

        /**
        * 获取当前请求URL的pathinfo信息（含URL后缀）
        * @access public
        * @return string
        */
        public  pathinfo(): string

        /**
        * 当前URL的访问后缀
        * @access public
        * @return string
        */
        public  ext(): string

        /**
        * 获取当前请求的时间
        * @access public
        * @param  bool float 是否使用浮点类型
        * @return integer|float
        */
        public  time(float?:boolean)

        /**
        * 当前请求的资源类型
        * @access public
        * @return string
        */
        public  type(): string

        /**
        * 设置资源类型
        * @access public
        * @param  string|array type 资源类型名
        * @param  string       val 资源类型
        * @return void
        */
        public  mimeType(type:string|array , val?:string): void

        /**
        * 设置请求类型
        * @access public
        * @param  string method 请求类型
        * @return this
        */
        public  setMethod(method:string):this

        /**
        * 当前的请求类型
        * @access public
        * @param  bool origin 是否获取原始请求类型
        * @return string
        */
        public  method(origin?:boolean): string

        /**
        * 是否为GET请求
        * @access public
        * @return bool
        */
        public  isGet(): boolean

        /**
        * 是否为POST请求
        * @access public
        * @return bool
        */
        public  isPost(): boolean

        /**
        * 是否为PUT请求
        * @access public
        * @return bool
        */
        public  isPut(): boolean

        /**
        * 是否为DELTE请求
        * @access public
        * @return bool
        */
        public  isDelete(): boolean

        /**
        * 是否为HEAD请求
        * @access public
        * @return bool
        */
        public  isHead(): boolean

        /**
        * 是否为PATCH请求
        * @access public
        * @return bool
        */
        public  isPatch(): boolean

        /**
        * 是否为OPTIONS请求
        * @access public
        * @return bool
        */
        public  isOptions(): boolean

        /**
        * 是否为cli
        * @access public
        * @return bool
        */
        public  isCli(): boolean

        /**
        * 是否为cgi
        * @access public
        * @return bool
        */
        public  isCgi(): boolean

        /**
        * 设置路由变量
        * @access public
        * @param  Rule rule 路由对象
        * @return this
        */
        public  setRule(rule:any):this

        /**
        * 获取当前路由对象
        * @access public
        * @return Rule|null
        */
        public  rule()

        /**
        * 设置路由变量
        * @access public
        * @param  array route 路由变量
        * @return this
        */
        public  setRoute(route:array):this

        /**
        * 获取路由参数
        * @access public
        * @param  string|array name 变量名
        * @param  mixed        default 默认值
        * @param  string|array filter 过滤方法
        * @return mixed
        */
        public  route(name?:string, default?:any, filter?:string|array)

        /**
        * 获取GET参数
        * @access public
        * @param  string|array name 变量名
        * @param  mixed        default 默认值
        * @param  string|array filter 过滤方法
        * @return mixed
        */
        public  get(name?:string, default?:any, filter?:string|array)

        /**
        * 获取中间件传递的参数
        * @access public
        * @param  mixed name 变量名
        * @param  mixed default 默认值
        * @return mixed
        */
        public  middleware(name:string, default?:any)

        /**
        * 获取PUT参数
        * @access public
        * @param  string|array name 变量名
        * @param  mixed        default 默认值
        * @param  string|array filter 过滤方法
        * @return mixed
        */
        public  put(name?:string, default?:any, filter?:string|array)

        protected getInputData(content): array

        /**
        * 设置获取DELETE参数
        * @access public
        * @param  mixed        name 变量名
        * @param  mixed        default 默认值
        * @param  string|array filter 过滤方法
        * @return mixed
        */
        public  delete(name?:string, default?:any, filter?:string|array)

        /**
        * 设置获取PATCH参数
        * @access public
        * @param  mixed        name 变量名
        * @param  mixed        default 默认值
        * @param  string|array filter 过滤方法
        * @return mixed
        */
        public  patch(name?:string, default?:any, filter?:string|array)

        /**
        * 获取request变量
        * @access public
        * @param  string|array name 数据名称
        * @param  mixed        default 默认值
        * @param  string|array filter 过滤方法
        * @return mixed
        */
        public  request(name?:string, default?:any, filter?:string|array)

        /**
        * 获取环境变量
        * @access public
        * @param  string name 数据名称
        * @param  string default 默认值
        * @return mixed
        */
        public  env(name?:string, default?:any)

        /**
        * 获取session数据
        * @access public
        * @param  string name 数据名称
        * @param  string default 默认值
        * @return mixed
        */
        public  session(name?:string, default?:any)

        /**
        * 获取cookie参数
        * @access public
        * @param  mixed        name 数据名称
        * @param  string       default 默认值
        * @param  string|array filter 过滤方法
        * @return mixed
        */
        public  cookie( name?:string, default?:any, filter?:string|array)

        /**
        * 获取server参数
        * @access public
        * @param  string name 数据名称
        * @param  string default 默认值
        * @return mixed
        */
        public  server(name?:string, default?:string)

        /**
        * 获取上传的文件信息
        * @access public
        * @param  string name 名称
        * @return null|array|UploadedFile
        */
        public  file( name?:string )

        protected  dealUploadFile(files:array, name:string ): array

        protected  throwUploadFileError(error)

        /**
        * 设置或者获取当前的Header
        * @access public
        * @param  string name header名称
        * @param  string default 默认值
        * @return string|array
        */
        public  header(name?:string, default?:string)

        /**
        * 获取变量 支持过滤和默认值
        * @access public
        * @param  array        data 数据源
        * @param  string|false name 字段名
        * @param  mixed        default 默认值
        * @param  string|array filter 过滤函数
        * @return mixed
        */
        public  input(data?:array, name?:string, default?:any, filter?:string|array)

        protected filterData(data, filter, name, default?:any)

        /**
        * 强制类型转换
        * @access protected
        * @param  mixed  data
        * @param  string type
        * @return mixed
        */
        protected  typeCast(data:any, type:string)

        /**
        * 获取数据
        * @access protected
        * @param  array  data 数据源
        * @param  string name 字段名
        * @param  mixed  default 默认值
        * @return mixed
        */
        protected  getData(data:array, name:string, default?:any)

        /**
        * 设置或获取当前的过滤规则
        * @access public
        * @param  mixed filter 过滤规则
        * @return mixed
        */
        public filter(filter?:any)

        protected  getFilter(filter:any, default?:any): array

        /**
        * 递归过滤给定的值
        * @access public
        * @param  mixed value 键值
        * @param  mixed key 键名
        * @param  array filters 过滤方法+默认值
        * @return mixed
        */
        public  filterValue(value:any, key:string|number, filters:array)

        /**
        * 是否存在某个请求参数
        * @access public
        * @param  string name 变量名
        * @param  string type 变量类型
        * @param  bool   checkEmpty 是否检测空值
        * @return bool
        */
        public  has(name:string, type?:string, checkEmpty?:boolean): boolean

        /**
        * 获取指定的参数
        * @access public
        * @param  array        name 变量名
        * @param  mixed        data 数据或者变量类型
        * @param  string|array filter 过滤方法
        * @return array
        */
        public  only(name:array, data?:string, filter?:string|array): array

        /**
        * 排除指定参数获取
        * @access public
        * @param  array  name 变量名
        * @param  string type 变量类型
        * @return mixed
        */
        public  except( name:array, type?:string): array

        /**
        * 当前是否ssl
        * @access public
        * @return bool
        */
        public  isSsl(): boolean

        /**
        * 当前是否JSON请求
        * @access public
        * @return bool
        */
        public  isJson(): boolean

        /**
        * 当前是否Ajax请求
        * @access public
        * @param  bool ajax true 获取原始ajax请求
        * @return bool
        */
        public  isAjax(ajax?:boolean): boolean

        /**
        * 当前是否Pjax请求
        * @access public
        * @param  bool pjax true 获取原始pjax请求
        * @return bool
        */
        public  isPjax(pjax?:boolean): boolean

        /**
        * 获取客户端IP地址
        * @access public
        * @return string
        */
        public  ip(): string

        /**
        * 检测是否是合法的IP地址
        *
        * @param string ip   IP地址
        * @param string type IP地址类型 (ipv4, ipv6)
        *
        * @return boolean
        */
        public  isValidIP( ip:string,  type?:string): boolean

        /**
        * 将IP地址转换为二进制字符串
        *
        * @param string ip
        *
        * @return string
        */
        public  ip2bin(ip:string): string

        /**
        * 检测是否使用手机访问
        * @access public
        * @return bool
        */
        public  isMobile(): boolean

        /**
        * 当前URL地址中的scheme参数
        * @access public
        * @return string
        */
        public  scheme(): string

        /**
        * 当前请求URL地址中的query参数
        * @access public
        * @return string
        */
        public  query(): string

        /**
        * 设置当前请求的host（包含端口）
        * @access public
        * @param  string host 主机名（含端口）
        * @return this
        */
        public  setHost(host:string):this

        /**
        * 当前请求的host
        * @access public
        * @param bool strict  true 仅仅获取HOST
        * @return string
        */
        public  host(strict?:boolean): string

        /**
        * 当前请求URL地址中的port参数
        * @access public
        * @return int
        */
        public  port(): int

        /**
        * 当前请求 SERVER_PROTOCOL
        * @access public
        * @return string
        */
        public  protocol(): string

        /**
        * 当前请求 REMOTE_PORT
        * @access public
        * @return int
        */
        public  remotePort(): int

        /**
        * 当前请求 HTTP_CONTENT_TYPE
        * @access public
        * @return string
        */
        public  contentType(): string

        /**
        * 获取当前请求的安全Key
        * @access public
        * @return string
        */
        public  secureKey(): string

        /**
        * 设置当前的控制器名
        * @access public
        * @param  string controller 控制器名
        * @return this
        */
        public  setController(controller:string):this

        /**
        * 设置当前的操作名
        * @access public
        * @param  string action 操作名
        * @return this
        */
        public  setAction(action:string):this

        /**
        * 获取当前的控制器名
        * @access public
        * @param  bool convert 转换为小写
        * @return string
        */
        public  controller(convert?:boolean): string

        /**
        * 获取当前的操作名
        * @access public
        * @param  bool convert 转换为小写
        * @return string
        */
        public  action(convert?:boolean): string

        /**
        * 设置或者获取当前请求的content
        * @access public
        * @return string
        */
        public  getContent(): string

        /**
        * 获取当前请求的php://input
        * @access public
        * @return string
        */
        public  getInput(): string

        /**
        * 生成请求令牌
        * @access public
        * @param  string name 令牌名称
        * @param  mixed  type 令牌生成方法
        * @return string
        */
        public  buildToken(name?:string, type?:string): string


        /**
        * 检查请求令牌
        * @access public
        * @param  string token 令牌名称
        * @param  array  data  表单数据
        * @return bool
        */
        public  checkToken(token?:string, data?:array): boolean
    

        /**
        * 设置在中间件传递的数据
        * @access public
        * @param  array middleware 数据
        * @return this
        */
        public  withMiddleware(middleware:array):this

        /**
        * 设置GET数据
        * @access public
        * @param  array get 数据
        * @return this
        */
        public  withGet(get:array):this

        /**
        * 设置POST数据
        * @access public
        * @param  array post 数据
        * @return this
        */
        public  withPost(post:array):this

        /**
        * 设置COOKIE数据
        * @access public
        * @param array cookie 数据
        * @return this
        */
        public  withCookie(cookie:array):this

        /**
        * 设置SESSION数据
        * @access public
        * @param Session session 数据
        * @return this
        */
        public  withSession(session:server.http.Session):this

        /**
        * 设置SERVER数据
        * @access public
        * @param  array server 数据
        * @return this
        */
        public  withServer(server:array):this

        /**
        * 设置HEADER数据
        * @access public
        * @param  array header 数据
        * @return this
        */
        public  withHeader(header:array):this

        /**
        * 设置ENV数据
        * @access public
        * @param Env env 数据
        * @return this
        */
        public  withEnv(env:server.kernel.Env):this

        /**
        * 设置php://input数据
        * @access public
        * @param string input RAW数据
        * @return this
        */
        public  withInput(input:string):this

        /**
        * 设置文件上传数据
        * @access public
        * @param  array files 上传信息
        * @return this
        */
        public  withFiles(files:array):this

        /**
        * 设置ROUTE变量
        * @access public
        * @param  array route 数据
        * @return this
        */
        public  withRoute(route:array):this

    }

    declare class Response{

        /**
        * 原始数据
        * @var mixed
        */
        //protected var data:any;

        /**
        * 当前contentType
        * @var string
        */
        //protected var contentType = 'text/html';

        /**
        * 字符集
        * @var string
        */
        //protected var charset = 'utf-8';

        /**
        * 状态码
        * @var integer
        */
        //protected var code = 200;

        /**
        * 是否允许请求缓存
        * @var bool
        */
        //protected var allowCache = true;

        /**
        * 输出参数 
        * @var array
        */
        //protected var options = [];

        /**
        * header参数
        * @var array
        */
        //protected var header = [];

        /**
        * 输出内容
        * @var string
        */
        //protected var content = null;

        /**
        * Cookie对象
        * @var Cookie
        */
        //protected var cookie:any;

        /**
        * Session对象
        * @var Session
        */
        //protected var session:any;

        /**
        * 初始化
        * @access protected
        * @param  mixed  $data 输出数据
        * @param  int    $code 状态码
        */
        protected init(data:any, code:int = 200)

        /**
        * 创建Response对象
        * @access public
        * @param  mixed  $data 输出数据
        * @param  string $type 输出类型
        * @param  int    $code 状态码
        * @return Response
        */
        public static create(data:any, type:string = 'html', code:int = 200): Response


        /**
        * 设置Session对象
        * @access public
        * @param  Session $session Session对象
        * @return $this
        */
        setSession(session):this


        /**
        * 发送数据到客户端
        * @access public
        * @return void
        * @throws \InvalidArgumentException
        */
        send(): void


        /**
        * 处理数据
        * @access protected
        * @param  mixed $data 要处理的数据
        * @return mixed
        */
        protected output(data:any):any


        /**
        * 输出数据
        * @access protected
        * @param string $data 要处理的数据
        * @return void
        */
        protected sendData(data:string): void


        /**
        * 输出的参数
        * @access public
        * @param  mixed $options 输出参数
        * @return $this
        */
        options( options:array = []):this


        /**
        * 输出数据设置
        * @access public
        * @param  mixed $data 输出数据
        * @return $this
        */
        data(data:any):this


        /**
        * 是否允许请求缓存
        * @access public
        * @param  bool $cache 允许请求缓存
        * @return $this
        */
        allowCache(cache:boolean):this

        /**
        * 是否允许请求缓存
        * @access public
        * @return bool
        */
        isAllowCache():boolean


        /**
        * 设置Cookie
        * @access public
        * @param  string $name  cookie名称
        * @param  string $value cookie值
        * @param  mixed  $option 可选参数
        * @return $this
        */
        cookie(name:string, value:string, option = null):this


        /**
        * 设置响应头
        * @access public
        * @param  array $header  参数
        * @return $this
        */
        header(header:array = []):this

        /**
        * 设置页面输出内容
        * @access public
        * @param  mixed $content
        * @return $this
        */
        content(content:any):this


        /**
        * 发送HTTP状态
        * @access public
        * @param  integer $code 状态码
        * @return $this
        */
        code(code:int):this


        /**
        * LastModified
        * @access public
        * @param  string $time
        * @return $this
        */
        lastModified(time:string):this
        /**
        * Expires
        * @access public
        * @param  string $time
        * @return $this
        */
        expires(time:string):this

        /**
        * ETag
        * @access public
        * @param  string $eTag
        * @return $this
        */
        eTag(eTag:string):this

        /**
        * 页面缓存控制
        * @access public
        * @param  string $cache 状态码
        * @return $this
        */
        cacheControl(cache:string):this

        /**
        * 页面输出类型
        * @access public
        * @param  string $contentType 输出类型
        * @param  string $charset     输出编码
        * @return $this
        */
        contentType(contentType:string, charset:string='utf-8'):this

        /**
        * 获取头部信息
        * @access public
        * @param  string $name 头部名称
        * @return mixed
        */
        getHeader(name?:string)

        /**
        * 获取原始数据
        * @access public
        * @return mixed
        */
        getData()


        /**
        * 获取输出数据
        * @access public
        * @return string
        */
        getContent(): string


        /**
        * 获取状态码
        * @access public
        * @return integer
        */
        getCode(): int

    }
}

package server.kernel{

    declare class Env{

        /**
        * 环境变量数据
        * @var array
        */
        protected data:array;

        /**
        * 数据转换映射
        * @var array
        */
        protected convert:array 

        /**
        * 读取环境变量定义文件
        * @access public
        * @param string $file 环境变量定义文件
        * @return void
        */
        public load(file:string): void


        /**
        * 获取环境变量值
        * @access public
        * @param string $name    环境变量名
        * @param mixed  $default 默认值
        * @return mixed
        */
        public get(name:string, default?:any)

        protected getEnv( name:string, default?:any)

        /**
        * 设置环境变量值
        * @access public
        * @param string|array $env   环境变量
        * @param mixed        $value 值
        * @return void
        */
        public set(name:string, default?:any): void

        /**
        * 检测是否存在环境变量
        * @access public
        * @param string $name 参数名
        * @return bool
        */
        public has(name:string): boolean
    }

    declare class Container{

        /**
        * 容器对象实例
        * @var Container|Closure
        */
        static const instance:Container;

        /**
        * 容器中的对象实例
        * @var array
        */
        protected var instances = [];

        /**
        * 容器回调
        * @var array
        */
        protected var invokeCallback = [];

        /**
        * 获取当前容器的实例（单例）
        * @access public
        * @return static
        */
        getInstance():any;

        /**
        * 设置当前容器的实例
        * @access public
        * @param object|Closure $instance
        * @return void
        */
        setInstance( instance ): void


        /**
        * 注册一个容器对象回调
        *
        * @param string|Closure $abstract
        * @param Closure|null   $callback
        * @return void
        */
        resolving(name:string, callback?:()=>any ): void

        /**
        * 获取容器中的对象实例 不存在则创建
        * @access public
        * @param string     $abstract    类名或者标识
        * @param array|true $vars        变量
        * @param bool       $newInstance 是否每次创建新的实例
        * @return object
        */
        pull(name:string, vars:array = [], newInstance:boolean = false):object


        /**
        * 获取容器中的对象实例
        * @access public
        * @param string $abstract 类名或者标识
        * @return object
        */
        get(name:string):object

        /**
        * 绑定一个类、闭包、实例、接口实现到容器
        * @access public
        * @param string|array $abstract 类标识、接口
        * @param mixed        $concrete 要绑定的类、闭包或者实例
        * @return $this
        */
        bind(name:string, concrete = null):this


        /**
        * 根据别名获取真实类名
        * @param  string $abstract
        * @return string
        */
        getAlias(name:string): string


        /**
        * 绑定一个类实例到容器
        * @access public
        * @param string $abstract 类名或者标识
        * @param object $instance 类的实例
        * @return $this
        */
        instance(name:string, instance:object):this

        /**
        * 判断容器中是否存在类及标识
        * @access public
        * @param string $abstract 类名或者标识
        * @return bool
        */
        bound(name:string): boolean


        /**
        * 判断容器中是否存在类及标识
        * @access public
        * @param string $name 类名或者标识
        * @return bool
        */
        has(name:string): boolean


        /**
        * 判断容器中是否存在对象实例
        * @access public
        * @param string $abstract 类名或者标识
        * @return bool
        */
        exists(name:string): boolean


        /**
        * 创建类的实例 已经存在则直接获取
        * @access public
        * @param string $abstract    类名或者标识
        * @param array  $vars        变量
        * @param bool   $newInstance 是否每次创建新的实例
        * @return mixed
        */
        make(name:string, vars:array = [], newInstance:boolean = false):any


        /**
        * 删除容器中的对象实例
        * @access public
        * @param string $name 类名或者标识
        * @return void
        */
        delete(name:string):void

        /**
        * 执行函数或者闭包方法 支持参数调用
        * @access public
        * @param string|Closure $function 函数或者闭包
        * @param array          $vars     参数
        * @return mixed
        */
        invokeFunction(callback:()=>any,  vars:array= []):any


        /**
        * 调用反射执行类的方法 支持参数绑定
        * @access public
        * @param mixed $method     方法
        * @param array $vars       参数
        * @param bool  $accessible 设置是否可访问
        * @return mixed
        */
        invokeMethod(method,  vars:array = [], accessible:boolean = false):any


        /**
        * 调用反射执行类的方法 支持参数绑定
        * @access public
        * @param object $instance 对象实例
        * @param mixed  $reflect  反射类
        * @param array  $vars     参数
        * @return mixed
        */
        invokeReflectMethod(instance, reflect,vars:array=[]):any


        /**
        * 调用反射执行callable 支持参数绑定
        * @access public
        * @param mixed $callable
        * @param array $vars       参数
        * @param bool  $accessible 设置是否可访问
        * @return mixed
        */
        invoke($callable,  vars:array = [], accessible:boolean = false):any


        /**
        * 调用反射执行类的实例化 支持依赖注入
        * @access public
        * @param string $class 类名
        * @param array  $vars  参数
        * @return mixed
        */
        invokeClass( className:string, vars:array):any


        /**
        * 执行invokeClass回调
        * @access protected
        * @param string $class  对象类名
        * @param object $object 容器对象实例
        * @return void
        */
        protected invokeAfter( className:string, object:object): void


        /**
        * 绑定参数
        * @access protected
        * @param ReflectionFunctionAbstract $reflect 反射类
        * @param array                      $vars    参数
        * @return array
        */
        bindParams(reflect, vars:array = []): array


        /**
        * 创建工厂对象实例
        * @param string $name      工厂类名
        * @param string $namespace 默认命名空间
        * @param array  $args
        * @return mixed
        * @deprecated
        * @access public
        */
        factory( name:string,  namespace?:string, ...args):any


        /**
        * 获取对象类型的参数值
        * @access protected
        * @param string $className 类名
        * @param array  $vars      参数
        * @return mixed
        */
        getObjectParam(className:string, vars:array ):any
        __set($name, $value)

        __get($name)

        __isset($name): boolean

        __unset($name)

        offsetExists($key): boolean

        offsetGet($key)

        offsetSet($key, $value)

        offsetUnset($key)

        //Countable
        count(): int

        //IteratorAggregate
        getIterator(): any
   
    }

    declare class App extends Container{

        /**
        * 是否为调试模式
        * @access public
        * @return bool
        */
        isDebug():boolean;

        /**
        * 设置应用命名空间
        * @access public
        * @param string $namespace 应用命名空间
        * @return $this
        */
        setNamespace(namespace:string)

        /**
        * 获取应用类库命名空间
        * @access public
        * @return string
        */
        getNamespace(): string

        /**
        * 设置环境变量标识
        * @access public
        * @param string $name 环境标识
        * @return $this
        */
        setEnvName(name:string)


        /**
        * 获取框架版本
        * @access public
        * @return string
        */
        version(): string


        /**
        * 获取应用根目录
        * @access public
        * @return string
        */
        getRootPath(): string


        /**
        * 获取应用基础目录
        * @access public
        * @return string
        */
        getBasePath(): string


        /**
        * 获取当前应用目录
        * @access public
        * @return string
        */
        getAppPath(): string


        /**
        * 设置应用目录
        * @param string $path 应用目录
        */
        setAppPath(path:string)


        /**
        * 获取应用运行时目录
        * @access public
        * @return string
        */
        getRuntimePath(): string


        /**
        * 设置runtime目录
        * @param string $path 定义目录
        */
        setRuntimePath(path:string): void


        /**
        * 获取核心框架目录
        * @access public
        * @return string
        */
        getThinkPath(): string


        /**
        * 获取应用配置目录
        * @access public
        * @return string
        */
        getConfigPath(): string


        /**
        * 获取配置后缀
        * @access public
        * @return string
        */
        getConfigExt(): string


        /**
        * 获取应用开启时间
        * @access public
        * @return float
        */
        getBeginTime(): float


        /**
        * 获取应用初始内存占用
        * @access public
        * @return integer
        */
        getBeginMem(): int


        /**
        * 加载环境变量定义
        * @access public
        * @param string $envName 环境标识
        * @return void
        */
        loadEnv(envName?:string): void

        /**
        * 初始化应用
        * @access public
        * @return $this
        */
        initialize():this
    }
}


package server.application{

    import server.components.Collection;
    import server.database.concern.BaseQuery;
    import server.database.concern.QueryWhereFieldType;

    /**
    * 控制器的基类，所有业务逻辑层都应该继承 Controller 类
    */
    @Define(type=controller)
    declare class Controller{}

    /**
    * 模型基类，所有业务模型层都应该继承 Model 类
    */
    @Define(type=model)
    declare class Model{
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
        getWhere():QueryWhereFieldType;

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


}
 @Reference('./Query.d.es');
 @Reference('./Connection.d.es');
 
 package server.database;

 declare interface Convenient{

        /**
        * 指定表名开始查询
        * @param $table
        * @return BaseQuery
        */
        public table(table):Query

        /**
        * 指定表名开始查询(不带前缀)
        * @param $name
        * @return BaseQuery
        */
        public name(name):Query

        /**
        * 执行数据库事务
        * @access public
        * @param callable $callback 数据操作方法回调
        * @return mixed
        */
        public transaction<T>(callback:(connection:Connection)=>T):T;

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
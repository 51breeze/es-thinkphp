package server.database.concern;

import server.database.Connection;

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
    transactionXa<T>(callback:(connection:Connection)=>T, dbs?:array):T;


    /**
    * 执行数据库事务
    * @access public
    * @param callable $callback 数据操作方法回调
    * @return mixed
    */
    transaction<T>(callback:(connection:Connection)=>T):T

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
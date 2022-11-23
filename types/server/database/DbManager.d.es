package server.database;

import server.psr.CacheInterface;
import server.psr.LoggerInterface;
import server.contract.DbConfigInterface;

declare class DbManager{

      /**
      * 初始化配置参数
      * @access public
      * @param array $config 连接配置
      * @return void
      */
      setConfig(config:DbConfigInterface | {[type:string]:DbConfigInterface} ):void

      /**
      * 设置缓存对象
      * @access public
      * @param CacheInterface $cache 缓存对象
      * @return void
      */
      setCache(cache:CacheInterface):void

      /**
      * 设置日志对象
      * @access public
      * @param LoggerInterface $log 日志对象
      * @return void
      */
      setLog(log:LoggerInterface):void

      /**
      * 记录SQL日志
      * @access protected
      * @param string $log  SQL日志信息
      * @param string $type 日志类型
      * @return void
      */
      log(log:string, type?:string ):void

      /**
      * 获得查询日志（没有设置日志对象使用）
      * @access public
      * @param bool $clear 是否清空
      * @return array
      */
      getDbLog(clear?:boolean): string[]

      /**
      * 获取配置参数
      * @access public
      * @param string $name    配置参数
      * @param mixed  $default 默认值
      * @return mixed
      */
      getConfig(name?:string, default?):any;

      /**
      * 创建/切换数据库连接查询
      * @access public
      * @param string|null $name  连接配置标识
      * @param bool        $force 强制重新连接
      * @return ConnectionInterface
      */
      connect(name?:string, force?:boolean):Connection

      /**
      * 使用表达式设置数据
      * @access public
      * @param string $value 表达式
      * @return Raw
      */
      raw(value:string):Raw

      /**
      * 更新查询次数
      * @access public
      * @return void
      */
      updateQueryTimes():void

      /**
      * 重置查询次数
      * @access public
      * @return void
      */
      clearQueryTimes():void

      /**
      * 获得查询次数
      * @access public
      * @return integer
      */
      getQueryTimes(): int

      /**
      * 监听SQL执行
      * @access public
      * @param callable $callback 回调方法
      * @return void
      */
      listen(callback:(args)=>void): void

      /**
      * 获取监听SQL执行
      * @access public
      * @return array
      */
      getListen(): any[]

      /**
      * 注册回调方法
      * @access public
      * @param string   $event    事件名
      * @param callable $callback 回调方法
      * @return void
      */
      event(event:string, callback:(...args)=>void): void

      /**
      * 触发事件
      * @access public
      * @param string $event  事件名
      * @param mixed  $params 传入参数
      * @return mixed
      */
      trigger(event:string, params?):any;
}
package server.kernel;

import server.kernel.Manager;
import server.psr.LoggerInterface;

/**
 * 日志管理类
 * @package think
 * @mixin Channel
 */
declare class Log extends Manager<Log> implements LoggerInterface
{
   static const EMERGENCY = 'emergency';
   static const ALERT     = 'alert';
   static const CRITICAL  = 'critical';
   static const ERROR     = 'error';
   static const WARNING   = 'warning';
   static const NOTICE    = 'notice';
   static const INFO      = 'info';
   static const DEBUG     = 'debug';
   static const SQL       = 'sql';

    /**
     * 获取渠道配置
     * @param string $channel
     * @param null   $name
     * @param null   $default
     * @return array
     */
    getChannelConfig(channel, name?, default?):array;


    /**
     * driver()的别名
     * @param string|array $name 渠道名
     * @return Channel|ChannelSet
     */
   channel(name = null):this

    /**
     * 清空日志信息
     * @access public
     * @param string|array $channel 日志通道名
     * @return $this
     */
   clear(channel?:string):this;
   

    /**
     * 关闭本次请求日志写入
     * @access public
     * @param string|array $channel 日志通道名
     * @return $this
     */
   close(channel?:string):this;
  

    /**
     * 获取日志信息
     * @access public
     * @param string $channel 日志通道名
     * @return array
     */
   getLog(channel?:string): array
   
    /**
     * 保存日志信息
     * @access public
     * @return bool
     */
   save(): boolean;
   

    /**
     * 记录日志信息
     * @access public
     * @param mixed  $msg     日志信息
     * @param string $type    日志级别
     * @param array  $context 替换内容
     * @param bool   $lazy
     * @return $this
     */
    record(msg:string, type?:string, context?:ArrayMapping<string>, lazy?:boolean):this;
   

    /**
     * 实时写入日志信息
     * @access public
     * @param mixed  $msg     调试信息
     * @param string $type    日志级别
     * @param array  $context 替换内容
     * @return $this
     */
    write(msg:string, type:string, context?:ArrayMapping<string>):this;
   

    /**
     * 注册日志写入事件监听
     * @param $listener
     * @return Event
     */
    listen(listener):Event
   

    /**
     * 记录日志信息
     * @access public
     * @param string $level   日志级别
     * @param mixed  $message 日志信息
     * @param array  $context 替换内容
     * @return void
     */
    log(level:string, message:Scalar, context?:ArrayMapping<string>): void
   
    /**
     * 记录emergency信息
     * @access public
     * @param mixed $message 日志信息
     * @param array $context 替换内容
     * @return void
     */
    emergency(message:Scalar, context?:ArrayMapping<string>): void
  

    /**
     * 记录警报信息
     * @access public
     * @param mixed $message 日志信息
     * @param array $context 替换内容
     * @return void
     */
    alert(message:Scalar, context?:ArrayMapping<string>): void
  

    /**
     * 记录紧急情况
     * @access public
     * @param mixed $message 日志信息
     * @param array $context 替换内容
     * @return void
     */
    critical(message:Scalar, context?:ArrayMapping<string>): void
   

    /**
     * 记录错误信息
     * @access public
     * @param mixed $message 日志信息
     * @param array $context 替换内容
     * @return void
     */
    error(message:Scalar, context?:ArrayMapping<string>): void
   

    /**
     * 记录warning信息
     * @access public
     * @param mixed $message 日志信息
     * @param array $context 替换内容
     * @return void
     */
    warning(message:Scalar, context?:ArrayMapping<string>): void
  

    /**
     * 记录notice信息
     * @access public
     * @param mixed $message 日志信息
     * @param array $context 替换内容
     * @return void
     */
    notice(message:Scalar, context?:ArrayMapping<string>): void
   

    /**
     * 记录一般信息
     * @access public
     * @param mixed $message 日志信息
     * @param array $context 替换内容
     * @return void
     */
    info(message:Scalar, context?:ArrayMapping<string>): void
   

    /**
     * 记录调试信息
     * @access public
     * @param mixed $message 日志信息
     * @param array $context 替换内容
     * @return void
     */
    debug(message:Scalar, context?:ArrayMapping<string>): void
   

    /**
     * 记录sql信息
     * @access public
     * @param mixed $message 日志信息
     * @param array $context 替换内容
     * @return void
     */
    sql(message:Scalar, context?:ArrayMapping<string>): void
}

package server.kernel;

/**
 * 事件管理类
 * @package think
 */
declare class Event{
    
    constructor(app:App)

    /**
     * 批量注册事件监听
     * @access public
     * @param array $events 事件定义
     * @return $this
     */
    listenEvents(events:ArrayMappingType<(...args)=>void>):this;

    /**
     * 注册事件监听
     * @access public
     * @param string $event    事件名称
     * @param mixed  $listener 监听操作（或者类名）
     * @param bool   $first    是否优先执行
     * @return $this
     */
    listen(event:string, listener:(...args)=>void, first?:boolean):this;
   
    /**
     * 是否存在事件监听
     * @access public
     * @param string $event 事件名称
     * @return bool
     */
    hasListener(event:string): boolean
 
    /**
     * 移除事件监听
     * @access public
     * @param string $event 事件名称
     * @return void
     */
    remove(event:string): void
   
    /**
     * 指定事件别名标识 便于调用
     * @access public
     * @param array $events 事件别名
     * @return $this
     */
    bind(events:ArrayMappingType<string>):this;

    /**
     * 注册事件订阅者
     * @access public
     * @param mixed $subscriber 订阅者
     * @return $this
     */
    subscribe(subscriber):this;
   
    /**
     * 自动注册事件观察者
     * @access public
     * @param string|object $observer 观察者
     * @param null|string   $prefix   事件名前缀
     * @return $this
     */
    observe(observer, prefix?:string):this;
   
    /**
     * 触发事件
     * @access public
     * @param string|object $event  事件名称
     * @param mixed         $params 传入参数
     * @param bool          $once   只获取一个有效返回值
     * @return mixed
     */
    trigger(event:string, params?, once?:boolean):any;
   

    /**
     * 触发事件(只获取一个有效返回值)
     * @param      $event
     * @param null $params
     * @return mixed
     */
    until(event:string,params?):any;
    

    /**
     * 执行事件调度
     * @access protected
     * @param mixed $event  事件方法
     * @param mixed $params 参数
     * @return mixed
     */
    protected dispatch(event:string, params?):any;
   

}

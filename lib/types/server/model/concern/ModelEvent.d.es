package server.model.concern;

/**
 * 模型事件处理
 */
declare interface ModelEvent{

    /**
     * 当前操作的事件响应
     * @access protected
     * @param  bool $event  是否需要事件响应
     * @return $this
     */
    withEvent(event:boolean):this
}

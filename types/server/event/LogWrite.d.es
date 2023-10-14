package server.event;
/**
 * LogWrite事件类
 */
declare class LogWrite
{
    channel:string;
    /** @var array */
    log:string;
    
    constructor(channel:string, log:string);
}
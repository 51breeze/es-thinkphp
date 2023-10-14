package server.contract;

/**
 * Session驱动接口
 */
interface SessionHandlerInterface
{
    read(sessionId:string): string;
    delete(sessionId:string): boolean;
    write(sessionId:string, data:string): boolean;
}

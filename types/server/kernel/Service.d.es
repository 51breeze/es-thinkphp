package server.kernel;

/**
 * 系统服务基础类
 * @method void register()
 * @method void boot()
 */
@Abstract()
declare class Service
{
    constructor(app:App);
}

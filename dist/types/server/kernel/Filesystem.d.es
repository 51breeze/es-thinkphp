package server.kernel;

import server.kernel.Manager
import server.driver.Driver;

/**
 * Class Filesystem
 * @package think
 * @mixin Driver
 * @mixin Local
 */
declare class Filesystem extends Manager<any>{

    /**
     * @param null|string $name
     * @return Driver
     */
    disk(name?:string): Driver

    /**
     * 获取缓存配置
     * @access public
     * @param null|string $name    名称
     * @param mixed       $default 默认值
     * @return mixed
     */
    getConfig<T=any>(name?:string, default?:any):T;

    /**
     * 获取磁盘配置
     * @param string $disk
     * @param null   $name
     * @param null   $default
     * @return array
     */
    getDiskConfig(disk:string, default?:any):ArrayMapping<string>
    getDiskConfig(disk:string, name:string, default?:any):string;

    /**
     * 默认驱动
     * @return string|null
     */
    getDefaultDriver():string|null

}

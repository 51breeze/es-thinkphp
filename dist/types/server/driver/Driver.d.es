package server.driver;

import server.kernel.Cache;
import server.kernel.File;

/**
 * Class Driver
 * @package think\filesystem
 * @mixin Filesystem
 */
@abstract()
declare class Driver{

    constructor(cache:Cache, config:{})
  
    /**
     * 获取文件完整路径
     * @param string $path
     * @return string
     */
    path(path:string): string
    
    url(path:string): string

    /**
     * 保存文件
     * @param string               $path    路径
     * @param File                 $file    文件
     * @param null|string|\Closure $rule    文件名规则
     * @param array                $options 参数
     * @return bool|string
     */
    putFile(path:string, file:File, rule?:any, options?:ArrayMapping<any>):boolean|string

    /**
     * 指定文件名保存文件
     * @param string $path    路径
     * @param File   $file    文件
     * @param string $name    文件名
     * @param array  $options 参数
     * @return bool|string
     */
    putFileAs(path:string, file:File, name:string, options?:ArrayMapping<any>):boolean|string
}
package server.contract;

/**
 * 缓存驱动接口
 */
declare interface CacheHandlerInterface
{
    /**
     * 判断缓存
     * @access public
     * @param string $name 缓存变量名
     * @return bool
     */
   has(name:string):boolean;

    /**
     * 读取缓存
     * @access public
     * @param string $name    缓存变量名
     * @param mixed  $default 默认值
     * @return mixed
     */
    get(name:string, default?):any;

    /**
     * 写入缓存
     * @access public
     * @param string            $name   缓存变量名
     * @param mixed             $value  存储数据
     * @param integer|\DateTime $expire 有效时间（秒）
     * @return bool
     */
   set(name:string, value, expire?:string|number):boolean;

    /**
     * 自增缓存（针对数值缓存）
     * @access public
     * @param string $name 缓存变量名
     * @param int    $step 步长
     * @return false|int
     */
    inc(name:string, step:int=1):false | int;

    /**
     * 自减缓存（针对数值缓存）
     * @access public
     * @param string $name 缓存变量名
     * @param int    $step 步长
     * @return false|int
     */
    dec(name:string, step:int = 1):false | int;

    /**
     * 删除缓存
     * @access public
     * @param string $name 缓存变量名
     * @return bool
     */
    delete(name:string):boolean;

    /**
     * 清除缓存
     * @access public
     * @return bool
     */
    clear():boolean;

    /**
     * 删除缓存标签
     * @access public
     * @param array $keys 缓存标识列表
     * @return void
     */
    clearTag(keys:string[]);

}

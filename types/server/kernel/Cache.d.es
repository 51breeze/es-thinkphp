package server.kernel;

import server.psr.CacheInterface;
import server.kernel.Manager;
import server.contract.TagSetInterface;

/**
 * 缓存管理类
 * @mixin Driver
 * @mixin \think\cache\driver\File
 */
declare class Cache extends Manager<Cache> implements CacheInterface{

    /**
     * 获取缓存配置
     * @access public
     * @param null|string $name    名称
     * @param mixed $default 默认值
     * @return mixed
     */
    getConfig(name?:string, default?):ArrayMappingType<ScalarValueType>;

    /**
     * 获取驱动配置
     * @param string $store
     * @param string $name
     * @param null   $default
     * @return array
     */
    getStoreConfig(store:string, name?:string, default?):ArrayMappingType<ScalarValueType>;

    /**
     * 连接或者切换缓存
     * @access public
     * @param string $name 连接配置名
     * @return Driver
     */
    store(name?:string):this

    /**
     * 清空缓冲池
     * @access public
     * @return bool
     */
    clear(): boolean;

    /**
     * 读取缓存
     * @access public
     * @param string $key     缓存变量名
     * @param mixed  $default 默认值
     * @return mixed
     */
    get(key:string, default?):any;

    /**
     * 写入缓存
     * @access public
     * @param string        $key   缓存变量名
     * @param mixed         $value 存储数据
     * @param int|\DateTime $ttl   有效时间 0为永久
     * @return bool
     */
    set(key:string, value:any, ttl?:number): boolean;

    /**
     * 删除缓存
     * @access public
     * @param string $key 缓存变量名
     * @return bool
     */
    delete(key:string): boolean

    /**
     * 读取缓存
     * @access public
     * @param iterable $keys    缓存变量名
     * @param mixed    $default 默认值
     * @return iterable
     * @throws InvalidArgumentException
     */
    getMultiple(keys:string[], default?): ArrayMappingType<ScalarValueType>;

    /**
     * 写入缓存
     * @access public
     * @param iterable               $values 缓存数据
     * @param null|int|\DateInterval $ttl    有效时间 0为永久
     * @return bool
     */
    setMultiple(values:ArrayMappingType<any>, ttl?:number): boolean


    /**
     * 删除缓存
     * @access public
     * @param iterable $keys 缓存变量名
     * @return bool
     * @throws InvalidArgumentException
     */
    deleteMultiple(keys:string[]): boolean

    /**
     * 判断缓存是否存在
     * @access public
     * @param string $key 缓存变量名
     * @return bool
     */
    has(key:string): boolean

    /**
     * 缓存标签
     * @access public
     * @param string|array $name 标签名
     * @return TagSet
     */
    tag(name:string|string[]): TagSetInterface;

}

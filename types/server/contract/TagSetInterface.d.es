package server.contract;

/**
 * 标签集合
 */
declare interface TagSetInterface{
   

    /**
     * 写入缓存
     * @access public
     * @param string            $name   缓存变量名
     * @param mixed             $value  存储数据
     * @param integer|\DateTime $expire 有效时间（秒）
     * @return bool
     */
    set(name:string, value:string|number, expire?:number): boolean;


    /**
     * 追加缓存标识到标签
     * @access public
     * @param string $name 缓存变量名
     * @return void
     */
    append(name:string): void
   

    /**
     * 写入缓存
     * @access public
     * @param iterable               $values 缓存数据
     * @param null|int|\DateInterval $ttl    有效时间 0为永久
     * @return bool
     */
    setMultiple(values:ArrayMappingType<any>, ttl?:number): boolean
   

    /**
     * 如果不存在则写入缓存
     * @access public
     * @param string $name   缓存变量名
     * @param mixed  $value  存储数据
     * @param int    $expire 有效时间 0为永久
     * @return mixed
     */
    remember(name:string, value:any, expire?:number)
   

    /**
     * 清除缓存
     * @access public
     * @return bool
     */
    clear(): boolean
    
}

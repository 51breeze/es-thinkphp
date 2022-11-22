package server.kernel;
declare interface Manager{

    /**
     * 移除一个驱动实例
     *
     * @param array|string|null $name
     * @return $this
     */
    forgetDriver(name?:string|string[]):Manager
   

    /**
     * 默认驱动
     * @return string|null
     */
    getDefaultDriver():string|null
}
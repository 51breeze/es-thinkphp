package server.driver;
import server.psr.CacheInterface;

declare class CacheStore extends CacheInterface{
   
    constructor(store, key?:string, expire?:number)

    /**
     * Store the cache.
     */
    save()

    /**
     * Load the cache.
     */
    load();
}

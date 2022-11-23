package server.facade;
import server.kernel.Cache as BaseCache;
declare final static class Cache{
    use static extends BaseCache{
        [key:string]<T=any>(name:string, ...args):T
    }
}
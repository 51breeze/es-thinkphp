package server.facade;
declare final static class Cache{
    use static extends server.kernel.Cache:prototype:public;
    use static{
        [key:string]<T=any>(name:string, ...args):T
    }
}
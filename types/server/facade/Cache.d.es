package server.facade;
declare final static class Cache{
    use static extends server.Cache.Config:prototype:public;
    use static extends server.Cache.Config:class:public;
    use static{
        [key:string]<T=any>(name:string, ...args):T
    }
}
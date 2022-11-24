package server.facade;
declare final static class Env{
    use static extends server.kernel.Env:prototype:public;
    use static extends server.kernel.Env:class:public;
}
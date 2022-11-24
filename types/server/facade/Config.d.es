package server.facade;
declare final static class Config{
    use static extends server.kernel.Config:prototype:public;
    use static extends server.kernel.Config:class:public;
}
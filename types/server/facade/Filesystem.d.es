package server.facade;

import server.driver.Driver;

import server.kernel.Filesystem as BaseFilesystem;

declare final static class Filesystem{
    use static extends Driver:prototype:public, BaseFilesystem:prototype:public;
}

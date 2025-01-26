package server.facade;
 
import server.kernel.Db as BaseDb;
import server.database.Connection 
import server.database.Query 

declare final static class Db{
    use static extends BaseDb:prototype:public, Connection< Query< ArrayMapping<string|number> > >:prototype:public;
}
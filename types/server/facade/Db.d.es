package server.facade;
 
import server.database.DbManager 
import server.database.Connection 
import server.database.Query 

declare final static class Db{
    use static extends DbManager, Connection< Query< ArrayMappingType<TableColumnValueType> > >;
}
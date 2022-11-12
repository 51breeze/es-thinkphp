@Reference('./database/DbManager.d.es');
@Reference('./database/Query.d.es');
@Reference('./database/Connection.d.es');

package server.facade;
 
import server.database.DbManager 
import server.database.Connection 
import server.database.Query 
declare static class Db implements DbManager, Connection<Query>{
      
}
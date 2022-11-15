package server.facade;
 
import server.database.DbManager 
import server.database.Connection 
import server.database.Query 

@Abstract()
declare static final class Db implements DbManager, Connection<Query>{
      
}
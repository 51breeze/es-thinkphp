package app.model;

import server.model.Model;
import server.facade.Db;
import table.Person as PersonStruct;
import server.facade.Cache;
import server.database.Raw;
import app.model.Address 

class Person extends Model<Person> implements PersonStruct {

    list(){
        return this.where('id','in', [1,2]).select().toArray();
    }

    address(){
        return this.hasOne(Address, 'uid');
    }

}



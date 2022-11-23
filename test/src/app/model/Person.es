package app.model;

import server.model.Model;
import server.facade.Db;
import table.Person as PersonStruct;
import server.facade.Cache;

class Person extends Model<Person> implements PersonStruct {

    protected name:string = 'admin';
    get myName(){

        console.log( Db.table('admin').where( [
            ['id', '=', 2]
        ]).select() );

         this.where('name','=', 'ssss');

         Person.where([])


       Db.table('admin').where({name:'ssss'});
       Db.table('sss').find()

        var result = Person.find();
        result.account = 'ssss';

       result.title = '66'
       result.account = '555';
       
       result.id = 5;
       result.save();

       Cache.grop('ssss');

       Person.create({'name':'yejun'});

      


        //type table = {username:string};
       // const m = Person.find<{username:string}>([2]);
      //  console.log( m.username );

    


        // console.log( Db.table('admin').where({id:2}).select() );

        // Db.table('admin')
        // const res = this.select();
        // console.log( res );

        return 'Join'
    }
}



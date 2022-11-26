package app.model;

import server.model.Model;
import server.facade.Db;
import table.Person as PersonStruct;
import server.facade.Cache;

import server.database.Raw;

class Person extends Model<Person> implements PersonStruct {

    list(){
        return this.where('id','in', [1,2]).select().toArray();
    }

    
    get myName(){

        console.log( Db.table('person').where( [
            ['id', '=', 2]
        ]).select() );

    //      this.where('name','=', 'ssss');

    //      Person.where([])

    //      new Raw('sssss');


    //    Db.table('admin').where({name:'ssss'});
    //    Db.table('sss').find()

        console.log(  Person.find(1), Person.where('id','=',4).find() )

        var result = new Person()
        result.account = 'ssss';
       result.title = '66'
       result.account = '555';
      // result.id = 5;
      console.log( result.save() , result.id );

   

       Person.create({'account':'yejun','title':'yejun'}).save();

    //    Db.table('sss').where([])

    //    Db.table('sss').where([]);

      


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



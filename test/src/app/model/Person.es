package app.model;

import server.model.Model;
import server.facade.Db;

class Person extends Model<Person> {

    protected name:string = 'admin';
    get myName(){

        // console.log( Db.table('admin').where( [
        //     ['id', '=', 2]
        // ]).select() );

         this.where([]);

        // Person.where([])

        Db.table('admin').where([]);

        Db.table('sss').find()





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
package app.model;

import server.model.Model;
import server.facade.Db;

class Person extends Model {
    protected name:string = 'admin';
    get myName(){

        console.log( Db.table('admin').where( [
            ['id', '=', 2]
        ]).select() );


         console.log( Db.table('admin').where({id:2}).select() );

        // Db.table('admin')
        // const res = this.select();
        // console.log( res );

        return 'Join'
    }
}
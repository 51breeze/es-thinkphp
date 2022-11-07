package app.model;

import server.application.Model;

class Person extends Model {
    protected name:string = 'admin';
    get myName(){

        const res = this.select();
        console.log( res );

        return 'Join'
    }
}
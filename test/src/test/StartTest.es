package test;

import PHPUnit.Framework.TestCase;

import server.kernel.App;
import server.kernel.Request;
import server.kernel.Http;
import app.model.Person;

import app.model.Address;
import server.facade.Db;


public class StartTest extends TestCase{

    bootstrap(route:string, method:'get' | 'post' | 'put' | 'delete'='get'){
        const request = new Request();
        request.setMethod( method as string );
        request.setUrl( route );
        request.setPathinfo( route )
        const app = new App( dirname(__DIR__) );
        const http = new Http(app);
        return http.run( request );
    }

    testIndex(){
        const response = this.bootstrap('home');
        this.assertEquals(`Hello, World!`,  response.getData() );
    }

    testList(){

        const result = Person.destroy((query)=>{
            query.where('id','>',0);
        });
        this.assertEquals(true,result);

        const result1 = Person.create({
            'id':1,
            'account':'Mytest',
            'password':'123',
            'status':1,
            'title':'top',
            'create_at':time(),
        });
        this.assertEquals(true, result1 instanceof Person);
        this.assertEquals(true, result1.save() );
        this.assertEquals(1, result1.id );

        const result2 = new Person();
        result2.id = 2;
        result2.account = 'Mytest2';
        result2.password = '456';
        result2.status = 1;
        result2.title = 'ceo';
        result2.create_at = time();
        this.assertEquals(true, result2.save() );
        this.assertEquals(2, result2.id );

        const removeRows = Db.table('address').delete(true);
        this.assertEquals(true, removeRows !== false );

        const insertId = Db.table('address').insertGetId({
            'id':1,
            'area':'longgang',
            'phone':'1868888888',
            'content':'shengzhen',
            'postcode':'415900',
            'uid':1,
        })
        this.assertEquals(1, insertId);

        const result3 = new Address();
        result3.id = 2;
        result3.area = 'bantian';
        result3.phone = '1563369999';
        result3.content = 'shengzhen';
        result3.postcode = '415918';
        result3.uid = 2;
        this.assertEquals(true, result3.save() );
        this.assertEquals(2, result3.id );

        const personResult = Person.find(2);
        if(personResult){
            this.assertEquals(2, personResult.id);
            const personAddress = personResult.getAttr<Address>('address');
            this.assertEquals(2, personAddress.uid);
            this.assertEquals(result3.area, personAddress.area);
            this.assertEquals(result3.phone, personAddress.phone);
            this.assertEquals(result3.postcode, personAddress.postcode);
        }

        const response = this.bootstrap('home/list','post');
        const data = response.getData() as {id:number}[];
        this.assertEquals(2, data.length);
        this.assertEquals([1,2], data.map( item=>item.id ) );
    }

    testModel(){
        const person = Person.find(1);
        const address = person?.getAttr<Address>('address');
        this.assertEquals(1, address.uid );
        const phone = address.phone;
        address.phone = '8888';
        this.assertEquals(true, address.save());
        const result = Db.table('address').find( address.id );
        this.assertEquals(address.phone, result?.phone);
        address.phone = phone;
        this.assertEquals(true, address.save());
    }

    testException(){
        const error = new server.exception.ValidateException('ValidateException')
        this.assertEquals('ValidateException', error.getMessage() );

        const error2 = new server.exception.db.DataNotFoundException('DataNotFoundException')
        this.assertEquals('DataNotFoundException', error2.getMessage() );
    }

}
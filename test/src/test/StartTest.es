package test;

import PHPUnit.Framework.TestCase;

import server.kernel.App;
import server.kernel.Request;
import server.kernel.Http;

public class StartTest extends TestCase{

    bootstrap(route:string, method:'get' | 'post' | 'put' | 'delete'='get'){
        const request = new Request();
        request.setMethod( method );
        request.setUrl( route );
        request.setPathinfo( route )
        const app = new App();
        const http = new Http(app);
        return http.run( request );
    }

    testIndex(){
        const response = this.bootstrap('');
        this.assertEquals(`Hello, World!`,  response.getData() );
    }

    testList(){
        const response = this.bootstrap('list','post');
        const data = response.getData() as array;
        this.assertEquals(2, data.length);
        this.assertEquals([1,2], data.map( item=>item.id ) );
    }

}
const fs = require('fs')
const path = require('path')
const compiler = require("./compiler");


describe('compile controller', function() {

    const creator = new compiler.Creator();
    let compilation = null;
    let errors = [];
    beforeAll(async function() {
        compilation = await creator.startByFile('./app/controller/Index.es');
        errors = compilation.compiler.errors.filter(e=>e.kind===0 ||e.kind===1);
    });

    afterAll(()=>{
        errors.forEach( item=>{
            if( item.kind == 0 ){
                fail( item.toString() )
            }
        });
        compilation = null;
    });

    it('should compile success and build', function() {
        expect('Expected 0 errors').toContain( errors.length );
        if( errors.length===0 ){
            creator.build( compilation );
        }
    });
    
});



describe('compile test', function() {

    const creator = new compiler.Creator();
    let compilation = null;
    let errors = [];
    beforeAll(async function() {
        compilation = await creator.startByFile('./test/StartTest.es');
        errors = compilation.compiler.errors.filter(e=>e.code===0 ||e.code===1);
    });

    afterAll(()=>{
        errors.forEach( item=>{
            if( item.kind == 0 ){
               // fail( item.toString() )
            }
        });
        compilation = null;
    });

    it('should compile success and build', function() {
        expect('Expected 0 errors').toContain( errors.length );
        if( errors.length===0 ){
            creator.build( compilation );
        }
    });
    
});
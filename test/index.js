const compiler = require("./compiler");
const creator = new compiler.Creator();

describe('compile controller', function() {
    let compilation = null;
    let errors = [];
    beforeAll(async function() {
        compilation = await creator.startByFile('./app/controller/Index.es');
        errors = compilation.compiler.errors;
    });

    afterAll(()=>{
        errors.forEach( item=>{
            if( item.kind == 0 ){
                fail( item.toString() )
            }
        });
        compilation = null;
    });

    it('should compile success and build', async function() {
        expect('Expected 0 errors').toContain( errors.filter(e=>e.kind===0).length );
        await creator.build( compilation );
    });
    
});

describe('compile test', function() {

    let compilation = null;
    let errors = [];
    beforeAll(async function() {
        compilation = await creator.startByFile('./test/StartTest.es');
        errors = compilation.compiler.errors;
    });

    afterAll(()=>{
        errors.forEach( item=>{
            if( item.kind == 0 ){
                fail( item.toString() )
            }
        });
        compilation = null;
    });

    it('should compile success and build',async function() {
        expect('Expected 0 errors').toContain( errors.filter(e=>e.kind===0).length );
        await creator.build( compilation ); 
    });
    
});
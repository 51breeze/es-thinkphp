const {exec} = require('child_process');

exec(`${process.cwd()}/test/build/vendor/bin/phpunit ./test/build/test/ --bootstrap test/autoload.php --include-path ${process.cwd()}/test/build`,(error,stdout,stderr)=>{
    console.log(stdout);
});
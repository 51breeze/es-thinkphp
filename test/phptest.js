const {exec} = require('child_process');

const root = __dirname.replace(/\\/g,'/');

exec(`${root}/vendor/bin/phpunit ${root}/build/test/ --bootstrap ${root}/autoload.php --include-path ${root}/build`,(error,stdout,stderr)=>{
    console.log(stdout);
});
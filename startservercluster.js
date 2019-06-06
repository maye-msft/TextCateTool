const startWebApp = require('./server');


const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });

    setTimeout(function(){

        var exec = require('child_process').exec;
        exec('open http://localhost:3000/public/', function callback(error, stdout, stderr){
            console.log("please check web browser with url http://localhost:3000/public/")
        })
    }, 5000)

} else {
    
    startWebApp()

    //console.log(`Worker ${process.pid} started`);
}



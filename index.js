const { app, BrowserWindow } = require('electron')




// const { WebApp } = require('./server');

// WebApp()

let win

function createWindow() {
    

        // startWebServer()

    // const startWebApp = require('./server');

    // startWebApp()


    var exec = require('child_process').exec;
    exec('pwd', function callback(error, stdout, stderr){
        console.log(stdout)
        exec('node startserver.js', function callback(error, stdout, stderr){
            console.log(error)
            console.log(stdout)
            console.log(stderr)

            win = new BrowserWindow({ width: 800, height: 600 })

            win.loadURL('http://localhost:3000/public/index.html')
        
            win.on('closed', () => {
                win = null
            })
        })
    });


        
}




app.on('ready', createWindow)


app.on('window-all-closed', () => {
    app.quit()
})

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})

// // Quit when all windows are closed.
// app.on('window-all-closed', function() {
//     // On OS X it is common for applications and their menu bar
//     // to stay active until the user quits explicitly with Cmd + Q
//     if (process.platform != 'darwin') {
//       app.quit();
//     }
//   });

function startWebServer() {
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
    } else {

        startWebApp()

        console.log(`Worker ${process.pid} started`);
    }
}


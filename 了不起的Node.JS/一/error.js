var http = require('http');

http.createServer(function (){

    a()
}).listen(3000);

function a (){
    b();
}

function b(){
    
    setTimeout(function() {
        
       throw new Error('error')
    }, 300);
}

// process.on('uncaughtException', function (error){
//     console.log(error);
// })
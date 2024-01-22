const {router} = require('./router');
//todo add a bunch of notes
const http = require('http');
const server = http.createServer((req,res)=>{
    router(req,res);
});

server.listen(3000);
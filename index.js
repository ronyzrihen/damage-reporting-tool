const {router} = require('./router');
//todo add a bunch of notes
const http = require('http');
const server = http.createServer((req,res)=>{
    router(req,res);
});
server.listen(3000);
console.log("Server: Listening on port 3000");
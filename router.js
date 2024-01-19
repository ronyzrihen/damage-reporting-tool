// const controller = require('controller');
const url = require('url')
const fs = require('fs');





module.exports = {router : (req,res) => {

    if (req.method === 'GET') {
        if(req.url === '/'){
            fs.readFile('./index.html', (err,data) => {
                if(err)
                    throw new Error(err);
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
                return;
            });

        }
    }
    if (req.method === 'POST') {

    }
    if (req.method === 'PUT') {

    }
    if (req.method === 'DELETE') {


    }
}};



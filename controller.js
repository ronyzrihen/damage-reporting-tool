const fs = require('fs');
const {getAll, getById, putReport} = require('./repository');
const url = require('url');

module.exports = {
    home: (req,res) =>{
        fs.readFile('./index.html', (err,data) => {
            if (err)
                throw new Error(err);
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        });
    },
    getReports : (req, res) => {
        const data = JSON.stringify(getAll());
        res.statusCode = 200;
        res.end(data);
    },
    getReportsById: (req, res) =>{
        const reqUrl = url.parse(req.url, true);
        id = reqUrl.query['id'];
        data = JSON.stringify(getById(id));
        res.writeHead(200, {'Content-Type':'application/json'});
        res.end(data);
    },
    updateReport : (req, res)=>{
        let reqBody = '';
        req.on('data', (chunk)=>{
            reqBody +=chunk;
        });

        req.on('end', ()=>{
            const data = JSON.parse(reqBody);
            putReport(data);

        })
    }
}

const fs = require('fs');
const {getAll, getById, writeReport} = require('./repository');
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
        const id = reqUrl.query['id'];
        const data = JSON.stringify(getById(id));
        res.writeHead(200, {'Content-Type':'application/json'});//todo add res 400 if not found
        res.end(data);
    },
    updateReport : (req, res)=>{
        let reqBody = '';
        req.on('data', (chunk)=>{
            reqBody +=chunk;
        });

        req.on('end', ()=>{
            const newReport = JSON.parse(reqBody);
            const data = getAll(); //todo not sure if to put this here or in repos

            if(req.method === 'PUT') {

                const reportIndex = data.findIndex(row => row["id"] === newReport["id"])
                if (reportIndex === -1) {
                    res.statusCode = 404;
                    req.end("Id not found.");
                    return;
                }

                data[reportIndex] = newReport;
                writeReport(data);
                res.statusCode = 201;
                res.end("Database updated successfully");
                return;
            }
            // POST REQUEST //todo consider dividing methods
            if(data.findIndex(row => row["id"] === newReport["id"]) !== -1){
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end("ID already exist.");
            }

            data.push(newReport);
            writeReport(data);
            res.statusCode = 201;
            res.end("New report was added");
        });
    }
    //todo deleteReport function

}

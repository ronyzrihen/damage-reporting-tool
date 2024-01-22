const {readReports, getById, deleteReport, putReport, postReport} = require('./repository');
const url = require('url');
//todo create ui

//function that extract ID from different url formats
const checkUrlId = (req)=>{
    const reqUrl = url.parse(req.url, true);
    const idString = req.url.split("/")[2];
    let urlId;
    if(req.url.split("/").length > 2 && idString.split("?")[0]) urlId = idString.split("?")[0];
    if(!urlId){
        urlId = reqUrl.query['id'];
    }
    return urlId;
}


module.exports = {
    home: (req, res) => {
        fs.readFile('./index.html', (err, data) => {
            if (err)
                throw new Error(err);
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        });
    },
    getReports: (req, res) => {
        const data = JSON.stringify(readReports());
        // check if DB has no content
        if (!data) {
            res.statusCode = 204;
            res.end();
        }
        res.statusCode = 200;
        res.end(data);
    },
    getReportsById: (req, res) => {
        const reqUrl= checkUrlId(req);
        const data = JSON.stringify(getById(reqUrl));
        if (!data) {
            res.statusCode = 404;
            res.end("ID not found.");
            return;
        }
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(data);
    },
    updateReport: (req, res) => {
        let reqBody = '';
        req.on('data', (chunk) => {
            reqBody += chunk;
        });

        req.on('end', () => {
            const newReport = JSON.parse(reqBody);
            const reqId = checkUrlId(req);
            // check if id was given
            if (req.method === 'PUT') {
                if (!reqId) {
                    res.statusCode = 404;
                    res.end("id not provided");
                    return;
                }
                try {
                    putReport(newReport, reqId);
                    res.statusCode = 201;
                    res.end("Database updated successfully");
                    return;
                } catch (err) {
                    res.statusCode = 404;
                    res.end(err.message);
                }
            }
            // POST REQUEST
            try {
                postReport(newReport);
                res.statusCode = 201;
                res.end("New report was added");
            } catch (err) {
                res.statusCode = 400;
                res.end(err.message);
            }

        });
    },
    deleteReport: (req, res) => {
        const reqId = checkUrlId(req);
        // checkin if request had specified ID in query string
        if (!reqId) {
            res.statusCode = 404;
            res.end("ID not found.");
        }
        try {
            deleteReport(reqId);
            res.statusCode = 204;
            res.end("Deleted successfully");
        } catch (err) {
            res.statusCode = 404;
            res.end("ID not found.");
        }
    }


}

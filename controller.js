const {readReports, getById, deleteReport, putReport, postReport} = require('./repository');
const url = require('url');
const fs = require('fs');
//todo create ui

//function that extract ID from different url formats
const checkUrlId = (req)=>{
    const reqUrl = url.parse(req.url, true);
    const idString = req.url.split("/")[2];
    let urlId;
    // check if id exist in URL path
    if(req.url.split("/").length > 2 && idString.split("?")[0]){
        urlId = idString.split("?")[0];
    }
    // check if id exist in query
    if(!urlId){
        urlId = reqUrl.query['id'];
    }
    return urlId;
}

// function to send responses and error messages
const errorHandle = (res, statusCode, msg= "" , contentType = 'text/plain')=>{
    res.statusCode = statusCode;
    res.setHeader('Content-Type', contentType);
    res.end(msg);
    console.log(`response sent: ${statusCode}, ${msg} `);
}


module.exports = {
    home: (req, res) => {
        fs.readFile('./index.html', (err, data) => {
            if (err)
                throw err;
            errorHandle(res, 200, data, 'text/html');
        });
    },
    getReports: (req, res) => {
        const data = JSON.stringify(readReports());
        // check if DB has no content
        if (!data) {
            errorHandle(res,204 );
        }
        errorHandle(res, 200, data, "application/json");
    },
    getReportsById: (req, res) => {
        const reqUrl= checkUrlId(req);
        const data = JSON.stringify(getById(reqUrl));
        if (!data) {
            errorHandle(res, 404, "id not found");
            return;
        }
        errorHandle(res, 200 , data, "application/json");
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
                    errorHandle(res, 404,  "id not provided");
                    return;
                }
                try {
                    putReport(newReport, reqId);
                    errorHandle(res, 201, "Database updated successfully");
                    return;
                } catch (err) {
                    errorHandle(res, 404, err.message);
                }
            }
            // POST REQUEST
            try {
                postReport(newReport);
                errorHandle(res, 201, "New report was added");
            } catch (err) {
                errorHandle(res, 400, err.message);
            }

        });
    },
    deleteReport: (req, res) => {
        const reqId = checkUrlId(req);
        // checkin if request had specified ID in query string
        if (!reqId) {
            errorHandle(res, 404, "id not found");
            return;
        }
        try {
            deleteReport(reqId);
            errorHandle(res, 204, "Deleted successfully");
        } catch (err) {
            errorHandle(res, 404, "id not found");
        }
    }


}

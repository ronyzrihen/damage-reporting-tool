const controller = require('./controller');
const url = require('url')
const fs = require('fs');





module.exports = {router : (req,res) => {
const {method, url} = req;
    if (method === 'GET') {
        if(req.url === '/'){
           controller.home(req,res);
        } else if(url === '/reports' || url === '/reports/'){
            controller.getReports(req, res);
        }else if(url.startsWith('/reports/')){
            controller.getReportsById(req, res);
        }
    } else if (method === 'PUT' || method === 'POST') { //todo might need to split those to
        controller.updateReport(req, res);
    } else if (method === 'DELETE') {


    }
}};



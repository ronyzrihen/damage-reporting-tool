const controller = require('./controller');

module.exports = {
    router: (req, res) => {
        const {method, url} = req;
        if (method === 'GET' && req.url === '/')  controller.home(req, res);
        else if (method === 'GET' && url === '/reports' || url === '/reports/')  controller.getReports(req, res);
        else if (method === 'GET' &&url.startsWith('/reports/')) controller.getReportsById(req, res);
        else if ((method === 'PUT' || method === 'POST') && url.startsWith("/reports")) controller.updateReport(req, res);
        else if (method === 'DELETE') controller.deleteReport(req, res);

        // handles default cases
        else {
            res.statusCode = 404;
            res.write("Page Not Found!");
            res.end();
        }
    }
};



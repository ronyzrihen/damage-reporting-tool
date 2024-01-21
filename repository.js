const reports = require('./DB/DB.json');
// return all reports:
const  getAll = () =>{
    return reports;
}

// returns report by ID
const getById = (id)=>{
    return reports.find((report) => report.id === id);
}
// posting new report
const postReport = (report)=>{
    reports.push(report);
}

// put Report
const putReport = (report)=>{
    reports.findIndex(() => report.id)
}


module.exports = {getAll, getById, putReport}
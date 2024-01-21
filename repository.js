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

// post new item to


module.exports = {getAll, getById}
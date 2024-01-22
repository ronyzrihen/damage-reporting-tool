const {reports} = require('./DB/DB.json');
const fs = require('fs');
// return all reports:
const readReports = () => {
    return reports;
};

// write updates database
const writeReport = (data) => {
    const newData = {"reports": data}; // rebuilding data into DB
    fs.writeFileSync('./DB/DB.json', JSON.stringify(newData));
};
// returns report by ID
const getById = (id) => {
    return reports.find((report) => report["id"] === id);
};

// put report
const putReport = (report, reportId) => {
    const reportIndex = reports.findIndex(row => row["id"] === reportId);
    if (reportIndex === -1) throw new Error("id not found");
    // checking if id was updated
        if (report["id"] !== reportId) {
        const existingId = reports.findIndex(row => row["id"] === report["id"]);
        if(existingId !== -1) throw new Error("Trying to change id to an already existing id");
    }
    reports[reportIndex] = report;
    writeReport(reports);
};

// post report
const postReport = (report) => {
    if (reports.findIndex(row => row["id"] === report["id"]) !== -1) {
        throw new Error("Already exist");
    }
    reports.push(report);
    writeReport(reports);
};

//delete report
const deleteReport = (id) => {
    if (reports.findIndex(row => row["id"] === id) === -1) {
        throw new Error("Not found");
    }
    const newData = reports.filter(row => row["id"] !== id);
    writeReport(newData);
};


module.exports = {readReports, getById, writeReport, deleteReport, putReport, postReport}
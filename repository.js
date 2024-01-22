const {reports} = require('./DB/DB.json');
const fs = require('fs');
// return all reports:
const  getAll = () =>{
    return reports;
}

// returns report by ID
const getById = (id)=>{
    return reports.find((report) => report["id"] === id);
}

// update database
const writeReport = (data)=>{
    const newData = {"reports":data}; // rebuilding data into DB
    fs.writeFileSync('./DB/DB.json', JSON.stringify(newData));
};


module.exports = {getAll, getById, writeReport}
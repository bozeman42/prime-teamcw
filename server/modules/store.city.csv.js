let pool = require('./pool.js');
let csv = require('fast-csv');
var fs = require('fs');
let Stream = require('stream');

function processCityCSV(dataInfo) {
  console.log('Processing data csv');
  console.log('Path', dataInfo.path);
  return new Promise((resolve, reject) => {
    console.log('checking if file exists');
    console.log('file exists');
    let bufferStream = new Stream.PassThrough();
    bufferStream.end(dataInfo.data);
    csv.fromStream(bufferStream, {
      quote: '"',
      headers: true
    })
      .on("data", function (data) {
        for (var prop in data) {
          if (data[prop] === undefined || data[prop] === '') {
            data[prop] = null;
          }
        }
        dataInfo.uploadedData.push(data);
      })
      .on("end", function (data) {
        storeCityCSV(dataInfo)
          .then((result) => {
            resolve(result);
          });
      });
  });
}

function storeCityCSV(dataInfo) {
  console.log('attempting to store object');
  return new Promise((resolve, reject) => {
    let data = dataInfo.uploadedData;
    let user = dataInfo.user;
    let batchId = dataInfo.batchId;
    data.forEach((city) => {
      pool.connect(function (errorConnecting, db, done) {
        if (errorConnecting) {
          console.log('Error connecting', errorConnecting);
          reject(errorConnecting);
        } else {
          var queryText = 'INSERT INTO "dbo_PROP_City" ("City_ID", "City", "Created_User", "Created_Date", "Modified_User", "Modified_Date") ' +
            'VALUES($1,$2,$3,$4,$5,$6);';
          db.query(queryText, [
            city.City_ID,
            city.City,
            city.Created_User,
            city.Created_Date,
            city.Modified_User,
            city.Modified_Date
          ], function (errorMakingQuery, result) {
            done();
            if (errorMakingQuery) {
              console.log('Error making property database entries', errorMakingQuery);
              console.log('error with this property:', city);
              reject(errorMakingQuery);
            }
          });
        }
      }); //end of pool
    });
    resolve(true);
  });
}

module.exports = processCityCSV;
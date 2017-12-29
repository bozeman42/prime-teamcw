let pool = require('./pool.js');
let csv = require('fast-csv');
let Stream = require('stream');

function processDatasetCSV(dataInfo) {
  console.log('Processing data csv');
  return new Promise((resolve, reject) => {
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
        storeDatasetCSV(dataInfo)
          .then((result) => {
            resolve(result);
          });
      });
  });
}

function storeDatasetCSV(dataInfo) {
  console.log('attempting to store object');
  return new Promise((resolve, reject) => {
    let data = dataInfo.uploadedData;
    let user = dataInfo.user;
    let batchId = dataInfo.batchId;
    data.forEach((dataset) => {
      pool.connect(function (errorConnecting, db, done) {
        if (errorConnecting) {
          console.log('Error connecting', errorConnecting);
          reject(errorConnecting);
        } else {
          var queryText = 'INSERT INTO "dbo_RPRT_Dataset" ("Report_Dataset_ID","Dataset_ID","Dataset_Label",' +
            '"Dataset_Desc","Period_Type_ID","Period_Type_Interval_ID","Period_Year", ' +
            '"Created_User","Created_Date","Modified_User","Modified_Date") ' +
            'VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11);';
          db.query(queryText, [
            dataset.Report_Dataset_ID,
            dataset.Dataset_ID,
            dataset.Dataset_Label,
            dataset.Dataset_Desc,
            dataset.Period_Type_ID,
            dataset.Period_Type_Interval_ID,
            dataset.Period_Year,
            dataset.Created_User,
            dataset.Created_Date,
            dataset.Modified_User,
            dataset.Modified_Date,
          ], function (errorMakingQuery, result) {
            done();
            if (errorMakingQuery) {
              console.log('Error making dataset database entries', errorMakingQuery);
              console.log('error with this property:', dataset);
              reject(errorMakingQuery);
            }
          });
        }
      }); //end of pool
    });
    resolve(true);
  });
}

module.exports = processDatasetCSV;
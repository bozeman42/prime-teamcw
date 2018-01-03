let pool = require('../modules/pool.js');
let csv = require('fast-csv');
let Stream = require('stream');

// process lines of email CSV data to produce generated email addresses. Returns an array of data lines
let processLine = require('../modules/address.generator');

function processContactCSV(dataInfo) {
  return new Promise((resolve, reject) => {
    let bufferStream = new Stream.PassThrough();
    bufferStream.end(dataInfo.data);
    csv.fromStream(bufferStream, {
      headers: true
      // use the array below instead of 'true' if you wish to 
      // omit headers from the CSV instead of the headers being
      // in the first line of the CSV
      //
      // [
      //     'first',
      //     'last',
      //     'title',
      //     'company',
      //     'domain',
      //     'building',
      //     'market',
      //     'email'
      // ]
    })
      .on("data", function (data) {
        // generates email addresses from names and company domains and pushes the results to uploadedData
        processLine(data).forEach((line) => {
          dataInfo.uploadedData.push(line);
        });
      })
      .on("end", function (data) {
        resolve(storeEmailCSV(dataInfo));
      });
  });
}


// store email CSV in database
function storeEmailCSV(dataInfo) {
  return new Promise((resolve, reject) => {
    let success = true;
    let data = dataInfo.uploadedData;
    let user = dataInfo.user;
    let batchId = dataInfo.batchId;
    console.log('attempting to store Email CSV');
    data.forEach((contact) => {
      pool.connect(function (errorConnecting, db, done) {
        if (errorConnecting) {
          console.log('Error connecting', errorConnecting);
          reject(errorConnecting);
        } else {
          let queryText = 'INSERT INTO "emails" ("first","last","title","company","domain","building","market","email","office_id","batch_id") VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10);';
          db.query(queryText, [
            contact.first,
            contact.last,
            contact.title,
            contact.company,
            contact.domain,
            contact.building,
            contact.market,
            contact.email,
            user.o_id,
            batchId
          ], function (errorMakingQuery, result) {
            done();
            if (errorMakingQuery) {
              console.log('error making email entry query', errorMakingQuery);
              reject(errorMakingQuery);
            } else {

            }
          });
        }
      }); //end of pool
    });
    resolve(batchId);
  });
}

module.exports = processContactCSV;
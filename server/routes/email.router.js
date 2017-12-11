var express = require('express');
var router = express.Router();
var csv = require('fast-csv');
var fs = require('fs');
var pool = require('../modules/pool');

// process lines of email CSV data to produce generated email addresses. Returns an array of data lines
var processLine = require('../modules/address.generator');

var uploadedData = [];

router.post('/csv/', function (req, res) {
    if (req.isAuthenticated) {
        console.log('this user uploaded data',req.user);
        uploadedData = [];
        console.log('req.files', req.files);
        var path = './server/upload/' + req.files.file.name;
        console.log('path', path);
        req.files.file.mv(path, function (error) {
            if (error) {
                console.log('error moving file', error);
                return res.sendStatus(500);
            }
        });

        fs.exists(path, function (exists) {
            if (exists) {
                var stream = fs.createReadStream(path);
                csv.fromStream(stream, {
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
                        console.log('Data Line:', data);
                        // push each line of returned data to the result.
                        processLine(data).forEach((line) => {
                            uploadedData.push(line);
                        });
                    })
                    .on("end", function (data) {
                        console.log('processed data from CSV', uploadedData);
                        storeEmailCSV(uploadedData);
                    });
            }
        });
    }
});

// store email CSV in database
function storeEmailCSV(data) {
    pool.connect(function (errorConnecting, db, done) {
        if (errorConnecting) {
            console.log('Error connecting', errorConnecting);
            res.sendStatus(500);
        } else {
            var queryText = 'INSERT INTO "emails" ("first","last","title","company","domain","building","market","email","office_id") VALUES($1);';
            db.query(queryText, [newOffice.name], function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    console.log('errorMakingQuery', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                }
            })
        }
    }) //end of pool
    return;
}


module.exports = router;
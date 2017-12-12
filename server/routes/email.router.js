var express = require('express');
var router = express.Router();
var csv = require('fast-csv');
var fs = require('fs');
var pool = require('../modules/pool');

// process lines of email CSV data to produce generated email addresses. Returns an array of data lines
var processLine = require('../modules/address.generator');

var uploadedData = [];

router.get('/',function(req,res){
    console.log(req.query);
    batchId = req.query.batchId;
    pool.connect(function (errorConnecting, db, done) {
        if (errorConnecting) {
            console.log('Error connecting', errorConnecting);
            res.sendStatus(500);
        } else {
            var queryText = 'SELECT * FROM "emails" WHERE "batch_id" = $1;';
            db.query(queryText, [
                batchId
            ], function (errorMakingQuery, result) {
                console.log('used this batchId',batchId)
                done();
                if (errorMakingQuery) {
                    console.log('error making query',errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                }
            });
        }
    }); //end of pool
});

router.post('/csv/', function (req, res) {
    if (req.isAuthenticated) {
        var dataInfo = {
            uploadedData: [],
            user: req.user,
            batchId: -1,
            path: './server/upload/emailcsvs/' + req.files.file.name,
            fileName: req.files.file.name
        };

        console.log('DATA INFO:',dataInfo);

        console.log('path', dataInfo.path);
        req.files.file.mv(dataInfo.path, function (error) {
            if (error) {
                console.log('error moving file', error);
                return res.sendStatus(500);
            }

            dataInfo.batchId = createBatch(dataInfo)
                .then((batchId) => {
                    console.log('created batch');
                    dataInfo.batchId = batchId;
                    processContactCSV(dataInfo)
                    .then((batch)=>{
                        console.log('responding positively!',batch);
                        result = {
                            batchId: batch
                        };
                        res.send(result);
                    });
                })
                .catch((error) => {
                    res.sendStatus(500);
                });
        });
    }
});

function createBatch(dataInfo) {
    return new Promise((resolve, reject) => {
        pool.connect(function (errorConnecting, db, done) {
            if (errorConnecting) {
                reject(errorConnecting);
            } else {
                var queryText = 'INSERT INTO "email_batch" ("file_name","user_id","office_id") VALUES($1,$2,$3) RETURNING "batch_id";';
                db.query(queryText, [
                    dataInfo.fileName,
                    dataInfo.user.id,
                    dataInfo.user.o_id,
                ], function (errorMakingQuery, result) {
                    done();
                    if (errorMakingQuery) {
                        reject(errorMakingQuery);
                    } else {
                        resolve(result.rows[0].batch_id);
                    }
                });
            }
        }); //end of pool
    });
}

function processContactCSV(dataInfo) {
    return new Promise((resolve, reject) => {
        fs.exists(dataInfo.path, function (exists) {
            if (exists) {
                var stream = fs.createReadStream(dataInfo.path);
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
                        // generates email addresses from names and company domains and pushes the results to uploadedData
                        processLine(data).forEach((line) => {
                            dataInfo.uploadedData.push(line);
                        });
                    })
                    .on("end", function (data) {
                        resolve(storeEmailCSV(dataInfo));
                    });
            }
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
        data.forEach((contact) => {
            pool.connect(function (errorConnecting, db, done) {
                if (errorConnecting) {
                    console.log('Error connecting', errorConnecting);
                    reject(errorConnecting);
                } else {
                    var queryText = 'INSERT INTO "emails" ("first","last","title","company","domain","building","market","email","office_id","batch_id") VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10);';
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
                            console.log('error making query',errorMakingQuery);
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


module.exports = router;
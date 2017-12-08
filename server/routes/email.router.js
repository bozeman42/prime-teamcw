var express = require('express');
var router = express.Router();
var csv = require('fast-csv');
var fs = require('fs');
var pool = require('../modules/pool');

var uploadedData = [];

router.post('/csv/', function (req, res) {
    uploadedData = [];
    console.log(req.files);
    var path = './server/upload/' + req.files.file.name;
    console.log('path',path);
    req.files.file.mv(path, function(error){
        if (error){
            console.log('error moving file', error);
            return res.sendStatus(500);
        }
    });

    fs.exists(path, function (exists) {
        if (exists) {
            var stream = fs.createReadStream(path);
            csv.fromStream(stream, {
                headers: [
                    'first',
                    'last',
                    'title',
                    'company',
                    'domain',
                    'building',
                    'market',
                    'email'
                ]
            })
            .on("data",function(data){
                uploadedData.push(data);
            })
            .on("end",function(data){
                console.log(uploadedData);
            })
        }
    })
});



module.exports = router;
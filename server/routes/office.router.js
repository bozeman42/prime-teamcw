var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');

var poolModule = require('../modules/pool.js');
var pool = poolModule;

//RETRIEVE ALL OFFICES
router.get('/', function (req, res){
    pool.connect(function (errorConnecting, db, done) {
        if (errorConnecting) {
          console.log('Error connecting ', errorConnecting);
          res.sendStatus(500);
        } else {
          //select owner, pet, breed, color, checkin, and checkout
          var queryText = `SELECT * from "offices";`
          db.query(queryText, function (errorMakingQuery, result) {
            done();
            if (errorMakingQuery) {
              console.log('errorMakingQuery', errorMakingQuery);
              res.sendStatus(500);
            } else {
              res.send(result.rows);
            }
          });
        }
      });//end of pool
})

//ADD A NEW OFFICE
router.post('/', function (req, res) {
    var newOffice = req.body;
    pool.connect(function (errorConnecting, db, done) {
        if (errorConnecting) {
            console.log('Error connecting', errorConnecting);
            res.sendStatus(500);
        } else {
            var queryText = 'INSERT INTO "offices" ("office") VALUES($1);';
            db.query(queryText, [newOffice.name], function (errorMakingQuery, result){
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
}) // end of post

module.exports = router;
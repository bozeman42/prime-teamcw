var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');

var poolModule = require('../modules/pool.js');
var pool = poolModule;

//RETRIEVE ALL OFFICES
router.get('/', function (req, res) {
    pool.connect(function (errorConnecting, db, done) {
        if (errorConnecting) {
            console.log('Error connecting ', errorConnecting);
            res.sendStatus(500);
        } else {
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
    if (req.isAuthenticated()) {
        var newOffice = req.body;
        pool.connect(function (errorConnecting, db, done) {
            if (errorConnecting) {
                console.log('Error connecting', errorConnecting);
                res.sendStatus(500);
            } else {
                var queryText = 'INSERT INTO "offices" ("office") VALUES($1);';
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
    } else {
        res.sendStatus(401);
    }
}) // end of post

router.delete('/:id', function (req, res) {
    if (req.isAuthenticated()) {
        var officeToDelete = req.params.id;
        console.log('office id = ', officeToDelete);
        pool.connect(function (errorConnecting, db, done) {
            if (errorConnecting) {
                console.log('Error connecting', errorConnecting);
                res.sendStatus(500);
            } else {
                var queryText = 'DELETE FROM "offices" WHERE "office_id" = $1';
                db.query(queryText, [officeToDelete], function (errorMakingQuery, result) {
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
    } else {
        res.sendStatus(401);
    }
}) // end of post

router.put('/:id', function (req, res) {
    var officeId = req.params.id;
    var newOffice = {
        name: req.body.name
    }
    pool.connect(function (errorConnectingToDb, db, done) {
        if (errorConnectingToDb) {
            // There was an error and no connection was made
            console.log('Error connecting', errorConnectingToDb);
            res.sendStatus(500);
        } else {
            // We connected to the db!!!!! pool -1
            //added ordering
            let queryText = 'UPDATE "offices" SET "office" = $1 WHERE "office_id" = $2;';
            db.query(queryText, [newOffice.name, officeId], function (errorMakingQuery, result) {
                done(); // pool +1
                if (errorMakingQuery) {
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            }); // END QUERY
        }
    }); // END POOL
})

module.exports = router;
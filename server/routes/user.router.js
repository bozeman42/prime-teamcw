var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');


// Handles Ajax request for user information if user is authenticated
router.get('/', function (req, res) {
    console.log('get /user route');
    // check if logged in
    if (req.isAuthenticated()) {
        // send back user object from database
        console.log('logged in', req.user);
        var userInfo = {
            username: req.user.username
        };
        res.send(userInfo);
    } else {
        // failure best handled on the server. do redirect here.
        console.log('not logged in');
        // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
        res.send(false);
    }
});

// clear all server session information about this user
router.get('/logout', function (req, res) {
    // Use passport's built-in method to log out the user
    console.log('Logged out');
    req.logOut();
    res.sendStatus(200);
});

router.get('/refreshUser', function (req, res, next) {
    pool.connect(function (err, client, done) {
        if (err) {
            console.log("Error connecting: ", err);
            res.sendStatus(500);
        }
        client.query("SELECT e_id, username, firstname, lastname, office, role FROM users ORDER BY e_id",
            function (err, result) {
                client.end();
                if (err) {
                    console.log("Error inserting data: ", err);
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                }
            });
    });
});

router.delete('/:e_id', function(req,res){
    var empId = req.params.e_id;
    pool.connect(function (errorConnectingToDb, db, done) {
        if (errorConnectingToDb) {
            // There was an error and no connection was made
            console.log('Error connecting', errorConnectingToDb);
            res.sendStatus(500);
        } else {
            // We connected to the db!!!!! pool -1
            //added ordering
            let queryText = 'DELETE FROM "users" WHERE "e_id" = $1';
            db.query(queryText, [empId], function (errorMakingQuery, result) {
                // We have received an error or result at this point
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
});

router.put('/:employeeId', function(req,res) {
    var empId = req.params.employeeId;
    var editedUser = {
        e_id: req.body.e_id,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        office: req.body.office,
        role: req.body.role,
        username: req.body.username
    }

    console.log(empId);
    console.log('edited user is ', editedUser);
    pool.connect(function (errorConnectingToDb, db, done) {
        if (errorConnectingToDb) {
            // There was an error and no connection was made
            console.log('Error connecting', errorConnectingToDb);
            res.sendStatus(500);
        } else {
            // We connected to the db!!!!! pool -1
            //added ordering
            let queryText = 'UPDATE "users" SET "e_id" = $1, "firstname" = $2, "lastname" = $3, "office" = $4, "role" = $5, "username" = $6 WHERE "e_id" = $7;';
            db.query(queryText, [editedUser.e_id, editedUser.firstname, editedUser.lastname, editedUser.office, editedUser.role, editedUser.username, empId], function (errorMakingQuery, result) {
                // We have received an error or result at this point
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

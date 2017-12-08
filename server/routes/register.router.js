var express = require('express');
var router = express.Router();
var path = require('path');
var pool = require('../modules/pool.js');
var encryptLib = require('../modules/encryption');

// Handles request for HTML file
router.get('/', function (req, res, next) {
    console.log('get /register route');
    res.sendFile(path.resolve(__dirname, '../public/views/templates/register.html'));
});

// Handles POST request with new user data
router.post('/', function (req, res, next) {

    var saveUser = {
        e_id: req.body.e_id,
        username: req.body.username,
        password: encryptLib.encryptPassword(req.body.password),
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        role: req.body.role,
        office: req.body.office,
        superuser: null
    };
    console.log('new user:', saveUser);

    if(saveUser.role === 'owner') {
        saveUser.superuser = true;
    }

    pool.connect(function (err, client, done) {
        if (err) {
            console.log("Error connecting: ", err);
            res.sendStatus(500);
        }
        client.query("INSERT INTO users (e_id, username, password, firstname, lastname, role, office, superuser) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id",
            [saveUser.e_id, saveUser.username, saveUser.password, saveUser.firstname, saveUser.lastname, saveUser.role, saveUser.office, saveUser.superuser],
            function (err, result) {
                client.end();

                if (err) {
                    console.log("Error inserting data: ", err);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                }
            });
    });

});

router.get('/checkSuper', function (req, res, next) {
    pool.connect(function (err, client, done) {
        if (err) {
            console.log("Error connecting: ", err);
            res.sendStatus(500);
        }
        client.query("SELECT * FROM users WHERE superuser = true;",
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


module.exports = router;

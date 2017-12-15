var express = require('express');
var router = express.Router();
var request = require('request');
const API_KEY = process.env.API_KEY;
var username = 'cushwake';

router.get('/', function(req,res) {
    var uri = 'https://' + username + ':' + API_KEY + '@us17.api.mailchimp.com/3.0/lists/8bb5bb9fba/members';
    // request.get({
    //     url: 'https://us-17.api.mailchimp.com/3.0/lists/8bb5bb9fba/members',
    //     user: username + ':' + API_KEY
    // })
    console.log('this is uri', uri);
    request({method: 'GET', uri:uri}, function(err, response, body) {
        if(err) {
            console.log('Error searching', err);
            res.sendStatus(500);
        } else {
            console.log(body);
            res.send(body);
        }
    })
})

module.exports = router;
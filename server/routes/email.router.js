var express = require('express');
var router = express.Router();

router.post('/csv/',function(req,res) {
    console.log(req.files);
    res.sendStatus(200);
});

module.exports = router;
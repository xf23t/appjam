var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var connection = mysql.createConnection({

    'host': 'aws-rds-my-sql.czyy7a7mm4rr.us-west-2.rds.amazonaws.com',
    'user': 'user',
    'password': 'password',
    'database': 'board',
});

router.get('/logout',function(req, res){
    req.session.destroy(function(err){
        if(err) console.error('err',err);
        res.send('<script>alert("로그아웃!");location.href="/";</script>');
    });
});

module.exports = router;
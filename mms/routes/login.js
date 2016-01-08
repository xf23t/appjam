var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var connection = mysql.createConnection({

    'host': 'aws-rds-my-sql.czyy7a7mm4rr.us-west-2.rds.amazonaws.com',
    'user': 'user',
    'password': 'password',
    'database': 'board',
});

router.post('/login', function (req.res.next) {
            connection.query('select user_idx from user where user_id_email=? AND user_pw=?', [req.body.user_id_email, req.body.user_pw], function (error, cursor) {

                        if (cursor.length > 0) //아이디와 비밀번호가 일치하는 것이 있다면~~
                            res.status(200);
                        else
                            res.sttus(503).json({   //아이디와 비밀번호가 일치하지 않다면~~
                                result: false,
                                reason: "Cannot find selected ID"   
                            });
            });
});

module.exports = router;


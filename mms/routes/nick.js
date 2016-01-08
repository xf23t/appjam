var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var connection = mysql.createConnection({

    'host': 'aws-rds-my-sql.czyy7a7mm4rr.us-west-2.rds.amazonaws.com',
    'user': 'user',
    'password': 'password',
    'database': 'server',
});

router.post('/nick', function (req, res, next) {    //닉네임 중복확인 (아이디 중복확인과 동일하게
            connection.query('select * from user where user_nick=?;' [req.body.user_nick], function (error, cursor) {
                        if (cursor.length !=0){
                            res.status(403).json({
                                result : false,
                                reason : "This Nickname is Already exist"
                            });
                        }
                        else        //중복이 아닐경우 서버에 저장 후 다음 화면
                            connection.query('insert into user(user_nick) values (?);', [req.body.user_nick]);
            });
});

module.exports = router;
                                            
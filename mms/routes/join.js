var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var connection = mysql.createConnection({

    'host': 'aws-rds-my-sql.czyy7a7mm4rr.us-west-2.rds.amazonaws.com',
    'user': 'user',
    'password': 'password',
    'database': 'board',

});

router.post('/Join', function (req, res, next) { //아이디 중복확인 
    connection.query('select * from user where user_id_email=?;' [req.body.user_id_email], function (error, cursor) {
        if (cursor.length != 0) {
            res.status(403).json({
                result: false,
                reason: "This E-mail is already exist!"
            });
        } else //중복이 없을 경우아이디, 비밀번호 서버에 저장(올바른 데이터일 경우)

            connection.query('insert into user(user_id_email, user_pw) values (?,?);', [req.body.user_id_email, req.body.user_pw]);

        //                res.writeHead(302, {
        //                'Location': '/agree'
        //            });
    });
});

module.exports = router;
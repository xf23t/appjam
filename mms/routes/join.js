var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var connection = mysql.createConnection({

    'host': 'aws-rds-my-sql.czyy7a7mm4rr.us-west-2.rds.amazonaws.com',
    'user': 'user',
    'password': 'password',
    'database': 'server',

});

router.post('/', function (req, res, next) { //아이디 중복확인 
    var id = req.body.user_id_email; //id 라고 변경함
    var pw = req.body.user_pw;

    connection.query('select count(*) cnt from user where user_id_email=?;' [id], function (error, info) {
        if (error) console.error('error', error);
        console.log('info', info);
        var cnt = info[0].cnt;
        if (cnt == 0) {
            
            /*        if (cursor.length != 0) {
                        res.status(403).json({
                            result: false,
                            reason: "This E-mail is already exist!"
                        });
                    } else //중복이 없을 경우아이디, 비밀번호 서버에 저장(올바른 데이터일 경우)
            */
            connection.query('insert into user(user_id_email, user_pw) values (?,?);', [id, pw]);
        } else {
            res.status(503).json({
                result: false,
                reason: "This e-mail is already exist",
            });
        }

    });
});

module.exports = router;
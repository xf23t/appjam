var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var connection = mysql.createConnection({

    'host': 'aws-rds-my-sql.czyy7a7mm4rr.us-west-2.rds.amazonaws.com',
    'user': 'user',
    'password': 'password',
    'database': 'server',
});

/*
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
*/

router.post('/', function (req, res, next) {
    var id = req.body.user_id_email;
    var pw = req.body.user_pw;

    // pool.getConnection(function (error, connection) {
    //    if (err) console.error('err', err);
    connection.query('select count(*) cnt from user where user_id_email=? AND user_pw=?;', [id, pw], function (error, info) {
        if (error) console.error('error', error);
        console.log('info', info);
        var cnt = info[0].cnt;
        if (cnt == 1) {     //아이디와 비밀번호가 존재하면, 

            connection.query('select * from user where user_id_email=?;', [id], function (error, cursor) {  //해당하는 아이디의 정보를 불러온다.

                if (cursor.length > 0) {   // (확인)

                    res.json({

                        result: true,
                        id: cursor[0].user_id_email,
                        pw: cursor[0].user_pw,
                        nick: cursor[0].user_nick,
                    });
                }

            });
        } else {            // cnt ==0 일치하는 정보가 없다면
            res.status(503).json({
                result: false,
                reason: "Cannot login",
            });
        }
    });

});


module.exports = router;

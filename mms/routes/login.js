var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var connection = mysql.createConnection({

    'host': 'aws-rds-my-sql.czyy7a7mm4rr.us-west-2.rds.amazonaws.com',
    'user': 'user',
    'password': 'password',
    'database': 'board',
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

router.post('/login', function(req, res, next){
    var id= req.body.user_id_email;
    var pw= req.body.user_pw;
    
    pool.getConnection(function(error, connection){
        if(err) console.error('err',err);
        connection.query('select count(*) cnt from user where user_id_email=? AND user_pw=?', [id,pw], function(error, rows){
            if(err) console.log('err',err);
            console.log('rows',rows);
            var cnt = rows[0].cnt;
            if(cnt == 1){
                req.session.user_id_email=id;
                res.send('<script>alert("정상 로그인");location.href="/";<script>');
            }
            else{
                req.json({result : 'fail'});
                res.send('<script>alert("아이디 or 비번 오류");history.back();</script>');
            }
        });
    });
});
        


module.exports = router;


var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var connection = mysql.createConnection({

    'host': 'aws-rds-my-sql.czyy7a7mm4rr.us-west-2.rds.amazonaws.com',
    'user': 'user',
    'password': 'password',
    'database': 'board',
});

//게시글의 제목, 내용, 
router.get('/home', function (req, res, next){ connection.query('select board_title, board_contents, board_pic, board_hit, board_like_count, board_comment_count, board regdate from board where  
                                                                //1,2,3위 가져오는거 하나랑 내 전공 글들 가져오기 ( 등록 날짜 순으로)
                                                                
                                                                
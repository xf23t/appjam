var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({

    host: 'aws-rds-my-sql.czyy7a7mm4rr.us-west-2.rds.amazonaws.com',
    user: 'user',
    database: 'server',
    password: 'password'
});

router.post('/', function(req, res, next) {
     var middleClass = req.middleClass_idx;
    
  	 connection.query('insert into board(user_idx,middleClass_idx,bigClass_idx,board_title,board_contents) values(?,?,?,?,?)  ;', [req.body.user_idx,req.body.middleClass_idx,req.body.bigClass_idx,req.body.board_title, req.body.board_contents], function (error, info) {
        if (error == null) {
            connection.query('select * from board where board_title=?;', [req.body.board_title], function (error, cursor) {
                if (cursor.length > 0) {
                    res.json({
                        result : true, 
                        
			Usernick : cursor[0].user_idx,
                       MiddleClass : cursor[0].middleClass_idx,
                        BoardTitle : cursor[0].board_title,
                        BoardContents : cursor[0].board_contents,
                    });
                }
                else
                    res.status(503).json({ result : false, reason : "Cannot post article" });
            });
        }
        else
            res.status(503).json(error);
    });
});

module.exports = router;

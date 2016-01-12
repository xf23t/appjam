var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var connection = mysql.createConnection({
  
    host: 'aws-rds-my-sql.czyy7a7mm4rr.us-west-2.rds.amazonaws.com',
    user: 'user',
    database: 'server',
    password: 'password'
});

/* GET users listing. */
router.get('/', function(req, res, next) {
    
    res.redirect('/board');
});

router.get('/:board_idx', function(req,res,next){

   // connect.getConnection(function (err, connection) {
        // Use the connection
    
        connection.query('select m.middleClass_name,b.board_contents, u.user_nick, b.board_title, b.board_regdate, b.board_like_count from middleClass m,board b,user u where m.middleClass_idx=b.middleClass_idx and b.user_idx=u.user_idx and board_idx = ?  ;',[req.params.board_idx], function (err, cursor) {
           if (cursor.length > 0) {

//              res.json(cursor[0]);

            res.json({
              result: true,
              Class: cursor[0].middleClass_name,
            userName: cursor[0].user_nick,
             BoardTitle: cursor[0].board_title,
		BoardContents: cursor[0].board_contents,
                BoardRegdate: cursor[0].board_regdate,
                BoardHit : cursor[0].board_like_count,

                
            });
        }   else
            res.status(503).json({
                result: false,
                reason: "Error"
            });
            
            
 //           connection.release();

            // Don't use the connection here, it has been returned to the pool.
        });
    
});

module.exports = router;

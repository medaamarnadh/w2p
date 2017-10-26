var express = require('express');
var router = express.Router();
var fs = require('fs');
var content = fs.readFileSync(__dirname + '/sql-queries.xml');
var parser = require('xml-js');
var validator = require('./validator');
var userService = require('./user');
var util = require('./util');

var json = parser.xml2json(content, {
  sanitize: false
})
// returns a string containing the JSON structure by default
var sqlQueries = JSON.parse(json)['elements'][1].elements
sqlQueryMap = {}
for (var i = 0; i < sqlQueries.length; i++) {
  if (sqlQueries[i]['attributes']) {
    sqlQueryMap[sqlQueries[i]['attributes']['id']] = sqlQueries[i]['elements'][0]['cdata'];
  }
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register',function(req,res,next){
	var data = req.body;
	var obj = {};
	async.waterfall([
		function(){
			userService.checkEamilExists(req.body.email,function(err,result){
				if(err){
					callback('Something Went Wrong',null);
				}else if(result === true){
					callback('Email exists already',null);
				}else{
					callback(null,true);
				}
			});
		},function(result,callback){
			userService.register(data,function(err,result){
				if(err){
					obj.status = 'error';
					obj.error = {message:err};
				}else{
					obj.status = 'success';
					obj.data = result;
				}
			});
		}
		],function(err,result){
			if(err){
				obj.error = err;
				obj.status = 'error';
				if(err === 'Email exists already'){					
					util.sendResponse(res,400,obj);
				}else{
					util.sendResponse(res,500,obj);
				}
			}else{
					obj.status= 'success';
					obj.data = result;
					util.sendResponse(res,200,obj);
			}
		});
});

module.exports = router;

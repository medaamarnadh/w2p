var express = require('express');
var router = express.Router();
var content = fs.readFileSync(__dirname + '/sql-queries.xml');

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

});

module.exports = router;




exports.sendResponse = function(res,statusCode,data){
	res.statusCode = statusCode;
	res.send(data);
}
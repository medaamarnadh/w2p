exports.checkEmailExists = function(email,callback){
	excuteQuery.queryForAll(sqlQueryMap['getUserByEmail'],[email],function(err,result){
		if(err){
			callback(err,null);
		}else if(result.length){
			callback(null,true)
		}else{
			callback(null,false);
		}
	});
};



exports.register = function(user,callback){
	excuteQuery.inserAndReturnQuery(sqlQueryMap['register'],[user.name,user.email,user.password,user.password_salt,user.mobile],function(err,result){
		if(err){
			callback(err,null);
		}else{
			callback(null,result);
		}
	});
}

exports.sendPasswordSetEmailToUser = function(user,callback){

};
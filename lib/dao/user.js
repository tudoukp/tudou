var User=require('../models').User;

exports.getById=function(id,callback){
	User.findOne({_id:id},callback)
}

exports.getByUsername=function(username,callback){
	User.findOne({username:username},callback);
}


exports.save=function(user,callback){
	var user=new User(user);
	user.save(callback);
}
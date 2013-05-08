var User=require('../dao/').User;

exports.showLogin=function(req,res){
	//req.session._loginReferer=req.headers.referer;
	res.render('login',{error:""});
}

exports.login=function(req,res){
	var username=req.body.username,
		password=req.body.password;

	req.session.user_id="sdf";

	User.getByUsername(username,function(err,user){
		if(err){
			res.send("用户不存在",err.message);
		}else{
			if(user){

				if(user.password===password){
					//登陆操作 
					user.last_login=new Date();

					user.save();
					sendCookie(res,username,password);

					res.render("login",{info:'成功登陆',error:''})
					
				}else{
					res.render('login',{error:"密码错误"+user._id})
				}

			}else{
				res.render("login",{error:"不存在此用户名！"});
			}
		}
	})
}

exports.showRegister=function(req,res){
	res.render("register");
}

exports.register=function(req,res){
	var username=req.body.username,
		password=req.body.password,
		nickname=req.body.nickname;

	var u={username:username,
		password:password,
		nickname:nickname,
		create_at:new Date(),
		last_login:new Date()
	}

	User.save(u,function(err,user){
		if(err){
			console.log(err);
		}else{
			res.render("index");
		}
	})
}

function sendCookie(res,username,password){
	res.cookie("l",username+'.'+password);
}
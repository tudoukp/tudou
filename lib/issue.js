var pomelo=require("./pomelo");
	parseCookie = require('./util/cookie').parseCookie,
	User=require('./dao/').User;

module.exports=function(io){

	io.configure(function(){
		io.set('authorization',function(handshakeData,callback){


			if(handshakeData.userid){
				callback(null,true)
			}else if(handshakeData.headers.cookie){
				console.log(handshakeData.headers.cookie);


				var cookie=parseCookie(handshakeData.headers.cookie)['l'];

				//console.log(cookie);
				if(!cookie){
					callback("no cookie!",false);
					return;
				}

				var resf=cookie.split('.');

				User.getByUsername(resf[0],function(err,user){
					if(err){
						console.log(err);
						callback("尚未登陆",false)
					}else{
						if(user){

							if(pomelo.sessionService.exist(user._id)){
								console.log('用户'+user.nickname+'已存在于session中，可能用户已经在其他地方登陆');
								callback('用户'+user.nickname+'已存在于session中，可能用户已经在其他地方登陆',false);
							}else{
								handshakeData.userid=user._id;
								callback(null,true);
							}

							
						}else{
							console.log('验证出现问题！');
							callback("验证出现问题！",false);
						}
						
					}

				})
			}

		})
	})

	io.on('connection',function(socket){

		console.log(io.sockets.sockets);

		pomelo.sessionService.add(socket.handshake.userid,socket);   //首要任务是将socket标示符加入到session中

		console.log(pomelo.sessionService.count)

		socket.on('reconnect',function(){
			console.log('重新链接');
		})

		socket.on('disconnect',function(){

			pomelo.sessionService.leave(socket.handshake.userid);


			console.log("退出链接后还剩"+pomelo.sessionService.count+"个用户在线");
		})
	})
}
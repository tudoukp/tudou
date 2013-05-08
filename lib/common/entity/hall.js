//var channelService=require("../service/channelService.js");


//var channel=null;


var Hall=function(app){
	this.rooms={}
	this.users={}
	this._app=app;

	this.channel=this._app.channelService.getChannel("hall",true);
}

module.exports=Hall;

/**
*  删除房间
**/
Hall.prototype.del=function(rid){
	delete this.rooms[rid]
}

/**
*	用户离开大厅
**/
Hall.prototype.leave=function(uid){
	if(!uid){
		return false;
	}

	delete this.users[uid]
	this.channel.leave(uid);

	return true;
}

/**
* 用户进入大厅
**/
Hall.prototype.enter=function(uid,user){
	if(!uid && !user && arguments.length<2){
		return false;
	}

	this.users[uid]=user;
	this.channel.add(uid);

	return true;
}


Hall.prototype.getChannel=function(){
	return this.channel;
}




/**
*房间
**/
var room=function(id,opts,hall){
	this.id=id;

	this._hall=hall;

	this.users={};

	this.channel=hall._app.channelService.getChannel("room_"+id,true)  //为此房间创建一个管道

	//自定义选项和默认选项
	for(var i in option){
		option[i]=opts[i]||option[i];
	}
}


room.prototype.leave=function(uid){
	delete this.users[uid]
	if(this.size()<=0){
		this._hall.del(this.id);
	}
}

/**
*该房间的人数个数
**/
room.prototype.size=function(){

	var count=0;
	for(var i in users){
		i++;
	}

	return i;
}

room.prototype.getChannel=function(){
	return this.channel;
}

var option={
	num:2,   //房间限制人数
}


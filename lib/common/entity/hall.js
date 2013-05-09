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

Hall.prototype.createRoom=function(opts){
	var id=assignId(this.rooms);   //为新建立的房间指定一个ID

	this.rooms[id]=new Room(id,opts,this);

	if(this.rooms[id]){
		return this.rooms[id];
	}else{
		return null;
	}

}

Hall.prototype.allRoomInfo=function(){
	var tmp=new Array();
	for(var i in this.rooms){
		tmp.push(this.rooms[i].info());
	}

	return tmp;
}


Hall.prototype.getChannel=function(){
	return this.channel;
}


function assignId(rooms){
	for(var i=0;i<3000;i++){
		if(!rooms[i]) return i;
	}
}




/**
*房间
**/
var Room=function(id,opts,hall){
	this.id=id;

	this._hall=hall;

	this.users={};
	this.state=0;  //房间状态 0：准备中 . 1：已经开始

	this.channel=hall._app.channelService.getChannel("room_"+id,true)  //为此房间创建一个管道

	//自定义选项和默认选项
	for(var i in option){
		option[i]=opts[i]||option[i];
	}
}


Room.prototype.leave=function(uid){
	if(!uid) return;

	delete this.users[uid]
	this.channel.leave(uid); //为此房间配置的管道也应删除该用户
	if(this.size()<=0){
		this._hall.del(this.id);
		this.channel.destory();
	}
}

/**
*	房间普通信息
**/
Room.prototype.info=function(){
	var info={
			num:option.num,
			needPass:option.needPass,
			count:this.size(),
			state:this.state,
			type:option.type
		}

	return info;
}

/**
*该房间的人数个数
**/
Room.prototype.size=function(){

	var count=0;
	for(var i in users){
		i++;
	}

	return i;
}

Room.prototype.getChannel=function(){
	return this.channel;
}

var option={
	num:2,   //房间限制人数
	needPass:false,
	pass:'',
	type:0	//房间类型
}


var ChannelService=function(app,opts){

	opts=opts||{};
	this.app=app;
	this.channels={};
}

module.exports=ChannelService;

ChannelService.prototype.getChannel=function(name,create){
	var channel=this.channels[name];
	if(!channel && create){
		channel=this.channels[name]=new Channel(name,this);
	}
	return channel;
}


ChannelService.prototype.destoryChannel=function(name){
	delete this.channels[name];
}



var Channel=function(name,service){
	this.name=name;
	this.member=[];
	this._service=service;
	this._app=this._service.app;
}

Channel.prototype.add=function(uid){
	if(isExist(uid,this.member)){
		return;
	}

	this.member.push(uid);
}

Channel.prototype.leave=function(uid){
	for(var i in this.member){
		if(this.member[i]==uid){
			this.member.splice(i,1);
			break;
		}
	}
}

Channel.prototype.destory=function(){
	delete this._service[this.name];
}

Channel.prototype.emit=function(route,msg){
	this._app.sessionService.sendMessage(this.member,route,msg);
}


/**
*	检查数组中是否存在
**/
var isExist=function(uid,member){
	if(!(member instanceof Array)){
		return false;
	}

	for(var i=0;i<member.length;i++){
		if(member[i]==uid){
			return true;
		}
	}
	return false;
}
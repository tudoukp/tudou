var SessionService =function(){
	this.count=0;
	this.uidMap={}
}

module.exports=SessionService;


SessionService.prototype.add=function(uid,socket){
	var tmp=this.uidMap[uid];
	if(!tmp){
		this.uidMap[uid]=socket;
		this.count++;
		return true;
	}else{
		return false;
	}
}

SessionService.prototype.leave=function(uid){
	var tmp=this.uidMap[uid];
	if(tmp){
		delete this.uidMap[uid];
		this.count--;
	}
}

SessionService.prototype.exist=function(uid){
	var tmp=this.uidMap[uid];
	if(tmp){
		return true;
	}else{
		return false;
	}
}

SessionService.prototype.sendMessage=function(ids,route,msg){
	var _uidMap=this.uidMap;

	if(!ids || !route) return false;

	if(typeof ids === "number" 
		|| typeof ids === "string"){

		var tmp=_uidMap[ids];
		if(tmp)tmp.emit(route,msg);

		return true;
	}else if(ids instanceof Array){
		for(var i=0;i<ids.length;i++){
			var tmp=_uidMap[ids[i]];
			if(tmp){
				tmp.emit(route,msg);
			}
		}
		return true;
	}

	return false;
}


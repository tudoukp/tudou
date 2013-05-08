module.exports.parseCookie=function(cookie){
	var cookies={}  //存储cookie的键值对

	if(!cookie){
		return cookies;
	}

	var t=cookie.split(";");

	for(var i=0;i<t.length;i++){
		var tmp=t[i].split("=");
		cookies[tmp[0].trim()]=tmp[1].trim();
	}

	return cookies;
}
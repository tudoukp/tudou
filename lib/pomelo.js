var channelService=require("./common/service/channelService"),
	sessionService=require('./common/service/sessionService'),
	Hall=require('./common/entity/hall.js');



var Pomelo = module.exports={}

Pomelo.sessionService=new sessionService();
Pomelo.channelService=new channelService(Pomelo);
Pomelo.hall=new Hall(Pomelo);


Pomelo.start=function(io){
	console.log(io);
}
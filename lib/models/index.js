var mongoose=require('mongoose');
	


mongoose.connect("mongodb://localhost/pomelo",function(err){
	if(err){
		console.error('connect to %s error:',"mongodb://localhost/pomelo",err.message);
		process.exit(1);
	}
})


require("./user");


exports.User=mongoose.model("User");
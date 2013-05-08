var mongoose=require("mongoose"),
	Schema=mongoose.Schema;


var UserSchema=new Schema({
	username:{type:String},
	password:{type:String},
	nickname:{type:String},
	avatar:{type:String},
	create_at:{type:Date,default:Date.now},
	last_login:{type:Date,default:Date.now}
})


mongoose.model('User', UserSchema);
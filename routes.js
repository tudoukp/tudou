var sign=require("./lib/controllers/sign.js");
var hall=require('./lib/controllers/hall.js')

module.exports=function(app){
	app.get('/',function(req,res){
		res.render('index',{'layout':'layout.ejs'});
	})

	app.get('/login',sign.showLogin)
	app.post('/login',sign.login)

	app.get("/register",sign.showRegister)
	app.post("/register",sign.register)

	app.get('/hall',hall.showHall);
}
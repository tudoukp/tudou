var sign=require("./lib/controllers/sign.js");
var lobby=require('./lib/controllers/lobby.js')

module.exports=function(app){
	app.get('/',function(req,res){
		res.render('index',{'layout':'layout.ejs'});
	})

	app.get('/login',sign.showLogin)
	app.post('/login',sign.login)

	app.get("/register",sign.showRegister)
	app.post("/register",sign.register)

	app.get('/lobby',lobby.showLobby);
}
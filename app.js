var express=require("express"),
	app=express(),
	server=require("http").createServer(app),
	io=require("socket.io").listen(server);

var issue=require('./lib/issue.js');


var routes=require('./routes');



app.configure(function(){
	app.set('view engine','ejs');
	app.set('views',__dirname+'/views');

	//app.use(express.cookieSession());

	app.use(express.bodyParser());
	app.use(express.cookieParser());
	app.use(express.session({ secret: "pomelo" }));

	app.use(express.static(__dirname+'/public'));
})


server.listen(80);



routes(app);

issue(io);

//pomelo.start("11");
//console.log(pomelo);
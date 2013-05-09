(function(){
	var socket=io.connect();
	socket.emit("lobby.enter");

	var rooms={}

	var roomsDOM=$('#rooms');



	socket.on('lobby.info',function(data){

		console.log(data);

		try{
			for(var i=0;i<data.length;i++){
				roomsDOM.append(generateRoom(data[i]));
			}
		}catch(e){}
	})

	

	init();
	function init(){
	}


	function generateRoom(room){
		var user_avatar=$('<div class="user_avatar"><a href="#"><img src="http://www.gravatar.com/avatar/8910b4646b5edbf90e8661efb5eeda88?size=48" /></a></div>')
		
		var room_info=$('<div class="room_info"></div>')
		var room_title=$('<div class="room_title"><p>'+room.name+'</p></div>')
		var detail=$('<div class="detail"><span>当前人数：'+room.mem+'/'+room.num+'</span><span>考察内容：-----</span></div>')

		room_info.append(room_title).append(detail);

		var r_enter=$('<div class="r_enter"><a href="#">进入</a></div>')
		var tmp=$('<div><span class="badge">'+room.id+'</span><span class="lock">locak</span></div>')


		var left=$('<div class="span6 clearfix" ></div>').append(user_avatar).append(room_info);
		var right=$('<div class="span2"></div>').append(r_enter).append(tmp);


		return $('<div class="single clearfix"></div>').append(left).append(right);
	}


})()
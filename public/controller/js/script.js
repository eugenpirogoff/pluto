// inital key data as a json hash
var pluto_key_data = {
	"controller_session" : pluto_id,
	"controller_id" : 1,
	"message": "message",
	"up" : false,
	"down" : false,
	"left" : false,
	"right": false,
	"a" : false, 
	"b" : false
}

function pluto_ask_for_session(event) {
	event.preventDefault();
	pluto_key_data["controller_session"] = prompt("Your Session ID ?")
}

// check for pluto id in the URL 
var pluto_id = document.URL.split('/')[4];
// need refactoring, check if its really an session id


// connect to local domain via websocekts
io = io.connect(document.domain)


// TO-DO : joind backchannel communcation for message receive on backend and client

$(document).ready(function(){

	// function for emitting data into the session, no room join needed
	var pluto_loop = function(){
			pluto_key_data["up"] = joystick_left.up();
			pluto_key_data["a"] = joystick_left.left();
			pluto_key_data["b"] = joystick_left.right();
			pluto_key_data["down"] = joystick_left.down();
			pluto_key_data["left"] = joystick_right.left();
			pluto_key_data["right"] = joystick_right.right();
			io.emit('pluto_data', pluto_key_data)
	}


	// touchscreen available ?
	console.log("touchscreen is", VirtualJoystick.touchScreenAvailable() ? "available" : "not available");

	// right joystick init and add Listener
	var joystick_right	= new VirtualJoystick({
			container	: document.body,
			strokeStyle	: 'cyan'
		});
	joystick_right.addEventListener('touchStartValidation', function(event){
			var touch	= event.changedTouches[0];
			if( touch.pageX < window.innerWidth/2 )	return false;
			return true
		});

	// left joystick init and add Listener
	var joystick_left	= new VirtualJoystick({
			container	: document.body,
			strokeStyle	: 'orange'
		});

	joystick_left.addEventListener('touchStartValidation', function(event){
			var touch	= event.changedTouches[0];
			if( touch.pageX >= window.innerWidth/2 )	return false;
			return true
		});

	// setting up emitter loop every 1 ms
	var interval = self.setInterval(function(){pluto_loop()},1);

	//LED Session Promt
	var led = document.getElementById("led").addEventListener(
		'touchstart', pluto_ask_for_session, false
	);


	setTimeout(function(){
		$("#pluto_icon_left").fadeTo(1500, 0.2).fadeTo(1500,1).fadeTo(1500,0.2).fadeTo(1500,0.9).fadeTo(2500,0);
		$("#pluto_icon_right").fadeTo(1500, 0.2).fadeTo(1500,1).fadeTo(1500,0.2).fadeTo(1500,0.9).fadeTo(2500,0);
	},1000);

	setTimeout(function(){
		$("#pluto_icon_left").remove();
		$("#pluto_icon_right").remove();
	}, 10000);
});

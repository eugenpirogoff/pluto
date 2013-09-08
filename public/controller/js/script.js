/**
* Pluto - WebSocket Remote for Node.js
* Eugen Pirogoff
* web: http://www.eugenpirogoff.de
* mail: eugenpirogoff@me.com
**/

// Pluto default Connection Type = WebRTC
var pluto_connection_type = "WebRTC";

// Set Puto Session ID from url
var pluto_id = document.URL.split('/')[4];

// Pluto Key Data as JSON
var pluto_key_data = {
	"controller_session" : pluto_id,
	"controller_id" : 1,
	"connection_type": pluto_connection_type,
	"up" : false,
	"down" : false,
	"left" : false,
	"right": false,
	"a" : false,
	"b" : false
}

//
// Socket.io Communication
//
// ID naming convention
// Pluto Controller/Host Room = Pluto Session ID
//

// Connecting to actual Domain with WebSocket
io = io.connect(document.domain)

//
// PeerJS Communication
// PeerJS API Key => "8muaf9c1vm7mygb9", 50 concurrent connections max
//
// ID naming convention
// Pluto Controller ID = 'controller' + Pluto Session ID
// Pluto Host ID = 'host' + Pluto Session ID
//
var this_is_Chrome = /Chrome/.test(navigator.userAgent)
var pluto_send_webrtc = function(){};

try {
	var peer = new Peer("controller"+pluto_id, {key: '8muaf9c1vm7mygb9'});
	var connection = peer.connect("host"+pluto_id);
}catch(e){
	console.log("Pluto WebSocket Error");
}


setInterval(function() {
	if (this_is_Chrome) {
		pluto_connection_type = "WebRTC";
	}
	else {
	 	pluto_connection_type = "WebSocket";
	}
}, 1000);


setTimeout(function(){
	pluto_send_webrtc = function(data){
		connection.send(data);
	};
}, 3000);

$(document).ready(function(){
//
// Joystick Library Control-SetUp
//

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

	// setting up emitter loop every 16 ms
	// 16 ms = 1 sec / (60 Frames are a smooth refresh rate)
	setInterval(function(){pluto_loop()},16);


//
// Pluto Event Emitter Loop
//
	var pluto_loop = function(){
		// Left Joystick
		pluto_key_data["up"] = joystick_left.up();
		pluto_key_data["down"] = joystick_left.down();

		// Right Joystick
		// pluto_key_data["left"] = joystick_right.left(); // primary steering
		// pluto_key_data["right"] = joystick_right.right(); // primary steering
		pluto_key_data["a"] = joystick_right.left(); // secondary softsteering
		pluto_key_data["b"] = joystick_right.right(); // secondary softsteering

		// Setting connection Type in JSON
    	pluto_key_data["connection_type"] = pluto_connection_type;

		switch (pluto_connection_type) {
    		case "WebSocket":
				io.emit('pluto_data', pluto_key_data);
        		break;
		    case "WebRTC":
		    	pluto_send_webrtc(pluto_key_data);
				//connection.send(pluto_key_data);
			    break;
		}
	}


//
// Pluto Connection Status
//
setInterval(function(){
	$("#pluto_connection_type").html(pluto_connection_type);
	switch (pluto_connection_type) {
		case "WebSocket":
			$("#pluto_led").css( "background-color", "orange" );
    		break;
	    case "WebRTC":
	    	$("#pluto_led").css( "background-color", "lightgreen" );
	        break;
        default:
        	$("#pluto_led").css( "background-color", "red" );
        	break;
	}
},1000);


//
// Pictogramm fading and removing with jQuery
//
	setTimeout(function(){
		$("#pluto_icon_left").fadeTo(1500, 0.2).fadeTo(1500,1).fadeTo(1500,0.2).fadeTo(1500,0.9).fadeTo(2500,0);
		$("#pluto_icon_right").fadeTo(1500, 0.2).fadeTo(1500,1).fadeTo(1500,0.2).fadeTo(1500,0.9).fadeTo(2500,0);
	},1000);

	setTimeout(function(){
		$("#pluto_icon_left").remove();
		$("#pluto_icon_right").remove();
	}, 10000);

// window.onerror = function myErrorHandler(errorMsg, url, lineNumber) {
//     console.log("Error occured: " + errorMsg);
//     return false;
// }

});
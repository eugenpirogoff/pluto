/**
* Pluto - Websocket Remote for Node.js
* Eugen Pirogoff
* web: http://www.eugenpirogoff.de
* mail: eugenpirogoff@me.com
**/

// Loading express
express = require('express.io');
app = express().http().io();


app.configure(function() {
	app.use(express["static"](__dirname + '/public'));
    app.set('rootDir', __dirname);
});

app.enable('browser client minification');  // send minified client
app.enable('browser client gzip');          // gzip the file
app.enable('browser client etag');          // apply etag caching logic based on version number
app.disable('hearbeats');

//WebSocket Sessions JSON
//Connect Controller only to a running Pluto Game Session and Route
var sessions = {}

// routes with parameters passing
app.get('/game/:pluto_pin', function(req, res){
	sessions[req.params.pluto_pin] = false;
	res.sendfile(__dirname + '/public/game/index.html')
});

// router for pluto controller and the assigned pin
app.get('/controller/:pluto_pin', function(req, res){
	if (sessions[req.params.pluto_pin] == false){
		console.log("Pluto Controller Request :" + req.params.pluto_pin)
		res.sendfile(__dirname + '/public/controller/index.html')
		sessions[req.params.pluto_pin] = true;
	}
	else {
		res.send("There is no Pluto Game Session running with that ID");
	}
});

// listenening for pluto_data event on socket.io
app.io.route('pluto_data', function(req){
	if (sessions[req.data['controller_session']] == true){
		req.io.join(req.data['controller_session']);
		req.io.room(req.data['controller_session']).broadcast('pluto_relay', req.data);
	}
})

// pluto connection joins
app.io.route('pluto_join', function(req){
	req.io.join(req.data);
})

// pluto is leaving
app.io.route('pluto_leave', function(rea){
	req.io.leave(req.data);
})

// log current sessions on server
setInterval(function(){
	console.log("Pluto: concurrent WebSocket connections : " + Object.keys(sessions).length);
},3000);

app.listen(process.env.VCAP_APP_PORT || 3000);
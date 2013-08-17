/**
* Pluto - Websocket Remote for Node.js
* Eugen Pirogoff
* web: http://www.eugenpirogoff.de
* mail: eugenpirogoff@me.com
**/

express = require('express.io');
app = require('express.io')()
app = module.exports = express();
app.http().io();

app.configure(function() {
	app.use(express["static"](__dirname + '/public'));
    app.set('rootDir', __dirname);
});

var sessions = {}

// routes with parameters passing
app.get('/game/:pluto_pin', function(req, res){
	sessions[req.params.pluto_pin] = false;
	console.log("pluto_game connected with pin:" + req.params.pluto_pin)
	res.sendfile(__dirname + '/public/game/index.html')
});

app.get('/controller/:pluto_pin', function(req, res){
	sessions[req.params.pluto_pin] = true;
	console.log("pluto_controller connected with pin :" + req.params.pluto_pin)
	res.sendfile(__dirname + '/public/controller/index.html')
});

app.io.route('pluto_data', function(req){
	// console.log("Game to Controller matched : " + sessions[req.data['controller_session']]);
	// console.log("Data Example  - UP- : " + req.data['up']);
	
	// console.log(req.data['controller_session']);
	req.io.join(req.data['controller_session']);
	req.io.room(req.data['controller_session']).broadcast('pluto_relay', req.data);
})

app.io.route('pluto_join', function(req){
	req.io.join(req.data);
})

app.listen(process.env.VCAP_APP_PORT || 3000);


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

var pluto_id = '000000';

app.configure(function() {
	app.use(express["static"](__dirname + '/public'));
    app.set('rootDir', __dirname);
});


// routes with parameters passing
app.get('/game/:pluto_pin', function(req, res){
	pluto_pin = req.params.pluto_pin;
	console.log("pluto_game connected with pin:" + pluto_pin)
	res.sendfile(__dirname + '/public/game/index.html')
});

app.get('/controller/:pluto_pin', function(req, res){
	pluto_pin = req.params.pluto_pin;
	console.log("pluto_controller connected with pin :" + pluto_pin)
	res.sendfile(__dirname + '/public/controller/index.html')
});


// pluto_data = {
//         	"controller_session" : 222222,
// 			"controller_id" : 333322221111,
// 			"message": "my message string",
// 			"up" : true,
// 			"down" : true,
// 			"left" : true,
// 			"right": true,
// 			"a" : true, 
// 			"b" : true
//         }

// pluto_data['controller_id']=pluto_id

app.io.route('pluto_data', function(req){
	req.io.join(req.data['controller_id'])
	console.log(req.data);
	req.io.room(req.data['controller_id']).broadcast('pluto_relay', req.data)
})

app.listen(process.env.VCAP_APP_PORT || 3000);

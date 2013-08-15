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

// If nothing is set this ID will be set for communication
var pluto_id = '000000';

app.configure(function() {
	app.use(express["static"](__dirname + '/public'));
    app.set('rootDir', __dirname);
});

comet = {}
comet['pluto_id']=pluto_id

app.io.route('pluto_data', function(req){
	req.io.join(req.data['pluto_id'])
	console.log(req.data['pluto_data'])
	req.io.room(req.data['pluto_id']).broadcast('pluto_relay', req.data)
	// req.io.room(req.data['pluto_id']).broadcast('pluto_relay',{
	// 	comet['pluto_id'] = req.data['pluto_id']
	// 	comet['pluto_data'] = req.data['pluto_data']
	// })
	// req.io.room(req.data).broadcast('pluto_relay',{
	// 	message: 'New client joined ' + req.data + ' here.'
	// })
})



// app.configure(function(){
//   app.use(express.methodOverride());
//   app.use(express.bodyParser());
//   app.use(express.static(__dirname + '/public'));
//   app.use(express.errorHandler({
//     dumpExceptions: true, 
//     showStack: true
//   }));
//   app.use(app.router);
// });

// app.get('/controller', function(req,res){
// 	res.sendfile(__dirname + '/public/controller/index.html')
// })

app.listen(process.env.VCAP_APP_PORT || 3000);

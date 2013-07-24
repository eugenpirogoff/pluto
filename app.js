/**
* Pluto - Websocket Remote for Node.js
* Eugen Pirogoff
* web: http://www.eugenpirogoff.de
* mail: eugenpirogoff@me.com
**/

var http = require('http'), /* HTTP Server */
	express = require('express'), /* Express Framework */
	routes = require('./routes'); /* routes folder on filesystem, to know what to do with routing */

var app = express(); /* creating app from framework */
var server = app.listen(3000); /* starting server on port 3000 */
var io = require('socket.io').listen(server); /* var io for listening for sockets on port 3000 on sever */

app.configure(function (){
	app.set('views', __dirname + '/views'); /*looking for jade templates in view folder*/
	app.set('view engine', 'jade'); /* seting jade for templating engine*/
	app.use(express.static(__dirname + '/public')); /*here goes our static content, games etc*/
	app.use(express.bodyParser());
	app.use(app.router);
});

app.get('/', routes.index);

console.log("Server Listening on Port 3000");
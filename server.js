// var app = require('express').createServer();
// app.get('/', function(req, res) {
//     res.send('Hello from <a href="http://appfog.com">AppFog.com</a>');
// });
// app.listen(process.env.VCAP_APP_PORT || 3000);


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
var port = process.env.PORT || 3000; /* fetching Port from enviroment or taking 3000*/
var server = app.listen(port, function(){
    console.log("App listening on Port : "+port); /* starting server on port 3000  or enviroment Port*/
}); 
var io = require('socket.io').listen(server); /* var io for listening for sockets on port 3000 on sever */

app.configure(function (){
    app.use(express.static(__dirname + '/public')); /*here goes our static content, games etc*/
    app.use(express.logger('dev')); /* Logging for Development Cycle*/
    app.use(express.bodyParser());
    app.use(app.router);
});

app.get('/', routes.index); /* Basic Routing for '/' to inside the index.js */
app.get('/env', function(req, res){
    var body = process.env;
    res.send(body);
})
app.get('/game', routes.index);

app.configure('development', function(){
  app.use(express.errorHandler());
});




io.sockets.on('connection', function (socket) {
    //socket.emit('', { hello: 'world' });
    console.log("This client has the following id :  %s", socket.id);
    console.log("This is the Data : %s", socket);

    socket.on('send_event', function (data){
        console.log("You pushed a Button: %s now. ",data);

        // socket.emit('response', function(data){
        //     alert("send");
        // });
    });

});
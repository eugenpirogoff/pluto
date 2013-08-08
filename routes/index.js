/**
* Pluto - Websocket Remote for Node.js
* Eugen Pirogoff
* web: http://www.eugenpirogoff.de
* mail: eugenpirogoff@me.com
**/

exports.index = function(req, res){
  res.render('index.html')
};

exports.game = function(req, res){
	res.render('game/index.html')
};
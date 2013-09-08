/**
* Pluto - WebSocket Remote for Node.js
* Eugen Pirogoff
* web: http://www.eugenpirogoff.de
* mail: eugenpirogoff@me.com
**/

$(document).ready(function() {
    console.log( "Script Loaded" );
    var pluto_id = Math.round(new Date().getTime()/100000.0);

	$("#pluto_id").val(pluto_id);
	$("#btn_controller").attr('href', '/controller/'+pluto_id);
	$("#btn_game").attr('href', '/game/'+ pluto_id);

	$("#pluto_id").focusout(function(){
		$("#btn_controller").attr('href', '/controller/'+$("#pluto_id").val());
		$("#btn_game").attr('href', '/game/'+ $("#pluto_id").val())
	});
});




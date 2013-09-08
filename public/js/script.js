/**
* Pluto - WebSocket Remote for Node.js
* Eugen Pirogoff
* web: http://www.eugenpirogoff.de
* mail: eugenpirogoff@me.com
**/

$(document).ready(function() {

	// Setting up Session-ID from EPOCH-Time
    var pluto_id = Math.round(new Date().getTime()/100000.0);

    // Adding Session-ID to Buttons
	$("#pluto_id").val(pluto_id);
	$("#btn_controller").attr('href', '/controller/'+pluto_id);
	$("#btn_game").attr('href', '/game/'+ pluto_id);

	// Adding a newly entered Session-ID to Buttons
	$("#pluto_id").focusout(function(){
		$("#btn_controller").attr('href', '/controller/'+$("#pluto_id").val());
		$("#btn_game").attr('href', '/game/'+ $("#pluto_id").val())
	});
});




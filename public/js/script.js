$(document).ready(function() {
    console.log( "Script Loaded" );
    var pluto_id = Math.floor(Math.random()*90000000) + 10000000;
	$("#pluto_id").val(pluto_id);
	$("#btn_game").attr('href','/game/'+pluto_id);
	$("#btn_controller").attr('href', '/controller/'+pluto_id);
	
});



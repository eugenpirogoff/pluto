$(document).ready(function() {
    console.log( "Script Loaded" );
    var pluto_id = Math.floor(Math.random()*900000) + 100000;
	$("#pluto_id").val(pluto_id);
	$("#btn_controller").attr('href', '/controller/'+pluto_id);
	$("#btn_game").attr('href', '/game/'+ pluto_id);

	$("#pluto_id").focusout(function(){
		$("#btn_controller").attr('href', '/controller/'+$("#pluto_id").val());
		$("#btn_game").attr('href', '/game/'+ $("#pluto_id").val())
	});
});




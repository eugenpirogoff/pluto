io = io.connect(document.domain)

var pluto_id = '000000';
var comet = {}
comet['pluto_id']=pluto_id

io.emit('pluto_data', comet)

io.on('pluto_relay', function(data){
	$('.pluto_client_emitter').html(data['pluto_data'])
})

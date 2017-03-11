// shorthand for $(document).ready(...)
$(function (){

	var socket = io();
	var username;

	$('form').submit(function(){
		socket.emit('chat message',$('#m').val());
		$('#m').val('');
		return false;
	});

	socket.on('chat message', function(msg){
		$('#messages').append($('<li>').text(msg));
	});


	socket.on('connected', function (name) {
		console.log(name);
  	});

});





var moment = require('moment');
var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

//Store the users connected
var nickname = {};

http.listen( port, function () {
	console.log('listening on port', port);
});

app.use(express.static(__dirname + '/public'));


var numUsers = 0;
var username = 'mew';
var counter = 0;

io.on('connection', function(socket){
	username = createName();
	
	socket.on('connected',function(username){
			io.emit('connected',username);
	});

	socket.on('chat message', function(msg){
		var timestamp = moment();
		var formatted = timestamp.format('HH:mm');
		io.emit('chat message', formatted + ' ' + username + ': ' + msg);
	});

	socket.on('disconnect', function(){
		console.log('user disconnected');
	});


});

function createName()
	{
    var word = "";
    var letter = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        word += letter.charAt(Math.floor(Math.random() * letter.length));

    return word;
	}






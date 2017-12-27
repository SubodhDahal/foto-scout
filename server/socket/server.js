
//web socket
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

server.listen(process.env.PORT || 3000);
console.log ('Server is running.....');

app.get ('/', function(req, res){
  res.sendFile(__dirname + '/chatroom.html');
});

//to connect socket.io
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
//to boardcast message
io.emit('some event', { for: 'everyone' });
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});


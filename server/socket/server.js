
//web socket
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
users = [];
connections = [];

server.listen(process.env.PORT || 3000);
console.log ('Server is running.....');

app.get ('/', function(req, res){
  res.sendFile(__dirname + '/chatroom.html');
});

//to connect socket.io
io.sockets.on = ('connection', function(socket){
  connections.push(socket);
  console.log('Connected: %s user connected', connections.length);

  // Disconnect
  connections.splice(connections.indexOf(socket), 1);
  console.log('Disonnected: %s user connected', connections.length);
});

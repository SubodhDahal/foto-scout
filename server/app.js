var express = require('express'),
  app = express(),
  router = express.Router(),
  multer = require('multer'),
  path = require('path'),
  port = process.env.PORT||3000,
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  jwt = require('jsonwebtoken'),
  cors = require('cors'),

  // Loading models
  Image = require('./api/models/ImageModel'),
  ImageCategory = require('./api/models/ImageCategoryModel'),
  User = require('./api/models/userModel'),
  Group = require('./api/models/groupModel');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/FotoScoutDB');
var db = mongoose.connection;
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json());
app.use(cors({credentials: true, origin: 'http://localhost:8080'}));

var server = require('http').Server(app),
  io = require('socket.io')(server);

// set public directry for serving images
app.use(express.static(process.cwd() + '/public'));

/* Importing routes */
var routes = require('./api/routes/ImageRoute');
var routes1 = require('./api/routes/userRoute');
var routes2 = require('./api/routes/groupRoute');

routes(app);
routes1(app);
routes2(app);

server.listen(port);

var connections = [],
  onlineUsers = [];

// Socket.io listener
io.on('connection', function(socket) {
  //to connect user
  connections.push(socket);
  console.log('connected: %s user is connected', connections.length);

  io.sockets.emit('activeUsersCount', connections.length);

  //to disconnect user
  socket.on('disconnect',function(data){
    onlineUsers.splice(onlineUsers.indexOf(socket.username), 1);
    updateUsernames();
    connections.splice(connections.indexOf(socket), 1);
    console.log('disconnected: %s user is disconnected', connections.length);
  });

  //to boardcast message
  socket.on('send message', function(data){
    // var newMsg = new chatModel({msg: '' + data});

    // console.log('saving newMsg: ' + newMsg);

    // newMsg.save(function(err){
      // console.log('saved, err = ' + err);
      // if(err) throw err;
      console.log('echoeing back data', data);
      io.sockets.emit('new message',{
        msg: data.message,
        user: data.username,
        groupId: data.groupId
      });
      // });
  });

  //to add new onlineUsers
  socket.on('new user', function (username, callback) {
    console.log('got new user', username)
    console.log('USERS', connections.length)
    socket.username = username;

    if (onlineUsers.indexOf(username) === -1) {
      console.log('New user', username)
      onlineUsers.push(username);
      updateUsernames();
    }

    callback(true);
  });

  function updateUsernames () {
    console.log('Update onlineUsers', onlineUsers)
    io.sockets.emit('get users', onlineUsers);
  }
});

console.log('FotoScout RESTful API server started on: ' + port);

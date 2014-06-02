var express = require("express");
var app = express();
var server = require('http').createServer(app);
var io = require("socket.io").listen(server);
var zeromq = require("zmq");

server.listen(3000);

app.use(express.static(__dirname + "/public"));
app.use('/lib', express.static(__dirname + "/bower_components"));

var requester = zeromq.socket("req");
requester.connect("tcp://localhost:5555");

io.on("connection", function(socket) {
  socket.on("logging", function(user) {
    user = JSON.stringify(user);
    requester.send(user);
    console.log(user);
  });
  
  requester.on("message", function(reply) {
    console.log("Reply from server:" + reply);
    socket.emit("logging", JSON.parse(reply));          
  });
});

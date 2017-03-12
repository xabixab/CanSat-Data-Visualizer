var express = require('express');
var app = express();
var config = require(__dirname + '/config.json');
var log = require(__dirname + "/consolelog.js").log;
var server = app.listen(config.port);
var io = require('socket.io')(server);


log("http", "Server listening on " + config.port);

var Receiver = require(__dirname + "/receiver.js");
var ValueManager = require(__dirname + "/valueManager.js")
var Recorder = require(__dirname + "/recorder.js");
var manager = new ValueManager();
var rec = new Receiver();
var recorder = new Recorder();


app.get('/getConfig', function (req, res) {
  res.json(config);
});

app.use('/', express.static(__dirname + '/client'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

rec.on("receiverConnectionChange", function(status){
  io.emit("connectionChange", status);
  log("io", "connection change emited. " + status.connected + " " + status.tty);
});

rec.on("receivedValue", function(value){
  manager.addValue(value);
});

manager.on("newValue", function(params){
  io.emit("newValue", params);
  // log("debug", "New value of " + params.name + " sent. " + params.value);
});

io.on('connection', function (socket) {
  socket.on("disconnect", function(){
    log("io", "Client disconnected");
  });

  socket.on("connectReceiver", function(){
    rec.connect();
    log("io", "connectReceiver recived")
  });

  socket.on("requestDrtData", function(){
    socket.emit("drtData", recorder.getData());
  });

  socket.emit("connectionSend", {
    "connected": rec.connected,
    "tty": rec.tty
  });

  socket.emit("currentValues", {

  });

  log("io", "New client connected");

});

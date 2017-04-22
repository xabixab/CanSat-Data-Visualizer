var express = require('express');
var app = express();
var config = require(__dirname + '/config.json');
var log = require(__dirname + "/consolelog.js").log;
var server = app.listen(config.port);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');

log("http", "Server listening on " + config.port);

var Receiver = require(__dirname + config.receiver);
var ValueManager = require(__dirname + "/valueManager.js")
var Recorder = require(__dirname + "/recorder.js");
var PickUpManager = require(__dirname + "/pickup.js");

var manager = new ValueManager();
var rec = new Receiver();
var recorder = new Recorder();
var pum = new PickUpManager();


app.get('/getConfig', function (req, res) {
  res.json(config);
});

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/pickup/list', function (req,res) {
  var response = {
    cansat: pum.getCansat(),
    clients: pum.listClients()
  }
  res.json(response);
});

app.post('/pickup/register', function (req,res) {
  pum.registerClient(JSON.parse(req.body.client));
  log("pickup", "Posted position from " + JSON.parse(req.body.client).name);
  res.json({
    success:true
  })
});

app.get('/pickup/status', function (req, res) {
  res.json({
    success: true,
    clients: pum.listClients().length
  })
})

app.use('/', express.static(__dirname + '/client'));
app.use('/postprocessor/', express.static(__dirname + '/postprocessor/client'));
app.use('/postprocessor/processed', express.static(__dirname + '/postprocessor/processed'));

app.use('/bower_components', express.static(__dirname + '/bower_components'));

rec.on("receiverConnectionChange", function(status){
  io.emit("connectionSend", status);
  log("io", "connection change emited. " + status.connected + " " + status.tty);
});

rec.on("receivedValue", function(value){
  manager.addValue(value);
});

manager.on("newValue", function(params){
  io.emit("newValue", params);
  if(params.name == "gpslat" || params.name == "gpslong"){
    pum.parseValue(params);
    log("debug", params.name);
  }
  recorder.saveData(params);
  // log("debug", "New value of " + params.name + " sent. " + params.value);
});

io.on('connection', function (socket) {

  socket.on("disconnect", function(){
    log("io", "Client disconnected");
  });

  /*
    DRT Bindings
  */

  socket.on("drtStartRecording", recorder.startRecording);
  socket.on("drtStopRecording", recorder.stopRecording);

  socket.on("requestDrtData", function(){
    socket.emit("drtData", recorder.getData());
    log("io", "drtData requested. Sending..");
  });

  /*
    Receiver Bindings
  */
  socket.on("connectionRequest", function(){
    log("io", "connectionRequest received. Sending connectionSend")
    socket.emit("connectionSend", {
      "connected": rec.connected,
      "tty": rec.tty
    });
  });

  socket.on("connectReceiver", function(){
    rec.connect();
    log("io", "connectReceiver recived")
  });

  log("io", "New client connected");

});

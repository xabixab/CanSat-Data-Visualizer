var express = require('express');
var app = express();
var config = require(__dirname + '/config.json');
var log = require(__dirname + "/consolelog.js").log;
var server = app.listen(config.port);
var io = require('socket.io')(server);

log("http", "Server listening on " + config.port);

var Receiver = require(__dirname + "/receiver.js");
var rec = new Receiver();

app.get('/getConfig', function (req, res) {
  res.json(config);
});

app.use('/', express.static(__dirname + '/client'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

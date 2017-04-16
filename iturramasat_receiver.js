/*

  Custom protocol based in ITURRAMASAT PROTOCOL.

*/

var EventEmitter = require('events').EventEmitter;
var log = require(__dirname + "/consolelog.js").log;
var config = require(__dirname + '/config.json');
var SerialPort = require('serialport');
var parsers = SerialPort.parsers;
var recvConfig = config.iturramasat_receiver;
class Receiver extends EventEmitter {
  constructor(){
    super();
    var self = this;
    self.connected = false;
    self.tty = recvConfig.tty;
  }

  connect(){
    var self = this;
    if(self.connected){
      log("receiver", "Already connected to the GroundStation");
      return false;
    }

    self.port = new SerialPort(self.tty, {
      baudRate:recvConfig.baudRate,
      parser:SerialPort.parsers.readline(';')
    });
    self.port.on("open", function(){
      log("receiver", "Successfully connected to the receiver");
      self.connected = true;
      self.emit("receiverConnectionChange", {
        "connected": true,
        "tty": self.tty
      });
      self.port.write("test");
      self.port.on("data", function(data){
        log("receiver", data);

        var parsedData = data.split(":");
        var now = new Date().getTime();

        if(parsedData.length === 4){
          self.emit("receivedValue", {
            "name": "temp",
            "time": now,
            "value": parsedData[0] / recvConfig.send_multiply.temp
          });
          self.emit("receivedValue", {
            "name": "pre",
            "time": now,
            "value": parsedData[1] / recvConfig.send_multiply.pre
          });
          self.emit("receivedValue", {
            "name": "gpslat",
            "time": now,
            "value": parsedData[2] / recvConfig.send_multiply.gpslat
          });
          self.emit("receivedValue", {
            "name": "gpslong",
            "time": now,
            "value": parsedData[3] / recvConfig.send_multiply.gpslong
          });
        } else {
          log("protocol", "no-valid values received.");
        }
      })
    });
  }
}

module.exports = Receiver;

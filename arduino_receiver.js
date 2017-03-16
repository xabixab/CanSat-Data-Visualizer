var EventEmitter = require('events').EventEmitter;
var log = require(__dirname + "/consolelog.js").log;
var config = require(__dirname + '/config.json');
var SerialPort = require('serialport');
var parsers = SerialPort.parsers;

class Receiver extends EventEmitter {
  constructor(){
    super();
    var self = this;
    self.connected = false;
    self.tty = config.tty;
  }

  connect(){
    var self = this;
    if(self.connected){
      log("receiver", "Already connected to the GroundStation");
      return false;
    }

    self.port = new SerialPort(self.tty, {
      baudRate:115200,
      parser:SerialPort.parsers.readline('\n')
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
        data = data.replace(/[^\x20-\x7E]+/g, '');
        if(self.IsJsonString(data)){
          log("receiver", data);
          log("receiver", data.length);
          var serializedData = JSON.parse(data);
          var now = new Date().getTime();
          self.emit("receivedValue", {
            "name": serializedData.sensor,
            "time": now,
            "value": serializedData.value
          });
        } else {
          log("serial", "invalid JSON line received")
        }
      })
    });
  }

  IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
  }
}

module.exports = Receiver;

var EventEmitter = require('events').EventEmitter;
var log = require(__dirname + "/consolelog.js").log;
var config = require(__dirname + '/config.json');

/*

    FAKE CLASS. This just generates random values for testing/debugging.
    Use it to write custom receiver (ground station)

*/

class Receiver extends EventEmitter {
  constructor(){
    super();
    var self = this;
    self.connected = false;
    self.tty = "/dev/ttyUSB0";

    self.randomKey = function (obj) {
        var keys = Object.keys(obj)
        return keys[ keys.length * Math.random() << 0];
    };

    setInterval(function(){
      if(self.connected){
        var valname = self.randomKey(config.random_mode_values);
        var randomConfig = config.random_mode_values[valname];
        var now = new Date().getTime();
        var value = self.randomFloat(randomConfig.min, randomConfig.max, randomConfig.accuracy);
        self.emit("receivedValue", {
          "name": valname,
          "time": now,
          "value": value
        });
      }
    }, 100);
  }

  connect(){
    var self = this;
    if(!self.connected){
      log("receiver", "Trying to connect to the receiver");
      setTimeout(function(){
        self.connected = true;
        log("receiver", "Successfully connected to the receiver");
        self.emit("receiverConnectionChange", {
          "connected": true,
          "tty": self.tty
        });
      }, 2000);
    } else {
      log("receiver", "Already connected to the receiver");
    }
  }

  disconnect(){
    var self = this;
    log("receiver", "trying to disconnect the receiver");
    if(self.connected){
      setTimeout(function(){
        self.connected = false;
        log("receiver", "Successfully disconnected from the receiver");
        self.emit("receiverConnectionChange", {
          "connected": true,
          "tty": self.tty
        });
      }, 2000);
    } else {
      log("receiver", "Not connected to the receiver");
    }
  }

  randomFloat(minValue,maxValue,precision){
      if(typeof(precision) == 'undefined'){
          precision = 2;
      }
      return parseFloat(Math.min(minValue + (Math.random() * (maxValue - minValue)),maxValue).toFixed(precision));
  }
}

module.exports = Receiver;

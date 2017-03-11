var EventEmitter = require('events').EventEmitter;
var log = require(__dirname + "/consolelog.js").log;

class Receiver extends EventEmitter {
  constructor(){
    super();
    var self = this;
    self.connected = false;
    self.connect();
  }

  connect(){
    var self = this;
    if(!self.connected){
      log("receiver", "Trying to connect to the receiver");
      setTimeout(function(){
        self.connected = true;
        log("receiver", "Successfully connected to the receiver");
        self.emit("receiverConnectionChange", true);
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
        self.emit("receiverConnectionChange", false);
      }, 2000);
    } else {
      log("receiver", "Not connected to the receiver");
    }
  }
}

module.exports = Receiver;

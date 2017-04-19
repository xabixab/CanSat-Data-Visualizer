//var EventEmitter = require('events').EventEmitter;
var log = require(__dirname + "/consolelog.js").log;
var config = require(__dirname + '/config.json');

class PickUpManager {
  constructor(){
    var that = this;
    that.cansat = {}
    that.cansat.lat = 0;
    that.cansat.lng = 0;
    that.clients = [];
  }

  listClients(){
    var that = this;
    var response = [];
    that.clients.forEach(function (client, index) {
      if(client.online || true){ // disabled
        response.push(client);
      }
    });
    that.updateClients();
    return response;
  }

  getCansat(){
    var that = this;
    return that.cansat;
  }

  registerClient(data){
    var that = this;
    var oldclient = false;
    var now = Date.now();
    that.clients.forEach(function (client, index) {
      if(data.id == client.id){
        oldclient = true;
        that.clients[index] = data;
        that.clients[index].time = now;
      }
    });
    var saveData = data;
    saveData.time = now;
    if(!oldclient){
      that.clients.push(saveData);
    }

    that.updateClients();
  }

  parseValue(value){
    var that = this;
    if(!(value.name == "gpslat" || value.name == "gpslong")){
      log("PickUpManager", "Error, received incorrect value type.");
      return false;
    }

    if(value.name == "gpslat"){
      that.cansat.lat = value.value;
    } else if (value.name == "gpslong") {
      that.cansat.lng = value.value;
    }

    that.updateClients();
  }

  updateClients(){
    var that = this;
    var now = Date.now();
    that.clients.forEach(function (client, index) {
      if(now - client.time > 15000){
        that.clients[index].online = false;
      } else {
        that.clients[index].online = true;
      }
    });
  }
}

module.exports = PickUpManager;

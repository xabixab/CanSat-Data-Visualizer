var EventEmitter = require('events').EventEmitter;
var log = require(__dirname + "/consolelog.js").log;
var config = require(__dirname + '/config.json');

class ValueManager extends EventEmitter {
  constructor(params){
    super();
    var that = this;
    that.params = params;
    that.monitored_values = config.monitored_values;
    that.values = {};
    that.currentValue = {};
    that.monitored_values.forEach(function(element){
      that.values[element] = {};
      that.currentValue[element] = 0;
    });
  }

  addValue(params){
    var valname = params.name;
    var time = params.time;
    var val = params.value;
    this.currentValue[valname] = val;
    this.values[valname] = {};
    this.values[valname][time] = val;

    this.emit("newValue",{
      "name": valname,
      "time": time,
      "value": val
    });

  }

  saveValue(){

  }
}

module.exports = ValueManager;

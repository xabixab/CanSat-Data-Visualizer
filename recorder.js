var EventEmitter = require('events').EventEmitter;
var log = require(__dirname + "/consolelog.js").log;
var config = require(__dirname + '/config.json');

class Recorder extends EventEmitter{
  constructor(){
    super();
    var that = this;
    that.recording = false;
    that.recordingPath = undefined;
  }

  getData(){
    var that = this;
    return {
      recording: that.recording,
      recordingPath: that.recordingPath
    }
  }

  saveData(){

  }

  startRecording(){
    var that = this;
    if(that.recording === true){
      log("recorder", "already recording.");
      return false;
    } else {
      that.recording = true;

    }
  }

  stopRecording(){
    var that = this;
    if(that.recording === false){
      log("recorder", "need to be recording to stop recording.");
      return false;
    } else {
      that.recording = false;
    }
  }
}

module.exports = Recorder;

var EventEmitter = require('events').EventEmitter;
var log = require(__dirname + "/consolelog.js").log;
var config = require(__dirname + '/config.json');
var fs = require('fs');

class Recorder extends EventEmitter{
  constructor(){
    super();
    var that = this;
    that.recording = false;
    that.recordingPath = undefined;
    that.startRecording();
  }

  getData(){
    var that = this;
    return {
      recording: that.recording,
      recordingPath: that.recordingPath
    }
  }

  saveData(data){
    var that = this;
    if(that.recording){
      that.fileInfo.push(data);
      fs.writeFile(__dirname + '/saved_streams/' + that.date + ".json", JSON.stringify(that.fileInfo), function(error) {
        if (error) {
          log("recorder", "write error:  " + error.message);
        }
      });
    }
  }

  startRecording(){
    var that = this;
    if(that.recording === true){
      log("recorder", "already recording.");
      return false;
    } else {
      log("recorder", "started recording");
      that.recording = true;
      that.fileInfo = [];
      that.date = Date.now();
    }
  }

  stopRecording(){
    var that = this;
    if(that.recording === false){
      log("recorder", "need to be recording to stop recording.");
      return false;
    } else {
      log("recorder", "stoped recording")
      that.recording = false;
    }
  }
}

module.exports = Recorder;

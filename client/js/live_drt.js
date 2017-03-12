class Recorder {
  constructor(){
    var that = this;
    $("#drt-panel").hide();
    that.visible = false;
    that.recording = false;
    $("#show-drt-btn").click(this.switchVisibility);
    setInterval(function(){
      ws.emit("requestDrtData", true);
    }, 2000);
    ws.on("drtData", that.updateInfo);
  }

  switchVisibility(){
    var that = this;
    if(that.visible){
      $("#drt-panel").hide();
      $("#show-drt-tab").attr("class", "");
    } else {
      $("#drt-panel").show();
      $("#show-drt-tab").attr("class", "active");
    }
    that.visible = !that.visible;
  }

  startRecording(){
    ws.emit("drtStartRecording", true);
  }

  stopRecording(){
    ws.emit("drtStopRecording", true);
  }

  updateInfo(info){
    var that = this;
    /*
      size:
      startTime:
      path:
      recording:
    */
    that.recording = info.recording;
    that.currentInfo = info;
    if(that.visible){
      if(that.recording){
        $(".recording").show();
        $(".notrecording").hide();
      } else {
        $(".recording").hide();
        $(".notrecording").show();
      }
    }
  }

}

class Viewer {
  constructor(){
    var that = this;
    that.currentFrame = 1;
    that.currentCamera = "a";
    that.currentView = "raw";
    that.refreshImage();
  }

  setCamera(cam){
    var that = this;
    that.currentCamera = cam;
    that.refreshImage();
    return cam;
  }

  getCamera(){
    var that = this;
    return that.currentCamera;
  }

  getCurrentFrame(){
    var that = this;
    return that.currentFrame;
  }

  setCurrentFrame(frame){
    var that = this;
    
    if(typeof that.frames !== "undefined"){
      if(frame > that.frames){
        return false;
      }
    }

    if(frame <= 0){
      return false;
    }

    that.currentFrame = frame;
    that.refreshImage();
    return frame;
  }

  getCurrentView(){
    var that = this;
    return that.currentView;
  }

  setCurrentView(view){
    var that = this;
    that.currentView = view;
    that.refreshImage();
    return view;
  }

  refreshImage(){
    var that = this;
    var url = "/postprocessor/processed/" + that.currentCamera + "/" + that.currentView + "/" + "frame_" + that.currentFrame + ".jpg";
    $("#viewer").attr("src", url);
    $('#viewer')
      .wrap('<span style="display:inline-block"></span>')
      .css('display', 'block')
      .parent()
      .zoom({
        on:'grab',
        magnify:2.5
      });
  }

  getFrameCount(callback){
    var that = this;
    if(typeof that.frames == "undefined"){
      $.get("/postprocessor/processed/info.json", function (info) {
        that.frames = info.frames;
        that.views = info.views;
        callback(info.frames);
      });
    } else {
      callback(that.frames);
      return that.frames;
    }
  }

  getAvailableViews(callback){
    var that = this;
    if(typeof that.views == "undefined"){
      $.get("/postprocessor/processed/info.json", function (info) {
        that.views = info.views;
        that.frames = info.frames;
        callback(info.views);
      });
    } else {
      callback(that.views);
      return that.views;
    }
  }
}

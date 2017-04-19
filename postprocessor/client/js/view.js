var viewer;
$(function(){
  // Request fullscreen when clicking fullscreen btn.
  viewer = new Viewer();
  $("#btn-fullscreen").click(function(){
    document.getElementById("viewer").mozRequestFullScreen()
  });

  $("#btn-download").click(function () {
    var url = $("#viewer").attr("src");
    $("#download-link").attr("href", url);
    document.getElementById('download-link').click();
  });

  /*

    Camera selector btns bindings.

  */

  $("#camselector-a").click(function () {
    viewer.setCamera("a");
    $("#camselector-b").removeClass("btn-primary");
    $("#camselector-b").addClass("btn-default");
    $("#camselector-a").removeClass("btn-default");
    $("#camselector-a").addClass("btn-primary");
  });

  $("#camselector-b").click(function () {
    viewer.setCamera("b");
    $("#camselector-a").removeClass("btn-primary");
    $("#camselector-a").addClass("btn-default");
    $("#camselector-b").removeClass("btn-default");
    $("#camselector-b").addClass("btn-primary");
  });

  /*

    Frame navigator bindings.

  */

  // Frame by frame
  $("#frameselector-prev").click(function () {
    var current = viewer.getCurrentFrame();
    viewer.setCurrentFrame(current + -1);
    updateFrameLabel();
  });
  $("#frameselector-next").click(function () {
    var current = viewer.getCurrentFrame();
    viewer.setCurrentFrame(current + 1);
    updateFrameLabel();
  });

  // 10x
  $("#frameselector-prev10").click(function () {
    var current = viewer.getCurrentFrame();
    viewer.setCurrentFrame(current + -10);
    updateFrameLabel();
  });
  $("#frameselector-next10").click(function () {
    var current = viewer.getCurrentFrame();
    viewer.setCurrentFrame(current + 10);
    updateFrameLabel();
  });

  // 100x
  $("#frameselector-prev100").click(function () {
    var current = viewer.getCurrentFrame();
    viewer.setCurrentFrame(current + -100);
    updateFrameLabel();
  });
  $("#frameselector-next100").click(function () {
    var current = viewer.getCurrentFrame();
    viewer.setCurrentFrame(current + 100);
    updateFrameLabel();
  });

  viewer.getAvailableViews(function (views) {
    html = "";
    views.forEach(function (view, index) {
      html += '<a href="#" class="btn btn-default btn-lg btn-block" id="btn-view-' + view + '">' + view + '</a>';
    });

    $("#views-menu").html(html);

    views.forEach(function (view, index) {
      $("#btn-view-" +view).click(function () {
        viewer.setCurrentView(view);
        viewer.getAvailableViews(function (vieeews) {
          vieeews.forEach(function (vieww, indexx) {
            if(vieww == viewer.getCurrentView()){
              $("#btn-view-"+vieww).attr("class", "btn btn-primary btn-lg btn-block");
            } else {
              $("#btn-view-"+vieww).attr("class", "btn btn-default btn-lg btn-block");
            }
          });
        });
      });
    });
  });
});

function updateFrameLabel(){
  var frame = viewer.getCurrentFrame();
  var label = "Frame " + frame;
  $("#frame-label").attr("value", label);
}

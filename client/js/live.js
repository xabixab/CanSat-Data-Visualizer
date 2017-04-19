var globalConfig;
$(function(){
  $.get("/getConfig", function(data){
    globalConfig = data;
    var brand = data.name + " | Dashboard";
    $("title").html(brand);
    $(".connected").hide();
    $(".brand").html(data.name);
    init();
  });
});

var ws;
var rec;
var chr;

var ioFixInterval;
function init(){
  ioFixInterval = setInterval(function(){
    if(ws.connected === false){
      $("#io-hardcode").show();
    } else {
      $("#io-hardcode").hide();
    }
  }, 2000);

  $("#io-hardcode-btn").click(function () {
    ws.connected = true;
    $("#io-hardcode").hide();
    clearInterval(ioFixInterval);
  });
  ws = io(globalConfig.ws_host);
  ws.on('connect', function(){
    console.log("Connected to server!");
  });

  ws.on('disconnect', function(){
    console.log("Disconnected from the server");
    /*self.timeout = setTimeout(function(){
      document.location = "/error/websocket-disconnection.htm";
    }, globalConfig.socketTimeout)*/
  });

  chr = new Charts();
  rec = new Receiver({});
  dtr = new Recorder({});

}

var globalConfig;
$(function(){
  $.get("/getConfig", function(data){
    globalConfig = data;
    var brand = data.name + " | Dashboard";
    $("title").html(brand);
    $(".brand").html(data.name);
    init();
  });
});

var ws;
var rec;
var chr;

function init(){
  ws = io();
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


}

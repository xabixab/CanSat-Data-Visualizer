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

function init(){

}

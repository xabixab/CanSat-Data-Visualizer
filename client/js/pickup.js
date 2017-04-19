var geoAvailable = false;
var globalConfig;
var puConfig;
$(function(){
  $("#toolbox").hide();
  $.get("/getConfig", function (config) {
    globalConfig = config;
    puConfig = config.pickup;
    loadMapScript();
  });

  $("#maximize-toggle").click(toogleMenu);

  if(findGetParameter("desktop") == "false"){
    localStorage.setItem("pickup_id", findGetParameter("id"));
  } else {
    if ("geolocation" in navigator) {
      geoAvailable = true;
      setInterval(function () {
        navigator.geolocation.getCurrentPosition(positionCallback);
      }, 10000  );
    } else {
      console.log("Geolocation not available.");
      geoAvailable = false;
    }
    if(typeof localStorage.pickup_id === "undefined"){
      localStorage.setItem("pickup_id", Math.round(Math.random()*1000000));
    }
  }

  setInterval(function () {
    $.get("/pickup/list", function (info) {
      parseInfo(info);
    });
  }, 3000);


});

var map;
var mm;

function initMap() {
  // Create a map object and specify the DOM element for display.
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.345735, lng: -1.1064241},
    scrollwheel: true,
    zoom: 8
  });
  var firstLoaded = true;
  map.addListener("tilesloaded", function () {
    if(firstLoaded){
      init();
      firstLoaded = false;
    }
  });

  mm = new MarkerManager({
    cansatInitialPos: {
      lat:puConfig.defaultPos.lat,
      lng:puConfig.defaultPos.lng
    }
  });
}

var pos;
function positionCallback(position){
  pos = cloneAsObject(position.coords);
  console.log(position.coords);
  var me = {
    online: true,
    name: navigator.userAgent,
    id: localStorage.pickup_id,
    browser: true,
    pos: pos
  }
  console.log(me);
  $.post("/pickup/register", {
    client: JSON.stringify(me)
  }, function (response) {
    console.log(response);
  });
}

function init() {
  $("#toolbox").show();
}

function loadMapScript(){
    $.loadScript('https://maps.googleapis.com/maps/api/js?key=' + puConfig.maps_key + '&callback=initMap', function(){
    console.log("Google Maps script loaded.");
  });
}

jQuery.loadScript = function (url, callback) {
    jQuery.ajax({
        url: url,
        dataType: 'script',
        success: callback,
        async: true
    });
}

function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
    .substr(1)
        .split("&")
        .forEach(function (item) {
        tmp = item.split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    });
    return result;
}

function parseInfo(info){
  var cansat = info.cansat;
  var clients = info.clients;

  clients.forEach(function (client, index) {
    var clientParams = client;
    console.log("Parsing client " + client.id + " " + client.name);
    if(client.id == localStorage.pickup_id){
      clientParams.isme = true;
      clientParams.icon = fontawesome.markers.USER;
      console.log("Client is USER");
    } else if (client.phone) {
      clientParams.icon = fontawesome.markers.MOBILE_PHONE;
      console.log("Client is ANDROID");
    } else if (client.browser) {
      clientParams.icon = fontawesome.markers.DESKTOP;
      console.log("Client is BROWSER");
    } else {
      clientParams.icon = fontawesome.markers.QUESTION;
      console.log("Client is OTHER");
    }
    if(typeof mm !== "undefined"){
      mm.updateMarkerPosition(client.id, clientParams);
    }
  });

  if(typeof mm !== "undefined"){
    mm.updateCansatPos(cansat);
  }
}

function cloneAsObject(obj) {
    if (obj === null || !(obj instanceof Object)) {
        return obj;
    }
    var temp = (obj instanceof Array) ? [] : {};
    // ReSharper disable once MissingHasOwnPropertyInForeach
    for (var key in obj) {
        temp[key] = cloneAsObject(obj[key]);
    }
    return temp;
}
var menuMaximized = true;
function toogleMenu(){
  if(menuMaximized){
    $(".maximized").hide();
    $("#maximize-toggle-icon").attr("class", "glyphicon glyphicon-menu-up inline");
  } else {
    $(".maximized").show();
    $("#maximize-toggle-icon").attr("class", "glyphicon glyphicon-menu-down inline");
  }
  menuMaximized = !menuMaximized;
}

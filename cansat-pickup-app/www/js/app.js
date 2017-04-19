document.addEventListener("backbutton", function () {}, false);
document.addEventListener("deviceready", function () {
  $("#close-btn").click(closeApp);
  var host = localStorage.host;
  var id = device.uuid;
  var params = "desktop=false&id=" + id;
  $("#frame").attr("src", "http://" + host + "/pickup.html?" + params);

  navigator.geolocation.watchPosition(positionCallback, function (error) {
    console.log(error);
    alert(error);
  }, {
    enableHighAccuracy: true,
    maximumAge: 3000
  });

  setTimeout(function () {
    navigator.geolocation.getCurrentPosition(positionCallback, function (error) {
      console.log(error);
      alert(error);
    }, {
      enableHighAccuracy: true,
      maximumAge: 3000
    });
  }, 10000);

}, false);



function positionCallback(position){
  pos = cloneAsObject(position.coords);
  console.log(position.coords);
  var me = {
    online: true,
    name: device.model,
    id: device.uuid,
    phone: true,
    pos: pos
  }
  console.log(me);
  $.post("http://" + localStorage.host + "/pickup/register", {
    client: JSON.stringify(me)
  }, function (response) {
    console.log(response);
  });
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

function closeApp(){
  navigator.app.exitApp();
}

/*

    Caution! Bad code.
    maken with rush

*/

document.addEventListener("deviceready", function () {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: localStorage.lat, lng: localStorage.lng},
    scrollwheel: true,
    zoom: 8
  });

  navigator.geolocation.watchPosition(function (position) {
    var pos = cloneAsObject(position.coords);
    localStorage.setItem("localPos", JSON.stringify(pos));
  }, function (error) {
    console.log(error);
    alert(error);
  }, {
    enableHighAccuracy: true,
    maximumAge: 3000
  });
  var localPos = JSON.parse(localStorage.localPos);
  var markerCansat = new google.maps.Marker({
    position: {},
    map: map,
    icon: {
      path: fontawesome.markers.ROCKET,
      scale: 0.4,
      strokeWeight: 0.2,
      strokeColor: 'white',
      strokeOpacity: 1,
      fillColor: "#FF0000",
      fillOpacity: 0.7
    },
    clickable: false
  });

  var markerLocal = new google.maps.Marker({
    position: ,
    map: map,
    icon: {
      path: fontawesome.markers.ROCKET,
      scale: 0.4,
      strokeWeight: 0.2,
      strokeColor: 'white',
      strokeOpacity: 1,
      fillColor: "#000000",
      fillOpacity: 0.7
    },
    clickable: false
  });

  setInterval(function () {

  }, 2000);

}, false);


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

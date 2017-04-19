class MarkerManager{
  constructor(params){
    var that = this;
    that.markers = {};
    that.cansatMarker = new google.maps.Marker({
      position: params.cansatInitialPos,
      map: map,
      icon: {
        path: fontawesome.markers.ROCKET,
        scale: 0.4,
        strokeWeight: 0.2,
        strokeColor: 'white',
        strokeOpacity: 1,
        fillColor: '#FF0000',
        fillOpacity: 0.7
      },
      clickable: false
    });
  }

  addMarker(id, params){
    var that = this;
    if(typeof that.markers[id] === "undefined"){
      that.markers[id] = params;
      var position = {
        lat: params.pos.latitude,
        lng: params.pos.longitude
      }
      that.markers[id].marker = new google.maps.Marker({
        position: position,
        map: map,
        icon: {
          path: params.icon,
          scale: 0.4,
          strokeWeight: 0.2,
          strokeColor: 'white',
          strokeOpacity: 1,
          fillColor: randomColor(),
          fillOpacity: 0.7
        },
        clickable: false
      });
      return true;
    } else {
      console.log("Marker already exists");
      return false;
    }
  }

  updateMarkerPosition(id, params){
    var that = this;
    if(typeof that.markers[id] === "undefined"){
      return that.addMarker(id, params);
    } else {
      var position = {
        lat: params.pos.latitude,
        lng: params.pos.longitude
      }
      that.markers[id].marker.setMap(map);
      that.markers[id].marker.setPosition(position);
      return true;
    }
  }

  removeMarker(id){
    that.markers[id].marker.setMap(null);
  }

  updateCansatPos(pos){
    var that = this;
    that.cansatMarker.setPosition(pos);
  }
}

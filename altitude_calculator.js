var config = require(__dirname + '/config.json');
var recvConfig = config.iturramasat_receiver;

function calculateAltitude(pre){
  var t0 = config.altitude.t0 + 273.15;
  var h0 = config.altitude.h0;
  var p0 = config.altitude.p0 * 100;
  var pre = pre * 100;
  return (t0/-0.0065)*((Math.pow((pre/p0), 0.0065*287.06/9.81))-1) + h0;


}

module.exports = calculateAltitude;

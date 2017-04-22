/*$(function(){
  var width = $("#chart-row").width();
  $("#chart-presure").width(width);
  $("#chart-temperature").width(width);

  var line1 = new TimeSeries();
  var line2 = new TimeSeries();
  setInterval(function() {
    line1.append(new Date().getTime(), Math.random());
    line2.append(new Date().getTime(), Math.random());
  }, 1000);

  var presure = new SmoothieChart({millisPerPixel: 80, fps:5, grid: {millisPerLine: 5000, verticalSections: 4}});
  presure.streamTo(document.getElementById("chart-presure"));
  presure.addTimeSeries(line1);

  var temperature = new SmoothieChart({fps:5});
  temperature.streamTo(document.getElementById("chart-temperature"));
})*/

class Charts {
  constructor(){
    var that = this;
    that.charts = globalConfig.charts;
    // that.width = $("#chart-row").width();
    that.inverseMap = {}
    Object.keys(that.charts).forEach(function(index){
      var chart = that.charts[index];
      $("#chart-" + index + "-title").html(chart.name);
      // $("#chart-" + index + "-canvas").width(that.width);

      $("#data-" + index + "-title").html(chart.name);
      $("#data-" + index + "-unit").html(chart.unit);
      $("#data-" + index + "-value").html(chart.start_value);

      that.inverseMap[chart.sname] = index;

      that[chart.sname] = {
        "name": chart.name,
        "sname": chart.sname,
        "unit": chart.unit,
        "start_value": chart.start_value,
        "line": new TimeSeries(),
        "smoothie": new SmoothieChart({
          millisPerPixel: 80,
          fps:5,
          grid:{
            millisPerLine:5000,
            verticalSections:4
          }
        })
      }

      that[chart.sname].smoothie.streamTo(document.getElementById("chart-" + index + "-canvas"), 0);
      that[chart.sname].smoothie.addTimeSeries(that[chart.sname].line);
    });
    ws.on("newValue", this.updateValue);
  }

  updateValue(value){
    var that = this;
    that.inverseMap = globalConfig.inverseMap;
    if (value.name in that.inverseMap){
      var index = that.inverseMap[value.name];
      $("#data-" + index + "-value").html(Math.round(value.value * 1000)/1000);
    }
    if(value.name in chr){
      chr[value.name].line.append(value.time, value.value);
    } else {
      console.log(value.name);
    }

  }
}

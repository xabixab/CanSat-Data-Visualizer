$(function () {
  $("#ip-address").val(localStorage.host);
  $("#connect-btn").click(function () {
    var that = this;
    var host = $("#ip-address").val();
    $("#connect-btn").hide();
    $.get("http://" + host + "/pickup/status", function (response) {
      if(response.success){
        localStorage.setItem("host", host);
        document.location = "map.html";
      } else {
        alert("Not a valid groundstation");
        $("#connect-btn").show();
      }
    }).fail(function() {
      $("#connect-btn").show();
      alert('Error. Open inspector for more details.');
    });
  });
})

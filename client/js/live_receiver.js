
class Receiver {
  constructor(params){
    var that = this;
    that.connected = false;
    that.params = params;
    //ws.on("connectionChange", that.connectionChange);
    //ws.on("connectionSend", that.connectionChange)
    that.setupBinds();
  }

  setupBinds(){
    var that = this;
    $("#btn-connect").click(that.connect);
  }

  connectionChange(params){
    var that = this;
    that.connected = params.connected
    if(that.connected === true){
      $(".disconnected").hide();
      $(".connected").show();
      $("#lbl-connected").html("Connected to " + params.tty);

    } else {
      $(".disconnected").show();
      $(".connected").show();
    }
  }

  connect(){
    var that = this;
    ws.emit("connectReceiver", true);
    console.log("Send connectReceiver");
  }
}

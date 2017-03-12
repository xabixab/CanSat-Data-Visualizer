class WebSocket{
	constructor(params){
		self = this;
		self.socket = io.connect();
		self.socket.on('connect', function(){
			console.log("Connected to server!");
			self.socket.connected = true;
		});

		self.socket.on('disconnect', function(){
			console.log("Disconnected from the server");
      /*self.timeout = setTimeout(function(){
        document.location = "/error/websocket-disconnection.htm";
      }, globalConfig.socketTimeout)*/
		});
	}

	send(evt, value){
		self = this;
		self.socket.emit(evt, value);
	}

  on(evt, callback){
    self.socket.on(evt, callback);
  }
}

var ws;

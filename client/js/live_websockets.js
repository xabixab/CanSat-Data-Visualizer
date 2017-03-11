class WebSockets {
	constructor(params){
		self = this;
		self.socket = io(globalConfig.host);
		self.socket.on('connect', function(){
			console.log("Connected to server!");
		});

		self.socket.on('disconnect', function(){
			console.log("Disconnected from the server");
      document.location = "/error/websocket-disconnection.htm";
		});
	}

	send(evt, value){
		self = this;
		self.socket.emit(evt, value);
		return true;
	}
}

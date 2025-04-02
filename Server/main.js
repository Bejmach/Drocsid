import {WebSocket} from ("ws");

const wss = new WebSocket.Server({port: 5000});

wss.on("connection", (ws) =>{
	console.log("client connected");

	ws.on("message", (message) => {
		wss.clients.forEach((client) => {
			if(client!= ws && client.readyState == WebSocket.OPEN){
				client.send(message);
			}
		})
	})
	ws.on("close", ()=>{
		console.log("Client disconected");
	})
})

console.log("WebSocket server running on ws://localhost:5000");

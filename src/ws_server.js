const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });
var nbr = 1;


function envoi(){
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('recu par le client: %s', message);
    ws.send(nbr + "from server ");
    nbr++;
  });

  
});

}

envoi();
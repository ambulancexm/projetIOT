import 'bootstrap/dist/css/bootstrap.css';

import * as constante from './constante';

//************* write data ****************

const ws = new WebSocket("ws://localhost:"+ constante.port);

//ouverture webSocket
ws.onopen = function (event) {
  console.log("WebSocket is open now.");
};

//reception de message
ws.onmessage = function (event) {
  // parse  du message reçu
  console.log(JSON.parse(event.data))
};



   

import 'bootstrap/dist/css/bootstrap.css';
import './iotDevices';
import * as constante from './constante';
import { emit } from './pubsub';

//************* write data ****************

const ws = new WebSocket("ws://localhost:"+ constante.port);

//ouverture webSocket
ws.onopen = event => {
  console.log("WebSocket is open now.");
};

//reception de message
ws.onmessage = event => {
  // parse  du message reçu
  const data = JSON.parse(event.data);
  emit('server/data/update', data);
};



   

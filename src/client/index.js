import 'bootstrap/dist/css/bootstrap.css';
import './iotDevices';
import * as constante from './constante';
import { emit } from './pubsub';
import './iotDevicesSensorsChart'


//************* write data ****************

const hostname = `ws://${constante.HOST}:${constante.PORT_CLIENT}`;

const ws = new WebSocket(hostname);
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
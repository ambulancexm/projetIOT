// client.js

const WebSocket = require('ws')
const url = 'ws://192.168.50.1:3000'
const connection = new WebSocket(url)

console.log("ws_client");
connection.onopen = (e) => {
    console.log("port ouvert");
}

connection.onerror = (error) => {
  console.log(`WebSocket error: ${error}`)
}

connection.onmessage = (e) => {
  console.log(e.data);
  connection.send((JSON.stringify({"test": "test"}))); 
  
}

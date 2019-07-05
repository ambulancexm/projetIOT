// client.js

const WebSocket = require('ws')
const url = 'ws://localhost:8080'
const connection = new WebSocket(url)


connection.onopen = (e) => {
}

connection.onerror = (error) => {
  console.log(`WebSocket error: ${error}`)
}

connection.onmessage = (e) => {
  console.log(e.data);
  connection.send('Message From Client ' + e.data); 
  
}

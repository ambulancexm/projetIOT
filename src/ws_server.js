const WebSocket = require('ws').Server
let request = require('request');
const MongoClient = require('mongodb').MongoClient, assert = require('assert');
const express = require('express');

// init openweather
let apiKey = 'e0d3505562b0333fb73fd10f0e9dac52';
let city = 'toulouse';
let urlw = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

var url = 'mongodb://localhost:27017/myproject';

var app = express()

app.use(express.static('public'));


MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  db.createCollection("Raspi");
  db.close();
});
var nbr = 1;
var hello = "hello";
var buf;
var jsonContent;
var defautReception = 0;
var wss = new WebSocket({ port: 8080 });
var weather;


console.log("serveur démarré..."); 

    wss.on('connection', function (ws) {
      
       ws.send(buf);
      ws.on('message', function (message) {
        
        // test erreur de reception
        try {
          wss.clients.forEach(function each(client) {
          if (client !== ws && client.readyState === ws.OPEN) {
            console.log(message);
            
            client.send(message);
          }
        }); 
        //let temp  = JSON.parse(message);
        //reception(message);
        }catch (e) {
          defautReception++;
          console.log("defaut reception N°" + defautReception);
        }
         
        buf = message;
          
        
      });
     
});

function reception(message){
  
  wss.clients.forEach(function each(client) {
          if (client !== ws && client.readyState === ws.OPEN) {
            console.log(message);
            
            client.send(message);
          }
        });  
  
}


app.get('/index.html', function(req, res) {
//      res.setHeader('Content-Type', 'text/plain');
//      res.send(buf);
//      res.json({msg: 'This is CORS-enabled for all origins!'})
      console.log("server : " + buf);
      });

app.listen(3000);












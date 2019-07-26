const WebSocket = require('ws').Server
let request = require('request');
const MongoClient = require('mongodb').MongoClient, assert = require('assert');
const express = require('express');

const xmlhttprequest = require('xmlhttprequest').XMLHttpRequest;
var httprequest = new xmlhttprequest();
// init openweather

var url = 'mongodb://localhost:27017/myproject';

var app = express()

app.use(express.static('public'));

// ouverture de mongodb
//~ MongoClient.connect(url, function(err, db) {
  //~ assert.equal(null, err);
  //~ console.log("Connected successfully to server");
  //~ db.createCollection("Raspi");
  //~ //db.close();
//~ });


var nbr = 1;
var hello = "hello";
var buf;
var jsonContent;
var defautReception = 0;
var wss = new WebSocket({ port: 8080 });
var weather;
var flagSave = false;
var messageAEnvoyer;
// API openweathermap
// recovery of temperature
function receiveAPI(){
let apiKey = 'e0d3505562b0333fb73fd10f0e9dac52';
let city = 'toulouse';
let urlw = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    
    
 //var url = 'https://api.github.com/users/rsp';

request.get({
    url: urlw,
    json: true,
    headers: {'User-Agent': 'request'}
  }, (err, res, data) => {
    if (err) {
      console.log('Error:', err);
    } else if (res.statusCode !== 200) {
      console.log('Status:', res.statusCode);
    } else {
      // data is already parsed as JSON:
      console.log(data.name + " : " + data.main.temp);
      //console.log(data);
      objdata = {"req" : "meteo" , "data" : [{ "ville" : data.name} , {"temp" : data.main.temp}]}; 
      console.log(objdata);
      return objdata;
    }
});     
        
  
}	
// ouverture de mongodb
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
console.log("serveur démarré..."); 

    wss.on('connection', function (ws) {
      
       //ws.send(buf);
      ws.on('message', function (message) {
        
        console.log(receiveAPI());
        
        // test erreur de reception
        try {
        // parser le message recu par ws                  
        let x_mess = JSON.parse(message);
        
        console.log("message parsé" + x_mess); 
        
        // reception message api  
        //messageAEnvoyer = {"req":"meteo", "data": weather};
        //~ messageAEnvoyer = JSON.stringify(messageAEnvoyer);
        
        switch(x_mess.req){
          case "SAVE":
                      console.log("debut enregistrement");
                      db.createCollection("raspi");
                      console.log(x_mess + JSON.stringify(x_mess));
                      flagSave = true;
                      break;
          case "STOP":
                      console.log("fin enregistrement");
                      flagSave = false;
                      break;
          case "login":
                      console.log(x_mess);
                      if(x_mess.username == "thomas"){
                        ws.send(JSON.stringify({"req" : "login", "status" : "true"}));
                      }
          case "capteur":
                      if(flagSave == true){
                        db.collection("raspi").insertOne(x_mess, function(err,res){
                          if (err) throw err;
                          console.log("un doc inseré");
                        });
                      }else{
                        console.log(x_mess);
                      }
                      break;
                      
         
        } 
          
          // broadcast pour tous les clients
          wss.clients.forEach(function each(client) {
          if (client !== ws && client.readyState === ws.OPEN) {
            //console.log(message);
            client.send(message);
            console.log("API => " + JSON.parse(receiveAPI()));
            client.send(JSON.parse(receiveAPI()));
            
          }
        }); 
        }catch (e) {
          defautReception++;
          console.log("defaut reception N°" + defautReception + e);
        }
         
        buf = message;
          
        
      });
     
});

});

function parseCapteur(message){
  message.replace(/req/g,"ok");
  console.log("replace" + message);
  }

function enregistrement(etat, message,db){
  if(message.req == "capteur"){
    if(etat == true){
      console.log(message);
      //db.raspi.insertOne(JSON.stringify(message));
    }
    }
}


app.get('/index.html', function(req, res) {
      console.log("server : " + buf);
      });



app.listen(3000);












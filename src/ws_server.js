const WebSocket = require('ws').Server;
const express = require('express');
var cors = require('cors')

var app = express()
app.use(cors())

app.use(express.static('public'));


var nbr = 1;
var hello = "hello";
var buf;
var jsonContent;

var wss = new WebSocket({ port: 8080 });
console.log("serveur démarré..."); 

    wss.on('connection', function (ws) {
      
       ws.send("send 1 : " +buf);
      ws.on('message', function (message) {
        buf = message;
        console.log(message);
        wss.clients.forEach(function each(client) {
          if (client !== ws && client.readyState === ws.OPEN) {
            client.send("send 2 : " + message);
          }
        });
    
        //ws.broadcast.send("send 2 : " + message.data );
        //console.log("test");
      
        try{
          JSON.parse(message);
//          console.log('recu par le client: %s', message);
//            ws.send("message" + message);
          
          
          
        nbr++;
          
        }catch (e){
          console.log("erreur de reception");
        }  
        
      });
     
});






app.get('/index.html', function(req, res) {
//      res.setHeader('Content-Type', 'text/plain');
//      res.send(buf);
//      res.json({msg: 'This is CORS-enabled for all origins!'})
      console.log("server : " + buf);
      });

app.listen(3000);












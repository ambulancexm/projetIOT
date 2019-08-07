import 'bootstrap/dist/css/bootstrap.css';

import $ from 'jquery';
const jQuery = $;
import * as tableau from './tableau';
import * as constante from './constante';
import chart from 'chart.js';
import * as graph from './graphique';
import popper from 'popper.js'

//************* write data ****************

console.log(graph.x);

const ws = new WebSocket("ws://localhost:"+ constante.port);

var jsonData;
//ouverture webSocket
ws.onopen = function (event) {
  console.log("WebSocket is open now.");

};

//reception de message
ws.onmessage = function (event) {
  // parse  du message reçu
  jsonData = jQuery.parseJSON(event.data);
  console.log(jsonData);



  // choix des action suivant le protocole defini
  switch (jsonData.req) {

    case "capteur":

      tableau.rechercheIot(jsonData);

      // ajout de la valeur reçcu par ws dans le graphique
      // graph.addData(new Date().getUTCMinutes() + ":" + new Date().getUTCSeconds(), parseFloat(jsonData.data[0].val));
      //ajout de d'une nouvelle courbe

      
      /* jsonData.data.forEach(function(element){
        // console.log(jsonData.name + element.name);
        graph.addDataset(jsonData.name + element.name);

      }); */
      // console.log(  new Date().getUTCMinutes() + ":" + new Date().getUTCSeconds(), 
      // parseFloat(jsonData.data[0].val), 
      // jsonData.name+jsonData.data[0].name)  
      // graph.addData(  new Date().getUTCMinutes() + ":" + new Date().getUTCSeconds(), 
      //                 parseFloat(jsonData.data[0].val), 
      //                 jsonData.name+jsonData.data[0].name);

      break;

    case "meteo":
      // console.log("meteo : " + parseFloat(jsonData.data.main.temp));
      // x_weather = parseFloat(jsonData.data.main.temp);
      break;

    case "login":
      if (temp.status == "true") {
        console.log("retour ok");
      }
      break;
  }


};



   

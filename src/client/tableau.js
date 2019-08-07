var jQuery = require('jquery');
var $ = jQuery;

var idIot = []; // stocke tout les IOT

// 
// export const initTableau = function createNav(jsonData) {

//   var iotCurrent = jsonData.id;
//   var iotlast;
//   console.log(iotCurrent == iotlast || typeof createNav.first == 'undefined');
//   if (iotCurrent == iotlast || typeof createNav.first == 'undefined') {
//     var labelIOT = document.createElement("label")
//     document.getElementById("listButton").appendChild(labelIOT);
//     labelIOT.innerHTML = jsonData.id;
//     labelIOT.setAttribute("class", "btn btn-outline-primary");
//     labelIOT.setAttribute("disabled", "true");



//     jsonData.data.forEach(buildButton);

//     function buildButton(item, index) {
//       //document.getElementById("demo").innerHTML += item.nom + ":" + parseFloat(item.val) ;

//       var buttonCapteur = document.createElement("button");
//       document.getElementById("listButton").appendChild(buttonCapteur);
//       buttonCapteur.innerHTML = item.nom;
//       buttonCapteur.setAttribute("id", jsonData.id.replace(/:/g, '_') + item.nom);
//       var tho = "thomas";
//       console.log($("#" + jsonData.id.replace(/:/g, '_') + item.nom));


//       $("#" + jsonData.id.replace(/:/g, '_') + item.nom).on('click', function () {
//         console.log("click" + jsonData.id + item.nom);
//       });
//     }
//   }
//   iotlast = iotCurrent;
//   createNav.first = true;
// }

export const rechercheIot = function rechercheIot(capt) {



  // capt = JSON.stringify(capt);
  console.log("recherche capt : " , capt);
  var cellule = ``;
  var ligne = ``;
  var testIot = false; // test de boucle IdIot
  //console.log("idIot :" + idIot + "capt.name : " + capt.name);

  if (idIot.length == 0) {

    creerDom();
  }
  
  // parcours du tableau de nom capt
  
  idIot.forEach(function (iot) {
    console.log("iot : " + iot);
    if (iot == capt.name) {
      // parcours des element de capt.data et mise a jour
        capt.data.forEach(function (elem) {
        let updateCapt = capt.name.replace(/:/g, "_") + elem.name; // recherche de id button
       $($('#' + updateCapt).children('#val').text(elem.val)); // mise a jour valeur de id button
       
      });
      testIot = true;
    }
  });

  if (!testIot) {
    console.log("je cree le DOM");
    creerDom();

  }
  // creation du Dom 
  function creerDom() {
    let nomId = capt.name.replace(/:/g, "_");
    let cptIot = 0;
    idIot.push(capt.name);
    console.log("ce n'est pas le meme");
    // ${ capt.name.replace(/:/g, "_")}
    capt.data.forEach(function (data) {
      cellule += `
        
        <button class="btn btn-secondary btn-capteur" id="${capt.name.replace(/:/g, "_")}${data.name}">
          <span id="name">${data.name}</span>` + " | " + `<span id="val">${data.val}</span>
        </button>
                        
                        `
       
    });
    ligne += `
        <tr  >
        <th scope="row" style="line-height:70px; width:50px;border : 1px solid #000000;text-align:center;" >${capt.name}</th>
        <td class="btn-group" role="group" aria-label="Basic example" style="line-height:50px; line-width:80px" >
            ${cellule} 
        </td>
        </tr>
    `
    $('#tableau').append(ligne);

    $('.btn-capteur').click(function (event) {
      console.log("clickez sur "+ this.id);
       
    })
    
  }
  $(document).ready(function(){});
}
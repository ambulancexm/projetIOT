// exemple tableau

$(document).ready(function(){
  
		   //~ <tr>
		    //~ <td>John</td>
		    //~ <td>Doe</td>
		    //~ <td>john@example.com</td>
		  //~ </tr>
		  
		  //~ '<div class="row" id='data.id' onClick=>'
  for (var i=0; i<3; i++){
    
      var ligne = '<tr id="list'+ i +' >'
      ligne += '<td>nom'+ i + '</td>'
      ligne += '<td>prenom'+ i + '</td>'
      ligne += '</tr>'
  }
  console.log(ligne)
  $("#listbody").append($(ligne))
})

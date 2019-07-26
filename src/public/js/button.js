// gestion des boutons

      var testSave = "POST testSaveData";
      var testStop = "POST testStopData";
      
      var flip = 0;
      
      // init button
      $(function(){
	$("#stopButton").attr("disabled","disabled");
      });
      
      // gestion button start
      $(function(){
	$("#saveButton").click(function(){
	  $(this).attr("disabled","disabled");
	  $("#stopButton").removeAttr("disabled");
	  console.log(testSave);
	  //Date beginSave = new Date()
	  let myJson = JSON.stringify( {"req" : "SAVE" , "date" : new Date()});
	  ws.send(myJson);
	});
      });
    
      //gestion button stop
      $(function(){
	$("#stopButton").click(function(){
	$(this).attr("disabled","disabled");
	$("#saveButton").removeAttr("disabled");
	console.log(testStop);
	let myJson = JSON.stringify( {"req" : "STOP" , "date" : new Date()});
	  ws.send(myJson);
	});
      });

    function stopData(){
      
      var test = "POST teststopData";
      console.log(test);
      ws.send(test);
    }

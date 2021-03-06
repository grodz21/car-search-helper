
	
	var apiKey = "xaq2gcmpz7k5kt84d6wvwdpf";

	var carToIdMapping = {};

	
	



	$("#submitDataBttn").on('click', function() {

		console.log($("#carModel").val());
		console.log(carToIdMapping);
		var carModel = $("#carModel").val();
		console.log(carToIdMapping[carModel]); //Console logs model id by number. Ex:200701415

		if($("#infoDisplayOption").val() === "1"){
			// This one submits the get request for Vehicle Recalls


			$.ajax({
			url: "https://api.edmunds.com/v1/api/maintenance/recallrepository/findbymodelyearid?modelyearid=" + 
					carToIdMapping[carModel] + "&fmt=json&api_key=" + apiKey ,

			method: "GET",

			})
			.done(function(data){
			  console.log(data);
			  // data[0]

			  if (data.recallHolder.length === 0) {
			  		$(".contentWrapper").html("<p>No recalls found.</p>");

				  }	else {
				  		var templateToRender = $("#recall-template2").html();
				 		Mustache.parse(templateToRender);
				 		var rendered = Mustache.render(templateToRender, data);
	  					$(".contentWrapper").html(rendered);
			  }

			 
			})
			.fail(function(error){
			  console.log(error);

			})

		}
		else {
			// This one submits the get request for Vehicle Service Bulletins


			$.ajax({
			url: "https://api.edmunds.com/v1/api/maintenance/servicebulletinrepository/findbymodelyearid?modelyearid=" + 
					carToIdMapping[carModel] + "&fmt=json&api_key=" + apiKey ,

			method: "GET",

			})
			.done(function(data){
			  console.log(data);

			  if (data.serviceBulletinHolder.length === 0) {
			  		$(".contentWrapper").html("<p>No technical service bulletins found.</p>");

				  }	else {
				  		var tsbTemplateToRender = $("#serviceBulletin-template").html();
				 		Mustache.parse(tsbTemplateToRender);
				 		var renderedTsbTemplate = Mustache.render(tsbTemplateToRender, data);
	  					$(".contentWrapper").html(renderedTsbTemplate);
			  }
			  
			})

			.fail(function(error){
			  console.log(error);
			})
		}

	
	});



	// This function gets car makes by condition of car / year and populates it in the options.
	$("#yearOfCar, #stateOfCar").change(function() {
  		

  		var stateOfVehicle = $('#stateOfCar').val();
		var modelYear = Number($('#yearOfCar').val());

		if (modelYear !== 0) {

				$.ajax({
				url: "https://api.edmunds.com/api/vehicle/v2/makes?state=" + stateOfVehicle + "&year=" + modelYear + 
				"&view=basic&fmt=json&api_key=" + apiKey ,

				method: "GET",

			})
			.done(successHandler)
			.fail(errorHandler);

			function successHandler(data){
				console.log(data);

				var nameList = data.makes.map(function(make) {
	  				return make.niceName;
	  			});

				console.log(nameList);
				/*This clears the Make selection before appending new makes
				based in changes between condition and year.*/
				// $("#carMake").html("");

				/*This appends the list of car makes to the make dropdown*/
				for(var i = 0; i < nameList.length; i++){
				$("#carMake").append("<option>" + nameList[i] + "</option>");
				}

				// var modelList = data.makes.map(function(model) {
		  // 				return models.niceName;
		  // 			});


			//Maintenance recalls ajax call 
			$.ajax({

				url: "https://api.edmunds.com/v1/api/maintenance/recall/200002038" + "?fmt=json&api_key=" + apiKey,

				method: "GET",

			})
			.done(successRecallHandler)
			.fail(errorRecallHandler);

			function successRecallHandler(data){
				console.log(data);
			}

			function errorRecallHandler(error){
				console.log(error);
			}

			// Throw new error
			if (data.makesCount === 0){
				alert("No cars available");
			}
			else {
			/*Here goes function that gets the ".makes["0"].name" and 
			prints it to "carMake" option selection. Render list names*/
				console.log(data.makes[0].name);
				}
			};


			function errorHandler(error){
				console.log(error);
			};
		}
  		


	});


		// This handles the updating of the car models list
		$("#carMake").change(function() {
			var selectedState = $( "#stateOfCar option:selected" ).text();

			var selectedYear = $( "#yearOfCar" ).val();

			var selectedCarMake = $( "#carMake option:selected" ).text();

			
			
			
			$.ajax({
				url: "https://api.edmunds.com/api/vehicle/v2/" + selectedCarMake + 
				"?state=" + selectedState + "&year=" + selectedYear + "&view=basic&fmt=json&api_key=" + apiKey,

				method: "GET",

				})
				.done(successRecallHandler)
				.fail(errorRecallHandler);




				function successRecallHandler(data){
					console.log(data);

					var carList = [];

					for(var i = 0; i < data.models.length; i++){
						carToIdMapping[data.models[i].name] = data.models[i].years[0].id;
						carList.push(data.models[i].name);
						console.log(carToIdMapping);
					}
					
					var carListToHTML = carList.map(function(carName){
					return"<option>" + carName + "</option>";
					});

					$("#carModel").append(carListToHTML.join(""));

					console.log(carListToHTML);
					console.log(carListToHTML.join(""));	

				}

				function errorRecallHandler(error){
					console.log(error);
				}


			});










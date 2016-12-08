
	
	var apiKey = "xaq2gcmpz7k5kt84d6wvwdpf";

	
	



	$("#submitDataBttn").on('click', function() {

		var stateOfVehicle = $('#stateOfCar').val();
		var modelYear = Number($('#yearOfCar').val());


		$.ajax({
			url: "https://api.edmunds.com/api/vehicle/v2/makes?state=" + stateOfVehicle + "&year=" + modelYear + 
			"&view=basic&fmt=json&api_key=" + apiKey ,

			method: "GET",

		})
		.done(successHandler)
		.fail(errorHandler);

		function successHandler(data){
			console.log(data);
		};


		function errorHandler(error){
			console.log(error);
		};
	});



	// This function gets car makes by condition of car / year and populates it in the options.
	$("#yearOfCar, #stateOfCar").change(function() {
  		

  		var stateOfVehicle = $('#stateOfCar').val();
		var modelYear = Number($('#yearOfCar').val());


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
			for(i=0;nameList[i].length;i++){
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
				}

				function errorRecallHandler(error){
					console.log(error);
				}

				

			});



				// /*This clears the Make selection before appending new makes
				// based in changes between condition and year.*/
				// $("#carModel").html("");

				// /*This appends the list of car makes to the make dropdown*/
				// for(i=0;makeList[i].length;i++){
				// $("#carModel").append("<option>" + makeList[i] + "</option>");
				// }

		










	// function getAllCars(stateOfCar, modelYear){

	// 	$.ajax({
	// 		url: "https://api.edmunds.com/api/vehicle/v2/makes?state=" + stateOfVehicle + "&year=" + modelYear + 
	// 		"&view=basic&fmt=json&api_key=" + apiKey ,

	// 		method: "GET",

	// 	})
	// 	.done(successHandler)
	// 	.fail(errorHandler);

	// 	function successHandler(data){
	// 		console.log(data);
	// 	};


	// 	function errorHandler(error){
	// 		console.log(error);
	// 	};


	// }







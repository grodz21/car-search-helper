$(document).ready(function(){
	
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
  		// console.log(document.getElementById('yearOfCar').value);

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




	

})


$(document).ready(function(){
	
	var apiKey = "xaq2gcmpz7k5kt84d6wvwdpf";

	
	// $("#submit-button")




	function getAllCars(stateOfCar, modelYear){

		$.ajax({
			url: "https://api.edmunds.com/api/vehicle/v2/makes?state=" + stateOfCar + "&year=" + modelYear + 
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


	}


	

})


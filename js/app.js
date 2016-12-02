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


	// LEFT SIDE NAVIGATION BEHAVIOR

	/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
	$( ".openNav" ).click(function() {
  		document.getElementById("mySidenav").style.width = "250px";
	    document.getElementById("main").style.marginLeft = "250px";
	});

	/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
	$( ".closeNav" ).click(function() {
  		document.getElementById("mySidenav").style.width = "0";
	    document.getElementById("main").style.marginLeft = "0";
	});



	// RIGHT SIDE NAVIGATION BEHAVIOR

	$(".openRightNav").click(function() {
  		document.getElementById("myRightSidenav").style.width = "250px";
	    document.getElementById("main").style.marginRight = 
      	String(window.innerWidth - 250) + "px";
	});



})


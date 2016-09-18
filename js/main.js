

// puts the name field in focus on load
$( document ).ready( function(){
  $("#name").focus();
});

var arrayOfColors = $.makeArray($("#color").children());

// function which removes all the color options
var removeAllColorOptions = function() {
	$("#color").children().remove();
}

// function which creates the other job title text field
var createJobTitleField = function() {
	$("fieldset:first").append("<input type='text' id='other-title' placeholder='Your Title'>");
}

// adds the event listener and function to add other job title text field
$("#title").change(function(){
	if ($("#title").val() === "other"){
		createJobTitleField();
	} else {
		$("#other-title").remove();
	}
});


$("#design").change(function() {
	removeAllColorOptions();
	var jsPuns = "(JS Puns shirt only)";
	var hearJS = "(I"
	switch( $("#design").val() ) {
		case "js puns":
			arrayOfColors.forEach(function(colorChoice){
				var colorOption = colorChoice.innerHTML;
				if (colorOption.indexOf(jsPuns) !== -1) {
					$("#color").append(colorChoice);
				}
				$("#color")[0].selectedIndex = 0;
			})

			break;
		case "heart js":
			arrayOfColors.forEach(function(colorChoice){
				var colorOption = colorChoice.innerHTML;
				if (colorOption.indexOf(hearJS) !== -1) {
					$("#color").append(colorChoice);
				}
				$("#color")[0].selectedIndex = 0;
			})
			break;
		case "Select Theme":
				arrayOfColors.forEach(function(colorChoice){
					$("#color").append(colorChoice);
			})
				$("#color")[0].selectedIndex = 0;
	}

});


var checkboxes = $('[type=checkbox]');
var totalCost = 0;

checkboxes.change(function(){

	if ( $(this)['0'].checked && $(this)['0'].name === "all"){
		totalCost += 200
	} else if (!($(this)['0'].checked) && $(this)['0'].name === "all") {
		totalCost -= 200
	} else if ($(this)['0'].checked) {
		totalCost += 100;
	} else {
		totalCost -= 100;
	}
	var htmlString = "<p id='total'> Total $" + totalCost + "</p>";
	createTotal(htmlString, totalCost);
});

// function which creates the total at the bottom of the selections
var createTotal = function(htmlString, totalCost) {
	$("#total").remove();
	if (totalCost !== 0) {
		$(".activities").append($(htmlString));
	}
} 

// global variable of activities array
var arrayOfActivities = $.makeArray($('.activities label'));

checkboxes.change(function(){
	// I hate this solution, but using data sourced from an innerHTML makes solving for the general case enormously complex. 
	if ($(this)['0'].name === 'js-libs' && $(this)['0'].checked) {
		arrayOfActivities[4].children['0'].disabled = true;
	} else if ($(this)['0'].name === 'js-libs' && !$(this)['0'].checked) {
		arrayOfActivities[4].children['0'].disabled = false;
	
	} else if ($(this)['0'].name === 'node' && $(this)['0'].checked) {
		arrayOfActivities[2].children['0'].disabled = true;
	} else if ($(this)['0'].name === 'node' && !$(this)['0'].checked) {
		arrayOfActivities[2].children['0'].disabled = false;
	
	} else if ($(this)['0'].name === 'js-frameworks' && $(this)['0'].checked) {
		arrayOfActivities[3].children['0'].disabled = true;
	} else if ($(this)['0'].name === 'js-frameworks' && !$(this)['0'].checked) {
		arrayOfActivities[3].children['0'].disabled = false;
	

	} else if ($(this)['0'].name === 'express' && $(this)['0'].checked) {
		arrayOfActivities[1].children['0'].disabled = true;
	} else if ($(this)['0'].name === 'express' && !$(this)['0'].checked) {
		arrayOfActivities[1].children['0'].disabled = false;
	}

});

function hideParagraphs() {
	$("fieldset:last div p").addClass("is-hidden");
}
hideParagraphs();


$("#payment").change(function(){
	if ($(this).val() === "credit card") {
		$("#credit-card").removeClass("is-hidden");
		hideParagraphs();
	} else if ($(this).val() === "paypal") {
		$("#credit-card").addClass("is-hidden");
		$("fieldset:last div p")['0'].classList = "";
		$("fieldset:last div p")['1'].classList = "is-hidden";
	} else if ($(this).val() === "bitcoin") {
		$("#credit-card").addClass("is-hidden");
		$("fieldset:last div p")['0'].classList = "is-hidden";
		$("fieldset:last div p")['1'].classList = "";
	}

});






$("button").mousedown(function() {
	// console.log(activitySelected());
	ccvAndZip();
	// console.log("name entered");
	// console.log($("#name").val());

	// console.log("valid email");
	// console.log(validEmail.test($("#mail").val())); //email address validated

	// console.log("activity selected");
	// console.log(activitySelected());

	// console.log("selected payment (should not equal select_method)");
	// console.log($("#payment").val());  //payment method selected

	// console.log("valid CC");
	// console.log(valid_credit_card($("#cc-num").val())); //credit card validated


	// if ($("#name").val() === "" || (!validEmail.test($("#mail").val())) || !activitySelected()) {
	// 	invalidForm();
	// }
})

// function which checks if a name has been entered
function nameEntered() {
	return ($("#name").val() !== "") ? true : false
}

// function which checks the validity of the email address
function validEmailAddress() {
	var validEmail = new RegExp(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i);
	return validEmail.test($("#mail").val());
}


// function which determines if an activity has been selected by user
function activitySelected() {
	var selectedActivityCount = 0; 
	$.each($("input[type='checkbox']"), function() {
		if ($(this).prop("checked")) {
			selectedActivityCount += 1;
		}
	})
	return (selectedActivityCount > 0) ? true : false
}

// function which determines if a payment option has been selected
function paymentOptionSelected() {
	return ($("#payment").val() !== "select_method") ? true : false
}

// function which determins if a zip code and 3 digit ccv number has been selected

function ccvAndZip() {
	var zip = $("#zip").val();
	console.log(zip);
}

ccvAndZip();
// functioin which checks the validity of the credit card number entered
// pulled this from DiegoSalazar on github. I don't need to reinvent the wheel
function validCreditCard(value) {
  // accept only digits, dashes or spaces
	if (/[^0-9-\s]+/.test(value)) return false;
	// The Luhn Algorithm.
	var nCheck = 0, nDigit = 0, bEven = false;
	value = value.replace(/\D/g, "");
	for (var n = value.length - 1; n >= 0; n--) {
		var cDigit = value.charAt(n),
			  nDigit = parseInt(cDigit, 10);
		if (bEven) {
			if ((nDigit *= 2) > 9) nDigit -= 9;
		}
		nCheck += nDigit;
		bEven = !bEven;
	}
	return (nCheck % 10) == 0;
}


// function which sets the form to invalid
function invalidForm() {
	$(".shirt legend p").remove();
	$("label[for='name']").text("Name: (Please provide your name)").css("color", "red");
	$("label[for='mail']").text("Email: (Please provide a valid email address)").css("color", "red");
	$(".activities legend").css("color", "red");
	$("fieldset:last legend").css("color", "red");
	$("#credit-card label[for='cc-num']").css("color", "red");
	$("#credit-card label[for='zip']").css("color", "red");
	$("#credit-card label[for='cvv']").css("color", "red");
	$(".shirt legend").append("<p>Don't forget to pick a T-Shirt</p>");
	$(".shirt legend p").css("color", "red");
}



// checkboxes.change(function(){
// 	var timeArray = [
// 		[/Tuesday/, /Wednesday/],.addClass(".is-hidden")
// 		[/9am-12pm/, /1pm-4pm/]
// 	]
// 	var textString = new RegExp($(this).parent()['0'].innerHTML);


// 	setTime(timeArray, textString);

// 	var thisName = ($(this)['0'].name);
// 	console.log(thisName);


// 	arrayOfActivities.forEach(function(activity){

// 		// need to set the text string for the RegExp
		
// 		var textString2 = new RegExp(activity.innerHTML);

// 		var arrayName = activity.children['0'].name;
// 		if (getTime(timeArray, textString2) === "tuesdayAM" && tuesdayAM === true && thisName !== arrayName) {
// 			activity.children['0'].disabled = true;
// 		}
// 		if (getTime(timeArray, textString2) === "tuesdayPM" && tuesdayPM === true && thisName !== arrayName) {
// 			activity.children['0'].disabled = true;
// 		}

// 	});
// });


// // sets the boolean time value for later testing;
// var setTime = function(timeArray, textString) {
// 	for (var i = 0; i < timeArray.length; i++) {
// 		for (var j = 0; j < timeArray.length; j++){
// 			if (timeArray[0][0].test(textString) && timeArray[1][0].test(textString)) {tuesdayAM = true;}
// 			if (timeArray[0][1].test(textString) && timeArray[1][0].test(textString)) {wednesdayAM = true;}
// 			if (timeArray[0][0].test(textString) && timeArray[1][1].test(textString)) {tuesdayPM = true;}
// 			if (timeArray[0][1].test(textString) && timeArray[1][1].test(textString)) {wednesdayPM = true;}
// 		}
// 	}
// }

// var getTime = function(timeArray, textString){
// 	for (var i = 0; i < timeArray.length; i++) {
// 		for (var j = 0; j < timeArray.length; j++) {
// 			if (timeArray[0][0].test(textString) && timeArray[1][0].test(textString)) return "tuesdayAM";
// 			if (timeArray[0][1].test(textString) && timeArray[1][0].test(textString)) return "wednesdayAM";
// 			if (timeArray[0][0].test(textString) && timeArray[1][1].test(textString)) return "tuesdayPM";
// 			if (timeArray[0][1].test(textString) && timeArray[1][1].test(textString)) return "wednesdayPM";
// 		}
// 	}
// }
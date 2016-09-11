

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

var arrayOfActivities = $.makeArray($('.activities label'));

// global variables
	var tuesdayAM;
	var wednesdayAM;
	var tuesdayPM;
	var wednesdayPM;




checkboxes.change(function(){
	var timeArray = [
		[/Tuesday/, /Wednesday/],
		[/9am-12pm/, /1pm-4pm/]
	]
	var textString = new RegExp($(this).parent()['0'].innerHTML);





	setTime(timeArray, textString);

	var thisName = ($(this)['0'].name);
	console.log(thisName);


	arrayOfActivities.forEach(function(activity){

		// need to set the text string for the RegExp
		
		var textString2 = new RegExp(activity.innerHTML);

		var arrayName = activity.children['0'].name;
		if (getTime(timeArray, textString2) === "tuesdayAM" && tuesdayAM === true && thisName !== arrayName) {
			activity.children['0'].disabled = true;
		}
		if (getTime(timeArray, textString2) === "tuesdayPM" && tuesdayPM === true && thisName !== arrayName) {
			activity.children['0'].disabled = true;
		}

	});
});







// sets the boolean time value for later testing;
var setTime = function(timeArray, textString) {
	for (var i = 0; i < timeArray.length; i++) {
		for (var j = 0; j < timeArray.length; j++){
			if (timeArray[0][0].test(textString) && timeArray[1][0].test(textString)) {tuesdayAM = true;}
			if (timeArray[0][1].test(textString) && timeArray[1][0].test(textString)) {wednesdayAM = true;}
			if (timeArray[0][0].test(textString) && timeArray[1][1].test(textString)) {tuesdayPM = true;}
			if (timeArray[0][1].test(textString) && timeArray[1][1].test(textString)) {wednesdayPM = true;}
		}
	}
}

var getTime = function(timeArray, textString){
	for (var i = 0; i < timeArray.length; i++) {
		for (var j = 0; j < timeArray.length; j++) {
			if (timeArray[0][0].test(textString) && timeArray[1][0].test(textString)) return "tuesdayAM";
			if (timeArray[0][1].test(textString) && timeArray[1][0].test(textString)) return "wednesdayAM";
			if (timeArray[0][0].test(textString) && timeArray[1][1].test(textString)) return "tuesdayPM";
			if (timeArray[0][1].test(textString) && timeArray[1][1].test(textString)) return "wednesdayPM";
		}
	}
}
dojo.provide("foo.global.rules.ValidateAgeRule");
dojo.require("mojo.command.Behavior");

/*
    Class:foo.global.rules.ValidateAgeRule
    Author: Paul Ortchanian
    
    Note: Validates age
*/

dojo.declare("foo.global.rules.ValidateAgeRule", mojo.command.Behavior,
{
	execute: function(requestObj) {
		
		// Get invocation
		var theInvocation = requestObj.getInvocation();
	
		//Get form field value
		var f_age = $("#age")[0];
		
		// Check rule
		if (f_age.value != "") {
			// proceed
			theInvocation.proceed();
		}else{
			//error here
			alert('please fill in the form');
		}
	}
});

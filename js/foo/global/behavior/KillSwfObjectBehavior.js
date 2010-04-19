dojo.provide("foo.global.behavior.KillSwfObjectBehavior");
dojo.require("mojo.command.Behavior");

/*
    Class: foo.global.behavior.KillSwfObjectBehavior
    Author: Paul Ortchanian
    Notes: Kills SWF video on page
*/
dojo.declare("foo.global.behavior.KillSwfObjectBehavior", mojo.command.Behavior,
{
	execute: function(requestObj) {
		
		// Get params
		var params = requestObj.getParams();
		var target = $(params.target)[0];
		
		// Crete new null object
		var so = new SWFObject();	
		
		// write null flash object in element
		so.write(target);
		
		// ---------- Used for video player title ----
		
		// Get element where title has been set
		var title =  params.title;
		
		// remove title if defined on page
		if(title) $(title).empty();
		
		//publish a message on complete
		if(params.onComplete != undefined){
			mojo.Messaging.publish(params.onComplete);
		}

				
	}
	
});

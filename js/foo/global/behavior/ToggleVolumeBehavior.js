dojo.provide("foo.global.behavior.ToggleVolumeBehavior");
dojo.require("mojo.command.Behavior");

/*
    Class: foo.global.controller.ToggleVolumeBehavior
    Author: Paul Ortchanian
    
   	Behaviors for Toggle muting of video

*/

dojo.declare("foo.global.behavior.ToggleVolumeBehavior", mojo.command.Behavior, 
{
	execute: function(requestObj) {
		
		var params = requestObj.getParams();
		// Get element user clicked on
		var bol = params.bol;
		var video = $(params.video)[0];
				
		// toggle
		if(bol){
			video.volume += 0.25
		}else{
			video.volume -= 0.25
		}
  	}
});
dojo.provide("foo.global.behavior.TogglePlayBehavior");
dojo.require("mojo.command.Behavior");

/*
    Class: foo.global.controller.TogglePlayBehavior
    Author: Paul Ortchanian
    
   	Behaviors for Toggle play of video

*/

dojo.declare("foo.global.behavior.TogglePlayBehavior", mojo.command.Behavior, 
{
	execute: function(requestObj) {
		
		var params = requestObj.getParams()
		// Get element user clicked on
		var bol = params.bol;
		var video = $(params.video)[0];
		// toggle
		(bol)? video.play() : video.pause();
		
  	}
});
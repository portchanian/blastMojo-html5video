dojo.provide("foo.global.controller.VideoPlayaController");
dojo.require("mojo.controller.Controller");

/*
    Class: foo.global.controller.VideoPlayaController
    Author: Paul Ortchanian
    
   	Global Behaviors for HTML 5 Video Player

*/


dojo.declare("foo.global.controller.VideoPlayaController", mojo.controller.Controller, 
{
	addObservers: function() {
		
		// Video reference
		var htmlVideo = '#video-html';
		var nav = '#video-nav';
		
		// on init check for IE and embed the flash video player with appropritae params
		// on init remove the html 5 video navigation
		this.addObserver(this, "onInit", "DoNothing", function(context, caller) { 
			if($.browser.msie){
				// Hideo video controls
				 $(nav).empty();
				//add the Flash Video Embed controller
				var sampleApp = mojo.controller.Map.getInstance();
				sampleApp.mapController("foo.global.controller.VideoEmbedController");
			}
		});
		
		// HTML 5 Video player controls
		this.addObserver('#btn-play', "onclick", 'TogglePlay', function(context,caller){
			return {
				video:htmlVideo,
				bol:true
			};
		});
		
		this.addObserver('#btn-pause', "onclick", 'TogglePlay', function(context,caller){
			return {
				video:htmlVideo,
				bol:false
			};
		});
		
		this.addObserver('#btn-volume-up', "onclick", 'ToggleVolume', function(context,caller){
			return {
				video:htmlVideo,
				bol:true
			};
		});
		
		this.addObserver('#btn-volume-down', "onclick", 'ToggleVolume', function(context,caller){
			return {
				video:htmlVideo,
				bol:false
			};
		});
		
		this.addObserver('#btn-volume-mute', "onclick", 'ToggleMute', function(context,caller){
			return {
				video:htmlVideo,
				bol:true
			};
		});
		
		this.addObserver('#btn-volume-unmute', "onclick", 'ToggleMute', function(context,caller){
			return {
				video:htmlVideo,
				bol:false
			};
		});

	},
	addCommands: function() {
		// toggle Play/pause
		this.addCommand("TogglePlay", "foo.global.behavior.TogglePlayBehavior");
		// toggle Volume
		this.addCommand("ToggleVolume", "foo.global.behavior.ToggleVolumeBehavior");
		// toggle Mute/unmute
		this.addCommand("ToggleMute", "foo.global.behavior.ToggleMuteBehavior");
		// do Nothing
		this.addCommand("DoNothing", "foo.global.command.DWYWCommand");
		
	},
	addIntercepts: function() {
		
	}
});

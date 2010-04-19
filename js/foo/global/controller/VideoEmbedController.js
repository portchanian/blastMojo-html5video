dojo.provide("foo.global.controller.VideoEmbedController");
dojo.require("mojo.controller.Controller");

/*
    Class: foo.global.controller.VideoEmbedController
    Author: Paul Ortchanian

	Manager for the Video Player, embeds the video player on any div with the following markup
	
	<!--Flash fallback video -->
	<div id="video-flash"><a href src="video/centro-movie.mov"></a></video>
	
*/

dojo.declare("foo.global.controller.VideoEmbedController", mojo.controller.Controller, 
{
	addObservers: function() {
		
		// Video reference
		var flashVideo = '#video-flash';
		
		// 1. ---> Set video parameters in model key; these will initiate values inside video player swf
		var objVideoParams =  {
			src: $(flashVideo + ' a').attr('src'),		// video source url (from in page javascript variable)
			title: '',									// video title (optional)
			desc: '',									// description (optional) 
			status: 'paused', 							// Initially play or pause video playing|paused
			rotating: 'false' 							// 360 viewer is off
		};

		// 2. ---> Set values as model key and trigger event listener to embed flash
		var objSWFParams = {
			src:'swf/videoPlaya_640_480.swf', 		// swf src (from in page javascript variable)
			w: '640', 								// swf width
			h: '480' 								// swf height
		};
		
		// Add the flash to the page 
		this.addObserver(this, "onInit", "InitSwfObject", function(context, caller) { 
			return {
				elementId:flashVideo, 
				contentName: "video_flash",
				src: objSWFParams.src,
				wmode : "opaque", 
				basePath: "",
				width: objSWFParams.w, 
				height: objSWFParams.h, 
				version: "9.0.115", 
				defaultBackground: "#FFFFFF", 
				expressInstallSrc: "swf/expressinstall.swf",
				allowFullScreen: true,
				allowScriptAccess: 'sameDomain',
				flashvars : objVideoParams, // send objVideoParams model key object to swf
				params: {} 
			};
		});
		
	},
	addCommands: function() {
		
		// Place video player swf on stage
		this.addCommand("InitSwfObject", "foo.global.behavior.InitSwfObjectBehavior");
		// Kill swf on stage
		this.addCommand("KillSwfObject", "foo.global.behavior.KillSwfObjectBehavior");
		
	},
	addIntercepts: function() {
		
	}
});

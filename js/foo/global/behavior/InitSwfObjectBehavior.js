dojo.provide("foo.global.behavior.InitSwfObjectBehavior");
dojo.require("mojo.command.Behavior");

/*
    Class: foo.global.behavior.InitSwfObjectBehavior
    Author: Paul Ortchanian
    
    Instantiation of SWFObject v1.1 
         
    Assumptions: The parameters for the flash are passed through controller

    Notes: The flashvars object paramter is evaluated, looped through and a 
    number of variables are created and passed to the flash SWF.  Those variables
    are named respectively s1,s2,s3,....
     
*/

dojo.declare("foo.global.behavior.InitSwfObjectBehavior", mojo.command.Behavior, 
{
	execute: function(requestObj) {

		// Get params
		var params = requestObj.getParams();
		var target = $(params.elementId).get(0);
		
		var so = new SWFObject(params.src, params.contentName, params.width, params.height, params.version, params.defaultBackground);
		
		// The width must be > 214px and the height must be > 137px in order for Express Install to work.
		if (params.expressInstallSrc) {
			so.useExpressInstall(params.expressInstallSrc);
		}

		so.addVariable("userID", params.userID);
		so.addParam("base", params.basePath);
		so.addParam("scale", "exactfit");
		so.addParam("wmode", params.wmode);//opaque,"window" 
		so.addParam("allowFullScreen", params.allowFullScreen);
		so.addParam("allowScriptAccess", params.allowScriptAccess);

		if(params.flashvars != ''){
			// loop though and pass every flash variable in object as s1,s2,s3,...
			for (var i in params.flashvars) {
				so.addVariable(i, params.flashvars[i]);
			}
		}
		
		// write flash object
		so.write(target);
	
	}
});

dojo.provide("foo.global.command.DWYWCommand");
dojo.require("mojo.command.Command");

/*
    Class: foo.global.command.DWYWCommand
    Author: Arhtur Chang

	Do Whatever You Want Command
*/

dojo.declare("foo.global.command.DWYWCommand", mojo.command.Command, 
{
	execute: function(requestObj) {
		/* Do Whatever You Want Command
			This Command does absolutely nothing...
			It upsets the structure of mojo, but sometimes I just want it to load nothing, 
			so that I can write my javascript code.		
		*/
	}
});

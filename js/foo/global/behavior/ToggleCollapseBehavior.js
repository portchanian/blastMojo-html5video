dojo.provide("foo.global.behavior.ToggleCollapseBehavior");
dojo.require("mojo.command.Behavior");

/*
    Class: foo.global.controller.ToggleCollapseBehavior
    Author: Paul Ortchanian
    
   	Behaviors for Toggle

	HTML structure to use:

	<ul id="toggle-menu">
	  <li><a href="#">Sub menu heading</a>
	  <ul>
	    <li><a href="http://site.com/">Link</a></li>
	    <li><a href="http://site.com/">Link</a></li>
	    <li><a href="http://site.com/">Link</a></li>
	  </ul>
	  <li><a href="#">Sub menu heading</a>
	  <ul>
	    <li><a href="http://site.com/">Link</a></li>
	    <li><a href="http://site.com/">Link</a></li>
	    <li><a href="http://site.com/">Link</a></li>
	  </ul>
	  ...
	  ...
	</ul>

*/

dojo.declare("foo.global.behavior.ToggleCollapseBehavior", mojo.command.Behavior, 
{
	execute: function(requestObj) {
		// Get element user clicked on
		var btn = $(requestObj.callerObj);
		// Toggle element
		btn.next().slideToggle('normal');	
  	}
});
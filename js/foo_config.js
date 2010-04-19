dojo.registerModulePath("foo", "../foo");

dojo.require("mojo.controller.Map");
dojo.require("foo.SiteMap");

// Start up the application
var ctrlIniter = mojo.controller.Map.getInstance();
ctrlIniter.setSiteMap(foo.SiteMap);
ctrlIniter.mapControllers(window.location.href);


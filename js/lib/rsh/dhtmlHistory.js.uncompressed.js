/** An object that provides DHTML history, history data, and bookmarking
	for AJAX applications. */
var rsh = {};
rsh.dhtmlHistory = {

	_currentLocation:	null,	/** Our current hash location, without the "#" symbol. */
	_listener:			null,	/** Our history change listener. */
	_iframe:			null,	/** A hidden IFrame we use in Internet Explorer to detect history changes. */
	_ignoreChange:		null,	/** Indicates to the browser whether to ignore location changes. */
	_WAIT_TIME:			200,	/** The amount of time in milliseconds that we should wait between add requests. Firefox is okay with 200 ms, but Internet Explorer needs 400. */
	_currentWaitTime:	0,		/** The amount of time in milliseconds an add request has to wait in line before being run on a window.setTimeout. */
	_fireOnNewListener:	null,	/* init state variable for !IE browsers */
	_firstLoad:			true,	/* variable to define first page load, vs history.back load */
	_ieAtomicChange:	null,	/* variable to distinguish between scripted and native url changes in IE */
	_isIE:				((document.all && navigator.userAgent.toLowerCase().indexOf('msie')!=-1)?true:false),

	init:			function()
						{
							if (this._isIE == false) {return;}

							// if this is the first time this page has loaded...
							if (this._firstLoad)
							{
								this._fireOnNewListener = false;
								this._firstLoad = false;
							}
							// else if this is a fake onload event
							else
							{
								this._fireOnNewListener = true;
							}
						},

	addListener:		function(callback)
						{
							this._listener = callback;

							// if the page was just loaded and we should not ignore it, fire an event to our new listener now
							if (this._fireOnNewListener == true)
							{
								this._fireHistoryEvent(this._currentLocation);
								this._fireOnNewListener = false;
							}
						},

	add:				function(newLocation, historyData)
						{
							var self = this;
							var addImpl =	function()
											{
												// indicate that the current wait time is now less
												if (self._currentWaitTime > 0)
												self._currentWaitTime = self._currentWaitTime - self._WAIT_TIME;

												// remove any leading hash symbols on newLocation
												newLocation = self._removeHash(newLocation);

												// IE bug disallows history + id conflict
												if (document.getElementById(newLocation))
												{
													throw ("Exception: history path conflicts with page element #" + newLocation);
												}

												// indicate to the browser to ignore this upcoming location change
												self._ignoreChange = true;

												// indicate to IE that this is an atomic location change block
												this._ieAtomicChange = true;

												// save this as our current location
												self._currentLocation = newLocation;

												// change the browser location
												window.location.hash = newLocation;

												// change the hidden iframe's location if on IE
												if (self._isIE) {self._iframe.src = "/js/dist/blank.html?" + newLocation;}

												// end of atomic location change block for IE
												this._ieAtomicChange = false;
											};

							// now execute this add request after waiting a certain amount of time, so as to queue up requests
							window.setTimeout(addImpl, this._currentWaitTime);
							// indicate that the next request will have to wait for awhile
							this._currentWaitTime = this._currentWaitTime + this._WAIT_TIME;
						},

	/** Creates the DHTML history infrastructure. */
	create:				function()
						{
							// get our initial location
							var initialHash = this._getCurrentLocation();

							// save this as our current location
							this._currentLocation = initialHash;

							// add an unload listener for the page; this is
							// needed for Firefox 1.5+ because this browser caches all
							// dynamic updates to the page, which can break some of our
							// logic related to testing whether this is the first instance
							// a page has loaded or whether it is being pulled from the cache
							var self = this;
							window.onunload = function() {self._firstLoad = null;};

							// determine if this is our first page load;
							// for Internet Explorer, we do this in
							// this._iframeLoaded(), which is fired on
							// page load. We do it there because
							// we have no historyStorage at this point
							// in IE, which only exists after the page
							// is finished loading for that browser

							// write out a hidden iframe for IE and set the amount of time to wait between add() requests
							if (this._isIE)
							{
								document.write("<iframe style='border: 0px; width: 1px; height: 1px; position: absolute; bottom: 0px; right: 0px; visibility: visible;' name='DhtmlHistoryFrame' id='DhtmlHistoryFrame' src='/js/dist/blank.html?" + initialHash + "'></iframe>");
								this._WAIT_TIME = 400;
								// the iframe will get loaded on page load, and we want to ignore this fact
								this._ignoreChange = true;
								this._iframe = document.getElementById("DhtmlHistoryFrame");
							}
							else
							{
								if (this._firstLoad)
								{
									this._ignoreChange = true;
									this._firstLoad = false;
								}
								else
								{
									this._ignoreChange = false;
									this._fireOnNewListener = true;
								}
							}

							//run a blind interval as history change "detection"
							var self = this;
							var locationHandler = function() {self._checkLocation();};
							setInterval(locationHandler, 100);
						},

	_getCurrentLocation:function()
						{
							return this._removeHash(window.location.hash);
						},

	/** Notify the listener of new history changes. */
	_fireHistoryEvent:	function(newHash)
						{
							// call our listener
							//this._listener.call(null, newHash, historyData);
						},

	/** Sees if the browsers has changed location.  This is the primary^h _only_ history mechanism */
	_checkLocation:		function()
						{
							// ignore any location changes that we made ourselves for browsers other than Internet Explorer
							if (!this._isIE)
							{
								if (this._ignoreChange) {
									this._ignoreChange = false;
									return;
								}

								// if we are dealing with Internet Explorer and we are in the middle of making a location change from an iframe, ignore it
								if (this._ieAtomicChange) {return;}
							}

							if (document.title.indexOf("#") > 0) {
								document.title = document.title.substring(0, document.title.indexOf("#"));
							}
							// get hash location
							var hash = this._getCurrentLocation();

							// see if there has been a change
							if (hash == this._currentLocation) {return;}

							this._ieAtomicChange = true;

							if (this._isIE) {
								/* compare iframe and document locations to detect manual url changes */
								this._iframe.src = "/js/dist/blank.html?" + hash;
							}

							// save this new location
							this._currentLocation = hash;

							this._ieAtomicChange = false;

							// notify listeners of the change
							this._fireHistoryEvent(hash);
						},

	/** Gets the current location of the hidden IFrames that is stored as history. For Internet Explorer. */
	_getIFrameHash:		function()
						{
							// get the new location
							var historyFrame = document.getElementById("DhtmlHistoryFrame");
							var doc = historyFrame.contentWindow.document;
							var hash = new String(doc.location.search);
							if (hash.length >0 && hash.charAt(0) == "?") {hash = hash.substring(1);}

							return hash;
						},

	/** Removes any leading hash that might be on a location. */
	_removeHash:		function(hashValue)
						{
							if (!hashValue) {return null;}
							else if (hashValue.length > 0 && hashValue.charAt(0) == "#") {return hashValue.substring(1);}
							else {return hashValue;}
						},

	/** For IE, says when the hidden iframe has finished loading - this is only actually called from blank.htm */
	_iframeLoaded:		function(newLocation)
						{
							// ignore any location changes that we made ourselves
							if (this._ignoreChange == true) {
								this._ignoreChange = false;
								return;
							}

							// get the new location
							var hash = new String(newLocation.search);
							if (hash.length >0 && hash.charAt(0) == "?") {hash = hash.substring(1);}

							// move to this location in the browser location bar if we are not dealing with a page load event
							if (this.pageLoadEvent != true) {window.location.hash = hash;}

							// notify listeners of the change
							this._fireHistoryEvent(hash);
						}
};

/** Initialize all of our objects now. */
rsh.dhtmlHistory.create();

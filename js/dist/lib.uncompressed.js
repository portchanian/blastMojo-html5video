/*!
 * The Mojo Framework
 *
 * Copyright (c) 2009, Blast Radius, Inc.
 * All rights reserved.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

/*
	Class: Behavior

	An abstract class used in implementing Mojo Behaviors. A Behavior is an object that encapsulates functionality for controlling and manipulating UI interaction/reaction.

	Example:
		(start code)
		dojo.provide("sample.behavior.ClearFormBehavior");
		dojo.require("mojo.command.Behavior");

		dojo.declare("sample.behavior.ClearFormBehavior", mojo.command.Behavior, 
		function() {
		},{
			execute: function(requestObj) {
				var inputs = mojo.query("input", this.getRequest().getContextElement());
				for (var i = 0, len = inputs.length; i < len; i++) {
					inputs[i].value = "";
				}
			}
		});
		(end)
*/
dojo.provide("mojo.command.Behavior");
dojo.declare("mojo.command.Behavior", null, 
{
	_requestObj: null,
	/*
		Function: getRequest
		
		Returns the mojo.controller.Request object passed into the Behavior.
			
		Returns:
			
			{object} Mojo Request Object
	*/
    getRequest: function() {
        if (!this._requestObj) {
			throw new Error("ERROR mojo.command.Behavior.getRequest - requestObj is not set");
		}
        return this._requestObj;
    },
    _execute: function(requestObj) {
        this._requestObj = requestObj;
        if (typeof(requestObj.update) == "function") {
            requestObj.update();

        }
	if (this._requestObj == null || (!this._requestObj)) {
		throw new Error("ERROR mojo.command.Behavior._execute - requestObj is not set");
	} else if (!(this._requestObj instanceof mojo.controller.Request)) {
		throw new Error("ERROR mojo.command.Behavior._execute - requestObj is not type of mojo.controller.Request");
	} else if (!this._requestObj.callerObj) {
		throw new Error("ERROR mojo.command.Behavior._execute - callerObj is not set");
	}

	if(!requestObj.getParams() && typeof(requestObj.getParams()) == "boolean") return;
	if (djConfig && djConfig.isDebug) {
		try {
			return this.execute(requestObj);
		} catch(ex) {
			console.debug("EXCEPTION: " + ex.message + " in mojo.command.Behavior.execute() for behavior: " + requestObj.getCommandName() + ", controller: " + requestObj.getControllerName());
		}
	} else {
		return this.execute(requestObj);
	}
    },
	/*
		Function: execute
		
		Abstract function that must be implemented in a concrete Behavior class. The Controller will automatically
		fire the execute() method when triggering a Behavior.

		Parameters:
			requestObj - {object}
			
		Example:
		
			(start code)
			dojo.declare("myapplication.command.toggleComponent", mojo.command.Behavior, 
			{
				execute: function(requestObj) {
					
					//In the UI, we have an anchor with the following markup--please note the *rel* attribute.
					//<a id='component1' rel='component1Content' href='view/component1'>
					//<div id='component1Content'>Lots of content goes here.</div>
		
					var targetEl = mojo.queryFirst("#" + requestObj.callerObj.getAttribute('rel')); //CSS selector for the ID

					//Now we have the reference to the content panel, so we can determine its state and toggle it accordingly.
					if(targetEl.style.display == 'none') {
						//Show it.
					} else {
						//Hide it.
					}
				}
			});
			(end)

	*/
    execute: function(requestObj) {
		throw new Error("ERROR mojo.command.Behavior.execute - execute() method is not implemented");
    }

});
/*
   Class: Command

	An abstract class used in implementing Mojo Commands. A Command is an object that encapsulates 
	functionality for processing data and/or business logic.
	
	Example:
		(start code)
		dojo.provide("sample.command.LoadHtmlCommand");
		dojo.require("mojo.command.Command");
		dojo.require("sample.service.Locator");

		dojo.declare("sample.command.LoadHtmlCommand", mojo.command.Command, 
		function() {
		},{
			execute: function(requestObj) {
				// invoke a service call to get some Html
				var locator = sample.service.Locator.getInstance();
				var service = locator.getService("getHtml")
				service.invoke(this.getRequest().getParams(), this);
			},
			onResponse: function(data) {
				// handle success response...
			},
			onError: function(error) {
				// handle error response...
			}
		});
		(end)
	
*/
dojo.provide("mojo.command.Command");
dojo.declare("mojo.command.Command", null, 
{
	_requestObj: null,
	/*
		Function: getRequest
		
		Returns the mojo.controller.Request object passed into the Command.
	
		Returns:
			{object} Mojo Request Object
			
		Example:
			(start code)
			//See above example implementation.
			(end)	
			
		
	*/
	getRequest: function() {
		if (!this._requestObj) {
			throw new Error("ERROR mojo.command.Command.getRequest - requestObj is not set");
		}
		return this._requestObj;
	},
	_execute: function(requestObj) {
		this._requestObj = requestObj;
		if (typeof(requestObj.update) == "function") {
			requestObj.update();
		}
		if (this._requestObj == null || (!this._requestObj)) {
			throw new Error("ERROR mojo.command.Command._execute - requestObj is not set");
		} else if (!(this._requestObj instanceof mojo.controller.Request)) {
			throw new Error("ERROR mojo.command.Command._execute - requestObj is not type of mojo.controller.Request");
		}
		
		if(!requestObj.getParams() && typeof(requestObj.getParams()) == "boolean") return;
		if (djConfig && djConfig.isDebug) {
			try {
				return this.execute(requestObj);
			} catch(ex) {
				console.debug("EXCEPTION: " + ex.message + " in mojo.command.Command.execute() for command: " + requestObj.getCommandName() + ", controller: " + requestObj.getControllerName());
			}
		} else {
			return this.execute(requestObj);
		}
	},
	/*
		Function: execute
		
		Abstract function that must be implemented in a concrete Command class. The Controller will automatically 
		fire the execute() method when triggering a Command.
		
		Parameters:
			requestObj - {object}
			
		Example:
			(start code)
			//See above example implementation.
			(end)
	*/	
	execute: function(requestObj) {
		throw new Error("ERROR mojo.command.Command.execute - execute() method is not implemented");
	},
	/*
		Function: onResponse
		
		Abstract function that must be implemented in a concrete Command class. Used to handle the data from a successful response.
		
		Parameters:
			data - {object} 
		
		Exmaple:
			(start code)
			// see above for sample implementation usage.
			(end)
			
	*/	
	onResponse: function(data) {
		throw new Error("ERROR mojo.command.Command.onResponse - onResponse() method is not implemented");
	},
	/*
		Function: onError
		
		Abstract function that must be implemented in a concrete Command class. Used to handle errors from an error response.
		
		Parameters:
			error - {object}
			
		Example:
			(start code)
			//See above example implementation.
			(end)
	*/	
	onError: function(error) {
		throw new Error("ERROR mojo.command.Command.onError - onError() method is not implemented");
	}
});
/*
	Class: Rule
   
	An abstract class used in implementing Mojo Rule. A Rule is an object used for encapsulating a conditional statement.
	
	Example:
		(start code)
		dojo.provide("sample.rule.MinimumAgeRule");
		dojo.require("mojo.command.Rule");

		dojo.declare("sample.rule.MinimumAgeRule", mojo.command.Rule, 
		function() {
		},{
			condition: function(requestObj) {
				var minimumAge = 18;
				if (this.getRequest().getParams().age >= minimumAge) {
					return true;
				}
				return false;
			}
		});
		
		(end)
*/
dojo.provide("mojo.command.Rule");
dojo.declare("mojo.command.Rule", null, 
{
	_requestObj: null,
	/*
		Function: getRequest
		
		Returns the mojo.controller.Request object passed into the Rule.
	
		Returns:
			{object} Mojo Request Object
	*/
	getRequest: function() {
		if (!this._requestObj) {
			throw new Error("ERROR mojo.command.Rule.getRequest -requestObj is not set");
		}
		return this._requestObj;
	},
	_execute: function(requestObj) {
		this._requestObj = requestObj;
		if (typeof(requestObj.update) == "function") {
			requestObj.update();
		}
		if (this._requestObj == null || (!this._requestObj)) {
			throw new Error("ERROR mojo.command.Rule._execute - requestObj is not set");
		} else if (!(this._requestObj instanceof mojo.controller.Request)) {
			throw new Error("ERROR mojo.command.Rule._execute - requestObj is not type of mojo.controller.Request");
		} else if (!this._requestObj.callerObj) {
			throw new Error("ERROR mojo.command.Rule._execute - callerObj is not set");
		} else if (!this._requestObj.invocation) {
			throw new Error("ERROR mojo.command.Rule._execute - invocation is not set");
		}

		if (djConfig && djConfig.isDebug) {
			try {
				if(this.execute(requestObj)) return true;
				return false;
			} catch(ex) {
				console.debug("EXCEPTION: " + ex.message + " in mojo.command.Rule.execute() for rule: " + requestObj.getCommandName() + ", controller: " + requestObj.getControllerName());
			}
		} else {
			if(this.execute(requestObj)) return true;
			return false;
		}

    	try {

    	} catch (ex) {
			//throw new Error("ERRPR mojo.command.Rule._execute invoke the exe")
    	//	throw new Error("EXCEPTION: " + ex.message + " in mojo.command.Rule.execute() for command: " + requestObj.commandName + ", controller: " + requestObj.controllerName);
    	}
	},
	
	/*
		Function: execute
		
		Abstract function that must be implemented in a concrete Rule class.
		
		Parameters: 
			requestObj - {object}
		
		Example:
			(start code)
			//See above for sample implementation usage.
			(end)
					 
	*/
	execute: function(requestObj) {
		if (this.condition(requestObj)) {
			return requestObj.invocation.proceed();
		}
	},
	/*
		Function: condition
		
		Abstract function that must be implemented in a concrete Rule class. The Controller will automatically 
		fire the condition() method when triggering a Rule. If a rule passes as true, the intercepted Command 
		will automatically be fired.
		
		Parameters: 
			requestObj - {object}
			
		Example:
			(start code)
			//See above for sample implementation usage.
			(end)
	*/
	condition: function(requestObj) {
		throw new Error("ERROR mojo.command.Rule.condition - condition() method is not implemented");
	}
});

/*
	Class: Controller
 	
	An abstract class used in implementing Mojo Controllers. A Controller is an object that encapsulates 
	all event handling, Command managing and dispatching and intercepting in a Mojo application.
	
	Example:
		(start code)
		dojo.provide("sample.controller.ProfileController");
		dojo.require("mojo.controller.Controller");

		dojo.declare("sample.controller.ProfileController", mojo.controller.Controller, 
		{
			addObservers: function() {
				this.addObserver(this, "onInit", "GetProfile");
				// add more observers ...
			},
			addCommands: function() {
				this.addCommand("GetProfile", "sampleApplication.command.profile.GetProfileCommand");
				// add more commands ...
			},
			addIntercepts: function() {
				// add more intercepts ...
			}
		});
		(end)

*/
dojo.provide("mojo.controller.Controller");
dojo.declare("mojo.controller.Controller", null, 
{
  constructor: function(contextElementObj, params) {
  	this._init(contextElementObj, params);
  }, 
	_contextElementObj: null,
	_commands: new Array(),
	_connectHandles: new Array(),
	_queryCache: new Object(),
	_observers: new Object(),
	_tags: new Array(),
	_init: function(contextElementObj, params) {
		if (this.params) {
			// clone params object
			var cloneParams = {};
			cloneParams.onChange = function() {};
			// get base params first if inheriting a controller
			var baseParams = this._getBaseProperty("params");
			for (var paramName in baseParams) {
				if (typeof baseParams[paramName] == "object") {
					var param = baseParams[paramName];
					// create new mojo.controller.Param instance
					cloneParams[paramName] = new mojo.controller.Param(paramName, dojo.clone(param.defaultValue), param.required, param.type, cloneParams);
					// set value of parameter being passed in
					if (params) {
						cloneParams[paramName].setValue(params[paramName]);
					}
				}
			}
			for (var paramName in this.params) {
				if (typeof this.params[paramName] == "object") {
					var param = this.params[paramName];
					// create new mojo.controller.Param instance
					cloneParams[paramName] = new mojo.controller.Param(paramName, dojo.clone(param.defaultValue), param.required, param.type, cloneParams);
					// set value of parameter being passed in
					if (params) {
						cloneParams[paramName].setValue(params[paramName]);
					}
				}
			}
			this.params = cloneParams;
			cloneParams = null;
			params = null;
		}
		this._contextElementObj = null;
		if (contextElementObj) {
			this._contextElementObj = contextElementObj;
		}
		this._commands = new Array();
		this._tags = new Array();
		this._connectHandles = new Array();
		this._callBaseMethod("addCommands")
		this.addCommands();
		this._addObservers();
		this._callBaseMethod("addIntercepts")
		this.addIntercepts();
		this.onInit();
		if (this.params) {
			for (var paramName in this.params) {
				if (typeof this.params[paramName] == "object") {
					var param = this.params[paramName];
					if (param.getValue() != null) {
						param.onChange();
					}
				}
			}
		}
		mojo.Messaging.subscribe("/mojo/controller/" + this.declaredClass + "/addObservers", this, "_addObservers");
		mojo.Messaging.subscribe("/mojo/controller/addObservers", this, "_addObservers");
	},
	/*
		Function: getConfig
		
		Returns the specified configuration object.
		
		Parameters:
			configName - {string}
			
		Returns:
			{object} configObj
	*/
	getConfig: function(configName) {
		configName = configName.toLowerCase();
		switch(configName) {
			case "params":
				return this[configName];
				break;
		}
		return null;
	},
	/*
		Function: getValue
		
		Returns the value of the specified parameter.
		
		Parameters:
			paramName - {string}
			
		Returns:
			{object} value
	*/
	getValue: function(paramName) {
		return this.params[paramName].getValue();
	},
	/*
		Function: setValue
		
		Sets the value of the specified parameter.
		
		Parameters:
			paramName - {string}
			value - {object}
	*/
	setValue: function(paramName, value) {
		this.params[paramName].setValue(value);
	},
	/*
		Function: getContextController
		
		Returns a Controller instance that is in the same context as the current Controller.
		
		Parameters:
			controllerName - {string}

		Returns:
			{mojo.controller.Controller} contextControllerObj
	*/
	getContextController: function(controllerName) {
		if (this.getContextElement() && this.getContextElement().mojoControllers[controllerName]) {
			return this.getContextElement().mojoControllers[controllerName];
		}
		return null;
	},
	_getBaseProperty: function(propertyName) {
		var superclass = eval(this.declaredClass + ".superclass");
		if (superclass.declaredClass != "mojo.controller.Controller" && superclass[propertyName]) {
			return superclass[propertyName];
		}
		return null;
	},
	_callBaseMethod: function(methodName) {
		var method = this._getBaseProperty(methodName);
		if (method) method.call(this);
	},
	/*
		Function: getContextElement
		
		Returns the DOM context of the Controller.
		
		Returns:
			{DOMElement} contextElementObj
	*/
	getContextElement: function() {
		if(!this._contextElementObj) {
			return null;
		}
		return this._contextElementObj;
	},
	/*
		Event: onInit
		
		This event fires when the Controller is first initialized.
	*/
	onInit: function() {},
	_addObservers: function() {
		this._queryCache = new Object();
		this._observers = new Object();
		this._callBaseMethod("addObservers")
		this.addObservers();
		// add batch of observers
		for (var key in this._queryCache) {
			if (this._queryCache[key]["length"]) {
				for (var func in this._observers[key]) {
					if (this._observers[key][func]["length"]) {
						var queryCacheLength = this._queryCache[key].length;
						for (var i = 0; i < queryCacheLength; i++) {
							this._addObserver(this._queryCache[key][i], func, this._observers[key][func]);
						}
					}
				}
			}
		}
		// purge cached queries
		this._queryCache = new Object();
		this._observers = new Object();
	},
	/*
		Function: addObservers
		
		Abstract function fired on instantiation of concrete implementation of Controller class. Used as container function for adding observers.
		
		Example:
			(start code)
			// see above for sample implementation usage
			(end)
	*/
	addObservers: function() {
		throw new Error("ERROR mojo.controller.Controller.addObservers - addObservers() method is not implemented");
		
	},
	/*
		Function: removeObserver
		
		Removes all observers associated with the Controller.
	*/
	removeObservers: function() { 
		var connectHandlesLength = this._connectHandles.length;
		for (var i = 0; i < connectHandlesLength; i++) {
			dojo.disconnect(this._connectHandles[i]);
		}
	},
	/*
		Function: addObserver
		
		Defines and adds an observer to the Controller.
		
		Parameters:
			srcObj - {object} 
			srcFunc - {string} 
			cmdName - {string} 
			paramsObj - {object|function}
			
		Example:
			(start code)
			// observing an button, and firing a message onclick
			this.addObserver("#button", "onclick", "Messaging", function(context, caller) { return { 
				topic: "hello", message: {from: caller}
			}});
			
			(end)
	*/
	addObserver: function(srcObj, srcFunc, cmdName, paramsObj) {
		var isArrayOfStrings = function(srcObj) {
			if(!dojo.isArray(srcObj)) return false;

			for(var i = 0, len = srcObj.length; i < len; i++) {
				if(typeof(srcObj[i]) != 'string') return false;
			}
			return true;
		};
		
		if (!srcObj) {
			return;
		}
		if(!srcFunc) {
			throw new Error("ERROR mojo.controller.Controller.addObserver - srcFunc is not set");
		}
		
		if(typeof(srcFunc) != "string") {
			throw new Error("ERROR mojo.controller.Controller.addObserver - srcFunc is not type String");	
		}
		
		if(!cmdName) {
			throw new Error("ERROR mojo.controller.Controller.addObserver - cmdName is not set");
		}
		
		if(typeof(cmdName) != "string" && cmdName != null) {
			throw new Error("ERROR mojo.controller.Controller.addObserver - cmdName is not type String");
		}
		
		if (typeof(srcObj) == "string" || isArrayOfStrings(srcObj)) {
			if (!dojo.isArray(srcObj)) {
				srcObj = [srcObj];
			}
			for(var i = 0, len = srcObj.length; i < len; i++) {
				var tmpQuery = srcObj[i];
				// event delegation only works for events that bubble: onclick, onmouse*, onkey*, onmove*, etc.
				if (this.getContextElement() && srcFunc.match(/^onclick|onmouse|onkey|onmove/) != null) {
					// store css query for comparison later in event delegation
					this._addObserver(this.getContextElement(), srcFunc, [{cmdName: cmdName, paramsObj: paramsObj, eventDelegate: tmpQuery}]);
				} else {
					if (!this._queryCache[tmpQuery]) {
						// if string, treat as dom query
						this._queryCache[tmpQuery] = mojo.query(tmpQuery, this.getContextElement());
					}
					if (!this._observers[tmpQuery]) {
						this._observers[tmpQuery] = new Object();
					}
					if (!this._observers[tmpQuery][srcFunc]) {
						this._observers[tmpQuery][srcFunc] = new Array();
					}
					var obsLength = this._observers[tmpQuery][srcFunc].length;
					this._observers[tmpQuery][srcFunc][obsLength] = {cmdName: cmdName, paramsObj: paramsObj};
				}
			}
		} else {
			if (!dojo.isArray(srcObj)) {
				srcObj = [srcObj];
			}
			for (var i = 0, len = srcObj.length; i < len; i++) {
				this._addObserver(srcObj[i], srcFunc, [{cmdName: cmdName, paramsObj: paramsObj}]);
			}
			
		}
	
		if(!(this._commands[cmdName]) || this._commands[cmdName] == null) {
			throw new Error("ERROR mojo.controller.Controller.addObserver - cmdName does not reference a Command in the Controller");
		}
		
	},
	_addObserver: function(srcObj, srcFunc, cmds) {
		// create batch of un-added observers
		var observerBatch = new Array(); 
		var cmdsLength = cmds.length;
		for (var i = 0; i < cmdsLength; i++) {
			// normalize event delegate property, and use to properly differentiate tagged observers
			if (typeof(cmds[i].eventDelegate) == "undefined") {
				cmds[i].eventDelegate = "";
			}
			if (!this._observerIsTagged(srcObj, srcFunc + cmds[i].eventDelegate, cmds[i])) {
				observerBatch.push(cmds[i]);
				this._tagObserver(srcObj, srcFunc + cmds[i].eventDelegate, cmds[i]);
			}
		}
		
		if(!srcObj.mojoObservers) srcObj.mojoObservers = new Object();
		if(!srcObj.mojoObservers[srcFunc]) srcObj.mojoObservers[srcFunc.toLowerCase()] = new Array();
		
		if (observerBatch.length > 0) {		
			// add batch of observers
			var __this = this;
			var eventFunc = function(e) {
				var getEventTarget = function(e) {
					var e = e || window.event;
					var target = e.target || e.srcElement;
					if (target.nodeType == 3) { // defeat Safari bug
						target = target.parentNode;
					}
					return target;
				}
				if (__this.getContextElement() && __this.getContextElement().parentNode == null) {
					// if controller has been removed from view, remove all observers
					__this.removeObservers();
				} else {
					var observerBatchLength = observerBatch.length;
					for (var i = 0; i < observerBatchLength; i++) {
						if(typeof(mojo) != "undefined") {
							var callerObj = srcObj;
							if (observerBatch[i].eventDelegate.length > 0) {
								// compare stored css query against event target. Fire commands only if target matches
								var target = getEventTarget(e);
								callerObj = mojo.queryMatch(target, observerBatch[i].eventDelegate, __this.getContextElement(), true);
							}
							if (callerObj != null) {
								var requestObj = __this._setRequest(observerBatch[i].paramsObj, callerObj, e, observerBatch[i].cmdName);
								__this.fireCommandChain(observerBatch[i].cmdName, requestObj);
							}
						}
					}
				}
			};
			
			var lowercasedSrcFunc = srcFunc.toLowerCase();
			if((lowercasedSrcFunc == 'onmouseleave' || lowercasedSrcFunc == 'onmouseenter') && MooTools && Element.Events.mouseleave && Element.Events.mouseenter) {
			  $(srcObj).addEvent(srcFunc.replace('on',''), eventFunc);
			} else {
			  var handle = dojo.connect(srcObj, srcFunc, eventFunc);
			  // store connection handle needed disconnect event handler
			  this._connectHandles.push(handle);
			}
			srcObj.mojoObservers[srcFunc.toLowerCase()].push(eventFunc);
		}
	},
	_tagObserver: function(srcObj, srcFunc, cmd) {
		if (!srcObj.mojoObserve) {
			srcObj.mojoObserve = new Object();
		}
		if (typeof srcObj.mojoObserve[this.declaredClass] == "undefined") {
			var tagsLength = this._tags.length;
			srcObj.mojoObserve[this.declaredClass] = tagsLength;
			this._tags[tagsLength] = new Object();
		}
		var tagIndex = srcObj.mojoObserve[this.declaredClass];
		var tagKey = this._generateTagKey(srcFunc, cmd);
		if (this._tags[tagIndex] && !this._tags[tagIndex][tagKey]) {
			this._tags[tagIndex][tagKey] = true;
		}
	},
	_generateTagKey: function(srcFunc, cmd) {
		var tagKey = srcFunc + "_" + cmd.cmdName;
		if (cmd.paramsObj) {
			var serializeRequest;
			if (typeof(cmd.paramsObj) == "function") {
				serializeRequest = cmd.paramsObj.toString();
			} else if (typeof(cmd.paramsObj) == "object") {
				for (var key in cmd.paramsObj) {
				    if (cmd.paramsObj[key]) {
					    serializeRequest += key + ":" + cmd.paramsObj[key].toString() + ",";
					}
				}
			}
			tagKey += "_" + serializeRequest;
		 }
		return tagKey;
	},
  	_observerIsTagged: function(srcObj, srcFunc, cmd) {
		if (!srcObj.mojoObserve) {
			srcObj.mojoObserve = new Object();
		}
		var isTagged = false;
		var tagKey = this._generateTagKey(srcFunc, cmd);
		if (typeof srcObj.mojoObserve[this.declaredClass] != "undefined" && this._tags[srcObj.mojoObserve[this.declaredClass]] && this._tags[srcObj.mojoObserve[this.declaredClass]][tagKey]) {
			isTagged = true;
		}
		return isTagged;
	},
	/*
		Function: addCommands
		
		Abstract function fired on instantiation of concrete implementation of Controller class. Used as container function for adding commands.

		Parameters:
			cmdName - {string}
			cmdObjPath - {string}
			
		Example:
			(start code)
			//See above for sample implementation usage.
			(end)
	*/
	addCommands: function() {
		throw new Error("ERROR mojo.controller.Controller.addCommands - addCommands() method is not implemented");
	},
	/*
		Function: addCommand
		
		Adds a command object to a Controller�s command registry. Commands are referenced via a reference name.
 		A single name can be associated with multiple Commands.
		
		Parameters:
			cmdName - {string}
			cmdObjPath - {string}
	*/
	addCommand: function(cmdName, cmdObjPath) {
		if(!cmdName) {
			throw new Error('ERROR mojo.controller.Controller.addCommand - cmdName is not set');
		}
		
		if(typeof(cmdName) != "string") {
			throw new Error('ERROR mojo.controller.Controller.addCommand - cmdName is not type String');
		}
		
		if(!cmdObjPath) {
			throw new Error('ERROR mojo.controller.Controller.addCommand - cmdObjPath is not set');
		}
		
		if(typeof(cmdObjPath) != "string") {
			throw new Error('ERROR mojo.controller.Controller.addCommand - cmdObjPath is not type String');
		}
	
		if (!this._commands[cmdName]) {
			this._commands[cmdName] = new Array();
		}
		var addFunc = function(cmdName, cmdObjPath, thisObj) {
			// import the command
			dojo.require(cmdObjPath);
			// instantiate command
			var cmdObj = eval("new " + cmdObjPath + "()");
			if( (cmdObj instanceof mojo.command.Command) || (cmdObj instanceof mojo.command.Rule || (cmdObj instanceof mojo.command.Behavior) ) ) {
				thisObj._commands[cmdName].push(cmdObj);
			} else {
				throw new Error('ERROR mojo.controller.Controller.addCommand - Command object is not type mojo.command.Command or mojo.command.Behavior or mojo.command.Rule');
			}
		};
		addFunc(cmdName, cmdObjPath, this);
		
	},
	/*
		Function: getCommand
		
		Retrieves the first command associated with the reference name.
		
		Parameters:
			cmdName - {string}
			
		Returns:
			{string} Command Name
			
		Example:
			(start code)
			// observing a function in a Command
			this.addObserver(this.getCommand("GetProfile"), "onResponse", "ProfileCompleted");
			(end)
	*/
	getCommand: function(cmdName) {
		if(!cmdName) {
			throw new Error("ERROR mojo.controller.Controller.getCommand - cmdName is not set");
		}
		
		if(typeof(cmdName) != "string") {
			throw new Error('ERROR mojo.controller.Controller.getCommand - cmdName is not type String');
		}
		
		if (this._commands[cmdName]) {
			return this._commands[cmdName][0];
		} 
		
		throw new Error("ERROR mojo.controller.Controller.getCommand - cmdName does not reference a Command in the Controller");
	
	},
	/*
		Function: getCommandChain
		
		Retrieves a set of Mojo Command Objects based on a specified command name.
		
		Parameters:
			cmdName - {string}
		
		Returns:
			{object array} Array of Mojo Command Objects
	*/
	getCommandChain: function(cmdName) {
		
		if(!cmdName) {
			throw new Error("ERROR mojo.controller.Controller.getCommandChain - cmdName is not set");
		}
		
		if(typeof(cmdName) != "string") {
			throw new Error("ERROR mojo.controller.Controller.getCommandChain - cmdName is not type String");
		}
		
		if(!this._commands[cmdName]) {
			throw new Error("ERROR mojo.controller.Controller.getCommandChain - cmdName does not reference a Command in the Controller");
		}
		
		if (this._commands[cmdName]) {
			return this._commands[cmdName];
		} 
		return null;
	},
	/*
		Function: fireCommandChain
		
		Executes all Command instances associated with the command name.
	
		Parameters:
			cmdName - {string}
			requestObj - {mojo.controller.Request}						
	*/
	fireCommandChain: function(cmdName, requestObj) {
		var commandChainLength = this._commands[cmdName].length;
		for (var i = 0; i < commandChainLength; i++) {
			this._commands[cmdName][i]._execute(requestObj);
		}
	},
	/*
		Function: addIntercepts
		
		Abstract function fired on instantiation of concrete implementation of Controller class. Used as a container for adding intercepts.
	
		Parameters:
			interceptType - {string} Supports Intercepting "before|after|around".
			interceptCmdName - {string} The reference name of the Command to intercept.
			cmdName - {string} The reference name of the Command to inject when intercepting.
			paramsObj - {object|function} Optional parameters to send via the Command request.
			
		Example:
			(start code)
			// inside a controller implementation
			//...
			addIntercepts: function() {
				// intercept the UpdateProfile Command, and Validate it before it fires
				this.addIntercept("around", "UpdateProfile", "ValidateProfile", function() { return {
				formSet: mojo.queryFirst("#profile-form")
			}});
			//...

			(end)
			
	*/
	addIntercepts: function() {
		throw new Error("ERROR mojo.controller.Controller.addIntercepts - addIntercepts() method is not implemented");
	},
	/*
		Function: addIntercept
		
		Adds an intercept to inject a Command before, after or around another Command when it has been triggered.
		
		Parameters:
			interceptType - {string} Supports Intercepting "before|after|around".
			interceptCmdName - {string} The reference name of the Command to intercept.
			cmdName - {string} The reference name of the Command to inject when intercepting.
			paramsObj - {object|function} Optional parameters to send via the Command request.
		
		Example:
			(start code)
			// inside a controller implementation
			//...
			addIntercepts: function() {
				// intercept the UpdateProfile Command, and Validate it before it fires
				this.addIntercept("around", "UpdateProfile", "ValidateProfile", function() { return {
				formSet: mojo.queryFirst("#profile-form")
			}});
			//..
			(end)
		
	*/
	addIntercept: function(interceptType, interceptCmdName, cmdName, paramsObj) {

		if(!interceptType) {
			throw new Error('ERROR mojo.controller.Controller.addIntercept - interceptType is not set');
		}
		
		if(typeof(interceptType) != "string") {
			throw new Error('ERROR mojo.controller.Controller.addIntercept - interceptType is not type String');
		}
		
		if(interceptType == "before" || interceptType == "after" || interceptType == "around") {
			//Pass
		} else {
			//If we don't have valid intercept types, throw the error.
			throw new Error('ERROR mojo.controller.Controller.addIntercept - interceptType is not "before", "after", or "around"');
		}
		
		if(!interceptCmdName) {
			throw new Error('ERROR mojo.controller.Controller.addIntercept - interceptCmdName is not set');
		}
		
		if(typeof(interceptCmdName) != "string") {
			throw new Error('ERROR mojo.controller.Controller.addIntercept - interceptCmdName is not type String');
		}
		
		
		if(!cmdName) {
			throw new Error('ERROR mojo.controller.Controller.addIntercept - cmdName is not set');
		}
		
		if(typeof(cmdName) != "string") {
			throw new Error('ERROR mojo.controller.Controller.addIntercept - cmdName is not type String');
		}

		if(interceptCmdName.toString() == cmdName.toString()) {
			throw new Error('ERROR mojo.controller.Controller.addIntercept - a command cannot add advice to itself');
		}
		
		if(!this._commands[interceptCmdName]) {
			throw new Error('ERROR mojo.controller.Controller.addIntercept - interceptCmdName does not reference a Command in the Controller');
		}
		
		if(!this._commands[cmdName]) {
			throw new Error('ERROR mojo.controller.Controller.addIntercept - cmdName does not reference a Command in the Controller');
		}
		



		var __this = this;
		var originalFunc = this.getCommand(interceptCmdName)["_execute"];
		var interceptFunc = function(invocation) {
			if(typeof(mojo) != "undefined") {
				requestObj = __this._setRequest(paramsObj, invocation.args[0].callerObj, invocation.args[0].eventObj, cmdName, invocation);
				__this.fireCommandChain(cmdName, requestObj);
			}
		};
		switch(interceptType) {
			case "before":
				this._commands[interceptCmdName][0]["_execute"] = function() {
					var invocation = {args: arguments, calleeObj: this};
					interceptFunc.apply(this, [invocation]);
					return originalFunc.apply(this, arguments);
				};
				break;
			case "after":
				this._commands[interceptCmdName][0]["_execute"] = function() {
					var invocation = {args: arguments, calleeObj: this};
					originalFunc.apply(this, arguments);
					return interceptFunc.apply(this, [invocation]);
				};
				break;
			case "around":
				this._commands[interceptCmdName][0]["_execute"] = function() {
					var invocation = {args: arguments, calleeObj: this};
					invocation.proceed = function() {
						return originalFunc.apply(this.calleeObj, this.args);
					};
					return interceptFunc.apply(this, [invocation]);
				};
				break;
		}		
	
	},
	_setRequest: function(paramsObj, callerObj, eventObj, cmdName, invocation) {
    		var requestObj = new mojo.controller.Request(paramsObj, callerObj, eventObj, cmdName, this, invocation);
		return requestObj;
	}
});
/*
	Function: updateObservers
	
	Static function. Re-adds all observers for a particular Controller. If no Controller is specified, all Controllers in application are updated.
	
	Parameters:
		controllerName - {string} (optional)
		
	Example:
		(start code)
		// update all observers for all controllers
		mojo.controller.Controller.updateObservers();
		
		(end)
*/
mojo.controller.Controller.updateObservers = function(controllerName) {
	if (controllerName) {
		mojo.Messaging.publish("/mojo/controller/" + controllerName + "/addObservers");
	} else {
		mojo.Messaging.publish("/mojo/controller/addObservers");
	}
};
/*
	Class: Map
   
	Singleton class for mapping Controllers to pages and/or DOM elements.

	Example:
		(start code)
		// sample JSON sitemap
		sample.SiteMap = [
			{pattern: "#menu-navigation",
			controllers: [
				{controller: "sample.controller.MenuController", params: {selected: 0}}
			]},
			{pattern: "home.htm",
			controllers: [
				{controller: "sample.controller.HomeController"}
			]}
		]
		// map controllers to Mojo application
		var sampleApp = mojo.controller.Map.getInstance();
		sampleApp.setSiteMap(sample.SiteMap);
		sampleApp.mapControllers(window.location.href);	
		(end)
*/
dojo.provide("mojo.controller.Map");
__mojoControllerMap = null;
dojo.declare("mojo.controller.Map", null, 
{
	
	
	/*
		Event: onComplete
		
		This event fires when the mapping of controllers completes. 
		
	*/
	onComplete: function() {},
	/*
		Constructor: constructor
		
		Creates an instance of the mojo.controller.Map class.
	*/
  	constructor: function() {
  		mojo.Messaging.subscribe("/mojo/controller/mapControllers", this, "mapControllers");
  	},
	_controllers: new Array(),
	_siteMap: null,
	/*
		Function: getSiteMap
		
		Retrieves the JSON sitemap associated with the application.
		
		Returns:
			{object} siteMapObj
			
		Example:
			(start code)
			// get instance of mojo.controller.Map
			var map = mojo.controller.Map.getInstance();
			var sitemap = map.getSiteMap();
			(end)
	*/
	getSiteMap: function() {
		if (!this._siteMap)
			throw new Error('ERROR mojo.controller.Map - siteMap not set');
			
		return this._siteMap;
	},
	/*
		Function: setSiteMap
		
		Sets the JSON sitemap for the application.
		
		Parameters:
			siteMapObj - {object}
			
		Example:
			(start code)
			//See above for sample implementation usage.
			(end)
	*/
	setSiteMap: function(siteMapObj) {
		if(siteMapObj == null || typeof siteMapObj == 'undefined')
		  throw new Error("ERROR mojo.controller.Map.setSiteMap - siteMapObj parameter is required");
		
	  	var failSiteMapObjValidation = function() {
			throw new Error('ERROR mojo.controller.Map.setSiteMap - siteMapObj parameter must consist of patterns in the format {pattern: "pattern", controllers: [{controller: "controller.path"}]}');
		};
		if (!dojo.isArray(siteMapObj)) failSiteMapObjValidation();
		for (var i = 0, len = siteMapObj.length; i < len; i++) {
			var patternObj = siteMapObj[i];
			if (typeof patternObj.pattern == "undefined" || patternObj.pattern == null) failSiteMapObjValidation();
			if(!dojo.isArray(patternObj.controllers)) failSiteMapObjValidation();
			for(var j = 0, len = patternObj.controllers.length; j < len; j++) {
				if(typeof patternObj.controllers[j].controller == 'undefined' || !dojo.isString(patternObj.controllers[j].controller) || patternObj.controllers[j].controller == '') failSiteMapObjValidation();
			}
		}
		
		for(pattern in siteMapObj) {

		}
		
  	this._siteMap = siteMapObj;
	},
	/*
		Function: mapControllers
		
		Traverses the associated SiteMap configuration, and maps Controllers to pages and/or DOM elements.
		
		Parameters:
			mapContextObj - {string | object} (optional)
			
		Example:
			(start code)
			//See above for sample implementation usage.
			(end)
	*/
	mapControllers: function(mapContextObj) {
		var siteMap = this.getSiteMap();
		var siteMapLength = siteMap.length;
		for (var i = 0; i < siteMapLength; i++) {
			var pattern = siteMap[i].pattern;
			if (typeof(pattern) == "string") {
				var contextElementList = [];
				if (mapContextObj && typeof(mapContextObj) == "object") {
					contextElementList = mojo.query(pattern, mapContextObj);
				} else {
					contextElementList = mojo.query(pattern);
				}
				var contextElementListLength = contextElementList.length;
				for (var j = 0; j < contextElementListLength; j++) {
					this._mapControllers(siteMap[i].controllers, contextElementList[j]);
				}
			} else if (typeof(pattern) == "function" || typeof(pattern) == "object") {
				if (mapContextObj && typeof(mapContextObj) == "string") {
					var regex = new RegExp(pattern);
					if (regex.test(mapContextObj)) {
						this._mapControllers(siteMap[i].controllers);
					}
				}
			} else {
				alert(pattern);
				throw new Error("ERROR mojo.controller.Map - siteMap contains invalid pattern");
			}
		}
		// call a function which can be hooked into once all the controllers have been mapped
  		this.onComplete();
	},
	_mapControllers: function(controllers, contextElementObj) {
		var controllersLength = controllers.length;
		for (var i = 0; i < controllersLength; i++) {
			var controllerName = controllers[i].controller;
			var controllerParams = controllers[i].params;
			// if in debug mode, catch and log exceptions. if in production mode, remove to improve runtime performance
			if (djConfig && djConfig.isDebug) {
				try {
					this.mapController(controllerName, contextElementObj, controllerParams);
				} catch(ex) {
					console.debug("EXCEPTION: " + ex.message + " in mojo.controller.Map.mapController() for controller: " + controllerName);
				}
			} else {
				this.mapController(controllerName, contextElementObj, controllerParams);
			}
		}
	},
	/*
		Function: mapController
		
		Initializes a controller, and associates it with a specified context.
		
		Parameters:
			controllerName - {string}
			contextElementObj - {DOMElement} (optional)
			
	*/
	mapController: function(controllerName, contextElementObj, controllerParams) {
		if(controllerName == null || typeof controllerName == 'undefined')
  	  	throw new Error('ERROR mojo.controller.Map.mapController - controllerName parameter is required');
  		if(!dojo.isString(controllerName) || controllerName == '')
  	  	throw new Error('ERROR mojo.controller.Map.mapController - controllerName parameter must be a non-empty string');

		// import the controller
		dojo.require(controllerName);
		if (contextElementObj) {		
			if (!contextElementObj.mojoControllers) {
				contextElementObj.mojoControllers = {};
			}
			if (!contextElementObj.mojoControllers[controllerName]) { // store controller in context object
				contextElementObj.mojoControllers[controllerName] = eval("new " + controllerName + "(contextElementObj, controllerParams)");
				if (!(contextElementObj.mojoControllers[controllerName] instanceof mojo.controller.Controller))
				  throw new Error('ERROR mojo.controller.Map.mapController - "'+controllerName+'" must be an instance of mojo.controller.Controller');
			}
		} else if (!this._controllers[controllerName]) { // store page-level controller in controller.Map
			this._controllers[controllerName] = eval("new " + controllerName + "(null, controllerParams)");
			if (!(this._controllers[controllerName] instanceof mojo.controller.Controller))
			  throw new Error('ERROR mojo.controller.Map.mapController - "'+controllerName+'" must be an instance of mojo.controller.Controller');
		}
	}
});

/*
	Function: mapControllers
	
	Static function. Re-maps controllers based on the associated SiteMap 
	
	Parameters:
		mapContextObj - {object} (optional)
		
	Example:
		(start code)
		// re-map controllers
		mojo.controller.Map.mapControllers();
		(end)
*/
mojo.controller.Map.mapControllers = function(mapContextObj) {
	mojo.Messaging.publish("/mojo/controller/mapControllers", [mapContextObj]);
};
/*
	Function: getInstance
	
	Static function. Returns the instance of the mojo.controller.Map singleton object
	
	Returns:
		{object} mojo.controller.Map object
		
	Example:
		(start code)
		// get instance of mojo.controller.Map
		var map = mojo.controller.Map.getInstance();
		(end)
*/
mojo.controller.Map.getInstance = function() {
	if (__mojoControllerMap == null) {
		__mojoControllerMap = new mojo.controller.Map();
	}
	return __mojoControllerMap;
};
/*
	Class: Param
	
	Class representation of a Controller Param instance. Param object provides methods for getting, setting, and validating parameters,
	as well as can be observed in a Controller.
	
*/
dojo.provide("mojo.controller.Param");
dojo.declare("mojo.controller.Param", null, 
{
	/*
		Function: constructor
		
		Creates an instance of the mojo.controller.Param class.
		
		Parameters:
			name - {string}
			defaultValue - {object}
			required -  {boolean}
			type - {type}
			paramsRootObj - {object}
	*/
	constructor: function(name, defaultValue, required, type, paramsRootObj) {
		this._value = null;
		this._defaultValue = null;
		this._params = null;
		this._type = null;
		
		this._name = name;
		this._defaultValue = defaultValue;
		if (type) this._type = type;
		if (paramsRootObj) this._params = paramsRootObj;
		this.setValue(this._defaultValue);
		if (typeof required == "boolean") this._required = required;
	},
	_name: null,
	_value: null,
	_defaultValue: null,
	_required: false,
	_type: null,
	_params: null,
	/*
		Function: getName
		
		Returns the name of the parameter.
		
		Returns:
			{string} name
	*/
	getName: function() {
		return this._name;
	},
	/*
		Function: getValue
		
		Returns the value of the parameter.
		
		Returns:
			{object} value
	*/
	getValue: function() {
		return this._value;
	},
	/*
		Function: setValue
		
		Sets the value of the parameter, and fires the onChange event if the value has changed.
		
		Parameters:
			value - {object}
	*/
	setValue: function(value) {
		var validate = mojo.helper.Validation.getInstance();
		var required = this.getRequired();
		var type = this.getType();
		// check required and type
		if (required && !validate.isRequired(value)) {
			throw new Error("ERROR mojo.controller.Param.setValue - value parameter is required")
		}
		// don't set to undefined
		if (typeof value == "undefined") {
			return;
		} 
		if (type && !validate.isType(value, {type: type})) {
			throw new Error("RROR mojo.controller.Param.setValue - value parameter is invalid type");
		}
		if (this.getValue() != value) {
			this._value = value;
			this.onChange();
			if (this._params != null && this._params["onChange"]) {
				this._params.onChange();
			}
		}
	},
	/*
		Function: getDefaultValue
		
		Returns the default value of the parameter.
		
		Returns:
			{object} value
	*/
	getDefaultValue: function() {
		return this._defaultValue;
	},
	/*
		Function: getRequired
		
		Returns whether or not the parameter is required.
		
		Returns:
			{boolean} required
	*/
	getRequired: function() {
		return this._required;
	},
	/*
		Function: getType
		
		Returns the data type of the parameter
		
		Returns:
			{type} type
	*/
	getType: function() {
		return this._type;
	},
	/*
		Event: onChange
		
		This event fires when the parameter value has changed.
	*/
	onChange: function() {
	}
});
/*
	Class: Request
	
	Class representation of a Controller Request instance. Encapsulates request-specific parameters, and 
	context-specific information, into an object; used in Mojo Command, Behavior, and Rule objects.
	
*/
dojo.provide("mojo.controller.Request");
dojo.declare("mojo.controller.Request", null, 
{
	/*
		Function: constructor
		
		Creates an instance of the mojo.controller.Request class.
		
		Parameters:
			paramsObj - {object}
			callerObj - {object}
			eventObj -  {event}
			commandName - {string}
			controllerObj - {mojo.controller.Controller}
			invocation - {object}
	*/
	constructor: function(paramsObj, callerObj, eventObj, commandName, controllerObj, invocation) {
		this._paramsFunc = null;
		this.paramsObj = null;
		this.callerObj = null;
		this.eventObj = null;
		this.commandName = null;
		this.controllerObj = null;
		this.invocation = null;
		if (typeof(paramsObj) == "function") {
			this.paramsObj = {};
			this._paramsFunc = paramsObj;
		} else if (typeof(paramsObj) == "object") {
			this.paramsObj = paramsObj;
		}

		if (callerObj == null || typeof callerObj == 'undefined') {
			throw new Error('ERROR mojo.controller.Request.constructor - callerObj is not set');
		} else {
			this.callerObj = callerObj;
		}
		this.eventObj = eventObj;
		if (commandName == null || typeof commandName == 'undefined') {
			throw new Error('ERROR mojo.controller.Request.constructor - commandName is not set');
		} else {
			if (typeof commandName != 'string') {
				throw new Error('ERROR mojo.controller.Request.constructor - commandName is not type String');
			} else {
				this.commandName = commandName;
			}
		}
		if (controllerObj == null || typeof controllerObj == 'undefined') {
			throw new Error('ERROR mojo.controller.Request.constructor - controllerObj is not set');
		} else {
			if (!(controllerObj instanceof mojo.controller.Controller)) {
				throw new Error('ERROR mojo.controller.Request.constructor - controllerObj is not type mojo.controller.Controller');
			} else {
				this.controllerObj = controllerObj;
			}
		}

		this.invocation = invocation;
	  },
	_paramsFunc: null,
	paramsObj: null,
	callerObj: null,
	eventObj: null,
	commandName: null,
	controllerObj: null,
	invocation: null,
	update: function() {
		if (this._paramsFunc && typeof(this._paramsFunc) == "function") {
			var latest = this._paramsFunc(this.getContextElement(), this.getCaller(), this.getController());
			for (var key in latest) {
				this.paramsObj[key] = latest[key];
			}
		}
	},
	/*
		Function: getParams
		
		Returns the object containing the set of parameter properties and values to be used by a Command.
		
		Returns:
			{object} paramsObj
			
		Example:
			(start code)
			// use requestObj passed into a Command
			var targetParam = requestObj.getParams().target;
			(end)
	*/
	getParams: function() {
		if (!this.paramsObj) {
			this.update();
		}
		return this.paramsObj;
	},
	/*
		Function: getCaller
		
		Returns the caller object that triggered the request.
		
		Returns:
			{object} callerObj
			
		Example:
			(start code)
			// use requestObj passed into a Command
			// check if object triggering request is a mojo.MessagingTopic
			if (requestObj.getCaller() instanceof mojo.MessagingTopic) {
				var msg = requestObj.getCaller().getMessage(); // get message
			}
			
			(end)
	*/
	getCaller: function() {
		return this.callerObj;
	},
	/*
		Function: getContextElement
		
		Returns the DOM context of the Controller which fired the request.
		
		Returns:
			{DOMElement} contextObj
		
		Example:
			(start code)
			// use requestObj passed into a Command
			// only do css queries within the context of the Controller
			var selectedList = mojo.query(".selected", requestObj.getContextElement());
			(end)
	*/
	getContextElement: function() {
		return this.getController().getContextElement();
	},
	/*
		Function: getEvent
		
		Returns the DOM event object triggered, if applicable.
		
		Returns:
			{event} eventObj
		
		Example:
			(start code)
			// use requestObj passed into a Command
			var x = requestObj.getEvent().offsetX;
			var y = requestObj.getEvent().offsetY;
			
			(end)
	*/
	getEvent: function() {
		return this.eventObj;
	},
	/*
		Function: getCommandName
		
		Returns the name of the Command that the request is being passed in to.
		
		Returns:
			{string} Command Name
	*/
	getCommandName: function() {
		return this.commandName;
	},
	/*
		Function: getController
		
		Returns the Controller which fired the request.
		
		Returns:
			{mojo.controller.Controller} Controller
	*/
	getController: function() {
		return this.controllerObj;
	},
	/*
		Function: getControllerName
		
		Returns the name of the Controller which fired the request.
		
		Returns:
			{string} Controller Name
		
	*/
	getControllerName: function() {
		return this.getController().declaredClass;
	},
	/*
		Function: getInvocation
		
		Returns the invocation object, which wraps an intercepted Command object. Used with Controller Intercepts only.
		
		Returns:
			{object} Invocation
			
		Example:
			(start code)
			// use requestObj passed into a Command
			if (requestObj.getInvocation()) {
				// execute the intercepted Command
				requestObj.getInvocation().proceed();
			}
			(end)
	*/
	getInvocation: function() {
		return this.invocation;
	}
});


dojo.provide('mojo.helper.String');

mojo.toSentenceCase = function(string) {
  return string.charAt(0).toUpperCase() + string.replace(/ \w/g, function(m){return m.toUpperCase();}).substring(1);
};


dojo.provide("mojo.service.Delegate");

dojo.declare("mojo.service.Delegate", null, 
{
  constructor: function(callerObj) {
  	this._callerObj = callerObj;
  },
	_callerObj: null,
	getCaller: function() {
		return this._callerObj;
	},
	setCaller: function(callerObj) {
		this._callerObj = callerObj;
	}
});
/*
	Class: Locator
	
	An abstract class for organizing web services into a central registry. Implement as a Singleton.
	
	Example:
		(start code)
		dojo.provide("sample.service.Locator");
		dojo.require("mojo.service.Locator");
		dojo.require("mojo.service.Service");

		dojo.declare("sample.service.Locator", mojo.service.Locator,
		function() {}, {
			addServices: function() {
		        this.addService(new mojo.service.Service("getRSS", "/json/rssFeed", {format: 'json', cache: true}));
		        this.addService(new mojo.service.Service("getProfile", "/ json/members/${memberId}/profile", {format: 'json', cache:false }));
		        this.addService(new mojo.service.Service("updateProfile", "/ json/members/${memberId}/profile", {format: 'json', cache:false }));
			}
		});

		var __sampleServiceLocator = null;
		sample.service.Locator.getInstance = function() {
			if (__sampleServiceLocator == null) {
				__sampleServiceLocator = new sample.service.Locator();
			}
			return __sampleServiceLocator;
		}
		
		(end)
*/
dojo.provide("mojo.service.Locator");

__mojoServiceRegistry = new Array();

dojo.declare("mojo.service.Locator", null,
{
  constructor: function() {
  	if (__mojoServiceRegistry.length == 0) {
  		this.addServices();
  	}
  },

	/*
		Function: addServices
		
		Abstract function fired on instantiation of concrete implementation of Locator class. 
		Used as container function for adding services.
		
	*/
	addServices: function() {
		if (djConfig && djConfig.isDebug) {
		  console.debug("ERROR mojo.service.Locator - addServices() not implemented");
	  }
	},
	/*
		Function: addService
		
		Adds a service object to the Locator's service registry.
		
		Parameters:
			serviceObj - {object} mojo.service.Service
			
		Example:
			(start code)
			// get locator instance
			var locator = sample.service.Locator.getInstance();
			// instantiate a new service
			var service = new mojo.service.Service("getRSS", "/json/rssFeed", {format: 'json', cache: true});
			// add service to locator
			locator.addService(service);
			(end)
	*/
	addService: function(serviceObj) {
		if(serviceObj == null || typeof serviceObj == 'undefined')
		  throw(new Error("ERROR mojo.service.Locator.addService - serviceObj parameter is required"));
		if(!(serviceObj instanceof mojo.service.Service))
		  throw(new Error("ERROR mojo.service.Locator.addService - serviceObj parameter must be an instance of the mojo.service.Service class"));
    
    var serviceName = serviceObj.getName();
    
		if(!__mojoServiceRegistry[serviceName]) {
		  __mojoServiceRegistry[serviceName] = serviceObj;
	  } else {
	    throw(new Error('ERROR mojo.service.Locator.addService - service with the name "' + serviceName + '" already exists in the registry; service not added'));
	  }
	},
	/*
		Function: getService
		
		Retrieves the service object associated with the service name.
		
		Parameters:
			name - {string} The name of the Service.
		
		Returns:
			{object} mojo.service.Service
			
		Example:
			(start code)
			// get locator instance
			var locator = sample.service.Locator.getInstance();
			// get a service
			var service = locator.getService("getRSS");
			(end)
	*/
	getService: function(name) {
		// ensure that a topic has been provided
  	// and that it is a non-empty string
  	if(name == null || typeof name == 'undefined')
  	  throw new Error('ERROR mojo.service.Locator.getService - name parameter is required');
  	if(!dojo.isString(name) || name == '') 
  	  throw new Error('ERROR mojo.service.Locator.getService - name parameter must be a non-empty string');
  	  
  	return __mojoServiceRegistry[name] || null;
	}
});
/*
	Class: Service
	
	Class representation of a web service call.
*/
dojo.provide("mojo.service.Service");

dojo.declare("mojo.service.Service", null, 
{
	/*
	  Constants: mojo.service.Service constants
	  
	  VALID_METHODS  - A list of HTTP methods acceptable as configuration when instantiating a new mojo.service.Service object.
	  DEFAULT_PARAMS - The default configuration for a mojo.service.Service object.
	*/
	
  VALID_METHODS: ['GET', 'POST', 'PUT', 'DELETE'],
	DEFAULT_PARAMS: {
    format: 'json',
    method: 'GET',
    cacheExpiry: 0,
    cache: true,
    retry: 1,
    hijax: false,
		inferArrays: true
  },
  
	/*
		Function: constructor
		
		Creates an instance of the mojo.service.Service class.
	
		Parameters:
			name - {string}
			uri - {string}
			paramsObj - {object}
			
		Example:
			(start code)
			// instantiate a new JSON service that caches for 60 seconds
			var jsonService = new mojo.service.Service("getRSS", "/json/rssFeed", {format: 'json', cache: true, cacheExpiry: 60});
			
			// instantiate a new text transport service that does not cache
			var textService = new mojo.service.Service("getHTMlFragment", "/html/fragment.html", {format: 'text', cache: false});
			
			// instantiate a new XML service that does not make inferences about what nodes should form part of an array of nodes
			var xmlService = new mojo.service.Service("getAtom", "/xml/atomFeed", {format: 'xml', inferArrays: false});
			(end)
	*/
  constructor: function(name, uri, paramsObj) {
    if(name == null || typeof name == 'undefined')
  	  throw new Error('ERROR mojo.service.Service.constructor - name parameter is required');
  	if(!dojo.isString(name) || name == '')
  	  throw new Error('ERROR mojo.service.Service.constructor - name parameter must be a non-empty string');
  	
	  if(uri == null || typeof uri == 'undefined')
  	  throw new Error('ERROR mojo.service.Service.constructor - uri parameter is required');
  	if(!dojo.isString(uri) || uri == '')
  	  throw new Error('ERROR mojo.service.Service.constructor - uri parameter must be a non-empty string');
	  
	  // Validate URIs against RFC2396
	  /*
	  if(!(new RegExp(TODO)).test(uri))
	    throw new Error('ERROR mojo.service.Service.constructor - uri parameter conform to RFC2396');
	  */
	  
	  // Duplicate the default parameters
	  var configuration = {};
	  for(property in this.DEFAULT_PARAMS) configuration[property] = this.DEFAULT_PARAMS[property];
	  
	  // Set the default method according to service name
		if(name.toLowerCase().indexOf("add") == 0) {
		  configuration.method = "POST";
		} else if (name.toLowerCase().indexOf("update") == 0) {
		  configuration.method = "PUT";
		} else if (name.toLowerCase().indexOf("delete") == 0) {
		  configuration.method = "DELETE";
		}
		
		if(paramsObj) {
	    // should, by default, set the cache configuration property to false if the method configuration property is not "GET"
      if(paramsObj.method) {
	      if(paramsObj.method != 'GET') configuration.cache = false;
	    } else {
	      if(configuration.method != 'GET') configuration.cache = false;
	    }
		
	  	// should, by default, set the retry configuration property to 0 if the method configuration property is not "GET"
	    if(paramsObj.method) {
	      if(paramsObj.method != 'GET') configuration.retry = 0;
	    } else {
	      if(configuration.method != 'GET') configuration.retry = 0;
		  }
		}
			  
	  // Merge any explicit configuration with the default configuration
    if(paramsObj) {
	    for(property in paramsObj) configuration[property] = paramsObj[property];
	  }
	  
	  this.setName(name);
  	this.setUri(uri);
  	this.setParams(configuration);
		
		// Expire any pre-existing cache immediately
		this._expireCache(this.getName());
  },
	_name: "",
	_uri: "",
	_params: new Object(),
	/*
		Function: getName
		
		Retreives the name of the web service.
		
		Returns:
			{string} Name of the service.
		
		Example:
			(start code)
			var service = new mojo.service.Service("getRSS", "/json/rssFeed", {format: 'json', cache: true});
			var name = service.getName(); // returns "getRSS"
			(end)
	*/
	getName: function() {
		return this._name;
	},
	/*
		Function: setName
		
		Sets the name for the web service.
		
		Parameters:
			name - {string} The name of the service.
		
		Example:
			(start code)
			// instantiate a new service
			var service = new mojo.service.Service("getRSS", "/json/rssFeed", {format: 'json', cache: true});
			service.setName("getNews"); // changes name from "getRSS" to "getNews"
			(end)
	*/
	setName: function(name) {
		if(name == null || typeof name == 'undefined')
  	  throw new Error('ERROR mojo.service.Service.setName - name parameter is required');
  	if(!dojo.isString(name) || name == '')
  	  throw new Error('ERROR mojo.service.Service.setName - name parameter must be a non-empty string');
  	  
  	this._name = name;
	},
	/*
		Function: getUri
		
		Retrieves the Uri for the web service. Uri returned will include TrimPath variable syntax if inserted.
		
		Returns:
			{string} uri
			
		Example:
			(start code)
			// instantiate a new service
			var service = new mojo.service.Service("getRSS", "/json/rssFeed", {format: 'json', cache: true});
			var uri = service.getUri(); // returns "/json/rssFeed"
			(end)
	*/
	getUri: function() {
		return this._uri;
	},
	/*
		Function: setUri
		
		Sets the Uri for the web service. TrimPath variable syntax can be inserted to allow 
		for dynamic Uri generation when invoking service call.
		
		Parameters:
			uri - {string} 
			
		Example:
			(start code)
			// instantiate a new service
			var service = new mojo.service.Service("getRSS", "/json/rssFeed", {format: 'json', cache: true});
			service.setUri("/json/rssFeed/${id}"); // add dynamic variable to Uri
			(end)
			
	*/
	setUri: function(uri) {
		if(uri == null || typeof uri == 'undefined')
  	  throw new Error('ERROR mojo.service.Service.setUri - uri parameter is required');
  	if(!dojo.isString(uri) || uri == '')
  	  throw new Error('ERROR mojo.service.Service.setUri - uri parameter must be a non-empty string');
		
		this._uri = uri;
	},
	/*
		Function: getParams
		
		Retrieves the options for the web service call. If options are not explicitly set, 
		default option values will be returned.
		
		Returns:
			{object} Parameter Object.
			
		Example:
			(start code)
			// instantiate a new service
			var service = new mojo.service.Service("getRSS", "/json/rssFeed", {format: 'json', cache: true});
			var options = service.getParams(); // returns {json:true, cache:true, method:"GET", cacheExpiry:0, retry: 1}
			(end)
	*/
	getParams: function() {
		return this._paramsObj;
	},
	/*
		Function: setParams
		
		Sets the options for the web service call.
		
		Parameters:
			paramsObj - {object} Parameters to be sent to the service.
		
		Example:
			(start code)
			// instantiate a new service
			var service = new mojo.service.Service("getRSS", "/json/rssFeed", {format: 'json', cache: true});
			service.setParams({cache: false}); // changes cache to false. All other defined options remain unchanged.
			(end)
	*/
	setParams: function(paramsObj) {
		if(!paramsObj)
      throw new Error('ERROR mojo.service.Service.setParams - paramsObj parameter is required');
      
    if(paramsObj) {
	    for(property in paramsObj) {
	      switch(property) {
	        case 'hijax':
	        case 'cache':
					case 'inferArrays':
	          if(typeof paramsObj[property] != 'boolean')
              throw new Error('ERROR mojo.service.Service.setParams - ' + property + ' property of paramsObj must be a boolean');
	          break;
	        case 'cacheExpiry':
	        case 'retry':
	          if(typeof paramsObj[property] != 'number')
	            throw new Error('ERROR mojo.service.Service.setParams - ' + property + ' property of paramsObj must be a number');
						break;
	        case 'format':
						if(typeof paramsObj[property] != 'string')
	            throw new Error('ERROR mojo.service.Service.setParams - ' + property + ' property of paramsObj must be a string');
						break;
					case 'method':
	          var validMethodFound = false;
	          for(var i = 0, len = this.VALID_METHODS.length; i < len; i++) {
	            if(this.VALID_METHODS[i] == paramsObj[property].toUpperCase()) validMethodFound = true;
	          }
	          if(!validMethodFound)
	            throw new Error('ERROR mojo.service.Service.setParams - method property of paramsObj must be one of "GET", "POST", "PUT", or "DELETE"');
	          break;
	      }
	    }
	  }
	  
		if(!this._paramsObj) this._paramsObj = {};
		
		// DEPRECATED: should set format to 'json' when paramsObj contains a key named 'json' with the value true
		if(paramsObj.json == true) {
			this._paramsObj.format = 'json';
			if (djConfig && djConfig.isDebug) {
				console.debug("WARNING mojo.service.Service.setParams - json parameter is DEPRECATED; use {format: 'json'} instead");
			}
		}
		// DEPRECATED: should set format to 'text' when paramsObj contains a key named 'json' with the value false
		if(paramsObj.json == false) {
			this._paramsObj.format = 'text';
			if (djConfig && djConfig.isDebug) {
				console.debug("WARNING mojo.service.Service.setParams - json parameter is DEPRECATED; use {format: 'json'} instead");
			}
		}
		
		for(property in paramsObj) this._paramsObj[property] = paramsObj[property];
		
	},
	/*
		Function: invoke
		
		Fires the web service request, and triggers onResponse or onError callback methods on the caller 
		depending on success or failure respectively. Optional service parameters are sent with the web 
		service request, and are used to generate a dynamic Uri for the call when TrimPath syntax is used 
		(if TrimPath.parseTemplate is available).
		
		Parameters:
			paramsObj - {object} Parameters to send to the service.
			callerObj - {object} Command object to pass to the service.
			
		Example:
			(start code)
			// instantiate a new service
			var service = new mojo.service.Service("getRSS", "/json/rssFeed/${id}", {format: 'json', cache: true});
			var caller = {
			onResponse: function(data) { alert("success!"); }, 
			onError: function(error) { alert("error"); }
			}
			service.invoke({id: "cnn"}, caller); // generates Uri "/json/rssFeed/cnn" based on the service parameters passed in. 
			//Triggers callback methods onResponse or onError
			(end)
	*/
	invoke: function(paramsObj, callerObj) {
		if(!callerObj)
			throw new Error("ERROR mojo.service.Service.invoke - callerObj parameter is required");
		if(!dojo.isObject(callerObj))
			throw new Error("ERROR mojo.service.Service.invoke - callerObj parameter must be an object");
		if(typeof callerObj.onResponse != 'function')
			throw new Error("ERROR mojo.service.Service.invoke - callerObj parameter must contain an object with an onResponse method");
		if(typeof callerObj.onError != 'function')
			throw new Error("ERROR mojo.service.Service.invoke - callerObj parameter must contain an object with an onError method");
		
		var serviceParams = this.getParams();
		
		// get address via templated uri
		if(typeof TrimPath != 'undefined' && TrimPath.parseTemplate) {
			var uriFinal = TrimPath.parseTemplate(this.getUri()).process(paramsObj);
			if (paramsObj && paramsObj["_MODIFIERS"] && paramsObj["defined"]) {
  			delete paramsObj["_MODIFIERS"];
  			delete paramsObj["defined"];
  		}
		} else {
		  var uriFinal = this.getUri();
		}
		
		if (serviceParams.hijax && callerObj.getRequest() && callerObj.getRequest().callerObj && callerObj.getRequest().callerObj.tagName == "A") {
			uriFinal = callerObj.getRequest().callerObj.href;
		}
		
		var tried = 0;
		var serializeName = this.getName();
		var pairs = new Array();
		for (var key in paramsObj) {
			if (typeof(paramsObj[key]) != "function") {
				pairs.push(key + "_" + paramsObj[key]);
			} else {
				pairs.push(key + "__function");
			}
		}
		if(pairs.length > 0) serializeName += "_" + pairs.join("_");

		var errorCallback = function(errorObj, httpObj) {
			var errors = new Array();
			// handle http error
			if (httpObj) {
				errorObj.code = httpObj.status;
				errors.push(errorObj);
			}
			//handle error as string
			if (typeof(errorObj) == "string") {
				var msg = errorObj;
				errorObj = new Object();
				errorObj.message = msg;
			}
			// handle exception error
			if (errorObj.name) {
				errorObj.code = errorObj.name;
				errors.push(errorObj);
			}
			// handle json error
			if (errorObj.errors) {
				errors = errorObj.errors;
			}
			if (errorObj.error) {
				errors.push(errorObj.error);
			}
			// handle server error redirect
			if (errors[0]["redirectUrl"]) {
				window.location.replace(errors[0]["redirectUrl"]);
			}
			if (httpObj && serviceParams.retry >= tried) { // retry http errors only
				serviceInvoke();
			} else {
				callerObj.onError(errors);
			}
		};
		var thisObj = this;
		var serviceInvoke = function() {
			return dojo['xhr' + mojo.toSentenceCase(serviceParams.method.toLowerCase())]({
				url: uriFinal,
				preventCache: (!serviceParams.cache && serviceParams.method == "GET"),
				handleAs: serviceParams.format,
				content: paramsObj,
				load: function(response, ioArgs) {
					tried++;
					if (ioArgs.handleAs == 'json') {
						if (!dojo.isObject(response)) {
							// we expected an object as the response…
							// let's try to eval the JSON one more time
							try {
								response = eval(response);
							} catch(ex) {
								errorCallback(ex);
								return;
							}
						}
						
						if(response.error || response.errors) {
							errorCallback(response);
						} else {
							if (serviceParams.cache) {
						    thisObj._setCache(serializeName, response, serviceParams.cacheExpiry);
							}
							callerObj.onResponse(response, ioArgs.args.content);
						}
					} else if (ioArgs.handleAs == 'xml') {
						try {
							var params = {};
							if(typeof serviceParams.inferArrays != 'undefined') params.inferArrays = serviceParams.inferArrays;
							
							response = mojo.helper.XML.toObject(response, params);
						} catch(ex) {
							errorCallback(ex);
						}
						
						if(response.error || response.errors) {
						  //normalize errors
							if(response.errors && response.errors['error'] && response.errors['error'] instanceof Array) {
								response.errors = response.errors['error'];
							}
							errorCallback(response);
						}	else {
							if (serviceParams.cache) {
						    thisObj._setCache(serializeName, response, serviceParams.cacheExpiry);
							}
							callerObj.onResponse(response, ioArgs.args.content);
						}
					} else {
						if (serviceParams.cache) {
							thisObj._setCache(serializeName, response, serviceParams.cacheExpiry);
						}
						callerObj.onResponse(response, ioArgs.args.content);
					}
				},
				error: function(response, ioArgs) {
					tried++;
					errorCallback(response, ioArgs.xhr);
				}
			});
		};
		var cacheObj;
    if (serviceParams.cache) {
			cacheObj = this._getCache(serializeName);
    }
    if (cacheObj) {
    	callerObj.onResponse(cacheObj.data, paramsObj);
		} else {
			var currentXhr = serviceInvoke();
		}
	return currentXhr;
	},
  _setCache: function(key, data, cacheExpiry) {
  	var expiryTime = 0;
  	if (cacheExpiry > 0) {
  		expiryTime = (new Date()).getTime() + (cacheExpiry * 1000);
  	}
  	mojo.Model.set(key, {data: data, expiryTime: expiryTime});
  },
  _getCache: function(key) {
  	var cacheObj = null;
  	if (mojo.Model.contains(key)) {
  		cacheObj = mojo.Model.get(key);
			// check cache expiry
			var now = (new Date()).getTime();
			if (cacheObj.expiryTime > 0 && now > cacheObj.expiryTime) {
				this._expireCache(key);
				cacheObj = null;
			}
		}
  	return cacheObj;
	},
	_expireCache: function(key) {
		mojo.Model.remove(key);
	}
});
/*
	Class: History
	
	Singleton class for managing browser history/state changes.
*/
dojo.provide("mojo.History");
var __mojoHistory = null;

dojo.declare("mojo.History", null, 
{
	

  constructor: function() {
    var thisObj = this;
  	if (typeof rsh != "undefined" && rsh["dhtmlHistory"] && rsh["dhtmlHistory"]["_isIE"]) {
  		// use Real Simple History (RSH) library for IE
  		rsh.dhtmlHistory.init();
  		dojo.connect(rsh.dhtmlHistory, "_fireHistoryEvent", function(newHash) {
  			thisObj.setHash(newHash);
  			thisObj._execute();
  		});
  	} else {
  		this._interval = window.setInterval(function() {
  			thisObj._execute();
  		}, 100);
		}
	},
	_interval: null,
	_defaultHash: "",
	_savedHash: "",
	_paramsObj: null,
	_topic: null,
	/*
	   Event: onChange
	
		This event fires when the history changes state.
	*/
	onChange: function() {
	},
	/*
	   	Function: getHash
	
		Retrieves the hash of the current page url.
		
		Returns:
			{string} Hash
			
		Example:
			(start code)
			// if current location is: http://localhost/main#topic=news
			var currentHash = mojo.History.getInstance().getHash(); //returns "topic=news"
			(end)
	*/
	getHash: function() {
		var hash = window.location.hash;
		if (hash.length > 0) {
			hash = hash.substring(1);
		}
		if (hash.toLowerCase() == "null" || hash.toLowerCase() == "undefined") {
			hash = "";
		}
		if (hash.length == 0 && this._defaultHash.length > 0) {
			hash = this._defaultHash;
		}
		return hash;
	},
	/*
	   	Function: setHash
	
		Sets the hash of the current page url.
	
		Parameters:
			newHash - {string} Hash.
			
		Example:
			(start code)
			// if current location is: http://localhost/main
			mojo.History.getInstance().setHash("topic=news"); //sets location to: http://localhost/main#topic=news
			
			(end)
			
	*/
	setHash: function(newHash) {
		if(newHash == null || typeof newHash == 'undefined')
  	  throw new Error('ERROR mojo.History.setHash - newHash parameter is required');
  	if(!dojo.isString(newHash) || newHash == '')
  	  throw new Error('ERROR mojo.History.setHash - newHash parameter must be a non-empty string');
    
		window.location.hash = newHash;
	},
	/*
	   	Function: setDefault
	
		Sets the default application state of the History object.
		
		Parameters:
			defaultHashObj - {string|object} 
		
		Example:
			(start code)
			// set default state as a string
			mojo.History.getInstance().setDefault("topic=news&id=1234");

			// OR set default state as a JS object
			mojo.History.getInstance().setDefault({topic: "news", id: 1234});
			
			(end)
	*/
	setDefault: function(defaultHashObj) {
		if(defaultHashObj == null || typeof defaultHashObj == 'undefined')
  	  throw new Error('ERROR mojo.History.setDefault - defaultHashObj parameter is required');

		if (typeof(defaultHashObj) == "string") {
			this._defaultHash = defaultHashObj;
		} else if (typeof(defaultHashObj) == "object") {
			this._defaultHash = this._parseObj(defaultHashObj);
		}
		this._execute();
	},
	_execute: function() {
		var currentHash = this.getHash();
		
		if (currentHash.length == 0 && this._defaultHash.length > 0) {
			currentHash = this._defaultHash;
		}
		if (this._savedHash != currentHash) {
			document.title = document.title.replace(window.location.hash, "");
			this._savedHash = currentHash;
			this._paramsObj = this._parseHash(this._savedHash);
			this._topic = this._paramsObj["topic"] || null;
			this.onChange();
			if (this._topic) {
				mojo.Messaging.publish(this._topic, this._paramsObj);
			}
		}
	},
	_parseHash: function(hash) {
		var obj = new Object();
		var vars = hash.split("&");
		for (var i = 0; i < vars.length; i++) {
			var pair = vars[i].split("=");
			if (pair.length == 2) {
				obj[pair[0]] = unescape(pair[1]);
			}
		}
		return obj;
	},
	_parseObj: function(obj) {
		var hashParts = new Array();
		for (var key in obj) {
			hashParts.push(key + "=" + escape(obj[key].toString()));
		}
		var hash = hashParts.join("&");
		return hash;
	},
	
	/*
	   	Function: getParams
	
		Retrieves an object representation of the current state of the History object, 
		containing any hash name/value pairs as properties of the object.
		
		Returns:
			{object} Parameter Object
			
		Example:
			(start code)
			// if current location is: http://localhost/main#topic=news&id=1234
			var params = mojo.History.getInstance().getParams(); // returns {topic: "news", id:1234}
			var topic = mojo.History.getInstance().getParams().topic; // returns "news"
			var id = mojo.History.getInstance().getParams().id; // returns 1234
			(end)
	*/
	getParams: function() {
		return this._paramsObj;
	},
	/*
	   	Function: getTopic
	
		Retrieves the current topic of the History object. The "topic" keyword is used in conjunction 
		with mojo.Messaging, and will broadcast a message based on the topic whenever it is set in 
		the History object.
	
		Returns:
			{object} Topic
			
		Example:
			(start code)
			// if current location is: http://localhost/main#topic=news&id=1234
			var topic = mojo.History.getInstance().getTopic(); // returns "news"
			// message topic will be triggered. Ie. mojo.Messaging.publish("news", historyParams)
			(end)
			
	*/
	getTopic: function() {
		return this._topic;
	}
});
/*
	Function: getInstance
	
	Static function--Retrieves a Mojo History instance. 
	
	Example:
		(start code)
		var myHistoryObj = mojo.History.getInstance();
		(end)
	
	Returns:
		{object} mojo.History
*/
mojo.History.getInstance = function() {
	if (__mojoHistory == null) {
		__mojoHistory = new mojo.History();
	}
	return __mojoHistory;
};
/*
	Class: Messaging
	
  	Contains static functions for publishing / subscribing to messages by topic.
*/
dojo.provide("mojo.Messaging");
__mojoMessagingTopics = new Array();

/*
	Function: publish
	
	Invokes all listeners subscribed to topic. 

	Parameters:
		topic - {string} Topic
		messageObj - {object} Message Object (optional)
	
	Example:
		(start code)
		// subscribe an object's function to a message topic
		var test = {dialog: function(msg) { 
		    if (!msg) msg = "test";
		    alert(msg);   
		}}
		
		var handle = mojo.Messaging.subscribe("someTopic", test, "dialog");
		
		// invoke dialog function by publishing message topic
		mojo.Messaging.publish("someTopic");
		
		// invoke dialog function, and pass in a parameter
		mojo.Messaging.publish("someTopic", ["hello world"]);
		(end)
*/
mojo.Messaging.publish = function(topic, messageObj) {
	if(topic == null || typeof topic == 'undefined')
	  throw new Error('ERROR mojo.Messaging.publish - topic parameter is required');
	if(!dojo.isString(topic) || topic == '')
	  throw new Error('ERROR mojo.Messaging.publish - topic parameter must be a non-empty string');
	
	var topicObj = mojo.Messaging.getTopic(topic);
	topicObj.setMessage(messageObj);
	topicObj.onPublish(messageObj);
	if(!dojo.isArray(messageObj)) {
	  messageObj = [messageObj];
  }
	dojo.publish(topic, messageObj);
	topicObj.setMessage(null);//wipe clean (but not delete obj to save memory)
};

/*
	Function: subscribe
	
	Attaches a listener to a message topic--Use returned handle to unsubscribe.
	
	Parameters:
		topic - {string}
		targetObj - {object}
		targetFunc - {string}
	
	Returns:
		{object} handle
	
	
	Example:
		(start code)
		// subscribe an object's function to a message topic
		var test = {dialog: function(msg) { 
		    if (!msg) msg = "test";
		    alert(msg);   
		}}
		
		var handle = mojo.Messaging.subscribe("someTopic", test, "dialog");
		
		// invoke dialog function by publishing message topic
		mojo.Messaging.publish("someTopic");
		
		// invoke dialog function, and pass in a parameter
		mojo.Messaging.publish("someTopic", ["hello world"]);
		(end)	
*/
mojo.Messaging.subscribe = function(topic, targetObj, targetFunc) {
	// ensure that a topic has been provided
	// and that it is a non-empty string
	if(topic == null || typeof topic == 'undefined')
	  throw new Error('ERROR mojo.Messaging.subscribe - topic parameter is required');
	if(!dojo.isString(topic) || topic == '') 
	  throw new Error('ERROR mojo.Messaging.subscribe - topic parameter must be a non-empty string');
	
	// ensure that the targetObj is indeed an object or a string
	if(!dojo.isObject(targetObj) && !dojo.isString(targetObj))
	  throw new Error('ERROR mojo.Messaging.subscribe - targetObj parameter must be an object or a string');
	
	mojo.Messaging.getTopic(topic);
	
	return dojo.subscribe(topic, targetObj, targetFunc);
};

/*
	Function: unsubscribe

	Removes a specific subscribed listener from a message topic.
	
	Parameters:
		handle - {object}	
	
	Example: 
		(start code)
		// subscribe to a message topic
		var handle = mojo.Messaging.subscribe("someTopic", test, "dialog");
		// unsubscribe from message topic
		mojo.Messaging.unsubscribe(handle);

		(end)
*/
mojo.Messaging.unsubscribe	= function(handle) {
	dojo.unsubscribe(handle);
};

/*
	Function: getTopic
	
	Retrieves the MessagingTopic object associated with the message topic--If topic 
	doesn't exist, this function will generate one.
	
	Paramters: 
		topic - {string}
		
	Returns:
		{object} Topic
		
	Example:
		(start code)
		// stand-alone usage
		var topicObj = mojo.Messaging.getTopic(“someTopic”);

		// usage in a Mojo Controller
		this.addObserver(mojo.Messaging.getTopic(“someTopic”), “onPublish”, “SomeCommand”);

		(end)
*/
mojo.Messaging.getTopic = function(topic) {
	if(topic == null || typeof topic == 'undefined')
	  throw new Error('ERROR mojo.Messaging.getTopic - topic parameter is required');
	if(!dojo.isString(topic) || topic == '')
	  throw new Error('ERROR mojo.Messaging.getTopic - topic parameter must be a non-empty string');
	  
  if (!__mojoMessagingTopics[topic]) {
		__mojoMessagingTopics[topic] = new mojo.MessagingTopic(topic);
	}
	return __mojoMessagingTopics[topic];
};
/*
	Class: MessagingTopic
	
	Class representation of a message topic.
*/
dojo.provide("mojo.MessagingTopic");
dojo.declare("mojo.MessagingTopic", null, 
{
	/*
		Function: onPublish
		
		This event fires when this message topic gets published.
	*/
	onPublish: function() {
	},
	/*
		Constructor: constructor
		
		Creates an instance of the mojo.MessagingTopic class.
		
		Parameters: 
			topic - {string}
			
		Example:
			(start code)
			// instantiate a new MessagingTopic object
			var msgObj = new mojo.MessagingTopic("someTopic");
			
			(end)
	*/
	constructor: function(topic) {
		if (topic == null || typeof topic == 'undefined') throw new Error('ERROR mojo.MessagingTopic - topic parameter is required');
		if (typeof topic == 'string') {
			if (topic == '') throw new Error('ERROR mojo.MessagingTopic - topic parameter must be a non-empty string');
		} else {
			throw new Error('ERROR mojo.MessagingTopic - topic parameter is not type String');
		}

		this._topic = topic;
		__mojoMessagingTopics[topic] = this;
	},
	_topic: null,
	_messageObj: null,
	/*
		Function: getTopic
		
		Retrieves the message topic.
	
		Returns:
			{object} Topic
	*/
	getTopic: function() {
		return this._topic;
	},
	/*
		Function: getMessage
		
		Retrieves the message object broadcasted with the message topic.
		
		Returns:
			{object} messageObj
	*/
	getMessage: function() {
		return this._messageObj;
	},
	/*
		Function: setMessage
		
		Sets the message object associated with the message topic.
		
		Parameters:
			messageObj - {object}
			
		
	*/
	setMessage: function(messageObj) {
		this._messageObj = messageObj;
	}

});
/*
	Class: Model

	Contains static functions for managing model data / application state. 
	
	NOTE: This should be changed to a Singleton in the future
	
*/
dojo.provide("mojo.Model");
__mojoModel = new Array();
__mojoModelReferences = new Array();

/*
   Function: set

   Sets the model data for a particular model key. If a model registered under the key does not exist, it is created.

   Parameters:
      key - {string}
      valueObj - {object}

	Example:
		(start code)
		var data = [1 2,3];
		mojo.Model.set("testModel", data); // store data into the "testModel" model
		(end)
*/
mojo.Model.set = function(key, valueObj) {
	if (key == null || typeof key == 'undefined')
		throw new Error('ERROR mojo.Model.set - key parameter is required');
	if (!dojo.isString(key) || key == '') 
		throw new Error('ERROR mojo.Model.set - key parameter must be a non-empty string');
		
	__mojoModel[key] = dojo.clone(valueObj);
	mojo.Model.notify(key);
};

/*
	Function: add
	
	Appends a data item to a model that is an array list.
	
	Parameters:
		key - {string}
		valueObj - {object}
	
	Example:
		(start code)
		var data = [1,2,3];
		mojo.Model.set("testModel", data);
		mojo.Model.add("testModel", 4); // model is now [1, 2, 3, 4]
		
		(end)
*/
mojo.Model.add = function(key, valueObj) {

	if(key == null || typeof key == 'undefined')
	  throw new Error('ERROR mojo.Model.add - key parameter is required');
	if(!dojo.isString(key) || key == '')
	  throw new Error('ERROR mojo.Model.add - key parameter must be a non-empty string');

	if(valueObj == null || typeof valueObj == 'undefined')
	  throw new Error('ERROR mojo.Model.add - valueObj parameter is required');
	if(valueObj == '')
	  throw new Error('ERROR mojo.Model.add - valueObj parameter must be a non-empty string');
		
	if (mojo.Model.contains(key)) {
		if (!dojo.isArray(__mojoModel[key])) {
			var tmpModel = __mojoModel[key];
			__mojoModel[key] = new Array();
			__mojoModel[key].push(tmpModel);
		}
		if (dojo.isArray(valueObj)) {
			for (var i = 0; i < valueObj.length; i++) {
				__mojoModel[key].push(valueObj[i]);
			}
		} else {
			__mojoModel[key].push(valueObj);
		}
		mojo.Model.notify(key);
	} else {
		mojo.Model.set(key, valueObj);
	}
};

/*
	Function: get
	
	Retrieves the data for a specified model based on the model key.
	
	Parameters:
		key - {string}
		
	Returns:
		{object} Mojo Model.
		
	Examples:
		(start code)
		var temp = mojo.Model.get("testModel");
		(end)
*/
mojo.Model.get = function(key) {
		
	if(key == null || typeof key == 'undefined')
	  throw new Error('ERROR mojo.Model.get - key parameter is required');
	if(!dojo.isString(key) || key == '')
	  throw new Error('ERROR mojo.Model.get - key parameter must be a non-empty string');
	
	var tmp = __mojoModel[key];
		
	if (typeof tmp == "undefined") {
		tmp = null;
	}

	if (djConfig && djConfig.isDebug) {
		console.debug("WARNING mojo.Model - No entry found for \"" + key + "\" key");
	}
	return tmp;
};

/*
	Function: getReference
	
	Retrieves the mojo.ModelReference object associated with a model. 
	If model doesn't exist, this function will generate one. Object can be observed in 
	a Mojo Controller.
	
	Parameters:
		key - {string}
		
	Returns:
		{object} Model Reference Object
		
	Example:
		(start code)
		// stand-alone usage
		var modelObj = mojo.Model.getReference("testModel");

		// usage in a Mojo Controller
		this.addObserver(mojo.Model.getReference("testModel"), "onNotify", "SomeCommand");
		(end)
*/
mojo.Model.getReference = function(key) {
	
	if(key == null || typeof key == 'undefined')
	  throw new Error('ERROR mojo.Model.getReference - key parameter is required');
	if(!dojo.isString(key) || key == '')
	  throw new Error('ERROR mojo.Model.getReference - key parameter must be a non-empty string');
	
	if (!__mojoModelReferences[key]) {
		__mojoModelReferences[key] = new mojo.ModelReference(key);
	}
	return __mojoModelReferences[key];
};

/*
	Function: remove
	
	Clears the model data for a particular model key.
	
	Parameters:
		key - {object}
		
	Example:
		(start code)
		mojo.Model.remove("testModel");
		(end)
*/
mojo.Model.remove = function(key) {

	
	if(key == null || typeof key == 'undefined')
	  throw new Error('ERROR mojo.Model.remove - key parameter is required');
	if(!dojo.isString(key) || key == '')
	  throw new Error('ERROR mojo.Model.remove - key parameter must be a non-empty string');

	var ref = mojo.Model.getReference(key);

	__mojoModel[key] = null;
	mojo.Model.notify(key);

	
};

/*
	Function: contains
	
	Returns whether or not a specified model exists.
	
	Parameters:
		key - {string}
		
	Returns:
		{boolean} Exists
	
	Example:
		(start code)
		if (mojo.Model.contains("testModel")) {
			// the model exists!
		}
		
		(end)
*/
mojo.Model.contains = function(key) {
	
	if(key == null || typeof key == 'undefined')
	  throw new Error('ERROR mojo.Model.contains - key parameter is required');
	if(!dojo.isString(key) || key == '')
	  throw new Error('ERROR mojo.Model.contains - key parameter must be a non-empty string');
	
	var tmp = __mojoModel[key];
	if (tmp) {
		return true;
	}
	return false;
};

/*
	Function: notify
	
	Notifies any registered observers of the specified model of a model change. This method is 
	automatically triggered on set, add, and remove Model methods. This method is used with 
	mojo.component.Template to re-databind the template.
	
	Parameters:
		key - {string} 
		
	Example:
		(start code)
		// observe "testModel" model
		mojo.Model.addObserver("testModel", {doSomething: function() {
			var data = mojo.Model.get("testModel");
			//do something 
		}}, "doSomething");
		mojo.Model.notify("testModel"); // notify observer to do something with model
		
		(end)
*/
mojo.Model.notify = function(key) {
	if(key == null || typeof key == 'undefined')
	  throw new Error('ERROR mojo.Model.notify - key parameter is required');
	if(!dojo.isString(key) || key == '')
	  throw new Error('ERROR mojo.Model.notify - key parameter must be a non-empty string');
	
	__mojoModel["__mojoTemplateControllers"] = [];
	var ref = mojo.Model.getReference(key);
	// Notify registered observers of change
	ref.onNotify();
	mojo.Messaging.publish("/mojo/model/" + key);

	// re-map any controllers to components dynamically created from template data-binding
	// ********* RECURSION BUG HERE... RACE CONDITION? mojo.controller.Map.mapControllers();

	// handle mojo template observer updates
	var templateControllersLength = __mojoModel["__mojoTemplateControllers"].length; 
	for (var i = 0; i < templateControllersLength; i++ ) {
		var controllerInstance = __mojoModel["__mojoTemplateControllers"][i];
		if (controllerInstance && controllerInstance.updateController) {
			controllerInstance._addObservers();
			controllerInstance.updateController = null;
		}
	}
	__mojoModel["__mojoTemplateControllers"] = null;
};

/*
	Function: addObserver
	
	Registers an observer to a specified model. Returns a handle to allow unregistering.
	
	Parameters:
	
		key - {string} Which model to observe.
		targetObj - {object} When to execute (onclick, etc)
		targetFunc - {string} What to execute on the target object.

	Returns:
		{object} handle
		
	Example:
		(start code)
		// observe "testModel" model
			mojo.Model.addObserver("testModel", {doSomething: function() {
				var data = mojo.Model.get("testModel");
		 		//do something 
		}}, "doSomething");
			mojo.Model.notify("testModel"); // notify observer to do something with model	
		(end)
*/
mojo.Model.addObserver = function(key, targetObj, targetFunc) {
	
	if(key == null || typeof key == 'undefined')
	  throw new Error('ERROR mojo.Model.addObserver - key parameter is required');
	if(!dojo.isString(key) || key == '')
	  throw new Error('ERROR mojo.Model.addObserver - key parameter must be a non-empty string');
	if(targetObj == null || typeof targetObj == 'undefined')
	  throw new Error('ERROR mojo.Model.addObserver - targetObj parameter is required');
	if(!dojo.isObject(targetObj))
	  throw new Error('ERROR mojo.Model.addObserver - targetObj parameter must be an object');
	if(targetFunc == null || typeof targetFunc == 'undefined')
	  throw new Error('ERROR mojo.Model.addObserver - targetFunc parameter is required');
	if(!dojo.isString(targetFunc) || targetFunc == '')
	  throw new Error('ERROR mojo.Model.addObserver - targetFunc parameter must be a function and is not of type string');
	
	// register observer
	return mojo.Messaging.subscribe("/mojo/model/" + key, targetObj, targetFunc);
};

/*
	Function: removeObserver
	
	Unregisters an observer from a model.
	
	Parameters:
		handle - {object}
		
	Example:
		(start code)
		// observe "testModel" model
		var handle = mojo.Model.addObserver("testModel", {doSomething: function() {
			var data = mojo.Model.get("testModel");
			//do something 
		}}, "doSomething");
		// remove observer
		mojo.Model.removeObserver(handle);
		(end)
	
*/
mojo.Model.removeObserver = function(handle) {
	
	if(handle == null || typeof handle != 'object')
	  throw new Error('ERROR mojo.Model.removeObserver - handle parameter is required');
		
	// unregister observer
	mojo.Messaging.unsubscribe(handle);
};
/*
	Class: ModelReference
	
	Class representation of a model instance.
*/
dojo.provide("mojo.ModelReference");
dojo.declare("mojo.ModelReference", null, {
	
	/*
		Event: onNotify
		
		This event fires when a change has been made in the model.
	*/
	onNotify: function() {
	
	},
	/*
		Constructor: constructor
		
		Creates an instance of the mojo.ModelReference class
		
		Parameters:
			key - {string}
			
		Example:
			(start code)
			// instantiate a new ModelReference
			var model = new mojo.ModelReference("testModel");
			(end)
	*/
	constructor: function(key) {
		if (key == null || typeof key == 'undefined')
			throw new Error('ERROR mojo.ModelReference - key parameter is required');
		if (!dojo.isString(key) || key == '') 
			throw new Error('ERROR mojo.ModelReference - key parameter must be a non-empty string');

		this._key = key;
		__mojoModelReferences[key] = this;
	},
	_key: null,
	/*
		Function: getKey
		
		Retrieves the model key.
		
		Returns:
			{string} Mojo Model Key
		
	*/
	getKey: function() {
			return this._key;
	},
	/*
		Function: getValue
		
		Retrieves the data stored in the model.
		
		Returns:
			{object} Mojo Model
	*/
	getValue: function() {
		return mojo.Model.get(this._key);
	},
	
	/*
		Function: setValue
		
		Sets new data to be stored in the model.
		
		Parameters:
			valueObj - {object}
	*/
	setValue: function(valueObj) {
		mojo.Model.set(this._key, valueObj);
	}
});
/*
dojo.provide("mojo.log");
mojo.log = function(msg, cat, src, obj) {
	if(!mojo.widget.Logger._enabled) {
		return false;
	} else {
		return mojo.widget.Logger.log(msg, cat, src, obj);
	}
};
*/
/*
	Class: mojo
	Note: These functions reside within the mojo.* namespace.
*/

dojo.provide("mojo.query");
/*
	Function: query
	
	Retrieves a set of nodes based on a given CSS selector. Includes support for CSS3 selectors.
	
	Parameters:
		cssSelectors - {string}
		rootObj - {DOMElement}
	
	Returns:
		{Array of DOMElements} elementListObj

	Example:
		(start code)
		// get anchors on the page with a class name of "link"
		var links = mojo.query("a.link");

		// get all divs on the page
		var divs = mojo.query("div");

		// get all the nodes with a class name of "selected" inside a particular node 
		// container
		var container = mojo.queryFirst("#container");
		var nodes = mojo.query(".selected", container);
		
		(end)
*/
mojo.query = function(cssSelectors, rootObj) {
	if(rootObj && (typeof rootObj == "string" || typeof rootObj == "object")) {
	  var results = dojo.query(cssSelectors, rootObj);
	} else {
		if ((new RegExp(/^\#[a-zA-Z0-9\-\_]*$/)).test(cssSelectors)) {
			var tmpElm = document.getElementById(cssSelectors.substring(1));
			if (tmpElm) {
				var results = [tmpElm];
			} else {
				var results = [];
			}
		} else {
			var results = dojo.query(cssSelectors);
		}
	}
	return results;
};
/*
	Function: queryFirst

	Retrieves the first node of a set of nodes based on a given CSS selector. Includes support for CSS3 selectors.
	
	Parameters:
		cssSelectors - {string}
		rootObj - {DOMElement}
		
	Returns:
		{DOMElement} elementListObj
		
	Example:
		(start code)
		// get a node with an id of "container"
		var container = mojo.queryFirst("#container");
		(end)
*/
mojo.queryFirst = function(cssSelectors, rootObj) {
	var results = mojo.query(cssSelectors, rootObj);
	if (results.length > 0) {
		return results[0];
	}
	return null;
};
/*
	Function: distinct
	
	Retrieves a set of distinct nodes from an array of nodes.
	
	Parameters:
		elementListObj - {DOMElement Array}
		
	Returns:
		{Array of DOMElements} elementListObj
*/
mojo.distinct = function(elementListObj) {
  if (elementListObj.length == 0) return elementListObj;
  var results = [], n;
  for (var i = 0, l = elementListObj.length; i < l; i++)
    if (!(n = elementListObj[i])._counted) {
      n._counted = true;
      results.push(n);
    }
  for (var i = 0, node; node = results[i]; i++)
    node._counted = undefined;
  return results;
};
/*
	Function: queryMatch
	
	Checks whether or not a given element matches a given CSS selector, and returns either the matching element, null if no matches, or a matching parent of the given element (if checkParents is true).
	
	Parameters:
		elementObj - {DOMElement}
		cssSelectors - {string}
		rootObj - {DOMElement}
		checkParents - {Boolean}
		
	Returns:
		{DOMElement} matchedElementObj

*/
mojo.queryMatch = function(elementObj, cssSelectors, rootObj, checkParents) {
	if (!elementObj || elementObj == rootObj) return null;
	var basicSelector = false;
	var results = [];
	if ((new RegExp(/^[\#|\.]?[a-zA-Z0-9\-\_]+$/)).test(cssSelectors)) {
		basicSelector = true;
	} else {
		results = mojo.query(cssSelectors, rootObj);
	}
	while (elementObj && elementObj != rootObj) {
		if (basicSelector) {
			if ((cssSelectors.indexOf("#") == 0 && elementObj.id == cssSelectors.substring(1)) ||
			    (cssSelectors.indexOf(".") == 0 && dojo.hasClass(elementObj, cssSelectors.substring(1))) ||
			    (elementObj["tagName"] && elementObj.tagName.toLowerCase() == cssSelectors.toLowerCase())) {
				return elementObj;
			}
		} else {
			for (var i = 0, len = results.length; i < len; i++) {
				if (results[i] == elementObj) return elementObj;
			}
		}
		if (checkParents) {
			elementObj = elementObj.parentNode;
		} else {
			break;
		}	
	}
	return null;
};

/*!
 * jQuery JavaScript Library v1.3.2
 * http://jquery.com/
 *
 * Copyright (c) 2009 John Resig
 * Dual licensed under the MIT and GPL licenses.
 * http://docs.jquery.com/License
 *
 * Date: 2009-02-19 17:34:21 -0500 (Thu, 19 Feb 2009)
 * Revision: 6246
 */
(function(){

var 
	// Will speed up references to window, and allows munging its name.
	window = this,
	// Will speed up references to undefined, and allows munging its name.
	undefined,
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,
	// Map over the $ in case of overwrite
	_$ = window.$,

	jQuery = window.jQuery = window.$ = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		return new jQuery.fn.init( selector, context );
	},

	// A simple way to check for HTML strings or ID strings
	// (both of which we optimize for)
	quickExpr = /^[^<]*(<(.|\s)+>)[^>]*$|^#([\w-]+)$/,
	// Is it a simple selector
	isSimple = /^.[^:#\[\.,]*$/;

jQuery.fn = jQuery.prototype = {
	init: function( selector, context ) {
		// Make sure that a selection was provided
		selector = selector || document;

		// Handle $(DOMElement)
		if ( selector.nodeType ) {
			this[0] = selector;
			this.length = 1;
			this.context = selector;
			return this;
		}
		// Handle HTML strings
		if ( typeof selector === "string" ) {
			// Are we dealing with HTML string or an ID?
			var match = quickExpr.exec( selector );

			// Verify a match, and that no context was specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] )
					selector = jQuery.clean( [ match[1] ], context );

				// HANDLE: $("#id")
				else {
					var elem = document.getElementById( match[3] );

					// Handle the case where IE and Opera return items
					// by name instead of ID
					if ( elem && elem.id != match[3] )
						return jQuery().find( selector );

					// Otherwise, we inject the element directly into the jQuery object
					var ret = jQuery( elem || [] );
					ret.context = document;
					ret.selector = selector;
					return ret;
				}

			// HANDLE: $(expr, [context])
			// (which is just equivalent to: $(content).find(expr)
			} else
				return jQuery( context ).find( selector );

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) )
			return jQuery( document ).ready( selector );

		// Make sure that old selector state is passed along
		if ( selector.selector && selector.context ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return this.setArray(jQuery.isArray( selector ) ?
			selector :
			jQuery.makeArray(selector));
	},

	// Start with an empty selector
	selector: "",

	// The current version of jQuery being used
	jquery: "1.3.2",

	// The number of elements contained in the matched element set
	size: function() {
		return this.length;
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num === undefined ?

			// Return a 'clean' array
			Array.prototype.slice.call( this ) :

			// Return just the object
			this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems, name, selector ) {
		// Build a new jQuery matched element set
		var ret = jQuery( elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		ret.context = this.context;

		if ( name === "find" )
			ret.selector = this.selector + (this.selector ? " " : "") + selector;
		else if ( name )
			ret.selector = this.selector + "." + name + "(" + selector + ")";

		// Return the newly-formed element set
		return ret;
	},

	// Force the current matched set of elements to become
	// the specified array of elements (destroying the stack in the process)
	// You should use pushStack() in order to do this, but maintain the stack
	setArray: function( elems ) {
		// Resetting the length to 0, then using the native Array push
		// is a super-fast way to populate an object with array-like properties
		this.length = 0;
		Array.prototype.push.apply( this, elems );

		return this;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {
		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem && elem.jquery ? elem[0] : elem
		, this );
	},

	attr: function( name, value, type ) {
		var options = name;

		// Look for the case where we're accessing a style value
		if ( typeof name === "string" )
			if ( value === undefined )
				return this[0] && jQuery[ type || "attr" ]( this[0], name );

			else {
				options = {};
				options[ name ] = value;
			}

		// Check to see if we're setting style values
		return this.each(function(i){
			// Set all the styles
			for ( name in options )
				jQuery.attr(
					type ?
						this.style :
						this,
					name, jQuery.prop( this, options[ name ], type, i, name )
				);
		});
	},

	css: function( key, value ) {
		// ignore negative width and height values
		if ( (key == 'width' || key == 'height') && parseFloat(value) < 0 )
			value = undefined;
		return this.attr( key, value, "curCSS" );
	},

	text: function( text ) {
		if ( typeof text !== "object" && text != null )
			return this.empty().append( (this[0] && this[0].ownerDocument || document).createTextNode( text ) );

		var ret = "";

		jQuery.each( text || this, function(){
			jQuery.each( this.childNodes, function(){
				if ( this.nodeType != 8 )
					ret += this.nodeType != 1 ?
						this.nodeValue :
						jQuery.fn.text( [ this ] );
			});
		});

		return ret;
	},

	wrapAll: function( html ) {
		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).clone();

			if ( this[0].parentNode )
				wrap.insertBefore( this[0] );

			wrap.map(function(){
				var elem = this;

				while ( elem.firstChild )
					elem = elem.firstChild;

				return elem;
			}).append(this);
		}

		return this;
	},

	wrapInner: function( html ) {
		return this.each(function(){
			jQuery( this ).contents().wrapAll( html );
		});
	},

	wrap: function( html ) {
		return this.each(function(){
			jQuery( this ).wrapAll( html );
		});
	},

	append: function() {
		return this.domManip(arguments, true, function(elem){
			if (this.nodeType == 1)
				this.appendChild( elem );
		});
	},

	prepend: function() {
		return this.domManip(arguments, true, function(elem){
			if (this.nodeType == 1)
				this.insertBefore( elem, this.firstChild );
		});
	},

	before: function() {
		return this.domManip(arguments, false, function(elem){
			this.parentNode.insertBefore( elem, this );
		});
	},

	after: function() {
		return this.domManip(arguments, false, function(elem){
			this.parentNode.insertBefore( elem, this.nextSibling );
		});
	},

	end: function() {
		return this.prevObject || jQuery( [] );
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: [].push,
	sort: [].sort,
	splice: [].splice,

	find: function( selector ) {
		if ( this.length === 1 ) {
			var ret = this.pushStack( [], "find", selector );
			ret.length = 0;
			jQuery.find( selector, this[0], ret );
			return ret;
		} else {
			return this.pushStack( jQuery.unique(jQuery.map(this, function(elem){
				return jQuery.find( selector, elem );
			})), "find", selector );
		}
	},

	clone: function( events ) {
		// Do the clone
		var ret = this.map(function(){
			if ( !jQuery.support.noCloneEvent && !jQuery.isXMLDoc(this) ) {
				// IE copies events bound via attachEvent when
				// using cloneNode. Calling detachEvent on the
				// clone will also remove the events from the orignal
				// In order to get around this, we use innerHTML.
				// Unfortunately, this means some modifications to
				// attributes in IE that are actually only stored
				// as properties will not be copied (such as the
				// the name attribute on an input).
				var html = this.outerHTML;
				if ( !html ) {
					var div = this.ownerDocument.createElement("div");
					div.appendChild( this.cloneNode(true) );
					html = div.innerHTML;
				}

				return jQuery.clean([html.replace(/ jQuery\d+="(?:\d+|null)"/g, "").replace(/^\s*/, "")])[0];
			} else
				return this.cloneNode(true);
		});

		// Copy the events from the original to the clone
		if ( events === true ) {
			var orig = this.find("*").andSelf(), i = 0;

			ret.find("*").andSelf().each(function(){
				if ( this.nodeName !== orig[i].nodeName )
					return;

				var events = jQuery.data( orig[i], "events" );

				for ( var type in events ) {
					for ( var handler in events[ type ] ) {
						jQuery.event.add( this, type, events[ type ][ handler ], events[ type ][ handler ].data );
					}
				}

				i++;
			});
		}

		// Return the cloned set
		return ret;
	},

	filter: function( selector ) {
		return this.pushStack(
			jQuery.isFunction( selector ) &&
			jQuery.grep(this, function(elem, i){
				return selector.call( elem, i );
			}) ||

			jQuery.multiFilter( selector, jQuery.grep(this, function(elem){
				return elem.nodeType === 1;
			}) ), "filter", selector );
	},

	closest: function( selector ) {
		var pos = jQuery.expr.match.POS.test( selector ) ? jQuery(selector) : null,
			closer = 0;

		return this.map(function(){
			var cur = this;
			while ( cur && cur.ownerDocument ) {
				if ( pos ? pos.index(cur) > -1 : jQuery(cur).is(selector) ) {
					jQuery.data(cur, "closest", closer);
					return cur;
				}
				cur = cur.parentNode;
				closer++;
			}
		});
	},

	not: function( selector ) {
		if ( typeof selector === "string" )
			// test special case where just one selector is passed in
			if ( isSimple.test( selector ) )
				return this.pushStack( jQuery.multiFilter( selector, this, true ), "not", selector );
			else
				selector = jQuery.multiFilter( selector, this );

		var isArrayLike = selector.length && selector[selector.length - 1] !== undefined && !selector.nodeType;
		return this.filter(function() {
			return isArrayLike ? jQuery.inArray( this, selector ) < 0 : this != selector;
		});
	},

	add: function( selector ) {
		return this.pushStack( jQuery.unique( jQuery.merge(
			this.get(),
			typeof selector === "string" ?
				jQuery( selector ) :
				jQuery.makeArray( selector )
		)));
	},

	is: function( selector ) {
		return !!selector && jQuery.multiFilter( selector, this ).length > 0;
	},

	hasClass: function( selector ) {
		return !!selector && this.is( "." + selector );
	},

	val: function( value ) {
		if ( value === undefined ) {			
			var elem = this[0];

			if ( elem ) {
				if( jQuery.nodeName( elem, 'option' ) )
					return (elem.attributes.value || {}).specified ? elem.value : elem.text;
				
				// We need to handle select boxes special
				if ( jQuery.nodeName( elem, "select" ) ) {
					var index = elem.selectedIndex,
						values = [],
						options = elem.options,
						one = elem.type == "select-one";

					// Nothing was selected
					if ( index < 0 )
						return null;

					// Loop through all the selected options
					for ( var i = one ? index : 0, max = one ? index + 1 : options.length; i < max; i++ ) {
						var option = options[ i ];

						if ( option.selected ) {
							// Get the specifc value for the option
							value = jQuery(option).val();

							// We don't need an array for one selects
							if ( one )
								return value;

							// Multi-Selects return an array
							values.push( value );
						}
					}

					return values;				
				}

				// Everything else, we just grab the value
				return (elem.value || "").replace(/\r/g, "");

			}

			return undefined;
		}

		if ( typeof value === "number" )
			value += '';

		return this.each(function(){
			if ( this.nodeType != 1 )
				return;

			if ( jQuery.isArray(value) && /radio|checkbox/.test( this.type ) )
				this.checked = (jQuery.inArray(this.value, value) >= 0 ||
					jQuery.inArray(this.name, value) >= 0);

			else if ( jQuery.nodeName( this, "select" ) ) {
				var values = jQuery.makeArray(value);

				jQuery( "option", this ).each(function(){
					this.selected = (jQuery.inArray( this.value, values ) >= 0 ||
						jQuery.inArray( this.text, values ) >= 0);
				});

				if ( !values.length )
					this.selectedIndex = -1;

			} else
				this.value = value;
		});
	},

	html: function( value ) {
		return value === undefined ?
			(this[0] ?
				this[0].innerHTML.replace(/ jQuery\d+="(?:\d+|null)"/g, "") :
				null) :
			this.empty().append( value );
	},

	replaceWith: function( value ) {
		return this.after( value ).remove();
	},

	eq: function( i ) {
		return this.slice( i, +i + 1 );
	},

	slice: function() {
		return this.pushStack( Array.prototype.slice.apply( this, arguments ),
			"slice", Array.prototype.slice.call(arguments).join(",") );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function(elem, i){
			return callback.call( elem, i, elem );
		}));
	},

	andSelf: function() {
		return this.add( this.prevObject );
	},

	domManip: function( args, table, callback ) {
		if ( this[0] ) {
			var fragment = (this[0].ownerDocument || this[0]).createDocumentFragment(),
				scripts = jQuery.clean( args, (this[0].ownerDocument || this[0]), fragment ),
				first = fragment.firstChild;

			if ( first )
				for ( var i = 0, l = this.length; i < l; i++ )
					callback.call( root(this[i], first), this.length > 1 || i > 0 ?
							fragment.cloneNode(true) : fragment );
		
			if ( scripts )
				jQuery.each( scripts, evalScript );
		}

		return this;
		
		function root( elem, cur ) {
			return table && jQuery.nodeName(elem, "table") && jQuery.nodeName(cur, "tr") ?
				(elem.getElementsByTagName("tbody")[0] ||
				elem.appendChild(elem.ownerDocument.createElement("tbody"))) :
				elem;
		}
	}
};

// Give the init function the jQuery prototype for later instantiation
jQuery.fn.init.prototype = jQuery.fn;

function evalScript( i, elem ) {
	if ( elem.src )
		jQuery.ajax({
			url: elem.src,
			async: false,
			dataType: "script"
		});

	else
		jQuery.globalEval( elem.text || elem.textContent || elem.innerHTML || "" );

	if ( elem.parentNode )
		elem.parentNode.removeChild( elem );
}

function now(){
	return +new Date;
}

jQuery.extend = jQuery.fn.extend = function() {
	// copy reference to target object
	var target = arguments[0] || {}, i = 1, length = arguments.length, deep = false, options;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) )
		target = {};

	// extend jQuery itself if only one argument is passed
	if ( length == i ) {
		target = this;
		--i;
	}

	for ( ; i < length; i++ )
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null )
			// Extend the base object
			for ( var name in options ) {
				var src = target[ name ], copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy )
					continue;

				// Recurse if we're merging object values
				if ( deep && copy && typeof copy === "object" && !copy.nodeType )
					target[ name ] = jQuery.extend( deep, 
						// Never move original objects, clone them
						src || ( copy.length != null ? [ ] : { } )
					, copy );

				// Don't bring in undefined values
				else if ( copy !== undefined )
					target[ name ] = copy;

			}

	// Return the modified object
	return target;
};

// exclude the following css properties to add px
var	exclude = /z-?index|font-?weight|opacity|zoom|line-?height/i,
	// cache defaultView
	defaultView = document.defaultView || {},
	toString = Object.prototype.toString;

jQuery.extend({
	noConflict: function( deep ) {
		window.$ = _$;

		if ( deep )
			window.jQuery = _jQuery;

		return jQuery;
	},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return toString.call(obj) === "[object Function]";
	},

	isArray: function( obj ) {
		return toString.call(obj) === "[object Array]";
	},

	// check if an element is in a (or is an) XML document
	isXMLDoc: function( elem ) {
		return elem.nodeType === 9 && elem.documentElement.nodeName !== "HTML" ||
			!!elem.ownerDocument && jQuery.isXMLDoc( elem.ownerDocument );
	},

	// Evalulates a script in a global context
	globalEval: function( data ) {
		if ( data && /\S/.test(data) ) {
			// Inspired by code by Andrea Giammarchi
			// http://webreflection.blogspot.com/2007/08/global-scope-evaluation-and-dom.html
			var head = document.getElementsByTagName("head")[0] || document.documentElement,
				script = document.createElement("script");

			script.type = "text/javascript";
			if ( jQuery.support.scriptEval )
				script.appendChild( document.createTextNode( data ) );
			else
				script.text = data;

			// Use insertBefore instead of appendChild  to circumvent an IE6 bug.
			// This arises when a base node is used (#2709).
			head.insertBefore( script, head.firstChild );
			head.removeChild( script );
		}
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toUpperCase() == name.toUpperCase();
	},

	// args is for internal usage only
	each: function( object, callback, args ) {
		var name, i = 0, length = object.length;

		if ( args ) {
			if ( length === undefined ) {
				for ( name in object )
					if ( callback.apply( object[ name ], args ) === false )
						break;
			} else
				for ( ; i < length; )
					if ( callback.apply( object[ i++ ], args ) === false )
						break;

		// A special, fast, case for the most common use of each
		} else {
			if ( length === undefined ) {
				for ( name in object )
					if ( callback.call( object[ name ], name, object[ name ] ) === false )
						break;
			} else
				for ( var value = object[0];
					i < length && callback.call( value, i, value ) !== false; value = object[++i] ){}
		}

		return object;
	},

	prop: function( elem, value, type, i, name ) {
		// Handle executable functions
		if ( jQuery.isFunction( value ) )
			value = value.call( elem, i );

		// Handle passing in a number to a CSS property
		return typeof value === "number" && type == "curCSS" && !exclude.test( name ) ?
			value + "px" :
			value;
	},

	className: {
		// internal only, use addClass("class")
		add: function( elem, classNames ) {
			jQuery.each((classNames || "").split(/\s+/), function(i, className){
				if ( elem.nodeType == 1 && !jQuery.className.has( elem.className, className ) )
					elem.className += (elem.className ? " " : "") + className;
			});
		},

		// internal only, use removeClass("class")
		remove: function( elem, classNames ) {
			if (elem.nodeType == 1)
				elem.className = classNames !== undefined ?
					jQuery.grep(elem.className.split(/\s+/), function(className){
						return !jQuery.className.has( classNames, className );
					}).join(" ") :
					"";
		},

		// internal only, use hasClass("class")
		has: function( elem, className ) {
			return elem && jQuery.inArray( className, (elem.className || elem).toString().split(/\s+/) ) > -1;
		}
	},

	// A method for quickly swapping in/out CSS properties to get correct calculations
	swap: function( elem, options, callback ) {
		var old = {};
		// Remember the old values, and insert the new ones
		for ( var name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		callback.call( elem );

		// Revert the old values
		for ( var name in options )
			elem.style[ name ] = old[ name ];
	},

	css: function( elem, name, force, extra ) {
		if ( name == "width" || name == "height" ) {
			var val, props = { position: "absolute", visibility: "hidden", display:"block" }, which = name == "width" ? [ "Left", "Right" ] : [ "Top", "Bottom" ];

			function getWH() {
				val = name == "width" ? elem.offsetWidth : elem.offsetHeight;

				if ( extra === "border" )
					return;

				jQuery.each( which, function() {
					if ( !extra )
						val -= parseFloat(jQuery.curCSS( elem, "padding" + this, true)) || 0;
					if ( extra === "margin" )
						val += parseFloat(jQuery.curCSS( elem, "margin" + this, true)) || 0;
					else
						val -= parseFloat(jQuery.curCSS( elem, "border" + this + "Width", true)) || 0;
				});
			}

			if ( elem.offsetWidth !== 0 )
				getWH();
			else
				jQuery.swap( elem, props, getWH );

			return Math.max(0, Math.round(val));
		}

		return jQuery.curCSS( elem, name, force );
	},

	curCSS: function( elem, name, force ) {
		var ret, style = elem.style;

		// We need to handle opacity special in IE
		if ( name == "opacity" && !jQuery.support.opacity ) {
			ret = jQuery.attr( style, "opacity" );

			return ret == "" ?
				"1" :
				ret;
		}

		// Make sure we're using the right name for getting the float value
		if ( name.match( /float/i ) )
			name = styleFloat;

		if ( !force && style && style[ name ] )
			ret = style[ name ];

		else if ( defaultView.getComputedStyle ) {

			// Only "float" is needed here
			if ( name.match( /float/i ) )
				name = "float";

			name = name.replace( /([A-Z])/g, "-$1" ).toLowerCase();

			var computedStyle = defaultView.getComputedStyle( elem, null );

			if ( computedStyle )
				ret = computedStyle.getPropertyValue( name );

			// We should always get a number back from opacity
			if ( name == "opacity" && ret == "" )
				ret = "1";

		} else if ( elem.currentStyle ) {
			var camelCase = name.replace(/\-(\w)/g, function(all, letter){
				return letter.toUpperCase();
			});

			ret = elem.currentStyle[ name ] || elem.currentStyle[ camelCase ];

			// From the awesome hack by Dean Edwards
			// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

			// If we're not dealing with a regular pixel number
			// but a number that has a weird ending, we need to convert it to pixels
			if ( !/^\d+(px)?$/i.test( ret ) && /^\d/.test( ret ) ) {
				// Remember the original values
				var left = style.left, rsLeft = elem.runtimeStyle.left;

				// Put in the new values to get a computed value out
				elem.runtimeStyle.left = elem.currentStyle.left;
				style.left = ret || 0;
				ret = style.pixelLeft + "px";

				// Revert the changed values
				style.left = left;
				elem.runtimeStyle.left = rsLeft;
			}
		}

		return ret;
	},

	clean: function( elems, context, fragment ) {
		context = context || document;

		// !context.createElement fails in IE with an error but returns typeof 'object'
		if ( typeof context.createElement === "undefined" )
			context = context.ownerDocument || context[0] && context[0].ownerDocument || document;

		// If a single string is passed in and it's a single tag
		// just do a createElement and skip the rest
		if ( !fragment && elems.length === 1 && typeof elems[0] === "string" ) {
			var match = /^<(\w+)\s*\/?>$/.exec(elems[0]);
			if ( match )
				return [ context.createElement( match[1] ) ];
		}

		var ret = [], scripts = [], div = context.createElement("div");

		jQuery.each(elems, function(i, elem){
			if ( typeof elem === "number" )
				elem += '';

			if ( !elem )
				return;

			// Convert html string into DOM nodes
			if ( typeof elem === "string" ) {
				// Fix "XHTML"-style tags in all browsers
				elem = elem.replace(/(<(\w+)[^>]*?)\/>/g, function(all, front, tag){
					return tag.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i) ?
						all :
						front + "></" + tag + ">";
				});

				// Trim whitespace, otherwise indexOf won't work as expected
				var tags = elem.replace(/^\s+/, "").substring(0, 10).toLowerCase();

				var wrap =
					// option or optgroup
					!tags.indexOf("<opt") &&
					[ 1, "<select multiple='multiple'>", "</select>" ] ||

					!tags.indexOf("<leg") &&
					[ 1, "<fieldset>", "</fieldset>" ] ||

					tags.match(/^<(thead|tbody|tfoot|colg|cap)/) &&
					[ 1, "<table>", "</table>" ] ||

					!tags.indexOf("<tr") &&
					[ 2, "<table><tbody>", "</tbody></table>" ] ||

				 	// <thead> matched above
					(!tags.indexOf("<td") || !tags.indexOf("<th")) &&
					[ 3, "<table><tbody><tr>", "</tr></tbody></table>" ] ||

					!tags.indexOf("<col") &&
					[ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ] ||

					// IE can't serialize <link> and <script> tags normally
					!jQuery.support.htmlSerialize &&
					[ 1, "div<div>", "</div>" ] ||

					[ 0, "", "" ];

				// Go to html and back, then peel off extra wrappers
				div.innerHTML = wrap[1] + elem + wrap[2];

				// Move to the right depth
				while ( wrap[0]-- )
					div = div.lastChild;

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !jQuery.support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					var hasBody = /<tbody/i.test(elem),
						tbody = !tags.indexOf("<table") && !hasBody ?
							div.firstChild && div.firstChild.childNodes :

						// String was a bare <thead> or <tfoot>
						wrap[1] == "<table>" && !hasBody ?
							div.childNodes :
							[];

					for ( var j = tbody.length - 1; j >= 0 ; --j )
						if ( jQuery.nodeName( tbody[ j ], "tbody" ) && !tbody[ j ].childNodes.length )
							tbody[ j ].parentNode.removeChild( tbody[ j ] );

					}

				// IE completely kills leading whitespace when innerHTML is used
				if ( !jQuery.support.leadingWhitespace && /^\s/.test( elem ) )
					div.insertBefore( context.createTextNode( elem.match(/^\s*/)[0] ), div.firstChild );
				
				elem = jQuery.makeArray( div.childNodes );
			}

			if ( elem.nodeType )
				ret.push( elem );
			else
				ret = jQuery.merge( ret, elem );

		});

		if ( fragment ) {
			for ( var i = 0; ret[i]; i++ ) {
				if ( jQuery.nodeName( ret[i], "script" ) && (!ret[i].type || ret[i].type.toLowerCase() === "text/javascript") ) {
					scripts.push( ret[i].parentNode ? ret[i].parentNode.removeChild( ret[i] ) : ret[i] );
				} else {
					if ( ret[i].nodeType === 1 )
						ret.splice.apply( ret, [i + 1, 0].concat(jQuery.makeArray(ret[i].getElementsByTagName("script"))) );
					fragment.appendChild( ret[i] );
				}
			}
			
			return scripts;
		}

		return ret;
	},

	attr: function( elem, name, value ) {
		// don't set attributes on text and comment nodes
		if (!elem || elem.nodeType == 3 || elem.nodeType == 8)
			return undefined;

		var notxml = !jQuery.isXMLDoc( elem ),
			// Whether we are setting (or getting)
			set = value !== undefined;

		// Try to normalize/fix the name
		name = notxml && jQuery.props[ name ] || name;

		// Only do all the following if this is a node (faster for style)
		// IE elem.getAttribute passes even for style
		if ( elem.tagName ) {

			// These attributes require special treatment
			var special = /href|src|style/.test( name );

			// Safari mis-reports the default selected property of a hidden option
			// Accessing the parent's selectedIndex property fixes it
			if ( name == "selected" && elem.parentNode )
				elem.parentNode.selectedIndex;

			// If applicable, access the attribute via the DOM 0 way
			if ( name in elem && notxml && !special ) {
				if ( set ){
					// We can't allow the type property to be changed (since it causes problems in IE)
					if ( name == "type" && jQuery.nodeName( elem, "input" ) && elem.parentNode )
						throw "type property can't be changed";

					elem[ name ] = value;
				}

				// browsers index elements by id/name on forms, give priority to attributes.
				if( jQuery.nodeName( elem, "form" ) && elem.getAttributeNode(name) )
					return elem.getAttributeNode( name ).nodeValue;

				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				if ( name == "tabIndex" ) {
					var attributeNode = elem.getAttributeNode( "tabIndex" );
					return attributeNode && attributeNode.specified
						? attributeNode.value
						: elem.nodeName.match(/(button|input|object|select|textarea)/i)
							? 0
							: elem.nodeName.match(/^(a|area)$/i) && elem.href
								? 0
								: undefined;
				}

				return elem[ name ];
			}

			if ( !jQuery.support.style && notxml &&  name == "style" )
				return jQuery.attr( elem.style, "cssText", value );

			if ( set )
				// convert the value to a string (all browsers do this but IE) see #1070
				elem.setAttribute( name, "" + value );

			var attr = !jQuery.support.hrefNormalized && notxml && special
					// Some attributes require a special call on IE
					? elem.getAttribute( name, 2 )
					: elem.getAttribute( name );

			// Non-existent attributes return null, we normalize to undefined
			return attr === null ? undefined : attr;
		}

		// elem is actually elem.style ... set the style

		// IE uses filters for opacity
		if ( !jQuery.support.opacity && name == "opacity" ) {
			if ( set ) {
				// IE has trouble with opacity if it does not have layout
				// Force it by setting the zoom level
				elem.zoom = 1;

				// Set the alpha filter to set the opacity
				elem.filter = (elem.filter || "").replace( /alpha\([^)]*\)/, "" ) +
					(parseInt( value ) + '' == "NaN" ? "" : "alpha(opacity=" + value * 100 + ")");
			}

			return elem.filter && elem.filter.indexOf("opacity=") >= 0 ?
				(parseFloat( elem.filter.match(/opacity=([^)]*)/)[1] ) / 100) + '':
				"";
		}

		name = name.replace(/-([a-z])/ig, function(all, letter){
			return letter.toUpperCase();
		});

		if ( set )
			elem[ name ] = value;

		return elem[ name ];
	},

	trim: function( text ) {
		return (text || "").replace( /^\s+|\s+$/g, "" );
	},

	makeArray: function( array ) {
		var ret = [];

		if( array != null ){
			var i = array.length;
			// The window, strings (and functions) also have 'length'
			if( i == null || typeof array === "string" || jQuery.isFunction(array) || array.setInterval )
				ret[0] = array;
			else
				while( i )
					ret[--i] = array[i];
		}

		return ret;
	},

	inArray: function( elem, array ) {
		for ( var i = 0, length = array.length; i < length; i++ )
		// Use === because on IE, window == document
			if ( array[ i ] === elem )
				return i;

		return -1;
	},

	merge: function( first, second ) {
		// We have to loop this way because IE & Opera overwrite the length
		// expando of getElementsByTagName
		var i = 0, elem, pos = first.length;
		// Also, we need to make sure that the correct elements are being returned
		// (IE returns comment nodes in a '*' query)
		if ( !jQuery.support.getAll ) {
			while ( (elem = second[ i++ ]) != null )
				if ( elem.nodeType != 8 )
					first[ pos++ ] = elem;

		} else
			while ( (elem = second[ i++ ]) != null )
				first[ pos++ ] = elem;

		return first;
	},

	unique: function( array ) {
		var ret = [], done = {};

		try {

			for ( var i = 0, length = array.length; i < length; i++ ) {
				var id = jQuery.data( array[ i ] );

				if ( !done[ id ] ) {
					done[ id ] = true;
					ret.push( array[ i ] );
				}
			}

		} catch( e ) {
			ret = array;
		}

		return ret;
	},

	grep: function( elems, callback, inv ) {
		var ret = [];

		// Go through the array, only saving the items
		// that pass the validator function
		for ( var i = 0, length = elems.length; i < length; i++ )
			if ( !inv != !callback( elems[ i ], i ) )
				ret.push( elems[ i ] );

		return ret;
	},

	map: function( elems, callback ) {
		var ret = [];

		// Go through the array, translating each of the items to their
		// new value (or values).
		for ( var i = 0, length = elems.length; i < length; i++ ) {
			var value = callback( elems[ i ], i );

			if ( value != null )
				ret[ ret.length ] = value;
		}

		return ret.concat.apply( [], ret );
	}
});

// Use of jQuery.browser is deprecated.
// It's included for backwards compatibility and plugins,
// although they should work to migrate away.

var userAgent = navigator.userAgent.toLowerCase();

// Figure out what browser is being used
jQuery.browser = {
	version: (userAgent.match( /.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/ ) || [0,'0'])[1],
	safari: /webkit/.test( userAgent ),
	opera: /opera/.test( userAgent ),
	msie: /msie/.test( userAgent ) && !/opera/.test( userAgent ),
	mozilla: /mozilla/.test( userAgent ) && !/(compatible|webkit)/.test( userAgent )
};

jQuery.each({
	parent: function(elem){return elem.parentNode;},
	parents: function(elem){return jQuery.dir(elem,"parentNode");},
	next: function(elem){return jQuery.nth(elem,2,"nextSibling");},
	prev: function(elem){return jQuery.nth(elem,2,"previousSibling");},
	nextAll: function(elem){return jQuery.dir(elem,"nextSibling");},
	prevAll: function(elem){return jQuery.dir(elem,"previousSibling");},
	siblings: function(elem){return jQuery.sibling(elem.parentNode.firstChild,elem);},
	children: function(elem){return jQuery.sibling(elem.firstChild);},
	contents: function(elem){return jQuery.nodeName(elem,"iframe")?elem.contentDocument||elem.contentWindow.document:jQuery.makeArray(elem.childNodes);}
}, function(name, fn){
	jQuery.fn[ name ] = function( selector ) {
		var ret = jQuery.map( this, fn );

		if ( selector && typeof selector == "string" )
			ret = jQuery.multiFilter( selector, ret );

		return this.pushStack( jQuery.unique( ret ), name, selector );
	};
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function(name, original){
	jQuery.fn[ name ] = function( selector ) {
		var ret = [], insert = jQuery( selector );

		for ( var i = 0, l = insert.length; i < l; i++ ) {
			var elems = (i > 0 ? this.clone(true) : this).get();
			jQuery.fn[ original ].apply( jQuery(insert[i]), elems );
			ret = ret.concat( elems );
		}

		return this.pushStack( ret, name, selector );
	};
});

jQuery.each({
	removeAttr: function( name ) {
		jQuery.attr( this, name, "" );
		if (this.nodeType == 1)
			this.removeAttribute( name );
	},

	addClass: function( classNames ) {
		jQuery.className.add( this, classNames );
	},

	removeClass: function( classNames ) {
		jQuery.className.remove( this, classNames );
	},

	toggleClass: function( classNames, state ) {
		if( typeof state !== "boolean" )
			state = !jQuery.className.has( this, classNames );
		jQuery.className[ state ? "add" : "remove" ]( this, classNames );
	},

	remove: function( selector ) {
		if ( !selector || jQuery.filter( selector, [ this ] ).length ) {
			// Prevent memory leaks
			jQuery( "*", this ).add([this]).each(function(){
				jQuery.event.remove(this);
				jQuery.removeData(this);
			});
			if (this.parentNode)
				this.parentNode.removeChild( this );
		}
	},

	empty: function() {
		// Remove element nodes and prevent memory leaks
		jQuery(this).children().remove();

		// Remove any remaining nodes
		while ( this.firstChild )
			this.removeChild( this.firstChild );
	}
}, function(name, fn){
	jQuery.fn[ name ] = function(){
		return this.each( fn, arguments );
	};
});

// Helper function used by the dimensions and offset modules
function num(elem, prop) {
	return elem[0] && parseInt( jQuery.curCSS(elem[0], prop, true), 10 ) || 0;
}
var expando = "jQuery" + now(), uuid = 0, windowData = {};

jQuery.extend({
	cache: {},

	data: function( elem, name, data ) {
		elem = elem == window ?
			windowData :
			elem;

		var id = elem[ expando ];

		// Compute a unique ID for the element
		if ( !id )
			id = elem[ expando ] = ++uuid;

		// Only generate the data cache if we're
		// trying to access or manipulate it
		if ( name && !jQuery.cache[ id ] )
			jQuery.cache[ id ] = {};

		// Prevent overriding the named cache with undefined values
		if ( data !== undefined )
			jQuery.cache[ id ][ name ] = data;

		// Return the named cache data, or the ID for the element
		return name ?
			jQuery.cache[ id ][ name ] :
			id;
	},

	removeData: function( elem, name ) {
		elem = elem == window ?
			windowData :
			elem;

		var id = elem[ expando ];

		// If we want to remove a specific section of the element's data
		if ( name ) {
			if ( jQuery.cache[ id ] ) {
				// Remove the section of cache data
				delete jQuery.cache[ id ][ name ];

				// If we've removed all the data, remove the element's cache
				name = "";

				for ( name in jQuery.cache[ id ] )
					break;

				if ( !name )
					jQuery.removeData( elem );
			}

		// Otherwise, we want to remove all of the element's data
		} else {
			// Clean up the element expando
			try {
				delete elem[ expando ];
			} catch(e){
				// IE has trouble directly removing the expando
				// but it's ok with using removeAttribute
				if ( elem.removeAttribute )
					elem.removeAttribute( expando );
			}

			// Completely remove the data cache
			delete jQuery.cache[ id ];
		}
	},
	queue: function( elem, type, data ) {
		if ( elem ){
	
			type = (type || "fx") + "queue";
	
			var q = jQuery.data( elem, type );
	
			if ( !q || jQuery.isArray(data) )
				q = jQuery.data( elem, type, jQuery.makeArray(data) );
			else if( data )
				q.push( data );
	
		}
		return q;
	},

	dequeue: function( elem, type ){
		var queue = jQuery.queue( elem, type ),
			fn = queue.shift();
		
		if( !type || type === "fx" )
			fn = queue[0];
			
		if( fn !== undefined )
			fn.call(elem);
	}
});

jQuery.fn.extend({
	data: function( key, value ){
		var parts = key.split(".");
		parts[1] = parts[1] ? "." + parts[1] : "";

		if ( value === undefined ) {
			var data = this.triggerHandler("getData" + parts[1] + "!", [parts[0]]);

			if ( data === undefined && this.length )
				data = jQuery.data( this[0], key );

			return data === undefined && parts[1] ?
				this.data( parts[0] ) :
				data;
		} else
			return this.trigger("setData" + parts[1] + "!", [parts[0], value]).each(function(){
				jQuery.data( this, key, value );
			});
	},

	removeData: function( key ){
		return this.each(function(){
			jQuery.removeData( this, key );
		});
	},
	queue: function(type, data){
		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
		}

		if ( data === undefined )
			return jQuery.queue( this[0], type );

		return this.each(function(){
			var queue = jQuery.queue( this, type, data );
			
			 if( type == "fx" && queue.length == 1 )
				queue[0].call(this);
		});
	},
	dequeue: function(type){
		return this.each(function(){
			jQuery.dequeue( this, type );
		});
	}
});/*!
 * Sizzle CSS Selector Engine - v0.9.3
 *  Copyright 2009, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function(){

var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?/g,
	done = 0,
	toString = Object.prototype.toString;

var Sizzle = function(selector, context, results, seed) {
	results = results || [];
	context = context || document;

	if ( context.nodeType !== 1 && context.nodeType !== 9 )
		return [];
	
	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	var parts = [], m, set, checkSet, check, mode, extra, prune = true;
	
	// Reset the position of the chunker regexp (start from head)
	chunker.lastIndex = 0;
	
	while ( (m = chunker.exec(selector)) !== null ) {
		parts.push( m[1] );
		
		if ( m[2] ) {
			extra = RegExp.rightContext;
			break;
		}
	}

	if ( parts.length > 1 && origPOS.exec( selector ) ) {
		if ( parts.length === 2 && Expr.relative[ parts[0] ] ) {
			set = posProcess( parts[0] + parts[1], context );
		} else {
			set = Expr.relative[ parts[0] ] ?
				[ context ] :
				Sizzle( parts.shift(), context );

			while ( parts.length ) {
				selector = parts.shift();

				if ( Expr.relative[ selector ] )
					selector += parts.shift();

				set = posProcess( selector, set );
			}
		}
	} else {
		var ret = seed ?
			{ expr: parts.pop(), set: makeArray(seed) } :
			Sizzle.find( parts.pop(), parts.length === 1 && context.parentNode ? context.parentNode : context, isXML(context) );
		set = Sizzle.filter( ret.expr, ret.set );

		if ( parts.length > 0 ) {
			checkSet = makeArray(set);
		} else {
			prune = false;
		}

		while ( parts.length ) {
			var cur = parts.pop(), pop = cur;

			if ( !Expr.relative[ cur ] ) {
				cur = "";
			} else {
				pop = parts.pop();
			}

			if ( pop == null ) {
				pop = context;
			}

			Expr.relative[ cur ]( checkSet, pop, isXML(context) );
		}
	}

	if ( !checkSet ) {
		checkSet = set;
	}

	if ( !checkSet ) {
		throw "Syntax error, unrecognized expression: " + (cur || selector);
	}

	if ( toString.call(checkSet) === "[object Array]" ) {
		if ( !prune ) {
			results.push.apply( results, checkSet );
		} else if ( context.nodeType === 1 ) {
			for ( var i = 0; checkSet[i] != null; i++ ) {
				if ( checkSet[i] && (checkSet[i] === true || checkSet[i].nodeType === 1 && contains(context, checkSet[i])) ) {
					results.push( set[i] );
				}
			}
		} else {
			for ( var i = 0; checkSet[i] != null; i++ ) {
				if ( checkSet[i] && checkSet[i].nodeType === 1 ) {
					results.push( set[i] );
				}
			}
		}
	} else {
		makeArray( checkSet, results );
	}

	if ( extra ) {
		Sizzle( extra, context, results, seed );

		if ( sortOrder ) {
			hasDuplicate = false;
			results.sort(sortOrder);

			if ( hasDuplicate ) {
				for ( var i = 1; i < results.length; i++ ) {
					if ( results[i] === results[i-1] ) {
						results.splice(i--, 1);
					}
				}
			}
		}
	}

	return results;
};

Sizzle.matches = function(expr, set){
	return Sizzle(expr, null, null, set);
};

Sizzle.find = function(expr, context, isXML){
	var set, match;

	if ( !expr ) {
		return [];
	}

	for ( var i = 0, l = Expr.order.length; i < l; i++ ) {
		var type = Expr.order[i], match;
		
		if ( (match = Expr.match[ type ].exec( expr )) ) {
			var left = RegExp.leftContext;

			if ( left.substr( left.length - 1 ) !== "\\" ) {
				match[1] = (match[1] || "").replace(/\\/g, "");
				set = Expr.find[ type ]( match, context, isXML );
				if ( set != null ) {
					expr = expr.replace( Expr.match[ type ], "" );
					break;
				}
			}
		}
	}

	if ( !set ) {
		set = context.getElementsByTagName("*");
	}

	return {set: set, expr: expr};
};

Sizzle.filter = function(expr, set, inplace, not){
	var old = expr, result = [], curLoop = set, match, anyFound,
		isXMLFilter = set && set[0] && isXML(set[0]);

	while ( expr && set.length ) {
		for ( var type in Expr.filter ) {
			if ( (match = Expr.match[ type ].exec( expr )) != null ) {
				var filter = Expr.filter[ type ], found, item;
				anyFound = false;

				if ( curLoop == result ) {
					result = [];
				}

				if ( Expr.preFilter[ type ] ) {
					match = Expr.preFilter[ type ]( match, curLoop, inplace, result, not, isXMLFilter );

					if ( !match ) {
						anyFound = found = true;
					} else if ( match === true ) {
						continue;
					}
				}

				if ( match ) {
					for ( var i = 0; (item = curLoop[i]) != null; i++ ) {
						if ( item ) {
							found = filter( item, match, i, curLoop );
							var pass = not ^ !!found;

							if ( inplace && found != null ) {
								if ( pass ) {
									anyFound = true;
								} else {
									curLoop[i] = false;
								}
							} else if ( pass ) {
								result.push( item );
								anyFound = true;
							}
						}
					}
				}

				if ( found !== undefined ) {
					if ( !inplace ) {
						curLoop = result;
					}

					expr = expr.replace( Expr.match[ type ], "" );

					if ( !anyFound ) {
						return [];
					}

					break;
				}
			}
		}

		// Improper expression
		if ( expr == old ) {
			if ( anyFound == null ) {
				throw "Syntax error, unrecognized expression: " + expr;
			} else {
				break;
			}
		}

		old = expr;
	}

	return curLoop;
};

var Expr = Sizzle.selectors = {
	order: [ "ID", "NAME", "TAG" ],
	match: {
		ID: /#((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,
		CLASS: /\.((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,
		NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF_-]|\\.)+)['"]*\]/,
		ATTR: /\[\s*((?:[\w\u00c0-\uFFFF_-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
		TAG: /^((?:[\w\u00c0-\uFFFF\*_-]|\\.)+)/,
		CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,
		POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,
		PSEUDO: /:((?:[\w\u00c0-\uFFFF_-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/
	},
	attrMap: {
		"class": "className",
		"for": "htmlFor"
	},
	attrHandle: {
		href: function(elem){
			return elem.getAttribute("href");
		}
	},
	relative: {
		"+": function(checkSet, part, isXML){
			var isPartStr = typeof part === "string",
				isTag = isPartStr && !/\W/.test(part),
				isPartStrNotTag = isPartStr && !isTag;

			if ( isTag && !isXML ) {
				part = part.toUpperCase();
			}

			for ( var i = 0, l = checkSet.length, elem; i < l; i++ ) {
				if ( (elem = checkSet[i]) ) {
					while ( (elem = elem.previousSibling) && elem.nodeType !== 1 ) {}

					checkSet[i] = isPartStrNotTag || elem && elem.nodeName === part ?
						elem || false :
						elem === part;
				}
			}

			if ( isPartStrNotTag ) {
				Sizzle.filter( part, checkSet, true );
			}
		},
		">": function(checkSet, part, isXML){
			var isPartStr = typeof part === "string";

			if ( isPartStr && !/\W/.test(part) ) {
				part = isXML ? part : part.toUpperCase();

				for ( var i = 0, l = checkSet.length; i < l; i++ ) {
					var elem = checkSet[i];
					if ( elem ) {
						var parent = elem.parentNode;
						checkSet[i] = parent.nodeName === part ? parent : false;
					}
				}
			} else {
				for ( var i = 0, l = checkSet.length; i < l; i++ ) {
					var elem = checkSet[i];
					if ( elem ) {
						checkSet[i] = isPartStr ?
							elem.parentNode :
							elem.parentNode === part;
					}
				}

				if ( isPartStr ) {
					Sizzle.filter( part, checkSet, true );
				}
			}
		},
		"": function(checkSet, part, isXML){
			var doneName = done++, checkFn = dirCheck;

			if ( !part.match(/\W/) ) {
				var nodeCheck = part = isXML ? part : part.toUpperCase();
				checkFn = dirNodeCheck;
			}

			checkFn("parentNode", part, doneName, checkSet, nodeCheck, isXML);
		},
		"~": function(checkSet, part, isXML){
			var doneName = done++, checkFn = dirCheck;

			if ( typeof part === "string" && !part.match(/\W/) ) {
				var nodeCheck = part = isXML ? part : part.toUpperCase();
				checkFn = dirNodeCheck;
			}

			checkFn("previousSibling", part, doneName, checkSet, nodeCheck, isXML);
		}
	},
	find: {
		ID: function(match, context, isXML){
			if ( typeof context.getElementById !== "undefined" && !isXML ) {
				var m = context.getElementById(match[1]);
				return m ? [m] : [];
			}
		},
		NAME: function(match, context, isXML){
			if ( typeof context.getElementsByName !== "undefined" ) {
				var ret = [], results = context.getElementsByName(match[1]);

				for ( var i = 0, l = results.length; i < l; i++ ) {
					if ( results[i].getAttribute("name") === match[1] ) {
						ret.push( results[i] );
					}
				}

				return ret.length === 0 ? null : ret;
			}
		},
		TAG: function(match, context){
			return context.getElementsByTagName(match[1]);
		}
	},
	preFilter: {
		CLASS: function(match, curLoop, inplace, result, not, isXML){
			match = " " + match[1].replace(/\\/g, "") + " ";

			if ( isXML ) {
				return match;
			}

			for ( var i = 0, elem; (elem = curLoop[i]) != null; i++ ) {
				if ( elem ) {
					if ( not ^ (elem.className && (" " + elem.className + " ").indexOf(match) >= 0) ) {
						if ( !inplace )
							result.push( elem );
					} else if ( inplace ) {
						curLoop[i] = false;
					}
				}
			}

			return false;
		},
		ID: function(match){
			return match[1].replace(/\\/g, "");
		},
		TAG: function(match, curLoop){
			for ( var i = 0; curLoop[i] === false; i++ ){}
			return curLoop[i] && isXML(curLoop[i]) ? match[1] : match[1].toUpperCase();
		},
		CHILD: function(match){
			if ( match[1] == "nth" ) {
				// parse equations like 'even', 'odd', '5', '2n', '3n+2', '4n-1', '-n+6'
				var test = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(
					match[2] == "even" && "2n" || match[2] == "odd" && "2n+1" ||
					!/\D/.test( match[2] ) && "0n+" + match[2] || match[2]);

				// calculate the numbers (first)n+(last) including if they are negative
				match[2] = (test[1] + (test[2] || 1)) - 0;
				match[3] = test[3] - 0;
			}

			// TODO: Move to normal caching system
			match[0] = done++;

			return match;
		},
		ATTR: function(match, curLoop, inplace, result, not, isXML){
			var name = match[1].replace(/\\/g, "");
			
			if ( !isXML && Expr.attrMap[name] ) {
				match[1] = Expr.attrMap[name];
			}

			if ( match[2] === "~=" ) {
				match[4] = " " + match[4] + " ";
			}

			return match;
		},
		PSEUDO: function(match, curLoop, inplace, result, not){
			if ( match[1] === "not" ) {
				// If we're dealing with a complex expression, or a simple one
				if ( match[3].match(chunker).length > 1 || /^\w/.test(match[3]) ) {
					match[3] = Sizzle(match[3], null, null, curLoop);
				} else {
					var ret = Sizzle.filter(match[3], curLoop, inplace, true ^ not);
					if ( !inplace ) {
						result.push.apply( result, ret );
					}
					return false;
				}
			} else if ( Expr.match.POS.test( match[0] ) || Expr.match.CHILD.test( match[0] ) ) {
				return true;
			}
			
			return match;
		},
		POS: function(match){
			match.unshift( true );
			return match;
		}
	},
	filters: {
		enabled: function(elem){
			return elem.disabled === false && elem.type !== "hidden";
		},
		disabled: function(elem){
			return elem.disabled === true;
		},
		checked: function(elem){
			return elem.checked === true;
		},
		selected: function(elem){
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			elem.parentNode.selectedIndex;
			return elem.selected === true;
		},
		parent: function(elem){
			return !!elem.firstChild;
		},
		empty: function(elem){
			return !elem.firstChild;
		},
		has: function(elem, i, match){
			return !!Sizzle( match[3], elem ).length;
		},
		header: function(elem){
			return /h\d/i.test( elem.nodeName );
		},
		text: function(elem){
			return "text" === elem.type;
		},
		radio: function(elem){
			return "radio" === elem.type;
		},
		checkbox: function(elem){
			return "checkbox" === elem.type;
		},
		file: function(elem){
			return "file" === elem.type;
		},
		password: function(elem){
			return "password" === elem.type;
		},
		submit: function(elem){
			return "submit" === elem.type;
		},
		image: function(elem){
			return "image" === elem.type;
		},
		reset: function(elem){
			return "reset" === elem.type;
		},
		button: function(elem){
			return "button" === elem.type || elem.nodeName.toUpperCase() === "BUTTON";
		},
		input: function(elem){
			return /input|select|textarea|button/i.test(elem.nodeName);
		}
	},
	setFilters: {
		first: function(elem, i){
			return i === 0;
		},
		last: function(elem, i, match, array){
			return i === array.length - 1;
		},
		even: function(elem, i){
			return i % 2 === 0;
		},
		odd: function(elem, i){
			return i % 2 === 1;
		},
		lt: function(elem, i, match){
			return i < match[3] - 0;
		},
		gt: function(elem, i, match){
			return i > match[3] - 0;
		},
		nth: function(elem, i, match){
			return match[3] - 0 == i;
		},
		eq: function(elem, i, match){
			return match[3] - 0 == i;
		}
	},
	filter: {
		PSEUDO: function(elem, match, i, array){
			var name = match[1], filter = Expr.filters[ name ];

			if ( filter ) {
				return filter( elem, i, match, array );
			} else if ( name === "contains" ) {
				return (elem.textContent || elem.innerText || "").indexOf(match[3]) >= 0;
			} else if ( name === "not" ) {
				var not = match[3];

				for ( var i = 0, l = not.length; i < l; i++ ) {
					if ( not[i] === elem ) {
						return false;
					}
				}

				return true;
			}
		},
		CHILD: function(elem, match){
			var type = match[1], node = elem;
			switch (type) {
				case 'only':
				case 'first':
					while (node = node.previousSibling)  {
						if ( node.nodeType === 1 ) return false;
					}
					if ( type == 'first') return true;
					node = elem;
				case 'last':
					while (node = node.nextSibling)  {
						if ( node.nodeType === 1 ) return false;
					}
					return true;
				case 'nth':
					var first = match[2], last = match[3];

					if ( first == 1 && last == 0 ) {
						return true;
					}
					
					var doneName = match[0],
						parent = elem.parentNode;
	
					if ( parent && (parent.sizcache !== doneName || !elem.nodeIndex) ) {
						var count = 0;
						for ( node = parent.firstChild; node; node = node.nextSibling ) {
							if ( node.nodeType === 1 ) {
								node.nodeIndex = ++count;
							}
						} 
						parent.sizcache = doneName;
					}
					
					var diff = elem.nodeIndex - last;
					if ( first == 0 ) {
						return diff == 0;
					} else {
						return ( diff % first == 0 && diff / first >= 0 );
					}
			}
		},
		ID: function(elem, match){
			return elem.nodeType === 1 && elem.getAttribute("id") === match;
		},
		TAG: function(elem, match){
			return (match === "*" && elem.nodeType === 1) || elem.nodeName === match;
		},
		CLASS: function(elem, match){
			return (" " + (elem.className || elem.getAttribute("class")) + " ")
				.indexOf( match ) > -1;
		},
		ATTR: function(elem, match){
			var name = match[1],
				result = Expr.attrHandle[ name ] ?
					Expr.attrHandle[ name ]( elem ) :
					elem[ name ] != null ?
						elem[ name ] :
						elem.getAttribute( name ),
				value = result + "",
				type = match[2],
				check = match[4];

			return result == null ?
				type === "!=" :
				type === "=" ?
				value === check :
				type === "*=" ?
				value.indexOf(check) >= 0 :
				type === "~=" ?
				(" " + value + " ").indexOf(check) >= 0 :
				!check ?
				value && result !== false :
				type === "!=" ?
				value != check :
				type === "^=" ?
				value.indexOf(check) === 0 :
				type === "$=" ?
				value.substr(value.length - check.length) === check :
				type === "|=" ?
				value === check || value.substr(0, check.length + 1) === check + "-" :
				false;
		},
		POS: function(elem, match, i, array){
			var name = match[2], filter = Expr.setFilters[ name ];

			if ( filter ) {
				return filter( elem, i, match, array );
			}
		}
	}
};

var origPOS = Expr.match.POS;

for ( var type in Expr.match ) {
	Expr.match[ type ] = RegExp( Expr.match[ type ].source + /(?![^\[]*\])(?![^\(]*\))/.source );
}

var makeArray = function(array, results) {
	array = Array.prototype.slice.call( array );

	if ( results ) {
		results.push.apply( results, array );
		return results;
	}
	
	return array;
};

// Perform a simple check to determine if the browser is capable of
// converting a NodeList to an array using builtin methods.
try {
	Array.prototype.slice.call( document.documentElement.childNodes );

// Provide a fallback method if it does not work
} catch(e){
	makeArray = function(array, results) {
		var ret = results || [];

		if ( toString.call(array) === "[object Array]" ) {
			Array.prototype.push.apply( ret, array );
		} else {
			if ( typeof array.length === "number" ) {
				for ( var i = 0, l = array.length; i < l; i++ ) {
					ret.push( array[i] );
				}
			} else {
				for ( var i = 0; array[i]; i++ ) {
					ret.push( array[i] );
				}
			}
		}

		return ret;
	};
}

var sortOrder;

if ( document.documentElement.compareDocumentPosition ) {
	sortOrder = function( a, b ) {
		var ret = a.compareDocumentPosition(b) & 4 ? -1 : a === b ? 0 : 1;
		if ( ret === 0 ) {
			hasDuplicate = true;
		}
		return ret;
	};
} else if ( "sourceIndex" in document.documentElement ) {
	sortOrder = function( a, b ) {
		var ret = a.sourceIndex - b.sourceIndex;
		if ( ret === 0 ) {
			hasDuplicate = true;
		}
		return ret;
	};
} else if ( document.createRange ) {
	sortOrder = function( a, b ) {
		var aRange = a.ownerDocument.createRange(), bRange = b.ownerDocument.createRange();
		aRange.selectNode(a);
		aRange.collapse(true);
		bRange.selectNode(b);
		bRange.collapse(true);
		var ret = aRange.compareBoundaryPoints(Range.START_TO_END, bRange);
		if ( ret === 0 ) {
			hasDuplicate = true;
		}
		return ret;
	};
}

// Check to see if the browser returns elements by name when
// querying by getElementById (and provide a workaround)
(function(){
	// We're going to inject a fake input element with a specified name
	var form = document.createElement("form"),
		id = "script" + (new Date).getTime();
	form.innerHTML = "<input name='" + id + "'/>";

	// Inject it into the root element, check its status, and remove it quickly
	var root = document.documentElement;
	root.insertBefore( form, root.firstChild );

	// The workaround has to do additional checks after a getElementById
	// Which slows things down for other browsers (hence the branching)
	if ( !!document.getElementById( id ) ) {
		Expr.find.ID = function(match, context, isXML){
			if ( typeof context.getElementById !== "undefined" && !isXML ) {
				var m = context.getElementById(match[1]);
				return m ? m.id === match[1] || typeof m.getAttributeNode !== "undefined" && m.getAttributeNode("id").nodeValue === match[1] ? [m] : undefined : [];
			}
		};

		Expr.filter.ID = function(elem, match){
			var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
			return elem.nodeType === 1 && node && node.nodeValue === match;
		};
	}

	root.removeChild( form );
})();

(function(){
	// Check to see if the browser returns only elements
	// when doing getElementsByTagName("*")

	// Create a fake element
	var div = document.createElement("div");
	div.appendChild( document.createComment("") );

	// Make sure no comments are found
	if ( div.getElementsByTagName("*").length > 0 ) {
		Expr.find.TAG = function(match, context){
			var results = context.getElementsByTagName(match[1]);

			// Filter out possible comments
			if ( match[1] === "*" ) {
				var tmp = [];

				for ( var i = 0; results[i]; i++ ) {
					if ( results[i].nodeType === 1 ) {
						tmp.push( results[i] );
					}
				}

				results = tmp;
			}

			return results;
		};
	}

	// Check to see if an attribute returns normalized href attributes
	div.innerHTML = "<a href='#'></a>";
	if ( div.firstChild && typeof div.firstChild.getAttribute !== "undefined" &&
			div.firstChild.getAttribute("href") !== "#" ) {
		Expr.attrHandle.href = function(elem){
			return elem.getAttribute("href", 2);
		};
	}
})();

if ( document.querySelectorAll ) (function(){
	var oldSizzle = Sizzle, div = document.createElement("div");
	div.innerHTML = "<p class='TEST'></p>";

	// Safari can't handle uppercase or unicode characters when
	// in quirks mode.
	if ( div.querySelectorAll && div.querySelectorAll(".TEST").length === 0 ) {
		return;
	}
	
	Sizzle = function(query, context, extra, seed){
		context = context || document;

		// Only use querySelectorAll on non-XML documents
		// (ID selectors don't work in non-HTML documents)
		if ( !seed && context.nodeType === 9 && !isXML(context) ) {
			try {
				return makeArray( context.querySelectorAll(query), extra );
			} catch(e){}
		}
		
		return oldSizzle(query, context, extra, seed);
	};

	Sizzle.find = oldSizzle.find;
	Sizzle.filter = oldSizzle.filter;
	Sizzle.selectors = oldSizzle.selectors;
	Sizzle.matches = oldSizzle.matches;
})();

if ( document.getElementsByClassName && document.documentElement.getElementsByClassName ) (function(){
	var div = document.createElement("div");
	div.innerHTML = "<div class='test e'></div><div class='test'></div>";

	// Opera can't find a second classname (in 9.6)
	if ( div.getElementsByClassName("e").length === 0 )
		return;

	// Safari caches class attributes, doesn't catch changes (in 3.2)
	div.lastChild.className = "e";

	if ( div.getElementsByClassName("e").length === 1 )
		return;

	Expr.order.splice(1, 0, "CLASS");
	Expr.find.CLASS = function(match, context, isXML) {
		if ( typeof context.getElementsByClassName !== "undefined" && !isXML ) {
			return context.getElementsByClassName(match[1]);
		}
	};
})();

function dirNodeCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
	var sibDir = dir == "previousSibling" && !isXML;
	for ( var i = 0, l = checkSet.length; i < l; i++ ) {
		var elem = checkSet[i];
		if ( elem ) {
			if ( sibDir && elem.nodeType === 1 ){
				elem.sizcache = doneName;
				elem.sizset = i;
			}
			elem = elem[dir];
			var match = false;

			while ( elem ) {
				if ( elem.sizcache === doneName ) {
					match = checkSet[elem.sizset];
					break;
				}

				if ( elem.nodeType === 1 && !isXML ){
					elem.sizcache = doneName;
					elem.sizset = i;
				}

				if ( elem.nodeName === cur ) {
					match = elem;
					break;
				}

				elem = elem[dir];
			}

			checkSet[i] = match;
		}
	}
}

function dirCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
	var sibDir = dir == "previousSibling" && !isXML;
	for ( var i = 0, l = checkSet.length; i < l; i++ ) {
		var elem = checkSet[i];
		if ( elem ) {
			if ( sibDir && elem.nodeType === 1 ) {
				elem.sizcache = doneName;
				elem.sizset = i;
			}
			elem = elem[dir];
			var match = false;

			while ( elem ) {
				if ( elem.sizcache === doneName ) {
					match = checkSet[elem.sizset];
					break;
				}

				if ( elem.nodeType === 1 ) {
					if ( !isXML ) {
						elem.sizcache = doneName;
						elem.sizset = i;
					}
					if ( typeof cur !== "string" ) {
						if ( elem === cur ) {
							match = true;
							break;
						}

					} else if ( Sizzle.filter( cur, [elem] ).length > 0 ) {
						match = elem;
						break;
					}
				}

				elem = elem[dir];
			}

			checkSet[i] = match;
		}
	}
}

var contains = document.compareDocumentPosition ?  function(a, b){
	return a.compareDocumentPosition(b) & 16;
} : function(a, b){
	return a !== b && (a.contains ? a.contains(b) : true);
};

var isXML = function(elem){
	return elem.nodeType === 9 && elem.documentElement.nodeName !== "HTML" ||
		!!elem.ownerDocument && isXML( elem.ownerDocument );
};

var posProcess = function(selector, context){
	var tmpSet = [], later = "", match,
		root = context.nodeType ? [context] : context;

	// Position selectors must be done after the filter
	// And so must :not(positional) so we move all PSEUDOs to the end
	while ( (match = Expr.match.PSEUDO.exec( selector )) ) {
		later += match[0];
		selector = selector.replace( Expr.match.PSEUDO, "" );
	}

	selector = Expr.relative[selector] ? selector + "*" : selector;

	for ( var i = 0, l = root.length; i < l; i++ ) {
		Sizzle( selector, root[i], tmpSet );
	}

	return Sizzle.filter( later, tmpSet );
};

// EXPOSE
jQuery.find = Sizzle;
jQuery.filter = Sizzle.filter;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.filters;

Sizzle.selectors.filters.hidden = function(elem){
	return elem.offsetWidth === 0 || elem.offsetHeight === 0;
};

Sizzle.selectors.filters.visible = function(elem){
	return elem.offsetWidth > 0 || elem.offsetHeight > 0;
};

Sizzle.selectors.filters.animated = function(elem){
	return jQuery.grep(jQuery.timers, function(fn){
		return elem === fn.elem;
	}).length;
};

jQuery.multiFilter = function( expr, elems, not ) {
	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return Sizzle.matches(expr, elems);
};

jQuery.dir = function( elem, dir ){
	var matched = [], cur = elem[dir];
	while ( cur && cur != document ) {
		if ( cur.nodeType == 1 )
			matched.push( cur );
		cur = cur[dir];
	}
	return matched;
};

jQuery.nth = function(cur, result, dir, elem){
	result = result || 1;
	var num = 0;

	for ( ; cur; cur = cur[dir] )
		if ( cur.nodeType == 1 && ++num == result )
			break;

	return cur;
};

jQuery.sibling = function(n, elem){
	var r = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType == 1 && n != elem )
			r.push( n );
	}

	return r;
};

return;

window.Sizzle = Sizzle;

})();
/*
 * A number of helper functions used for managing events.
 * Many of the ideas behind this code originated from
 * Dean Edwards' addEvent library.
 */
jQuery.event = {

	// Bind an event to an element
	// Original by Dean Edwards
	add: function(elem, types, handler, data) {
		if ( elem.nodeType == 3 || elem.nodeType == 8 )
			return;

		// For whatever reason, IE has trouble passing the window object
		// around, causing it to be cloned in the process
		if ( elem.setInterval && elem != window )
			elem = window;

		// Make sure that the function being executed has a unique ID
		if ( !handler.guid )
			handler.guid = this.guid++;

		// if data is passed, bind to handler
		if ( data !== undefined ) {
			// Create temporary function pointer to original handler
			var fn = handler;

			// Create unique handler function, wrapped around original handler
			handler = this.proxy( fn );

			// Store data in unique handler
			handler.data = data;
		}

		// Init the element's event structure
		var events = jQuery.data(elem, "events") || jQuery.data(elem, "events", {}),
			handle = jQuery.data(elem, "handle") || jQuery.data(elem, "handle", function(){
				// Handle the second event of a trigger and when
				// an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && !jQuery.event.triggered ?
					jQuery.event.handle.apply(arguments.callee.elem, arguments) :
					undefined;
			});
		// Add elem as a property of the handle function
		// This is to prevent a memory leak with non-native
		// event in IE.
		handle.elem = elem;

		// Handle multiple events separated by a space
		// jQuery(...).bind("mouseover mouseout", fn);
		jQuery.each(types.split(/\s+/), function(index, type) {
			// Namespaced event handlers
			var namespaces = type.split(".");
			type = namespaces.shift();
			handler.type = namespaces.slice().sort().join(".");

			// Get the current list of functions bound to this event
			var handlers = events[type];
			
			if ( jQuery.event.specialAll[type] )
				jQuery.event.specialAll[type].setup.call(elem, data, namespaces);

			// Init the event handler queue
			if (!handlers) {
				handlers = events[type] = {};

				// Check for a special event handler
				// Only use addEventListener/attachEvent if the special
				// events handler returns false
				if ( !jQuery.event.special[type] || jQuery.event.special[type].setup.call(elem, data, namespaces) === false ) {
					// Bind the global event handler to the element
					if (elem.addEventListener)
						elem.addEventListener(type, handle, false);
					else if (elem.attachEvent)
						elem.attachEvent("on" + type, handle);
				}
			}

			// Add the function to the element's handler list
			handlers[handler.guid] = handler;

			// Keep track of which events have been used, for global triggering
			jQuery.event.global[type] = true;
		});

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	guid: 1,
	global: {},

	// Detach an event or set of events from an element
	remove: function(elem, types, handler) {
		// don't do events on text and comment nodes
		if ( elem.nodeType == 3 || elem.nodeType == 8 )
			return;

		var events = jQuery.data(elem, "events"), ret, index;

		if ( events ) {
			// Unbind all events for the element
			if ( types === undefined || (typeof types === "string" && types.charAt(0) == ".") )
				for ( var type in events )
					this.remove( elem, type + (types || "") );
			else {
				// types is actually an event object here
				if ( types.type ) {
					handler = types.handler;
					types = types.type;
				}

				// Handle multiple events seperated by a space
				// jQuery(...).unbind("mouseover mouseout", fn);
				jQuery.each(types.split(/\s+/), function(index, type){
					// Namespaced event handlers
					var namespaces = type.split(".");
					type = namespaces.shift();
					var namespace = RegExp("(^|\\.)" + namespaces.slice().sort().join(".*\\.") + "(\\.|$)");

					if ( events[type] ) {
						// remove the given handler for the given type
						if ( handler )
							delete events[type][handler.guid];

						// remove all handlers for the given type
						else
							for ( var handle in events[type] )
								// Handle the removal of namespaced events
								if ( namespace.test(events[type][handle].type) )
									delete events[type][handle];
									
						if ( jQuery.event.specialAll[type] )
							jQuery.event.specialAll[type].teardown.call(elem, namespaces);

						// remove generic event handler if no more handlers exist
						for ( ret in events[type] ) break;
						if ( !ret ) {
							if ( !jQuery.event.special[type] || jQuery.event.special[type].teardown.call(elem, namespaces) === false ) {
								if (elem.removeEventListener)
									elem.removeEventListener(type, jQuery.data(elem, "handle"), false);
								else if (elem.detachEvent)
									elem.detachEvent("on" + type, jQuery.data(elem, "handle"));
							}
							ret = null;
							delete events[type];
						}
					}
				});
			}

			// Remove the expando if it's no longer used
			for ( ret in events ) break;
			if ( !ret ) {
				var handle = jQuery.data( elem, "handle" );
				if ( handle ) handle.elem = null;
				jQuery.removeData( elem, "events" );
				jQuery.removeData( elem, "handle" );
			}
		}
	},

	// bubbling is internal
	trigger: function( event, data, elem, bubbling ) {
		// Event object or event type
		var type = event.type || event;

		if( !bubbling ){
			event = typeof event === "object" ?
				// jQuery.Event object
				event[expando] ? event :
				// Object literal
				jQuery.extend( jQuery.Event(type), event ) :
				// Just the event type (string)
				jQuery.Event(type);

			if ( type.indexOf("!") >= 0 ) {
				event.type = type = type.slice(0, -1);
				event.exclusive = true;
			}

			// Handle a global trigger
			if ( !elem ) {
				// Don't bubble custom events when global (to avoid too much overhead)
				event.stopPropagation();
				// Only trigger if we've ever bound an event for it
				if ( this.global[type] )
					jQuery.each( jQuery.cache, function(){
						if ( this.events && this.events[type] )
							jQuery.event.trigger( event, data, this.handle.elem );
					});
			}

			// Handle triggering a single element

			// don't do events on text and comment nodes
			if ( !elem || elem.nodeType == 3 || elem.nodeType == 8 )
				return undefined;
			
			// Clean up in case it is reused
			event.result = undefined;
			event.target = elem;
			
			// Clone the incoming data, if any
			data = jQuery.makeArray(data);
			data.unshift( event );
		}

		event.currentTarget = elem;

		// Trigger the event, it is assumed that "handle" is a function
		var handle = jQuery.data(elem, "handle");
		if ( handle )
			handle.apply( elem, data );

		// Handle triggering native .onfoo handlers (and on links since we don't call .click() for links)
		if ( (!elem[type] || (jQuery.nodeName(elem, 'a') && type == "click")) && elem["on"+type] && elem["on"+type].apply( elem, data ) === false )
			event.result = false;

		// Trigger the native events (except for clicks on links)
		if ( !bubbling && elem[type] && !event.isDefaultPrevented() && !(jQuery.nodeName(elem, 'a') && type == "click") ) {
			this.triggered = true;
			try {
				elem[ type ]();
			// prevent IE from throwing an error for some hidden elements
			} catch (e) {}
		}

		this.triggered = false;

		if ( !event.isPropagationStopped() ) {
			var parent = elem.parentNode || elem.ownerDocument;
			if ( parent )
				jQuery.event.trigger(event, data, parent, true);
		}
	},

	handle: function(event) {
		// returned undefined or false
		var all, handlers;

		event = arguments[0] = jQuery.event.fix( event || window.event );
		event.currentTarget = this;
		
		// Namespaced event handlers
		var namespaces = event.type.split(".");
		event.type = namespaces.shift();

		// Cache this now, all = true means, any handler
		all = !namespaces.length && !event.exclusive;
		
		var namespace = RegExp("(^|\\.)" + namespaces.slice().sort().join(".*\\.") + "(\\.|$)");

		handlers = ( jQuery.data(this, "events") || {} )[event.type];

		for ( var j in handlers ) {
			var handler = handlers[j];

			// Filter the functions by class
			if ( all || namespace.test(handler.type) ) {
				// Pass in a reference to the handler function itself
				// So that we can later remove it
				event.handler = handler;
				event.data = handler.data;

				var ret = handler.apply(this, arguments);

				if( ret !== undefined ){
					event.result = ret;
					if ( ret === false ) {
						event.preventDefault();
						event.stopPropagation();
					}
				}

				if( event.isImmediatePropagationStopped() )
					break;

			}
		}
	},

	props: "altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),

	fix: function(event) {
		if ( event[expando] )
			return event;

		// store a copy of the original event object
		// and "clone" to set read-only properties
		var originalEvent = event;
		event = jQuery.Event( originalEvent );

		for ( var i = this.props.length, prop; i; ){
			prop = this.props[ --i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Fix target property, if necessary
		if ( !event.target )
			event.target = event.srcElement || document; // Fixes #1925 where srcElement might not be defined either

		// check if target is a textnode (safari)
		if ( event.target.nodeType == 3 )
			event.target = event.target.parentNode;

		// Add relatedTarget, if necessary
		if ( !event.relatedTarget && event.fromElement )
			event.relatedTarget = event.fromElement == event.target ? event.toElement : event.fromElement;

		// Calculate pageX/Y if missing and clientX/Y available
		if ( event.pageX == null && event.clientX != null ) {
			var doc = document.documentElement, body = document.body;
			event.pageX = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc.clientLeft || 0);
			event.pageY = event.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc.clientTop || 0);
		}

		// Add which for key events
		if ( !event.which && ((event.charCode || event.charCode === 0) ? event.charCode : event.keyCode) )
			event.which = event.charCode || event.keyCode;

		// Add metaKey to non-Mac browsers (use ctrl for PC's and Meta for Macs)
		if ( !event.metaKey && event.ctrlKey )
			event.metaKey = event.ctrlKey;

		// Add which for click: 1 == left; 2 == middle; 3 == right
		// Note: button is not normalized, so don't use it
		if ( !event.which && event.button )
			event.which = (event.button & 1 ? 1 : ( event.button & 2 ? 3 : ( event.button & 4 ? 2 : 0 ) ));

		return event;
	},

	proxy: function( fn, proxy ){
		proxy = proxy || function(){ return fn.apply(this, arguments); };
		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || proxy.guid || this.guid++;
		// So proxy can be declared as an argument
		return proxy;
	},

	special: {
		ready: {
			// Make sure the ready event is setup
			setup: bindReady,
			teardown: function() {}
		}
	},
	
	specialAll: {
		live: {
			setup: function( selector, namespaces ){
				jQuery.event.add( this, namespaces[0], liveHandler );
			},
			teardown:  function( namespaces ){
				if ( namespaces.length ) {
					var remove = 0, name = RegExp("(^|\\.)" + namespaces[0] + "(\\.|$)");
					
					jQuery.each( (jQuery.data(this, "events").live || {}), function(){
						if ( name.test(this.type) )
							remove++;
					});
					
					if ( remove < 1 )
						jQuery.event.remove( this, namespaces[0], liveHandler );
				}
			}
		}
	}
};

jQuery.Event = function( src ){
	// Allow instantiation without the 'new' keyword
	if( !this.preventDefault )
		return new jQuery.Event(src);
	
	// Event object
	if( src && src.type ){
		this.originalEvent = src;
		this.type = src.type;
	// Event type
	}else
		this.type = src;

	// timeStamp is buggy for some events on Firefox(#3843)
	// So we won't rely on the native value
	this.timeStamp = now();
	
	// Mark it as fixed
	this[expando] = true;
};

function returnFalse(){
	return false;
}
function returnTrue(){
	return true;
}

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	preventDefault: function() {
		this.isDefaultPrevented = returnTrue;

		var e = this.originalEvent;
		if( !e )
			return;
		// if preventDefault exists run it on the original event
		if (e.preventDefault)
			e.preventDefault();
		// otherwise set the returnValue property of the original event to false (IE)
		e.returnValue = false;
	},
	stopPropagation: function() {
		this.isPropagationStopped = returnTrue;

		var e = this.originalEvent;
		if( !e )
			return;
		// if stopPropagation exists run it on the original event
		if (e.stopPropagation)
			e.stopPropagation();
		// otherwise set the cancelBubble property of the original event to true (IE)
		e.cancelBubble = true;
	},
	stopImmediatePropagation:function(){
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation();
	},
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse
};
// Checks if an event happened on an element within another element
// Used in jQuery.event.special.mouseenter and mouseleave handlers
var withinElement = function(event) {
	// Check if mouse(over|out) are still within the same parent element
	var parent = event.relatedTarget;
	// Traverse up the tree
	while ( parent && parent != this )
		try { parent = parent.parentNode; }
		catch(e) { parent = this; }
	
	if( parent != this ){
		// set the correct event type
		event.type = event.data;
		// handle event if we actually just moused on to a non sub-element
		jQuery.event.handle.apply( this, arguments );
	}
};
	
jQuery.each({ 
	mouseover: 'mouseenter', 
	mouseout: 'mouseleave'
}, function( orig, fix ){
	jQuery.event.special[ fix ] = {
		setup: function(){
			jQuery.event.add( this, orig, withinElement, fix );
		},
		teardown: function(){
			jQuery.event.remove( this, orig, withinElement );
		}
	};			   
});

jQuery.fn.extend({
	bind: function( type, data, fn ) {
		return type == "unload" ? this.one(type, data, fn) : this.each(function(){
			jQuery.event.add( this, type, fn || data, fn && data );
		});
	},

	one: function( type, data, fn ) {
		var one = jQuery.event.proxy( fn || data, function(event) {
			jQuery(this).unbind(event, one);
			return (fn || data).apply( this, arguments );
		});
		return this.each(function(){
			jQuery.event.add( this, type, one, fn && data);
		});
	},

	unbind: function( type, fn ) {
		return this.each(function(){
			jQuery.event.remove( this, type, fn );
		});
	},

	trigger: function( type, data ) {
		return this.each(function(){
			jQuery.event.trigger( type, data, this );
		});
	},

	triggerHandler: function( type, data ) {
		if( this[0] ){
			var event = jQuery.Event(type);
			event.preventDefault();
			event.stopPropagation();
			jQuery.event.trigger( event, data, this[0] );
			return event.result;
		}		
	},

	toggle: function( fn ) {
		// Save reference to arguments for access in closure
		var args = arguments, i = 1;

		// link all the functions, so any of them can unbind this click handler
		while( i < args.length )
			jQuery.event.proxy( fn, args[i++] );

		return this.click( jQuery.event.proxy( fn, function(event) {
			// Figure out which function to execute
			this.lastToggle = ( this.lastToggle || 0 ) % i;

			// Make sure that clicks stop
			event.preventDefault();

			// and execute the function
			return args[ this.lastToggle++ ].apply( this, arguments ) || false;
		}));
	},

	hover: function(fnOver, fnOut) {
		return this.mouseenter(fnOver).mouseleave(fnOut);
	},

	ready: function(fn) {
		// Attach the listeners
		bindReady();

		// If the DOM is already ready
		if ( jQuery.isReady )
			// Execute the function immediately
			fn.call( document, jQuery );

		// Otherwise, remember the function for later
		else
			// Add the function to the wait list
			jQuery.readyList.push( fn );

		return this;
	},
	
	live: function( type, fn ){
		var proxy = jQuery.event.proxy( fn );
		proxy.guid += this.selector + type;

		jQuery(document).bind( liveConvert(type, this.selector), this.selector, proxy );

		return this;
	},
	
	die: function( type, fn ){
		jQuery(document).unbind( liveConvert(type, this.selector), fn ? { guid: fn.guid + this.selector + type } : null );
		return this;
	}
});

function liveHandler( event ){
	var check = RegExp("(^|\\.)" + event.type + "(\\.|$)"),
		stop = true,
		elems = [];

	jQuery.each(jQuery.data(this, "events").live || [], function(i, fn){
		if ( check.test(fn.type) ) {
			var elem = jQuery(event.target).closest(fn.data)[0];
			if ( elem )
				elems.push({ elem: elem, fn: fn });
		}
	});

	elems.sort(function(a,b) {
		return jQuery.data(a.elem, "closest") - jQuery.data(b.elem, "closest");
	});
	
	jQuery.each(elems, function(){
		if ( this.fn.call(this.elem, event, this.fn.data) === false )
			return (stop = false);
	});

	return stop;
}

function liveConvert(type, selector){
	return ["live", type, selector.replace(/\./g, "`").replace(/ /g, "|")].join(".");
}

jQuery.extend({
	isReady: false,
	readyList: [],
	// Handle when the DOM is ready
	ready: function() {
		// Make sure that the DOM is not already loaded
		if ( !jQuery.isReady ) {
			// Remember that the DOM is ready
			jQuery.isReady = true;

			// If there are functions bound, to execute
			if ( jQuery.readyList ) {
				// Execute all of them
				jQuery.each( jQuery.readyList, function(){
					this.call( document, jQuery );
				});

				// Reset the list of functions
				jQuery.readyList = null;
			}

			// Trigger any bound ready events
			jQuery(document).triggerHandler("ready");
		}
	}
});

var readyBound = false;

function bindReady(){
	if ( readyBound ) return;
	readyBound = true;

	// Mozilla, Opera and webkit nightlies currently support this event
	if ( document.addEventListener ) {
		// Use the handy event callback
		document.addEventListener( "DOMContentLoaded", function(){
			document.removeEventListener( "DOMContentLoaded", arguments.callee, false );
			jQuery.ready();
		}, false );

	// If IE event model is used
	} else if ( document.attachEvent ) {
		// ensure firing before onload,
		// maybe late but safe also for iframes
		document.attachEvent("onreadystatechange", function(){
			if ( document.readyState === "complete" ) {
				document.detachEvent( "onreadystatechange", arguments.callee );
				jQuery.ready();
			}
		});

		// If IE and not an iframe
		// continually check to see if the document is ready
		if ( document.documentElement.doScroll && window == window.top ) (function(){
			if ( jQuery.isReady ) return;

			try {
				// If IE is used, use the trick by Diego Perini
				// http://javascript.nwbox.com/IEContentLoaded/
				document.documentElement.doScroll("left");
			} catch( error ) {
				setTimeout( arguments.callee, 0 );
				return;
			}

			// and execute any waiting functions
			jQuery.ready();
		})();
	}

	// A fallback to window.onload, that will always work
	jQuery.event.add( window, "load", jQuery.ready );
}

jQuery.each( ("blur,focus,load,resize,scroll,unload,click,dblclick," +
	"mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave," +
	"change,select,submit,keydown,keypress,keyup,error").split(","), function(i, name){

	// Handle event binding
	jQuery.fn[name] = function(fn){
		return fn ? this.bind(name, fn) : this.trigger(name);
	};
});

// Prevent memory leaks in IE
// And prevent errors on refresh with events like mouseover in other browsers
// Window isn't included so as not to unbind existing unload events
jQuery( window ).bind( 'unload', function(){ 
	for ( var id in jQuery.cache )
		// Skip the window
		if ( id != 1 && jQuery.cache[ id ].handle )
			jQuery.event.remove( jQuery.cache[ id ].handle.elem );
}); 
(function(){

	jQuery.support = {};

	var root = document.documentElement,
		script = document.createElement("script"),
		div = document.createElement("div"),
		id = "script" + (new Date).getTime();

	div.style.display = "none";
	div.innerHTML = '   <link/><table></table><a href="/a" style="color:red;float:left;opacity:.5;">a</a><select><option>text</option></select><object><param/></object>';

	var all = div.getElementsByTagName("*"),
		a = div.getElementsByTagName("a")[0];

	// Can't get basic test support
	if ( !all || !all.length || !a ) {
		return;
	}

	jQuery.support = {
		// IE strips leading whitespace when .innerHTML is used
		leadingWhitespace: div.firstChild.nodeType == 3,
		
		// Make sure that tbody elements aren't automatically inserted
		// IE will insert them into empty tables
		tbody: !div.getElementsByTagName("tbody").length,
		
		// Make sure that you can get all elements in an <object> element
		// IE 7 always returns no results
		objectAll: !!div.getElementsByTagName("object")[0]
			.getElementsByTagName("*").length,
		
		// Make sure that link elements get serialized correctly by innerHTML
		// This requires a wrapper element in IE
		htmlSerialize: !!div.getElementsByTagName("link").length,
		
		// Get the style information from getAttribute
		// (IE uses .cssText insted)
		style: /red/.test( a.getAttribute("style") ),
		
		// Make sure that URLs aren't manipulated
		// (IE normalizes it by default)
		hrefNormalized: a.getAttribute("href") === "/a",
		
		// Make sure that element opacity exists
		// (IE uses filter instead)
		opacity: a.style.opacity === "0.5",
		
		// Verify style float existence
		// (IE uses styleFloat instead of cssFloat)
		cssFloat: !!a.style.cssFloat,

		// Will be defined later
		scriptEval: false,
		noCloneEvent: true,
		boxModel: null
	};
	
	script.type = "text/javascript";
	try {
		script.appendChild( document.createTextNode( "window." + id + "=1;" ) );
	} catch(e){}

	root.insertBefore( script, root.firstChild );
	
	// Make sure that the execution of code works by injecting a script
	// tag with appendChild/createTextNode
	// (IE doesn't support this, fails, and uses .text instead)
	if ( window[ id ] ) {
		jQuery.support.scriptEval = true;
		delete window[ id ];
	}

	root.removeChild( script );

	if ( div.attachEvent && div.fireEvent ) {
		div.attachEvent("onclick", function(){
			// Cloning a node shouldn't copy over any
			// bound event handlers (IE does this)
			jQuery.support.noCloneEvent = false;
			div.detachEvent("onclick", arguments.callee);
		});
		div.cloneNode(true).fireEvent("onclick");
	}

	// Figure out if the W3C box model works as expected
	// document.body must exist before we can do this
	jQuery(function(){
		var div = document.createElement("div");
		div.style.width = div.style.paddingLeft = "1px";

		document.body.appendChild( div );
		jQuery.boxModel = jQuery.support.boxModel = div.offsetWidth === 2;
		document.body.removeChild( div ).style.display = 'none';
	});
})();

var styleFloat = jQuery.support.cssFloat ? "cssFloat" : "styleFloat";

jQuery.props = {
	"for": "htmlFor",
	"class": "className",
	"float": styleFloat,
	cssFloat: styleFloat,
	styleFloat: styleFloat,
	readonly: "readOnly",
	maxlength: "maxLength",
	cellspacing: "cellSpacing",
	rowspan: "rowSpan",
	tabindex: "tabIndex"
};
jQuery.fn.extend({
	// Keep a copy of the old load
	_load: jQuery.fn.load,

	load: function( url, params, callback ) {
		if ( typeof url !== "string" )
			return this._load( url );

		var off = url.indexOf(" ");
		if ( off >= 0 ) {
			var selector = url.slice(off, url.length);
			url = url.slice(0, off);
		}

		// Default to a GET request
		var type = "GET";

		// If the second parameter was provided
		if ( params )
			// If it's a function
			if ( jQuery.isFunction( params ) ) {
				// We assume that it's the callback
				callback = params;
				params = null;

			// Otherwise, build a param string
			} else if( typeof params === "object" ) {
				params = jQuery.param( params );
				type = "POST";
			}

		var self = this;

		// Request the remote document
		jQuery.ajax({
			url: url,
			type: type,
			dataType: "html",
			data: params,
			complete: function(res, status){
				// If successful, inject the HTML into all the matched elements
				if ( status == "success" || status == "notmodified" )
					// See if a selector was specified
					self.html( selector ?
						// Create a dummy div to hold the results
						jQuery("<div/>")
							// inject the contents of the document in, removing the scripts
							// to avoid any 'Permission Denied' errors in IE
							.append(res.responseText.replace(/<script(.|\s)*?\/script>/g, ""))

							// Locate the specified elements
							.find(selector) :

						// If not, just inject the full result
						res.responseText );

				if( callback )
					self.each( callback, [res.responseText, status, res] );
			}
		});
		return this;
	},

	serialize: function() {
		return jQuery.param(this.serializeArray());
	},
	serializeArray: function() {
		return this.map(function(){
			return this.elements ? jQuery.makeArray(this.elements) : this;
		})
		.filter(function(){
			return this.name && !this.disabled &&
				(this.checked || /select|textarea/i.test(this.nodeName) ||
					/text|hidden|password|search/i.test(this.type));
		})
		.map(function(i, elem){
			var val = jQuery(this).val();
			return val == null ? null :
				jQuery.isArray(val) ?
					jQuery.map( val, function(val, i){
						return {name: elem.name, value: val};
					}) :
					{name: elem.name, value: val};
		}).get();
	}
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( "ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","), function(i,o){
	jQuery.fn[o] = function(f){
		return this.bind(o, f);
	};
});

var jsc = now();

jQuery.extend({
  
	get: function( url, data, callback, type ) {
		// shift arguments if data argument was ommited
		if ( jQuery.isFunction( data ) ) {
			callback = data;
			data = null;
		}

		return jQuery.ajax({
			type: "GET",
			url: url,
			data: data,
			success: callback,
			dataType: type
		});
	},

	getScript: function( url, callback ) {
		return jQuery.get(url, null, callback, "script");
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get(url, data, callback, "json");
	},

	post: function( url, data, callback, type ) {
		if ( jQuery.isFunction( data ) ) {
			callback = data;
			data = {};
		}

		return jQuery.ajax({
			type: "POST",
			url: url,
			data: data,
			success: callback,
			dataType: type
		});
	},

	ajaxSetup: function( settings ) {
		jQuery.extend( jQuery.ajaxSettings, settings );
	},

	ajaxSettings: {
		url: location.href,
		global: true,
		type: "GET",
		contentType: "application/x-www-form-urlencoded",
		processData: true,
		async: true,
		/*
		timeout: 0,
		data: null,
		username: null,
		password: null,
		*/
		// Create the request object; Microsoft failed to properly
		// implement the XMLHttpRequest in IE7, so we use the ActiveXObject when it is available
		// This function can be overriden by calling jQuery.ajaxSetup
		xhr:function(){
			return window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
		},
		accepts: {
			xml: "application/xml, text/xml",
			html: "text/html",
			script: "text/javascript, application/javascript",
			json: "application/json, text/javascript",
			text: "text/plain",
			_default: "*/*"
		}
	},

	// Last-Modified header cache for next request
	lastModified: {},

	ajax: function( s ) {
		// Extend the settings, but re-extend 's' so that it can be
		// checked again later (in the test suite, specifically)
		s = jQuery.extend(true, s, jQuery.extend(true, {}, jQuery.ajaxSettings, s));

		var jsonp, jsre = /=\?(&|$)/g, status, data,
			type = s.type.toUpperCase();

		// convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" )
			s.data = jQuery.param(s.data);

		// Handle JSONP Parameter Callbacks
		if ( s.dataType == "jsonp" ) {
			if ( type == "GET" ) {
				if ( !s.url.match(jsre) )
					s.url += (s.url.match(/\?/) ? "&" : "?") + (s.jsonp || "callback") + "=?";
			} else if ( !s.data || !s.data.match(jsre) )
				s.data = (s.data ? s.data + "&" : "") + (s.jsonp || "callback") + "=?";
			s.dataType = "json";
		}

		// Build temporary JSONP function
		if ( s.dataType == "json" && (s.data && s.data.match(jsre) || s.url.match(jsre)) ) {
			jsonp = "jsonp" + jsc++;

			// Replace the =? sequence both in the query string and the data
			if ( s.data )
				s.data = (s.data + "").replace(jsre, "=" + jsonp + "$1");
			s.url = s.url.replace(jsre, "=" + jsonp + "$1");

			// We need to make sure
			// that a JSONP style response is executed properly
			s.dataType = "script";

			// Handle JSONP-style loading
			window[ jsonp ] = function(tmp){
				data = tmp;
				success();
				complete();
				// Garbage collect
				window[ jsonp ] = undefined;
				try{ delete window[ jsonp ]; } catch(e){}
				if ( head )
					head.removeChild( script );
			};
		}

		if ( s.dataType == "script" && s.cache == null )
			s.cache = false;

		if ( s.cache === false && type == "GET" ) {
			var ts = now();
			// try replacing _= if it is there
			var ret = s.url.replace(/(\?|&)_=.*?(&|$)/, "$1_=" + ts + "$2");
			// if nothing was replaced, add timestamp to the end
			s.url = ret + ((ret == s.url) ? (s.url.match(/\?/) ? "&" : "?") + "_=" + ts : "");
		}

		// If data is available, append data to url for get requests
		if ( s.data && type == "GET" ) {
			s.url += (s.url.match(/\?/) ? "&" : "?") + s.data;

			// IE likes to send both get and post data, prevent this
			s.data = null;
		}

		// Watch for a new set of requests
		if ( s.global && ! jQuery.active++ )
			jQuery.event.trigger( "ajaxStart" );

		// Matches an absolute URL, and saves the domain
		var parts = /^(\w+:)?\/\/([^\/?#]+)/.exec( s.url );

		// If we're requesting a remote document
		// and trying to load JSON or Script with a GET
		if ( s.dataType == "script" && type == "GET" && parts
			&& ( parts[1] && parts[1] != location.protocol || parts[2] != location.host )){

			var head = document.getElementsByTagName("head")[0];
			var script = document.createElement("script");
			script.src = s.url;
			if (s.scriptCharset)
				script.charset = s.scriptCharset;

			// Handle Script loading
			if ( !jsonp ) {
				var done = false;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function(){
					if ( !done && (!this.readyState ||
							this.readyState == "loaded" || this.readyState == "complete") ) {
						done = true;
						success();
						complete();

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;
						head.removeChild( script );
					}
				};
			}

			head.appendChild(script);

			// We handle everything using the script element injection
			return undefined;
		}

		var requestDone = false;

		// Create the request object
		var xhr = s.xhr();

		// Open the socket
		// Passing null username, generates a login popup on Opera (#2865)
		if( s.username )
			xhr.open(type, s.url, s.async, s.username, s.password);
		else
			xhr.open(type, s.url, s.async);

		// Need an extra try/catch for cross domain requests in Firefox 3
		try {
			// Set the correct header, if data is being sent
			if ( s.data )
				xhr.setRequestHeader("Content-Type", s.contentType);

			// Set the If-Modified-Since header, if ifModified mode.
			if ( s.ifModified )
				xhr.setRequestHeader("If-Modified-Since",
					jQuery.lastModified[s.url] || "Thu, 01 Jan 1970 00:00:00 GMT" );

			// Set header so the called script knows that it's an XMLHttpRequest
			xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

			// Set the Accepts header for the server, depending on the dataType
			xhr.setRequestHeader("Accept", s.dataType && s.accepts[ s.dataType ] ?
				s.accepts[ s.dataType ] + ", */*" :
				s.accepts._default );
		} catch(e){}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && s.beforeSend(xhr, s) === false ) {
			// Handle the global AJAX counter
			if ( s.global && ! --jQuery.active )
				jQuery.event.trigger( "ajaxStop" );
			// close opended socket
			xhr.abort();
			return false;
		}

		if ( s.global )
			jQuery.event.trigger("ajaxSend", [xhr, s]);

		// Wait for a response to come back
		var onreadystatechange = function(isTimeout){
			// The request was aborted, clear the interval and decrement jQuery.active
			if (xhr.readyState == 0) {
				if (ival) {
					// clear poll interval
					clearInterval(ival);
					ival = null;
					// Handle the global AJAX counter
					if ( s.global && ! --jQuery.active )
						jQuery.event.trigger( "ajaxStop" );
				}
			// The transfer is complete and the data is available, or the request timed out
			} else if ( !requestDone && xhr && (xhr.readyState == 4 || isTimeout == "timeout") ) {
				requestDone = true;

				// clear poll interval
				if (ival) {
					clearInterval(ival);
					ival = null;
				}

				status = isTimeout == "timeout" ? "timeout" :
					!jQuery.httpSuccess( xhr ) ? "error" :
					s.ifModified && jQuery.httpNotModified( xhr, s.url ) ? "notmodified" :
					"success";

				if ( status == "success" ) {
					// Watch for, and catch, XML document parse errors
					try {
						// process the data (runs the xml through httpData regardless of callback)
						data = jQuery.httpData( xhr, s.dataType, s );
					} catch(e) {
						status = "parsererror";
					}
				}

				// Make sure that the request was successful or notmodified
				if ( status == "success" ) {
					// Cache Last-Modified header, if ifModified mode.
					var modRes;
					try {
						modRes = xhr.getResponseHeader("Last-Modified");
					} catch(e) {} // swallow exception thrown by FF if header is not available

					if ( s.ifModified && modRes )
						jQuery.lastModified[s.url] = modRes;

					// JSONP handles its own success callback
					if ( !jsonp )
						success();
				} else
					jQuery.handleError(s, xhr, status);

				// Fire the complete handlers
				complete();

				if ( isTimeout )
					xhr.abort();

				// Stop memory leaks
				if ( s.async )
					xhr = null;
			}
		};

		if ( s.async ) {
			// don't attach the handler to the request, just poll it instead
			var ival = setInterval(onreadystatechange, 13);

			// Timeout checker
			if ( s.timeout > 0 )
				setTimeout(function(){
					// Check to see if the request is still happening
					if ( xhr && !requestDone )
						onreadystatechange( "timeout" );
				}, s.timeout);
		}

		// Send the data
		try {
			xhr.send(s.data);
		} catch(e) {
			jQuery.handleError(s, xhr, null, e);
		}

		// firefox 1.5 doesn't fire statechange for sync requests
		if ( !s.async )
			onreadystatechange();

		function success(){
			// If a local callback was specified, fire it and pass it the data
			if ( s.success )
				s.success( data, status );

			// Fire the global callback
			if ( s.global )
				jQuery.event.trigger( "ajaxSuccess", [xhr, s] );
		}

		function complete(){
			// Process result
			if ( s.complete )
				s.complete(xhr, status);

			// The request was completed
			if ( s.global )
				jQuery.event.trigger( "ajaxComplete", [xhr, s] );

			// Handle the global AJAX counter
			if ( s.global && ! --jQuery.active )
				jQuery.event.trigger( "ajaxStop" );
		}

		// return XMLHttpRequest to allow aborting the request etc.
		return xhr;
	},

	handleError: function( s, xhr, status, e ) {
		// If a local callback was specified, fire it
		if ( s.error ) s.error( xhr, status, e );

		// Fire the global callback
		if ( s.global )
			jQuery.event.trigger( "ajaxError", [xhr, s, e] );
	},

	// Counter for holding the number of active queries
	active: 0,

	// Determines if an XMLHttpRequest was successful or not
	httpSuccess: function( xhr ) {
		try {
			// IE error sometimes returns 1223 when it should be 204 so treat it as success, see #1450
			return !xhr.status && location.protocol == "file:" ||
				( xhr.status >= 200 && xhr.status < 300 ) || xhr.status == 304 || xhr.status == 1223;
		} catch(e){}
		return false;
	},

	// Determines if an XMLHttpRequest returns NotModified
	httpNotModified: function( xhr, url ) {
		try {
			var xhrRes = xhr.getResponseHeader("Last-Modified");

			// Firefox always returns 200. check Last-Modified date
			return xhr.status == 304 || xhrRes == jQuery.lastModified[url];
		} catch(e){}
		return false;
	},

	httpData: function( xhr, type, s ) {
		var ct = xhr.getResponseHeader("content-type"),
			xml = type == "xml" || !type && ct && ct.indexOf("xml") >= 0,
			data = xml ? xhr.responseXML : xhr.responseText;

		if ( xml && data.documentElement.tagName == "parsererror" )
			throw "parsererror";
			
		// Allow a pre-filtering function to sanitize the response
		// s != null is checked to keep backwards compatibility
		if( s && s.dataFilter )
			data = s.dataFilter( data, type );

		// The filter can actually parse the response
		if( typeof data === "string" ){

			// If the type is "script", eval it in global context
			if ( type == "script" )
				jQuery.globalEval( data );

			// Get the JavaScript object, if JSON is used.
			if ( type == "json" )
				data = window["eval"]("(" + data + ")");
		}
		
		return data;
	},

	// Serialize an array of form elements or a set of
	// key/values into a query string
	param: function( a ) {
		var s = [ ];

		function add( key, value ){
			s[ s.length ] = encodeURIComponent(key) + '=' + encodeURIComponent(value);
		};

		// If an array was passed in, assume that it is an array
		// of form elements
		if ( jQuery.isArray(a) || a.jquery )
			// Serialize the form elements
			jQuery.each( a, function(){
				add( this.name, this.value );
			});

		// Otherwise, assume that it's an object of key/value pairs
		else
			// Serialize the key/values
			for ( var j in a )
				// If the value is an array then the key names need to be repeated
				if ( jQuery.isArray(a[j]) )
					jQuery.each( a[j], function(){
						add( j, this );
					});
				else
					add( j, jQuery.isFunction(a[j]) ? a[j]() : a[j] );

		// Return the resulting serialization
		return s.join("&").replace(/%20/g, "+");
	}

});
var elemdisplay = {},
	timerId,
	fxAttrs = [
		// height animations
		[ "height", "marginTop", "marginBottom", "paddingTop", "paddingBottom" ],
		// width animations
		[ "width", "marginLeft", "marginRight", "paddingLeft", "paddingRight" ],
		// opacity animations
		[ "opacity" ]
	];

function genFx( type, num ){
	var obj = {};
	jQuery.each( fxAttrs.concat.apply([], fxAttrs.slice(0,num)), function(){
		obj[ this ] = type;
	});
	return obj;
}

jQuery.fn.extend({
	show: function(speed,callback){
		if ( speed ) {
			return this.animate( genFx("show", 3), speed, callback);
		} else {
			for ( var i = 0, l = this.length; i < l; i++ ){
				var old = jQuery.data(this[i], "olddisplay");
				
				this[i].style.display = old || "";
				
				if ( jQuery.css(this[i], "display") === "none" ) {
					var tagName = this[i].tagName, display;
					
					if ( elemdisplay[ tagName ] ) {
						display = elemdisplay[ tagName ];
					} else {
						var elem = jQuery("<" + tagName + " />").appendTo("body");
						
						display = elem.css("display");
						if ( display === "none" )
							display = "block";
						
						elem.remove();
						
						elemdisplay[ tagName ] = display;
					}
					
					jQuery.data(this[i], "olddisplay", display);
				}
			}

			// Set the display of the elements in a second loop
			// to avoid the constant reflow
			for ( var i = 0, l = this.length; i < l; i++ ){
				this[i].style.display = jQuery.data(this[i], "olddisplay") || "";
			}
			
			return this;
		}
	},

	hide: function(speed,callback){
		if ( speed ) {
			return this.animate( genFx("hide", 3), speed, callback);
		} else {
			for ( var i = 0, l = this.length; i < l; i++ ){
				var old = jQuery.data(this[i], "olddisplay");
				if ( !old && old !== "none" )
					jQuery.data(this[i], "olddisplay", jQuery.css(this[i], "display"));
			}

			// Set the display of the elements in a second loop
			// to avoid the constant reflow
			for ( var i = 0, l = this.length; i < l; i++ ){
				this[i].style.display = "none";
			}

			return this;
		}
	},

	// Save the old toggle function
	_toggle: jQuery.fn.toggle,

	toggle: function( fn, fn2 ){
		var bool = typeof fn === "boolean";

		return jQuery.isFunction(fn) && jQuery.isFunction(fn2) ?
			this._toggle.apply( this, arguments ) :
			fn == null || bool ?
				this.each(function(){
					var state = bool ? fn : jQuery(this).is(":hidden");
					jQuery(this)[ state ? "show" : "hide" ]();
				}) :
				this.animate(genFx("toggle", 3), fn, fn2);
	},

	fadeTo: function(speed,to,callback){
		return this.animate({opacity: to}, speed, callback);
	},

	animate: function( prop, speed, easing, callback ) {
		var optall = jQuery.speed(speed, easing, callback);

		return this[ optall.queue === false ? "each" : "queue" ](function(){
		
			var opt = jQuery.extend({}, optall), p,
				hidden = this.nodeType == 1 && jQuery(this).is(":hidden"),
				self = this;
	
			for ( p in prop ) {
				if ( prop[p] == "hide" && hidden || prop[p] == "show" && !hidden )
					return opt.complete.call(this);

				if ( ( p == "height" || p == "width" ) && this.style ) {
					// Store display property
					opt.display = jQuery.css(this, "display");

					// Make sure that nothing sneaks out
					opt.overflow = this.style.overflow;
				}
			}

			if ( opt.overflow != null )
				this.style.overflow = "hidden";

			opt.curAnim = jQuery.extend({}, prop);

			jQuery.each( prop, function(name, val){
				var e = new jQuery.fx( self, opt, name );

				if ( /toggle|show|hide/.test(val) )
					e[ val == "toggle" ? hidden ? "show" : "hide" : val ]( prop );
				else {
					var parts = val.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),
						start = e.cur(true) || 0;

					if ( parts ) {
						var end = parseFloat(parts[2]),
							unit = parts[3] || "px";

						// We need to compute starting value
						if ( unit != "px" ) {
							self.style[ name ] = (end || 1) + unit;
							start = ((end || 1) / e.cur(true)) * start;
							self.style[ name ] = start + unit;
						}

						// If a +=/-= token was provided, we're doing a relative animation
						if ( parts[1] )
							end = ((parts[1] == "-=" ? -1 : 1) * end) + start;

						e.custom( start, end, unit );
					} else
						e.custom( start, val, "" );
				}
			});

			// For JS strict compliance
			return true;
		});
	},

	stop: function(clearQueue, gotoEnd){
		var timers = jQuery.timers;

		if (clearQueue)
			this.queue([]);

		this.each(function(){
			// go in reverse order so anything added to the queue during the loop is ignored
			for ( var i = timers.length - 1; i >= 0; i-- )
				if ( timers[i].elem == this ) {
					if (gotoEnd)
						// force the next step to be the last
						timers[i](true);
					timers.splice(i, 1);
				}
		});

		// start the next in the queue if the last step wasn't forced
		if (!gotoEnd)
			this.dequeue();

		return this;
	}

});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show", 1),
	slideUp: genFx("hide", 1),
	slideToggle: genFx("toggle", 1),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" }
}, function( name, props ){
	jQuery.fn[ name ] = function( speed, callback ){
		return this.animate( props, speed, callback );
	};
});

jQuery.extend({

	speed: function(speed, easing, fn) {
		var opt = typeof speed === "object" ? speed : {
			complete: fn || !fn && easing ||
				jQuery.isFunction( speed ) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
		};

		opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
			jQuery.fx.speeds[opt.duration] || jQuery.fx.speeds._default;

		// Queueing
		opt.old = opt.complete;
		opt.complete = function(){
			if ( opt.queue !== false )
				jQuery(this).dequeue();
			if ( jQuery.isFunction( opt.old ) )
				opt.old.call( this );
		};

		return opt;
	},

	easing: {
		linear: function( p, n, firstNum, diff ) {
			return firstNum + diff * p;
		},
		swing: function( p, n, firstNum, diff ) {
			return ((-Math.cos(p*Math.PI)/2) + 0.5) * diff + firstNum;
		}
	},

	timers: [],

	fx: function( elem, options, prop ){
		this.options = options;
		this.elem = elem;
		this.prop = prop;

		if ( !options.orig )
			options.orig = {};
	}

});

jQuery.fx.prototype = {

	// Simple function for setting a style value
	update: function(){
		if ( this.options.step )
			this.options.step.call( this.elem, this.now, this );

		(jQuery.fx.step[this.prop] || jQuery.fx.step._default)( this );

		// Set display property to block for height/width animations
		if ( ( this.prop == "height" || this.prop == "width" ) && this.elem.style )
			this.elem.style.display = "block";
	},

	// Get the current size
	cur: function(force){
		if ( this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null) )
			return this.elem[ this.prop ];

		var r = parseFloat(jQuery.css(this.elem, this.prop, force));
		return r && r > -10000 ? r : parseFloat(jQuery.curCSS(this.elem, this.prop)) || 0;
	},

	// Start an animation from one number to another
	custom: function(from, to, unit){
		this.startTime = now();
		this.start = from;
		this.end = to;
		this.unit = unit || this.unit || "px";
		this.now = this.start;
		this.pos = this.state = 0;

		var self = this;
		function t(gotoEnd){
			return self.step(gotoEnd);
		}

		t.elem = this.elem;

		if ( t() && jQuery.timers.push(t) && !timerId ) {
			timerId = setInterval(function(){
				var timers = jQuery.timers;

				for ( var i = 0; i < timers.length; i++ )
					if ( !timers[i]() )
						timers.splice(i--, 1);

				if ( !timers.length ) {
					clearInterval( timerId );
					timerId = undefined;
				}
			}, 13);
		}
	},

	// Simple 'show' function
	show: function(){
		// Remember where we started, so that we can go back to it later
		this.options.orig[this.prop] = jQuery.attr( this.elem.style, this.prop );
		this.options.show = true;

		// Begin the animation
		// Make sure that we start at a small width/height to avoid any
		// flash of content
		this.custom(this.prop == "width" || this.prop == "height" ? 1 : 0, this.cur());

		// Start by showing the element
		jQuery(this.elem).show();
	},

	// Simple 'hide' function
	hide: function(){
		// Remember where we started, so that we can go back to it later
		this.options.orig[this.prop] = jQuery.attr( this.elem.style, this.prop );
		this.options.hide = true;

		// Begin the animation
		this.custom(this.cur(), 0);
	},

	// Each step of an animation
	step: function(gotoEnd){
		var t = now();

		if ( gotoEnd || t >= this.options.duration + this.startTime ) {
			this.now = this.end;
			this.pos = this.state = 1;
			this.update();

			this.options.curAnim[ this.prop ] = true;

			var done = true;
			for ( var i in this.options.curAnim )
				if ( this.options.curAnim[i] !== true )
					done = false;

			if ( done ) {
				if ( this.options.display != null ) {
					// Reset the overflow
					this.elem.style.overflow = this.options.overflow;

					// Reset the display
					this.elem.style.display = this.options.display;
					if ( jQuery.css(this.elem, "display") == "none" )
						this.elem.style.display = "block";
				}

				// Hide the element if the "hide" operation was done
				if ( this.options.hide )
					jQuery(this.elem).hide();

				// Reset the properties, if the item has been hidden or shown
				if ( this.options.hide || this.options.show )
					for ( var p in this.options.curAnim )
						jQuery.attr(this.elem.style, p, this.options.orig[p]);
					
				// Execute the complete function
				this.options.complete.call( this.elem );
			}

			return false;
		} else {
			var n = t - this.startTime;
			this.state = n / this.options.duration;

			// Perform the easing function, defaults to swing
			this.pos = jQuery.easing[this.options.easing || (jQuery.easing.swing ? "swing" : "linear")](this.state, n, 0, 1, this.options.duration);
			this.now = this.start + ((this.end - this.start) * this.pos);

			// Perform the next step of the animation
			this.update();
		}

		return true;
	}

};

jQuery.extend( jQuery.fx, {
	speeds:{
		slow: 600,
 		fast: 200,
 		// Default speed
 		_default: 400
	},
	step: {

		opacity: function(fx){
			jQuery.attr(fx.elem.style, "opacity", fx.now);
		},

		_default: function(fx){
			if ( fx.elem.style && fx.elem.style[ fx.prop ] != null )
				fx.elem.style[ fx.prop ] = fx.now + fx.unit;
			else
				fx.elem[ fx.prop ] = fx.now;
		}
	}
});
if ( document.documentElement["getBoundingClientRect"] )
	jQuery.fn.offset = function() {
		if ( !this[0] ) return { top: 0, left: 0 };
		if ( this[0] === this[0].ownerDocument.body ) return jQuery.offset.bodyOffset( this[0] );
		var box  = this[0].getBoundingClientRect(), doc = this[0].ownerDocument, body = doc.body, docElem = doc.documentElement,
			clientTop = docElem.clientTop || body.clientTop || 0, clientLeft = docElem.clientLeft || body.clientLeft || 0,
			top  = box.top  + (self.pageYOffset || jQuery.boxModel && docElem.scrollTop  || body.scrollTop ) - clientTop,
			left = box.left + (self.pageXOffset || jQuery.boxModel && docElem.scrollLeft || body.scrollLeft) - clientLeft;
		return { top: top, left: left };
	};
else 
	jQuery.fn.offset = function() {
		if ( !this[0] ) return { top: 0, left: 0 };
		if ( this[0] === this[0].ownerDocument.body ) return jQuery.offset.bodyOffset( this[0] );
		jQuery.offset.initialized || jQuery.offset.initialize();

		var elem = this[0], offsetParent = elem.offsetParent, prevOffsetParent = elem,
			doc = elem.ownerDocument, computedStyle, docElem = doc.documentElement,
			body = doc.body, defaultView = doc.defaultView,
			prevComputedStyle = defaultView.getComputedStyle(elem, null),
			top = elem.offsetTop, left = elem.offsetLeft;

		while ( (elem = elem.parentNode) && elem !== body && elem !== docElem ) {
			computedStyle = defaultView.getComputedStyle(elem, null);
			top -= elem.scrollTop, left -= elem.scrollLeft;
			if ( elem === offsetParent ) {
				top += elem.offsetTop, left += elem.offsetLeft;
				if ( jQuery.offset.doesNotAddBorder && !(jQuery.offset.doesAddBorderForTableAndCells && /^t(able|d|h)$/i.test(elem.tagName)) )
					top  += parseInt( computedStyle.borderTopWidth,  10) || 0,
					left += parseInt( computedStyle.borderLeftWidth, 10) || 0;
				prevOffsetParent = offsetParent, offsetParent = elem.offsetParent;
			}
			if ( jQuery.offset.subtractsBorderForOverflowNotVisible && computedStyle.overflow !== "visible" )
				top  += parseInt( computedStyle.borderTopWidth,  10) || 0,
				left += parseInt( computedStyle.borderLeftWidth, 10) || 0;
			prevComputedStyle = computedStyle;
		}

		if ( prevComputedStyle.position === "relative" || prevComputedStyle.position === "static" )
			top  += body.offsetTop,
			left += body.offsetLeft;

		if ( prevComputedStyle.position === "fixed" )
			top  += Math.max(docElem.scrollTop, body.scrollTop),
			left += Math.max(docElem.scrollLeft, body.scrollLeft);

		return { top: top, left: left };
	};

jQuery.offset = {
	initialize: function() {
		if ( this.initialized ) return;
		var body = document.body, container = document.createElement('div'), innerDiv, checkDiv, table, td, rules, prop, bodyMarginTop = body.style.marginTop,
			html = '<div style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;"><div></div></div><table style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;" cellpadding="0" cellspacing="0"><tr><td></td></tr></table>';

		rules = { position: 'absolute', top: 0, left: 0, margin: 0, border: 0, width: '1px', height: '1px', visibility: 'hidden' };
		for ( prop in rules ) container.style[prop] = rules[prop];

		container.innerHTML = html;
		body.insertBefore(container, body.firstChild);
		innerDiv = container.firstChild, checkDiv = innerDiv.firstChild, td = innerDiv.nextSibling.firstChild.firstChild;

		this.doesNotAddBorder = (checkDiv.offsetTop !== 5);
		this.doesAddBorderForTableAndCells = (td.offsetTop === 5);

		innerDiv.style.overflow = 'hidden', innerDiv.style.position = 'relative';
		this.subtractsBorderForOverflowNotVisible = (checkDiv.offsetTop === -5);

		body.style.marginTop = '1px';
		this.doesNotIncludeMarginInBodyOffset = (body.offsetTop === 0);
		body.style.marginTop = bodyMarginTop;

		body.removeChild(container);
		this.initialized = true;
	},

	bodyOffset: function(body) {
		jQuery.offset.initialized || jQuery.offset.initialize();
		var top = body.offsetTop, left = body.offsetLeft;
		if ( jQuery.offset.doesNotIncludeMarginInBodyOffset )
			top  += parseInt( jQuery.curCSS(body, 'marginTop',  true), 10 ) || 0,
			left += parseInt( jQuery.curCSS(body, 'marginLeft', true), 10 ) || 0;
		return { top: top, left: left };
	}
};


jQuery.fn.extend({
	position: function() {
		var left = 0, top = 0, results;

		if ( this[0] ) {
			// Get *real* offsetParent
			var offsetParent = this.offsetParent(),

			// Get correct offsets
			offset       = this.offset(),
			parentOffset = /^body|html$/i.test(offsetParent[0].tagName) ? { top: 0, left: 0 } : offsetParent.offset();

			// Subtract element margins
			// note: when an element has margin: auto the offsetLeft and marginLeft 
			// are the same in Safari causing offset.left to incorrectly be 0
			offset.top  -= num( this, 'marginTop'  );
			offset.left -= num( this, 'marginLeft' );

			// Add offsetParent borders
			parentOffset.top  += num( offsetParent, 'borderTopWidth'  );
			parentOffset.left += num( offsetParent, 'borderLeftWidth' );

			// Subtract the two offsets
			results = {
				top:  offset.top  - parentOffset.top,
				left: offset.left - parentOffset.left
			};
		}

		return results;
	},

	offsetParent: function() {
		var offsetParent = this[0].offsetParent || document.body;
		while ( offsetParent && (!/^body|html$/i.test(offsetParent.tagName) && jQuery.css(offsetParent, 'position') == 'static') )
			offsetParent = offsetParent.offsetParent;
		return jQuery(offsetParent);
	}
});


// Create scrollLeft and scrollTop methods
jQuery.each( ['Left', 'Top'], function(i, name) {
	var method = 'scroll' + name;
	
	jQuery.fn[ method ] = function(val) {
		if (!this[0]) return null;

		return val !== undefined ?

			// Set the scroll offset
			this.each(function() {
				this == window || this == document ?
					window.scrollTo(
						!i ? val : jQuery(window).scrollLeft(),
						 i ? val : jQuery(window).scrollTop()
					) :
					this[ method ] = val;
			}) :

			// Return the scroll offset
			this[0] == window || this[0] == document ?
				self[ i ? 'pageYOffset' : 'pageXOffset' ] ||
					jQuery.boxModel && document.documentElement[ method ] ||
					document.body[ method ] :
				this[0][ method ];
	};
});
// Create innerHeight, innerWidth, outerHeight and outerWidth methods
jQuery.each([ "Height", "Width" ], function(i, name){

	var tl = i ? "Left"  : "Top",  // top or left
		br = i ? "Right" : "Bottom", // bottom or right
		lower = name.toLowerCase();

	// innerHeight and innerWidth
	jQuery.fn["inner" + name] = function(){
		return this[0] ?
			jQuery.css( this[0], lower, false, "padding" ) :
			null;
	};

	// outerHeight and outerWidth
	jQuery.fn["outer" + name] = function(margin) {
		return this[0] ?
			jQuery.css( this[0], lower, false, margin ? "margin" : "border" ) :
			null;
	};
	
	var type = name.toLowerCase();

	jQuery.fn[ type ] = function( size ) {
		// Get window width or height
		return this[0] == window ?
			// Everyone else use document.documentElement or document.body depending on Quirks vs Standards mode
			document.compatMode == "CSS1Compat" && document.documentElement[ "client" + name ] ||
			document.body[ "client" + name ] :

			// Get document width or height
			this[0] == document ?
				// Either scroll[Width/Height] or offset[Width/Height], whichever is greater
				Math.max(
					document.documentElement["client" + name],
					document.body["scroll" + name], document.documentElement["scroll" + name],
					document.body["offset" + name], document.documentElement["offset" + name]
				) :

				// Get or set width or height on the element
				size === undefined ?
					// Get width or height on the element
					(this.length ? jQuery.css( this[0], type ) : null) :

					// Set the width or height on the element (default to pixels if value is unitless)
					this.css( type, typeof size === "string" ? size : size + "px" );
	};

});
})();
/**
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

/**
 * Create a cookie with the given name and value and other optional parameters.
 *
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Set the value of a cookie.
 * @example $.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'jquery.com', secure: true });
 * @desc Create a cookie with all available options.
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Create a session cookie.
 * @example $.cookie('the_cookie', null);
 * @desc Delete a cookie by passing null as value. Keep in mind that you have to use the same path and domain
 *       used when the cookie was set.
 *
 * @param String name The name of the cookie.
 * @param String value The value of the cookie.
 * @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
 * @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
 *                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
 *                             If set to null or omitted, the cookie will be a session cookie and will not be retained
 *                             when the the browser exits.
 * @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
 * @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
 * @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
 *                        require a secure protocol (like HTTPS).
 * @type undefined
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

/**
 * Get the value of a cookie with the given name.
 *
 * @example $.cookie('the_cookie');
 * @desc Get the value of a cookie.
 *
 * @param String name The name of the cookie.
 * @return The value of the cookie.
 * @type String
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        // CAUTION: Needed to parenthesize options.path and options.domain
        // in the following expressions, otherwise they evaluate to undefined
        // in the packed version for some reason...
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};/*
 * jQuery validation plug-in 1.5.5
 *
 * http://bassistance.de/jquery-plugins/jquery-plugin-validation/
 * http://docs.jquery.com/Plugins/Validation
 *
 * Copyright (c) 2006 - 2008 Jörn Zaefferer
 *
 * $Id: jquery.validate.js 6403 2009-06-17 14:27:16Z joern.zaefferer $
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

(function($) {

$.extend($.fn, {
	// http://docs.jquery.com/Plugins/Validation/validate
	validate: function( options ) {

		// if nothing is selected, return nothing; can't chain anyway
		if (!this.length) {
			options && options.debug && window.console && console.warn( "nothing selected, can't validate, returning nothing" );
			return;
		}

		// check if a validator for this form was already created
		var validator = $.data(this[0], 'validator');
		if ( validator ) {
			return validator;
		}
		
		validator = new $.validator( options, this[0] );
		$.data(this[0], 'validator', validator); 
		
		if ( validator.settings.onsubmit ) {
		
			// allow suppresing validation by adding a cancel class to the submit button
			this.find("input, button").filter(".cancel").click(function() {
				validator.cancelSubmit = true;
			});
			
			// when a submitHandler is used, capture the submitting button
			if (validator.settings.submitHandler) {
				this.find("input, button").filter(":submit").click(function() {
					validator.submitButton = this;
				});
			}
		
			// validate the form on submit
			this.submit( function( event ) {
				if ( validator.settings.debug )
					// prevent form submit to be able to see console output
					event.preventDefault();
					
				function handle() {
					if ( validator.settings.submitHandler ) {
						if (validator.submitButton) {
							// insert a hidden input as a replacement for the missing submit button
							var hidden = $("<input type='hidden'/>").attr("name", validator.submitButton.name).val(validator.submitButton.value).appendTo(validator.currentForm);
						}
						validator.settings.submitHandler.call( validator, validator.currentForm );
						if (validator.submitButton) {
							// and clean up afterwards; thanks to no-block-scope, hidden can be referenced
							hidden.remove();
						}
						return false;
					}
					return true;
				}
					
				// prevent submit for invalid forms or custom submit handlers
				if ( validator.cancelSubmit ) {
					validator.cancelSubmit = false;
					return handle();
				}
				if ( validator.form() ) {
					if ( validator.pendingRequest ) {
						validator.formSubmitted = true;
						return false;
					}
					return handle();
				} else {
					validator.focusInvalid();
					return false;
				}
			});
		}
		
		return validator;
	},
	// http://docs.jquery.com/Plugins/Validation/valid
	valid: function() {
        if ( $(this[0]).is('form')) {
            return this.validate().form();
        } else {
            var valid = true;
            var validator = $(this[0].form).validate();
            this.each(function() {
				valid &= validator.element(this);
            });
            return valid;
        }
    },
	// attributes: space seperated list of attributes to retrieve and remove
	removeAttrs: function(attributes) {
		var result = {},
			$element = this;
		$.each(attributes.split(/\s/), function(index, value) {
			result[value] = $element.attr(value);
			$element.removeAttr(value);
		});
		return result;
	},
	// http://docs.jquery.com/Plugins/Validation/rules
	rules: function(command, argument) {
		var element = this[0];
		
		if (command) {
			var settings = $.data(element.form, 'validator').settings;
			var staticRules = settings.rules;
			var existingRules = $.validator.staticRules(element);
			switch(command) {
			case "add":
				$.extend(existingRules, $.validator.normalizeRule(argument));
				staticRules[element.name] = existingRules;
				if (argument.messages)
					settings.messages[element.name] = $.extend( settings.messages[element.name], argument.messages );
				break;
			case "remove":
				if (!argument) {
					delete staticRules[element.name];
					return existingRules;
				}
				var filtered = {};
				$.each(argument.split(/\s/), function(index, method) {
					filtered[method] = existingRules[method];
					delete existingRules[method];
				});
				return filtered;
			}
		}
		
		var data = $.validator.normalizeRules(
		$.extend(
			{},
			$.validator.metadataRules(element),
			$.validator.classRules(element),
			$.validator.attributeRules(element),
			$.validator.staticRules(element)
		), element);
		
		// make sure required is at front
		if (data.required) {
			var param = data.required;
			delete data.required;
			data = $.extend({required: param}, data);
		}
		
		return data;
	}
});

// Custom selectors
$.extend($.expr[":"], {
	// http://docs.jquery.com/Plugins/Validation/blank
	blank: function(a) {return !$.trim(a.value);},
	// http://docs.jquery.com/Plugins/Validation/filled
	filled: function(a) {return !!$.trim(a.value);},
	// http://docs.jquery.com/Plugins/Validation/unchecked
	unchecked: function(a) {return !a.checked;}
});

// constructor for validator
$.validator = function( options, form ) {
	this.settings = $.extend( {}, $.validator.defaults, options );
	this.currentForm = form;
	this.init();
};

$.validator.format = function(source, params) {
	if ( arguments.length == 1 ) 
		return function() {
			var args = $.makeArray(arguments);
			args.unshift(source);
			return $.validator.format.apply( this, args );
		};
	if ( arguments.length > 2 && params.constructor != Array  ) {
		params = $.makeArray(arguments).slice(1);
	}
	if ( params.constructor != Array ) {
		params = [ params ];
	}
	$.each(params, function(i, n) {
		source = source.replace(new RegExp("\\{" + i + "\\}", "g"), n);
	});
	return source;
};

$.extend($.validator, {
	
	defaults: {
		messages: {},
		groups: {},
		rules: {},
		errorClass: "error",
		validClass: "valid",
		errorElement: "label",
		focusInvalid: true,
		errorContainer: $( [] ),
		errorLabelContainer: $( [] ),
		onsubmit: true,
		ignore: [],
		ignoreTitle: false,
		onfocusin: function(element) {
			this.lastActive = element;
				
			// hide error label and remove error class on focus if enabled
			if ( this.settings.focusCleanup && !this.blockFocusCleanup ) {
				this.settings.unhighlight && this.settings.unhighlight.call( this, element, this.settings.errorClass, this.settings.validClass );
				this.errorsFor(element).hide();
			}
		},
		onfocusout: function(element) {
			if ( !this.checkable(element) && (element.name in this.submitted || !this.optional(element)) ) {
				this.element(element);
			}
		},
		onkeyup: function(element) {
			if ( element.name in this.submitted || element == this.lastElement ) {
				this.element(element);
			}
		},
		onclick: function(element) {
			if ( element.name in this.submitted )
				this.element(element);
		},
		highlight: function( element, errorClass, validClass ) {
			$(element).addClass(errorClass).removeClass(validClass);
		},
		unhighlight: function( element, errorClass, validClass ) {
			$(element).removeClass(errorClass).addClass(validClass);
		}
	},

	// http://docs.jquery.com/Plugins/Validation/Validator/setDefaults
	setDefaults: function(settings) {
		$.extend( $.validator.defaults, settings );
	},

	messages: {
		required: "This field is required.",
		remote: "Please fix this field.",
		email: "Please enter a valid email address.",
		url: "Please enter a valid URL.",
		date: "Please enter a valid date.",
		dateISO: "Please enter a valid date (ISO).",
		dateDE: "Bitte geben Sie ein gültiges Datum ein.",
		number: "Please enter a valid number.",
		numberDE: "Bitte geben Sie eine Nummer ein.",
		digits: "Please enter only digits",
		creditcard: "Please enter a valid credit card number.",
		equalTo: "Please enter the same value again.",
		accept: "Please enter a value with a valid extension.",
		maxlength: $.validator.format("Please enter no more than {0} characters."),
		minlength: $.validator.format("Please enter at least {0} characters."),
		rangelength: $.validator.format("Please enter a value between {0} and {1} characters long."),
		range: $.validator.format("Please enter a value between {0} and {1}."),
		max: $.validator.format("Please enter a value less than or equal to {0}."),
		min: $.validator.format("Please enter a value greater than or equal to {0}.")
	},
	
	autoCreateRanges: false,
	
	prototype: {
		
		init: function() {
			this.labelContainer = $(this.settings.errorLabelContainer);
			this.errorContext = this.labelContainer.length && this.labelContainer || $(this.currentForm);
			this.containers = $(this.settings.errorContainer).add( this.settings.errorLabelContainer );
			this.submitted = {};
			this.valueCache = {};
			this.pendingRequest = 0;
			this.pending = {};
			this.invalid = {};
			this.reset();
			
			var groups = (this.groups = {});
			$.each(this.settings.groups, function(key, value) {
				$.each(value.split(/\s/), function(index, name) {
					groups[name] = key;
				});
			});
			var rules = this.settings.rules;
			$.each(rules, function(key, value) {
				rules[key] = $.validator.normalizeRule(value);
			});
			
			function delegate(event) {
				var validator = $.data(this[0].form, "validator");
				validator.settings["on" + event.type] && validator.settings["on" + event.type].call(validator, this[0] );
			}
			$(this.currentForm)
				.delegate("focusin focusout keyup", ":text, :password, :file, select, textarea", delegate)
				.delegate("click", ":radio, :checkbox", delegate);

			if (this.settings.invalidHandler)
				$(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler);
		},

		// http://docs.jquery.com/Plugins/Validation/Validator/form
		form: function() {
			this.checkForm();
			$.extend(this.submitted, this.errorMap);
			this.invalid = $.extend({}, this.errorMap);
			if (!this.valid())
				$(this.currentForm).triggerHandler("invalid-form", [this]);
			this.showErrors();
			return this.valid();
		},
		
		checkForm: function() {
			this.prepareForm();
			for ( var i = 0, elements = (this.currentElements = this.elements()); elements[i]; i++ ) {
				this.check( elements[i] );
			}
			return this.valid(); 
		},
		
		// http://docs.jquery.com/Plugins/Validation/Validator/element
		element: function( element ) {
			element = this.clean( element );
			this.lastElement = element;
			this.prepareElement( element );
			this.currentElements = $(element);
			var result = this.check( element );
			if ( result ) {
				delete this.invalid[element.name];
			} else {
				this.invalid[element.name] = true;
			}
			if ( !this.numberOfInvalids() ) {
				// Hide error containers on last error
				this.toHide = this.toHide.add( this.containers );
			}
			this.showErrors();
			return result;
		},

		// http://docs.jquery.com/Plugins/Validation/Validator/showErrors
		showErrors: function(errors) {
			if(errors) {
				// add items to error list and map
				$.extend( this.errorMap, errors );
				this.errorList = [];
				for ( var name in errors ) {
					this.errorList.push({
						message: errors[name],
						element: this.findByName(name)[0]
					});
				}
				// remove items from success list
				this.successList = $.grep( this.successList, function(element) {
					return !(element.name in errors);
				});
			}
			this.settings.showErrors
				? this.settings.showErrors.call( this, this.errorMap, this.errorList )
				: this.defaultShowErrors();
		},
		
		// http://docs.jquery.com/Plugins/Validation/Validator/resetForm
		resetForm: function() {
			if ( $.fn.resetForm )
				$( this.currentForm ).resetForm();
			this.submitted = {};
			this.prepareForm();
			this.hideErrors();
			this.elements().removeClass( this.settings.errorClass );
		},
		
		numberOfInvalids: function() {
			return this.objectLength(this.invalid);
		},
		
		objectLength: function( obj ) {
			var count = 0;
			for ( var i in obj )
				count++;
			return count;
		},
		
		hideErrors: function() {
			this.addWrapper( this.toHide ).hide();
		},
		
		valid: function() {
			return this.size() == 0;
		},
		
		size: function() {
			return this.errorList.length;
		},
		
		focusInvalid: function() {
			if( this.settings.focusInvalid ) {
				try {
					$(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus();
				} catch(e) {
					// ignore IE throwing errors when focusing hidden elements
				}
			}
		},
		
		findLastActive: function() {
			var lastActive = this.lastActive;
			return lastActive && $.grep(this.errorList, function(n) {
				return n.element.name == lastActive.name;
			}).length == 1 && lastActive;
		},
		
		elements: function() {
			var validator = this,
				rulesCache = {};
			
			// select all valid inputs inside the form (no submit or reset buttons)
			// workaround $Query([]).add until http://dev.jquery.com/ticket/2114 is solved
			return $([]).add(this.currentForm.elements)
			.filter(":input")
			.not(":submit, :reset, :image, [disabled]")
			.not( this.settings.ignore )
			.filter(function() {
				!this.name && validator.settings.debug && window.console && console.error( "%o has no name assigned", this);
			
				// select only the first element for each name, and only those with rules specified
				if ( this.name in rulesCache || !validator.objectLength($(this).rules()) )
					return false;
				
				rulesCache[this.name] = true;
				return true;
			});
		},
		
		clean: function( selector ) {
			return $( selector )[0];
		},
		
		errors: function() {
			return $( this.settings.errorElement + "." + this.settings.errorClass, this.errorContext );
		},
		
		reset: function() {
			this.successList = [];
			this.errorList = [];
			this.errorMap = {};
			this.toShow = $([]);
			this.toHide = $([]);
			this.formSubmitted = false;
			this.currentElements = $([]);
		},
		
		prepareForm: function() {
			this.reset();
			this.toHide = this.errors().add( this.containers );
		},
		
		prepareElement: function( element ) {
			this.reset();
			this.toHide = this.errorsFor(element);
		},
	
		check: function( element ) {
			element = this.clean( element );
			
			// if radio/checkbox, validate first element in group instead
			if (this.checkable(element)) {
				element = this.findByName( element.name )[0];
			}
			
			var rules = $(element).rules();
			var dependencyMismatch = false;
			for( method in rules ) {
				var rule = { method: method, parameters: rules[method] };
				try {
					var result = $.validator.methods[method].call( this, element.value.replace(/\r/g, ""), element, rule.parameters );
					
					// if a method indicates that the field is optional and therefore valid,
					// don't mark it as valid when there are no other rules
					if ( result == "dependency-mismatch" ) {
						dependencyMismatch = true;
						continue;
					}
					dependencyMismatch = false;
					
					if ( result == "pending" ) {
						this.toHide = this.toHide.not( this.errorsFor(element) );
						return;
					}
					
					if( !result ) {
						this.formatAndAdd( element, rule );
						return false;
					}
				} catch(e) {
					this.settings.debug && window.console && console.log("exception occured when checking element " + element.id
						 + ", check the '" + rule.method + "' method");
					throw e;
				}
			}
			if (dependencyMismatch)
				return;
			if ( this.objectLength(rules) )
				this.successList.push(element);
			return true;
		},
		
		// return the custom message for the given element and validation method
		// specified in the element's "messages" metadata
		customMetaMessage: function(element, method) {
			if (!$.metadata)
				return;
			
			var meta = this.settings.meta
				? $(element).metadata()[this.settings.meta]
				: $(element).metadata();
			
			return meta && meta.messages && meta.messages[method];
		},
		
		// return the custom message for the given element name and validation method
		customMessage: function( name, method ) {
			var m = this.settings.messages[name];
			return m && (m.constructor == String
				? m
				: m[method]);
		},
		
		// return the first defined argument, allowing empty strings
		findDefined: function() {
			for(var i = 0; i < arguments.length; i++) {
				if (arguments[i] !== undefined)
					return arguments[i];
			}
			return undefined;
		},
		
		defaultMessage: function( element, method) {
			return this.findDefined(
				this.customMessage( element.name, method ),
				this.customMetaMessage( element, method ),
				// title is never undefined, so handle empty string as undefined
				!this.settings.ignoreTitle && element.title || undefined,
				$.validator.messages[method],
				"<strong>Warning: No message defined for " + element.name + "</strong>"
			);
		},
		
		formatAndAdd: function( element, rule ) {
			var message = this.defaultMessage( element, rule.method );
			if ( typeof message == "function" ) 
				message = message.call(this, rule.parameters, element);
			this.errorList.push({
				message: message,
				element: element
			});
			this.errorMap[element.name] = message;
			this.submitted[element.name] = message;
		},
		
		addWrapper: function(toToggle) {
			if ( this.settings.wrapper )
				toToggle = toToggle.add( toToggle.parent( this.settings.wrapper ) );
			return toToggle;
		},
		
		defaultShowErrors: function() {
			for ( var i = 0; this.errorList[i]; i++ ) {
				var error = this.errorList[i];
				this.settings.highlight && this.settings.highlight.call( this, error.element, this.settings.errorClass, this.settings.validClass );
				this.showLabel( error.element, error.message );
			}
			if( this.errorList.length ) {
				this.toShow = this.toShow.add( this.containers );
			}
			if (this.settings.success) {
				for ( var i = 0; this.successList[i]; i++ ) {
					this.showLabel( this.successList[i] );
				}
			}
			if (this.settings.unhighlight) {
				for ( var i = 0, elements = this.validElements(); elements[i]; i++ ) {
					this.settings.unhighlight.call( this, elements[i], this.settings.errorClass, this.settings.validClass );
				}
			}
			this.toHide = this.toHide.not( this.toShow );
			this.hideErrors();
			this.addWrapper( this.toShow ).show();
		},
		
		validElements: function() {
			return this.currentElements.not(this.invalidElements());
		},
		
		invalidElements: function() {
			return $(this.errorList).map(function() {
				return this.element;
			});
		},
		
		showLabel: function(element, message) {
			var label = this.errorsFor( element );
			if ( label.length ) {
				// refresh error/success class
				label.removeClass().addClass( this.settings.errorClass );
			
				// check if we have a generated label, replace the message then
				label.attr("generated") && label.html(message);
			} else {
				// create label
				label = $("<" + this.settings.errorElement + "/>")
					.attr({"for":  this.idOrName(element), generated: true})
					.addClass(this.settings.errorClass)
					.html(message || "");
				if ( this.settings.wrapper ) {
					// make sure the element is visible, even in IE
					// actually showing the wrapped element is handled elsewhere
					label = label.hide().show().wrap("<" + this.settings.wrapper + "/>").parent();
				}
				if ( !this.labelContainer.append(label).length )
					this.settings.errorPlacement
						? this.settings.errorPlacement(label, $(element) )
						: label.insertAfter(element);
			}
			if ( !message && this.settings.success ) {
				label.text("");
				typeof this.settings.success == "string"
					? label.addClass( this.settings.success )
					: this.settings.success( label );
			}
			this.toShow = this.toShow.add(label);
		},
		
		errorsFor: function(element) {
			return this.errors().filter("[for='" + this.idOrName(element) + "']");
		},
		
		idOrName: function(element) {
			return this.groups[element.name] || (this.checkable(element) ? element.name : element.id || element.name);
		},

		checkable: function( element ) {
			return /radio|checkbox/i.test(element.type);
		},
		
		findByName: function( name ) {
			// select by name and filter by form for performance over form.find("[name=...]")
			var form = this.currentForm;
			return $(document.getElementsByName(name)).map(function(index, element) {
				return element.form == form && element.name == name && element  || null;
			});
		},
		
		getLength: function(value, element) {
			switch( element.nodeName.toLowerCase() ) {
			case 'select':
				return $("option:selected", element).length;
			case 'input':
				if( this.checkable( element) )
					return this.findByName(element.name).filter(':checked').length;
			}
			return value.length;
		},
	
		depend: function(param, element) {
			return this.dependTypes[typeof param]
				? this.dependTypes[typeof param](param, element)
				: true;
		},
	
		dependTypes: {
			"boolean": function(param, element) {
				return param;
			},
			"string": function(param, element) {
				return !!$(param, element.form).length;
			},
			"function": function(param, element) {
				return param(element);
			}
		},
		
		optional: function(element) {
			return !$.validator.methods.required.call(this, $.trim(element.value), element) && "dependency-mismatch";
		},
		
		startRequest: function(element) {
			if (!this.pending[element.name]) {
				this.pendingRequest++;
				this.pending[element.name] = true;
			}
		},
		
		stopRequest: function(element, valid) {
			this.pendingRequest--;
			// sometimes synchronization fails, make sure pendingRequest is never < 0
			if (this.pendingRequest < 0)
				this.pendingRequest = 0;
			delete this.pending[element.name];
			if ( valid && this.pendingRequest == 0 && this.formSubmitted && this.form() ) {
				$(this.currentForm).submit();
			} else if (!valid && this.pendingRequest == 0 && this.formSubmitted) {
				$(this.currentForm).triggerHandler("invalid-form", [this]);
			}
		},
		
		previousValue: function(element) {
			return $.data(element, "previousValue") || $.data(element, "previousValue", previous = {
				old: null,
				valid: true,
				message: this.defaultMessage( element, "remote" )
			});
		}
		
	},
	
	classRuleSettings: {
		required: {required: true},
		email: {email: true},
		url: {url: true},
		date: {date: true},
		dateISO: {dateISO: true},
		dateDE: {dateDE: true},
		number: {number: true},
		numberDE: {numberDE: true},
		digits: {digits: true},
		creditcard: {creditcard: true}
	},
	
	addClassRules: function(className, rules) {
		className.constructor == String ?
			this.classRuleSettings[className] = rules :
			$.extend(this.classRuleSettings, className);
	},
	
	classRules: function(element) {
		var rules = {};
		var classes = $(element).attr('class');
		classes && $.each(classes.split(' '), function() {
			if (this in $.validator.classRuleSettings) {
				$.extend(rules, $.validator.classRuleSettings[this]);
			}
		});
		return rules;
	},
	
	attributeRules: function(element) {
		var rules = {};
		var $element = $(element);
		
		for (method in $.validator.methods) {
			var value = $element.attr(method);
			if (value) {
				rules[method] = value;
			}
		}
		
		// maxlength may be returned as -1, 2147483647 (IE) and 524288 (safari) for text inputs
		if (rules.maxlength && /-1|2147483647|524288/.test(rules.maxlength)) {
			delete rules.maxlength;
		}
		
		return rules;
	},
	
	metadataRules: function(element) {
		if (!$.metadata) return {};
		
		var meta = $.data(element.form, 'validator').settings.meta;
		return meta ?
			$(element).metadata()[meta] :
			$(element).metadata();
	},
	
	staticRules: function(element) {
		var rules = {};
		var validator = $.data(element.form, 'validator');
		if (validator.settings.rules) {
			rules = $.validator.normalizeRule(validator.settings.rules[element.name]) || {};
		}
		return rules;
	},
	
	normalizeRules: function(rules, element) {
		// handle dependency check
		$.each(rules, function(prop, val) {
			// ignore rule when param is explicitly false, eg. required:false
			if (val === false) {
				delete rules[prop];
				return;
			}
			if (val.param || val.depends) {
				var keepRule = true;
				switch (typeof val.depends) {
					case "string":
						keepRule = !!$(val.depends, element.form).length;
						break;
					case "function":
						keepRule = val.depends.call(element, element);
						break;
				}
				if (keepRule) {
					rules[prop] = val.param !== undefined ? val.param : true;
				} else {
					delete rules[prop];
				}
			}
		});
		
		// evaluate parameters
		$.each(rules, function(rule, parameter) {
			rules[rule] = $.isFunction(parameter) ? parameter(element) : parameter;
		});
		
		// clean number parameters
		$.each(['minlength', 'maxlength', 'min', 'max'], function() {
			if (rules[this]) {
				rules[this] = Number(rules[this]);
			}
		});
		$.each(['rangelength', 'range'], function() {
			if (rules[this]) {
				rules[this] = [Number(rules[this][0]), Number(rules[this][1])];
			}
		});
		
		if ($.validator.autoCreateRanges) {
			// auto-create ranges
			if (rules.min && rules.max) {
				rules.range = [rules.min, rules.max];
				delete rules.min;
				delete rules.max;
			}
			if (rules.minlength && rules.maxlength) {
				rules.rangelength = [rules.minlength, rules.maxlength];
				delete rules.minlength;
				delete rules.maxlength;
			}
		}
		
		// To support custom messages in metadata ignore rule methods titled "messages"
		if (rules.messages) {
			delete rules.messages;
		}
		
		return rules;
	},
	
	// Converts a simple string to a {string: true} rule, e.g., "required" to {required:true}
	normalizeRule: function(data) {
		if( typeof data == "string" ) {
			var transformed = {};
			$.each(data.split(/\s/), function() {
				transformed[this] = true;
			});
			data = transformed;
		}
		return data;
	},
	
	// http://docs.jquery.com/Plugins/Validation/Validator/addMethod
	addMethod: function(name, method, message) {
		$.validator.methods[name] = method;
		$.validator.messages[name] = message || $.validator.messages[name];
		if (method.length < 3) {
			$.validator.addClassRules(name, $.validator.normalizeRule(name));
		}
	},

	methods: {

		// http://docs.jquery.com/Plugins/Validation/Methods/required
		required: function(value, element, param) {
			// check if dependency is met
			if ( !this.depend(param, element) )
				return "dependency-mismatch";
			switch( element.nodeName.toLowerCase() ) {
			case 'select':
				var options = $("option:selected", element);
				return options.length > 0 && ( element.type == "select-multiple" || ($.browser.msie && !(options[0].attributes['value'].specified) ? options[0].text : options[0].value).length > 0);
			case 'input':
				if ( this.checkable(element) )
					return this.getLength(value, element) > 0;
			default:
				return $.trim(value).length > 0;
			}
		},
		
		// http://docs.jquery.com/Plugins/Validation/Methods/remote
		remote: function(value, element, param) {
			if ( this.optional(element) )
				return "dependency-mismatch";
			
			var previous = this.previousValue(element);
			
			if (!this.settings.messages[element.name] )
				this.settings.messages[element.name] = {};
			this.settings.messages[element.name].remote = typeof previous.message == "function" ? previous.message(value) : previous.message;
			
			param = typeof param == "string" && {url:param} || param; 
			
			if ( previous.old !== value ) {
				previous.old = value;
				var validator = this;
				this.startRequest(element);
				var data = {};
				data[element.name] = value;
				$.ajax($.extend(true, {
					url: param,
					mode: "abort",
					port: "validate" + element.name,
					dataType: "json",
					data: data,
					success: function(response) {
						var valid = response === true;
						if ( valid ) {
							var submitted = validator.formSubmitted;
							validator.prepareElement(element);
							validator.formSubmitted = submitted;
							validator.successList.push(element);
							validator.showErrors();
						} else {
							var errors = {};
							errors[element.name] = previous.message = response || validator.defaultMessage( element, "remote" );
							validator.showErrors(errors);
						}
						previous.valid = valid;
						validator.stopRequest(element, valid);
					}
				}, param));
				return "pending";
			} else if( this.pending[element.name] ) {
				return "pending";
			}
			return previous.valid;
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/minlength
		minlength: function(value, element, param) {
			return this.optional(element) || this.getLength($.trim(value), element) >= param;
		},
		
		// http://docs.jquery.com/Plugins/Validation/Methods/maxlength
		maxlength: function(value, element, param) {
			return this.optional(element) || this.getLength($.trim(value), element) <= param;
		},
		
		// http://docs.jquery.com/Plugins/Validation/Methods/rangelength
		rangelength: function(value, element, param) {
			var length = this.getLength($.trim(value), element);
			return this.optional(element) || ( length >= param[0] && length <= param[1] );
		},
		
		// http://docs.jquery.com/Plugins/Validation/Methods/min
		min: function( value, element, param ) {
			return this.optional(element) || value >= param;
		},
		
		// http://docs.jquery.com/Plugins/Validation/Methods/max
		max: function( value, element, param ) {
			return this.optional(element) || value <= param;
		},
		
		// http://docs.jquery.com/Plugins/Validation/Methods/range
		range: function( value, element, param ) {
			return this.optional(element) || ( value >= param[0] && value <= param[1] );
		},
		
		// http://docs.jquery.com/Plugins/Validation/Methods/email
		email: function(value, element) {
			// contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
			return this.optional(element) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(value);
		},
	
		// http://docs.jquery.com/Plugins/Validation/Methods/url
		url: function(value, element) {
			// contributed by Scott Gonzalez: http://projects.scottsplayground.com/iri/
			return this.optional(element) || /^(((https?|ftp):\/\/)|www\.)(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
		},
        
		// http://docs.jquery.com/Plugins/Validation/Methods/date
		date: function(value, element) {
			return this.optional(element) || !/Invalid|NaN/.test(new Date(value));
		},
	
		// http://docs.jquery.com/Plugins/Validation/Methods/dateISO
		dateISO: function(value, element) {
			return this.optional(element) || /^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(value);
		},
	
		// http://docs.jquery.com/Plugins/Validation/Methods/dateDE
		dateDE: function(value, element) {
			return this.optional(element) || /^\d\d?\.\d\d?\.\d\d\d?\d?$/.test(value);
		},
	
		// http://docs.jquery.com/Plugins/Validation/Methods/number
		number: function(value, element) {
			return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(value);
		},
	
		// http://docs.jquery.com/Plugins/Validation/Methods/numberDE
		numberDE: function(value, element) {
			return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:\.\d{3})+)(?:,\d+)?$/.test(value);
		},
		
		// http://docs.jquery.com/Plugins/Validation/Methods/digits
		digits: function(value, element) {
			return this.optional(element) || /^\d+$/.test(value);
		},
		
		// http://docs.jquery.com/Plugins/Validation/Methods/creditcard
		// based on http://en.wikipedia.org/wiki/Luhn
		creditcard: function(value, element) {
			if ( this.optional(element) )
				return "dependency-mismatch";
			// accept only digits and dashes
			if (/[^0-9-]+/.test(value))
				return false;
			var nCheck = 0,
				nDigit = 0,
				bEven = false;

			value = value.replace(/\D/g, "");

			for (n = value.length - 1; n >= 0; n--) {
				var cDigit = value.charAt(n);
				var nDigit = parseInt(cDigit, 10);
				if (bEven) {
					if ((nDigit *= 2) > 9)
						nDigit -= 9;
				}
				nCheck += nDigit;
				bEven = !bEven;
			}

			return (nCheck % 10) == 0;
		},
		
		// http://docs.jquery.com/Plugins/Validation/Methods/accept
		accept: function(value, element, param) {
			param = typeof param == "string" ? param.replace(/,/g, '|') : "png|jpe?g|gif";
			return this.optional(element) || value.match(new RegExp(".(" + param + ")$", "i")); 
		},
		
		// http://docs.jquery.com/Plugins/Validation/Methods/equalTo
		equalTo: function(value, element, param) {
			return value == $(param).val();
		}
		
	}
	
});

// deprecated, use $.validator.format instead
$.format = $.validator.format;

})(jQuery);

// ajax mode: abort
// usage: $.ajax({ mode: "abort"[, port: "uniqueport"]});
// if mode:"abort" is used, the previous request on that port (port can be undefined) is aborted via XMLHttpRequest.abort() 
;(function($) {
	var ajax = $.ajax;
	var pendingRequests = {};
	$.ajax = function(settings) {
		// create settings for compatibility with ajaxSetup
		settings = $.extend(settings, $.extend({}, $.ajaxSettings, settings));
		var port = settings.port;
		if (settings.mode == "abort") {
			if ( pendingRequests[port] ) {
				pendingRequests[port].abort();
			}
			return (pendingRequests[port] = ajax.apply(this, arguments));
		}
		return ajax.apply(this, arguments);
	};
})(jQuery);

// provides cross-browser focusin and focusout events
// IE has native support, in other browsers, use event caputuring (neither bubbles)

// provides delegate(type: String, delegate: Selector, handler: Callback) plugin for easier event delegation
// handler is only called when $(event.target).is(delegate), in the scope of the jquery-object for event.target 

// provides triggerEvent(type: String, target: Element) to trigger delegated events
;(function($) {
	$.each({
		focus: 'focusin',
		blur: 'focusout'	
	}, function( original, fix ){
		$.event.special[fix] = {
			setup:function() {
				if ( $.browser.msie ) return false;
				this.addEventListener( original, $.event.special[fix].handler, true );
			},
			teardown:function() {
				if ( $.browser.msie ) return false;
				this.removeEventListener( original,
				$.event.special[fix].handler, true );
			},
			handler: function(e) {
				arguments[0] = $.event.fix(e);
				arguments[0].type = fix;
				return $.event.handle.apply(this, arguments);
			}
		};
	});
	$.extend($.fn, {
		delegate: function(type, delegate, handler) {
			return this.bind(type, function(event) {
				var target = $(event.target);
				if (target.is(delegate)) {
					return handler.apply(target, arguments);
				}
			});
		},
		triggerEvent: function(type, target) {
			return this.triggerHandler(type, [$.event.fix({ type: type, target: target })]);
		}
	});
})(jQuery);
/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 *//**
 * SWFObject v1.5.1: Flash Player detection and embed - http://blog.deconcept.com/swfobject/
 *
 * SWFObject is (c) 2007 Geoff Stearns and is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */
if(typeof deconcept == "undefined") var deconcept = {};
if(typeof deconcept.util == "undefined") deconcept.util = {};
if(typeof deconcept.SWFObjectUtil == "undefined") deconcept.SWFObjectUtil = {};
deconcept.SWFObject = function(swf, id, w, h, ver, c, quality, xiRedirectUrl, redirectUrl, detectKey) {
	if (!document.getElementById) { return; }
	this.DETECT_KEY = detectKey ? detectKey : 'detectflash';
	this.skipDetect = deconcept.util.getRequestParameter(this.DETECT_KEY);
	this.params = {};
	this.variables = {};
	this.attributes = [];
	if(swf) { this.setAttribute('swf', swf); }
	if(id) { this.setAttribute('id', id); }
	if(w) { this.setAttribute('width', w); }
	if(h) { this.setAttribute('height', h); }
	if(ver) { this.setAttribute('version', new deconcept.PlayerVersion(ver.toString().split("."))); }
	this.installedVer = deconcept.SWFObjectUtil.getPlayerVersion();
	if (!window.opera && document.all && this.installedVer.major > 7) {
		// only add the onunload cleanup if the Flash Player version supports External Interface and we are in IE
		// fixes bug in some fp9 versions see http://blog.deconcept.com/2006/07/28/swfobject-143-released/
		if (!deconcept.unloadSet) {
			deconcept.SWFObjectUtil.prepUnload = function() {
				__flash_unloadHandler = function(){};
				__flash_savedUnloadHandler = function(){};
				window.attachEvent("onunload", deconcept.SWFObjectUtil.cleanupSWFs);
			}
			window.attachEvent("onbeforeunload", deconcept.SWFObjectUtil.prepUnload);
			deconcept.unloadSet = true;
		}
	}
	if(c) { this.addParam('bgcolor', c); }
	var q = quality ? quality : 'high';
	this.addParam('quality', q);
	this.setAttribute('useExpressInstall', false);
	this.setAttribute('doExpressInstall', false);
	var xir = (xiRedirectUrl) ? xiRedirectUrl : window.location;
	this.setAttribute('xiRedirectUrl', xir);
	this.setAttribute('redirectUrl', '');
	if(redirectUrl) { this.setAttribute('redirectUrl', redirectUrl); }
}
deconcept.SWFObject.prototype = {
	useExpressInstall: function(path) {
		this.xiSWFPath = !path ? "expressinstall.swf" : path;
		this.setAttribute('useExpressInstall', true);
	},
	setAttribute: function(name, value){
		this.attributes[name] = value;
	},
	getAttribute: function(name){
		return this.attributes[name] || "";
	},
	addParam: function(name, value){
		this.params[name] = value;
	},
	getParams: function(){
		return this.params;
	},
	addVariable: function(name, value){
		this.variables[name] = value;
	},
	getVariable: function(name){
		return this.variables[name] || "";
	},
	getVariables: function(){
		return this.variables;
	},
	getVariablePairs: function(){
		var variablePairs = [];
		var key;
		var variables = this.getVariables();
		for(key in variables){
			variablePairs[variablePairs.length] = key +"="+ variables[key];
		}
		return variablePairs;
	},
	getSWFHTML: function() {
		var swfNode = "";
		if (navigator.plugins && navigator.mimeTypes && navigator.mimeTypes.length) { // netscape plugin architecture
			if (this.getAttribute("doExpressInstall")) {
				this.addVariable("MMplayerType", "PlugIn");
				this.setAttribute('swf', this.xiSWFPath);
			}
			swfNode = '<embed type="application/x-shockwave-flash" src="'+ this.getAttribute('swf') +'" width="'+ this.getAttribute('width') +'" height="'+ this.getAttribute('height') +'" style="'+ (this.getAttribute('style') || "") +'"';
			swfNode += ' id="'+ this.getAttribute('id') +'" name="'+ this.getAttribute('id') +'" ';
			var params = this.getParams();
			 for(var key in params){ swfNode += [key] +'="'+ params[key] +'" '; }
			var pairs = this.getVariablePairs().join("&");
			 if (pairs.length > 0){ swfNode += 'flashvars="'+ pairs +'"'; }
			swfNode += '/>';
		} else { // PC IE
			if (this.getAttribute("doExpressInstall")) {
				this.addVariable("MMplayerType", "ActiveX");
				this.setAttribute('swf', this.xiSWFPath);
			}
			swfNode = '<object id="'+ this.getAttribute('id') +'" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+ this.getAttribute('width') +'" height="'+ this.getAttribute('height') +'" style="'+ (this.getAttribute('style') || "") +'">';
			swfNode += '<param name="movie" value="'+ this.getAttribute('swf') +'" />';
			var params = this.getParams();
			for(var key in params) {
			 swfNode += '<param name="'+ key +'" value="'+ params[key] +'" />';
			}
			var pairs = this.getVariablePairs().join("&");
			if(pairs.length > 0) {swfNode += '<param name="flashvars" value="'+ pairs +'" />';}
			swfNode += "</object>";
		}
		return swfNode;
	},
	write: function(elementId){
		if(this.getAttribute('useExpressInstall')) {
			// check to see if we need to do an express install
			var expressInstallReqVer = new deconcept.PlayerVersion([6,0,65]);
			if (this.installedVer.versionIsValid(expressInstallReqVer) && !this.installedVer.versionIsValid(this.getAttribute('version'))) {
				this.setAttribute('doExpressInstall', true);
				this.addVariable("MMredirectURL", escape(this.getAttribute('xiRedirectUrl')));
				document.title = document.title.slice(0, 47) + " - Flash Player Installation";
				this.addVariable("MMdoctitle", document.title);
			}
		}
		if(this.skipDetect || this.getAttribute('doExpressInstall') || this.installedVer.versionIsValid(this.getAttribute('version'))){
			var n = (typeof elementId == 'string') ? document.getElementById(elementId) : elementId;
			n.innerHTML = this.getSWFHTML();
			return true;
		}else{
			if(this.getAttribute('redirectUrl') != "") {
				document.location.replace(this.getAttribute('redirectUrl'));
			}
		}
		return false;
	}
}

/* ---- detection functions ---- */
deconcept.SWFObjectUtil.getPlayerVersion = function(){
	var PlayerVersion = new deconcept.PlayerVersion([0,0,0]);
	if(navigator.plugins && navigator.mimeTypes.length){
		var x = navigator.plugins["Shockwave Flash"];
		if(x && x.description) {
			PlayerVersion = new deconcept.PlayerVersion(x.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s+r|\s+b[0-9]+)/, ".").split("."));
		}
	}else if (navigator.userAgent && navigator.userAgent.indexOf("Windows CE") >= 0){ // if Windows CE
		var axo = 1;
		var counter = 3;
		while(axo) {
			try {
				counter++;
				axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+ counter);
//				document.write("player v: "+ counter);
				PlayerVersion = new deconcept.PlayerVersion([counter,0,0]);
			} catch (e) {
				axo = null;
			}
		}
	} else { // Win IE (non mobile)
		// do minor version lookup in IE, but avoid fp6 crashing issues
		// see http://blog.deconcept.com/2006/01/11/getvariable-setvariable-crash-internet-explorer-flash-6/
		try{
			var axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
		}catch(e){
			try {
				var axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
				PlayerVersion = new deconcept.PlayerVersion([6,0,21]);
				axo.AllowScriptAccess = "always"; // error if player version < 6.0.47 (thanks to Michael Williams @ Adobe for this code)
			} catch(e) {
				if (PlayerVersion.major == 6) {
					return PlayerVersion;
				}
			}
			try {
				axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
			} catch(e) {}
		}
		if (axo != null) {
			PlayerVersion = new deconcept.PlayerVersion(axo.GetVariable("$version").split(" ")[1].split(","));
		}
	}
	return PlayerVersion;
}
deconcept.PlayerVersion = function(arrVersion){
	this.major = arrVersion[0] != null ? parseInt(arrVersion[0]) : 0;
	this.minor = arrVersion[1] != null ? parseInt(arrVersion[1]) : 0;
	this.rev = arrVersion[2] != null ? parseInt(arrVersion[2]) : 0;
}
deconcept.PlayerVersion.prototype.versionIsValid = function(fv){
	if(this.major < fv.major) return false;
	if(this.major > fv.major) return true;
	if(this.minor < fv.minor) return false;
	if(this.minor > fv.minor) return true;
	if(this.rev < fv.rev) return false;
	return true;
}
/* ---- get value of query string param ---- */
deconcept.util = {
	getRequestParameter: function(param) {
		var q = document.location.search || document.location.hash;
		if (param == null) { return q; }
		if(q) {
			var pairs = q.substring(1).split("&");
			for (var i=0; i < pairs.length; i++) {
				if (pairs[i].substring(0, pairs[i].indexOf("=")) == param) {
					return pairs[i].substring((pairs[i].indexOf("=")+1));
				}
			}
		}
		return "";
	}
}
/* fix for video streaming bug */
deconcept.SWFObjectUtil.cleanupSWFs = function() {
	var objects = document.getElementsByTagName("OBJECT");
	for (var i = objects.length - 1; i >= 0; i--) {
		objects[i].style.display = 'none';
		for (var x in objects[i]) {
			if (typeof objects[i][x] == 'function') {
				objects[i][x] = function(){};
			}
		}
	}
}
/* add document.getElementById if needed (mobile IE < 5) */
if (!document.getElementById && document.all) { document.getElementById = function(id) { return document.all[id]; }}

/* add some aliases for ease of use/backwards compatibility */
var getQueryParamValue = deconcept.util.getRequestParameter;
var FlashObject = deconcept.SWFObject; // for legacy support
var SWFObject = deconcept.SWFObject;
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

(function() {
	if (!this)
		return;
	this.preventDefault = this.preventDefault || function () {
		this.returnValue = false;
	};
	this.stopPropagation = this.stopPropagation || function () {
		this.cancelBubble=true;
	};	
}).call((function () {
	try {
		return Event.prototype;
	} catch (e) {
		return null;
	}
}).call(this));

(function() {
	if (!this)
		return;
	var eventMap = {
		"DOMContentLoaded": {
			"event": "onreadystatechange",
			"wrapper": function (wrapper) {
				return function (e) {
					if (document.readyState=="complete")
						wrapper(e);
				};
			}
		}
	};
	this.addEventListener = this.addEventListener || function (type, listener, useCapture) {
		var self = this;
		var wrapper = function (e) {
			e.target = e.srcElement || self;
	        e.currentTarget = self;
	        if (typeof listener.handleEvent != 'undefined')
	            listener.handleEvent(e);
	        else
	            listener.call(self,e);
        };
        if (eventMap[type])
        	wrapper = eventMap[type].wrapper(wrapper);
        this.attachEvent("on" + (eventMap[type] ? eventMap[type].event : type), wrapper);
        try {
	        this.__eventlisteners = this.__eventlisteners || {};
	        this.__eventlisteners[type] = this.__eventlisteners[type] || [];
	        this.__eventlisteners[type].push({listener:listener, wrapper:wrapper});
        } catch (e) {
        	listener.__eventwrapper = wrapper;
        }
	};
	this.removeEventListener = this.removeEventListener || function (type, listener, useCapture) {
		try {
			if (this.__eventlisteners && this.__eventlisteners[type]) {
				for (var i = 0; i < this.__eventlisteners[type].length; ++i) {
					if (this.__eventlisteners[type][i].listener === listener) {
			            this.detachEvent("on" + (eventMap[type] ? eventMap[type].event : type), this.__eventlisteners[type][i].wrapper);
			            this.__eventlisteners[type].splice(i, 1);
			            return;
					}
				}
			}
		} catch (e) {}
		try {
			if (listener.__eventwrapper)
				this.detachEvent("on" + (eventMap[type] ? eventMap[type].event : type), listener.__eventwrapper);
		} catch (e) {}
	};
	this.dispatchEvent = this.dispatchEvent || function (eventObject) {
		var type = eventObject.type;
		var onEvent = "on" + type;
		try {
			return this.fireEvent(onEvent, eventObject);
		} catch (e) {
			var E = Element;
			try {
				E = HTMLElement;
			} catch (e) {}
			if (onEvent in E.prototype)
				throw e;
			if (this.__eventlisteners && this.__eventlisteners[type]) {
				for (var i = 0; i < this.__eventlisteners[type].length; ++i) {
					this.__eventlisteners[type][i].wrapper.call(this, eventObject);
				}
			}
		}
	};
}).call((function () {
	try {
		return Element.prototype;
	} catch (e) {
		return null;
	}
}).call(this));
	
(function() {
	if (!this)
		return;
	this.addEventListener = this.addEventListener || Element.prototype.addEventListener;
	this.removeEventListener = this.removeEventListener || Element.prototype.removeEventListener;
	this.dispatchEvent = this.dispatchEvent || Element.prototype.dispatchEvent;
}).call((function () {
	try {
		return HTMLDocument.prototype;
	} catch (e) {
		return null;
	}
}).call(this));

(function() {
	if (!this)
		return;
	this.addEventListener = this.addEventListener || Element.prototype.addEventListener;
	this.removeEventListener = this.removeEventListener || Element.prototype.removeEventListener;
	this.dispatchEvent = this.dispatchEvent || Element.prototype.dispatchEvent;
}).call((function () {
	try {
		return Window.prototype;
	} catch (e) {
		return null;
	}
}).call(this));

/*!
betajs-shims - v0.0.3 - 2016-06-06
Copyright (c) Oliver Friedmann
Apache-2.0 Software License.
*/
(function() {
	if (this.Map !== undefined)
		return;

	this.Map = function() {
		this.clear();
	};

	this.Map.prototype.set = function(key, value) {
		if (key in this.__data)
			this.__data[key].value = value;
		else {
			var obj = {
				key : key,
				value : value,
				prev : this.__last,
				next : null
			};
			this.__data[key] = obj;
			if (this.__last)
				this.__last.next = obj;
			else
				this.__first = obj;
			this.__last = obj;
			this.size++;
		}
		return this;
	};

	this.Map.prototype.get = function(key) {
		return key in this.__data ? this.__data[key].value : undefined;
	};

	this.Map.prototype.has = function(key) {
		return key in this.__data;
	};

	this.Map.prototype['delete'] = function(key) {
		var obj = this.__data[key];
		if (obj) {
			delete this.__data[key];
			this.size--;
			if (obj.prev)
				obj.prev.next = obj.next;
			else
				this.__first = obj.next;
			if (obj.next)
				obj.next.prev = obj.prev;
			else
				this.__last = obj.prev;
		}
		return this;
	};

	this.Map.prototype.clear = function() {
		this.__data = {};
		this.__first = null;
		this.__last = null;
		this.size = 0;
		return this;
	};

	this.Map.prototype.keys = function() {
		return {
			current : this.__first,
			next : function() {
				var current = this.current;
				if (!current)
					return {
						done : true
					};
				this.current = current.next;
				return {
					done : false,
					value : current.key
				};
			}
		};
	};

	this.Map.prototype.values = function() {
		return {
			current : this.__first,
			next : function() {
				var current = this.current;
				if (!current)
					return {
						done : true
					};
				this.current = current.next;
				return {
					done : false,
					value : current.value
				};
			}
		};
	};

	this.Map.prototype.entries = function() {
		return {
			current : this.__first,
			next : function() {
				var current = this.current;
				if (!current)
					return {
						done : true
					};
				this.current = current.next;
				return {
					done : false,
					value : [ current.key, current.value ]
				};
			}
		};
	};

	this.Map.prototype.forEach = function(callback, context) {
		var current = this.__first;
		while (current) {
			callback.call(context, current.value, current.key, this);
			current = current.next;
		}
		return this;
	};

}).call((function () {
	try {
		return window;
	} catch (e) {
		return global;
	}
}).call(this));

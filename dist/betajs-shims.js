/*!
betajs-shims - v0.0.14 - 2019-04-16
Copyright (c) Oliver Friedmann
Apache-2.0 Software License.
*/
(function() {
    if (!this)
        return;

    // Production steps of ECMA-262, Edition 5, 15.4.4.18
    // Reference: http://es5.github.io/#x15.4.4.18
    if (!this.forEach) {
        this.forEach = function (callback/*, thisArg*/) {

            var T, k;

            if (this === null) {
                throw new TypeError('this is null or not defined');
            }

            // 1. Let O be the result of calling toObject() passing the
            // |this| value as the argument.
            var O = Object(this);

            // 2. Let lenValue be the result of calling the Get() internal
            // method of O with the argument "length".
            // 3. Let len be toUint32(lenValue).
            var len = O.length >>> 0;

            // 4. If isCallable(callback) is false, throw a TypeError exception.
            // See: http://es5.github.com/#x9.11
            if (typeof callback !== 'function') {
                throw new TypeError(callback + ' is not a function');
            }

            // 5. If thisArg was supplied, let T be thisArg; else let
            // T be undefined.
            if (arguments.length > 1) {
                T = arguments[1];
            }

            // 6. Let k be 0.
            k = 0;

            // 7. Repeat while k < len.
            while (k < len) {

                var kValue;

                // a. Let Pk be ToString(k).
                //    This is implicit for LHS operands of the in operator.
                // b. Let kPresent be the result of calling the HasProperty
                //    internal method of O with argument Pk.
                //    This step can be combined with c.
                // c. If kPresent is true, then
                if (k in O) {

                    // i. Let kValue be the result of calling the Get internal
                    // method of O with argument Pk.
                    kValue = O[k];

                    // ii. Call the Call internal method of callback with T as
                    // the this value and argument list containing kValue, k, and O.
                    callback.call(T, kValue, k, O);
                }
                // d. Increase k by 1.
                k++;
            }
            // 8. return undefined.
        };
    }

    if (!this.filter) {
        this.filter = function (func, thisArg) {
            if (!(((typeof func).toLowerCase() === 'function') && this))
                throw new TypeError();

            var len = this.length >>> 0,
                res = new Array(len), // preallocate array
                t = this, c = 0, i = -1;
            if (thisArg === undefined) {
                while (++i !== len)
                    // checks to see if the key was set
                    if (i in this)
                        if (func(t[i], i, t))
                            res[c++] = t[i];
            } else {
                while (++i !== len)
                    // checks to see if the key was set
                    if (i in this)
                        if (func.call(thisArg, t[i], i, t))
                            res[c++] = t[i];
            }
            res.length = c; // shrink down array to proper size
            return res;
        };
    }

    // Production steps of ECMA-262, Edition 5, 15.4.4.19
    // Reference: http://es5.github.io/#x15.4.4.19
    if (!this.map) {
        this.map = function(callback/*, thisArg*/) {

            var T, A, k;

            if (this === null) {
                throw new TypeError('this is null or not defined');
            }

            // 1. Let O be the result of calling ToObject passing the |this|
            //    value as the argument.
            var O = Object(this);

            // 2. Let lenValue be the result of calling the Get internal
            //    method of O with the argument "length".
            // 3. Let len be ToUint32(lenValue).
            var len = O.length >>> 0;

            // 4. If IsCallable(callback) is false, throw a TypeError exception.
            // See: http://es5.github.com/#x9.11
            if (typeof callback !== 'function') {
                throw new TypeError(callback + ' is not a function');
            }

            // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
            if (arguments.length > 1) {
                T = arguments[1];
            }

            // 6. Let A be a new array created as if by the expression new Array(len)
            //    where Array is the standard built-in constructor with that name and
            //    len is the value of len.
            A = new Array(len);

            // 7. Let k be 0
            k = 0;

            // 8. Repeat, while k < len
            while (k < len) {

                var kValue, mappedValue;

                // a. Let Pk be ToString(k).
                //   This is implicit for LHS operands of the in operator
                // b. Let kPresent be the result of calling the HasProperty internal
                //    method of O with argument Pk.
                //   This step can be combined with c
                // c. If kPresent is true, then
                if (k in O) {

                    // i. Let kValue be the result of calling the Get internal
                    //    method of O with argument Pk.
                    kValue = O[k];

                    // ii. Let mappedValue be the result of calling the Call internal
                    //     method of callback with T as the this value and argument
                    //     list containing kValue, k, and O.
                    mappedValue = callback.call(T, kValue, k, O);

                    // iii. Call the DefineOwnProperty internal method of A with arguments
                    // Pk, Property Descriptor
                    // { Value: mappedValue,
                    //   Writable: true,
                    //   Enumerable: true,
                    //   Configurable: true },
                    // and false.

                    // In browsers that support Object.defineProperty, use the following:
                    // Object.defineProperty(A, k, {
                    //   value: mappedValue,
                    //   writable: true,
                    //   enumerable: true,
                    //   configurable: true
                    // });

                    // For best browser support, use the following:
                    A[k] = mappedValue;
                }
                // d. Increase k by 1.
                k++;
            }

            // 9. return A
            return A;
        };
    }

    // Production steps of ECMA-262, Edition 5, 15.4.4.21
    // Reference: http://es5.github.io/#x15.4.4.21
    // https://tc39.github.io/ecma262/#sec-array.prototype.reduce
    if (!this.reduce) {
        this.reduce =function(callback /*, initialValue*/) {
            if (this === null) {
                throw new TypeError( 'Array.prototype.reduce ' +
                    'called on null or undefined' );
            }
            if (typeof callback !== 'function') {
                throw new TypeError( callback +
                    ' is not a function');
            }

            // 1. Let O be ? ToObject(this value).
            var o = Object(this);

            // 2. Let len be ? ToLength(? Get(O, "length")).
            var len = o.length >>> 0;

            // Steps 3, 4, 5, 6, 7
            var k = 0;
            var value;

            if (arguments.length >= 2) {
                value = arguments[1];
            } else {
                while (k < len && !(k in o)) {
                    k++;
                }

                // 3. If len is 0 and initialValue is not present,
                //    throw a TypeError exception.
                if (k >= len) {
                    throw new TypeError( 'Reduce of empty array ' +
                        'with no initial value' );
                }
                value = o[k++];
            }

            // 8. Repeat, while k < len
            while (k < len) {
                // a. Let Pk be ! ToString(k).
                // b. Let kPresent be ? HasProperty(O, Pk).
                // c. If kPresent is true, then
                //    i.  Let kValue be ? Get(O, Pk).
                //    ii. Let accumulator be ? Call(
                //          callbackfn, undefined,
                //          « accumulator, kValue, k, O »).
                if (k in o) {
                    value = callback(value, o[k], k, o);
                }

                // d. Increase k by 1.
                k++;
            }

            // 9. Return accumulator.
            return value;
        };

    }

    // Production steps of ECMA-262, Edition 5, 15.4.4.17
    // Reference: http://es5.github.io/#x15.4.4.17
    if (!this.some) {
        this.some = function(fun/*, thisArg*/) {

            if (this === null) {
                throw new TypeError('Array.prototype.some called on null or undefined');
            }

            if (typeof fun !== 'function') {
                throw new TypeError();
            }

            var t = Object(this);
            var len = t.length >>> 0;

            var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
            for (var i = 0; i < len; i++) {
                if (i in t && fun.call(thisArg, t[i], i, t)) {
                    return true;
                }
            }

            return false;
        };
    }

    // Production steps of ECMA-262, Edition 5, 15.4.4.14
    // Reference: http://es5.github.io/#x15.4.4.14
    if (!this.indexOf) {
        this.indexOf = function(searchElement, fromIndex) {

            var k;

            // 1. Let o be the result of calling ToObject passing
            //    the this value as the argument.
            if (this === null) {
                throw new TypeError('"this" is null or not defined');
            }

            var o = Object(this);

            // 2. Let lenValue be the result of calling the Get
            //    internal method of o with the argument "length".
            // 3. Let len be ToUint32(lenValue).
            var len = o.length >>> 0;

            // 4. If len is 0, return -1.
            if (len === 0) {
                return -1;
            }

            // 5. If argument fromIndex was passed let n be
            //    ToInteger(fromIndex); else let n be 0.
            var n = fromIndex | 0;

            // 6. If n >= len, return -1.
            if (n >= len) {
                return -1;
            }

            // 7. If n >= 0, then Let k be n.
            // 8. Else, n<0, Let k be len - abs(n).
            //    If k is less than 0, then let k be 0.
            k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

            // 9. Repeat, while k < len
            while (k < len) {
                // a. Let Pk be ToString(k).
                //   This is implicit for LHS operands of the in operator
                // b. Let kPresent be the result of calling the
                //    HasProperty internal method of o with argument Pk.
                //   This step can be combined with c
                // c. If kPresent is true, then
                //    i.  Let elementK be the result of calling the Get
                //        internal method of o with the argument ToString(k).
                //   ii.  Let same be the result of applying the
                //        Strict Equality Comparison Algorithm to
                //        searchElement and elementK.
                //  iii.  If same is true, return k.
                if (k in o && o[k] === searchElement) {
                    return k;
                }
                k++;
            }
            return -1;
        };
    }

    // Production steps of ECMA-262, Edition 5, 15.4.4.15
    // Reference: http://es5.github.io/#x15.4.4.15
    if (!this.lastIndexOf) {
        this.lastIndexOf = function(searchElement /*, fromIndex*/) {
            if (this === void 0 || this === null) {
                throw new TypeError();
            }

            var n, k,
                t = Object(this),
                len = t.length >>> 0;
            if (len === 0) {
                return -1;
            }

            n = len - 1;
            if (arguments.length > 1) {
                n = Number(arguments[1]);
                if (n != n) {
                    n = 0;
                }
                else if (n !== 0 && n != (1 / 0) && n != -(1 / 0)) {
                    n = (n > 0 || -1) * Math.floor(Math.abs(n));
                }
            }

            for (k = n >= 0 ? Math.min(n, len - 1) : len - Math.abs(n); k >= 0; k--) {
                if (k in t && t[k] === searchElement) {
                    return k;
                }
            }
            return -1;
        };
    }

    if (!this.every) {
        this.every = function(callbackfn, thisArg) {
            var T, k;

            if (this === null) {
                throw new TypeError('this is null or not defined');
            }

            // 1. Let O be the result of calling ToObject passing the this
            //    value as the argument.
            var O = Object(this);

            // 2. Let lenValue be the result of calling the Get internal method
            //    of O with the argument "length".
            // 3. Let len be ToUint32(lenValue).
            var len = O.length >>> 0;

            // 4. If IsCallable(callbackfn) is false, throw a TypeError exception.
            if (typeof callbackfn !== 'function') {
                throw new TypeError();
            }

            // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
            if (arguments.length > 1) {
                T = thisArg;
            }

            // 6. Let k be 0.
            k = 0;

            // 7. Repeat, while k < len
            while (k < len) {

                var kValue;

                // a. Let Pk be ToString(k).
                //   This is implicit for LHS operands of the in operator
                // b. Let kPresent be the result of calling the HasProperty internal
                //    method of O with argument Pk.
                //   This step can be combined with c
                // c. If kPresent is true, then
                if (k in O) {

                    // i. Let kValue be the result of calling the Get internal method
                    //    of O with argument Pk.
                    kValue = O[k];

                    // ii. Let testResult be the result of calling the Call internal method
                    //     of callbackfn with T as the this value and argument list
                    //     containing kValue, k, and O.
                    var testResult = callbackfn.call(T, kValue, k, O);

                    // iii. If ToBoolean(testResult) is false, return false.
                    if (!testResult) {
                        return false;
                    }
                }
                k++;
            }
            return true;
        };
    }

    // Production steps of ECMA-262, Edition 5, 15.4.4.22
    // Reference: http://es5.github.io/#x15.4.4.22
    if (!this.reduceRight) {
        this.reduceRight = function(callback /*, initialValue*/) {
            if (null === this || 'undefined' === typeof this) {
                throw new TypeError('Array.prototype.reduce called on null or undefined');
            }
            if ('function' !== typeof callback) {
                throw new TypeError(callback + ' is not a function');
            }
            var t = Object(this), len = t.length >>> 0, k = len - 1, value;
            if (arguments.length >= 2) {
                value = arguments[1];
            } else {
                while (k >= 0 && !(k in t)) {
                    k--;
                }
                if (k < 0) {
                    throw new TypeError('Reduce of empty array with no initial value');
                }
                value = t[k--];
            }
            for (; k >= 0; k--) {
                if (k in t) {
                    value = callback(value, t[k], k, t);
                }
            }
            return value;
        };
    }

    // https://tc39.github.io/ecma262/#sec-array.prototype.find
    if (!this.find) {
        this.find = function(predicate) {
            // 1. Let O be ? ToObject(this value).
            if (this === null) {
                throw new TypeError('"this" is null or not defined');
            }

            var o = Object(this);

            // 2. Let len be ? ToLength(? Get(O, "length")).
            var len = o.length >>> 0;

            // 3. If IsCallable(predicate) is false, throw a TypeError exception.
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }

            // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
            var thisArg = arguments[1];

            // 5. Let k be 0.
            var k = 0;

            // 6. Repeat, while k < len
            while (k < len) {
                // a. Let Pk be ! ToString(k).
                // b. Let kValue be ? Get(O, Pk).
                // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
                // d. If testResult is true, return kValue.
                var kValue = o[k];
                if (predicate.call(thisArg, kValue, k, o)) {
                    return kValue;
                }
                // e. Increase k by 1.
                k++;
            }

            // 7. Return undefined.
            return undefined;
        };
    }

    if (!Array.isArray) {
        Array.isArray = function(arg) {
            return Object.prototype.toString.call(arg) === '[object Array]';
        };
    }

}).call((function () {
    try {
        return Array.prototype;
    } catch (e) {
        return null;
    }
}).call(this));

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
		try {
			return global;
		} catch (e) {
			return self;
		}
	}
}).call(this));

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

(function() {
	if (!this || !Object.defineProperty || !Object.getOwnPropertyDescriptor || Object.getOwnPropertyDescriptor(this, "outerHTML"))
		return;
    Object.defineProperty(this, "outerHTML", {
       get: function() {
    	   var temp = document.createElement("div");
    	   temp.appendChild(this.cloneNode(true));
    	   var result = temp.innerHTML;
    	   if (temp.remove)
    		   temp.remove();
    	   return result;
       }
   });
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
	if (!this.forEach) {
		this.forEach = function (callback, thisArg) {
			thisArg = thisArg || window;
			for (var i = 0; i < this.length; i++) {
				callback.call(thisArg, this[i], i, this);
			}
		};
	}
}).call((function () {
	try {
		return NodeList.prototype;
	} catch (e) {
		return null;
	}
}).call(this));

(function() {
    if (!this)
        return;

    if (!this.trim) {
        this.trim = function () {
            return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
        };
    }

}).call((function () {
    try {
        return String.prototype;
    } catch (e) {
        return null;
    }
}).call(this));

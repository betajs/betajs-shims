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

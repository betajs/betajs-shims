(function() {
	if (!this || !Object.defineProperty || !Object.getOwnPropertyDescriptor || Object.getOwnPropertyDescriptor(this, "textContent"))
		return;
    Object.defineProperty(this, "textContent", {
       get: function() {
    	   return this.innerText;
       }
    });
}).call((function () {
	try {
		return Node.prototype;
	} catch (e) {
		return null;
	}
}).call(this));
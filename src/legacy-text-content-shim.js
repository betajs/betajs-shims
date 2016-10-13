(function() {
	if (!this)
		return;
	if (!Object.defineProperty || !Object.getOwnPropertyDescriptor || !Object.getOwnPropertyDescriptor(this, "textContent") || Object.getOwnPropertyDescriptor(this, "textContent").get)
		return;
    var innerText = Object.getOwnPropertyDescriptor(this, "innerText");
    Object.defineProperty(this, "textContent", {
       get: function() {
    	   return innerText.get.call(this);
       },
       set: function(s) {
    	   return innerText.set.call(this, s);
       }
   });
}).call((function () {
	try {
		return Element.prototype;
	} catch (e) {
		return null;
	}
}).call(this));
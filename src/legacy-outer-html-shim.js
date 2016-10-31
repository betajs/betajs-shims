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
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

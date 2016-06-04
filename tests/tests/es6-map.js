test("map create set get has delete foreach", function () {
	var map = new Map();
	QUnit.equal(map.has("foobar"), false);
	map.set("foobar", "test");
	QUnit.equal(map.has("foobar"), true);
	QUnit.equal(map.get("foobar"), "test");
	map.set("foobar", "baz");
	QUnit.equal(map.has("foobar"), true);
	QUnit.equal(map.get("foobar"), "baz");
	map.forEach(function (value, key) {
		QUnit.equal(value, "baz");
		QUnit.equal(key, "foobar");
	});
	map["delete"]("foobar");
	QUnit.equal(map.has("foobar"), false);
});
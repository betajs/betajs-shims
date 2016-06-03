test("map create set get has delete", function () {
	var map = new Map();
	QUnit.equal(map.has("foobar"), false);
	map.set("foobar", "test");
	QUnit.equal(map.has("foobar"), true);
	QUnit.equal(map.get("foobar"), "test");
	map.set("foobar", "baz");
	QUnit.equal(map.has("foobar"), true);
	QUnit.equal(map.get("foobar"), "baz");
	map["delete"]("foobar");
	QUnit.equal(map.has("foobar"), false);
});
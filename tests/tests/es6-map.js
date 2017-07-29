QUnit.test("map create set get has delete foreach", function (assert) {
	var map = new Map();
    assert.equal(map.has("foobar"), false);
	map.set("foobar", "test");
    assert.equal(map.has("foobar"), true);
    assert.equal(map.get("foobar"), "test");
	map.set("foobar", "baz");
    assert.equal(map.has("foobar"), true);
    assert.equal(map.get("foobar"), "baz");
	map.forEach(function (value, key) {
        assert.equal(value, "baz");
        assert.equal(key, "foobar");
	});
	map["delete"]("foobar");
    assert.equal(map.has("foobar"), false);
});
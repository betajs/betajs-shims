QUnit.test("nodelist create set get has delete foreach", function (assert) {
	var nodelist =  document.querySelectorAll("#qunit");
	nodelist.forEach(function (value) {
        assert.equal(value.id, "qunit");
	});
	assert.equal(nodelist.item(0).id, "qunit");
});
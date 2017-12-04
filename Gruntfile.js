module.exports = function(grunt) {

	var pkg = grunt.file.readJSON('package.json');
	var gruntHelper = require('betajs-compile');
	var dist = 'betajs-shims';

	gruntHelper.init(pkg, grunt)
	
	
    /* Compilation */    
    .concatTask('concat-shims', ['src/*.js'], 'dist/' + dist + '.js')
    .uglifyTask('uglify-shims', 'dist/' + dist + '.js', 'dist/' + dist + '.min.js')

    /* Testing */
    .qunitjsTask("qunit-betajs-shims", ['dist/' + dist + '.js', 'tests/tests'])
    .qunitjsTask("qunit-removal-betajs-shims", ['tests/node/removals.js'])
    .qunitjsTask("qunit-vanilla", ['tests/tests'])
    .closureTask(null, ["./dist/" + dist + ".js"])
    .browserstackTask("browserstack-removal-betajs-shims", 'tests/tests-removal-betajs-shims.html', {desktop: true, mobile: true})
    .browserstackTask("browserstack-betajs-shims", 'tests/tests-betajs-shims.html', {desktop: true, mobile: true})
    .lintTask(null, ['./src/**/*.js', './dist/' + dist + '.js', './Gruntfile.js', './tests/**/*.js'])
    
    /* External Configurations */
    .codeclimateTask()
    .travisTask(null, "4.0")
    
    /* Dependencies */
    .dependenciesTask(null, { github: [
	    'douglascrockford/JSON-js/json2.js'
     ] })

    /* Markdown Files */
	.readmeTask()
    .licenseTask()
    .packageTask();
    
	grunt.initConfig(gruntHelper.config);	

	grunt.registerTask('default', ['package', 'readme', 'license', 'codeclimate', 'travis', 'concat-shims', 'uglify-shims']);
	grunt.registerTask("qunit", ['qunit-betajs-shims', 'qunit-removal-betajs-shims', 'qunit-vanilla']);
	grunt.registerTask('check', ['lint', 'qunit']);

};
module.exports = function(grunt) {

	var pkg = grunt.file.readJSON('package.json');
	var gruntHelper = require('betajs-compile');
	var dist = 'betajs-shims';

	gruntHelper.init(pkg, grunt)
	
	
    /* Compilation */    
    .concatTask('concat-shims', ['src/*.js'], 'dist/' + dist + '.js')
    .uglifyTask('uglify-shims', 'dist/' + dist + '.js', 'dist/' + dist + '.min.js')

    /* Testing */
    .qunitTask("qunit-betajs-shims", './dist/' + dist + '.js', grunt.file.expand('./tests/tests/*.js'))
    .qunitTask("qunit-removal-betajs-shims", './dist/' + dist + '.js', grunt.file.expand('./tests/tests/*.js'), grunt.file.expand("./tests/removals/*.js"))
    .qunitTask("qunit-vanilla", "./tests/removals/empty.js", grunt.file.expand('./tests/tests/*.js'))
    .closureTask(null, ["./dist/" + dist + ".js"])
    .browserstackTask("browserstack-removal-betajs-shims", 'tests/tests-removal-betajs-shims.html', {desktop: true, mobile: true})
    .browserstackTask("browserstack-betajs-shims", 'tests/tests-betajs-shims.html', {desktop: true, mobile: true})
    .browserstackTask("browserstack-es-betajs-shims", 'tests/tests-es-betajs-shims.html', {desktop: true, mobile: true})
    .lintTask(null, ['./src/**/*.js', './dist/' + dist + '.js', './Gruntfile.js', './tests/**/*.js'])
    
    /* External Configurations */
    .codeclimateTask()
    .travisTask(null, "0.11")
    
    /* Dependencies */
    .dependenciesTask(null, { github: [
	    'douglascrockford/JSON-js/json2.js',
        'es-shims/es5-shim/es5-shim.js',
        'es-shims/es6-shim/es6-shim.js'
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
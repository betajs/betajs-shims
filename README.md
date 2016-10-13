# betajs-shims 0.0.6
[![Build Status](https://api.travis-ci.org/betajs/betajs-shims.svg?branch=master)](https://travis-ci.org/betajs/betajs-shims)
[![Code Climate](https://codeclimate.com/github/betajs/betajs-shims/badges/gpa.svg)](https://codeclimate.com/github/betajs/betajs-shims)
[![npm version](https://img.shields.io/npm/v/betajs-shims.svg?style=flat)](https://www.npmjs.com/package/betajs-shims)

This repository includes shims for ECMA Script that are not included in the official shims.



## Getting Started


You can use the library in the browser, in your NodeJS project and compile it as well.

#### Browser

```javascript
	<script src="betajs-shims/dist/shims.min.js"></script>
``` 

#### NodeJS

```javascript
	var shims = require('betajs-shims/dist/shims.js');
```

#### Compile

```javascript
	git clone https://github.com/betajs/betajs-shims.git
	npm install
	grunt
``` 



## Basic Usage


This library should be used in combination with other shim libraries, particularly:

- [JSON in JavaScript](https://github.com/douglascrockford/JSON-js)
- [ES5-Shim](https://github.com/es-shims/es5-shim)
- [ES6-Shim](https://github.com/es-shims/es6-shim)

The authors of the [ES-Shim](https://github.com/es-shims) have decided to shim in a very strict manner.
Consequently, they decided to not support some of the browsers and versions that the BetaJS framework is dedicated to support.

Therefore, this repository includes less strict shims for those browsers and versions.
We recommend to include the shims mentioned above as well as the shims provided here for full support of all browsers and versions.  



## Links
| Resource   | URL |
| :--------- | --: |
| Homepage   | [http://betajs.com](http://betajs.com) |
| Git        | [git://github.com/betajs/betajs-shims.git](git://github.com/betajs/betajs-shims.git) |
| Repository | [http://github.com/betajs/betajs-shims](http://github.com/betajs/betajs-shims) |
| Blog       | [http://blog.betajs.com](http://blog.betajs.com) | 
| Twitter    | [http://twitter.com/thebetajs](http://twitter.com/thebetajs) | 



## Compatability
| Target | Versions |
| :----- | -------: |
| Firefox | 4 - Latest |
| Chrome | 15 - Latest |
| Safari | 4 - Latest |
| Opera | 12 - Latest |
| Internet Explorer | 6 - Latest |
| Edge | 12 - Latest |
| iOS | 7.0 - Latest |
| Android | 4.0 - Latest |
| NodeJS | 0.10 - Latest |


## CDN
| Resource | URL |
| :----- | -------: |
| betajs-shims.js | [http://cdn.rawgit.com/betajs/betajs-shims/master/dist/betajs-shims.js](http://cdn.rawgit.com/betajs/betajs-shims/master/dist/betajs-shims.js) |
| betajs-shims.min.js | [http://cdn.rawgit.com/betajs/betajs-shims/master/dist/betajs-shims.min.js](http://cdn.rawgit.com/betajs/betajs-shims/master/dist/betajs-shims.min.js) |


## Unit Tests
| Resource | URL |
| :----- | -------: |
| Test Suite | [Run](http://rawgit.com/betajs/betajs-shims/master/tests/tests.html) |




## Contributors

- Oliver Friedmann


## License

Apache-2.0



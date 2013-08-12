/**
 * User: https://github.com/korve/
 * Date: 11.08.13
 * Time: 15:29
 */

var TestServer = require('../lib/TestServer.js').TestServer,
	TestUtils = require('../lib/TestUtils.js');

(function(){
	
	module.exports = {
		
		testIsAlphaNumeric_AlphanumericValue: function(test){
			var validations = {
				alphaNumeric: true
			};

			TestUtils.validateTest('a1b2c3abcdefgi1234567', validations, function(result, value){

				console.log('Tested `testIsAlphaNumeric_AlphanumericValue` with value: ' + result.postData.input 
					+ '(' + result.postData.input.length + ')\n');
				
				test.equals(result.errors.length, 0);
				test.done();

			});
		},

		testIsAlphaNumeric_NonAlphanumericValue: function(test){
			var validations = {
				alphaNumeric: true
			};

			TestUtils.validateTest('a1b2c3abcdefgi1234567_{[]}', validations, function(result, value){

				console.log('Tested `testIsAlphaNumeric_NonAlphanumericValue` with value: ' + result.postData.input
					+ '(' + result.postData.input.length + ')\n');

				test.equals(result.errors.length, 1);
				test.done();

			});
		},

		testIsNotAlphanumeric_AlphanumericValue: function(test){
			var validations = {
				alphaNumeric: false
			};

			TestUtils.validateTest('a1b2c3abcdefgi1234567', validations, function(result, value){

				console.log('Tested `testIsNotAlphanumeric_AlphanumericValue` with value: ' + result.postData.input
					+ '(' + result.postData.input.length + ')\n');

				test.equals(result.errors.length, 1);
				test.done();

			});
		},
	};
})();
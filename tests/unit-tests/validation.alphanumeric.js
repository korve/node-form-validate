/**
 * User: https://github.com/korve/
 * Date: 11.08.13
 * Time: 15:29
 */

var TestUtils = require('../lib/TestUtils.js');

(function(){
	
	module.exports = {

		testIsAlphaNumeric_EmptyValue: function(test){
			var validations = {
				alphaNumeric: true
			};

			TestUtils.validateTest('', validations).then(function(result, value){

				console.log('Tested `testIsAlphaNumeric_EmptyValue` with value: ' + result.postData.input
					+ '(' + result.postData.input.length + ')\n');

				test.equals(result.errors.length, 0);
				test.done();

			});
		},

		testIsAlphaNumeric_UndefinedValue: function(test){
			var validations = {
				alphaNumeric: true
			};

			TestUtils.validateTest({}, validations).then(function(result, value){

				console.log('Tested `testIsAlphaNumeric_UndefinedValue` with undefined value.\n');

				test.equals(result.errors.length, 0);
				test.done();

			});
		},
		
		testIsAlphaNumeric_AlphanumericValue: function(test){
			var validations = {
				alphaNumeric: true
			};

			TestUtils.validateTest('abcdefghijklmopqrstuvxyz0123456789', validations).then(function(result, value){

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

			TestUtils.validateTest('abcdefghijklmopqrstuvxyz0123456789{[]}', validations).then(function(result, value){

				console.log('Tested `testIsAlphaNumeric_NonAlphanumericValue` with value: ' + result.postData.input
					+ '(' + result.postData.input.length + ')\n');

				test.equals(result.errors.length, 1);
				test.done();

			});
		}
	};
})();
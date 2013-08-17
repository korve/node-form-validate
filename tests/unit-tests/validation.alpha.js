/**
 * User: https://github.com/korve/
 * Date: 11.08.13
 * Time: 15:29
 */

var TestUtils = require('../lib/TestUtils.js');

(function(){
	
	module.exports = {

		testIsAlpha_EmptyValue: function(test){
			var validations = {
				alpha: true
			};
			
			TestUtils.validateTest('', validations).then(function(result, value){

				console.log('Tested `testIsAlpha_EmptyValue` with value: ' + result.postData.input
					+ '(' + result.postData.input.length + ')\n');

				test.equals(result.errors.length, 0);
				test.done();

			});
		},

		testIsAlpha_UndefinedValue: function(test){
			var validations = {
				alpha: true
			};

			TestUtils.validateTest({}, validations).then(function(result, value){

				console.log('Tested `testIsAlpha_UndefinedValue` with undefined value.\n');

				test.equals(result.errors.length, 0);
				test.done();

			});
		},
		
		testIsAlpha_AlphaValue: function(test){
			var validations = {
				alpha: true
			};

			TestUtils.validateTest('abcdefghijklmopqrstuvxyz', validations).then(function(result, value){

				console.log('Tested `testIsAlpha_AlphaValue` with value: ' + result.postData.input 
					+ '(' + result.postData.input.length + ')\n');
				
				test.equals(result.errors.length, 0);
				test.done();

			});
		},

		testIsAlpha_NonAlphaValue: function(test){
			var validations = {
				alpha: true
			};

			TestUtils.validateTest('0123456789{[]}', validations).then(function(result, value){

				console.log('Tested `testIsAlpha_NonAlphaValue` with value: ' + result.postData.input
					+ '(' + result.postData.input.length + ')\n');

				test.equals(result.errors.length, 1);
				test.done();

			});
		},

		testIsNotAlpha_NonAlphaValue: function(test){
			var validations = {
				alpha: false
			};

			TestUtils.validateTest('0123456789{[]}', validations).then(function(result, value){

				console.log('Tested `testIsNotAlpha_NonAlphaValue` with value: ' + result.postData.input
					+ '(' + result.postData.input.length + ')\n');

				test.equals(result.errors.length, 0);
				test.done();

			});
		}
	};
})();
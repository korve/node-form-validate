/**
 * User: https://github.com/korve/
 * Date: 11.08.13
 * Time: 15:29
 */

var i18n = require('i18n'),
	TestUtils = require('../lib/TestUtils.js');

(function(){
	
	module.exports = {

		testIsInteger_EmptyValue: function(test){
			var validations = {
				integer: true
			};

			TestUtils.validateTest('', validations).then(function(result, value){

				console.log('Tested `testIsInteger_EmptyValue` with value: ' + result.postData.input
					+ '(' + result.postData.input.length + ')\n');

				test.equals(result.errors.length, 0);
				test.done();

			});
		},

		testIsInteger_UndefinedValue: function(test){
			var validations = {
				integer: true
			};

			TestUtils.validateTest({}, validations).then(function(result, value){

				console.log('Tested `testIsInteger_UndefinedValue` with undefined value.\n');

				test.equals(result.errors.length, 0);
				test.done();

			});
		},

		testIsInteger_ValidValues: function(test){
			var validations = {
				integer: true
			};
			
			var errors = [];
			
			TestUtils.validateTest('1234567890', validations)
				.then(function(result){
 					errors.push.apply(errors, result.errors);
					return TestUtils.validateTest('0', validations);
				})
				.then(function(result){
					errors.push.apply(errors, result.errors);
					test.equals(errors.length, 0);
					test.done();
				});
		},

		testIsInteger_InvalidValues: function(test){
			var validations = {
				integer: true
			};

			var errors = [];
			
			TestUtils.validateTest('-1234567890', validations)
				.then(function(result){
					errors.push.apply(errors, result.errors);
					return TestUtils.validateTest('-0', validations);
				})
				.then(function(result){
					errors.push.apply(errors, result.errors);
					return TestUtils.validateTest('12345678.90', validations);
				})
				.then(function(result){
					errors.push.apply(errors, result.errors);
					return TestUtils.validateTest('.1234567890', validations);
				})
				.then(function(result){
					errors.push.apply(errors, result.errors);
					test.equals(errors.length, 4);
					test.done();
				});
		},

		testIsInteger_NegativeAllowed: function(test){
			var validations = {
				integer: {
					allowNegative: true
				}
			};

			var errors = [];

			TestUtils.validateTest('1234567890', validations)
				.then(function(result){
					errors.push.apply(errors, result.errors);
					return TestUtils.validateTest('0', validations);
				})
				.then(function(result){
					errors.push.apply(errors, result.errors);
					return TestUtils.validateTest('-1234567890', validations);
				})
				.then(function(result){
					errors.push.apply(errors, result.errors);
					return TestUtils.validateTest('-0', validations);
				})
				.then(function(result){
					errors.push.apply(errors, result.errors);
					test.equals(errors.length, 0);
					test.done();
				});
		}
	};
})();
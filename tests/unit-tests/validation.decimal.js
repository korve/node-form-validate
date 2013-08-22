/**
 * User: https://github.com/korve/
 * Date: 11.08.13
 * Time: 15:29
 */

var i18n = require('i18n'),
	TestUtils = require('../lib/TestUtils.js');

(function(){
	
	module.exports = {

		testIsDecimal_EmptyValue: function(test){
			var validations = {
				decimal: true
			};

			TestUtils.validateTest('', validations).then(function(result, value){

				console.log('Tested `testIsDecimal_EmptyValue` with value: ' + result.postData.input
					+ '(' + result.postData.input.length + ')\n');

				test.equals(result.errors.length, 0);
				test.done();

			});
		},

		testIsDecimal_UndefinedValue: function(test){
			var validations = {
				decimal: true
			};

			TestUtils.validateTest({}, validations).then(function(result, value){

				console.log('Tested `testIsDecimal_UndefinedValue` with undefined value.\n');

				test.equals(result.errors.length, 0);
				test.done();

			});
		},

		testIsDecimal_ValidValues: function(test){
			var validations = {
				decimal: true
			};
			
			var errors = [];
			
			TestUtils.validateTest('12.34567890', validations)
				.then(function(result){
 					errors.push.apply(errors, result.errors);
					return TestUtils.validateTest('0', validations);
				})
				.then(function(result){
					errors.push.apply(errors, result.errors);
					return TestUtils.validateTest('0.0', validations);
				})
				.then(function(result){
					errors.push.apply(errors, result.errors);
					return TestUtils.validateTest('.0', validations);
				})
				.then(function(result){
					errors.push.apply(errors, result.errors);
					return TestUtils.validateTest('.123456789', validations);
				})
				.then(function(result){
					errors.push.apply(errors, result.errors);
					return TestUtils.validateTest('1234567890', validations);
				})
				.then(function(result){
					errors.push.apply(errors, result.errors);
					return TestUtils.validateTest('.123456789', validations);
				})
				.then(function(result){
					errors.push.apply(errors, result.errors);
					test.equals(errors.length, 0);
					test.done();
				});
		},

		testIsDecimal_InvalidValues: function(test){
			var validations = {
				decimal: true
			};

			var errors = [];
			
			TestUtils.validateTest(TestUtils.generateString(50), validations)
				.then(function(result){
					errors.push.apply(errors, result.errors);
					test.equals(errors.length, 1);
					test.done();
				});
		},

		testIsDecimal_NegativeAllowed: function(test){
			var validations = {
				decimal: {
					allowNegative: true
				}
			};

			var errors = [];

			TestUtils.validateTest('0', validations)
				.then(function(result){
					errors.push.apply(errors, result.errors);
					return TestUtils.validateTest('-0', validations);
				})
				.then(function(result){
					errors.push.apply(errors, result.errors);
					return TestUtils.validateTest('-0.0', validations);
				})
				.then(function(result){
					errors.push.apply(errors, result.errors);
					return TestUtils.validateTest('-12.34567890', validations);
				})
				.then(function(result){
					errors.push.apply(errors, result.errors);
					return TestUtils.validateTest('-.1234567890', validations);
				})
				.then(function(result){
					errors.push.apply(errors, result.errors);
					test.equals(errors.length, 0);
					test.done();
				});
		}
	};
})();
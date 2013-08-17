/**
 * User: https://github.com/korve/
 * Date: 11.08.13
 * Time: 15:29
 */

var i18n = require('i18n'),
	Q = require('q'),
	TestUtils = require('../lib/TestUtils.js');

(function(){
	
	module.exports = {

		testIsNumeric_EmptyValue: function(test){
			var validations = {
				numeric: true
			};

			TestUtils.validateTest('', validations).then(function(result, value){

				console.log('Tested `testIsNumeric_EmptyValue` with value: ' + result.postData.input
					+ '(' + result.postData.input.length + ')\n');

				test.equals(result.errors.length, 0);
				test.done();

			});
		},

		testIsNumeric_UndefinedValue: function(test){
			var validations = {
				numeric: true
			};

			TestUtils.validateTest({}, validations).then(function(result, value){

				console.log('Tested `testIsNumeric_UndefinedValue` with undefined value.\n');

				test.equals(result.errors.length, 0);
				test.done();

			});
		},

		testIsNumeric_Positive: function(test){
			var validations = {
				numeric: true
			};
			
			var errors = [];
			
			TestUtils.validateTest('1234567890', validations)
				.then(function(result){
					errors.push.apply(errors, result.errors);
					return TestUtils.validateTest('123456.7890', validations);
				})
				.then(function(result){
					errors.push.apply(errors, result.errors);
					return TestUtils.validateTest('.1234567890', validations);
				})
				.then(function(result){
					errors.push.apply(errors, result.errors);
					test.equals(errors.length, 0);
					test.done();
				});
		},

		testIsNumeric_Negative: function(test){
			var validations = {
				numeric: true
			};

			var errors = [];

			TestUtils.validateTest('-1234567890', validations)
				.then(function(result){
					errors.push.apply(errors, result.errors);
					return TestUtils.validateTest('-123456.7890', validations);
				})
				.then(function(result){
					errors.push.apply(errors, result.errors);
					return TestUtils.validateTest('-.1234567890', validations);
				})
				.then(function(result){
					errors.push.apply(errors, result.errors);
					test.equals(errors.length, 3);
					test.done();
				});
		},

		testIsNumeric_NegativeAllowed: function(test){
			var validations = {
				numeric: {
					allowNegative: true
				}
			};

			var errors = [];

			TestUtils.validateTest('1234567890', validations)
				.then(function(result){
					errors.push.apply(errors, result.errors);
					return TestUtils.validateTest('123456.7890', validations);
				})
				.then(function(result){
					errors.push.apply(errors, result.errors);
					return TestUtils.validateTest('.1234567890', validations);
				})
				.then(function(result){
					errors.push.apply(errors, result.errors);
					return TestUtils.validateTest('-1234567890', validations)
				})
				.then(function(result){
					errors.push.apply(errors, result.errors);
					return TestUtils.validateTest('-123456.7890', validations);
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
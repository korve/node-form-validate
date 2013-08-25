/**
 * User: https://github.com/korve/
 * Date: 11.08.13
 * Time: 15:29
 */

var i18n = require('i18n'),
	TestUtils = require('../lib/TestUtils.js');

(function(){
	
	module.exports = {

		testBetween_EmptyValue: function(test){
			var validations = {
				between: true
			};

			TestUtils.validateTest('', validations).then(function(result, value){

				console.log('Tested `testBetween_EmptyValue` with value: ' + result.postData.input
					+ '(' + result.postData.input.length + ')\n');

				test.equals(result.errors.length, 0);
				test.done();

			});
		},

		testBetween_UndefinedValue: function(test){
			var validations = {
				between: true
			};

			TestUtils.validateTest({}, validations).then(function(result, value){

				console.log('Tested `testBetween_UndefinedValue` with undefined value.\n');

				test.equals(result.errors.length, 0);
				test.done();

			});
		},

		testBetween_ValidValues: function(test){
			var validations = {
				between: {
					min: 10,
					max: 30
				}
			};
			
			var errors = [];
			
			TestUtils.validateTest('10', validations)
				.then(function(result){
 					errors.push.apply(errors, result.errors);
					return TestUtils.validateTest('30', validations);
				})
				.then(function(result){
					errors.push.apply(errors, result.errors);
					return TestUtils.validateTest('20', validations);
				})
				.then(function(result){
					errors.push.apply(errors, result.errors);
					return TestUtils.validateTest('10.0', validations);
				})
				.then(function(result){
					errors.push.apply(errors, result.errors);
					return TestUtils.validateTest('30.0', validations);
				})
				.then(function(result){
					errors.push.apply(errors, result.errors);
					return TestUtils.validateTest('20.0', validations);
				})
				.then(function(result){
					errors.push.apply(errors, result.errors);
					test.equals(errors.length, 0);
					test.done();
				});
		},

		testBetween_InvalidValues: function(test){
			var validations = {
				between: {
					min: 10,
					max: 30
				}
			};

			var errors = [];
			
			TestUtils.validateTest('0', validations)
				.then(function(result){
					errors.push.apply(errors, result.errors);
					return TestUtils.validateTest(TestUtils.generateString(50), validations);
				})
				.then(function(result){
					errors.push.apply(errors, result.errors);
					return TestUtils.validateTest('-10', validations);
				})
				.then(function(result){
					errors.push.apply(errors, result.errors);
					return TestUtils.validateTest('9', validations);
				})
				.then(function(result){
					errors.push.apply(errors, result.errors);
					return TestUtils.validateTest('31', validations);
				})
				.then(function(result){
					errors.push.apply(errors, result.errors);
					return TestUtils.validateTest('-10.0', validations);
				})
				.then(function(result){
					errors.push.apply(errors, result.errors);
					return TestUtils.validateTest('9.0', validations);
				})
				.then(function(result){
					errors.push.apply(errors, result.errors);
					return TestUtils.validateTest('31.0', validations);
				})
				.then(function(result){
					errors.push.apply(errors, result.errors);
					test.equals(errors.length, 8);
					test.done();
				});
		}
	};
})();
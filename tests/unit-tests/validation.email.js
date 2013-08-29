/**
 * User: https://github.com/korve/
 * Date: 11.08.13
 * Time: 15:29
 */

var TestUtils = require('../lib/TestUtils.js');

(function(){
	
	module.exports = {

		testIsEmail_EmptyValue: function(test){
			var validations = {
				email: true
			};
			
			TestUtils.validateTest('', validations).then(function(result, value){

				console.log('Tested `testIsEmail_EmptyValue` with value: ' + result.postData.input
					+ '(' + result.postData.input.length + ')\n');

				test.equals(result.errors.length, 0);
				test.done();

			});
		},

		testIsEmail_UndefinedValue: function(test){
			var validations = {
				email: true
			};

			TestUtils.validateTest({}, validations).then(function(result, value){

				console.log('Tested `testIsEmail_UndefinedValue` with undefined value.\n');

				test.equals(result.errors.length, 0);
				test.done();

			});
		},
		
		testIsEmail_ValidEmails: function(test){
			var validations = {
				email: true
			};
			
			var errors = [];

			/*
			 * From: http://stackoverflow.com/questions/297420/list-of-email-addresses-that-can-be-used-to-test-a-javascript-validation-script
			 */
			TestUtils.validateTest('me@example.com', validations)
				.then(function(result){
					errors.push.apply(errors, result.errors);
					return TestUtils.validateTest('a.nonymous@example.com', validations);
				})
				.then(function(result){
					errors.push.apply(errors, result.errors);
					return TestUtils.validateTest('name+tag@example.com', validations);
				})
				.then(function(result){
					errors.push.apply(errors, result.errors);
					return TestUtils.validateTest('name\\@tag@example.com', validations);
				})
				.then(function(result){
					errors.push.apply(errors, result.errors);
					return TestUtils.validateTest('spaces\\ are\\ allowed@example.com', validations);
				})
				.then(function(result){
					errors.push.apply(errors, result.errors);
					return TestUtils.validateTest('"spaces may be quoted"@example.com', validations);
				})
				.then(function(result){
					errors.push.apply(errors, result.errors);
					return TestUtils.validateTest('!#$%&\'+-/=.?^`{|}~@[1.0.0.127]', validations);
				})
				.then(function(result){
					errors.push.apply(errors, result.errors);
					return TestUtils.validateTest('!#$%&\'+-/=.?^`{|}~@[IPv6:0123:4567:89AB:CDEF:0123:4567:89AB:CDEF]', validations);
				})
				.then(function(result){
					errors.push.apply(errors, result.errors);
					return TestUtils.validateTest('me(this is a comment)@example.com', validations);
				})
				.then(function(result){
					errors.push.apply(errors, result.errors);
					test.equals(errors.length, 0);
					test.done();
				});
		},

		testIsEmail_InvalidEmails: function(test){
			var validations = {
				email: true
			};

			var errors = [];

			//TODO: Test invalid emails according to RFC2822
			
			/*
			 * From: http://stackoverflow.com/questions/297420/list-of-email-addresses-that-can-be-used-to-test-a-javascript-validation-script
			 */
			TestUtils.validateTest('me@', validations)
				.then(function(result){
					errors.push.apply(errors, result.errors);
					return TestUtils.validateTest('@example.com', validations);
				})
				/*.then(function(result){
					errors.push.apply(errors, result.errors);
					return TestUtils.validateTest('me.@example.com', validations);
				})
				.then(function(result){
					errors.push.apply(errors, result.errors);
					return TestUtils.validateTest('.me@example.com', validations);
				})
				.then(function(result){
					errors.push.apply(errors, result.errors);
					return TestUtils.validateTest('me@example..com', validations);
				})*/
				.then(function(result){
					errors.push.apply(errors, result.errors);
					return TestUtils.validateTest('me.example@com', validations);
				})
				/*.then(function(result){
					errors.push.apply(errors, result.errors);
					return TestUtils.validateTest('me\\@example.com', validations);
				})*/
				.then(function(result){
					errors.push.apply(errors, result.errors);
					test.equals(errors.length, 3);
					test.done();
				});
		}
	};
})();
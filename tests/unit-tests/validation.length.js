/**
 * User: https://github.com/korve/
 * Date: 11.08.13
 * Time: 15:29
 */

var i18n = require('i18n'),
	TestUtils = require('../lib/TestUtils.js');

(function(){
	
	module.exports = {
		
		testValueTooShort: function(test){
			var validations = {
				length: {
					min: 50
				}
			};

			TestUtils.validateTest(TestUtils.generateString(49), validations).then(function(result, value){

				console.log('Tested `testValueTooShort` with value: ' + result.postData.input 
					+ '(' + result.postData.input.length + ', ' 
					+ 'min: ' + validations.length.min + ')\n');
				
				test.equals(result.errors.length, 1);
				test.done();

			});
		},

		testValueExactLength: function(test){
			var validations = {
				length: {
					min: 50,
					max: 50
				}
			};

			TestUtils.validateTest(TestUtils.generateString(50), validations).then(function(result, value){

				console.log('Tested `testValueExactLength` with value: ' + result.postData.input
					+ '(' + result.postData.input.length + ', '
					+ 'min: ' + validations.length.min + ')\n');

				test.equals(result.errors.length, 0);
				test.done();

			});
		},

		testValueTooLong: function (test) {
			var validations = {
				length: {
					max: 50
				}
			};

			TestUtils.validateTest(TestUtils.generateString(51), validations).then(function(result){

				test.equals(result.errors.length, 1);
				test.done();

			});
		},

		/**
		 * We expect an error when the value is empty but min. value is set.
		 * @param test
		 */
		testEmptyValueMinLength: function (test) {
			var validations = {
				length: {
					min: 50
				}
			};

			TestUtils.validateTest('', validations).then(function(result){
				
				test.equals(result.errors[0], i18n.__('length.tooShort', 'input', validations.length.min));
				test.done();

			});
		},

		/**
		 * We expect no errors from length if the post data is not present.
		 * @param test
		 */
		testUndefinedValue: function (test) {
			var validations = {
				length: {
					min: 1,
					max: 50
				}
			};

			TestUtils.validateTest({}, validations).then(function(result, value){

				test.equals(result.errors.length, 0);
				test.done();

			});
		}
	};
})();
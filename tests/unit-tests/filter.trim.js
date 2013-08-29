/**
 * User: https://github.com/korve/
 * Date: 13.08.13
 * Time: 17:45
 */


var TestUtils = require('../lib/TestUtils.js');

module.exports = {

	testTrim_EmptyValue: function(test){
		var validations = {
		};
		
		var filters = {
			trim: true
		};

		TestUtils.validateTest('', validations, filters).then(function(result, value){

			console.log('Tested `testTrim_EmptyValue` with value: ' + result.postData.input
				+ '(' + result.postData.input.length + ')\n');

			test.equals(result.value, '');
			test.done();

		});
	},

	testTrim_UndefinedValue: function(test){
		var validations = {
		};

		var filters = {
			trim: true
		};

		TestUtils.validateTest({}, validations, filters).then(function(result, value){

			console.log('Tested `testTrim_UndefinedValue` with undefined value.\n');

			test.equals(result.errors.length, 0);
			test.done();

		});
	},

	testTrim_TrimmedValue: function(test){
		var validations = {
		};

		var filters = {
			trim: true
		};

		var data = TestUtils.generateString(50);

		TestUtils.validateTest(data, validations, filters).then(function(result, value){

			console.log('Tested `testTrim_UntrimmedValue` with value: ' + result.postData.input
				+ '(' + result.postData.input.length + ')\n');

			test.equals(result.value, data);
			test.done();

		});
	},

	testTrim_UntrimmedValue: function(test){
		var validations = {
		};

		var filters = {
			trim: true
		};

		TestUtils.validateTest(' Untrimmed ', validations, filters).then(function(result, value){

			console.log('Tested `testTrim_UntrimmedValue` with value: ' + result.postData.input
				+ '(' + result.postData.input.length + ')\n');

			test.equals(result.value, 'Untrimmed');
			test.done();

		});
	}
};
/**
 * User: https://github.com/korve/
 * Date: 11.08.13
 * Time: 15:29
 */

var TestUtils = require('../lib/TestUtils.js');
	
module.exports = {
	
	testRequired_ValueUndefined: function(test){
		var validations = {
			required: true
		};

		TestUtils.validateTest({}, validations).then(function(result, value){

			console.log('Tested `testRequired_ValueUndefined` with value: undefined\n');
			
			test.equals(result.errors.length, 1);
			test.done();

		});
	},
	
	testRequired_ValueDefined: function(test){
		var validations = {
			required: true
		};

		TestUtils.validateTest(TestUtils.generateString(50), validations).then(function(result, value){

			console.log('Tested `testRequired_ValueDefined` with value: ' + result.postData.input
				+ '(' + result.postData.input.length + ')\n');

			test.equals(result.errors.length, 0);
			test.done();

		});
	},

	testNotRequired_ValueUndefined: function(test){
		var validations = {
			required: false
		};

		TestUtils.validateTest({}, validations).then(function(result, value){

			console.log('Tested `testNotRequired_ValueUndefined` with value: undefined\n');

			test.equals(result.errors.length, 0);
			test.done();

		});
	},

	testNotRequired_ValueDefined: function(test){
		var validations = {
			required: false
		};

		TestUtils.validateTest(TestUtils.generateString(50), validations).then(function(result, value){

			console.log('Tested `testRequired_ValueDefined` with value: ' + result.postData.input
				+ '(' + result.postData.input.length + ')\n');

			test.equals(result.errors.length, 0);
			test.done();

		});
	}
};
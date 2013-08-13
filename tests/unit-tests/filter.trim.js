/**
 * User: https://github.com/korve/
 * Date: 13.08.13
 * Time: 17:45
 */


var TestUtils = require('../lib/TestUtils.js');

module.exports = {

	testIsAlpha_EmptyValue: function(test){
		var validations = {
		};
		
		var filters = {
			trim: true
		};

		TestUtils.validateTest('', validations, function(result, value){

			console.log('Tested `testIsAlpha_EmptyValue` with value: ' + result.postData.input
				+ '(' + result.postData.input.length + ')\n');

			test.equals(result.errors.length, 0);
			test.done();

		});
	}
};
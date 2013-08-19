/**
 * User: https://github.com/korve/
 * Date: 13.08.13
 * Time: 21:11
 */

var i18n = require('i18n'),
	TestUtils = require('../lib/TestUtils.js');

/**
 * General Validation tests to test multi validation/filter features
 * @type {{testRequired_ValueUndefined: Function}}
 */
module.exports = {

	testValidation_NoValidations_NoFilters: function(test){
		var validations = {			
		};
		
		var filters = {
		};

		TestUtils.validateTest(TestUtils.generateString(50), validations, filters).then(function(result, value){

			console.log('Tested `testValidation_NoValidations_NoFilters` with value: ' + result.postData.input
				+ '(' + result.postData.input.length + ')\n');

			test.equals(result.errors.length, 0);
			test.done();

		});
	},

	testValidation_OneValidation_NoFilters: function(test){
		var validations = {
			required: true
		};

		var filters = {
		};

		TestUtils.validateTest(TestUtils.generateString(50), validations, filters).then(function(result, value){

			console.log('Tested `testValidation_NoValidations_NoFilters` with value: ' + result.postData.input
				+ '(' + result.postData.input.length + ')\n');

			test.equals(result.errors.length, 0);
			test.done();

		});
	},

	testValidation_OneValidation_NoFilters_InvalidInput: function(test){
		var validations = {
			required: true
		};

		var filters = {
		};

		TestUtils.validateTest({}, validations, filters).then(function(result, value){

			console.log('Tested `testValidation_OneValidation_NoFilters_InvalidInput` with value: undefined\n');

			test.equals(result.errors[0], i18n.__('required.missing', 'input'));
			test.done();

		});
	},

	testValidation_OneValidation_OneFilter: function(test){
		var data = ' Untrimmed Bush ';
		
		var validations = {
			required: true
		};

		var filters = {
			trim: true
		};

		TestUtils.validateTest(data, validations, filters).then(function(result, value){

			console.log('Tested `testValidation_OneValidation_OneFilter` with value: ' + result.postData.input
				+ '(' + result.postData.input.length + ')\n');

			test.equals(result.errors.length, 0);
			test.equals(result.value, 'Untrimmed Bush');
			test.done();

		});
	},

	testValidation_OneValidation_OneFilter_InvalidInput: function(test){
		var generated = TestUtils.generateString(50);
		var data = ' ' + generated + ' ';

		var validations = {
			length: {
				max: 30
			}
		};

		var filters = {
			trim: true
		};

		TestUtils.validateTest(data, validations, filters).then(function(result, value){

			console.log('Tested `testValidation_OneValidation_OneFilter_InvalidInput` with value: ' + result.postData.input
				+ '(' + result.postData.input.length + ')\n');

			test.equals(result.errors[0], i18n.__('length.tooLong', 'input', validations.length.max));
			test.equals(result.value, generated);
			test.done();

		});
	},

	testValidation_NoValidations_OneFilter: function(test){
		var data = ' Untrimmed Bush ';

		var validations = {
		};

		var filters = {
			trim: true
		};

		TestUtils.validateTest(data, validations, filters).then(function(result, value){

			console.log('Tested `testValidation_NoValidations_OneFilter` with value: ' + result.postData.input
				+ '(' + result.postData.input.length + ')\n');

			test.equals(result.errors.length, 0);
			test.equals(result.value, 'Untrimmed Bush');
			test.done();

		});
	},

	testValidation_MultipleValidations_NoFilters: function(test){
		var data = TestUtils.generateString(50);

		var validations = {
			required: true,
			alphanumeric: true,
			length: {
				min: 50,
				max: 50
			}
		};

		var filters = {
		};

		TestUtils.validateTest(data, validations, filters).then(function(result, value){

			console.log('Tested `testValidation_MultipleValidations_NoFilters` with value: ' + result.postData.input
				+ '(' + result.postData.input.length + ')\n');

			test.equals(result.errors.length, 0);
			test.equals(result.value, data);
			test.done();

		});
	},

	testValidation_MultipleValidations_NoFilters_InvalidInput: function(test){
		var data = TestUtils.generateString(10) + ' {}-//\\\\..\\.';

		var validations = {
			required: true,
			alphanumeric: true,
			length: {
				min: 50,
				max: 50
			}
		};

		var filters = {
		};

		TestUtils.validateTest(data, validations, filters).then(function(result, value){

			console.log('Tested `testValidation_MultipleValidations_NoFilters_InvalidInput` with value: ' + result.postData.input
				+ '(' + result.postData.input.length + ')\n');

			//must fail on alphanumeric and length test
			test.equals(result.errors[0], i18n.__('alphaNumeric.isNotAlphaNumeric', 'input'));
			test.equals(result.errors[1], i18n.__('length.tooShort', 'input', validations.length.min));
			test.equals(result.value, data);
			test.done();

		});
	}
	
};
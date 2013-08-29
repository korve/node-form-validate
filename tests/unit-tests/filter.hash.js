/**
 * User: https://github.com/korve/
 * Date: 13.08.13
 * Time: 17:45
 */

	
var TestUtils = require('../lib/TestUtils.js'),
	crypto = require('crypto');

module.exports = {

	testHashMd5: function(test){
		var validations = {
		};
		
		var filters = {
			hash: {
				algorithm: 'md5',
				outputEncoding: 'hex'
			}
		};

		var data = TestUtils.generateString(50);
		var shasum = crypto.createHash(filters.hash.algorithm);
		shasum.update(data);
		var hash = shasum.digest(filters.hash.outputEncoding);

		TestUtils.validateTest(data, validations, filters).then(function(result){

			console.log('Tested `testHashMd5` with value: ' + result.postData.input
				+ '(' + result.postData.input.length + ')\n');

			test.equals(result.value, hash);
			test.done();

		});
	},
	
	testHashSha1: function(test){
		var validations = {
		};

		var filters = {
			hash: {
				algorithm: 'md5',
				outputEncoding: 'hex'
			}
		};

		var data = TestUtils.generateString(50);
		var shasum = crypto.createHash(filters.hash.algorithm);
		shasum.update(data);
		var hash = shasum.digest(filters.hash.outputEncoding);

		TestUtils.validateTest(data, validations, filters).then(function(result){

			console.log('Tested `testHashSha1` with value: ' + result.postData.input
				+ '(' + result.postData.input.length + ')\n');

			test.equals(result.value, hash);
			test.done();

		});
	},

	testHashSha256: function(test){
		var validations = {
		};

		var filters = {
			hash: {
				algorithm: 'sha256',
				outputEncoding: 'hex'
			}
		};

		var data = TestUtils.generateString(50);
		var shasum = crypto.createHash(filters.hash.algorithm);
		shasum.update(data);
		var hash = shasum.digest(filters.hash.outputEncoding);

		TestUtils.validateTest(data, validations, filters).then(function(result){

			console.log('Tested `testHashSha256` with value: ' + result.postData.input
				+ '(' + result.postData.input.length + ')\n');

			test.equals(result.value, hash);
			test.done();

		});
	},

	testHashSha512: function(test){
		var validations = {
		};

		var filters = {
			hash: {
				algorithm: 'sha512',
				outputEncoding: 'hex'
			}
		};

		var data = TestUtils.generateString(50);
		var shasum = crypto.createHash(filters.hash.algorithm);
		shasum.update(data);
		var hash = shasum.digest(filters.hash.outputEncoding);

		TestUtils.validateTest(data, validations, filters).then(function(result){

			console.log('Tested `testHashSha512` with value: ' + result.postData.input
				+ '(' + result.postData.input.length + ')\n');

			test.equals(result.value, hash);
			test.done();

		});
	},

	testHashDsa: function(test){
		var validations = {
		};

		var filters = {
			hash: {
				algorithm: 'dsa',
				outputEncoding: 'hex'
			}
		};

		var data = TestUtils.generateString(50);
		var shasum = crypto.createHash(filters.hash.algorithm);
		shasum.update(data);
		var hash = shasum.digest(filters.hash.outputEncoding);

		TestUtils.validateTest(data, validations, filters).then(function(result){

			console.log('Tested `testHashDsa` with value: ' + result.postData.input
				+ '(' + result.postData.input.length + ')\n');

			test.equals(result.value, hash);
			test.done();

		});
	}
};
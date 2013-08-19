/**
 * User: https://github.com/korve/
 * Date: 12.08.13
 * Time: 18:46
 */

var Q = require('q'),
	TestServer = require('./TestServer.js').TestServer;

module.exports = {
	
	validateTest: function(postData, validations, filters){

		var deferred = Q.defer();
		
		new TestServer(function(){

			if(typeof postData !== 'object')
			{
				postData = {
					input: encodeURIComponent(postData)
				};
			}
			
			this.testPost(postData,
				function request(req, res, fn){
					req.Validator.validate('input', validations);
					req.Validator.filter('input', filters);

					req.Validator.getErrors(function(errors){
						fn({
							errors: errors,
							postData: req.body,
							value: req.Validator.getValue('input')
						});
					}, true);
				},
				function testData(res, data){

					var result = JSON.parse(data);

					/**
					 * Wait for instance to close to get to the next test.
					 */

					this.close(function(){
						deferred.resolve(result, data, res);						
					});
				}.bind(this)
			);
		});

		return deferred.promise;
	},
	
	generateString: function(length){
		
		var result = '';
		for(var i = 0; i < length; i++)
		{
			result += String.fromCharCode(Math.round(65 + (Math.random() * 25)));
		}
		
		return result;
	}
	
};
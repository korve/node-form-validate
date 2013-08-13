/**
 * User: https://github.com/korve/
 * Date: 12.08.13
 * Time: 18:46
 */

var TestServer = require('./TestServer.js').TestServer;

module.exports = {
	
	validateTest: function(postData, validations, filters, fn){

		if(typeof fn === 'undefined')
		{
			fn = filters;
		}
		
		new TestServer(function(){

			if(typeof postData !== 'object')
			{
				postData = {
					input: postData
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
					});
				},
				function testData(res, data){

					var result = JSON.parse(data);

					/**
					 * Wait for instance to close to get to the next test.
					 */
					this.close(function(){
						fn(result, data, res);
					});
				}.bind(this)
			);
		});

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
/**
 * User: https://github.com/korve/
 * Date: 10.08.13
 * Time: 00:31
 */

var i18n = require('i18n'),
	rules = require('./rules/'),
	Promise = require('promise');

var Validator = (function() {

	return function(req, res){

		var self = this;
		
		this.errors = {};
		this.promises = [];
		this.validated = false;

		this.validate = function(field, fieldName, validations){
			if( ! field)
				throw new Error('Field name must be passed to validate()');

			if(arguments.length === 2)
			{
				validations = fieldName;
				fieldName = field;
			}
			
			validations = typeof validations === 'object' ? validations : {};

			for(var validation in validations)
			{				
				if(validation.toLowerCase() in rules)
				{
					var result = rules[validation].bind(self)(field, fieldName, req.body[field], validations[validation]);
					
					if(result !== true)
					{
						if( ! self.errors[field])
							self.errors[field] = [];
						
						self.errors[field].push({
							rule: validation,
							message: result
						});
					}
				}
				else if(typeof validations[validation] === 'function')
				{
					var promise = new Promise();
					self.promises.push(promise);
					
					/**
					 * this is a custom validation callback
					 */
					var customCallback = validations[validation].bind(self);

					/**
					 * The custom callback has to call fn after its finished 
					 * in order to complete the validation process
					 */
					var fn = function(errors){
						errors = errors || [];

						for(var error in errors)
						{
							self.errors[field].push({
								rule: validation,
								message: error
							});
						}

						promise.resolve(true);
					};

					customCallback(field, fieldName, req.body[field], fn);
				}
			}
			
			return self;
		};
		
		this.getValidationErrors = function(fn) {

			var getErrorsFinished = function(){
				var errors = [];

				for(var field in self.errors)
				{
					var fieldErrors = self.errors[field];
					for(var i = 0; i < fieldErrors.length; i++)
					{
						errors.push(fieldErrors[i].message);
					}
				}

				fn(errors);
			};
			
			if(self.promises.length > 0)
			{
				/**
				 * Wait for all promises to fulfill and notify everyauth on completion
				 */
				Promise.all(self.promises).then(getErrorsFinished);
			}
			else
			{
				getErrorsFinished();
			}
		};

		this.getFieldValidationErrors = function(fieldName) {
			for(var field in self.errors)
			{
				if(field === fieldName)
				{
					var errors = [];
					for(var i = 0; i < fieldErrors.length; i++)
					{
						errors.push(fieldErrors[i].message);
					}
					return errors;
				}
			}

			return '';
		};

		this.hasValidationErrors = function(fieldName) {
			if( ! fieldName)
				return self.errors.length > 0;
			
			for(var field in self.errors)
			{
				if(field === fieldName)
				{
					return true;
				}
			}

			return false;
		};
	};
})();

module.exports = Validator;
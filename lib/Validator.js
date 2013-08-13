/**
 * User: https://github.com/korve/
 * Date: 10.08.13
 * Time: 00:31
 */

var rules = require('./rules/index.js'),
	filters = require('./filters/index.js'),
	Q = require("q");

var Validator = (function() {

	return function(req, res){

		var self = this;
		
		this._promises = [];
		this._errors = {};

		/**
		 * Contains all validations that need to be executed
		 * @type {Array}
		 * @private
		 */
		this._appliedValidations = [];

		/**
		 * Contains all filters that need to be executed
		 * @type {Array}
		 * @private
		 */
		this._appliedFilters = [];

		/**
		 * The input context. In our case its the request POST body.
		 * @type {Object}
		 * @private
		 */
		this._inputContext = undefined;

		/*
		 * Attach rules/filters to this validator prototype in order
		 * to allow extending these.
		 */
		this.rules = rules;
		this.filters = filters;
		
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
				if( ! this._appliedValidations[field])
					this._appliedValidations[field] = [];
				
				this._appliedValidations[field].push({
					validation: validation,
					options: validations[validation],
					fieldName: fieldName
				});
				
				/*if(validation.toLowerCase() in self.rules)
				{
					this._appliedValidations[field].push(function(){
						self.rules[validation.toLowerCase()].bind(self)(
							field,
							fieldName,
							self._inputContext[field],
							validations[validation]
						);
						
						if(result !== true)
						{
							if( ! self.errors[field])
								self.errors[field] = [];

							self.errors[field].push({
								rule: validation,
								message: result
							});
						}
					});
				}
				else if(typeof validations[validation] === 'function')
				{
					/*
					 * this is a custom validation callback
					 *
					var customCallback = validations[validation].bind(self);

					//Delay execution until needed
					this._appliedValidations[field].push(function(){

						/*
						 * The custom callback has to call fn after its finished
						 * in order to complete the validation process
						 *

						customCallback(field, fieldName, self._inputContext[field], function(errors){
							errors = errors || [];

							for(var error in errors)
							{
								self.errors[field].push({
									rule: validation,
									message: error
								});
							}

						});
						
					});
					
				}
				else
				{
					throw new Error('Validation method "' + validation + '" not supported.');
				}*/
			}
			
			return self;
		};

		/**
		 * This filters the given field before getting validated.
		 * @param field The POST field to validate
		 * @param fieldFilters 
		 * @returns {*}
		 */
		this.filter = function(field, fieldFilters) {
			
			if(field in req.body)
			{			
				for(var filter in fieldFilters)
				{
					if(filter.toLowerCase() in self.filters)
					{
						if( ! this._appliedFilters[field])
							this._appliedFilters[field] = [];
						
						self._appliedFilters[field].push(filters[filter].bind(this));
					}
					else
					{
						throw new Error('Filter "' + filter + '" is not supported');
					}		
				}
			}
			
			return this;
		};
		
		this.getValidationErrors = function(fn) {

			this._validate(function(results){

				var errors = [];
				
				for(var field in results){
					for(var i = 0; i < results[field].length; i++)
					{
						errors.push(results[field][i].message);
					}
				};
				
				fn(errors);
			});
			
		};

		/**
		 * Starts the internal validation process
		 * @param fn
		 * @private
		 */
		this._validate = function(fn)
		{
			//reset validation context
			this._inputContext = req.body;
			this._errors = {};
			this._promises = [];
			
			//apply filters first
			for(var field in this._appliedFilters)
			{
				if(field in this._inputContext === false)
					continue;
				
				var filters = this._appliedFilters[field] || [];
				for(var i = 0; i < filters.length; i++)
				{
					this._inputContext[field] = filters[i](this._inputContext[field]);
				}
			}

			for(var field in this._appliedValidations)
			{
				var fieldValidations = this._appliedValidations[field];
				var value = (field in this._inputContext) ? this._inputContext[field] : undefined;

				for(var i = 0; i < fieldValidations.length; i++)
				{
					var validationInfo = fieldValidations[i],
						validation = validationInfo.validation.toLocaleLowerCase(),
						options = validationInfo.options;
					
					if(validation in this.rules)
					{
						var validationFn = self.rules[validation].bind(self);
						
						var promise = Q.fcall(validationFn, field, validationInfo.fieldName, value, options)
							.then(function(result){
								// All validation callbacks must return a unified object
								// consisting of field, validation name, and a message if an error occured
								return {
									field: field,
									validation: validationInfo.validation,
									message: result !== true ? result : null
								};
							});
						
						this._promises.push(promise);
					}
					// Custom user validation callback
					else if(typeof options === 'function')
					{
						var customCallback = options.bind(this);
						
						var promise = Q.fcall(function(){

							var deferred = Q.defer();
							
							customCallback(field, validationInfo.fieldName, value, function(result){

								result = {
									field: field,
									validation: validationInfo.validation,
									message: result !== true ? result : null
								};

								deferred.resolve(result);
							});		
							
							return deferred.promise;
						});
						this._promises.push(promise);
					}
				}
			}

			Q.all(this._promises)
				.done(function(results){

					for(var i = 0; i < results.length; i++)
					{
						var result = results[i];

						//valid
						if(result.message === null)
							continue;

						if(result.field in self._errors === false)
							self._errors[field] = [];

						self._errors[field].push(result);
					}
					
					fn(self._errors);
				});
			
			/*var getErrorsFinished = function(res){

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

			for(var field in this._appliedValidations)
			{
				var filters = this._appliedFilters[field] || [];
				var validations = this._appliedValidations[field];
				var value = this._inputContext[field] || undefined;

				//check if there are filters set for this field and 
				//filter value accordingly
				for(var i = 0; i < filters.length; i++)
				{
					value = filters[i](value);
				}

				for(var i = 0; i < validations.length; i++)
				{
					validations[i]();
				}

			}*/
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
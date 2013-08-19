/**
 * User: https://github.com/korve/
 * Date: 10.08.13
 * Time: 00:31
 */

var i18n = require('i18n'),
	path = require('path'),
	util = require('./util.js'),
	rules = require('./rules/index.js'),
	filters = require('./filters/index.js'),
	Q = require("q");

var Validator = (function() {

	var defaults = {
		/**
		 * Should every input get escaped when using getValue?
		 */
		escapeHTML: true,

		/**
		 * Should every input get stripped from tags when using getValue?
		 */
		stripTags: true,
		i18n: {
			// setup some locales - other locales default to en silently
			locales: ['en'],

			// you may alter a site wide default locale
			defaultLocale: 'en',

			// sets a custom cookie name to parse locale settings from  - defaults to NULL
			cookie: null,

			// where to store json files - defaults to './locales' relative to modules directory
			directory: path.normalize(__dirname + '/../locales/'),

			// whether to write new locale information to disk - defaults to true
			updateFiles: true,

			// what to use as the indentation unit - defaults to "\t"
			indent: "\t",

			// setting extension of json files - defaults to '.json' (you might want to set this to '.js' according to webtranslateit)
			extension: '.json'
		}
	};
	
	return function(req, res, options){

		var self = this;

		this._options = util.extend(options, defaults);
		i18n.configure(this._options.i18n);
		
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
		this._inputContext = req.body;
		
		this._validated = false;

		/*
		 * Attach rules/filters to this validator prototype in order
		 * to allow extending these.
		 */
		this.rules = rules;
		this.filters = filters;

		/**
		 * Adds a validation for a field
		 * 
		 * @param field POST field name
		 * @param fieldName The field name to display in the error message
		 * @param validations Validations configuration
		 * @returns Validator
		 */
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
				
				var validationInfo = {
					validation: validation,
					options: validations[validation],
					fieldName: fieldName
				};

				/*
				 required is a bit special. It always has to be validated first.
				 So we prepend it to the validation list
				 */
				if(validation === 'required')
				{
					this._appliedValidations[field].unshift(validationInfo);
				}
				else
				{
					this._appliedValidations[field].push(validationInfo);
				}
			}
			
			return self;
		};

		/**
		 * This filters the given field before getting validated.
		 * @param field The POST field to validate
		 * @param fieldFilters 
		 * @returns Validator
		 */
		this.filter = function(field, fieldFilters) {
			
			if(field in self._inputContext)
			{			
				for(var filter in fieldFilters)
				{
					if(filter.toLowerCase() in self.filters)
					{
						if( ! this._appliedFilters[field])
							this._appliedFilters[field] = [];
						
						self._appliedFilters[field].push({
							fn: self.filters[filter.toLowerCase()],
							filter: filter.toLowerCase(),
							options: fieldFilters[filter]
						});
					}
					else
					{
						throw new Error('Filter "' + filter + '" is not supported');
					}		
				}
			}
			
			return this;
		};

		/**
		 * Calls fn with an array containing all errors as first argument
		 * 
		 * @param fn
		 * @param getAllErrors If this is true, then all errors will be returned for a field. Default is to return only 
		 * the first error
		 */
		this.getErrors = function(fn, getAllErrors) {
			getAllErrors = (typeof getAllErrors === 'undefined' ? false : getAllErrors);

			this._processInput()
				.done(function(errors){

					var result = [];
	
					for(var field in errors){
						/*
						 * Get all errors if flag is set. Normally one does only need the first error. 
						 */
						if(getAllErrors)
						{
							for(var i = 0; i < errors[field].length; i++)
							{
								result.push(errors[field][i].message);
							}
						}
						else
						{
							result.push(errors[field][0].message);
						}
	
					};
	
					fn(result);
				});
		};

		/**
		 * Returns all Errors for a specific field
		 * 
		 * @param fieldName
		 * @returns {Array}
		 */
		this.getFieldErrors = function(fieldName) {
			if(self._validated === false)
				return [];

			for(var field in this._errors)
			{
				if(field === fieldName)
				{
					var errors = [];
					for(var i = 0; i < this._errors[field].length; i++)
					{
						errors.push(this._errors[field][i].message);
					}

					return errors;
				}
			}

			return [];
		};

		/**
		 * Checks if a field has validation errors
		 * @param fieldName
		 * @returns {boolean}
		 */
		this.hasErrors = function(fieldName) {
			if(self._validated === false)
				return false;

			for(var field in this._errors)
			{
				if(field === fieldName)
				{
					return true;
				}
			}

			return false;
		};

		/**
		 * Gets the filtered value of a field
		 * 
		 * @param field
		 * @param defaultValue
		 * @returns {*}
		 */
		this.getValue = function(field, defaultValue){
			defaultValue = defaultValue || '';

			if(self._validated === false)
				return defaultValue;

			if(field in this._inputContext)
			{
				return this._inputContext[field];
			}

			return defaultValue;
		};
		
		/**
		 * Starts the internal validation process
		 * @param fn
		 * @private
		 */
		this._processInput = function()
		{
			//reset validation context
			this._errors = {};
			this._validated = false;
			
			//decode first
			for(var field in this._inputContext)
			{
				var value = decodeURIComponent(this._inputContext[field]);
				this._inputContext[field] = value;				
			}
			
			//apply filters first
			this._applyFilters();

			//apply validations
			return this._applyValidations()
					.then(function(results){
	
						for(var i = 0; i < results.length; i++)
						{
							var result = results[i];
	
							//valid
							if(result.message === null)
								continue;
	
							if(result.field in self._errors === false)
								self._errors[result.field] = [];
	
							self._errors[result.field].push(result);
						}

						self._validated = true;
						return self._errors;
					});
		};

		/**
		 * 
		 * @private
		 */
		this._applyFilters = function() {

			for(var field in this._appliedFilters)
			{
				if(field in this._inputContext === false || typeof this._inputContext[field] === 'undefined')
					continue;

				var filters = this._appliedFilters[field] || [];
				for(var i = 0; i < filters.length; i++)
				{
					this._inputContext[field] = filters[i].fn(this._inputContext[field], filters[i].options);
				}
			}
			
		};

		/**
		 * 
		 * @returns Promise
		 * @private
		 */
		this._applyValidations = function() {

			var promises = [];
			
			for(var field in this._appliedValidations)
			{
				var fieldValidations = this._appliedValidations[field];
				var value = (field in this._inputContext) ? this._inputContext[field] : undefined;

				if(fieldValidations[0].validation.toLowerCase() === 'required')
				{
					var required = fieldValidations[0].options === true;

					if(required && typeof value === 'undefined')
					{
						var validationInfo = fieldValidations[0];
						var promise = Q({
							field: field,
							validation: validationInfo.validation.toLowerCase(),
							message: i18n.__('required.missing', validationInfo.fieldName)
						});

						promises.push(promise);
						continue;
					}
				}

				for(var i = 0; i < fieldValidations.length; i++)
				{
					var validationInfo = fieldValidations[i],
						validation = validationInfo.validation.toLowerCase(),
						options = validationInfo.options;
					
					if(validation === 'required')
						continue;
					
					var callbackContext = {
						field: field
					};

					//use built-in validation
					if(validation in this.rules)
					{
						var validationFn = self.rules[validation].bind(self);

						//reserve the possibility to use async validation functions
						var promise = Q.fcall(validationFn, field, validationInfo.fieldName, value, options)
							.then(function(result){
								// All validation callbacks must return a unified object
								// consisting of field, validation name, and a message if an error occured
								return {
									field: this.field,
									validation: validationInfo.validation,
									message: result !== true ? result : null
								};
							}.bind(callbackContext));

						promises.push(promise);
					}
					// Custom user validation callback
					else if(typeof options === 'function')
					{
						var customCallback = options.bind(this);

						var promise = Q.fcall(function(customCallback, field, value, validationInfo){

							var deferred = Q.defer();

							//user callbacks are always async as in some cases
							//the user may want to retrieve data from the database first
							customCallback(field, validationInfo.fieldName, value, function(result){

								var obj = {
									field: this.field,
									validation: validationInfo.validation,
									message: (! result || result === true) ? null : result
								};

								deferred.resolve(obj);
							}.bind(callbackContext));

							return deferred.promise;
						}, customCallback, field, value, validationInfo);

						promises.push(promise);
					}
					else
					{
						throw new Error('Validation method "' + validation + '" not supported.');
					}
				}
			};
			
			return Q.all(promises);
		}
	};
})();

module.exports = Validator;
/**
 * User: https://github.com/korve/
 * Date: 12.08.13
 * Time: 21:55
 */

var i18n = require('i18n'),
	util = require('../util.js');

module.exports = (function(){

	var defaults = {
		min: 0,
		max: undefined
	};

	/**
	 * Validates Numbers and checks if they are between a certain range
	 */
	return function(field, fieldName, value, options){

		if( ! options || typeof value === 'undefined' || value === '')
			return true;

		options = util.extend(options || {}, defaults);
		
		value = parseFloat(value);
		
		if(isNaN(value))
		{
			return i18n.__('between.isNotNumeric', fieldName);
		}
		
		if(value < options.min || (typeof options.max !== 'undefined' && value > options.max))
		{
			return i18n.__('between.notInRange', fieldName, options.min, options.max);
		}

		return true;
	}
})();
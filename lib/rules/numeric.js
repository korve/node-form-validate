/**
 * User: https://github.com/korve/
 * Date: 12.08.13
 * Time: 21:55
 */

var i18n = require('i18n'),
	util = require('../util.js');

module.exports = (function(){

	var defaults = {
		allowNegative: false,
		
		regexNumeric: /^\d*(\.\d{1,})?$/,
		regexNumericNeg: /^\-?\d*(\.\d{1,})?$/
	};

	/**
	 * Validates all kinds of numbers. E.g.:
	 * 
	 * 123456
	 * 123.45
	 * .45
	 * -12345
	 * -12.45
	 * -.4567
	 */
	return function(field, fieldName, value, options){

		if( ! options || typeof value === 'undefined')
			return true;

		options = util.extend(options, defaults);
		
		var valid = false;
		if(options.allowNegative)
		{
			valid = options.regexNumericNeg.test(value) !== false;
		}
		else
		{
			valid = options.regexNumeric.test(value) !== false;
		}
		
		if(valid === false)
			return i18n.__('numeric.isNotNumeric', fieldName);

		return true;
	}
})();
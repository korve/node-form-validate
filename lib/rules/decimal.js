/**
 * User: https://github.com/korve/
 * Date: 12.08.13
 * Time: 21:55
 */

var i18n = require('i18n'),
	util = require('../util.js');

module.exports = (function(){

	var defaults = {
		allowNegative:      false,
		decimalSeperator:   '.',

		regex: /^\d*(\.\d+)*$/,
		regexNeg: /^\-?\d*(\.\d+)*$/
	};

	/**
	 * Validates decimals. e.g. valid are:
	 * 100
	 * 1.00
	 * .50
	 * 0.0
	 */
	return function(field, fieldName, value, options){
		
		if( ! options || typeof value === 'undefined')
			return true;

		options = util.extend(options || {}, defaults);
		
		if(options.decimalSeperator != defaults.decimalSeperator)
		{
			options.regex = new RegExp('^\\d*(\\' + options.decimalSeperator + '\\d+)*$');
			options.regexNeg = new RegExp('^\\-?\\d*(\\' + options.decimalSeperator + '\\d+)*$');
		}
		
		var valid = false;
		if(options.allowNegative === true)
		{
			valid = options.regexNeg.test(value) !== false;
		}
		else
		{
			valid = options.regex.test(value) !== false;
		}
		
		if(valid === false)
			return i18n.__('decimal.isNoDecimal', fieldName);

		return true;
	}
})();
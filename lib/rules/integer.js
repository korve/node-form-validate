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
		
		regex: /^\d*?$/,
		regexNeg: /^\-?\d?$/
	};

	/**
	 * Validates only integers. e.g.:
	 * 
	 * 1234567890
	 */
	return function(field, fieldName, value, options){
		
		if(typeof value === 'undefined' || ! options)
			return true;

		options = util.extend(options || {}, defaults);
		
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
			return i18n.__('integer.isNoInteger', fieldName);

		return true;
	}
})();
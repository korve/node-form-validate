/**
 * User: https://github.com/korve/
 * Date: 10.08.13
 * Time: 00:46
 */

var sprintf = require('sprintf').sprintf,
	util = require('../util.js'),
	i18n = require('i18n');

module.exports = (function(){

	var defaults = {
		min: 0,
		max: Number.MAX_VALUE
	};
	
	return function(field, fieldName, value, options){
		options = util.extend(options || {}, defaults);
		
		if(typeof value === 'undefined' || ((value === null || value.length === 0) && options.min === 0))
			return true;

		var tooShort = value.length < options.min;
		var tooLong = options.max >= 0 && value.length > options.max;

		if(tooShort || tooLong)
		{
			if(tooShort)
				return i18n.__('length.tooShort', fieldName, options.min);
			else
				return i18n.__('length.tooLong', fieldName, options.max);
		}

		return true;
	}
})();
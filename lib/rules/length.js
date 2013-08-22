/**
 * User: https://github.com/korve/
 * Date: 10.08.13
 * Time: 00:46
 */

var util = require('../util.js'),
	i18n = require('i18n'),
	S = require('string');

module.exports = (function(){

	var defaults = {
		min: 0,
		max: undefined
	};
	
	return function(field, fieldName, value, options){
		if( ! options || typeof value === 'undefined')
			return true;

		options = util.extend(options, defaults);
		
		if(S(value).isEmpty() && options.min <= 0)
			return true;

		var tooShort = value.length < options.min;
		var tooLong = (typeof options.max !== 'undefined' && (options.max >= 0 && value.length > options.max));

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
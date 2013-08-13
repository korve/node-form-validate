/**
 * User: https://github.com/korve/
 * Date: 12.08.13
 * Time: 21:55
 */

var i18n = require('i18n'),
	S = require('string');

module.exports = function(field, fieldName, value, options){	
	if(typeof value === 'undefined')
		return true;
	
	if(options === false )
	{
		if(S(value).isAlpha() === true)
			return i18n.__('alpha.isAlpha', fieldName);			
	}
	else
	{
		if(S(value).isAlpha() === false)
			return i18n.__('alpha.isNotAlpha', fieldName);
	}

	return true;
};
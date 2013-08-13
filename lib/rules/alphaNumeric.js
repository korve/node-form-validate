/**
 * User: https://github.com/korve/
 * Date: 12.08.13
 * Time: 21:55
 */

var i18n = require('i18n');

module.exports = (function(){

	var alphaRex = /^([a-z0-9])*$/i;
	var alphaRexInverted = /^(?:(?![a-z0-9].).)*$/i;

	return function(field, fieldName, value, options){
		if(options === false )
		{
			if(alphaRexInverted.test(value) === false)
				return i18n.__('alphaNumeric.isAlphaNumeric', fieldName);
		}
		else
		{
			if(alphaRex.test(value) === false)
				return i18n.__('alphaNumeric.isNotAlphaNumeric', fieldName);
		}

		return true;
	}
})();
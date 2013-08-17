/**
 * User: https://github.com/korve/
 * Date: 12.08.13
 * Time: 21:55
 */

var i18n = require('i18n'),
	S = require('string');

module.exports = (function(){

	//var alphaRex = /^([a-z0-9])*$/i;
	//var alphaRexInverted = /^(?:(?![a-z0-9].).)*$/i;

	return function(field, fieldName, value, options){
		if(typeof value === 'undefined')
			return true;
		
		if(options === false )
		{
			return true
		}
		
		if(S(value).isAlphaNumeric() === false)
			return i18n.__('alphaNumeric.isNotAlphaNumeric', fieldName);

		return true;
	}
})();
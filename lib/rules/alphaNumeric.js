/**
 * User: https://github.com/korve/
 * Date: 12.08.13
 * Time: 21:55
 */

var sprintf = require('sprintf').sprintf,
	util = require('../util.js'),
	i18n = require('i18n');

module.exports = (function(){

	var alphaRex = /^(\w)+$/;

	return function(field, fieldName, value, options){
		var result = alphaRex.test(value);
		
		if(options === false && result === true)
		{
			return i18n.__('alphaNumeric.isAlphaNumeric', fieldName);			
		}
		else if(result === false)
		{
			return i18n.__('alphaNumeric.isNotAlphaNumeric', fieldName);
		}

		return true;
	}
})();
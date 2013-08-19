/**
 * User: https://github.com/korve/
 * Date: 12.08.13
 * Time: 21:55
 */

var i18n = require('i18n'),
	S = require('string');

module.exports = function(field, fieldName, value, options){
	if( ! options || S(value).isEmpty())
		return true;
	
	if(S(value).isAlpha() === false)
		return i18n.__('alpha.isNotAlpha', fieldName);	

	return true;
};
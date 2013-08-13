/**
 * User: https://github.com/korve/
 * Date: 13.08.13
 * Time: 20:51
 */

var i18n = require('i18n');

module.exports = function(field, fieldName, value, options){
	if(options === false)
		return true;
	
	if(typeof value === 'undefined')
	{
		return i18n.__('required.missing', fieldName);
	}

	return true;
};
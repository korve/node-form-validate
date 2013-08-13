/**
 * User: https://github.com/korve/
 * Date: 13.08.13
 * Time: 12:03
 */

module.exports = function(value){
	if( ! value || typeof value !== 'string')
		return value;
	
	return value.trim();
};
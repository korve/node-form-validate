/**
 * User: https://github.com/korve/
 * Date: 13.08.13
 * Time: 12:03
 */
var S = require('string');

function mapToStringJs(name) {
	return function(value, options) {
		if(options === false)
			return value;
		
		return S(value)[name]().s;
	};
}

module.exports = {
	trim: require('./trim.js'),
	striptags: mapToStringJs('stripTags'),
	escapehtml: mapToStringJs('escapeHTML')
};
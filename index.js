/**
 * User: https://github.com/korve/
 * Date: 10.08.13
 * Time: 00:29
 */

var path = require('path'),
	i18n = require('i18n'),
	util = require('./lib/util.js'),
	Validator = require('./lib/Validator.js');

module.exports = function(app, options){
	
	var defaults = {
		i18n: {
			// setup some locales - other locales default to en silently
			locales:['en', 'de'],

			// you may alter a site wide default locale
			defaultLocale: 'en',

			// sets a custom cookie name to parse locale settings from  - defaults to NULL
			cookie: null,

			// where to store json files - defaults to './locales' relative to modules directory
			directory: path.normalize(__dirname + '/locales/'),

			// whether to write new locale information to disk - defaults to true
			updateFiles: true,

			// what to use as the indentation unit - defaults to "\t"
			indent: "\t",

			// setting extension of json files - defaults to '.json' (you might want to set this to '.js' according to webtranslateit)
			extension: '.json'
		}
	};
	options = util.extend(options, defaults);
	
	i18n.configure(options.i18n);
		
	return function(req, res, next) {

		req.Validator = new Validator(req, res);
		res.locals.Validator = req.Validator;
		next();
		
 	};
}
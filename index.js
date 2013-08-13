/**
 * User: https://github.com/korve/
 * Date: 10.08.13
 * Time: 00:29
 */

var Validator = require('./lib/Validator.js');

module.exports = function(app, options){
		
	return function(req, res, next) {

		req.Validator = new Validator(req, res, options);
		res.locals.Validator = req.Validator;
		next();
		
 	};
}
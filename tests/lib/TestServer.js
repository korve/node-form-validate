/**
 * User: https://github.com/korve/
 * Date: 11.08.13
 * Time: 15:34
 */
var express = require('express'),
	http = require('http'),
	querystring = require('querystring'),
	validate = require('../../index.js');
	
module.exports.TestServer = function(fn){

	var self = this;
	
	this.app = express();

	this.app.locals.pretty = true;
	this.app.set('port', process.env.PORT || 9001);

	this.app.use(express.logger('dev'));
	this.app.use(express.bodyParser());
	this.app.use(express.methodOverride());
	this.app.use(validate(this.app));

	this.app.use(this.app.router);
	this.app.use(express.errorHandler());

	this.server = http.createServer(this.app);
	this.server.on("listening", function () {
		if(fn)
			fn.bind(self)(self.app, this);
	});
	
	this.server.listen(this.app.get('port'));
	
	this.close = function(fn){
	
		if( !this.server)
			return;

		this.server.close(fn);
	};

	this.testPost = function(postData, onPost, onTest){

		postData = querystring.stringify(postData);
		var requestParams = {
			host: '127.0.0.1',
			port: this.app.get('port'),
			path: '/form',
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Content-Length': Buffer.byteLength(postData)
			}
		};
		
		
		this.app.post('/form', function(req, res){

			onPost(req, res, function(result){
				res.write(JSON.stringify(result));
				res.end();
			});

		});

		var req = http.request(requestParams, function(res){

			res.setEncoding('utf8');
			res.on('data', function (chunk) {
				onTest(res, chunk);
			});

		});

		req.write(postData);
		req.end();
	};

	return this;
};
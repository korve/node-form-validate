/**
 * User: https://github.com/korve/
 * Date: 29.08.13
 * Time: 22:21
 */

/*
 Some supported algorithms

 DSA-SHA1-old
 dsa
 dsa-sha
 dsa-sha1
 dsaEncryption
 dsaWithSHA
 dsaWithSHA1
 dss1
 ecdsa-with-SHA1
 md4
 md4WithRSAEncryption
 md5
 md5WithRSAEncryption
 mdc2
 mdc2WithRSA
 ripemd
 ripemd160
 ripemd160WithRSA
 rmd160
 rsa-md4
 rsa-md5
 rsa-mdc2
 rsa-ripemd160
 rsa-sha
 rsa-sha1
 rsa-sha1-2
 rsa-sha224
 rsa-sha256
 rsa-sha384
 rsa-sha512
 sha
 sha1
 sha1WithRSAEncryption
 sha224
 sha224WithRSAEncryption
 sha256
 sha256WithRSAEncryption
 sha384
 sha384WithRSAEncryption
 sha512
 sha512WithRSAEncryption
 shaWithRSAEncryption
 ssl2-md5
 ssl3-md5
 ssl3-sha1
 whirlpool
 */

var crypto = require('crypto'),
	util = require('../util.js');

(function(){
	var supportedAlgorithms = crypto.getHashes();
	var supportedOutputEncodings = ['base64', 'binary', 'hex'];
	
	var defaults = {
		algorithm: 'sha1',
		outputEncoding: 'base64'
	};

	module.exports = function(value, options){
		if(typeof options !== 'object')
			options = {};
		
		options = util.extend(options, defaults);

		if(supportedAlgorithms.indexOf(options.algorithm) === -1)
			throw new Error('Hash algorithm \'' + options.algorithm + '\' not supported.');

		if(supportedOutputEncodings.indexOf(options.outputEncoding) === -1)
			throw new Error('Hash output encoding \'' + options.outputEncoding + '\' not supported.');

		var shasum = crypto.createHash(options.algorithm);
		shasum.update(value);
		
		var digest = shasum.digest(options.outputEncoding);
		return digest;
	};
})();

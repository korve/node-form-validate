# node-form-validate

A validation module for nodejs and express. It aims to give a convenient way to validate incoming POST data (which is the most common) and be as flexible as possible. This module is in development - feel free to contribute if you feel like it :)

## Installation
    npm install form-validation
    
 
## Setting up `form-validate` with Express
In order to use the `req.Validator` object and to access view helpers you have to register the form-validate middleware with express. 

	var express = require('express'),
                  validate = require('form-validate');
                  
    // ...Your express initialization logic...
    
    
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
    
    // ...
	
	var validationConfig = {
    	//You can configure certain aspects of the validation module
	};
	app.use(validate(app, validationConfig));
        
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
    
    // ... Create http server

## Configuration
You can configure the behaviour of the `form-validate` module by passing options when initializing the middleware:

	var validationConfig = {
    	//You can configure certain aspects of the validation module
	};
	app.use(validate(app, validationConfig));
### Options

<table>
	<thead>
      <tr>
          <th>Options</th>
          <th>Type</th>
          <th>Description</th>
      </tr>
    </thead>
    <tbody>
    	<tr>
        	<td>i18n</td>
        	<td>object</td>
        	<td>`form-validate` uses the [`i18n`](https://github.com/mashpie/i18n-node) module to translate the error messages. <br>You can configure the i18n module using this option.</td>
        </tr>
    </tbody>
</table>

## Express Usage Example

Using `form-validation` in an express context is pretty straight-forward:

    app.post('/register', function(res, res) {
        /*
         * You call req.Validator.validate for every field you want to validate. You
         * can chain up the validate calls if you want (like in this example).
         * You can optionally pass the field name as the 2nd parameter to
         * place another name in the error message if you want to (for example to translate 
         * fieldnames).
         */
        req.Validator.validate('displayName', i18n.t('user.displayName'), {
                /*
                 * Add as many validators as you want here. To see what 
                 * validators are supported have a look in the form-validation/lib/rules/ folder
                 */
                length: {
                    min: 2,
                    max: 16
                },
                isUnique: function(field, fieldName, value, fn){
                    /*
                     * This is a custom validation callback. You have to
                     * call fn() with an array containing the error 
                     * message for this custom validation. If the array
                     * is empty, the validation is considered a success.
                     */
                     var errors = [];
                     if(value != 'unique')
                     {
                        errors.push('this field is not unique');
                     }
                     fn(errors); 
                }
            })
            .validate('username', {
                length: {
                    min: 3,
                    max: 256
                }
            })
            .validate('password', {
                length: {
                    min: 4,
                    max: 64
                }
            });
        
        /*
         * Call the "getValidationErrors" method to start the validation
         */
        req.Validator.getValidationErrors(function(errors){
            /*
             * ... Your further rendering logic. e.g. res.render('view', { errors: errors });
             */
        });
    });    

## Getting all Errors
To get validation errors simply call the **asynchronous** `Validator.getValidationErrors(fn)` method and provide a callback which gets called when all validations have been completed. The callback gets provided with an array containing all errors which resulted from the validation process.
Example:

	app.post('/register', function(res, res) {
        
        // ... Validation logic ... 
        
        /*
         * Call the "getValidationErrors" method to start the validation
         */
        req.Validator.getValidationErrors(function(errors){
            /*
             * ... Your further rendering logic. e.g. res.render('view', { errors: errors });
             */
        });
    });    

## View Helpers
The local variable `Validator` is available in all express views. **Warning:** In order to these view helpers to work `Validator.getValidationErrors()` has got to be called before the rendering took place.

	/**
     * Returns all errors for this field as an array
     */
    Validator.getFieldValidationErrors(fieldName)

_ _
	
    /**
     * Returns true if this field has any error. You can use this to give the
     * field a certain class if an error occured
     */
    Validator.hasValidationErrors(fieldName)

## The MIT License

Copyright (c) 2013 André Eckardt (http://github.com/korve, http://mindpress.de)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
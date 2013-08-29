# node-form-validate

A validation module for nodejs and express. It aims to give a convenient way to validate incoming POST data (which is the most common) and be as flexible as possible. This module is in development - feel free to contribute if you feel like it :)

## Installation
    npm install form-validate
    
 
## Setting up `form-validate` with Express
In order to use the `req.Validator` object and to access view helpers you have to register the form-validate middleware with express. 

```js
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
```

## Configuration
You can configure the behaviour of the `form-validate` module by passing options when initializing the middleware:

```js
var options = {
    //You can configure certain aspects of the validation module
};
app.use(validate(app, options));
```
### Options

<table>
	<thead>
      <tr>
          <th>Options</th>
          <th>Type</th>
          <th>Default</th>
          <th>Description</th>
      </tr>
    </thead>
    <tbody>
    	<tr>
        	<td>i18n</td>
        	<td>object</td>
        	<td>
               <pre><code>i18n: {
    locales:['en', 'de'],
    defaultLocale: 'en',
    cookie: null,
    directory: ...,
    updateFiles: true,
    indent: "\t",
    extension: '.json'
}</code></pre>
        	</td>
        	<td><code>form-validate</code> uses the i18n (https://github.com/mashpie/i18n-node) module to translate the error messages. <br>You can configure the i18n module using this option.</td>
        </tr>
    	<tr>
        	<td>escapeHTML</td>
        	<td>boolean</td>
        	<td><code>true</code></td>
        	<td>If this is true every value will be html escaped when using <code>Validator.getValue()</code></td>
        </tr>
    	<tr>
        	<td>stripTags</td>
        	<td>boolean</td>
        	<td><code>true</code></td>
        	<td>If this is true every value will be stripped from html tags when using <code>Validator.getValue()</code></td>
        </tr>
    </tbody>
</table>

## Express Usage Example

Using `form-validation` in an express context is pretty straight-forward:

```js
app.post('/register', function(res, res) {
    /*
     * You call req.Validator.validate for every field you want to validate. You
     * can chain up the validate calls if you want (like in this example).
     * You can optionally pass the field name as the 2nd parameter to
     * place another name in the error message if you want to (for example to translate 
     * fieldnames).
     */
    req.Validator.validate('username', i18n.t('user.displayName'), {
            /*
             * Add as many validators as you want here. To see what 
             * validators are supported have a look in the form-validation/lib/rules/ folder
             */
            length: {
                min: 3,
                max: 256
            },
            /*
             * This validator name must be unique and not already used by form-validation (e.g. length, required etc.)
             */
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
        .filter('username', {
            trim: true
        })
        .validate('password', {
            length: {
                min: 4,
                max: 64
            }
        })
        .filter('password', {
            stripTags: false,
            escapeHTML: false
        });
    
    /*
     * Call the "getErrors" method to start the validation
     */
    req.Validator.getErrors(function(errors){
        /*
         * ... Your further rendering logic. e.g. res.render('view', { errors: errors });
         */
    });
});    
```

## Validators
Validators are the core functionality of node-form-validate. Input data can be validated to see if they meet certain
criteria. If they dont match, an error message will be generated. They can be added by using `req.Validator.validate()`

<table>
    <thead>
      <tr>
          <th>Validator</th>
          <th>Example Configuration</th>
      </tr>
    </thead>
    <tbody>
    	<tr>
        	<td>required</td>
        	<td>
                <code>
                    required: true
                </code>
            </td>
        </tr>
    	<tr>
        	<td>length</td>
        	<td>
                <code>
                    length: {
                        min: 5,
                        max: 50
                    }
                </code>
            </td>
        </tr>
        <tr>
        	<td>alpha</td>
        	<td>
                <code>alpha: true</code><br>
            </td>
        </tr>
        <tr>
        	<td>alphaNumeric</td>
        	<td>
                <code>alphaNumeric: true</code><br>
            </td>
        </tr>
        <tr>
        	<td>numeric</td>
        	<td>
                <code>numeric: true</code><br>
                <code>numeric: { allowNegative: true } // also allow negative values</code>
            </td>
        </tr>
        <tr>
        	<td>integer</td>
        	<td>
                <code>integer: true</code><br>
                <code>integer: { allowNegative: true } // also allow negative values</code>
            </td>
        </tr>
        <tr>
        	<td>decimal</td>
        	<td>
                <code>decimal: true</code><br>
                <code>decimal: { allowNegative: true } // also allow negative values</code>
            </td>
        </tr>
        <tr>
        	<td>between</td>
        	<td>
                <code>between: { min: 10, max: 15 }</code>
            </td>
        </tr>
        <tr>
        	<td>email</td>
        	<td>
                <code>email: true</code><br>
                This method of testing is not recommended. You should allow all Email addresses and validate it by 
                sending an email to the given address.
            </td>
        </tr>
    </tbody>
</table>


## Filters
Filters are applied before the input data is validated. Filters can parse the incoming data and prepare
it for validation or database input. They can be added by using `req.Validator.filter()`

<table>
    <thead>
      <tr>
          <th>Filter</th>
          <th>Example Configuration</th>
      </tr>
    </thead>
    <tbody>
    	<tr>
        	<td>trim</td>
        	<td>
                <code>
                    trim: true
                </code>
            </td>
        </tr>
    	<tr>
        	<td>toInt</td>
        	<td>
                <code>
                    toInt: true
                </code>
            </td>
        </tr>
    	<tr>
        	<td>toFloat</td>
        	<td>
                <code>
                    toFloat: true
                </code>
            </td>
        </tr>
    	<tr>
        	<td>toBoolean</td>
        	<td>
                <code>
                    toBoolean: true
                </code>
            </td>
        </tr>
    	<tr>
        	<td>hash</td>
        	<td>
                <pre><code>i18n: {
hash: {
    algorithm: 'sha1',
    outputEncoding: 'base64' // 'hex', 'binary' or 'base64'
}
                </code></pre>
                To get a list of all supported hash algorithms on your installation, see: http://nodejs.org/api/crypto.html#crypto_crypto_gethashes
            </td>
        </tr>
    	<tr>
        	<td>escapeHTML</td>
        	<td>
                Explicitly enable HTML escaping (enabled by default):
                <br>
                <code>escapeHTML: true</code><br>
                Disable HTML escaping:<br>
                <code>escapeHTML: false</code>
            </td>
        </tr>
    	<tr>
        	<td>stripTags</td>
        	<td>
                Explicitly enable stripping of HTML tags (enabled by default):
                <br>
                <code>stripTags: true</code><br>
                Disable stripping of HTML tags:<br>
                <code>stripTags: false</code>
            </td>
        </tr>
    </tbody>
</table>

## Getting all Errors
To get validation errors simply call the **asynchronous** `Validator.getErrors(fn)` method and provide a callback which gets called when all validations have been completed. The callback gets provided with an array containing all errors which resulted from the validation process.
Example:

```js
app.post('/register', function(res, res) {
    
    // ... Validation logic ... 
    
    /*
     * Call the "getErrors" method to start the validation
     */
    req.Validator.getErrors(function(errors){
        /*
         * ... Your further rendering logic. e.g. res.render('view', { errors: errors });
         */
    });
});    
```

## View Helpers
#### **Warning:** In order to these view helpers to work `Validator.getErrors()` has to be called before the rendering took place.
The local variable `Validator` is available in all express views.

```js

/**
 * Returns the sanitized value of <code>fieldName</code> which ran through all
 * filters (if any)
 */
Validator.getValue(fieldName)

/**
 * Returns all errors for this field as an array
 */
Validator.getFieldErrors(fieldName)

/**
 * Returns true if this field has any error. You can use this to give the
 * field a certain class if an error occured
 */
Validator.hasErrors(fieldName)
```

##### Jade Usage example
```

form(action='/login', method='post')
    div(class=Validator.hasError('username') ? 'has-error' : '')
        label(for='username')=Username
        input#username(type='text', name='username', value=Validator.getValue('username'))
        
    div(class=Validator.hasError('password') ? 'has-error' : '')
        label(for='password')=Password
        input#password(type='text', name='password', value=Validator.getValue('password'))

```

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

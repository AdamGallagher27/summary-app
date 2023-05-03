(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof reqqq&&reqqq;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof reqqq&&reqqq,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(reqqq,module,exports){

},{}],2:[function(reqqq,module,exports){
// shim for using process in browser
var process = module.exports = {};
var optiic

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],3:[function(reqqq,module,exports){
/* eslint-env browser */
module.exports = typeof self == 'object' ? self.FormData : window.FormData;

},{}],4:[function(reqqq,module,exports){
(function (global){(function (){
"use strict";

// ref: https://github.com/tc39/proposal-global
var getGlobal = function () {
	// the only reliable means to get the global object is
	// `Function('return this')()`
	// However, this causes CSP violations in Chrome apps.
	if (typeof self !== 'undefined') { return self; }
	if (typeof window !== 'undefined') { return window; }
	if (typeof global !== 'undefined') { return global; }
	throw new Error('unable to locate global object');
}

var globalObject = getGlobal();

module.exports = exports = globalObject.fetch;

// Needed for TypeScript and Webpack.
if (globalObject.fetch) {
	exports.default = globalObject.fetch.bind(globalObject);
}

exports.Headers = globalObject.Headers;
exports.Request = globalObject.Request;
exports.Response = globalObject.Response;

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],5:[function(reqqq,module,exports){
(function (process){(function (){
(function (root, factory) {
  // https://github.com/umdjs/umd/blob/master/templates/returnExports.js
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.returnExports = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {

  var fs;
  var NodeFormData;
  var nodeFetch;

  var environment = (Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]') ? 'node' : 'browser';
  var isRemoteURL = /^https?:\/\/|^\/\//i;
  var CONTENT_JSON = 'application/json';
  var SOURCE = 'library';
  var VERSION = '0.0.21';

  function Optiic(options) {
    options = options || {};
    options.environment = options.environment || environment;
    options.apiKey = options.apiKey || '';

    options.local = typeof options.local === 'undefined' ? false : options.local;

    if (options.local) {
      console.log('Optiic options', options);
    }

    this.options = options;

  };

  function _checkLocalPathString(input) {
    return typeof input === 'string' && !isRemoteURL.test(input);
  }

  function _checkInputElement(input) {
    return typeof input === 'object' && input.tagName === 'INPUT' && input.files && input.files[0];
  }

  function _isFileObject(input) {
    return !_checkInputElement(input) && typeof input === 'object' && typeof input.name === 'string';
  }

  function _isFormData(input) {
    return input && typeof input.append === 'function';
  }

  Optiic.prototype.process = function (options) {
    var This = this;
    var formData;
    var isFormData = _isFormData(options);
    var config = {
      method: 'POST',
      path: 'process'
    }

    if (!NodeFormData) {
      NodeFormData = This.options.environment === 'browser' ? window.FormData : reqqq('form-data');
    }
    if (!nodeFetch) {
      nodeFetch = This.options.environment === 'browser' ? window.fetch : reqqq('node-fetch');
    }

    if (!This.options.apiKey || This.options.apiKey.includes('test') || This.options.apiKey.includes('your_api')) {
      console.warn('You are not using an Optiic API Key. Please get one at https://optiic.dev/signup');
    }

    return new Promise(function(resolve, reject) {
      var isLocalPathString = _checkLocalPathString(options.url);
      var isInputElement = _checkInputElement(options.url);
      var isFileObject = _isFileObject(options.url);


      if (isFormData) {
        return This._request(config, options)
        .then(function (r) {
          return resolve(r);
        })
        .catch(function (e) {
          return reject(e);
        });
      }

      options = options || {};
      options.url = options.url || options.path || options.image || '';
      options.mode = options.mode || 'ocr';
      delete options.path;
      delete options.image;

      // Checks
      if (!options.url) {
        return reject(new Error('Missing parameter url'))
      } else if (typeof options.url !== 'string' && !isInputElement && !isFileObject) {
        return reject(new Error('Improperly formatted url or image input'))
      } else if (isLocalPathString && This.options.environment !== 'node') {
        return reject(new Error('This environment does not have permission to use a local path as the url so use a file input instead'))
      }

      if (isLocalPathString || isInputElement || isFileObject) {
        var keys = Object.keys(options);
        formData = new NodeFormData();
        if (This.options.environment === 'node') {
          fs = fs || reqqq('fs');
        }
        if (isLocalPathString) {
          formData.append('image', fs.createReadStream(options.url));
        } else if (isInputElement) {
          formData.append('image', This.options.environment === 'node' ? fs.createReadStream(options.url.files[0].path) : options.url.files[0]);
        } else if (isFileObject) {
          formData.append('image', This.options.environment === 'node' ? fs.createReadStream(options.url.path) : options.url);
        }
        for (var i = 0, l = keys.length; i < l; i++) {
          var key = keys[i];
          if (key === 'url' || key === 'image' || typeof options[key] === 'undefined') {
            continue;
          }
          formData.append(key, options[key]);
        }
        options = formData;
      }

      return This._request(config, options)
      .then(function (r) {
        return resolve(r);
      })
      .catch(function (e) {
        return reject(e);
      });

    });
  };

  Optiic.prototype._request = function (config, body) {
    var This = this;
    var method = (config.method || 'post').toLowerCase();
    var isForm = body && typeof body.append === 'function';
    var serverAddy;
    var headers = {
      'cache-control': 'no-cache',
      'Accept': CONTENT_JSON,
    }

    if (isForm) {
      body.append('apiKey', This.options.apiKey);
      body.append('_source', SOURCE);
      body.append('_version', VERSION);
      body.append('_referrer', getLocation());
    } else {
      headers['Content-Type'] = CONTENT_JSON;
      body.apiKey = This.options.apiKey;
      body._source = SOURCE;
      body._version = VERSION;
      body._referrer = getLocation();
      body = stringify(body);
    }

    return new Promise(function(resolve, reject) {

      if (This.options.local) {
        serverAddy = 'http://localhost:3000/' + config.path;
      } else {
        serverAddy = 'https://api.optiic.dev/' + config.path;
      }

      // Make request
      nodeFetch(serverAddy, {
        method: method,
        body: body,
        headers: headers,
      })
      .then(function (res) {
        if (This.options.local) {
          console.log('Fetch response:', res);
        }
        if (res.status >= 200 && res.status < 300) {
          res.json()
          .then(function (json) {
            return resolve(json);
          })
          .catch(function (e) {
            return reject(e);
          })
        } else {
          res.text()
          .then(function (text) {
            return reject(new Error(text || res.statusText));
          })
          .catch(function (e) {
            return reject(e);
          })
        }
      })
      .catch(function (e) {
        return reject(e);
      })
    });
  }

  function getLocation() {
    try {
      return window.location.href;
    } catch (e) {
      return null;
    }
  }

  function stringify(data) {
    try {
      data = JSON.stringify(data);
    } catch (e) {
    }
    return data;
  }

  // Reference
  if (environment === 'browser') {
    try {
      window.Optiic = Optiic;
    } catch (e) {
    }
  }

  return Optiic;

}));

}).call(this)}).call(this,reqqq('_process'))
},{"_process":2,"form-data":3,"fs":1,"node-fetch":4}],6:[function(reqqq,module,exports){
  optiic = reqqq('optiic')

},{"optiic":5}]},{},[6]);
module.exports = optiic

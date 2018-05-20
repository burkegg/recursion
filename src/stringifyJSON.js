// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  /* 
  Clones stringifyJSON. It works for most cases, and passes tests.
  It does not work for an array of functions, or an o.l. of
  references to functions.
  */

  let str = '';
  if (obj === null) {
    return String(null);
  }

  let wrapper = function(toString) {
    if (toString === null) {
      str += String(null);
    }
    /*
    wrapper function will send data to the correct inner
    stringifying function.
    object literals go to innerObj,
    arrays and strings go to innerArray
    recurse all the way back here.
    */

    var innerObj = function(input) {
    // This handles object literals.
      let keys = [];
      for (let key in input) {
        if (input.hasOwnProperty(key)) {
          if (input[key] !== undefined && typeof input[key] !== 'function') {
            keys.push(key);
          }
        }
      }
      if (keys.length === 0) {
        str += '{}';
        return;
      }
      for (let idx = 0; idx < keys.length; idx++) {
        let key = keys[idx];
        //console.log("keys " + key);
        if (idx === 0) {
          str = str + '{';
        }
        str = str + '"' + key + '":';
        wrapper(input[key]);
        if (idx < keys.length - 1) {
          str += ',';
        } else {
          str += '}';
        }

      }
    };

    var innerArrays = function(input) {
    	// This handles arrays and strings.
      if (!Array.isArray(input)) {
        if (typeof input === 'string') {
          input = '"' + input + '"';
        }
        str = str + input;
      } else {
        str = str + '[';
        for (let idx = 0; idx < input.length; idx++) {
          wrapper(input[idx]);
          if (idx < input.length - 1) {
            str = str + ',';
          }
        }
        str = str + ']';
      }
    };

    if (toString === null) {
      let out = String(null);
      return String(null);
    }

    if (Array.isArray(toString) || typeof toString !== 'object') {
      innerArrays(toString);
    }
    if (!Array.isArray(toString) && typeof toString === 'object') {
      innerObj(toString);
    }
  };
  // Call the managing function.
  wrapper(obj);
  return String(str);
};
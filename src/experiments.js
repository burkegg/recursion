var arraySum = function(array) {
  //console.log(array);
  let arr = array.slice();
  if (arr.length === 0) {
    return "";
  }
  let item = arr.shift();
  //console.log(item);
  //console.log('item popped: ' + item);
  if (Array.isArray(item)) {
    console.log(item + " item from inside " + typeof item);

    let tempString = "[" + arraySum(item) + arraySum(arr);
    return tempString + "]";
  } else {
    if (arr.length > 0) {
      console.log(arr);
      //console.log('failed array test with ' + item);
      return item.toString() + "," + arraySum(arr) + ",";
    } else {
      return item.toString() + arraySum(arr);
    }
  }
};

//console.log(arraySum(array1));
let f = function(array) {
  let myString = "[";
  if (array.length === 0) {
    return "";
  }
  if (!Array.isArray(array[0])) {
    myString += array[0].toString();
  } else {
    myString += "[" + f(array[0]) + "]";
  }
  for (let idx = 0; idx < array.length; idx++) {
    f(array[idx]);
  }
  return myString;
};

//let b = f(array1);
//console.log(b);
//let tempStr = "";
let func = function(input) {
  tempStr += "[";
  console.log(input);
  for (let idx = 0; idx < input.length; idx++) {
    if (Array.isArray(input[idx])) {
      console.log("inside test");
      let addon = func(input[idx]);
    } else {
      tempStr += input[idx].toString();
      if (idx < input.length - 1) {
        tempStr += ",";
      }
    }
  }
  // something here to detect whether it is the last thing?
  tempStr += "]";
  return tempStr;
};

//let array1 = [1, [2, 3], 4, [5, 6, [7, 8]]];
//let str = func(array1);
//console.log(tempStr);

//console.log(JSON.stringify(array1));

let outer = function(blah) {
  let str = "";

  let inner = function(input) {
    if (!Array.isArray(input)) {
      if (typeof input === "string") {
        input = "'" + input + "'";
      }
      str = str + input;
    } else {
      str = str + "[";
      for (let idx = 0; idx < input.length; idx++) {
        inner(input[idx]);
        if (idx < input.length - 1) {
          str = str + ",";
        }
      }
      str = str + "]";
    }
  };
  inner(blah);
  return str;
};

// Revising outer2 to work also with JSON notation.
// Make arrays and non-object types go through array.
// for JSON objects, get keys and
// for each key
//   add  {'key':
let outer2 = function(blah) {
  let str = "";

  let wrapper = function(toString) {
    // wrapper function will send data to the correct inner
    // stringifying function.
    // object literals go to innerObj,
    // arrays and non objects go to innerArray
    // recurse all the way back here.

//     var innerObj = function(input) {
//       for (let key in input) {
//         console.log("keys " + key);
//         str = str + "{'" + key + "':";
//         if (Array.isArray(input[key])) {
//           console.log("the value is an array");
//           str = str + innerArrays(input[key]);
//         }
//       }
//     };

    var innerArrays = function(input) {
      if (!Array.isArray(input)) {
        if (typeof input === "string") {
          input = "'" + input + "'";
        }
        str = str + input;
        //return;
      } else {
        str = str + "[";
        for (let idx = 0; idx < input.length; idx++) {
          wrapper(input[idx]);
          if (idx < input.length - 1) {
            str = str + ",";
          }
        }
        str = str + "]";
      }
      //return str;
    };

    if ((Array.isArray(toString)) || (typeof toString !== 'object')) {
      console.log("thingy: " + toString);
      innerArrays(toString);
    }
    if (!Array.isArray(toString) && typeof toString === "object") {
      innerObj(toString);
    }
  };
  wrapper(blah);
  return str;
};

//console.log(outer2("Hello world"));
//let a;
//console.log('results: ' + outer2([1, 2, {'x': 5}, 3, [4, 5, [7, 8]], 6]));
//console.log(outer2({x:[5]}))
console.log(outer2([5]));
// console.log(JSON.stringify([1, 2, 3, [4, 5, [7, 8]], 6]));
// console.log(outer2([[[['foo']]]]));
// console.log(JSON.stringify([[[['foo']]]]));
// console.log(outer2([1, 0, -1, -0.3, 0.3, 1343.32, 3345, 0.00011999999999999999]));
// console.log(JSON.stringify([1, 0, -1, -0.3, 0.3, 1343.32, 3345, 0.00011999999999999999]));
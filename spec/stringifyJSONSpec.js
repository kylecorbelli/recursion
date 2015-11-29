// test cases are described in fixtures.js
describe('stringifyJSON', function(){
  it('should match the result of calling JSON.stringify', function(){

    // Define 'stringifyJSON' function:
    var stringifyJSON = function(obj) {
        // Create string 'temp' that will eventually become the stringified object but with an extra, unwanted comma at the very end
        var temp;
        if (Array.isArray(obj)) { // Array
            temp = '[';
        } else if (obj === null) { // Null
            return 'null';
        } else if (obj === undefined) { // Undefined
            return 'undefined';
        } else if ((typeof obj === 'number') || (typeof obj === 'boolean')) { // Number, string, or boolean
            return obj.toString();
        } else if (typeof obj === 'string') { // String
            return '"' + obj + '"';
        } else { // Object
            temp = '{';
        }
        // Create 'val' for the key/value pairs to be added to the string 'temp'
        var val;
        for (var key in obj) {
            // Only add a key if 'obj' is an object... Arrays, functions and undefined values will not have a stated key
            if ((obj.length === undefined) && (typeof obj[key] !== 'function') && (obj[key] !== undefined)) { // Object
                temp += '"' + key + '":';
            }
            if ((typeof obj[key] === 'number') || (typeof obj[key] === 'boolean')) { // Number or boolean
                val = obj[key];
            } else if (obj[key] === null) { // Null
                val = 'null';
            } else if (obj[key] === undefined) { // Undefined
                // Do nothing
            } else if ((Array.isArray(obj[key])) || (obj[key].length === undefined)) { // Array or object
                val = stringifyJSON(obj[key]);
            } else { // String
                val = '"' + obj[key] + '"';
            }
            if ((obj[key] !== undefined) && (typeof obj[key] !== 'function')) {
                temp += val + ',';
            }
        }
        // Create 'output' string which is a copy of temp except for the final, unwanted comma
        var output = '';
        // If temp.length === 1, then there's nothing in it other than '[' or '{' and we don't need to worry about the final comma
        if (temp.length > 1) {
            for (var i = 0; i < (temp.length - 1); i++) {
                output += temp.charAt(i);
            }
        } else {
            output = temp;
        }
        if (Array.isArray(obj)) { // Array
            output += ']';
        } else { // Object
            output += '}';
        }
        return output;
    };

    stringifiableObjects.forEach(function(test){
      var expected = JSON.stringify(test);
      var result = stringifyJSON(test);
      expect(result).to.equal(expected);
    });

    unstringifiableValues.forEach(function(obj){
      var expected = JSON.stringify(obj);
      var result = stringifyJSON(obj);
      expect(result).to.equal(expected);
    });

  });
});

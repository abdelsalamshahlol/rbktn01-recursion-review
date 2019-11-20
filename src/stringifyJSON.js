// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function (obj) {
    var result = '';

    // Check the type of the input
    if (Array.isArray(obj)) {
        result += '[';
        return forArr(obj);
    } else if (typeof obj === 'object' && obj != null) {
        result += '{';
        return forObject(obj);
    } else if (typeof obj === 'boolean' || typeof obj === 'number' || obj === null) {
        return String(obj);
    } else if (typeof obj === 'string') {
        return '"' + obj + '"';
    } else {
        return undefined;
    }

    // Handle arrays
    function forArr(obj) {
        if (obj.length === 0) {
            return result + ']';
        }

        if (typeof (obj[0]) === 'string') {
            result += '"' + obj[0] + '"';
        } else if (Array.isArray(obj[0])) {
            result += stringifyJSON(obj[0]);
        } else if (typeof obj[0] === 'function') {
            result += 'null';
        } else if (typeof obj[0] === 'object') {
            // call forObject() method on the object
            result += forObject(obj[0]);
        } else {
            result += obj[0];
        }

        // If its not the last element add a comma
        if (obj.length > 1) {
            result += ',';
        }

        return forArr(obj.slice(1));
    }

    // Handle Objects
    function forObject(obj) {
        var arr = Object.entries(obj);
        var objResult = '{';

        // Inner function to process the data and append to the @param objResult
        function process(arr) {
            if (arr.length === 0) {
                return objResult + '}';
            }

            var key = '"' + arr[0][0] + '"';
            var val = arr[0][1];

            if (typeof val === 'string') {
                objResult += key + ':' + '"' + val + '"';
                if (arr.length > 1) {
                    objResult += ",";
                }
            } else if (typeof val === 'number' || typeof val === 'boolean' || val === null) {
                objResult += key + ':' + val;
                if (arr.length > 1) {
                    objResult += ",";
                }
            }// If its an nested Object or Array call yourself again 
            else if (typeof val === 'object') {
                objResult += key + ':' + stringifyJSON(val);
                if (arr.length > 1) {
                    objResult += ",";
                }
            } else if (Array.isArray(val)) {
                objResult += key + ':' + stringifyJSON(val);
            }

            return process(arr.slice(1));
        }

        return process(arr);
    }

    return result;
};
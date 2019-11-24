// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
console.clear()
var getElementsByClassName = function(className, elemnt) {
    elemnt = elemnt || document.body;
    var result = [];

    if(elemnt.classList && Array.from(elemnt.classList).includes(className)){
        result.push(elemnt);
    }

    Array.from(elemnt.childNodes).forEach(function(node) {
        result = result.concat( getElementsByClassName(className, node));
    });

    return result;

};
// console.log(getElementsByClassName('target'))

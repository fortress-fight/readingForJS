var text = 'cat, bat, sat, fat';
var pattern = /.at/;
var pattern1 = /.at/g;
var arr = text.match(pattern)
console.log(1);
console.log(arr); // [ 'cat', index: 0, input: 'cat, bat, sat, fat' ]
var arr2 = pattern.exec(text)
console.log(arr2); // [ 'cat', index: 0, input: 'cat, bat, sat, fat' ]
console.log(pattern1.exec(text)); // [ 'cat', index: 0, input: 'cat, bat, sat, fat' ]
console.log(text.match(pattern1)); // [ 'cat', 'bat', 'sat', 'fat' ]



//
// var text = 'this is a big ball';
// var pattern = /is/;
// var arr = text.search(pattern)
// console.log(arr); // 2
//

// ---------------replace
//
// // var text = 'this is a man';
// // var str = text.replace(' ', '-')
// // console.log(str); // this-is a man
// // console.log(text); // this is a man
//
// var text = 'this is a man';
// var pattern = / /g;
// var newStr = text.replace(pattern, '-')
// console.log(newStr); // this-is-a-man
//
// var text = 'app, black, call, desk';
// var pattern = /(b)/;
// console.log(text.replace(pattern, "$'-")); // app, lack, call, desk-lack, call, desk

// var text = 'app, black, call, desk';
// var pattern = /(b)/;
// console.log(text.replace(pattern, "$`-")); // app, app, -lack, call, desk
//
// var pattern = /(a)(p)/;
// var text = 'app, black, call, desk';
// console.log(1);
// console.log(text.replace(pattern, '$1')); // ap, black, call, desk

// var pattern = /(a)(p)/;
// var text = 'app,black,call,desk';
// console.log(1);
// var str = text.replace(pattern, function(){
//     console.log(arguments);
// })
// //{ '0': 'ap',
// // '1': 'a',
// // '2': 'p',
// // '3': 0,
// // '4': 'app,black,call,desk' }
// //
//
// var text = 'this.is.a.apple';
// var arr = text.split('is');
// console.log(arr); //[ 'th', '.', '.a.apple' ]
// console.log(text); //this.is.a.apple
// var pattern = /is/g;
// var newArr = text.split(pattern); //[ 'th', '.', '.a.apple' ]
// console.log(newArr);
//
// var newArr = text.split(pattern,2); //[ 'th', '.', '.a.apple' ]
// console.log(newArr); // [ 'th', '.' ]

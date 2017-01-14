// var re = /a(b(c)?)?/g;
// var str = 'abcdefg';
// var result = re.exec(str);
// console.log(result); //[ 'abc', 'bc', 'c', index: 0, input: 'abcdefg' ]

// var re = /a/g;
// var str = 'ab,abc,aba,ba';
// var result = re.exec(str);
// console.log(result); //[ 'a', index: 0, input: 'ab,abc,aba,ba' ]
// var result = re.exec(str);
// console.log(result); // [ 'a', index: 3, input: 'ab,abc,aba,ba' ]

// var re = /\d{3}-\d{3}/;
// var str = '000-000';
// console.log(re.test(str)); // true


var re = new RegExp('\\d', 'g');
var re1 = /\d/g;
var str = 123123;

console.log(re.exec(str)); // [ '1', index: 0, input: '123123' ]
console.log(re1.exec(str));// [ '1', index: 0, input: '123123' ]
console.log(re.toString()); // /\d/g
console.log(re1.toString()); // /\d/g
console.log(re.toLocaleString()); // /\d/g
console.log(re1.toLocaleString()); // /\d/g
console.log(re.valueOf()); // /\d/g
console.log(re1.valueOf()); // /\d/g

// var re = /((a)b)(c)d/g;
// var str = 'abcd';
// if (re.test(str)) {
//     console.log(RegExp.$1); // ab
//     console.log(RegExp.$2); // a
//     console.log(RegExp.$3); // c
// }

// var str = '6000￥';
// var re = /(\d+)+([$￥])/;
// console.log(str.match(re));
// var str1 = '11.1$';
// var re1 = /(\d+)(\.?)(\d)([$￥])/
// console.log(str1.match(re1)); // [ '11.1$', '11', '.', '1', '$', index: 0, input: '11.1$' ]
//
// var re2 = /(\d+)(?:\.?)(?:\d+)([￥$])$/
// console.log(str1.match(re2)); // [ '11.1$', '11', '$', index: 0, input: '11.1$' ]


// var re = /[0-9a-z]{2}(?=aa)/g;
// var str = "12332aa438aaf";
// console.log(str.match(re)); // [ '32', '38' ]
// var str1 = 'aaaaaaaaaa';
// console.log(str1.match(re)); //[ 'aa', 'aa', 'aa', 'aa' ]
//
// var re = /(?=hopeful)hope/;
// var str = 'hopefulhope';
// var str1 = 'hopehope';
// console.log(str.match(re)); // [ 'hope', index: 0, input: 'hopefulhope' ]
// console.log(str1.match(re)); // null

// var re = /[0-9a-z]{2}(?!aa)/g;
// var str =  "12332aa438aaf";
// console.log(str.match(re)); // [ '12', '33', '2a', 'a4', '8a', 'af' ]

var re = /(?<!aa)[0-9a-z]{2}/g;
var str =  "12332aa438aaf";
console.log(str.match(re)); // [ '12', '33', '2a', 'a4', '8a', 'af' ]

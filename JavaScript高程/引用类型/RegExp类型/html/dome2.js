var re = /(..)s/g;
var str = 'this is a ball';
console.log(str.match(re)); //[ 'his', ' is' ]
if (re.test(str)) {
    console.log(RegExp['$_']); // this is a ball
    console.log(RegExp.input); // this is a ball
    console.log(RegExp['$&']);
    console.log(RegExp.lastMatch); // his
    console.log(RegExp['$+']);
    console.log(RegExp.lastParen); // hi
    console.log(RegExp["$'"]);
    console.log(RegExp.rightContext); //  is a ball
    console.log(RegExp['$`']);
    console.log(RegExp.leftContext); // t
}

var re1 = /(.+)\?(.+)/;
var str1 = '12344?asdfasdf'
if (re1.test(str1)) {
    console.log(RegExp.$1); // 12344
    console.log(RegExp.$2); // asdfasdf
    console.log(RegExp.$3); // 空
}

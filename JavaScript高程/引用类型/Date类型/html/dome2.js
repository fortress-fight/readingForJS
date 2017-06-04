var date = Date.now()
console.log(date); // 1483885066833

var date1 = +new Date();
console.log(date1); // 1483885104527

var date2 = new Date();
var date3 = date2.getTime()
console.log(date3); // 1483885144445

var date4 = new Date() - 0;
console.log(date4); // 1483885178779

var date5 = new Date();
console.log(date5.toDateString()); // Sun Jan 08 2017
console.log(date5.toTimeString()); // 22:27:12 GMT+0800 (中国标准时间)
console.log(date5.toLocaleDateString()); // 2017-01-08
console.log(date5.toLocaleTimeString());  // 22:29:41
console.log(date5.toUTCString()); // Sun, 08 Jan 2017 14:30:54 GMT

console.log(date5.getFullYear());

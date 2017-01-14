var date = new Date()
console.log(date); // 2017-01-08T13:53:50.055Z

var date1 = new Date(12111111);
console.log(date1); //1970-01-01T03:21:51.111Z

var date2 = Date.parse('May 25, 2004')
console.log(date2); //1085414400000

var date3 = new Date('May 25 2004')
console.log(date3); //2004-05-24T16:00:00.000Z

var date4 = Date.UTC(2000, 1);
console.log(date4); // 949363200000
var date5 = new Date(date4)
console.log(date5); //2000-02-01T00:00:00.000Z

var date6 = new Date(1993, 9, 20)
console.log(date6); // 1993-10-19T16:00:00.000Z

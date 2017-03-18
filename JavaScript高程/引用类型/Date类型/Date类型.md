# Learn JavaScript

## Date类型

### 1.1 基础介绍

[DOME1](././html/dome1.js)

创建一个日期对象：

```js
var date = new Date()
console.log(date); // 2017-01-08T13:53:50.055Z
```

新建的日期对象会自动获取当期的日期和时间，如果想要获取指定的日期和时间就必须要传入表示该日期的毫秒数
（即：UTF时间1970年1月1日午夜起到该日期的毫秒数）,返回的时间都是基于本地时区而非 GMT 创建的；

```js
var date1 = new Date(12111111);
console.log(date1); //1970-01-01T03:21:51.111Z
```

当然如果每次都要计算毫秒数就十分复杂了，所以ECMAScript 提供了两个方法

Date.parse() || Date.UTC()

1) Date.parse()

```js
var date2 = Date.parse('May 25, 2004')
console.log(date2); //1085414400000
```

其实如果new Date 的时候传入的字符串，也会先经过Date.parse 转换后使用；

```js
var date3 = new Date('May 25 2004')
console.log(date3); //2004-05-24T16:00:00.000Z
```

但是 不同的地区或者是不同的浏览器对于字符串格式的要求也不同，不建议使用，如果遇到不能解析的字符串格式的时间会返回NaN；

2) Date.UTC()

返回相应日期的毫秒数

`Date.UTC(year: number, month: number, date: number, hour?: number, min?: number, sec?: number, ms?: number)`

注：

1. 月份是从0开始计算的，
2. 年份和月份是必须的，其余的没写则默认为0

```js
var date4 = Date.UTC(2000, 1);
console.log(date4); // 949363200000
var date5 = new Date(date4)
console.log(date5); //2000-02-01T00:00:00.000Z
```

同样在创建日期对象的时候也会调用这个方法；

```js
var date6 = new Date(1993, 9, 20)
console.log(date6); // 1993-10-19T16:00:00.000Z
```

### 1.2 时间戳

[DOME2](././html/dome2.js)

时间戳表示到UTF时间的毫秒数

```js
var date = Date.now()
console.log(date); // 1483885066833

var date1 = +new Date();
console.log(date1); // 1483885104527

var date2 = new Date();
var date3 = date2.getTime()
console.log(date3); // 1483885144445

var date4 = new Date() - 0;
console.log(date4); // 1483885178779
```

注：
Date.now() 仅仅支持IE9+ 以及标准浏览器

## 1.3 继承的方法

toLocaleString() || toString() || valueOf()

其中  toLocaleString 和 toString 都会返回一个表示时间的字符串，但是由于各个浏览器的差异性，并不能直接作为时间显示

valueOf() 返回当前事件的毫秒表示

## 1.4 日期格式化的方法

toDateString() -- 以特定的格式显示 周 月 日 年

```js
var date5 = new Date();
console.log(date5.toDateString()); // Sun Jan 08 2017
```

toTimeString() -- 以特定的格式显示 时 分 秒 和 时区
`console.log(date5.toTimeString()); // 22:27:12 GMT+0800 (中国标准时间)`

toLocaleDateString() -- 以特定于地区的格式显示 年月日
`console.log(date5.toLocaleDateString()); // 2017-01-08`

toLocaleTimeString() --  以特定于地区的格式显示 时 分 秒 和 时区
`console.log(date5.toLocaleTimeString());  // 22:29:41`

toUTCString() --以特定的格式显示完成的UTC时间
`console.log(date5.toUTCString()); // Sun, 08 Jan 2017 14:30:54 GMT`

## 1.5 日期对象的常用方法

getTime() setTime()
getFullYear() setFullYear
getMonth() setMonth()
getDate() setDate()
getDay() setDay()
getHours() setHours()
getMinutes() setMinutes()
getSeconds() setSeconds()

>注： 这里仅仅列出了一部分

# 引用类型
# 1 RegExp 类型
[DOME](././html/dome1.js)
## 1.1 RegExp 基本介绍

ECMAScript 中使用 RegExp 来支持正则

声明：
`var expression = /parttern/flags; `
`var re = new RegExp()`
parttern -- 模式（任意简单或者是复杂的正则表达式）
flags -- 标示（表明正则的行为）

flags:
>g -- 全局匹配
>i -- 不区分大小写
>m -- 多行匹配
标示可以组合使用

在正则表达使用，所有的元字符都必须转译，其中元字符包括：
`( [ { \ ^ $ | } ? * + . ] )`

## 1.2 RegExp 声明

创建一个正则对象有两种方法：
1. 字面量 `var re = /parttern/flags`
2. 正则表达式 `new RegExp(source: string, flags?: string)`

可以看到正则表达式中接受的是两个字符串，所以在正则表达式中，如果所有元字符都需要双重转译使用`\\`,
```
var re = new RegExp('\\d', 'g');
var re1 = /\d/g;
```

## 1.3 RegExp 实例属性：

global --- 布尔值， 表示是否设置了g
ignoreCase -- 布尔值，表示是否设置了 i
multiline -- 布尔值，表示是否设置了 m
lastIndex -- 整数，表示匹配的起始位置
source -- 字符串，表示正则表达式的字符串

这些属性没有什么意义，仅作了解

## 1.4 RegExp 实例方法

exec() || test()

### 1.4.1 exec()

`re.exec(input: string):[string]`

返回包含第一个匹配信息的数组，如果没有匹配的就返回null

```
var re = /a(b(c)?)?/g;
var str = 'abcdefg';
var result = re.exec(str);
console.log(result); //[ 'abc', 'bc', 'c', index: 0, input: 'abcdefg' ]
```
index -- 匹配项在字符串中的位置
input -- 表示应用于正则表达式的字符串

注： 对于exec 方法来说，即使是使用 全局表示，也只会返回一个值：
但是如果继续调用就会返回下一个值
```
var re = /a/g;
var str = 'ab,abc,aba,ba';
var result = re.exec(str);
console.log(result); //[ 'a', index: 0, input: 'ab,abc,aba,ba' ]
var result = re.exec(str);
console.log(result); // [ 'a', index: 3, input: 'ab,abc,aba,ba' ]
```

### 1.4.2 test()

`re.text(input:string):boolean`

只要匹配就返回真，

```
var re = /\d{3}-\d{3}/;
var str = '000-000';
console.log(re.test(str)); // true
```

## 1.5 继承方法

toString() || toLocalString() || valueof()

```
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
```

## 1.6 RegExp 构造函数属性

[DOME2](././html/dome2.js)
RegExp 构造函数包含了一些属性，返回最后一次正则表达式的相关信息；

1. input -- $_ -- 最近一次要匹配的字符串
```
var re = /(.)s/g;
var str = 'this is a ball';
if (re.test(str)) {
    console.log(RegExp['$_']);
    console.log(RegExp.input); // this is a ball
}
```
2. lastMatch -- $& -- 最近一次匹配项

`console.log(RegExp.lastMatch); // his`
`console.log(RegExp['$&']);`

3. lastParen -- $+ -- 最近一次的捕获组

`console.log(RegExp['$+']);`
`console.log(RegExp.lastParen); // hi`

4. rightContext -- $' -- lastMatch 之后的文本

`console.log(RegExp["$'"]);`
`console.log(RegExp.rightContext); //  is a ball`

5. leftContext -- $\` -- lastMatch 之前的文本

`console.log(RegExp['$`']);`
`console.log(RegExp.leftContext); // t`

6. $1 ~ $9

储存了第一道第九个捕获组

```
var re1 = /(.+)\?(.+)/;
var str1 = '12344?asdfasdf'
if (re1.test(str1)) {
    console.log(RegExp.$1); // 12344
    console.log(RegExp.$2); // asdfasdf
    console.log(RegExp.$3); // 空
}
```

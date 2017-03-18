# Learn JavaScript

## 引用类型

## 1. Function 类型

### 1.1 基本介绍

每一个函数都是对象（函数都是Function的实例），所以每一个函数都具有属性和方法；并且函数名是一个指向函数对象的指针并不会与某个函数绑定；

声明：

1. `function fn () {}`
2. `var fn = function (){}` --------- 函数表达式

>注：
如果直接写 `function (){}` 是会报错的
由于函数名仅仅是指向函数对象的指针，所以可以由多个函数名指向一个函数对象，并且他们之间不会互相影响；

### 1.1.2 没有重载

在函数声明中，后面的会覆盖前面的，所以不存在重复载入

### 1.1.3 函数声明与函数表达式

在解析器解析函数声明和函数表达式时，有着不一样的行为：

```js
fn1() // 1
fn2() // fn2 is not a function
function fn1() {
    console.log(1);
}
var fn2 = function(){
    console.log(2);
}
```

可以看做，在预解析的时候，将fn1 放在源代码数的顶端，所以可以访问到fn1；
在解析函数表达式的时候，会将`var fn2` 提升到源代码树的顶端，而只有在执行到 `var fn2 = function...`的时候，fn2 才会指向函数对象，所以开始的fn2 是undefined，无法执行；

#### 1.1.4 作为值的函数

由于函数本身就是对象，所以函数可以作为值进行传递；

### 1.2 函数的内部属性及方法

#### 1.2.1 arguments

在函数内部存在一个属性--arguments 其中包含了所有传入的参数，是一个类数组对象
在arguments 中还存在属性： callee

1) callee

`arguments.callee` 是一个指针，指向拥有这个 arguments 对象的函数；

```js
fn();
function fn (){
    console.log(arguments.callee); // [Function: fn]
}
```

这个属性就可以很好的解决递归的耦合问题

```js
function fn (num) {
    if (num<=1) {
        return 1;
    } else {
        return num * fn(num-1)
    }
}

console.log(fn(10)) // 3628800
```

在这里 fn 就不能轻易改名，函数名与函数本身就存在耦合

```js
function fn (num) {
    if (num<=1) {
        return 1;
    } else {
        return num * arguments.callee(num-1)
    }
}

console.log(fn(10)) // 3628800
```

#### 1.2.2 this

函数内部另一个特殊对象就是this，它引用的是函数的执行环境对象

```js
function fn (){
    console.log(this);
}
fn() // window

var obj = {
    fn: function (){
        console.log(this);
    }
}
obj.fn() // obj
```

#### 1.2.3 函数对象属性 caller

caller 中保存了当前函数的函数引用；

```js
function fn1() {
    fn2();
    console.log(fn1.caller); // [Function]
}
function fn2 (){
    console.log(fn2.caller); // fn1
}
```

注： 在严格模式下，fn.caller 和 arguments.callee 都会报错，并且如果对fn.caller赋值也会报错

#### 1.2.4 length

函数的length 属性，表示了函数希望接受命名参数的个数:

```js
function fn1 (){}
console.log(fn1.length); // 0

function fn2 (a,b){}
console.log(fn2.length); // 2
```

#### 1.2.5 prototype

对于ECMAScript 中的  prototype 是保存他们所有实例方法的属性，并且 prototype 不可枚举，所以不会出现在for in 中

#### 1.2.6 方法

1）两个非继承而来的方法：apply() call()
这两个方法都是在特定设置的作用域中调用函数，也就相当于设置函数体中的this对象的指向；

apply 和 call 的第一个参数都是其中运行函数的作用域；
apply 的第二个参数就是参数数组，可以是Array，也可以是arguments 对象：
而call 来说，除了第一个参数以外，其余参数都直接传递给函数；

```js
function sum(num1, num2) {
    console.log(this.name);
    return num1 + num2
}

function callSum1 (num1, num2) {
    return sum.apply(callSum1, arguments)
}

console.log(callSum1(10,20)); // callSum1 30
```

在 ES5 中还存在一种方法用于绑定作用域； bind();
这个方法会创建一个函数实例(注意：这里仅仅是创建而不是调用)，并且将this 绑定到传入的参数:
兼用：
IE9+ 以及 标准浏览器
对于不支持的浏览器可以模拟：

```js
function bind (obj){
    var target = [].shift.call(arguments)
    return function (){
        this.apply(target, arguments);
    }
}
var obj = {
    num: 11
};
function fn (num){
    console.log(this.num + num);
}
fn.bind(obj, 12)() // 23
```

2）三个继承而来的方法：toString() toLocalString() valueOf()

这三个方法始终返回的是函数的代码，不同的浏览器返回的形式可能不用

```js
function fn1() {
    console.log(1);
}
console.log(fn1.toString());
// function fn1() {
//     console.log(1);
// }
console.log(fn1.valueOf());
// [Function: fn1]
```

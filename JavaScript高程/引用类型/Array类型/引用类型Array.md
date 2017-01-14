
## 1.3 Array 类型
[DOME1](././html/dome.js)
### 1.3.1 基本介绍

ECMAScript 中，数组的每一项可以保存任何类型的数据，
Array 类型有5种声明方式
1. `var arr = []` ----- 字面量形式
2. `var arr = new Array()`
3. `var arr = new Array(size)` -------- 设定长度
4. `var arr = new Array('1', 'a' .....)`
5. `var arr = Array()`

>注：
> 在数组中，每一项之间以','隔开，最后一项不能有','

### 1.3.2 length 属性

数组的length 属性，表示了数组的长度；数组包含的`lenght - 1` 项的内容
值得注意的是，数组的length 属性可读可写

### 1.3.3 检测数组

检测方法：
1. instanceof()
2. Object.toString()
3. Array.isArray();

具体使用：
```
var arr = [1,2,3]
console.log(arr instanceof Array); // true
console.log(Object.prototype.toString.call(arr)); // [object Array]
console.log(Array.isArray(arr)); // true
```
> 注：其中Array.isArray()的方法虽然是ES5 中规定的，但是支持性不好： IE9以上，以及标准浏览器

### 1.3.4 转换方法

如前所述，所有对象都继承与Object，所有都具有以下方法：
1. toLocaleString()
2. toString()
3. valueOf()
4. join()

```
var arr = [1,2,3,4]
console.log(arr.toString()); //1,2,3,4
console.log(arr.toLocaleString()); //1,2,3,4
console.log(arr.valueOf()); //[ 1, 2, 3, 4 ]
```

>注：
> alert 在内部调用的就是 toString() 方法后，在对其处理

方法 join 可以实现与 toString() 相同的结果
join -- 返回一个数据中的每一项，以传入的字符作为连接符连接起来的字符串；
`arr.join(separator?: string):string`
如果没有传入值，或者是传入 `undefined` 就会以`,`作为连接符
但在IE7 以下的时候会以`undefined` 作为连接符

```
var arr = [1,2,3,4]
console.log(arr.join()); // 1,2,3,4
console.log(arr.join('@')); //1@2@3@4
```

### 1.3.5 栈方法
push || pop
栈 -- 一种数据结构
特点：
1. LIFO (last in first out)
2. 后入先出 --- 这个说法还是有意义的，表示了操作的是最后一个元素(但也不是说只能操作最后一个)
3. 进入栈叫做栈入，移出叫做 弹出
在ECMAScript 中为数组提供了两个类似栈行为的方法：push() pop();

1) push
push用于向数组中添加项：

`arr.push(newelt: ?):number`

1. 改变原数组
2. 返回改变后的数组长度
```
var arr = [1,2,3,4]
var l = arr.push('push')
console.log(arr); //[ 1, 2, 3, 4, 'push' ]
console.log(l); // 5
```

2) pop
pop 用于向数组中移出项

`arr.pop()`
1. 改变原数组
2. 没有参数
3. 返回被移出的项

```
var arr = [1,2,3,'pop'];
var v = arr.pop()
console.log(arr); //[ 1, 2, 3 ]
console.log(v); // pop
```

### 1.3.5 队列方法
堆 -- 一种数据结构
特点：
1. FIFO (first in first out)
2. 先入先出 --- 这个说法还是有意义的，表示了操作的是第一个元素(但也不是说只能操作第一个)
3. 进入堆叫做进入队列，移出叫做移出队列

在ECMAScript 中为数组提供了两个类似堆行为的方法：shift() unshift();

1) shift
用于移出数组中的第一项

`arr.shift()`
1. 改变原数组
2. 没有参数
3. 返回被移出的项

```
var arr = ['shift',1,2,3,4];
var o = arr.shift()
console.log(arr); // [ 1, 2, 3, 4 ]
console.log(o); // shift
```

2) unshift
用于移入数组中的第一项

`arr.unshift(newelt: ?):number`

1. 改变原数组
2. 返回数组在移入项后的长度
```
var arr = [1,2,3,4];
var n = arr.unshift('shift');
console.log(arr); //[ 'shift', 1, 2, 3, 4 ]
console.log(n); //5
```
>注：
> 在ie7 及以前 unshift 返回的是undefined 而不是长度

### 1.3.6 重排序方法

reverse() || sort()

1) reverse()
用于将数组项翻转

特点：
1. 无参数
2. 改变原数组，并且会改变后的数组，两个数组共用一个地址

```
var arr = [1,2,3,4,5];
var newArr = arr.reverse();
console.log(arr); //[ 5, 4, 3, 2, 1 ]
console.log(newArr); //[ 5, 4, 3, 2, 1 ]

newArr.shift();
console.log(arr); //[ 4, 3, 2, 1 ]
```

2) sort()

`arr.sort(compare?: fn(a: ?, b: ?) : number)`

基本使用：(没有参数)
特点：
1. sort() 方法按升序方式排序数组项

实现方法：
将数组中的每一项利用 toString() 的方法，转换成字符串后，再进行比较

```
var arr = [1,2,12,2,311,2,13]
arr.sort();
console.log(arr); // [ 1, 12, 13, 2, 2, 2, 311 ]
```

传入比较函数：
在使用比较函数的时候，这个比较函数会依次接受数组中的两个项，如果这个比较函数返回的是一个正数就将两个项的位置调换，如果返回的是一个负数或者是0，就不交换位置了

```
var arr = [1,2,32,12,12,11,0]
function compare (a, b) {
    console.log(a,b);
    return a-b;
}
arr.sort(compare);
console.log(arr); // [ 0, 1, 2, 11, 12, 12, 32 ]
```

### 1.3.7 操作方法

concat() || slice() || splice()

1) concat()
`arr.concat(other: [?]):array`
创建一个基于当前数组而创建的新数组数组，
特点：
1. 不会改变原数组
2. 返回新的数组

- 如果不传参数，仅仅就是创建了当前数组的一个副本
```
var arr = [1,2,3];
var s = 'newV';
var arr1 = ['a', 'b']
var newArr = arr.concat()
console.log(newArr); // [ 1, 2, 3 ]
newArr.pop();
console.log(newArr); // [ 1, 2]
console.log(arr); // [ 1, 2, 3 ]
```

- 如果传入的是一个或多个数组, 就会这些数组的每一项都添加到结果数组中

```
var newArr1 = arr.concat(arr1);
console.log(newArr1); //[ 1, 2, 3, 'a', 'b' ]
```

- 如果传入的是一个字符串

```
var newArr2 = arr.concat('other');
console.log(newArr2); //[ 1, 2, 3, 'other' ]
```

2） slice()
slice -- 基于当前数组中的一个或者是多个项创建一个新的数组
`arr.slice(from?: number, to?: number):array`

```
var arr = [1,2,3,4,5];
var newArr = arr.slice(2, 3);
console.log(newArr); // [3]
var newArr1 = arr.slice()
console.log(newArr1); //[ 1, 2, 3, 4, 5 ]
var newArr2 = arr.slice(4);
console.log(newArr2); // 5
var newArr3 = arr.slice(10);
console.log(newArr3); // []
var newArr4 = arr.slice(-1);
console.log(newArr4); //[ 5 ]
```

特点：
1. 返回的数组不包含结束位置的项
2. 如果没有参数就返回当前数组中的所有项
3. 如果只有起始位置，则结束位置默认为length
4. 如果没有的到满足要求的项，就返回空数组
5. slice 接受负数，使用数组长度加上该数可以得到确切位置
6. 不改变原数组

3) splice()

`arr.splice(pos: number, amount: number, newelt?: ?)`
pos -- 起始位置
amount -- 长度
newelt -- 新的值
特点：
1. 返回当前数组中被删除的项组成的数组
2. 修改原数组

splice 主要用于向数组中插入项：
可以用来：
1. 删除
2. 添加
3. 替换

删除：
```
var arr = [1,2,3,4,5];
var o = arr.splice(2,1);
console.log(o); // 3
console.log(arr); // [ 1, 2, 4, 5 ]
```

添加：
```
var arr = [1,2,3,4,5]
var o = arr.splice(3, 0, '添加');
console.log(o); //[]
console.log(arr); //[ 1, 2, 3, '添加', 4, 5 ]
```

替换；
```
var arr = [1,2,3,4,5];
var o = arr.splice(3, 2, '替换');
console.log(o); // [ 4, 5 ]
console.log(arr); // [ 1, 2, 3, '替换' ]
```

### 1.3.8 位置方法

indexOf() || lastIndexOf()
`arr.indexOf(elt: ?, from?: number)`
`arr.lastIndexOf(elt: ?, from?: number)`

```
var arr = [1,2,3];
var num = arr.indexOf(1,1);
console.log(num); // -1
var num1 = arr.indexOf(2,1);
console.log(num1); // 1
var num2 = arr.lastIndexOf(1, 1);
console.log(num2); // 0
```

>注：
如果找到就返回指定项的位置，如果没有找到就返回-1
在判断的时候，判断的是严格全等

### 1.3.9 迭代方法

every() || filter() || forEach() || map() || some()

特点：
1. 都有两个参数：1. 要在每一项运行的函数 2. 运行该函数的作用域对象
2. 传入函数都接受3个参数，1. 数组项的值， 2. 该项所在的位置， 3. 数组本身
3. 兼用性问题。IE9 以上和标准浏览器
4. 都不会改变原数组

以every为例：
`arr.every(test: fn(item: ?, index: number, array: Array) : bool, context?: ?)`
context -- 表示this
test -- 检测函数，返回一个bool

1）every() || some()

every: 对数组中的每一项运行给传入的函数，如果函数的每一项都返回true，则返回true，遇到false就结束循环，返回false
some: 对数组中的每一项运行给传入的函数，如果函数的有一项返回true，则返回true；

```
var arr = [1,2,3,4,5];
var re = arr.every(function(item, index, array){
    console.log(arguments); //{ '0': 1, '1': 0, '2': [ 1, 2, 3, 4, 5 ] }
    console.log(item); // 1
    console.log(index); // 0
    console.log(array); //[ 1, 2, 3, 4, 5 ]
});
console.log(arr); //[ 1, 2, 3, 4, 5 ]
console.log(re); // false
var re1 = arr.some(function(item){
    return item>4
});
console.log(re1); // true
```

2） filter()
对数组中的每一项进行过滤，返回该数组能返回true的项组成的数组
```
var arr = [1,2,3,4,5,6,7]

var re = arr.filter(function(item){
    return item > 4
});
console.log(re); // [ 5, 6, 7 ]
```

3） map()
对数组中的每一项进行运算，返回函数的结果组成的数组
```
var arr = [0,1,2,3,4,5,6];
var re = arr.map(function(item){
    return item +10;
});

console.log(re); // [ 10, 11, 12, 13, 14, 15, 16 ]
```

4） forEach()
仅仅执行函数，没有返回值；
```
var arr = [1,2,3,4,5];
arr.forEach(function(item, i){
    console.log([item, i]);
})
// [1, 0 ]
// [ 2, 1 ]
// [ 3, 2 ]
// [ 4, 3 ]
// [ 5, 4 ]
```

### 1.3.9 归并方法

reduce() || reduceRight()

两个方法相似只有一个是从左向右的循环，一个是从右向左的循环
兼容 IE9+ 和标准浏览器
以reduce为例：
`a.reduce(combine: fn(prev, next, index, array), init?: ?)`
将fn计算的结果与init（如果有）累加起来，并返回最终结果；

```
var a = [1,2,3,4,5];
var o = a.reduce(function (prev, next, index, array){
    console.log(prev + next); // 3 6 10 15
    return prev - next;
})

console.log(o); // 15
```

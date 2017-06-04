// var arr = [1,2,3]
// console.log(arr instanceof Array); // true
// console.log(Object.prototype.toString.call(arr)); // [object Array]
// console.log(Array.isArray(arr)); // tru

// ---------- 转换方法

// var arr = [1,2,3,4]
// console.log(arr.toString()); //1,2,3,4
// console.log(arr.toLocaleString()); //1,2,3,4
// console.log(arr.valueOf()); //[ 1, 2, 3, 4 ]

// -join

// var arr = [1,2,3,4]
// console.log(arr.join()); // 1,2,3,4
// console.log(arr.join('@')); //1@2@3@4
// arr.join(separator?: string)

// ---------栈方法
// var arr = [1,2,3,4]
// var l = arr.push('push')
// console.log(arr); //[ 1, 2, 3, 4, 'push' ]
// console.log(l); // 5

// var arr = [1,2,3,'pop'];
// var v = arr.pop()
// console.log(arr); //[ 1, 2, 3 ]
// console.log(v); // pop

// -----------队列方法
//
// var arr = ['shift',1,2,3,4];
// var o = arr.shift()
// console.log(arr); // [ 1, 2, 3, 4 ]
// console.log(o); // shift
//
// var arr = [1,2,3,4];
// var n = arr.unshift('shift');
// console.log(arr); //[ 'shift', 1, 2, 3, 4 ]
// console.log(n); //5

// ------------排序方法
//
// var arr = [1,2,3,4,5];
// var newArr = arr.reverse();
// console.log(arr); //[ 5, 4, 3, 2, 1 ]
// console.log(newArr); //[ 5, 4, 3, 2, 1 ]
//
// newArr.shift();
// console.log(arr); //[ 4, 3, 2, 1 ]

//
// var arr = [1,2,12,2,311,2,13]
// arr.sort();
// console.log(arr); // [ 1, 12, 13, 2, 2, 2, 311 ]

// var arr = [1,2,32,12,12,11,0]
// function compare (a, b) {
//     console.log(a,b);
//     return a-b;
// }
// arr.sort(compare);
// console.log(arr); // [ 0, 1, 2, 11, 12, 12, 32 ]

// ------------- 操作方法

// var arr = [1,2,3];
// var s = 'newV';
// var arr1 = ['a', 'b']
// var newArr = arr.concat()
// console.log(newArr); // [ 1, 2, 3 ]
// newArr.pop();
// console.log(newArr); // [ 1, 2]
// console.log(arr); // [ 1, 2, 3 ]
//
// var newArr1 = arr.concat(arr1);
// console.log(newArr1); //[ 1, 2, 3, 'a', 'b' ]
//
// var newArr2 = arr.concat('other');
// console.log(newArr2); //[ 1, 2, 3, 'other' ]

//
// var arr = [1,2,3,4,5];
// var newArr = arr.slice(2, 3);
// console.log(newArr); // [3]
// var newArr1 = arr.slice()
// console.log(newArr1); //[ 1, 2, 3, 4, 5 ]
// var newArr2 = arr.slice(4);
// console.log(newArr2); // 5
// var newArr3 = arr.slice(10);
// console.log(newArr3); // []
// var newArr4 = arr.slice(-1);
// console.log(newArr4); //[ 5 ]

// var arr = [1,2,3,4,5];
// var o = arr.splice(2,1);
// console.log(o); // 3
// console.log(arr); // [ 1, 2, 4, 5 ]

// var arr = [1,2,3,4,5]
// var o = arr.splice(3, 0, '添加');
// console.log(o); //[]
// console.log(arr); //[ 1, 2, 3, '添加', 4, 5 ]
//
// var arr = [1,2,3,4,5];
// var o = arr.splice(3, 2, '替换');
// console.log(o); // [ 4, 5 ]
// console.log(arr); // [ 1, 2, 3, '替换' ]

// var arr = [1,2,3];
// var num = arr.indexOf(1,1);
// console.log(num); // -1
// var num1 = arr.indexOf(2,1);
// console.log(num1); // 1
// var num2 = arr.lastIndexOf(1, 1);
// console.log(num2); // 0

// -------------迭代方法
//
// var arr = [1,2,3,4,5];
// var re = arr.every(function(item, index, array){
//     console.log(arguments); //{ '0': 1, '1': 0, '2': [ 1, 2, 3, 4, 5 ] }
//     console.log(item); // 1
//     console.log(index); // 0
//     console.log(array); //[ 1, 2, 3, 4, 5 ]
// });
// console.log(arr); //[ 1, 2, 3, 4, 5 ]
// console.log(re); // false
//
// var re1 = arr.some(function(item){
//     return item>4
// });
// console.log(re1); // true
//
// var arr = [1,2,3,4,5,6,7]
//
// var re = arr.filter(function(item){
//     return item > 4
// });
// console.log(re); // [ 5, 6, 7 ]
//
// var arr = [0,1,2,3,4,5,6];
// var re = arr.map(function(item){
//     return item +10;
// });
//
// console.log(re); // [ 10, 11, 12, 13, 14, 15, 16 ]
//
// var arr = [1,2,3,4,5];
// arr.forEach(function(item, i){
//     console.log([item, i]);
// })
// // [1, 0 ]
// // [ 2, 1 ]
// // [ 3, 2 ]
// // [ 4, 3 ]
// // [ 5, 4 ]

//  归并方法

var a = [1,2,3,4,5];
var o = a.reduce(function (prev, next, index, array){
    console.log(prev + next); // 3 6 10 15
    return prev - next;
})

console.log(o); // 15

// fn1() // 1
// fn2() // fn2 is not a function
// function fn1() {
//     console.log(1);
// }
// var fn2 = function(){
//     console.log(2);
// }

// fn();
// function fn (){
//     console.log(arguments.callee); // [Function: fn]
// }

// function fn (num) {
//     if (num<=1) {
//         return 1;
//     } else {
//         return num * fn(num-1)
//     }
// }
//
// console.log(fn(10)) // 3628800

// function fn (num) {
//     if (num<=1) {
//         return 1;
//     } else {
//         return num * arguments.callee(num-1)
//     }
// }
//
// console.log(fn(10)) // 3628800

//
// var obj = {
//     fn: function (){
//         console.log(this);
//     }
// }
// obj.fn() // obj


// function fn1() {
//     fn2();
//     console.log(fn1.caller); // [Function]
// }
// function fn2 (){
//     console.log(fn2.caller); // fn1
// }
// fn1()
//
// function fn1 (){}
// console.log(fn1.length); // 0
//
// function fn2 (a,b){}
// console.log(fn2.length); // 2

// function sum(num1, num2) {
//     console.log(this.name);
//     return num1 + num2
// }
//
// function callSum1 (num1, num2) {
//     return sum.apply(callSum1, arguments)
// }
//
// console.log(callSum1(10,20)); // callSum1 30


// function bind (obj){
//     var target = [].shift.call(arguments)
//     return function (){
//         this.apply(target, arguments);
//     }
// }
// var obj = {
//     num: 11
// };
// function fn (num){
//     console.log(this.num + num);
// }
// fn.bind(obj, 12)() // 23

function fn1() {
    console.log(1);
}
console.log(fn1.toString());
// function fn1() {
//     console.log(1);
// }
console.log(fn1.valueOf());
// [Function: fn1]

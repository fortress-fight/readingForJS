// var arr1 = [1,2,3]
// var arr2 = arr1;
// arr2.push('a');
// console.log(arr1); //[ 1, 2, 3, 'a' ]
// console.log(arr2); //[ 1, 2, 3, 'a' ]

// ------检测类型

var typeArr = [12, {}, 'a', null, undefined, true]
for (var i = 0; i < typeArr.length; i++) {
    // console.log(typeof typeArr[i]); //number object string object undefined boolean
    console.log(Object.prototype.toString.call(typeArr[i]));
    //[object Number] [object Object] [object String] [object Null] [object Undefined] [object Boolean]
}

console.log(typeArr[1] instanceof Object)  //true

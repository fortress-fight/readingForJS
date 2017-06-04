// var mi = Math.min(1,2,1,3,21,32);
// console.log(mi); // 1
// var mx = Math.max(1,2,1,23,123,12);
// console.log(mx); // 123
//
// var arr = [1,22,1,22,33,12]
// var mi2 = Math.min.apply(Math,arr)
// var mi3 = Math.max.apply(Math,arr)
// console.log(mi2); // 1
// console.log(mi3); // 33
//
function limitRandom (min, max){
    var l = max - min + 1;
    return Math.floor(Math.random() * l + min);
}

var num = limitRandom(10, 20)
console.log(num);
var color = ['red','black','yellow','blue'];
function arrRandom (arr) {
    return arr[limitRandom(0, arr.length-1)]
}
var colorR = arrRandom(color)
console.log(colorR);

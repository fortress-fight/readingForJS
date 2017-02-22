let Arr = [1,2,3,1,21,31,2];
//
// let singleArr = (arr) => {
//   let [...newArr] = new Set(arr);
//   return newArr;
// };
//
console.log(1);
var newArr = singleArr(Arr);
console.log(newArr);

function singleArr (arr) {
  var newArr = [];
  for (var i = 0; i < arr.length; i++) {
    if (newArr.indexOf(arr[i]) === -1) {
      newArr.push(arr[i])
    }
  }
  return newArr
}

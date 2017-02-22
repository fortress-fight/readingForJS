console.log(12)
// let deepCopy = (obj) => {
//   let newObj = Array.isArray(obj) ? [] : {};
//   for (item of Object.keys(obj)) {
//     if (typeof obj[item] === "object") {
//       newObj[item] = deepCopy(obj[item]);
//     } else {
//       newObj[item] = obj[item];
//     }
//   }
//   return newObj;
// }
console.log(2);
function deepCopy (obj) {
  if (typeof obj !== "object")  {
    return obj;
  };
  var type = Object.prototype.toString.call(obj);
  var newObj = type === "[object Array]" ? [] : {};
  for (var item in obj) {
    if (obj.hasOwnProperty(item)) {
      newObj[item] = deepCopy(obj[item]);
    }
  }
  return newObj;
}


var obj = {
  name: 'ff',
  age: '24'
}

let arr = [12,3,4,obj,[1]];
var newArr = deepCopy(arr);
newArr[3].job = "student";
newArr[4].push(12);
newArr.push(19);
console.log(arr);
console.log(newArr);

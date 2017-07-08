
// step1
var a = {};
console.log(typeof a); // object
console.log(a instanceof Object); // true
console.log(Object.prototype.toString.call(a)); // [object Object]

// step2
var b = function name(){console.log('hi');};
console.log(b instanceof Object); //true
b(); // hi
try {
    name(); // name is not defined
} catch (e) {
    console.log(e)
}

(function name1(){
    console.log('my name is name1');
})();

try {
    name1();
} catch (error) {
    console.log(error); //name1 is not defined
}

// step3

var c = function (a, b, c) {

};

console.log(c.length); // 3

// step4

function Animate (name){
    if (arguments[0] === 'inherit') return;
    this.name = name;
}

Animate.prototype.say = function (){
    console.log(this.name);
};

function AnimateSon (sonName){
    Animate.call(this, sonName);
}

AnimateSon.prototype = new Animate('inherit');

var getFn = new AnimateSon('ff');
getFn.say(); // ff

// step5

function Animate (name){
    this.name = name;
}

Animate.prototype.say = function (){
    console.log('ff');
};

function  emptyFn() {}

emptyFn.prototype = new Animate();
function AnimateSon (sonName){
}

AnimateSon.prototype = new emptyFn();

var getFn = new AnimateSon();
getFn.say(); // ff

// step6

{
    var a = {name: 'ff', age: '24'};
    for (var key in a) {
        if (a.hasOwnProperty(key)) {
            var element = a[key];
            
        }
    }

    var arr = Object.keys(a);
    console.log(arr); // ['name', 'age']
}

// step7

{
    var arr = ['a','b','c','d'];
    arr.forEach(function (v,i){
        console.log(v, i);
    });
}

{
    // 返回满足条件项的组成的数组
    var arr = [1,21,2,32];
    var newArr = arr.filter(function (v){
        return v > 10;
    });
    console.log(newArr); // [21, 32]
}

{
    // map -- 运行每一项，并将返回值组成数组
    var arr = [1,2,3];
    var newArr = arr.map(function (v){

        return v + 10;
    });
    console.log(arr, newArr);
}

// step7

{
    function Animate (){}
    function AnimateSon(){}

    Animate.prototype.say = function (){
        console.log('use proto');
    };

    AnimateSon.prototype.__proto__ = Animate.prototype;

    var a = new AnimateSon();
    a.say(); // use proto
}

// step8 
{
    var obj = function (){};

    obj.prototype.__defineGetter__('ago', function (){

        console.log('this fn is run')
        return 'time go on';
    });

    console.log(obj.ago)
}
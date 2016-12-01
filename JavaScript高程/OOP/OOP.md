# 面向对象的程序设计（JavaScript高程三）

## 1. 理解对象

<!-- 这里的内容比较枯燥，但是对于理解对象十分有利，那就耐着性子读下去吧 -->

创建自定义对象最简单的方法就是创建一个Object实例：

```
    var person = new Object();
    person.name = '小米';
    person.age = '29';
    person.job = 'student';
    person.sayName = function () {
        alert(this.name);
    }
```

对象字面量：

```
        var person = {
            name: '小米',
            age: '29',
            job: 'student',
            sayName: function () {
                alert(this.name);
            }
        }
        person.sayName();
```

两种方法创建的对象，的属性在创建的时候都带有一些特征值，JavaScript通过这些特征值定义他们的行为；

### 1.1 属性类型

数据属性 || 访问器属性
内部属性：是为了内部使用的属性，不能通过JavaScript直接访问，E5规定内部使用的属性使用[[]]包裹

1）定义数据属性
数据属性包含一个数据值的位置，在这个位置上可以读取和写入，共有4个描述其行为的特性；

[[Configurable]] || [[Enumerable]] || [[Writable]] || [[Value]]

-[[Configurable]] || adj. 可配置的；结构的
表示能否通过delete删除属性或者修改属性；
在对象中定义的属性中默认为true；

-[[Enumerable]] || adj. 可列举的；可点数的
表示是否能通过for-in循环返回属性；
在对象中定义的属性中默认为true；

-[[Writable]]
表示能否修改属性的值
在对象中定义的属性中默认为true；

-[[Value]]
包含这个属性的值；
读取属性值的时候，从这个位置上读取，写入属性的时候将新的值保存到该位置。
这个特性的默认值为-undefined

```
    /*[[Value]]*/
    var person = {
        name: "Jack"
    }
    /* 这里的创建了一个name的属性，属性值被设置成Jack，对属性值的任何修改，都将反映到该位置上 */
```

如果需要修改属性的默认特性，必须使用E5中的`Object.defineProperty()`，方法：

语法：
    `Object.defineProperty(属性所在对象，属性名，一个描述符对象)`
    注：描述符对象-- configurable、 enumerable、 writable、 value、可以通过对象的格式同时修改多个值（注意这里的都是小写）；
    而在调用defineProperty()这些值的默认值是false;

实例：

```
    /*[[Writable]]*/

    var person = {};
    Object.defineProperty(person, 'name', {
        writable: false,
        value: 'Jack'
    });

    alert(person.name); // Jack
    // person.name = 'P';

    delete person.name;

    alert(person.name); // Jack
```

configurable

```
        var person = {};

        Object.defineProperty(person, 'name', {
            value: 'Jack',
            configurable: false
        });

        alert(person.name) // Jack

        person.name = 'b';
        delete person.name;

        alert(person.name) // Jack

        Object.defineProperty(person, 'name', {
            configurable: true
        })

        person.name = 'b';

        alert(person.name); // Uncaught TypeError
```


1. configurable 设置为false的时候, 修改属性值时，在非严格的模式下会忽略，而在严格模式下会拋错；
2. 当 configurable 设置 false的时候，就不能再修改除writable外的特性；

2）定义访问器属性

getter 函数 || setter 函数

访问器属性不包含数据值，而是两个函数（不是必须的），当读取访问器属性的时候，会调用getter函数，由这个函数返回有效的值，而在写入的访问器属性的时候，会调用setter函数并且传入新的值，这个函数负责决定如何处理数据

访问器属性 具有下面4个特性

[[configurable]] || [[Enumerable]] || [[Get]] || [[Set]]

访问器属性不能直接定义，只能通过 `Object.defineProperty()`来定义，

[[Configurable]]
表示能否通过delete删除属性从而重新定义属性，能否修改属性的特性，
对于直接在对象上定义的属性，这个特性的默认值为true。

[[Enumerable]]
表示是否能够通过for-in循环返回属性；
对于直接在对象上定义的属性，这个特性的默认值为true。

[[Get]]
在读取的时候调用的函数，默认值为undefined

[[Set]]
在写入的时候调用的函数，默认值为undefined

实例：
get || set

```
    <script>
        var book = {
            _year: 2004,
            edition: 1
        };

        Object.defineProperty(book, 'year', {
            get: function () {
                return this._year + 1;
            },
            set: function (newValue) {
                if (newValue > 2004) {
                    this._year = newValue;
                    this.edition += newValue - 2004;
                }
            }
        });

        alert(book.year); // 2005

        book.year = 2010;
        alert(book.year); // 2011
        alert(book._year); // 2010
        alert(book.edition); // 7
    </script>
```

如果没有 get 则不能读取设置的属性，如果没有 set 则不能写入设置的属性；


>注：
1. 在ie9+（Ie8只实现了部分），和标准浏览器下才支持Object.definedProperty()方法
2. 在不支持 Object.defineProperty() 的浏览器中就不能修改configurable 和 enumerable

### 1.2 定义多个属性

Object.definePropertys()

```
    <script>
        var book = {
            _year: 2001
        };

        Object.defineProperties(book, {
            name: {
                value: 'name'
            },
            reader: {
                value: 'people'
            },
            year: {
                get: function () {
                    return this._year + 10;
                },
                set: function (value) {
                    this._year = value + 'set'; // 这里只能修改写在字面量里的属性，
                    this.name = value + '不能修改';
                    // 不能修改数据类型设定的属性
                }
            }
        });

        alert(book.name) // name
        alert(book.year) // 2011
        book.year = 100;
        alert(book.name) // name
        alert(book._year) //100set
    </script>
```


>注：
1. 在ie9+（Ie8只实现了部分），和标准浏览器下才支持Object.definedPropertys()方法

### 1.3 读取属性的特性

Object.getOwnPropertyDescriptor()

```
    <script>
        var book = {
            _year: 2001
        };

        // book

        var a = Object.getOwnPropertyDescriptor(book, '_year')
        console.log(a)
        /*
        learnOO_读取属性特性.html:16
        Object {value: 2001, writable: true, enumerable: true, configurable: true}configurable: trueenumerable: truevalue: 2001writable: true__proto__: Object
         */

         Object.defineProperties(book, {
            name: {
                value: 'book',
                writable: false,
                configurable: false,
                enumerable: false
            },
            color: {
                get: function () {
                    return 1
                },
                set: function(value){
                    this._year = value+'year'
                }
            }
         })

         alert(book.color) // 1
         book.color = 2;
         alert(book._year) // 2year

         var b = Object.getOwnPropertyDescriptor(book, 'name');
         console.log(b)
         /*
         Object {value: "book", writable: false, enumerable: false, configurable: false}
          */

         var  c = Object.getOwnPropertyDescriptor(book, 'color');
         console.log(c)
         /*
         Object {enumerable: false, configurable: false}configurable: falseenumerable: falseget: ()set: (value)__proto__: Object
          */
    </script>
```

## 2. 创建对象

虽然通过 `new Object` 和 字面量的方法都能够创建一个对象，但是使用同一个接口创建很多对象，就会产生大量重复的代码。

### 2.2 工厂模式

使用函数封装以特定结构创建的对象的细节

```
工厂模式.html
    <script>
        function createPearson (name) {
            var p = new Object();
            p.name = name;
            p.sayName = function () {
                alert(this.name)
            }
            return p;
        };

        var person1 = createPearson('小明');
        var person2 = createPearson('小包');

        person1.sayName();
        person2.sayName();

    </script>
```

这种方式可以，接受一个参数，然后返回一个带有属性和方法的对象；
工厂方式的缺点，是没有解决对象识别的问题，即怎样知道一个对象的类型，(因为这里你不知道是否是在创建对象，还是仅仅在调用函数，而构造函数模式可以通过 new 来识别)

### 2.2 构造函数模式

原生的构造函数： Function || Array || Object 等
除了原生的构造函数，还可以自定义构造函数：

```
learnOO_构造函数模式.html

    <script>

        function CreatePerson (name) {
            this.name = name;
            this.showName = function () {
                alert(this.name)
            }
        }

        var person1 = new CreatePerson('小白');
        var person2 = new CreatePerson('小黑');
        person1.showName()
        person2.showName()

    </script>
```

与工厂模式不同：
1. 没有显示的创建对象；
2. 直接将属性和方法赋值给了this对象；
3. 没有 return 语句；

按照惯例一个构造函数的函数名的首字母大写；
要创建一个Person的实例，需要使用 new 的操作符；

使用 new 会完成以下的行为：

1. 创建一个新对象；
2. 将构造函数的作用域给新的对象（因此this会指向这个新的对象）；
3. 执行构造函数中的代码（给这个新的对象添加属性）；
4. 返回新的对象；

---------
注：
1. 创建自定义的构造函数可以将它的实例标识为一种特定的类型，这一点优于工厂模式；

2. 构造函数都是函数，所以构造函数是function的实例；而作为实例就会沿着`__proto__`查找，作为构造函数就会具有prototype

3. 一般实例都是对象，所以沿着`__proto__`会查找到Object

注：所有的对象均继承自Object，所以person1 和 person2 也是Object的实例

举例：
var a = new Array;
a -> `__proto__` ->Array.prototype（走到这一步的时候，Array是作为构造函数存在的，所以先查看prototype） -> `__proto__` -> object.prototype
而
Array -- 这里查找的时候是作为实例查找的，所以是走`__proto__`_查找
Array —> `__proto__`->function.prototype




### 2.3 constructor

每一个实例下都会添加一个constructor属性，这个属性指向该实例的构造函数，但是可以被修改；

```
console.log(person1.constructor); // function CreatePerson(){};
console.log(person1.constructor == CreatePerson); // true;
```

对象的constructor属性是用于表示对象的类型的，但是由于constructor是可读可写的所以，对于检测对象类型来说不如instanceof操作符，而instanceof操作符在跨页面的检测中同样存在问题，所以不如toString操作符；

```
    alert(person1 instanceof CreatePerson); // true;
    alert(person1 instanceof Object) // true;
    alert(person1 instanceof Array) // false;
```

### 2.4 深入理解构造函数

1）将构造函数当做函数

构造函数同样也是函数，如果直接调用函数会发生什么？

```
    <script>
        function CreatePerson (name) {
            this.name = name;
            this.showName = function () {
                alert(this.name)
            }
        }
        var person1 = new CreatePerson('小白');
        person1.showName(); // 小白

        CreatePerson('小黑');
        window.showName() // 小黑

        var o = new Object();
        CreatePerson.call(o, '小黄')
        o.showName(); // 小黄

        console.log("address")
    </script>
```

这里说明了当不适用new 的时候，谁去调用this就指向谁，然后为这个this添加方法和属性

2）构造函数的问题

存在的问题：构造函数中每个方法都会在实例上重新创建一遍，也就是说同一个方法被创建了两次，造成了性能的浪费；

解释：

```
    <script>
        function CreatePerson (name) {
            this.name = name;
            this.showName = new Function (alert(this.name));
        }
        var person1 = new CreatePerson('小白');
        person1.showName(); // 小白

        var person2 = new CreatePerson('小黑');
        person2.showName() // 小黑
/*
    两次创建实例的时候，就创建了两个function的实例;
 */

        console.log("address")
    </script>
```

但是如果仅仅将这个函数一道构造函数外，又会污染全局，所以就要使用prototype；






























补充：
```
    <script>
        var a = [1,2,3]
        var b = a; // 猜测是将a挂在了b的原型连上了，当b找不到时，就找a，如果b找到了就不在找了
        b.push(4)
        console.log(a) // [1,2,3,4]
        console.log(b) // [1,2,3,4]

        var c = a;
        c = [4,5,6]; // 这里表示了新创建了一个实例，就和a没有关系了;
        console.log(c) // [4,5,6]

    </script>
```







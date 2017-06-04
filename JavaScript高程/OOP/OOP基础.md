# 面向对象的程序设计（JavaScript高程三）

面向对象是一种程序设计思想，而面向对象的语言中有一个表示，那就是它们都会具有类的概念，并且可以基于类创建任意多个具有相同属性和方法的对象；

JavaScript 比较特殊，在JavaScript中不存在真正的类的概念，对象都是通过的继承创建的，所以在js中的对象也是和其它基于类的语言中的对象是不同的；

## 1. 理解对象


### 1.1 什么是对象

在ECMA-262中对象是指一个无序属性的集合，其属性可以包含基本值、对象或者函数；通俗一点说，对象是由一些键值对组成的，其中值可以为数据或者方法

### 1.2 创建自定义对象

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

对应的对象字面量写法：

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

### 1.3 属性类型

<!-- 这里的内容比较枯燥，但是对于理解对象十分有利，那就耐着性子读下去吧 -->

这里是在ECMA5 中规定的；

数据属性 || 访问器属性
内部属性：是为了内部使用的属性，不能通过JavaScript直接访问，E5规定内部使用的属性使用[[]]包裹

#### 1.3.1 定义数据属性

数据属性包含一个数据值的位置，在这个位置上可以读取和写入，共有4个描述其行为的特性；

[[Configurable]] || [[Enumerable]] || [[Writable]] || [[Value]]

- [[Configurable]] || adj. 可配置的；结构的
表示能否通过delete删除属性或者修改属性；
在对象中定义的属性中默认为true；

- [[Enumerable]] || adj. 可列举的；可点数的
表示是否能通过for-in循环返回属性；
在对象中定义的属性中默认为true；

- [[Writable]]
表示能否修改属性的值
在对象中定义的属性中默认为true；

- [[Value]]
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

>注：
> 1. 在对象中定义 是指后来添加的属性，如： `var person = {} person.name = 'xiaobai'`、或者是 `var person = { name: 'xiaohei'}`
> 2. 而在调用defineProperty()这些值的默认值是false;

如果需要修改属性的默认特性，必须使用E5中的`Object.defineProperty()`，方法，来设置属性：

语法：
    `Object.defineProperty(属性所在对象，属性名，一个描述符对象)`

>注：
>1. 描述符对象的属性必须是 -- configurable、 enumerable、 writable、 value、中的；可以通过对象的格式同时修改多个值（注意这里的都是小写）；
>2. 在 IE8 之前支持，并且IE8的支持性并不好，所以建议不要在IE8中使用


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

```
    //configurable
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

#### 1.3.2 定义访问器属性

getter 函数 || setter 函数

访问器属性不包含数据值，而是两个函数（不是必须的），当读取访问器属性的时候，会调用getter函数，由这个函数返回有效的值，而在写入的访问器属性的时候，会调用setter函数并且传入新的值，这个函数负责决定如何处理数据

访问器属性 具有下面4个特性

[[Configurable]] || [[Enumerable]] || [[Get]] || [[Set]]

访问器属性不能直接定义，只能通过 `Object.defineProperty()`来定义，

- [[Configurable]]
表示能否通过delete删除属性从而重新定义属性，能否修改属性的特性，
对于直接在对象上定义的属性，这个特性的默认值为true。

- [[Enumerable]]
表示是否能够通过for-in循环返回属性；
对于直接在对象上定义的属性，这个特性的默认值为true。

- [[Get]]
在读取的时候调用的函数，默认值为undefined

- [[Set]]
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

如果没有 get 则不能读取设置的属性，如果没有 set 则不能写入设置的属性；(这里仅仅是指在访问属性下，如果在数据属性中，只要是writable为真，就可以写，只要存在value就可以读)


>注：
1. 在ie9+（Ie8只实现了部分），和标准浏览器下才支持Object.definedProperty()方法
2. 在不支持 Object.defineProperty() 的浏览器中就不能修改configurable 和 enumerable
3. 属性`_year`中的`_`只是作为一个标识符存在，表示这个属性是提供给访问器属性使用；

#### 1.3.3 定义多个属性

Object.defineProperties()

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

#### 1.3.4 读取属性的特性

`Object.getOwnPropertyDescriptor(obj, key)`, 用于取得给定属性的描述符,返回一个对象；

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

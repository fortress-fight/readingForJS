# 第一章 面向对象的JavaScript

JavaScript 中并没有类的概念，是通过原型委托的方式实现对象和对象之间的继承的；

## 1.1 动态类型语言

动态类型语言 || 静态类型语言

静态类型语言需要在编译时就要确定变量的类型，而动态类型语言适当变量赋予某个值的时候，才会具有某个属性；

JavaScript是一个典型的动态类型语言；

## 1.2 多态

解释：同一个操作指令，对于不同的对象，产生不同的反馈；

多态的主要思想是将 做什么 和 谁去做和怎样做 两种行为分离开；

实例：
```
1.2_多态.html
    <script>
        var say = function (animal) {
            if (animal instanceof Duck) {
                alert('duck')
            } else if (animal instanceof Chicken) {
                alert('chicken')
            }
        }

        var Duck = function () {};
        var Chicken = function () {};

        say (new Duck);
        say (new Chicken);
    </script>
```

这种行为就像是，找到每个对象然后告诉它需要干什么；

改进
```
    <script>
        var Duck = {
            say: function () {
                alert('Duck')
            }
        }
        var Chicken = {
            say: function () {
                alert('chicken')
            }
        };

        var makeSay = function (animal) {
            animal.say();
        }

        makeSay(Duck);
        makeSay(Chicken);

        console.log('adress')
    </script>
```

解释： 通过这种方式就完成了，无论是谁，只要我让叫就叫；

### 1.2.1 使用继承得到多态效果

使用继承是让对象实现多态的常用方法；继承分为： 实现继承 || 接口继承;

在JavaScript中，并不关心使用的变量是什么类型，只关心这个变量下有没有需要使用的方法或者属性；根据这个原理：
```
    var makeSay = function (animal) {
        animal.say();
    }
```
变成：
```
    var makeSay = function (animal) {
        if (typeof animal.say === 'function') {
            animal.say();
        }
    }
```

## 1.3 封装

封装的目的是将信息隐藏起来

### 1.3.1 封装数据

通过封装数据可以将内部数据隐藏起来，使外部域不能查找修改：
实例：
```
    <script>
        var myObj = (function () {
            var _name = 'obj';
            return {
                getName: function () {
                    alert(_name);
                }
            }
        })();
        alert(myObj._name); // undefined
        myObj.getName(); // obj
    </script>
```

在这个实例中，全局就不能访问_name 属性；
在E6 之前只能通过函数创建作用域；
E6： let

### 1.3.2 封装实现

通过封装实现，隐藏实现的过程；也就是说除了指定的API外，外部对象不能使用与这个对象有关的实现过程中的方法和属性；

### 1.3.3 封装类型

对于动态类型的JavaScript不存在类型的问题，所以暂不做了解

### 1.3.4 封装变化

封装变化即是找到变化并封装起来，即将容易发生变化的封装起来，将它和稳定的部分分开，这样修改容易变化的就方便很多，保证了程序的稳定性和可扩展性；

## 1.4 原型模式和基于原型的JavaScript对象系统

### 1.4.1 使用克隆的原型模式

从设计模式的角度说，原型模式就是创建对象的一种模式，主要实现方式就是，不关心对象类型而是找到一个对象，然后克隆出一样的对象，所以如果需要创建一个一样的对象，就可以使用原型模式；

```
    <script>
        var a = [1,2,4];
        var b = Object.create (a);
        console.log(b)
        /*
        Array[4]3: 5length: 4__proto__: Array[3]
        这一个就很奇怪了，push的5存在于自身上3:5，而其他的值使用过原型链找到的；
        看来是根据下标和值，在b上添加的
         */
        b.push(5);
        alert(b) // 1245
        alert(a) // 124
    </script>
```

补： Object create() E5 新增 如果不支持 使用下面的方法也可以支持；
```
    Object.create =  Object.create || function (obj) {
        var F = function () {}
        F.prototype = obj;
        return new F();
    }
```

### 1.4.2 克隆是创建对象的手段

原型模式的目的并不是创建一个一模一样的对象，而是一种创建独立某个类型对象的方法，而克隆就是这个方法的手段；

### 1.4.3 JavaScript的原型继承

对于原型编程都存在相似的基本规则

1. 所有数据都是对象
2. 要的到一个对象，并不是实例化类，而是找到一个对象作为原型并克隆他；
3. 对象会记住他的原型
4. 如果对象无法响应某个请求，他就把这个请求委托给他的构造函数的原型

1）所有数据都是对象：
在JavaScript中，这句话是有歧义的，除undefined外基本类型是通过包装对象的方式才能变成对象的类型处理，而其中undefined就不是对象;

但是JavaScript中的对象，是有根对象的，所有的对象都源于根对象；
JavaScript中的跟对象是 Object.prototype; 

```
    <script>
        var a = [];
        var b = {};
        alert(Object.getPrototypeOf(a) === Array.prototype) // true
        alert(Object.getPrototypeOf(Array) === Function.prototype) // true
        alert(Object.getPrototypeOf(Function) === Function.prototype) // true
        alert(Function instanceof Object) // true
        alert(Object.getPrototypeOf(b) === Object.prototype) // true
    </script>
```


2） 要的到一个对象，并不是实例化类，而是找到一个对象作为原型并克隆他；
在JavaScript中，操作符 new 就是在完成这个过程；

```
    <script>
        var create = function () {
            this.name = 'xiao';
        }
        create.prototype.sayName = function(){
            console.log(this.name)
        };
        var a = new create();
        console.log(a)
    </script>
```

`var a = new create();` 的过程实际上就是先找到Object.prototype -- （一个空对象） 克隆，然后执行构造函数的代码，为这个实例添加属性和方法；

模拟new

```
    <script>
        var create = function (name) {
            this.name = name;
        }
        create.prototype.sayName = function(){
            console.log(this.name)
        };
        function createObj () {
            var obj = new Object;
            Constructor = [].shift.call(arguments);
            obj.__proto__ = Constructor.prototype;
            var ret = Constructor.apply(obj, arguments);

            return typeof ret === 'object' ? ret : obj;
        }

        var a = createObj(create, 'xiao')
        a.sayName() //xiao
    </script>
```

3） 对象会记住他的原型

不是构造函数的对象身上没有原型，原型存在其构造函数身上

对象通过`__proto__`将请求委托给其构造函数的原型对象上

```
    <script>
        function create () {
            this.name = '';
        }
        var a = new create;

        alert(a.__proto__ === create.prototype) // true
    </script>
```

4） 如果对象无法响应某个请求，他就把这个请求委托给他的构造函数的原型

虽然所有的对象，最初都是由Object.prototype 对象克隆的但是，对象构造器的原型并不仅限于Object.prototype 上，而是可以动态的指向其他对象；

实例1：
```
    <script>
        var obj = {name: 'seven'}
        function create () {}
        create.prototype = obj;
        var a = new create;
        alert(a.name)
    </script>
```
实现过程：
首先在对象 a 下查找name，没有找到，
通过`__proto__`找到create的prototype而这里的prototype被设置成了对象obj；
在obj中找到name 返回

实例2：
```
    <script>
        var obj = {name: 'seven'}
        function A () {}
        A.prototype = obj;

        function B () {}
        B.prototype = new A();

        var a = new B();
        alert(a.name)
    </script>
```
实现过程：
首先在a下没有找到name，通过`__proto__`找到B.prototype即new A()创建出来的对象，依旧没有找到，继续委托给这个对象的`__proto__`，找到A.prototype而这里的prototype被设置成了对象obj；
在obj中找到name 返回

如果在中间对B修改prototype
```
    <script>
        var obj = {name: 'seven'}
        function A () {}
        A.prototype = obj;

        function B () {}
        B.prototype = new A();

        B.prototype.name = 'xiao'

        var a = new B();
        alert(a.name) // xiao

        var b = new A();
        alert(b.name) // seven
    </script>
```
实现过程：
首先在b中没有找到name，委托b的`__proto__`找到B.prototype即new A(),由于已经对B.prototype即new A()添加了一个 name ，那么到这里就找到了，返回

实例4：
```
    <script>
        var obj = {name: 'seven'}
        function A () {}
        A.prototype = obj;

        function B () {}
        B.prototype = A.prototype;

        B.prototype.name = 'xiao'

        var a = new B();
        alert(a.name) // xiao

        var b = new A();
        alert(b.name) // xiao
    </script>
```

实现过程：
首先在b中没有找到name，委托b的`__proto__`找到B.prototype即A.prototype,由于已经对B.prototype即A.prototype直接修改了 name ，那么无论是A的实例还是B的实例，name就都被修改了；

问题： 原型链有多长？

首先如果没有修改prototype 那么`__proto__`就会指向根对象--Object.prototype;根对象--Object.prototype为null，所以到这里，原型链的查找就结束了；

### 1.4.6 原型继承的未来

E5: create -- 比构造函数的创建对象还慢；通过create(null) 可以创建没有原型链的对象

E6: class -- 完全看不懂（待补充）

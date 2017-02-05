# 面向对象的程序设计（JavaScript高程三）

## 3. 继承

面向对象中，继承分为两种：接口继承 || 实现继承
JavaScript不存在接口，所以只能实现继承，即通过原型继承属性和方法

### 3.1 原型链

构造函数 原型 实例的关系：

每一个构造函数都有个原型对象，每一个原型对象都包含一个指向构造函数的指针，而实例都包含一个指向原型对象的内部指针；

如果将一个原型对象去等于另一个构造函数的实例，那么这个原型对象下就会多出一个指向另一个构造函数的原型对象指针，而在这个原型对象中，还存在指向其父级构造函数原型对象的指针，一层一层的向上查询，直到遇到prototype为空的对象即Object；

实例：

```
    <script>
        function SuperType () {
            this.property = true;
        }
        SuperType.prototype.getSuperValue = function(){
            return this.property;
        };

        function SubType () {
            this.subproperty = false;
        }

        SubType.prototype = new SuperType();

        SubType.prototype.getSubValue = function () {
            return this.Subproperty;
        }
        var instance = new SubType();
        alert(instance.getSuperValue()) // true
    </script>
```

实现过程：
首先会在instance（实例对象）中查找，没有找到，就通过其原型链找到其构造函数的原型对象，此时原型对象指向了一个实例对象，并且还添加了getSubValue的方法，所以这个原型对象下就包含了一个getSubValue的方法，以及一个指向SuperType的原型对象的指针，在这个原型对象中依旧没有找到getSuperValue方法，于是继续沿着原型链查找到SuperType的原型对象，最终在SuperType的原型对象下找到了getSuperValue方法，返回；

注意：
1. 这里由于getSubValue的原型对象指向了一个getSuperValue实例对象，所以constructor就是实例对象指针指向的getSuperValue的原型对象下的constructor，需要修正

2. 如果在SuperType的原型对象下没有找到getSuperValue方法，那么就会沿着SuperType的原型对象下的指向其构造函数Object的指针，找到Object；

```
    <script>
        function a () {
            this.name = 'xiao';
        }
        a.prototype.say = function(){
            alert(this.name)
        };
        var b = new a;

        alert(Function.prototype.isPrototypeOf(a)) // ture
        alert(Object.prototype.isPrototypeOf(a)) // ture
        alert(Object.prototype.isPrototypeOf(Function)) // ture
        alert(Function.prototype.isPrototypeOf(Object)) // ture
    </script>
```

从这里可以看到一个关系，所有的构造函数都是函数，但是所有的构造函数都是Object的
但是：
```
    alert(Object.prototype === Object.getPrototypeOf(Function)) // false
    alert(Object.prototype === Object.getPrototypeOf(Function.prototype)) // true
```

解释：
1. javascript中，“函数”（方法）也是对象。
2. 一切对象都有一个根源。它是Object.prototype。
根源之上再没有其他根源。Object.getPrototypeOf(Object.prototype)是null。js中除字面量以外的一切引用对象都来自这个“根源”对象。
3. 表达式Object.getPrototypeOf(Function) === Function.prototype的结果是真。这是Function特有的。实际上Function的prototype是一个内置函数，一切函数都派生自这个内置函数，这个内置函数是一个函数工厂。这个内置函数对象的prototype指向“根源”对象。
4. 表达式Object.prototype === Object.getPrototypeOf(Function.prototype)的结果是真。说明了Object跟Function二者之间的联系，是通过“根源”对象联系起来的。
function Object 其他函数 都是由系统的内置函数构成，而内置函数由根源对象构成

所以有时Function可能是指内置函数，Object可以说的是根源对象，才会有

```
    alert(Object.prototype.isPrototypeOf(Function)) // ture
    alert(Function.prototype.isPrototypeOf(Object)) // ture
```

unction和Object，既是函数，因为都可以Function()或者Object()这样的方式执行，又是对象，因为可以Function.a = 'a',Object.a = 'a'这样赋值。

说它们是函数，是因为他们都是通过上面第4条中说的”内置函数工厂“，派生出来的，因而具备函数的特性。

说他们是对象。是因为他们都是通过上面第1条中的”根源“对象，派生出来的，因此具备对象的特征。

继续说一下，Function.prototype指向”内置函数“。而Object.prototype指向”根源对象“。
因而new Function会产生一个匿名函数，而new Object产生一个plain object。

Object的原型链指针指向null；所以Object就是原型链的终点
`alert(Object.getPrototypeOf(Object.prototype))// null`

<img src="img/原型继承.png" alt="">


#### 3.1.1 确定原型和实例之间的关系

instanceof || isPrototypeOf()

instanceof
只要是检测实例与原型链中出现过的构造函数，就返回真
isPrototypeOf()
检测一个实例是不是由一个原型对象派生出来的，如果是就返回true

#### 3.1.2 谨慎定义方法

当子类型需要改变，或添加某个方法或者属性，一定要放在替换原型的语句之后;
否则会由于重写原型对象导致，添加无效；如果将一个原型对象替换成一个字面量对象，那么就会切断这个实例与其构造函数的原型对象的所有联系；

#### 3.1.3 原型链的问题

如果在原型链指向的原型对象中存在引用类型的变量，在继承时就会出现问题，
1. 对继承的子对象的改变会影响继承的父级对象；
2. 在创建子类型的实例的时候，不能像超类型（继承的父级）传递参数；

这是就需要借用构造函数了，

#### 3.1.4 组合继承

构造函数创建的实例，实例的属性会创建一个副本，这样改变副本就不会对父类产生影响，但是只使用构造函数创建实例，就会导致代码没有复用性。将构造函数和原型继承组合起来，就可以解决这两个问题；

实例：
```
    <script>
        function a () {
            this.num = [1,2,3];
        }
        a.prototype.say = function(){
            alert(this.num)
        };
        function b () {
            a.call(this);
        }
        b.prototype = new a();
        var c = new a;
        var d = new b;

        d.num.push(4);
        console.log(c.num) // 123
        console.log(d.num) // 1234
    </script>
```

借用构造函数传递参数
```
    <script>
        function a (name) {
            this.name = name;
            this.num = [1,2,3];
        }
        a.prototype.say = function(){
            alert(this.num)
        };
        function b (name) {
            a.call(this, name);
        }
        b.prototype = new a();
        var c = new b('c');
        var d = new a('d');

        console.log(c.name) // c
        console.log(d.name) // d
    </script>
```


这种组合式继承同样具有缺陷：
就是调用了两侧超类的构造函数--这时就要使用寄生组合式继承


### 3.2 原型式继承

```
    function object (o) {
        function F(){}
        F.prototype = o;
        return new F();
    }
```

创建一个新的构造函数，让构造函数指向实例，然后返回一个新的实例；这样就将原有对象的实例拷贝了一份

实例：
```
    <script>
        function object (o) {
            function F(){}
            F.prototype = o;
            return new F();
        }

        var a = [1,2,3,4]

        var b = object(a);
        b.push(8);

        alert(b) // 1.2.3.4.8
        alert(a) // 1.2.3.4
    </script>
```

但是包含引用类型值的属性始终都会共享相应的值，

在E5 中 Object.create() 规范了原型式继承；
可以传入两个参数，一个是要拷贝的对象，一个是要想这个对象中添加的属性；

### 3.3 寄生式继承

```
    <script>
        function object (o) {
            function F(){}
            F.prototype = o;
            return new F();
        }
        function createAnother (o) {
            var clone = object(o);
            clone.sayHi = function () {
                alert('hi')
            }
            return clone;
        }

        var a = [1,3,4]
        var b = createAnother(a);
        b.push(9);
        alert(b)
        alert(a)
    </script>
```

通过这种方式为对象添加方法，存在一个问题：代码不能复用

### 3.4 寄生组合式继承

```
    function object (superType) {
        function F () {};
        F.prototype = superType;
        return new F();
    }
    function inheritPrototype (subType, superType) {
        var prototype = object(superType.prototype);
        prototype.constructor = subType;
        subType.prototype = prototype;
    }
```

与书上有些出入，但是实验书本上并不能实现，其说的功能
应该是出现了误印；
实例：
```
    <script>
        function object (superType) {
            function F () {};
            F.prototype = superType;
            return new F();
        }
        function inheritPrototype (subType, superType) {
            var prototype = object(superType.prototype);
            prototype.constructor = subType;
            subType.prototype = prototype;
        }

        function a () {}
        a.prototype = {
          name: 9
        }

        function b () {}

        inheritPrototype(b, a)
        b.prototype.name = 12;
        var d = new a()
        var c = new b()

        alert(c.name) //12
        alert(d.name)//9

    </script>
```

补：
对象构造函数（Object）为给定值创建一个对象包装器。如果给定值是  null or undefined，将会创建并返回一个空对象，否则，将返回一个与给定值对应类型的对象。
当以非构造函数形式被调用时，Object 等同于 new Object()。

总结：原型式继承不需要预先定义构造函数的情况下，实现浅复制；
寄生式继承，基于对象创建一个对象，然后为这个对象添加方法属性，然后返回，就是将添加的行为封装起来，但是不符合复用的原则，
寄生组合式继承，集合寄生继承的优点 和 组合的优点，形成的一种继承的方法；



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

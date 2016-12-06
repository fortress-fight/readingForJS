# 第二章：this_call_apply

## 1. this
在JavaScript中this总是指向一个对象，具体指向那个对象是由函数执行环境动态绑定的，而不是在函数声明的时候确立的；

### 1.1 this的指向：

除去with 和 eval，this指向大概分为四种
1. 作为对象的方法调用
2. 作为普通函数调用
3. 构造器调用
4. Function.prototype.call || Function.prototype.apply 调用

#### 1.1.1 作为对象方法调用

作为对象方法调用指向该对象:

```
    <script>
        var create = {
            name: '小白',
            sayName: function () {
                alert(this.name);
            }
        }
        create.sayName(); // 小白；
    </script>
```

#### 1.1.2 作为普通对象使用
作为普通对象使用时，this指向window

```
    <script>
        function sayName () {
            alert(this);
        }
        sayName(); // window；
    </script>
```

#### 1.1.3 构造器调用

大部分函数都是构造器，区别在于是否使用了构造符 new 当使用 new 时，会返回一个对象，而this就指向这个对象，
可以这样理解：
当使用new的时候，首先会创造一个空对象，然后将构造函数的作用域交个这个对象，然后执行函数，最后返回这个对象；

```
    <script>
        function person () {
            this.name = '小白',
            this.sayName = function () {
                alert(this.name)
            }
        }
        var a = new person;
        a.sayName(); // 小白
    </script>
```

如果使用new的函数本身就存在返回值，如果这个返回值是对象类型，就返回这个，如果不是，就返回新创建的对象；

#### 1.1.4 Function.prototype.call || Function.prototype.apply 调用
通过Function.prototype.call || Function.prototype.apply 调用，会动态的改变this指向；

```
    <script>
        window.name = 'window';
        function person () {
            this.name = '小白',
            this.sayName = function () {
                console.log(this.name)
            }
        }
        var a = new person;
        a.sayName.call(window); // window
    </script>   
```

### 1.2 丢失的this；

分析：
`var get = document.getElementById;` 能不能通过get获取元素

不能：
首先get得到的是一个函数，如果通过get()的方式获取元素，这时this就不是document了而成为了window，这样就报错了；

如果想要实现就要借助apply改变this了

## 2. call和apply

### 2.1 call和apply的区别

call和apply使用仅仅是第二个参数不同，第一个参数就是修改后this的指向

apply 的第二个参数，可以是一个具有下标的集合，如：数组，类数组；
apply 通过将整个集合的元素作为参数传递给被调用的函数；

```
    <script>
        var fn = function (a, b, c) {
            alert([a, b, c])
        }
        fn.apply(null, [1,2,4]) // 1 2 4
    </script>
```

call 的参数可以有无限个，出第一个this指向的参数外，其余参数都会依次传入函数；

```
    <script>
        var fn = function (a, b, c) {
            alert([a, b, c])
        }
        fn.call(null, 1, 2, 4) // 1 2 4
    </script>
```

call 和 apply的第一个参数是null的时候，this就会指向去默认的对象；

当我们需要借用其它对象的方法的时候，就需要传入null代替某个具体的对象；

`alert(Math.max.apply(null, [1,312,12,56,34])) // 312`

### 2.2 call和apply的用途

1）改变this指向

```
    <script>
        document.onclick = function () {
            alert(this.nodeName) // document
            function fn () {
                alert (this.nodeName)
            }
            fn(); // undefined
        }
    </script>
```

修正：
`fn.call(this); // document`
主要是利用this来修正，让我眼前一亮；

2）Function.prototype.bind

目前低版本不支持bind函数，简单的可以这样实现：

```
    Function.prototype.bind = function(context) {
        var self = this;
        return function () {
            return self.apply(context, arguments)
        }
    }
```

完整的：

```
    Function.prototype.bind = function() {
        var context = [].shilf.call(arguments);
        var args = [].slice.call(arguments); // 将剩余的参数转换成数组；
        return function () {
            return self.apply(context, [].concat.call(args, [].slice.call(arguments)))
        }
    };
```

实例：

```
    <script>
        Function.prototype.bind = function() {
            var _this = this,
                context = [].shift.call(arguments),
                args = [].slice.call(arguments); // 将剩余的参数转换成数组；
            return function () {
                return _this.apply(context, [].concat.call(args, [].slice.call(arguments)))
            }
        };

        var obj = {
            name: '小白'
        };

        var fn = function (a, b, c, d) {
            alert(this.name); // 小白
            alert([a, b, c, d]) // 1,2,3,4
        }.bind(obj,1,2)
        fn(3,4);
    </script>
```

bind不会直接调用 而 call 和 apply会;

3）借用其它对象的方法

1. 首先在构造函数继承中就用到了call

2. 函数的arguments是一个类数组，我们常常会使用借用数组的方法，来对齐进行修改

比如：

```
    <script>
        ;(function(){
            Array.prototype.push.call(arguments, 3);
            console.log(arguments) // 1 2 3
            [].call(arguments, 3);
            console.log(arguments) // 1 2 3
        })(1,2);
    </script>
```

如果想转成真正的数组，可以使用`Array.prototype.slice`;

如果需要借用数组的方法，必须：
1. 具有可读写的length属性
2. 对象本身可以存储属性
（书上，是对V8 源码分析得到的，这里就不做叙述了）
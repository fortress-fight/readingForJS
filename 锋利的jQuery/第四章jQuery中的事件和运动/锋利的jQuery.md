# 第四章 jQuery中的事件和运动

## 1. 事件

### 1.1 DOM 加载

在jq中，$(document).ready() == $(function(){}), 是指当DOM加载完成后就执行，而 window.onload 就只能在页面中所有东西都加载完成后，才会执行；

window.onload 只能添加一种行为，添加多种的时候后面的会覆盖前面的；
如果需要在jq中onload 对应的是 load()方法；

注：当$()中没有参数的化，默认参数就是document

### 1.2 事件绑定

当文档加载完成后，如果需要对元素进行事件绑定，可以使用bind();

语法：
`bind(type[,data], fn)`

type -- 事件名
data -- 在ev对象上，会添加一个data属性，而这个参数会处理成ev中data属性的属性值；
fn -- 绑定函数

可以通过链式操作绑定多个事件；

事件绑定可以简写成：

`el.type(fn)`形式

### 1.3 合成事件

补： is() --- 如果具有就是真 例如 ： is(':check')

hover() || toggle()

1) hover()

语法：
`hover(enter, leaver)`;

hover()中是通过 mouseenter 和 mouseleaver 实现的

2) toggle()

注：
1.9版本 .toggle(function, function, … ) 方法删除,jQuery Migrate（迁移）插件可以恢复此功能。 表现在如果写入的是fn，speed和easing就会走默认值，也就是先动画在函数

功能1：
toggle() ：如果元素是课件的就隐藏，如果是隐藏的就显示

功能2：
`toggle([speed], [easing ], [fn ])`
speed: 隐藏/显示 效果的速度。默认是 "0"毫秒。可能的值：slow，normal，fast。"
easing:(Optional) 用来指定切换效果，默认是"swing"，可用参数"linear"
fn:在动画完成时执行的函数，每个元素执行一次。

### 1.4 事件对象

在jq中事件对象，就是事件绑定程序中的第一个参数

1）停止冒泡：
`ev.stopPropagation()`

2）阻止默认事件：
`ev.preventDefault()`

3）1 和 2 同可以通过 return false 来完成;

jq中不存在事件捕获

### 1.5 事件对象属性

jq中的事件对象对常用原生的事件对象进行了封装，所以ev使用的是jq对象，只不过很想原生ev而已，并且对这些方法做了兼用处理

1） event.type -- 事件类型

2） event.preventDefault();

3） event.stopPropagation();

4） event.target;

5） event.relatedTarget; 相当于ev.formElement || ev.toElement

6） event.pageX || event.pageY

7） event.which --- 使用鼠标时 返回1.2.3，使用键盘时返回keyCode；

8） metaKey -- ctrl按键

9） ev.originalEvent -- 原生的事件对象，但是在jQ的ev中可以直接使用原生的东西

### 1.6 事件解绑

jq中的事件都是通过事件绑定的形式处理的；

unbind()

语法：
unbind([type],[data])

如果不写参数，就取消所有绑定的事件

type -- 事件类型
data -- 函数名

one()
和bind 类似，通过one绑定的行为，在执行一次后就立马销毁


### 1.7 模拟操作

trigger()

1) 功能1：常用模拟
通过trigger(type)可以模拟出，type的事件；
如：trigger('click')

2) 功能2：触发自定义事件
trigger不仅仅可以触发系统事件，还可以触发自定义事件

3) 功能3：传递参数
trigger还可以接收第二个参数（数组的形式），作为事件执行中的参数，

4) 功能4：执行默认行为
通过trigger的方式触发的行为，同时也会触发浏览器的默认行为
通过 triggerHandler() 的方式可以解决

### 1.8 其他用法

1) 同时绑定多个事件类型

bind('mousedown mouseleaver', function(){})

2) 添加事件命名空间，便于管理--就是通过type.name的方式对时间起了个名字，这样bind就可以管理匿名函数了

例：
$('div').bind('click.plu'. function(){})
$('div').bind('click.son'. function(){})
$('div').unbind('click.plu')

## 2. jQuery中的动画

### 2.1 show() || hide()

如果不传参数的话，仅仅是display none || block || ...;

如果传入一个时间，那么就是执行变化的时间，变化的有透明度，宽，高
注：
show() || hide() 会记录原先的display类型；

如果传入的是一个字符串，那么就是指运动形式，目前有：normal || slow || fast

### 2.2 fadeIn() || fadeOut()

只改变透明度，知道display：none||....

### 2.3 slideUp() || slideDown()

只改变元素宽高

### 2.4 自定义动画

animate()

语法：
`animate(params[, speed][, callback])`

params--一个包含属性和值的映射

1) 自定义简单动画：

`$('div').animate({left:'500px',top:'500px'},3000)`

2) 累加、累减动画

`$('div').animate({left:'+=500px',top:'500px'},3000)`

`left:'+=500px'`
这种形式是表示在当前的基础上，再加上个500px

3) 多重对象

a) 同时执行多个函数
`$('div').animate({left:'+=500px',top:'500px'},3000)`

b) 按顺序执行多个函数
```
$('div').animate({left:'+=500px')
         .animate({top:'500px'},3000)
```


其实可以理解成，将这些动画放到了一个队列中进行管理

### 2.5 动画的回调函数

首先：回调函数 适用于jq中所有的动画效果中

`$('div').animate({left:'+=500px',top:'500px'},3000,function(){})`

### 2.6 停止动画和判断是否处于动画

1）停止动画 -- stop()

语法：
stop([clearQueue],[gotoEnd])

[clearQueue] -- 是否清除未执行的动画队列 true || fasle;
[gotoEnd] -- 是否直接将正在执行的动画跳转到它的末尾

如果直接使用stop() 就会直接结束当前正在进行的动画，并且立即进入执行队列中的下一个动画

如果想让它当前运动立即停止，不执行下一个动画，就设置[clearQueue]为true
如果想让它当前运动立即停止，并且状态也要执行到当前动画的最终状态；就设置[gotoEnd]为true；

2）判断是否处于运动状态
使用is(':animated');

3）延迟：
delay()
```
$('div').animate({left:'+=500px'})
        .delay(3000)
        .animate({top:'500px'},3000)
```

注： delay不仅仅是可以延迟动画队列，也可以用于自定义队列上

### 2.7 其他动画方法

toggle() || slideToggle() || fadeTo() || fadeToggle()
toggle()相当于show 和hide结合

fadeTo(speed,opacity[,callback])

动画的属性值可以为特殊值：show || hide || toggle

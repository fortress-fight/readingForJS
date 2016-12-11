# jQueryDOM操作

## 1.1 基础

一般来说 DOM操作分成3类：
DOM Core || DOM HTML || DOM CSS

## 1.2 jQuery 中的DOM操作

### 1.2.1 查找节点

1) 查找元素节点

通过选择器获取


2) 查找属性节点

attr()
语法：
attr('attr'[,'value'])

attr 是指属性名，一个参数是获取，两个参数是设置

### 1.2.2 创建节点


在jq中通过$()来创建节点

语法：
$(html)

可以使用以下方式创建节点：

`$("<p></p>") || $('<p>')`

可以在创建元素节点的同时，插入文本节点和属性节点；

```
    var $p = $('<p class="attrNode">' + $('ul li:eq(0)').attr('title'));
    $p.appendTo($('ul li:eq(0)'));
```

注：
`$("<p></p>")` 可以在标签内部输入内容，而`$('<p>')`中只能识别`<p>` 后面的内用会被省略；

### 1.2.3 插入节点

如果是单独创建节点其实是没有什么意义的，如果需要对节点进行操作，就必须将创建的节点插入的DOM中；可以传入一个字符串类型的节点如`<div></div>`

append() || appendTo() || prepend() || prependTo() || after() || insertAfter() || before() || insertBefore

其中append() || appendTo() || prepend() || prependTo()
都是在元素内部添加：
append() || prepend() 都是向匹配到的元素中插入
appendTo() || prependTo() 都是讲匹配到的to到别的节点里，
两个的差别主要是在与链式操作中，谁为主；

`$('ul li:odd').after($('<span>after</span>'))`

after() || insertAfter() || before() || insertBefore()
都是在元素的外部添加；
after() || before()
是在每一个匹配的元素上操作
insertAfter() || insertBefore()
是将匹配到的元素insert到背的节点上

### 1.2.4 删除节点

remove() || detach() || empty()

1) remove()
`$('ul li:first').remove();`

这个删除是将节点从DOM中删除，但会返回一个包含删除节点的引入，也说明了，删除的节点并没有完全消失，并且被删除的节点上的绑定事件也会得到保留；

remove([filter]);

remove中可以传入一个用于筛选的条件；
`$('ul li').remove('li[class=attr]')`

2)detach()

detach() 和 remove() 的作用和使用方法相似，只不过通过detach删除的元素其身上绑定的事件也会消失

3)empty()
empty()是删除节点下面的所以后代元素
`$('ul li:last-child').empty();`
empty下没有参数

### 1.2.5 复制节点

clone(true | false)

true：连同功能一起复制；
默认false

### 1.2.6 替换节点

replaceWith() || replaceAll();

`$('div span').replaceWith('<strong>这里是替换后</strong>')`


replaceWith() || replaceAll() 同样也是先后顺序不同

`$('<strong>这里是替换后</strong>').replaceAll('div span');`

### 1.2.7 包裹节点

wrap() || wrapAll() || wrapInner()

wrap() 将每一个选中的节点外都包裹一个元素；
`$('div span').wrap('<p></p>');`

warpAll() 是在所有的选中的节点的最外层包裹一层
`$('div span').wrapAll('<p></p>');`

wrapInner() 是将元素内部用一层元素包裹起来
`$('div span').wrapInner('<strong></strong>')`

### 1.2.8 属性操作

attr() || removeAttr();

### 1.2.9 样式操作

这里的样式操作主要是指class的操作：

通过attr() || removeAttr() 可以对class进行简单的操作

追加class: addClass();

移出class: removeClass();

切换样式：toggle():

toggle语法：
toggle([fn1 | fn2])

toggle 如果没有传入参数，就会将隐藏的元素显示，而将显示的元素隐藏；
```
    $('ul').click(function () {
        $('div').toggle()
    })
```
toggle 如果传入参数，显示和隐藏会变成运动的形式，然后在执行后执行对应的函数；

```
    $('ul').click(function () {
        $('div').toggle(function () {
            alert('fn1')
        }, function () {
            alert('fn2')
        })
    })
```


切换class:
toggleClass('className');

当元素存在这个class的时候，就去除，如果不存在就添加

判断是否含有传入的className

hasClass() 判断是否含有传入的className,如果存在返回true 否则 返回false；

### 1.2.10 设置HTML 、 文本 和 值

html() || text() || val()

html() 类似于innerHTML, 可读可写
在html中也可以通过html的字符串`<li>asd</li>`创建节点，但是如果只输入一边`<li>asdfasd`会帮你自动补全并且不会忽略后面的内容,如果在后面继续插入标签就只能写在一行，就不能做到拼接；
text() 是针对文本的操作, 可读可写
val() 是针对表单的value属性，可读可写
val() 如果写入或获取的时候是多个，那么就是数组格式

补充：原生中有个defaultValue属性，用于存放默认的value值

### 1.2.11 遍历节点

1）children() 获取左右的子元素不包括后代元素

2）next() 下一个兄弟元素

3）prev() 上一个兄弟元素

4）siblings() 所有的兄弟节点

5）closest() 从当前元素(包括当前元素)向上查找要匹配的元素，如果匹配就返回

6）parent() || parents()

parent() 找父级
parents() 找到所有祖先元素

7） find() || fliter() || nextAll() || nextUtile()

find() 得到满足条件的后代元素
fliter() 筛选出与指定表达式匹配的元素集合。
nextAll()查找当前元素之后所有的同辈元素。
nextUtile()两个参数，从 第一个元素开始到第二个元素结束   

### 1.2.12 css DOM 操作：

1） css() 读写；

可以接受一个字符串参数：`css('attr')` 获取样式的值，这个样式你写什么就是什么，无论是在内部外部还是行间都能获取；

接受两个字符串参数：`css('attr', 'value')` 设置

接受一个对象参数：`css({'attr': 'value','attr': 'value'})`可以同时设置多个参数

注：
如果value是数字格式，自动转成像素值；

2）height() || width() 可读可写
不传参数可以得到计算后的样式，如果传入的是一个数字，则会转成像素值，可以输入其他类型的单位；

3） offset()

获取距离当前窗口的距离，返回一个对象，对象下有两个属性 top||left

4）position()

获取到定位父级的距离，同样返回一个对象，对象下有两个属性top||left

5）scrollTop() || scrollLeft()

可读可写无需单位





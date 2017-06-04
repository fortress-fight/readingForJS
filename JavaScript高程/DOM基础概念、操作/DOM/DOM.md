# DOM笔记

## 1. DOM -- Document Object Model

简介:
    DOM
    文档对象模型 -- 主要为js操作页面提供及接口；
    DOM将整个文档看成一个DOM树，同时定义了很多能够操作页面的方法；

## 2.



## 3 与节点位置相关的属性（以及nodeType  || attributes）

nodeType || attributes || childNodes || children || firstChild || firstElementChild || lastChild || lastElementChild || nextSibling || nextElementSibling || previousSibling || previousElementSibling || parentNode || offsetParent

### 3-1 节点类型--nodeType
在DOM树中，每一个元素都是一个节点；而通过nodeType判断节点类型；

语法：
    `element.nodeType`

返回值：
    一个代表节点类型的数值，共有9种，其中常用的有 1 -- 元素节点、2 -- 属性节点、3 -- 文本节点、8 -- 注释节点、9 -- 文档节点（document）


### 3-2 childNodes
只读属性

语法：
    `element.childNodes`

返回值：
    子节点的列表__集合__

注意：
    1. 在标准中。childNodes包含元素节点和文本节点，在非标准下只包含元素节点，如果需要使用childNodes就要进行判断类型；
    2. childNodes -- 只包含下一级的子节点，而不包含以后的；
    3. IE7及以下的浏览器，不会包含非法嵌套的节点，但是标准浏览器会；
    4. 由于存在较多的兼容问题不建议使用，建议使用children

### 3-3 attributes

只读属性

语法：
    `element.attributes`
返回值：
    一个包含元素行间属性的列表集合，每一项中包含对象，对象下有两个key值，一个name一个value；

### 3-4 children
只读属性

语法
    `element.children`

返回值：
    一个子节点的列表集合，只包含元素节点；

### 3-5 firstChild
只读属性

语法：
    `element.firstChild`

返回值：
    元素下的第一个节点，在标准中会识别文本节点；

### 3-6 firstElementChild
只读属性

语法：
    `element.firstElementChild`

返回值：
    返回元素下面的第一个元素节点

注：
    由于不支持非标准浏览器，要使用的时候需要做兼容处理
```
//需要注意的是，当元素无子节点的时候，就会获取文本节点，所以最保险的是使用children
    var first = element.firstElementChild || element.firstChild;

```

### 3-6 lastChild
只读属性

语法：
    `element.lastChild`

返回值：
    返回元素子节点中的最后一个；

### 3-7 lastElementChild
只读属性

语法：
    `element.lastElementChild`

返回值：
    返回元素子节点中的最后一个元素节点；

注：存在firstElementChild相同的问题；

### 3-8 nextSibling  || nextElementSibing

下一个兄弟节点

### 3-9 previousSibling  || previousElementSibing

上一个兄弟节点

### 3-10 parentNode

父节点

### 3-11 offsetParent

当前元素的父节点

返回值：
    返回距离当前元素最近的有定位属性的父级节点，如果无定位父级指向body；

注：
    问题1. 在IE7及以下的，当无定义父级指向HTML;
    问题2. 在IE7及以下的，若当前元素的某个父级元素触发了haslayout就指向该元素

## 4. 与尺寸相关属性

offsetTop || offsetLeft || offsetWidth || offsetHeight || clientLeft || clientTop || clientWidth || clientHeight

### 4-1 offset[Top || Left || Width || Height]

1）top || left
当前元素距离其定位父级之间的尺寸，如果没有定位父级就指向HTML；

2）width || height
返回当前元素的站位宽--不带单位
站位宽： width + padding + border

### 4-2 client[Width || Height || Left || Top]

1）top || left

元素的border宽度

2）width || height

元素的可视宽 -- width + padding（不带单位）；


## 5. getPos的封装；

```
    function getPos (obj) {
            var pos = {
                left: 0,
                top: 0
            }
            while (obj){
                pos.left += obj.offsetLeft;
                pos.top += obj.offsetTop;
                obj = obj.offsetParent;
            }
            return pos;
        }
```

## 6. 对元素属性的操作
. || [] || getAttribute || setAttribute || removeAttribute

方式1：
    '.'操作；--后面跟属性名
    '[]'操作；--接受的是一个字符串，或者是一个字符串类型的变量

方式2：
    1）方法一：getAttribute;
        简介：
            得到元素的指定的属性的值；
        语法：
            `element.getAttribute(attributeName)`
        返回值：
            以字符串的形式返回该属性名下的属性值；
    2）方法二：setAttribute
        简介：
            给元素设置属性值和属性名
        语法：
            `element.setAttribute(attrName,attrValue)`
        无返回值
    3）方法三：removeAttribute
        简介：
            移除指定元素的指定属性
        语法：
            `element.removeAttribute`
        无返回值；

>注：
1. 两种方式的差异表现在，通过方式一添加的属性并没有真正的放在元素的身上，而方式二是；-- 可能说的有偏差，待矫正；
2. 通过方式一设置的属性不能通过方式二得到，对于方式二同样；
3. 使用方式一获取到的路径是绝对路径，而使用方式二获取的路径是写的什么就是什么（IE8及以上和标准）

## 7. 动态创建/添加元素

createElement || appendChild || insertBefore || replaceChild || removeChild

创建：document.createElement(标签名)

由于创建的节点，独立于文档树之外，如果想显示在页面中，就需要使用以下方法：

方法1：
    parEle.appendChild(newNode);
    在指定的节点下面添加节点；

方法2：
    parEle.insetBefore(newNode, childNode)
    在childNode前面添加newNode节点

>注：在IE浏览器中如果没有childNode参数，就会报错，但是在标准浏览器下就会将使用appendChild的方法添加newNode，需要做兼容处理

如果想在DOM中删除某一个节点可以使用：

方法3：
  # #div2 {
            width: 200px;
            height: 200px;
            background: #fb3;
            position: absolute;
            top: 100px;
            left: 100px;
        }   parNode.removeChild(childNode);
    该方法返回删除的节点;

如果想在DOM中替换某一个节点可以使用：

方法4：
    parNode.replaceChild(newNode, childNode);
    该方法会返回被替换的节点

## 8. getElementsByClassName 的封装

## 9. 表单的操作

### 9-1 获取一个表单，只需要先找到这个表单所在的form然后通过表单的name获取：

例：
```
    <body>
        <form action="" id="form">
            <input type="text" name="username">
        </form>

        <script>
            var form = document.getElementById('form');
            console.log(form.username) // form.username 就是username的input
        </script>
    </body>
```

### 9-2 表单的事件

1）input
change -- 当input失去焦点的时候, 判断input的value 是否发生变化，如果变化就触发；

不同的表单类型触发方式不同：
    1. text 是当光标移开的时候触发；
    2. radio 只要发生改变就触发，在非标准下，光标移开触发；
    3. checkbox -- 和radio相同
    4. select 选中就触发；

oninput -- 一旦input的内容发生改变就触发

focus -- 当表单得到焦点的时候触发
blur -- 当表单失去焦点的时候触发

2）form
事件： 
    1. submit -- 当表单提交的时候触发
    2. reset -- 当表单重置的时候触发

方法：
    1. submit()
    2. reset();
    3. focus();
    4. blur();

## 10. 表单的操作

获取：
    tHead
    tBodies
    tFoot
    rows
    cells


    
+属性：
1.document.documentElement.scrollTop;
2.document.documentElement.clientWidth||clientHeight;
3.document.documentElement.scrollHeight;
4.document.documentElement.offsetHeight[offsetWidth];
+方法：
1.document.documentElement.onscroll;
2.document.documentElement.onresize;



## 文档的宽高以及窗口事件

###1. 窗口尺寸：

窗口的可视区域：-- 即HTML的可视区域(不包含滚动条)--基于client相关参数
`document.documentElement.clientHeight`
`document.documentElement.clientWidth`
无兼容的问题
返回当前打开窗口的可视区域的尺寸(不带单位)


实例：
<a href="窗口的可视区域尺寸.html" target="\_blank">可视区域</a>

>注：
1. 这里返回的仅是窗口尺寸，当内容超出了，仍然显示的是所看到的窗口尺寸(不包括滚动条)
2. 在非ie的浏览器中html的高度只由内容撑开，但是document.documentElement.clientHeight，仍然获得了整个窗口的尺寸；对html设置overflow:hidden;也是一窗口为基准剪裁？？？
3. `document.documentElement.clientHeight`在获取的高度小于可视区域的高度，就获取的是可视区域的高度
4. clientLeft || clientTop 都是指边框高度；

###2. 窗口滚动条相关尺寸 -- HTML上滚动条相关尺寸

####1)滚动条距离顶部的距离--基于scrollTop
scrollTop语法：`el.scrollTop` 类似的还有`scrollLeft`

`document.documentElement.scrollTop`

>注：chrome会认为滚动条不在HTML上而是在body上,所以在chrome中获取滚动条的距离应该使用`document.body.scrollTop`,所以需要做兼容;

```
var scrollT = document.documentElement.scrollTop || document.body.scrollTop
//在chrome 下document.documentElement.scrollTop为0；就会走document.body.scrollTop
```

实例：
<a href="窗口滚动条相关尺寸-scrollTop.html" target="\_black">scrollTop</a>

####2)窗口内容高度：-- 基于scrollHeight --
scrollHeight语法: `el.scrollHeight` -- 元素的内容高度
这里的计算规则是：从el的上边界border内开始计算，一直计算到内容范围的最低部；
就是该窗口下移动滚动条能看到的范围的高度；

`document.documentElement.scrollHeight`

实例：
<a href="窗口滚动条相关尺寸-scrollHeight.html" target="\_black">scrollHeight</a>

>注：
1. 即使overflow:hidden; 也会不会影响将整个内容区域纳入计算范围内；
2. 由于chrome中滚动条是在body身上所以`document.body.scrollHeight `body的高度小于可视区域的高度，就获取的是可视区域的高度; 而在其他浏览器中, 滚动条是在html身上所以`document.documentElement.scrollHeight `html的高度小于可视区域的高度，就获取的是可视区域的高度; 而在其他浏览器中,

####3)文档高度：-- 基于offsetHeight
offsetHeight语法: `el.offsetHeight`

`document.documentElement.offsetHeight`

获取的是自身的高度

实例：
<a href="窗口滚动条相关尺寸-offset.html" target="\_black">scrollHeight</a>

>注：
1. 在ie下如果内容高度没有可视区高那么文档高度就是可视区高度，(ie下html当小于窗口高度时就等于窗口高度,但是body是由内容撑开，而在标准浏览器下html和body都是由内容撑开)所以要获得内容高使用`document.body.offsetHeight`更加准确;


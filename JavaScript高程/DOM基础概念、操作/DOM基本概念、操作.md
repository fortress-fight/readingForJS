#DOM -- document Object Model
#文档对象模型(API)

DOM是针对HTML和XML文档的一个API(应用程序编程接口)。
>document: html页面;
文档对象: 页面中的元素;
目的: 为了能让程序(js)去添加、移除和修改页面中的某一部分;

##DOM树

在dom中，可以将文档看成dom树；
文档节点：文档节点是每个文档的根节点；
文档元素：文档元素是文档的最外层元素--每个文档只有一个文档元素；
根据dom树，将文档节点分为：
>子节点
祖先节点
兄弟节点

在dom中定义了很多方法和一些相关属性来操作dom树种的节点(元素)。

补充：
1. 由于id具有唯一性，在dom中可以直接使用，不需要先获取，但是不建议这样做；
2. 非标准中不会包含非法嵌套的子节点，但是在标准下，会包含非法嵌套的子节点，但不建议这样做；

##节点关系：
关系指针都是只读的

nodeType || ownerDocument || nodeName || nodeValue || childNodes || attributes || children || attributes || firstChild || lastChild || firstElementChild || lastElementChild || previousSibling || nextSibing || nextElementSibing || previousElementSibing || parentNode

###属性1：`nodeType`
- 只读

语法：`元素.nodeType`
含义：当前元素的节点类型；

通过**nodeType**可以dom节点划分成12种类型；

比较重要的有

1. 元素节点[所有标签] -- 1；
2. 属性节点 -- 2；
3. 文本节点 -- 3；
8. 注释节点 -- 8；
9. document -- 9；

注：
1. 文本节点：纯文字、空格、空白文本、制表符都是文本节点；
2. 在IE浏览器中只能将读到的节点类型与数字比较，而不能将两个节点类型直接比较。

###属性2：`ownerDocument`

该属性指向表示整个文档的文档节点。


###属性3 `nodeName`和 `nodeValue`获取节点名和节点值

由于这两个属性是针对元素的所以在使用前要确保使用它的对象是一个元素节点；

###方法：`hasChildNodes()`

所有的节点都有的：当节点包含子节点时会返回true

###属性4: `childNodes`
- 只读

语法：`元素.childNodes`
含义：子节点列表集合(nodeList),nodeList是一种类数组；

补充：
通过`childNodes`获取的`nodeList`是随着DOM结构动态执行查询的结果，因此DOM中的变化量能自动反映在NodeList对象中。但是NodeList.length却是在第一次访问NodeList时获取；



说明：
1. `childNodes`在标准下包含所有节点，而在非标准下只包含元素节点(所以在使用`childNodes`时要使用判断)；
2. `childNodes`只能包含其下一级的子节点，而不包含超过一级的后辈子孙节点；
3. 每一个节点都有`childNodes`属性；


###属性5：`attributes`
- 只读

语法：`元素.attributes`
含义：获得元素属性列表集合


###属性6：`children`
- 只读
- 非标准属性，但是所有浏览器都支持

语法：`元素.children`
含义：获得元素下的元素节点的列表集合

说明：
`children`和`childNodes`十分相似，但是只会识别元素节点。

- 子节点和兄弟节点的操作

###属性7：`firstChild` || `lastChild`
- 只读
- 在标准下包含文本节点

语法：`元素.firstChild`
含义：获得元素下的第一子节点；

说明：找不到的返回null；

###属性8：`firstElementChild` || `lastElementChild`
- 只读
- 非标准属性，存在兼容问题--不支持非标准浏览器

语法：`元素.firstElementChild`
含义：获得元素下的第一元素节点；


###属性9：`nextSibling` || `previousSibling`
- 只读

语法：`元素.nextSibing`
含义：获得元素的兄弟节点；

说明：找不到的返回null；

###属性10：`nextElementSibling` || `previousElementSibling`
- 只读
- 非标准属性，存在兼容问题--不支持非标准浏览器

语法：`元素.nextElementSibling`
含义：获得元素的兄弟节点中的元素节点；


- 父节点

###属性11：`parentNode`
- 只读
- 无兼容的问题
- 找不到返回**null**

语法：`元素.parentNode`
含义：获得元素的父级节点，指向上找一级；

说明：在dom中整个文档的最大父级是document



##节点操作
##插入节点的方法：
> appendChild();
> insetBefore();
> replaceNode();

###方法1：`appendChild()`

方法：`appendChild()`
用于向`childNodes`列表的末尾添加一个节点。

说明：
- 如果传入到appendChild()中的节点已经是文档中的一部分了，那结果就是将该元素节点从原来的位置移动到新的位置上。因此在调用appendChild()的时候传入的是父节点的第一个子节点，那么该节点就会成为父级的最后一个节点，实现第一个节点和最后一个节点交换位置的效果。


###方法2：`insetBefore()`
如果需要把节点放在childNodes列表中的某个特定位置上，可以使用insertBefore()。

语法：节点.insetBefore(newNode,target);
参数：
newNode--要插入的节点；
target--目标节点；

说明：
将newNode变成target的前一个同胞元素，如果target为null，newNode将会成为父节点下唯一的一个子节点。
具有和appendChild一样的特性，若是在文档中存在......

##移出节点的方法

>replaceNode()
>removeChild()

###方法3：replaceNode()

将目标节点从文档树中移出并返回，同时将新节点放到删除节点的位置；

语法：parentNode.replaceNode(newNode,target)
参数：
parentNode -- 父级节点；
newNode--要插入的节点；
target--目标节点；

说明：appendChild() || insetBefore() || replaceNode() || removeChild()都是操作节点的子节点。如果是一个不支持子节点的元素就会报错。。

##其他方法

>cloneNode()


###方法：cloneNode();

语法：`cloneNode(true || false)`
参数：
>true -- 执行深度复制，也就是复制节点及其整个子节点数；
false -- 执行浅度复制，也就是只复制节点本身；

返回值：
复制后返回的**节点副本**；

说明：
1. 返回的节点副本，属于文档(意味着他能找到，但是没有parentNode，removeNode时也具有该特性)所有但是它并没有为它指定父节点，因此，这个节点副本不会出现在文档中，除非使用节点操作(appendChild()/insetBefore()/replaceChild())将它添加到文档中；
2. 在ie9之前不会为空白符创建节点；
3. 在ie中会复制该节点的事件处理程序，

















###属性：offsetParent
- 只读

语法：
节点.offsetParent -- 找到当前节点的定位父级；

得到的是距离当前元素最近的一个有定位属性的父级节点，若是没有没定属性的父级就指向body

正确使用：
1. 当前元素有定位父级
2. 当前元素要有定位属性
3. 在ie7下需要触发haslayout才能正确指向该元素的定位父级
否则在无定位父级的情况下会指向HTML;
4. 重置字体大小；


##获取元素宽高：

###属性 offsetLeft || offsetTop
- 只读；

当前节点到其定位父级(offsetParent)之间的距离
从当前节点的外边框到父级的内边框

返回一个不带单位的数字

说明：

如果当前节点，无定位父级，在所有的浏览器中都会指向HTML；
在ff中：
如果定位父级，同时存在overflow属性和border的时候，会存在问题：
因为：ff在overflow属性下计算offsetLest的时候，是 正常offsetLeft - border.width的值；
在ie7：
如果当前节点，没有定位属性，但是具有定位父级的话，则是指到body的距离；


###方法：getBoundingClientRect()

节点.getBoundingClientRect()

返回一个对象；
这个值会动态获取；

在标准中该对象有：top left right bottom width height
在ie中：top left right bottom

###方法：setAttribute(key,value)

设置属性，并且该属性直接在页面中

通过"."设置的属性，会存在内存中；

不能通过"."来获取其设置的属性，另外"."同样不能获取写在行间的属性



###方法：getAttribute(key)

获取属性,

###方法：removeAttribute(key)

删除属性






offsetHeight


# Document类型

JavaScript通过Document类型表示文档，在浏览器中document对象是HTMLDocument(继承自Document类型)的一个实例，表示整个页面
document对象是window对象的一个属性，因此可以将其作为全局对象来访问

特征：
document.nodyType -- 9;
document.nodeName -- "#document";
document.nodeValue -- null;
document.parentNode -- null;
document.ownerDocument -- null;

##1.文档的子节点

页面在经过浏览器解析后，其文档中只包含一个子节点--html
document具有两个快速访问其子节点的方式
1. document.documentElement;--html
2. document.body; -- body;

##2.文档信息

1. 读写 属性：title -- document.title
修改title的属性值不会改变title元素

2. 只读 属性：URL -- document.URL
包含页面完整的URL

3. 读写 属性：domain -- document.domain
包含页面的域名
虽说可以设置，但是由于安全问题，不能设置URL不存在的域名

4. 只读 属性：referrer -- document.referrer
包含链接到当前页面的母体

##3.查找元素

document类型提供了两种方法
>1.document.getElementById();
2.document.getElementsByTagName();
3.document.getElementsByName();

不存在的话返回null

>document.getElementById():
1.ie8及以下可以不区分大小
2.ie7和低版本：表单或者img等的name特性如果和指定的id相同的话，也会被获取到；
3.只会获取第一个；

>document.getElementsByTagName():
1.动态集合
2.返回的是一个HTMLCollection对象

>document.getElementsByName();
1.通过name的特性获取，一般用于获取单选按钮
2.返回的是一个HTMLCollection对象

注：
1.HTMLCollection对象还有个一个方法：

方法：namedItem();
通过元素的name特性取得集合中的项；
HTMLCollection还支持按名称访问项
-- HTMLCollection[name];

即是：如果传入的是数字，则调用item();
如果传入的是字符串，则调用namedItem();

2.HTMLCollection都是动态的


##4.特殊集合


document.anchors--包含文档中所有带name的a元素


##5.文档写入

document.write();
document.writeln();
document.open();
document.close();



#Element 类型

##特性：
1. nodeType = 1;
2. nodeName 的值为元素的标签名
3. nodeValue 的值是null
4. parentNode 可能Document或者Element

要是访问元素的标签名`nodeName`和`tagName`会返回的相同值

利用这种方式获取的标签名在HTML中都是大写，在XML中获取的都是实际书写的格式，如果需要对标签名进行判断，建议先转成小写`toLowerCase`然后再进行判断；

所有HTML元素都是由HTMLElement类型或者是它的子类型表示，每一个HTML元素中都有以下特性：
1. id
2. title
3. lang -- 元素的内容的语言代码
4. dir -- 语言的放量（ltr,rtl)
5. className

##取得特性：
1. getAttribute();
2. setAttribute();
3. removeAttribut();

>注：
1. 通过getAttribut获得的特性时，传递给getAttribut的特性名必须与实际的特性名，因此想要获得'class'的特性值，应该传入'class';
2. getAttribut 是不区分大小写的
3. 根据HTML5的规范，自定义特性应该加上data-前缀以便验证；
4. 自定义的特性写在行间的特性(属性)和同过setAttribute来创建的，只能通过getAttribute来获取，通过属性的值获取--(“.”)则获取不到；而通过“.”来设置的自定义属性，不会成为特性，所以不能通过getAttribute得到；

##两个特殊的特性
有两个特殊的特性，通过属性的值和通过getAttribute获取时得到的值是不同的：

###第一类--style：
通过属性获取的时候是一个对象--li.style.width;
通过getAttribute获取时，得到的是css文本；

###第二类--事件
以onclick为例：
使用属性获得到的是一个function；
使用getAttribute获取是一个字符串；

注：
在ie7及以下，两种方式得到的都是对象；所以一般获取时使用属性的值；

##设置特性：
setAttribute(特性名，特性值)

如果特性存在，则会用指定值替换已存在的值，如果特性不存在就创建该属性并设置相应的值；

>注：
1. setAttribut()方法既可以操作HTML特性也可以操作自定义的特性；
2. 通过这个方法添加的特性名会统一转换成小写形式


##删除特性--removeAttribute()

不支持ie6及以前；

##attributes属性

Element类型是使用attributes属性的唯一一个DOM节点类型，

element.attributes;

得到的是NameNodeMap(动态集合)元素的每一个特性都以一个attr节点表示，每一个节点都保存在NamedNodeMap对象中,每一个节点的nodeName都是特性的名称，而每一个节点的nodeValue都是特性值;


##attributes的方法：
1. getNameItem(name) -- `element.attributes.getNameItem(name)`
返回的是NameNodeMap对象中，属性名为name的 属性 和 属性值;

2. removeNamedItem(name) -- 从属性列表中移出属性名为name的节点；

3 setNamedItem(node) -- 向NameNodeMap的列表中添加属性名；
需要配合`createAttribute`使用
例：
``` 
var box1 = document.createAttribute("class")
t.attributes.setNamedItem(box1);
```

4. item(pos)--返回位于数字pos位置处的节点

```
    <div id="box" class="box">123</div>
    var t = document.getElementById('box');
    var d = t.attributes.item(0);
    alert(d) //obj.Attr
    console.log (d); // id="box";
```


补充: classList -- h5新增：
其下方法：add contains toggle 
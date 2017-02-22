#BOM相关方法及属性(基础--简单常用)

BOM : Browser Object Model -- 浏览器对象模型
在BOM中大部分方法都是window对象下的方法

内容：
window
1.open & close;
2.window.location;
3.status
4.navigator.userAgent
文档的宽高以及窗口事件
+属性：
1.document.documentElement.scrollTop;
2.document.documentElement.clientWidth||clientHeight;
3.document.documentElement.scrollHeight;
4.document.documentElement.offsetHeight[offsetWidth];
+方法：
1.document.documentElement.onscroll;
2.document.documentElement.onresize;

-------------

##window

###1. 方法：open
open(页面打开页面的地址,打开方式,窗口特征,replace)

窗口特征常用的是width||height||top||left
replace -- 一个可选的布尔值。规定了装载到窗口的 URL 是在窗口的浏览历史中创建一个新条目，还是替换浏览历史中的当前条目。支持下面的值：

共有四个参数，只不过后面两个参数存在兼容问题，一般不建议使用

```
  //----- open ---------
            // 功能：
            // 打开空白页：
            open();
            //打开指定链接
            open('http://www.baidu.com');
            //在当前页面打开指定链接(默认是_blank;)
            open('http://www.baidu.com','_self');

            //返回值：
            //返回新开页面的window对象,并且在不跨域的情况下可以对其进行修改；
            opener = window.open();
//          alert(opener) // object window
//          alert(opener == window) // false

            opener.document.documentElement.style.backgroundColor = "fb3";
```

<a href="open.html">open功能以及返回值</a>

>注：
1. 接受的是字符串；
2. 如果是window调用可以不写window

###2. 方法：close

```
        //----- close ---------

        aBtn[1].onclick = function () {

            //关闭当前选项卡的窗口
            window.close();
            /*
                注：这里的window存在兼容性的问题：
                在ff：无法关闭；
                在chrome：直接关闭；
                在IE：中询问用户；

             */

        }
        // 关闭通过当前window创建的窗口，
        aBtn[2].onclick = function () {
            opener.close();
        }
```

<a href="close.html">close介绍</a>

###3.属性： window.location -- 浏览器的地址信息--中文会被转译；
会返回一个包含 浏览器的地址信息 的obj;

返回的obj具有三个属性：
1) href -- 返回地址栏的内容 -- 可读可写
`window.location.href`

2) search -- 返回地址栏中'?'到'#'之间的内容后面的内容--主要是提交信息。只读
`window.location.search`

3) hash -- 返回地址栏中'#'后面的内容 -- 源自锚点；
`window.location.hash`


<a href="location.html">地址</a>





###4. status -- 修改状态栏中的内容

由于安全问题，已经基本废弃

###5. 属性：navigator.userAgent

`window.navigator.userAgent`

获取当期窗口所在浏览器的浏览器信息

使用这个可以判断当前浏览器类型
判断是否是IE实例：

```
    if (window.navigator.userAgent.indexOf('MSIE' )!= -1) {
        alert('我是IE');
    } else {
        alert('我不是IE');
    }
```


完整：

```
        var userA = window.navigator.userAgent;
        // 检测谷歌
        if(userA.indexOf("Chrome") >= 0){
            var index = userA.indexOf("Chrome")+7;
            var indexEnd = userA.indexOf(" Safari");
            var v = userA.substring(index,indexEnd);
            document.body.innerHTML = "chrome "+v;
            // 检测火狐
        } else if(userA.indexOf("Firefox") >= 0) {
            var index = userA.indexOf("Firefox")+8;
            var v = userA.substring(index);
            document.body.innerHTML = "Firefox " + v;
            // 检测IE11以下
        } else if(userA.indexOf("MSIE") >= 0){
            var index = userA.indexOf("MSIE") + 5;
            var indexEnd =  userA.indexOf(";",index);
            var v = userA.substring(index,indexEnd);
            document.body.innerHTML = "IE " + v;
            // 检测IE11
        } else if(userA.indexOf("rv:11")){
            document.body.innerHTML = "IE 11.0";
        }
        document.body.innerHTML = userA;

```

<a href="8_浏览器信息.html" target="\_blank">浏览器版本判断</a>

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

###4) 新属性： pageXOffset || pageYOffset 不带单位

window.pageXOffset -- 横向滚动条的滚动位置
window.pageYOffset -- 纵向滚动条的滚动位置
>注：
IE8及以下不支持；

###5) 新属性：innerWidth || innerHeight

window 独有 只在横向的时候计算滚动条尺寸

window.innerWidth -- 窗口的宽度
window.innerHeight -- 窗口的高度

>注：
IE8及以下不支持；

#方法：

## onscroll || onresize

###1. onscroll

当滚动条滚动时触发；

###2. onresize

当窗口尺寸发生变化时触发；

实例：
<a href="窗口事件onscroll-onresize.html" target="\_black">scrollHeight</a>

注：这里的两个事件的触发原理是通过判断在一段时间结束时前后值只要发生变化就执行一次，如果在这段时间内，不断的变化位置或者尺寸也只是执行一次；


###3. onhashchange

兼容到IE8

`window.onhashchange`

hash 来源于锚点
通过检测hash值的变化来进行操作 -- pjax
哈希值发生变化的时候

>补充：
Pajx扩展
2. http://www.open-open.com/news/view/129f7e5

###4. Window.scrollTo() 方法

scrollTo() 方法可把内容滚动到指定的坐标。
全兼容--并且元素都可以调用

语法
`window.scrollTo(xpos,ypos)`

###5. window.scrollY || window.scrollX

在移动端中通过window.scrollY || window.scrollX 来获取滚动条滚动距离

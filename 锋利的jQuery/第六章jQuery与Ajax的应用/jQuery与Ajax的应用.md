# jQuery 与 Ajax 的应用

## 1. Ajax 的优势和不足

### 1.1 Ajax 的优势：

1）不需要插件支持
2）优秀的用户体验
无需刷新，速度较快

3）提高web程序性能
无需重新加载全部内容，按需请求

4）减轻服务器和带宽的负担
异步

### 1.2 Ajax 的不足:

1）浏览器对XMLHttpRequest对象的支持性

2）破坏浏览器的前进后退按钮的正常使用

3）对搜索引擎的支持的不足

4）开发和调试工具的缺乏

## 2. jQuery 中的 Ajax

jQuery 中对 Ajax 的相关操作进行了封装，其中 以$.ajax()的方法为基础，在基础上还有 load()/$.get()/$.post()方法；

### 2.1 load() 方法

1. 载入HTML文档

语法：
`$(el).load(url[,data][,callback])`

data -- 发送过去的数据

在el中插入HTML文档，

插入的文档将利用 源文档的样式，进行渲染

```
    $('input:button').click(function () {
        $('#resText').load('test.html')
    })
```

2. 筛选载入的HTML文档

通过在第一个参数添加一些筛选条件，只有经过筛选的部分才会被插入；

```
    $('input:button').click(function () {
        $('#resText').load('test.html .para')
    })
```

3. 传递方式：

load()方法的传递方式根据参数data而定， 如果没有data参数，则是 GET 方式，如果有就是 POST 的传递方式；

4. 回调函数：

在回调函数的参数中，存在3个参数：
1) responseText  -- 请求返回的内容
2) textStatus -- 请求状态 success || error || notmodified || timeout
3) XMLHttpRequest -- XHR 对象


注：
load中的回调，只要是Ajax请求完成，不管是否成功，都会执行

### 2.2 $.get() 方法 和 $.post() 方法

$.get() 和 $.post() 都是工具方法

load()通常适用于获取静态的数据文件;

1. $.get()

语法：
`$.get(url[,data][,callback][,type]`

data: 发送到服务端的key/value 数据会作为QueryString附加到请求的URL中
callback： response 的返回状态为success的时候才会调用；
type: 服务端返回的内容的格式；

callback:中存在两个参数,
data -- 返回的内容；
textStatus -- 请求的状态；

数据格式

1） HTML片段

直接插入

```
    $('#send').click(function () {
        $.get('get1.php', {
            username: $('#username').val(),
            content: $('#content').val()
        }, function (data, textStatus) {
            alert(data);
            $('#resText').html(data)
        })
    })
```

2）XML 文档

对于XML文档，需要对返回的数据进行处理，处理XML文档和处理HTML文档一样

```
    $("#send").click(function(){
    $.get("get2.php", {
            username :  $("#username").val() ,
            content :  $("#content").val()
        }, function (data, textStatus){
            var username = $(data).find("comment").attr("username");
            var content = $(data).find("comment content").text();
            var txtHtml = "<div class='comment'><h6>"+username+":</h6><p class='para'>"+content+"</p></div>";
            $("#resText").html(txtHtml); // 把返回的数据添加到页面上
        });
    })
```

3）JSON 文件

返回的是JSON文件。同样需要处理，但是示例全部失败

2. $.post()

比较：

1） GET 请求的参数跟在URL后进行传递，而POST请求是作为HTTP消息的实体内用发送给Web服务器；

2）GET限制大小（2kb），POST 理论上无限

3）GET 会出现在浏览器缓存中

4) 在php中的接受方式不同
`get -- $_GET[]`
`post -- $_POST[];`

两种都可以通过`$_REQUEST[]`的方式获取

3. $.getScript() || $.getJson()

动态加载Script || JSON 文件

### 3 $.ajax()

语法：
$.ajax(option)

常用参数：

url：
type:
timeout：设置请求超时的时间
data：(obj || str) 如果不是字符串，则会自动转换成字符串，如果是对象，就必须是 key ：val的格式，如果是数组，自会自动为不同的值指定一个名称

dataType:(str) 返回的数据格式，如果不指定，则会自动根据HTTP中的信息，判断返回类型，返回的数据将作为回调中的参数

beforeSend:(fn) 可以在发送请求前修改，XHR 对象，如果返回false 就阻止这次发送；

complete: (fn) 请求完成后调用的回调函数 参数 XHR 对象 和一个描述成功的请求类型的字符串

success： (fn) 请求成功后 调用的回调函数 两个参数 1）由服务器 返回的数据 2）描述状态的字符串

error：(fn) 请求失败后，调用的函数 3个参数 1）XHR对象， 2）描述状态的字符串 3）错误信息；

gloab：默认true 表示是否触发全局AJAX

jsonp: 在一个jsonp请求中重写回调函数的名字。这个值用来替代在"callback=?"这种GET或POST请求中URL参数里的"callback"部分，比如{jsonp:'onJsonPLoad'}会导致将"onJsonPLoad=?"传给服务器。

jsonpCallback: 为jsonp请求指定一个回调函数名。这个值将用来取代jQuery自动生成的随机函数名。这主要用来让jQuery生成度独特的函数名，这样管理请求更容易，也能方便地提供回调函数和错误处理。你也可以在想让浏览器缓存GET请求的时候，指定这个回调函数名。

......

### 4 序列化元素

1）serialize() 方法

将一组数据序列化：
```
    $(function(){
       $("#send").click(function(){
            $.get("get1.php", $("#form1").serialize() , function (data, textStatus){
                        $("#resText").html(data); // 把返回的数据添加到页面上
                    }
            );
       })
    })
```


2) 传输的data数据，不仅仅可以使用映射的方式：

```
    {
        username :  $("#username").val() ,
        content :  $("#content").val()
    },
```

还可以使用字符串的方式：

```
    "username="+encodeURIComponent($('#username').val())+"&content="+encodeURIComponent($('#content').val())
```

使用字符串的时候要注意编码问题，serialize可以自动转换

3）serializeArray ()将DOM元素序列化，并返回一个经过序列化的JSON格式

4）$.param ()
对一个数组进行序列化



## 4 jQuery 中的 ajax 的全局事件

在jQuery中提供了 ，监听全局ajax的方法

只要Ajax请求开始，就会触发 ajaxStart() 方法
只要Ajax请求结束，就会触发 ajaxStop() 方法

以及：
ajaxComplete(fn)
ajaxError(fn)
ajaxSend(fn)
ajaxSuccess(fn)

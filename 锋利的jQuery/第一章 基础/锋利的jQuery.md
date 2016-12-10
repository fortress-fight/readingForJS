# 锋利的jQuery

## 1.1 基础介绍：
jquery.js 开发版 || jquery.min.js 生产版

1.
$ || jQuery
$ 是 jQuery的简写方式

2.
```
    $(document).ready(function () {
        alert('message?: DOMString')
    })
```

$(document).ready(fn) 相当于 document.addEventListener('DOMcontentLoading', fn, false) 相当于 $(fn);

3.
链式操作：
1）选项卡实例：
```
    $('.level1>a').click(function () {
        $(this).addClass('current').next().show().parent().siblings().children('a').removeClass('current').next().hide();
        return false;
    })
```

<a href="html/导航栏.html">导航栏</a>

这样写链式操作，在使用上没有什么问题，但是在阅读的时候就会产生困扰，所以应该在使用的时候遵循一些规则：

2）规则：

- 对于一个对象少于三个操作，可以写在一行；
- 对于一个对象具有多个操作的，可以将每一个操作写成一行
- 对于多个对象的少量操作，可以每一个对象写成一行，如果涉及到子元素，可以考虑适当的缩进
- 添加注释！

通过这些规则可以将上面的代码优化：

```
    $('.level1>a').click(function () {
        $(this).addClass('current') // 点击的添加class
        .next().show() // 下一个元素显示
        .parent().siblings().children('a').removeClass('current') // 父级所有的兄弟元素，下面的所有a 删除class
        .next().hide(); // 将他们的写一个兄弟元素隐藏
        return false;
    })
```

## 1.2 jQuery对象和DOM对象

需要注意的是jQuery中选择元素后的返回值都是一个对象，不能够通过这个对象是否为真去判断要获取的元素是否真正的存在，因为对象始终存在，只能通过 $('el').length 和 $('el')[0]的方式来判断是否真正的存在；

```
    <div>
        <p>节点是否存在</p>
    </div>
    <script>
        if ($('p').next()) {
            alert('存在') 
        } else {
            alert('不存在')
        }
        // 存在
    </script>
```

```
    <div>
        <p>节点是否存在</p>
    </div>
    <script>
        if ($('p').next()[0]) { // if ($('p').next().length)
            alert('存在') 
        } else {
            alert('不存在')
        }
        // 不存在
    </script>
```

### 1.2.2 jQuery 对象和 DOM对象 的相互转化：

1） 区分jQuery 对象和 DOM对象
有DOM不能使用jQuery的方法，而jQuery也不能使用DOM的方法，所以一般在使用的过程中要区分jQuery 对象和 DOM对象，例如：
`var $name = jQuery对象`
`var name = DOM对象`

2）jQuery 转 DOM 对象

[index] || get()

[index]使用过jQuery对象存储的形式特点，获取其存储的DOM对象；
get()是通过jQuery提供的方法获取去储存的DOM对象；

3）DOM 转 jQuery

$()

直接通过$(DOM对象)的方式就将DOM对象转换成jq对象，原理就是在jq中直接将DOM对象储存在其返回的对象上；

### 1.2.3 实例：

```
    <script>
        $(function () {
            var $cr = $('#cr');
            var cr = $cr[0];
            $cr.click(function () {
                if (cr.checked) {
                    alert('suc')
                }
            })
        })
    </script>
```
其中cr.checked是通过DOM的方法判断的，如果想使用jq的方式进行判断：

```
    $(function () {
        $('#cr').click(function () {
            if ($(this).is(':checked')) {
                alert('suc')
            }
        })
    })
```

`is(':checked')`是jq中判断表单是否被选中的方法；
<a href="html/DOM对象和JQuery对象1.html">表单</a>

### 1.3 jQuery 的解决冲突的方法
jQuery 是通过 noConflict() 的方法解决冲突；

1. 通过jQuery.noConflict()就将$的控制权交出了；
2. 使用  `var $j = jQuery.noConflict()` 就自定义了一个快捷方式
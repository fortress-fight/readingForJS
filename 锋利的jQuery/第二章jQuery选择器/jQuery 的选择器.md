# jQuery 的选择器

jQuery 选择器
jQuery 借用了Sizzle 库；主要是通过正则匹配的方法找到相应元素，
jq返回包含元素的对象，对象具有length属性以及以数字为下标；

要注意的是 通过$()方式获取的都是一个对象所以不能通过是否为真来判断是否存在；这在基础部分也提到了；

jQuery 选择器 分为 基本选择器 || 层次选择器 || 过滤选择器 || 表单选择器

## 1.1 基本选择器：

$('#idSelector') || $('tagSelector') || $('classSelector') || $('\*') || $('Selector1, Selector2')

这一块很好理解 不做叙述

## 1.2 层次选择器

通过DOM节点之间的关系选择元素， 如： 相邻元素 || 同辈元素 || 后代元素 || 子元素 :

$('ancestor descendant') || $('par > son') || $('prev + next') || $('prev ~ siblings')

这些都是css中常见的选择器，同样不作叙述；

~ ----- 是选择后面的所有兄弟元素；

## 1.3 过滤选择器

过滤选择器都以 ':' 开始；
过滤选择器又分为：

基本过滤 || 内容过滤 || 可见性过滤 || 属性过滤 || 子元素过滤 || 表单对象属性过滤

### 1.3.1 基本过滤：

$('Selector:first') || $('Selector:last') || $('Selector:not(select)') || $('Selector:even') || $('Selector:odd') || $('Selector:eq(index)') || $('Selector:gt(index)') || $('Selector:lt(index)') || $(':header') || $(':animated') || $(':focus')

这里解释几个自己不理解的：

$('Selector:gt(index)')： gt --- Greater than; 选择index前的所有元素(不包括index)
$('Selector:lt(index)')： lt --- Less than; 选择index后的所有元素 (不包括index)
$(':header')： 选择 h1 - h6
$(':animated')： 选择处于动画中的元素
$(':focus')： 选择当前获取焦点的元素

### 1.3.2 内容过滤选择器：

$('Selector:contains(text)') || $('Selector:empty') || $('Selector:has(selector)') || $('Selector:parent')

$('Selector:parent'): 包含子节点的
$('Selector:contains(text)'): 选取含有文本内容为text的元素

### 1.3.3 可见性的过滤器：

$('Selector:hidden') ||　$('Selector:visible')

$('Selector:hidden') 包括 hidden和display：none；

### 1.3.4 属性过滤选择器

$('Selector[attr]') || $('Selector[attr = val]') || $('Selector[attr != val]') || $('Selector[attr ^= val]') || $('Selector[attr $= val]') || $('Selector[attr \*= val]') || $('Selector[attr |= val]') || $('Selector[attr ~= val]') || $('Selector[attr]\[attr2][attr3]....')

$('Selector[attr ^= val]') 选取具有属性名attr并且该属性名下的属性值以val开头
$('Selector[attr $= val]') 选取具有属性名attr并且该属性名下的属性值以val结尾

$('Selector[attr \*= val]') 选取具有属性名attr并且该属性名下的属性值包含val
$('Selector[attr |= val]') 选取具有属性名attr并且该属性名下的属性值以val作为前缀的
$('Selector[attr ~= val]') 选取具有属性名attr并且该属性名下的用空格分开的属性值中包含val的

`$('Selector[attr][attr2][attr3]....')` 满足多个过滤条件的；

### 1.3.5 子元素过滤选择器

$('selector:nth-child(even || index || odd || equation)') || $('selector:first-child') || $('selector:last-child') || $('selector:only-child')

$('selector:only-child') || 如果selector中的元素是其唯一子元素，就选中这个子元素

:first-child 和 :first
first-child 是选择所有父级下的第一个子元素
:first 是在获取父级下的元素中的第一个

### 1.3.6 表单对象属性过滤选择器

$(':enabled') || $(':disabled') || $(':checked') || $(':selected')

这里的比较特别：首先这个属性可以不可以单独使用，要是实在前面添加一个过滤范围：
$('#form :enabled') -- 代表#form下的 能够编辑的所有；注意空格
$('input:enabled') -- 代表所有input中能够编辑的

$(':selected') 代表下拉框的内容

### 1.3.7 表单选择器

$(':input') || $(':text') || $(':password') || $(':radio') || ........

## 2 补充：
is

例：
$(input).is(':visible') 他就会判断$(input)是否满足(':visible')的条件，满足返回真 否则 为假

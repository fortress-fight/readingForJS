# Learn JavaScript

## 2. 在HTML中使用JavaScript

使用`<script>`元素 || 嵌入脚本 与 外部脚本 || 文档模式对JavaScript的影响 || 考虑禁用JavaScript的场景

JavaScript 是一种脚本语言，浏览器并不能直接编译js文件，而是通过 HTML 对脚本的支持来实现编译；

### 2.1 script 元素

#### 2.1.1 简介

script 有以下6个属性：

- async -- 异步记载外部脚本文件
- charset -- 不常用
- defer -- 推迟到文档加载完成后，加载外部脚本文件，兼容到ie7
- language -- 废弃
- src
- type -- 例如：text/javascript || 可不写

script标签，有两种引入方式：

1. 内部
2. 外部

在加载script标签时，遵循自上而下的同步解析方式；
在`<script></script>`标签内不能出现`</script>`字段，如果需要必须使用'\'转译；
`<\/script>`

- 注：script标签，具有访问外部域的特点；

#### 2.1.2 script标签位置

常规来说，script标签应该放在head标签中，但是由于同步加载的原因，会导致，在script没有完全加载，就不会加载body标签，影响用户体验；所以一般来说，应该讲script标签放在body标签中页面内容的下面；

#### 2.1.2 延迟脚本

通过defer属性，也可以达到先加载DOM的目的，但是存在很多问题，（支持的差异性。。- ，所以放在body中依旧是更好的选择

#### 2.1.3 异步脚本

async，异步脚本，不能保证脚本加载的先后顺序，并且是在onload之前加载的，使用需谨慎

### 2 嵌入代码与外部代码

#### 2.1 外部代码的优点

外部代码的优点

- 可维护性
- 可缓存性
- 适应未来

### 3 文档模式

严格模式

### 4 noscript 元素

当页面不支持或者禁用了script标签的时候，显示noscript标签内容

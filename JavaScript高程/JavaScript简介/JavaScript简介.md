# JavaScript 简介

## 1 JavaScript实现

一个完整的JavaScript的实现由3个部分组成，DOM 、 BOM 、ECMAScript

### 1.1 ECMAScript

ecm国际，制定

浏览器仅仅是ECMAScript 的宿主环境之一

ECMAScript 包含： 语法、类型、语句、关键字、保留字、操作符、对象；

### 1.2 DOM

万维网联盟制定

文档对象模型，是针对XML但经过扩展可以用于HTML的应用程序编程接口；
DOM将整个页面映射成为一个多层节点结构，HTML或者XML页面中的每一个组成部分都是某种类型的节点，这些节点又包含着不同类型的数据；

DOM 并非是JavaScript独有；

DOM级别:

DOM1~DOM3

各个浏览器支持的DOM不同

### 1.3 BOM
Browser Object Model

BOM只处理浏览器窗口和ifram/iframs 但是 人们习惯将 将所有针对浏览器的JavaScript算作DOM的一部分
BOM 用于控制浏览器显示的页面以外的部分
在HTML5之前，BOM并没有标准
# Learn JavaScript

## 1. JavaScript 简介
![Intro](./JavaScript简介.png)
### 1.1 JavaScript实现

一个完整的JavaScript的实现由3个部分组成，DOM 、 BOM 、ECMAScript

#### 1.1.1 ECMAScript

- 由ECM国际，制定的 ECMA-262 标准；
- 浏览器仅仅是ECMAScript 的宿主环境之一
- ECMAScript 包含： __语法、类型、语句、关键字、保留字、操作符、对象；__

#### 1.1.2 DOM

- 由万维网联盟制定的一套标准；
- 文档对象模型，是针对XML但经过扩展可以用于HTML的__应用程序编程接口__；
- DOM将整个页面映射成为一个多层节点结构，HTML或者XML页面中的每一个组成部分都是某种类型的节点，这些节点又包含着不同类型的数据；
- DOM 并非是JavaScript独有；

DOM级别: DOM1~DOM3

各个浏览器对标准的支持存在部分差异；

#### 1.1.3 BOM

`Browser Object Model -- BOM`

- BOM只处理浏览器窗口和ifram/iframs,但是人们习惯将所有针对浏览器的JavaScript算作DOM的一部分
- BOM 用于控制浏览器显示的页面以外的部分
- 在HTML5之前，BOM并没有标准，所以浏览器之间对 BOM 的功能的实现存在较大的差异，而将相同的部分作为默认的标准

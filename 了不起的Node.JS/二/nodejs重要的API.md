# Node 重要的 API

## 1. 命令行工具以及 FS API：首个 Node 应用

### 1.1 简介

本节主要介绍了 Node.js 中的一些重量级的 API:  

1. 处理进程（stdio）的 stdin 以及 stdout 的相关 API
1. 与 fs 模块相关的 API

### 1.2 应用需求

应用：一个简单的文件浏览器，功能：可以允许用户读取和创建文件

1. 程序需要在命令行中运行，通过终端提供交互给用户进行输入和输出的操作
1. 程序启动的时候要显示当前文件下的列表
1. 选择某个文件时，程序需要显示该文件内容
1. 选择目录时，程序需要显示该目录下的信息
1. 运行结束后程序退出

### 1.3 编写

1. 首先搭建项目基础
    创建目录 file-explorer
    运行 `npm init`
    创建一个主文件 -- index.js

1. 同步还是异步
    首先，我们需要引入所需模块，对于当前应用而言，我们仅需要引入 fs -- 文件管理模块；

    `var fs = require('fs')`
    读取当前目录下文件：

        ```js
            // 同步方法：
            // console.log(fs.readdirSync(__dirname));
            // [ 'index.js', 'package.json' ]

            // 异步方法
            function async (err, files) { console.log(files); }
            console.log(fs.readdirSync('.', async));
            // [ 'index.js', 'package.json' ]
        ```
    异步回调函数中第一个参数为错误对象，如果没有发生错误这个参数为 null；
    - 注： fs 模块是唯一一个同时提供了同步和异步 API 的模块

1. 理解什么是流
    我们知道在 Node 中，保留了浏览器 JS 中的 console.log(); 事实上，console.log 内部会执行这样的操作：在指定的字符串后面加上 \n 换行符，并将其写到 stdout 流中；

        ```js
            console.log('Hello World');
            process.stdout.write('Hello World');

            // Hello World
            // Hello World***********
        ```
    可以看出通过 console.log 打印出来的 hello world 具有换行，而通过 stdout 直接输出的不具有换行；

    在全局对象 process 中存在三个流对象：

    - 'stdout' -- 标准输出流
    - 'stdin' -- 标准输入流
    - 'stderr' -- 标准错误

    标准输入流的默认状态是暂停的，通常，执行一个程序，程序会自动运行，然后退出；但是有时我们可能需要和用户进行交互，这时我们就需要保证程序一直处在运行的状态，并等待用户输入；当开通输入流的时候，Node 就会观察对应的文件描述符，然后保持事件运行，并保证程序不会退出；等待输入结束的事件触发，除非有 IO 等待否则，Node 会自动退出；

     > 注：在 Node 中存在各种类型流，当涉及到不断的对数据进行读写时，就会出现流

1. 列出当前目录下面的文件
    

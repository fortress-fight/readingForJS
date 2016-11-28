# JSON(JavaScript 高程)

JSON是一种数据格式，而不是一种编程语言，虽然在JavaScript中有相同的语法形式，但JSON不属于JavaScript

## 1. JSON 语法

在JSON中没有变量、函数、对象实例，所有字符串必须使用双引号包住；
在JSON中接受3中类型的值：简单值、对象、数组；

注：对象实例比如：new Date()

简单值：布尔值、数值、字符串、null（JSON中不支持undefined）
对象：一组无序的键值对，每个键值对的值都可以是简单值、数组、对象；（复杂数据类型）
数组：一组有序的值的列表，可以通过索引去访问其中的每一项；（复杂数据类型）


### 1.1 简单值

比如 5， "string" 都是有效的JSON值

### 1.2 对象

1. 在JavaScript中，对象的字面量无需加引号，而JSON中对象的字面量必须加双引号；
2. 在JSON中的对象没有变量，结束时没有分号；

### 1.3 数组

1. 在JSON中的数组没有变量，结束时没有分号；

## 2. 解析和序列化

XML需要解析成DOM文档，而且从中提取数据，而JSON就要简单很多只需要key.value就能的到

### 2.1 JSON对象

支持性：
支持IE8+ 和标准浏览器
对于不支持的需要引入 https://github.com/douglascrockford/JSON-js.git 中的json.js文件

JSON对象的方法

1） stringify () 
JSON.stringify(obj),将一个JSON对象转换成字符串，会忽略所有不符合JSON要求的数据类型，如：函数、undefined。。。。以及空格和缩进

2） parse() 
JSON.parse(string),将一个string转换成JSON对象，

### 2.2 序列化选项

在使用JSON.stringify()的时候除了要序列化的JSON对象，而且还可以接收两个参数，一个过滤器，数组或者函数；另一个是，是否保留缩进

1. 过滤：
当这个参数是数组的时候，那么返回的结果中只包含，数组中列出的属性
例如：
```
<script>
    var book = {
        "title": "a book",
        "authors": "小米",
        "edition": 4,
        "year": 2011
    }

    var JSONText = JSON.stringify(book, ['title',"edition"])
    console.log(JSONText)
</script> // {"title":"a book","edition":4}
```

如果这个参数是一个函数的时候，函数中会传入两个参数一个key 和 value, 可以对其操作并返回,返回值将替换转后的value值 如果返回的是个undefined那么就会忽略掉这个属性;
例：

```
    var JSONText = JSON.stringify(book, function (key, value) {
            switch (key) {
                case 'title':
                    return '这是一个标题';
                    break;
                case 'edition':
                    return undefined;
                default:
                    return value;
                    break;
            }
        })

    console.log(JSONText) //{"title":"这是一个标题","authors":"小米","year":2011}
```


2. 缩进：

JSON.stringify()的第三个参数，代表着缩进，可以为数字或者字符串

数字：

```
    <script>
        var book = {
            "title": "a book",
            "authors": "小米",
            "edition": 4,
            "year": 2011
        }
        var JSONText = JSON.stringify(book, null, 4)
        console.log(JSONText);
        /*
        {
            "title": "a book",
            "authors": "小米",
            "edition": 4,
            "year": 2011
        }
         */
    </script>
```

注：缩进的最大为10，大于10，就是10个；

字符串：
如果这个参数是一个字符串格式，那么这个参数将作为一个缩进符

```
    var JSONText = JSON.stringify(book, null, '--')
     console.log(JSONText)

     /*
     LearnForJSON1.html:30 {
        --"title": "a book",
        --"authors": [
        ----"小米"
        --],
        --"edition": 4,
        --"year": 2011
    }
      */
```

3. toJSON();

在JSON对象中可以添加一个toJSON() 的函数，用于补充过滤，原生Date对象上就有个toJSON()方法，返回一个日期字符串;
通过toJSON()甚至可以返回一个undefined；

```
    var book = {
            "title": "a book",
            "authors": [
                "小米"
            ],
            "edition": 4,
            "year": 2011,
            "toJSON": function () {
                return this.title;
            }
        }

    var jsonText = JSON.stringify(book);
    console.log(jsonText) //"a book"
```

4. 序列化对象的顺序：

1）如果存在toJSON()方法，并且能过取得有效值，则调用该方法，否则，返回对象本身；
2）如果存在第二个参数，应用这个函数过滤，那么传入函数过滤的是1）中的返回值；
3）对2）步返回的每个值进行相应的序列化；
4）如果存在第三个参数，则执行相应的格式化；

```
    <script>
        var book = {
            "title": "a book",
            "authors": [
                "小米"
            ],
            "edition": 4,
            "year": 2011,
            "toJSON": function () {
                return this.title;
            }
        }

        var jsonText = JSON.stringify(book, function (key, value) {
            return value + '过滤';
        });
        console.log(jsonText) //"a book"
    </script>
```

无论是否使用toJSON的方法，理解序列化的顺序都十分重要


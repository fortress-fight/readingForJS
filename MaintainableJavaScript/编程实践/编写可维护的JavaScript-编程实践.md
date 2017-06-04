# Learn Maintainable JavaScript

## 2. 编程实践

- 代码风格规范的目的是在多人协作的场景使代码具有统一风格，而编程实践则是关于编程中如何解决一般性的问题；

### 2.1 UI 层的松耦合

在 Web 开发中，UI 是由三个部分组成 HTML、CSS、JavaScript；其中 CSS 和 JavaScript 应该属于同一级别的，也就是说 无论哪一个配合 HTML 都可以实现一定的页面效果；所以在编码的过程中 CSS 应该尽量不依赖 JavaScript 而且 JavaScript 也尽量不去依赖 CSS；

1. 什么是松耦合
    如果一个组件和另一个组件之间相关，当修改其中一个组件都会影响到另一个组件，这种行为就会对代码产生很大的隐藏风险，如果当修改一个组件的时候而不需要修改其它组件时，就叫做松耦合；松耦合对于代码可维护性来说至关重要；

    比如说：有个一个 className 贯穿了 HTML CSS 和 JavaScript 如果你想要修改这个 className，那么就可能产生严重的后果；

    当一个大系统的每一个组件的内容有了限制，就做到了松耦合，本质上来说组件需要足够的瘦小来确保松耦合。组件知道的越少，就越容易维护；

    组件往往不会是独立的，组件之间存在着通信，所以无耦合是很难实现的，我们要做的是当去修改一个组件的时候，不会过多的影响其余组件

    一个理想的 Web 松耦合是：如果是文本或者结构出了问题，可以通过查找 HTML 进行定位，如果样式出现问题，可以查找 css 文件定位，如果是行为出了问题，查找 JavaScript 就能解决；

2. 将 JavaScript 从 css 中抽离

    css 在 IE8 及以前的浏览器中，可以嵌套 JS 表达式，建议不要使用这种行为，这里也不对这种方式进行介绍；

3. 将 css 从 JavaScript 中抽离

    我们经常将样式数据和 JavaScript 混在一起，通过脚本去修改样式最流行的一种方式是：直接修改 DOM 元素的 Style 属性； 或者使用 cssText 批量修改 style 属性，但是这种行为就将带来维护上的困难；

    建议：通过修改 className 的形式来修改样式信息，这样样式的信息依旧都保留在 css 文件中，这样对于维护样式就十分的方便了；

    - 注：
        当需要 js 计算才能得出的样式，还是需要写入 js 中的，比如：通过计算得到的位置信息，就无法在 css 中表现出来；

4. 将 JavaScript 从 HTML 中抽离

    在 HTML 中可以写入 js 代码：

    ```html
        <input type='button' onclick='dosomething()'>
    ```

    这种行为十分的不利于维护，比如说，如果一个函数执行过程中出现了问题，我们不会再第一时间去 HTML 中查找 js 的问题，所以这种方式不符合 “可预见性” 的问题；

    建议：
        所有的 js 代码，都放置在外部的 js 文件中，然后通过 script 的标签来引入；

5. 将 HTML 从 JavaScript 中抽离

    在使用 JavaScript 的使用，我们会常常使用添加 innerHTML 的方式，想 html 的解构中，添加属性或者标签，但是这种行为加大了 JavaScript 和 HTML 之间的耦合，增加了跟踪文本和结构性问题的复杂程度；

    同时多数的 web 应用本质上都是动态的，在页面的声明周期中，JavaScript 通常用于修改 UI 必然需要通过 JavaScript 向页面插入或者修改标签，这种情况下我们只能寻求方法以降低他们之间的耦合性；

    1. 方法一： 从服务器加载

        第一种方法是将模板放置于远程服务器，然后通过 ajax 获取，填充到 HTML 中：

        - 例如：

                ```js
                    function loadDialog(name, oncomplete) {
                        var xhr = XMLHttpRequest();
                        xhr.open('get', './js/dialog/'+name, true);

                        xhr.onreadystatechange = function () {
                            if (xhr.readystatus == 4 && xhr.status == 200) {
                                var div = document.getElementById('dig-holder');
                                oncomplete();

                            } else {
                                // 处理错误
                            }
                        };

                        xhr.send(null);
                    }
                ```

        在 jq 中提供了封装好的方法：

                ```js
                    function loadDialog(name, oncomplete) {
                        $('#dlg-holder').load('/js/dialog/' + name, oncomplete);
                    }
                ```

        如果需要注入大量 HTML 标签到页面中，使用远程调用的方式来加载可能是最好的方式；出于性能的原因，将大量没有用的标签存放于内存或 DOM 中是很糟糕的做法；对于少量的标签段，可以使用客户端编译；
        - 注：使用服务器加载，容易出现 xss 漏洞（xss 漏洞是指用户恶意向 HTML 中注入恶意脚本）；具体内容还有待了解；防护方式，通过后端对用户提交的信息进行转译，避免恶意脚本被注入到服务器中；

    2. 方法2：简单的客户端模板

        客户端模板是一些带 “插槽” 的标签片段，这些 “插槽” 会被 JavaScript 程序替换成为数据以保证模板的完整可用：

            ```js
                <li><a href="%s">%s</a></li>

                function sprintf(text) {
                    var i = 1, args = arguments;
                    return text.replace('/%s/'g, function (){
                        return (i<args.length) ? args[i++] :'';
                    });
                }

                // 用法：

                var result = sprintf(templateText, "/item/4", "Fourth item");
            ```

        我们通过向模板传入变量，将这个模板转换成为一个真真的 HTML 段，再将其插入到合适的地方，由于在数据传入模板之前，模板不是完整的字段，所以模板不能够直接写入到 HTML 结构中；

        有两种方式：
            一：将模板作为注释写入；
            二：将模板写在 script 标签中，并将 script 的标签写成： `<script type="text/x-my-template"></script>` 从而避免被浏览器作为 js 脚本运行；（可以通过 script 的text 的属性来获取标签的内容）

    3. 复杂客户端模板
        目前市面上，提供了较多的客户端模板系统，根据具体要求进行了解；

6. 避免使用全局变量：

    js 最初的执行环境存在一个 全局对象，在这个环境下声明的变量都是这个对象的属性，但是这个全局对象是不存在的， win 对象往往重载并等同于全局对象，例如：

        ```js
            var color = 'yellow';
            function sayColor () {
                alert(color);
            }

            console.log(window.color === color); // true
        ```

    1. 全局变量带来的问题：

        一般来说，创建全局变量被认为是糟糕的设计，随着代码量的增加，全局变量就会使代码越来越难以维护，引入错误的概率也会随着增大：

        - 命名冲突

            当脚本中的全局变量和全局函数越来越多，发生命名冲突的机会就会越来越大，也就是说可能会在无意之间使用了一个已经声明的变量；这样就会造成代码维护上的困难；

            全局变量还是用来定义 JavaScript 内置对象的地方，如果你设置的自己的变量和浏览器内置的 API 重名了（是已经存在的也有可能是未来出现的），也会造成维护困难的代码；

            - 建议：
                所有的变量都定义为局部变量的代码才是容易维护的；

        - 代码的脆弱性

            一个依赖于全局变量的函数，是和上下文紧密的耦合在一起的，这样的函数十分依赖环境，如果执行环境发生了变化就会产生问题；

            上例的 color 就是全局变量，而函数内部是直接引入了 color，当环境发生变化，或者出现了意想不到的 color，都会对函数产生影响；

            尽量保证函数的独立性，如果需要外部变量，最好也是通过传参的方式将其引入；

                ```js
                    var color = 'yellow';
                    function sayColor (color) {
                        alert(color);
                    };
                    sayColorc(color);
                ```
            - 建议：
                1. 当定义函数的时候，最好尽可能的将数据至于局域作用域，在函数内定义的任何“东西”都应当以参数的性质传递近来，

        - 难以测试：

            任何依赖全局变量才能正常工作的函数，只有为其创建完整的全局环境才能正确的去测试它，这样就也不利于进行单元测试；

            - 建议： 确保你的函数不会对全局变量有依赖；

    2. 意外的全局变量

        有时我们可能会在不经意间就创建了全局变量，比如说：

            ```js
                window.name = 'qq';
                function a () {
                    var job = 'student';
                        name = 'ff';
                }
            ```
        由于没有使用 var 进行声明，本来想作为局部变量的 name 就成为了全局变量，这种情况下会覆盖掉全局中的name，这里还存在一个严重的问题，window.name 属于 window 对象内置 name 属性，可以查找到指定的框架容器

        - 建议：
            1. 在任何情况先最好都是用 var 来定义变量，哪怕是定义全局变量；

        在这种情况下，JavaScript 并不会报任何警告，可以通过使用 JSLint 和 JSHint 来进行监控，如果你给一个没有声明的变量赋值，这两个工具都会报错；

        并且如果你不小心修改了 JavaScript 内置对象的相关属性的时候，这两个工具同样会给予提示；

        还有在严格模式（ “use strict”）下，就禁止对一个未声明的变量进行赋值

    3. 单全局变量方式

        写 JavaScript 中，难免会引入全局变量，尤其是在一些被分割的代码之间进行通讯的时候，所以最佳的方式就是依赖尽可能少的全局变量，即只创建一个全局变量（必须是一个独特的全局变量，避免与其余的全局变量产生冲突）；

        单全局变量已经在各种 JavaScript 类库中广泛使用了；

        单全局变量：创建的这个唯一全局对象名是独一无二的（不会和内置的 API 产生冲突）；并且将你的所有功能代码都挂在到这个全局变量上；

        例：

            ```js
                var PublicTool = {};

                PublicTool.readBook = function (title) {
                    this.name = title,
                }

                PublicTool.readBook.prototype.sayBookName = function () {
                    alert(this.name);
                };

                PublicTool.createBook1 = new PublicTool.readBook('MaintainableJS');
            ```
        这样整个功能的代码都挂在了 PublicTool 中，如果需要对其进行扩展只需要继续扩展他的属性即可；
        如果需要使用，也仅仅只需要引入变量 PublicTool;

        - 注：
            1. 单全局变量避免和内置 API 的冲突问题；
            2. 单全局变量，使得分割的代码段之间产生了一定的联系；

        1. 命名空间

            大多数使用单全局变量模式的项目同样包含命名空间的概念；

            命名空间：通过全局变量的单一属性表示功能性的分组；比如：你的单一全局变量：FF; 然后将工具方法放在 FF.tools 中进行管理，将逻辑关系放在 FF.do 下面；

            这种根据功能进行划分的方式，不仅可以将你的单全局变量变得井然有序，并且有助于多人维护；

            - 建议:
                1. 每一个单文件中都通过创建新的全局变量来声明自己的命名空间；

            使用命名空间还需要注意一些问题，考虑下面场景；

            我建立了一个新的文件，这个时候我需要对一个共同维护命名空间扩展属性；但是在扩展之前我需要保证这个命名空间是存在的；这个时候需要引入一个方法替我们解决这个问题：

            示例：

                ```js
                    var FFGloble = {
                        namespace: function (ns) {
                            var parts = ns.split('.'),
                                object = this,
                                i, len;

                            for (i=0, len=parts.length; i<len; i++) {
                                if (!object[parts[i]]) {
                                    object[parts[i]] = {};
                                }
                                object = object[parts[i]];
                            }

                            return object;
                        }
                    }
                ```

            使用示例：

                ```js
                    FFGloble.namespace(FF.tools);

                    FFGloble.FF.tools.readBook = function () {
                        console.log('reading')
                    }

                    FFGloble.namespace(FF.do);

                    FFGloble.FF.do.sayBook = function () {
                        alert('Book')
                    }
                ```

            - 解释：
                (有一群人去维护 FFGloble 下的 FF，这时我想对其扩展一个工具方法，但是我不知道 tools 是否已经存在，我想创建一个新的 tools 的工具方法，当又怕产生命名冲突，所以使用 namespace 来避免命名冲突)

                1. namespace 是用来注册命名空间的，如果传入的命名空间没有，就注册如果有了就保持；
                2. 在使用的时候，第一次注册了 FF 和 tools 两个命名空间。在第二次的时候由于 FF 已经存在，只注册了 do 一个命名空间；

            - 建议：
                1. 如果你的代码并不是独立的存在的时候，就要围绕着命名空间建立一些约定，比如说：字母全部大写 || 字母全部小写 || 首字母大写 || 驼峰 ....

        2. 模块

            基于单全局变量的扩充方法除了命名空间还有模块；

            模块是指一种通用的功能片段，它并没有创建命名空间和新的全局变量，而是将所有的代码都存放在一个_表示执行一个任务或发布一个接口的单函数_中，可以使用一个名称来表示这个模块，而且这个模块还可以依赖别的模块；

            javascript 本身并不包含模块的概念，也没有模块语法，但是存在一些通用的模式来创建模块；

            __YUI模块__
            YUI 模块是使用 YUI JavaScript 类库来创建新模块的一种模式。

                ```js

                    YUI.add('module-name', function (Y){

                        // 模块正文
                        Y.namespace('ff.readBook');
                        Y.ff.readBook.name = 'MaintainableJS';
                    }, 'version', {requires: ['dependency1', 'dependency2']})
                ```

            - 'module-name' -- 模块名称
            - function -- 模块的执行函数
            - Y -- YUI 的实例，包含所有依赖的模块提供的内容（YUI 约定，在每一个模块中使用命名空间的方式来管理代码）
            - requires -- 依赖模块

            上面仅仅是创建了一个模块，具体使用需要使用 YUI().use() 函数；

                ```js
                    YUI().use('my-book', 'another-module', function (Y) {

                        console.log(Y.ff.readBook.name) // 'MaintainableJS'
                    })
                ```

            - 这段代码在开头先加载 my-book 和 another-module 两个模块，然后在执行函数；这里的 Y 就是已经被加载模块修改后的对象了；

            __异步模块定义（AMD）__
            AMD 模块，制定了模块名称、依赖和一个工厂方法；在依赖加载完成后执行这个方法；这些内容全部作为参数传入一个全局函数 define() 中;

                ```js
                    define ('module-name', ['dependency1', 'dependency2'], function (dependency1, dependency2){

                        // 模块正文
                        var readBooks = {};
                        readBooks.js = {
                            name: 'MaintainableJS'
                        };
                        return readBooks;
                    });
                ```
            - module-name -- 模块名称
            - dependency1、dependency2 -- 依赖模块
            - 函数中的 dependency1、dependency2 -- 依赖模块返回的对象；

            在依赖模块加载完成后执行，模块代码。创建了一个 readBooks 对象，然后位置对这个对象添加属性，并将这个对象返回；

            如果需要使用 AMD 模块，还需要使用一个与之兼容的模块加载器。（模块加载器可以将 JavaScript 文件名当做模块名称，在定义的时候就可以省略模块名）；

            以 RequireJS 为例:
            RequireJS 添加了另一个全局变量 require(), 用于加载指定的依赖和执行回调函数；

                ```js
                    require(['my-book'], function (book){

                        console.log(books.readBooks.js.name);
                    })
                ```

            调用 require() 时候会首先立即加载依赖，在模块加载完成后会即可执行回调函数；

            __CommonJS规范__
            CommonJS 规范和 AMD 规范相似， CommonJS 规范更适用与服务器端，或者纯脚本编程；

        3. 零全局变量

            如果你的代码是一段不会被其他脚本访问到的完全独立的脚本，是可以做到零全局变量的，因为在这种情况下，你的脚本是不需要向外提供接口的；至于其余的情况并不建议使用这种形式；

            实现方法：

                ```js
                    (function (win) {

                        var doc = win.document;
                        // 其余代码
                    })(window);
                ```
            - 注：
                为什么传入 window？
                1. 通过引入 window ，这段代码就不会直接引入任何全局变量；
                2. 通过传入 window 变量，使得 window 由全局变量变为局部变量，当在代码块中访问 window 时，不需要将作用域链回退到顶层作用域，这样可以更快的访问 window；并且将 window 作为参数传入，可以在压缩代码时进行优化；

7. 事件处理

    提高事件处理程序的可维护性

    1. 典型用法
        event 对象包含了所有和事件相关的信息，但是在使用的过程中，可能仅仅只用到了 event 对象提供的某一部分的小部分；

            ```js
                function handleClick(ev) {
                    var popup = document.getElementById('popup');
                    popup.style.left = event.clientX + 'px';
                    popup.style.top = event.clientY + 'px';
                    popup.className = 'reveal';
                }

                addListener(element, 'click', handleClick)
            ```
        在这段代码中，我们仅仅使用到了 ev 对象的 clientX/clientY; 虽说是没有什么问题，但是实际上不是好的写法，具有局限性

    2. 隔离应用逻辑
        上例代码中的第一个问题是：事件处理应用 -- handleClick 中包含了应用逻辑 -- handleClick 的执行代码；这种将应用逻辑和事件处理行为紧紧的耦合在了一起，最好将应用逻辑从事件处理程序中抽离出来；这样就可以在合适的时候执行逻辑行为，而不必收到事件处理程序的限制

        将事件处理程序和应用逻辑耦合在一起的另一个缺点就是和测试有关；在测试的使用并不能每一次都去触发事件行为，所以如果可以仅仅处理逻辑应用，可以方便测试；

        - 建议: 将逻辑应用从事件处理应用中抽离出来，最好将它们挂载与为该应用定义的一个全局对象上，事件处理程序应当总是在一个相同的全局对象中；

                ```js

                    var MyApplication = {

                        // 事件应用
                        handleClick: function (event) {

                            this.showPopup(event)
                        },

                        // 逻辑应用
                        showPopup: function (event) {

                            var popup = document.getElementById('propup');
                            popup.style.left = event.clientX + 'px';
                            popup.style.top = event.clientY + 'px';
                        }
                    };

                    addListener(element, 'click', function (event) {
                        MyApplication.handleClick(event);
                    })
                ```

    3. 不要分发事件对象

        经过抽离逻辑应用后，上面的代码依旧存在一个问题：event 对象被无节制的派发了（被传递了多次），我么可以看出真正的逻辑对象仅仅使用了 event 对象中的两个属性；

        - 建议：
            1. 应用逻辑不应该依赖于 event 对象，来完成功能
                - 原因:
                    1. 好的 API 一定是透明的，而直接传输 event 对象作为参数，并不能告诉你使用了那些属性；
                    2. 在测试的时候，由于并不知道真正使用那些属性，所以可能需要创建一个event 对象来使用，不利于测试
            2. 应该将事件处理程序作为接触 event 对象的唯一函数，并在进入逻辑应用前对 event 对象执行任何必要的操作，比如：抽离有用的属性，阻止默认行为，阻止事件冒泡。。。

        - 实例

                ```js
                    var MyApplication = {

                        // 事件应用
                        handleClick: function (event) {

                            ev.stopPropagation();
                            ev.preventDefault();
                            this.showPopup(event.clientX, event.clientY)
                        },

                        // 逻辑应用
                        showPopup: function (x, y) {

                            var popup = document.getElementById('propup');
                            popup.style.left = x + 'px';
                            popup.style.top = y + 'px';
                        }
                    };

                    addListener(element, 'click', function (event) {
                        MyApplication.handleClick(event);
                    })
                ```
    在这段代码中， 逻辑应用就完全没有依赖 event 对象；，所以在很多地方都可以直接使用相同的业务逻辑，包括写测试代码；

8. 避免 “空比较”

    1. 检测原始值
        在 JavaScript 中存在 5 种原始类型：字符串，数字，undefined，null，布尔值；对于判断原始类型最好是使用 typeof 运算符进行判断；

            ```js
                typeof val;
                typeof (val);
            ```
        - 注：
            1. 两种方式都可以使用，但是使用 typeof val 更符合运算符的规则；
            2. 对未声明的变量会返回 'undefiend'
            3. 对于 null，只能和 null 来判断，才能做出正确的判断；但是检测 null 时会返回 object（typeof null === object）
            4. 如果通过 document.getElementById() 没有获取到节点，就会返回 null

    2. 检测引用值
        在 JavaScript 中，除了原始值之外的值都是引用值，内置的引用类型：Array、Object、Date 和 Error

        如果使用 typeof 来判断引用值，都会返回 object，所以判断引用值就不能使用 typeof；

        检测某个引用值的类型的可以使用 instanceof 运算符，使用方式：`value instanceof constructor`;
        如果 value 是在 constructor 的原型链上的时候就会返回真；

        示例：

            ```js
                if (value instanceof Date) {
                    // value 是 date 对象
                }
            ```
        但是，使用 instanceof 还会存在问题，因为这里的判断条件是只要在原型链上就为真；这样就不能准确的判断引用类型，并且 instanceof 不能跨 frame 使用，因为每一个 frame 中都有自己独立的对象，所以一个对象的引用值可能不在另一个 frame 下对象的原型链上；

        如果需要更精确的去判断一个引用值的类型，可以使用下面的方法：

            ```js
                Object.prototype.toString.call([1,2,3]);
                // [object Array]
            ```

        - 注：
            这种方式最好不要用于判断自定义的对象；

        1. 检测函数

            可以使用 typeof 或者 instanceof 来检测函数：

                ```js
                    typeof function // 返回 function
                    fn instanceof function // true
                ```

            使用 typeof 是最好的检测方式，但是使用 typeof 来判断存在一些问题：在 IE8 和更早的 IE 浏览器中。使用 typeof 来检测 DOM 节点（比如：getElementById()）中的函数都返回 object 而不是 function；

            如果需要检测 document 的方式，可以使用 in 的运算符，示例：

                ```js
                    if ('querySelectorAll' in document) {

                        // 在当前浏览器中存在 querySelectorAll 方法
                    }
                ```

        2. 检测数组
            在 ES5 中引入了判断数组的方法：`Array.isArray()`;
            在不支持的浏览器中可以使用下面的方法：

                ```js
                    function isArray(value){
                        if(typeof Array.isArray === 'function') {
                            return Array.isArray(value);
                        } else {
                            return Object.prototype.toString.call(value) === '[object Array]'
                        }
                    }
                ```

    3. 检测属性

        当检测一个属性是否是属于一个对象的时候常用下面的方法：

            ```js
                var obj = {
                    val: '';
                }

                // 存在假值的时候。比如 val 的值为 0 、空 等假值的时候，就会不准确
                if(obj[val]) {};

                // 值为 null 的时候 存在问题
                if(object[val] !== null) {};

                // 值为 undefined
                if(object[val] !== undefined) {};
            ```
        上面的检测方式都存在问题，好的检测方式如下：

            ```js
                if (val in obj) {};
            ```

        或者：

            ```js
                obj.hasOwnProperty(val)
            ```
        - 注：
            只有继承自 Object 的 DOM 才会具有 hasOwnProperty 方法；在 IE8 及之前的浏览器中的 DOM 对象并不继承 Object，所以并不具有这个方法，如果需要安全的使用这个方法，应该如此使用：

                ```js
                    if ('hasOwnProperty' in object && object.hasOwnProperty('val')) {}
                ```

            由于 hasOwnProperty 存在兼用的问题，所以使用 in 运算符，更合适；

9. 将配置数据从代码中分离出来

    在编写代码段的时候也就是在编写一些指令让计算机执行，然后通过传入一些参数完成指定的行为，但是难免会存在需要修改配置数据的时候，而修改源代码又是十分危险的行为，一不小心就会引入 BUG，所以应该做到数据不影响代码的执行，也就是说将关键的配置参数从代码中分离出来

    1. 什么是配置数据
        页面中可能会发生变化的数据，都可以视为配置数据；

        - 比如：
            1. URL -- 当发生架构变换的时候 URL 就需要修改；
            2. 展示类的字符串 -- 当需要展示不同的内容的时候，就需要修改
            3. 重复的值
            4. 执行配置

        将配置数据从代码中抽离出来的意义就在于，当修改配置数据的时候，我们可以不修改源码也能够正常运行

    2. 抽离配置数据

        1. 第一步：拿出配置数据
            示例：

                ```js
                    function validate(value) {
                        if(!value) {

                            alert('hi');
                            location.href = 'http://www.baidu.com'
                        }
                    }

                    function toggleSelected(element) {
                        if (hasClass(element, 'selected')) {
                            removeClass(element, 'selected')
                        } else {
                            addClass(element, 'selected')
                        }
                    }
                ```

            其中可以视作配置数据的有：提示信息 hi, 跳转地址, 修改的 className

            这些配置信息可能随时都会产生修改，如果深入到函数内部对其进行修改容易产生BUG，我们尝试将配置数据抽离出来：

                ```js

                    var config = {
                        MSG_INVALID: 'hi',
                        URL_INVALID: 'http://www.baidu.com',
                        CSS_SELECTED: 'selected'
                    }

                    function valididate (val) {

                        if (!val) {
                            alert(config.MSG_INVALID);
                            location.href = config.URL_INVALID
                        }
                    }
                    function toggleSelected(element) {

                        if(hasClass(element, config.CSS_SELECTED)) {

                            removeClass(element, config.CSS_SELECTED);
                        } else {
                            addClass(element, config.CSS_SELECTED)
                        }
                    }
                ```

            这样就可以通过修改 config，来改变函数内部的参数；这样无论如何修改config，都不会影响逻辑；同样，我们可以将整个 config 对象放到单独的文件中，这样对配置数据和逻辑代码隔离开了；

    3. 保存配置参数

        配置数据最好放到单独的文件，一旦放入了单独的文件中就可以更好的与逻辑代码隔离开来；

        将配置数据参数放入单独的文件中；但是不建议放入 js 文件中，因为：放入 js 文件，就要遵循 js 的代码规范；并且如果选择直接使用的话，有可能因为配置参数的出错，导致整个代码不能正确执行

        - 建议：
            将配置参数放到一个单独的格式合适的文件中，然后通过相应的转换方式将配置文件转换成为 JavaScript 格式；

10. 抛出自定义错误

    在合适的时候，合适的地方，能够抛出带有错误信息的错误（提示），同样可以提高代码的可维护性；

    JavaScript 中错误提示是否匮乏，如果我们可以在预计有可能会出现错误的地方，通过主动拋错的方式为错误添加描述，可以帮助我们快速定位并解决问题

    1. 错误的本质
        合理的错误信息，可以提升代码的可维护性

    2. 在 JavaScript 中抛出错误
        在JavaScript 中，可以使用 throw 操作符，将提供的一个对象作为错误抛出，任何类型的对象都能作为错误抛出，常常使用的 error 对象：

            ```js
                throw new Error('someting bad happened');
            ```
        error 只接受一个参数 -- 表示错误信息的 message；

        - 注：
            1. 如果没有通过 try-catch 语句捕获，抛出任何值都将引发一个错误，
            2. 虽说 throw 也可以抛出一个错误，但是通过 throw 抛出的错误，可能在各个浏览器中具有不同的表现形式，只有在抛出一个 error 对象的时候，各个浏览器才会具有相同的表现形式

    3. 抛出错误的好处
        首先抛出错误的时候，必定会携带下列信息
        - 错误的行和列的位置
        - 错误相关信息
        这些信息通常会在浏览器中显示出来，我们可以在抛出错误的时候添加一个有助于我们进行调试的信息；

        - 建议：
            1. 包含函数名称
            2. 包含函数失败的原因

        - 示例：

                ```js
                    function getDivs(elements) {
                        if (elements && element.getElementsByTagName) {\
                            return elements.getElementsByTagName('div');
                        } else {
                            throw new Error('getDivs():Argument must be a DOM element')
                        }
                    }
                ```
            在这个实例中，可以看出如果传入的参数不符合要求，那么就会抛出错误信息，而我们可以通过抛出的错误信息来快速的定位问题，以及了解错误的原因；

    4. 何时抛出错误
        理解如何抛出错误，只是一个方面，能够在合适的时候抛出一个错误才是关键；如果对每一个函数的每一个的每一个可能都进行错误预设，将会是一个十分吃力不讨好的行为；

        - 原则
            1. 当发生一个错误会影响整个代码的运行的时候（也就是说当一个错误会引起自己既不想看到的后果的时候），就应该为这个错误建立错误提示；
                示例：

                    ```js
                        function addClass (el, className) {

                            el.className += " " + className
                        }
                    ```

                通过观察我们可以发现这里面存在一定原则：
                1. el 必须是 DOM 元素
                2. className 必须是有效的字符串

                但是我们是否要将这两个条件都进行限制？
                其实是没有必要的，因为只有当 el 传入了一个非 DOM 元素的时候，才会导致整个代码不能运行，而第二个参数 无论是传入了什么样的值都不会引起重大错误，所以建议仅检测第一个参数就足够了

                    ```js
                        function addClass(el, className) {

                            if ( el.className && typeof el.className != "string") {
                                throw new Error('addClass(): first argument must be DOM element')
                            }
                        }
                    ```
            2. 对于一个只被已知的实体调用的函数，错误检测就可能没有必要了，如果一个函数在多个地方被调用那么出错的可能性就大大增加，那么最好是为其添加错误检测；
            3. 一旦修复了一个很难调试的错误，就尝试增加一两个自定义错误，当再次发生错误的时候方便调试；
            4. 如果正在编写的代码，会提供给别人使用，建议思考一下他们的使用的方式，在特定的情况下抛出错误；

        - 注：
            牢记 __我们的目的不是防止错误，而是在错误发生的时候能够快速的调试__

    5. try-catch 语句

            ```js
                try {
                    // 可能出现的问题
                } catch (ex){
                    handleError(ex)
                } finally {
                    // 无论是否出现错误都将执行；
                }
            ```
        在 JavaScript 中，提供了 try catch 方法，将可能产生错误的代码放在 try 块中。在浏览器处理代码抛出错误之前就可以通过 try 对错误进行解析，并将错误代码交给 catch 进行处理；finally 块并不常用，因为在 try 中如果代码存在 return，提前结束了行为，就不会执行 finally

        - 使用 try-catch 还是 throw
            使用 try-catch 还是 throw 主要是看是否要进行错误处理，一般来说如果明确知道错误的原因以及解决方法，使用 try-catch 来进行错误处理会更有利

    6. 错误类型

        ECMA-262 存在 7 种错误类型

        - Error -- 错误的基本类型，其余类型的错误对象都是继承与 Error 对象；
        - EvalError -- eval() 函数执行的时候抛出的错误
        - RangeError -- 边界超出错误
        - ReferenceError -- 引用错误，引用的对象不存在
        - SyntacError -- eval() 内部的代码有语法错误
        - TypeError -- 引用的变量不是期望的类型
        - URIError -- 在使用 encodeURI 等 URI 转换方法的时候，传入了错误的参数

        我们可以通过 instanceOf 的方法定位到错误类型，从而针对其错误类型执行相应的处理；

            ```js
                try {
                     // ................
                } catch (ex) {
                    if (ex instanceof evalError) {
                        // ................
                    } else if( ex instanceof RangeError) {
                        // ................
                    }
                }
            ```
        但是这里存在一个问题： 我们无法分辨出自己定义的错误对象；
        解决方式：我们可以创建一个自己的错误对象的构造函数，然后通过 instanceOf 的方式辨别出是否是自己定义的错误对象

            ```js
                function MyError (mes) {
                    this.message = mes;
                }

                MyError.prototype = new Error();

                // 使用：
                throw new MyError('my Error')
            ```

        在定义好了自己的 Error 对象后，我们就可以通过 `instanceof` 的方式辨别哪一些是系统抛出的错误，哪一些是自己抛出的错误，需要注意的是，这种方式不支持 IE8；

        - 总结: 一个良好的错误提示系统，可以展示一些有用的信息， 帮助开发者去维护代码；

11. 不是你的对象不要动

    在 JavaScript 中，几乎任何可以访问的对象都可以修改，在自己独自开发的情况下，由于自己明确知道自己在修改什么，所以不会出现大的问题，但是在多人协作开发的时候，这种行为就可能产生危害；

    1. 什么是你的
        当一段代码由你维护，那么这段代码就是你的，而其余的代码就尽量不要修改
        例如：
        1. 原生对象；
        2. DOM 对象
        3. 浏览器对象（BOM）
        4. 类库的内部对象 
        对于上面的已经存在的对象，我们应该使用这些或者用其来构建某些新的功能，而不应该去修改它们；

    2. 原则
        企业软件需要一致而可靠的执行环境让其方便维护，建议将已经存在的对象作为库使用，在在这之上可以做任何事情；使用时需要注意：

        - 不覆盖方法
        - 不新增方法
        - 不删除方法

        如果项目只有你一个开发者，并且你十分了解它们，对其进行修改很容易处理，而在团队开发中，修改一个公认的对象，会带来很多维护的问题，产生许多混乱，会浪费很多时间；

        1. 不覆盖方法
            在 JavaScript 中 ，几乎任何的方法都可以被覆盖，如果覆盖了一个不是自己的对象的方法，带来的问题，将会十分的难以维护，因为一个已经存在的对象的方法可能已经被大家接受了，在排查过程中往往会被忽略，并且一个已经存在的对象的方法可能已经在多处使用了，一个覆盖可能会引起一系列的问题

        2. 不新增方法
            我们可以很轻易的为一个对象添加方法，(在一个对象的添加相应的属性就可以添加方法)，但是这种方式是很容易出问题的，因为你不会知道，你添加的方法名，会不会在以后的时间中被该对象自己创建出来，如果被创建了出来，命名冲突就已经带来了一系列的问题了；在大多数库中，都会提供一种插件机制，可供我们添加自己的方法，这种方式也是最佳的可维护的解决方式

        3. 不删除方法
            在 JavaScript 中，删除一个方法是十分容易的，只需要对对应的名字赋值为 null，这样不管他之前是如何定义的，以后都不能在调用了；如果方法是在对象的实例（用于区分对象的原型）上定义的，我们还可以使用 Delete 操作符来对其删除（delete 只能删除实例的属性和方法，无法删除原型上的实例和方法）

            删除一个已经存在的方法，是十分危险的，因为你并不知道这个方法已经在哪里被引用了，删除的话可能会带来很多问题，合适的方法是通过文档进行提示，避免以后的开发中继续使用，然后通过代码分析找到废弃的方法，然后使用新的方法去替换。总之删除一个方法是十分危险的行为；

    3. 更好的途径
        很显然我们是在需要解决问题的时候，才会选择去修改别人的对象；如果不能通过修改别人的变量去解决问题，我们就要寻找其他的方法，一个好的方式就是：不去修改他人的对象，而是扩充这些对象；

        在 JavaScript 中，对于对象的扩充常用的形式就是扩充，扩充的方式又分为基于对象的扩充和基于类型的扩充；

        需要注意的是：
           - 不能从 DOM 或者 BOM 中对对象进行继承；
           - 由于数组索引和 length 属性之间的复杂关系，导致继承数组对象是不能正常工作的；

        1. 基于对象的继承
            基于对象的继承又叫做原型继承，一个对象继承另一个对象是不需要使用构造函数的，通过 ECMS5 中的 Object.create() 就可以完成继承；

                ```js
                    var person = {
                        name: 'ff',
                        job: 'web',
                        say: function () {
                            alert(this.name);
                        }
                    };

                    var myPerson = Object.create(person, {
                        name: {
                            value:'hh'
                        },
                    });
                    myPerson.age = 24;
                    console.log(myPerson);
                    console.log(person);
                    myPerson.say()
                    person.say()
                ```

            Object.create 可以传入两个参数，1. 一个要被继承的对象。 2. 一个自定义的属性（可选）；

            - 注：
                1. 在添加自定义属性的时候，必须是对象形式，其中 value 代表这个属性的值；
                2. Object.create 的继承方式，是将子对象的原型设置为了父对象，如果子对象上存在查找属性，那么就不会沿着原型链继续查找父对象了，
                    ![](.\2017-05-20-15-57-10.png)

            - Object.create 的实现：

                    ```js
                        var createObj = function (obj) {

                            var F = function (){};
                            F.prototype = obj;

                            return new F;
                        }
                    ```
            当他人的对象被你继承过来以后，就可以算是你的私有对象了，你可以再这个对象上进行修改；

        2. 基于类型的继承
            基于类型的继承依赖原型，基于类型的继承是通过构造函数实现的，也就是说这种继承方式是需要访问继承对象的构造函数；

                ```js
                    function MyError(message) {
                        this.message = message;
                    }

                    MyError.prototype = new Error(); // 原型继承；
                ```
            对一个定义了构造函数产生的对象，使用类型继承的方式会更加合适；
            类型的继承分为两步：1. 原型继承； 2. 构造器继承

            构造器继承制调用超类的够着函数时传入新建的对象作为其this的值；示例：

                ```js
                    function Person(name) {this.name = 'ff'};

                    Person.prototype = {
                        constructor: Person,
                        say: function () {
                            alert(this.name)
                        }
                    };

                    function Author(name) {
                        Person.call(this, name); // 构造器继承
                    }

                    Author.prototype = new Person(); // 类型继承
                ```
            Author 继承自 Person，属性 name 实际上是由 Person 管理的，所以需要通过 Person.call 的方式为 Author 添加属性；
            Person 构造器是在 this 上执行的，this 指向一个 Author 对象，所以最终的 name 属性定义在了 Author 上;

            基于类型的继承在创建新对象的时候更加的灵活，定义了一个类型可以让你创建多个实例对象；所有的对象都是继承自一个通用的超类，新的类型应该明确定义需要使用的属性和方法，并且它们应该与超类中的完全不同；

        3. 门面模式

            门面模式是一种设计模式，它会为一个已经存在的对象创建一个新的接口，门面是一个全新的对象，背后有一个已经存在的对象在工作，门面有时也叫作包装器，它用不同的接口包装已经存在的包装器；从而为原来的对象添加或改写功能；

            门面模式适用于不能继承的对象，例如 DOM对象，BOM对象；

            实例：

                ```js
                    function DOMWrapper(element) {
                        this.element = element;
                    }

                    DOMWrapper.prototype = {
                        constructor: DOMWrapper,
                        addClass: function (className){
                            this.element.className += ' ' + className;
                        },
                        remove: function() {
                            this.element.parentNode.removeChild(this.element);
                        }
                    };

                    var wrapper = new DOMWrapper(document.getElementById('my-div'));

                    wrapper.addClass('selected');
                    wrapper.remove();
                ```

            通过门面模式穿件出来的对象，本身依旧是属于 DOM 对象，可以使用 DOM 对象的方法和属性，但是又在原来的基础上添加了新的方法：addClass 和 remove；并且这两个方法是简历在包装对象上的，并不会对原有的 DOM 对象产生影响，即使在将来 DOM 对象添加了同样命名的这两个方法，也不会有包装对象产生影响，也就是说底层对象无论如何改变，只要修改门面。应用程序就能够继续正常工作；

            门面模式还有一个好处：屏蔽了开发者对于对象的访问，比如说上例中的 remove 方法就屏蔽了开发者对于该元素的父级节点的访问；

        4. 关于 Polyfill 的注解

            [polyfill -- GitHub](https://github.com/GoogleChrome/dialog-polyfill)

            Polyfill 是对某种功能的模拟（包含 css 以及 js 的新功能的实现）；当所使用的浏览器对于标准中的某些功能不支持的使用，Polyfill 会通过自己的方式实现这些功能；

            - 缺点：
                1，Polyfill 所实现的功能相较于标准可能并不精确；
                2. Polyfill 是在原生的对象上去增加方法会有一定的危险性；

            - 注：
                1. 书中并不建议使用 Polyfill，而是建议使用门面模式在原来功能的基础上添加方法，这样会更加的灵活；
                2. 我觉得 Polyfill 会是一个了解标准功能实现方式的途径；有兴趣的可以了解一下;

        5. 阻止修改
            在 ES5 中，引入了几个方法来防止对对象的修改，（IE浏览器中IE9+ 才能支持）

            阻止修改又可以分为 3 种锁定类型，每种锁定的类型都具有两个方法：一个用来实时操作，另一个用来检测是否应用了相应的操作

            1. 防止扩展
                禁止添加，但是可以对因存在的修改和删除
                通过 Object.preventExtension() 进行锁定，通过 Object.isExtensible() 来判断是否已经锁定了；
                示例：

                    ```js
                        var person = {
                            name: 'ff'
                        }

                        Object.preventExtensions(person);
                        console.log(Object.isExtensible(person)); // false
                        person.age = '24'
                        console.log(person) // {name:ff}
                    ```
                在非严格的模式下，不会报错，也不会生效；

            2. 密封
                禁止添加删除，但可以修改
                通过 Object.seal() 进行锁定，通过 Object.isSealed() 判断是否已经锁定
                使用方式和 Object.preventExtensions() 差不多，不再介绍

            3. 冻结
                禁止添加删除以及修改，所有的属性和方法只读
                通过 Object.freeze() 进行锁定，通过 Object.isFrozen() 进行判断；

            这些锁定的方式，可以阻止别人修改你的代码，但是由于在非严格的模式下，修改失效不会有任何提示，所有建议在使用锁定后，代码最后运行在严格模式下；

            需要注意的是，一个对象一旦锁定了，就不能解锁；

12. 浏览器嗅探

    1. User-Agent 检测
        User-Agent 是最早的浏览器嗅探，服务器（后来是在客户端进行检测）会根据浏览器的 User-Agent 字符串来确定浏览器的类型，从而决定网址的内容；由于很早的时候，网景是最强大的浏览器，以至于很多网页只会在网景下才会展示，网景的 user-agent: Mozilla/2.0 (win95; I)；后来其他的浏览器功能也强大了，为了使得支持网景的浏览器同时能在自己的浏览器上显示，就将自身的 user-agent 伪装成为网景浏览器，比如说：
        Internet Explorer: Mozilla/2.0 (compatible; MSIE 3.0; Winodws 95);

        目前，一个新的浏览器部分复制现有浏览器用户代理的一部分，是常常存在的，并且用户自身也可以修改 user-agent 所以不建议通过浏览器嗅探的方式判断浏览器的类型；

        naviagtor.userAgent;

        - 注：
            1. 有一种情况适合使用，当对于一个很老，并且不会再修改 user-agent 的浏览器，可以使用这种嗅探方式；
            2. 虽说用户可以修改 user-agent 但是这一点其实可以不用担心，因为能够修改的人，往往是知道其代表的含义

    2. 特性检测
        特性检测的原理是通过浏览器的特性进行检测，然后根据检测结果（true||false）来决定执行相应的行为；

        一般来说特性检测具有以下一个部分：
        1. 探测标准的方法；
        2. 探测不同浏览器的特定方法；
        3. 当被探测的方法均不成立，最好提供一个备用的方式

    3. 避免特性|浏览器推断
        简单的说就是不要通过具有某些特性就主观上判断这个是哪一个浏览器，或者判断他还具有哪些特性；不然的话会带来维护上的问题；

    4. 如何选择
        特性推断和浏览器推断都不是好的方式，应当避免使用，因为通过推断得到的结果都是不可靠的；建议首先通过特性检测，当无法使用特性检测的时候，可以通过用户代理检测（最好只用在老版本或者指定版本的浏览器上），

     - 补充：mootools 是一个简易的库，里面存在一些检测浏览器的方法，有空的时候可以研究一下
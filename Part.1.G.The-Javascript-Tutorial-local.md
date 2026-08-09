# 官方教程：Javascript@MDN Web Docs 

虽然，第一部分总计七章关于编程内容的编排是非常特别且相当有效的：

> * 它并没有像其它教程那样，从 “Hello world!” 入手；
> * 它也没有使用与市面上所有编程教材一样的内容先后顺序；
> * 它一上来就让你明白了程序的灵魂：布尔运算；
> * 它很快就让你明白有意义的程序其实只有两个核心构成：运算和流程控制；
> * 它让你很快理解函数从另外一个角度看只不过是 “程序员作为用户所使用的产品”；
> * 它让你重点掌握了最初级却最重要的数据类型，字符串；
> * 它让你从容器的角度了解了 Javascript 中绝大多数 “重要的数据类型”；
> * 最重要的是，它不承诺你 “速成”，但承诺 “领你入门”…… 显然，它做到了。

但是，第一部分的内容核心目标是让你 “**脱盲**” —— 它的作用还做不到让你 “已然学会编程”，它更多是让你从此开始有能力去阅读更多的重要资源，比如，官方的教程和参考。第一部分的内容更像地图上的 “**图例**”，而不是地图本身。

第一部分反复读过之后，最重要的结果就是：

> 现在你有能力自己查询官方文档了……

起码，在此之后，再去阅读 [Javascript@MDN Web Docs ](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Scripting)，不那么费力了，最起码，可以靠自己理解绝大多数内容……

在继续阅读本书内容的同时，可以同步配合 Javascript@MDN Web Docs 来读。

## 找到优质教程的一般方法

现在而言，最直接的方法是询问 LLM 来获取优质教程。

例如：

> 推荐一些 Javascript 优质教程。

![image-20250608160711637](/Users/liaohua/Documents/image-20250608160711637.png)

这种类型的问题是大语言模型所擅长，可以给出优质回答的。

## 在本地安装官方文档

### 练习题💡

1. 通过 vercel 部署 Javascript@MDN Web Docs：

   > https://github.com/mdn/content

   **（这里面都涉及哪些知识点？完成后尝试进行整理）**

2. 完成 `1` 后，尝试给 vercel 上的应用配置一个域名。

## 为什么一定要阅读官方文档

> 本节具有普适性，因此没有做 Javascript 匹配。

买一两本 Python 教程是不可能完整掌握 Python 的 —— 其实，这句话里的 Python 替换成任何一种语言也是一样的。

教程和官方文档的各种属性是非常不一样的，比如，针对读者群，组织方式，语言表达…… 最不一样的地方在 “全面性”。任何一本单独的教程，都不可能像官方文档那样全面。各种单独教程的优势在于，它们更多地针对初学者、入门者设计，但与此同时，在全面性、深入性上做了妥协。

比如，在当前这本书里，不会涉及 [Bytes Object](https://docs.python.org/3/library/stdtypes.html#bytes-objects) —— 并非只有我一个人这么做，著名的 Python 教程《[Think Python: How to Think Like a Computer Scientist](http://greenteapress.com/thinkpython2/html/index.html)》、《[Dive into Python](https://linux.die.net/diveintopython/html/toc/index.html)》等等都没有涉及 Bytes Object 这个话题。

由于官方文档实际上没办法对入门者、初学者过分友好 —— 毕竟，全面、权威、准确才是它更应该做到的事情 —— 所以，很多人在刚开始的时候求助于各类非官方的教材、教程。原本应该是入门以后就理应 “只读官方文档”，或者 “第一查询对象只能是官方文档”，但在很多人那里竟然变成了 “从一开始到最后都在回避官方文档（或者说 ‘最专业的说明文字’）”，这就不好了，真的很吃亏，且自己都无法知道自己究竟吃了多少亏 —— 总以为自己已经学完了，但实际上从一开始就一点都不全面。

请牢记且遵守这个原则：

> **第一查询对象只能是官方文档**。

所以，当我用 Google 查询的时候，经常使用这样的格式：

> `<queries> site:python.org`

有时甚至会指定在哪个目录里搜索：

> `bytes site:python.org/3/library`，你试试这个连接：[bytes site:python.org/3/library](https://www.google.com/search?q=byte+site%3Apython.org%2F3%2Flibrary)

这个原则对任何语言都适用。将来你在学习任何新软件包（库）、语言更新后的新特性、甚至另外一个新语言的时候，都要这么做。所谓的超强自学能力，基本上就是由一些类似这样的小习惯和另外一些特别基础的方法构成的强大能力。

## 基于 AI 的文档交互

在 2024 年 LLM 技术突破奇点以前，编写电子教程需要很多的细节工作，最典型的就是需要制作多语言的版本。

![image-20250523221537934](/Users/liaohua/Documents/image-20250523221537934.png)

然而，如今我们可以通过更有效率的更智能的方式查询文档了。

以 `ChatGPT` 为例，我们可以通过这样一条 Prompt 查询关于 `Error Handling` 的文档：

> search from https://javascript.info/, tell me how to handle error.

![image-20250523221838196](/Users/liaohua/Documents/image-20250523221838196.png)

所有的内容均标明出处，确保来源于我们提供的文档地址。

然后，我们讲得到的内容我们进一步交互时的作为 AI 语料。例如，我们想要获得简体中文的版本：

![image-20250523222002197](/Users/liaohua/Documents/image-20250523222002197.png)



## 官方文档中最重要的链接

Python 也许是目前所有编程语言中在文档建设（Documenting）方面做得最好的（好像真的不需要在这句话后面加上 “之一”）。Python 社区为了建设完善的文档，甚至有专门的文档制作工具 —— 得益于 Python 社区从一开始就非常重视[文档规范](https://devguide.python.org/documenting/) —— [Sphinx](http://www.sphinx-doc.org/en/master/)。你在网络上最经常看到的计算机类文档，很可能都在这个网站上：[Read the Docs](https://readthedocs.org)……

Python 的官方文档网址是：

> https://docs.python.org/3/

其中对初学者最重要的两个链接是：

> * **[Tutorial](https://docs.python.org/3/tutorial/index.html)**: https://docs.python.org/3/tutorial/index.html
> * **[Library Reference](https://docs.python.org/3/library/index.html)**: https://docs.python.org/3/library/index.html

理论上来讲，只要有了基础的概念，自己反复阅读官方的 The Python Tutorial 是最好的，没什么入门书籍比它更好 —— 因为它的作者是 Python 的作者，那个被称为 “善意独裁者” 的 [Guido van Rossum](https://en.wikipedia.org/wiki/Guido_van_Rossum)。

此人很帅，但更帅的是他的车牌（摘自 Guido van Rossume 的[个人主页](https://gvanrossum.github.io)）：

![](https://gvanrossum.github.io/images/license.jpg)

## 为什么一定要阅读官方文档

买一两本 Python 教程是不可能完整掌握 Python 的 —— 其实，这句话里的 Python 替换成任何一种语言也是一样的。

教程和官方文档的各种属性是非常不一样的，比如，针对读者群，组织方式，语言表达…… 最不一样的地方在 “全面性”。任何一本单独的教程，都不可能像官方文档那样全面。各种单独教程的优势在于，它们更多地针对初学者、入门者设计，但与此同时，在全面性、深入性上做了妥协。

比如，在当前这本书里，不会涉及 [Bytes Object](https://docs.python.org/3/library/stdtypes.html#bytes-objects) —— 并非只有我一个人这么做，著名的 Python 教程《[Think Python: How to Think Like a Computer Scientist](http://greenteapress.com/thinkpython2/html/index.html)》、《[Dive into Python](https://linux.die.net/diveintopython/html/toc/index.html)》等等都没有涉及 Bytes Object 这个话题。

由于官方文档实际上没办法对入门者、初学者过分友好 —— 毕竟，全面、权威、准确才是它更应该做到的事情 —— 所以，很多人在刚开始的时候求助于各类非官方的教材、教程。原本应该是入门以后就理应 “只读官方文档”，或者 “第一查询对象只能是官方文档”，但在很多人那里竟然变成了 “从一开始到最后都在回避官方文档（或者说 ‘最专业的说明文字’）”，这就不好了，真的很吃亏，且自己都无法知道自己究竟吃了多少亏 —— 总以为自己已经学完了，但实际上从一开始就一点都不全面。

请牢记且遵守这个原则：

> **第一查询对象只能是官方文档**。

所以，当我用 Google 查询的时候，经常使用这样的格式：

> `<queries> site:python.org`

有时甚至会指定在哪个目录里搜索：
    
> `bytes site:python.org/3/library`，你试试这个连接：[bytes site:python.org/3/library](https://www.google.com/search?q=byte+site%3Apython.org%2F3%2Flibrary)

这个原则对任何语言都适用。将来你在学习任何新软件包（库）、语言更新后的新特性、甚至另外一个新语言的时候，都要这么做。所谓的超强自学能力，基本上就是由一些类似这样的小习惯和另外一些特别基础的方法构成的强大能力。
